import {RednetReceiverHelper, RednetSenderHelper}         from '../../../APIs/rednet_utils';
import {UnitOfMeasure}                                    from '../APIs/fluid_enums';
import {FluidRegistry}                                    from './fluid_registry';
import {UnitMeasureType}                                  from '../APIs/fluid_types';
import {SmelteryMode, SmelteryStatus}                     from '../APIs/smeltery_enums';
import {PlanedAction, SmelteryActionBatch, SmelteryState} from '../APIs/smeltery_types';

/**
 * Configuration constants for the Smeltery system
 */
const CONFIG = {
	PERIPHERALS: {
		MODEM_SIDE: 'left',
	},
	SMELTERY: {
		MAX_ACTIONS_PER_BATCH: 3,
		BASE_TANK_CAPACITY: 12000,
	},
} as const;

/**
 * Manages a Tinkers' Construct smeltery, handling fluid processing, item melting,
 * and casting operations based on different operational modes.
 */
export class Smeltery {
	/** Handles receiving messages over rednet */
	private rednetReceiver: RednetReceiverHelper;

	/** Handles sending messages over rednet */
	private rednetSender: RednetSenderHelper;

	/** The size of the smeltery (width * depth * height) */
	private readonly size: number;

	/** Current state of the smeltery including fluids, items, and operational status */
	private state: SmelteryState;

	/** ID of the computer that interfaces directly with the smeltery */
	private readonly interfaceId: number;

	/** ID of the computer that displays information and receives user commands */
	private readonly frontendId: number;

	/**
	 * Creates a new Smeltery manager
	 *
	 * @param innerWidth - Internal width of the smeltery
	 * @param innerDepth - Internal depth of the smeltery
	 * @param innerHeight - Internal height of the smeltery
	 * @param interfaceId - ID of the computer that interfaces with the smeltery
	 * @param frontendId - ID of the computer that displays information
	 */
	constructor(innerWidth: number, innerDepth: number, innerHeight: number, interfaceId: number, frontendId: number) {
		this.initializePeripherals();
		this.size = innerWidth * innerDepth * innerHeight;
		this.state = {
			mode: SmelteryMode.MANUAL,
			status: SmelteryStatus.IDLE,
			fluidInCapacity: this.size * 1080,
			fluidInAmount: 0,
			fluidIn: [],
			itemInCapacity: this.size,
			itemInAmount: 0,
			itemsIn: [],
			itemsToProcess: [],
			residueTanksCount: 0,
			residueTanksDetails: [],
		};
		this.frontendId = frontendId;
		this.interfaceId = interfaceId;

		// Initialize rednet listeners
		this.initializeRednetListeners();
	}

	/**
	 * Initializes the rednet listeners for receiving commands from other computers.
	 */
	private initializeRednetListeners(): void {
		// TODO: Add listeners for other commands
	}

	/**
	 * Initializes the peripheral connections needed for communication
	 */
	private initializePeripherals(): void {
		const modem = peripheral.wrap(CONFIG.PERIPHERALS.MODEM_SIDE) as ModemPeripheral || error('No modem found');
		this.rednetReceiver = new RednetReceiverHelper(modem);
		this.rednetSender = new RednetSenderHelper(modem);
	}

	/**
	 * Updates the smeltery status and notifies the frontend
	 *
	 * @param newStatus - The new status to set
	 */
	private updateStatus(newStatus: SmelteryStatus): void {
		this.rednetSender.put(this.frontendId, 'smelteryStatus', {status: newStatus});
		this.state.status = newStatus;
	}

	/**
	 * Creates batches of actions from a list of planned actions
	 *
	 * @param actions - List of planned actions to batch
	 * @returns Batched actions according to MAX_ACTIONS_PER_BATCH
	 */
	private createActionBatches(actions: PlanedAction[]): SmelteryActionBatch {
		const batches: SmelteryActionBatch = [];

		for (let i = 0; i < actions.length; i += CONFIG.SMELTERY.MAX_ACTIONS_PER_BATCH) {
			batches.push(actions.slice(i, i + CONFIG.SMELTERY.MAX_ACTIONS_PER_BATCH));
		}

		return batches;
	}

	/**
	 * Processes fluid based on the current smeltery mode and available cast types
	 *
	 * @param fluidResource - The fluid resource to process
	 * @param fluidAmount - Amount of fluid to process
	 * @param expectedState - Current expected state of the smeltery
	 * @param actions - List to add new actions to
	 * @returns Remaining fluid amount after processing
	 */
	private processFluidBasedOnMode(
		fluidResource: string,
		fluidAmount: number,
		expectedState: Partial<SmelteryState>,
		actions: PlanedAction[],
	): number {
		let remainingFluid = fluidAmount;
		const availableUnits: UnitMeasureType[] = FluidRegistry[fluidResource].availableUnits;

		// Sort units by cost (largest first)
		availableUnits.sort((a: UnitMeasureType, b: UnitMeasureType) =>
			UnitOfMeasure[b].costInMilliBucket - UnitOfMeasure[a].costInMilliBucket);

		// Filter cast types based on mode
		const eligibleCastTypes = this.getEligibleCastTypes(availableUnits, expectedState.mode);

		// Process each eligible cast type
		for (const castType of eligibleCastTypes) {
			if (UnitOfMeasure[castType].hasCast) {
				const count = math.floor(remainingFluid / UnitOfMeasure[castType].costInMilliBucket);

				if (count > 0) {
					const amountToUse = count * UnitOfMeasure[castType].costInMilliBucket;

					// Update fluid amounts
					this.updateFluidAmounts(fluidResource, amountToUse, expectedState, false);

					// Add cast action
					actions.push({
						action: {
							type: 'CAST',
							fluidName: fluidResource,
							amount: amountToUse,
							castType: castType,
						},
						expectedState: {...expectedState},
					});

					remainingFluid -= amountToUse;
				}
			}
		}

		return remainingFluid;
	}

	/**
	 * Gets eligible cast types based on the smeltery mode
	 *
	 * @param availableUnits - All available unit types for the fluid
	 * @param mode - Current smeltery mode
	 * @returns Filtered list of eligible cast types
	 */
	private getEligibleCastTypes(availableUnits: UnitMeasureType[], mode: SmelteryMode): UnitMeasureType[] {
		switch (mode) {
			case SmelteryMode.AUTO_NO_BLOCK:
				return availableUnits.filter(unit => unit !== 'BLOCK');

			case SmelteryMode.AUTO_INGOTS_ONLY:
				return availableUnits.filter(unit => unit === 'INGOT' || unit === 'GEM');

			case SmelteryMode.MANUAL:
			case SmelteryMode.AUTO_LARGEST:
			case SmelteryMode.BALANCED_ALLOY:
			default:
				return availableUnits;
		}
	}

	/**
	 * Updates fluid amounts in the expected state
	 *
	 * @param fluidResource - The fluid resource to update
	 * @param amount - Amount to add (positive) or remove (negative)
	 * @param expectedState - State to update
	 * @param isAddition - Whether this is adding (true) or removing (false) fluid
	 */
	private updateFluidAmounts(
		fluidResource: string,
		amount: number,
		expectedState: Partial<SmelteryState>,
		isAddition: boolean,
	): void {
		if (isAddition) {
			expectedState.fluidInAmount += amount;

			const existingFluid = expectedState.fluidIn.find(fluid => fluid.fluidResource === fluidResource);
			if (existingFluid) {
				existingFluid.fluidAmount += amount;
			} else {
				expectedState.fluidIn.push({
					fluidCapacity: 0,
					fluidAmount: amount,
					fluidResource: fluidResource,
				});
			}
		} else {
			expectedState.fluidInAmount -= amount;

			const existingFluid = expectedState.fluidIn.find(fluid => fluid.fluidResource === fluidResource);
			if (existingFluid) {
				existingFluid.fluidAmount -= amount;

				// Remove the fluid entry if amount is zero
				if (existingFluid.fluidAmount <= 0) {
					expectedState.fluidIn = expectedState.fluidIn.filter(
						fluid => fluid.fluidResource !== fluidResource,
					);
				}
			}
		}
	}

	/**
	 * Handles transferring fluid between the smeltery and residue tanks
	 *
	 * @param fluidResource - The fluid resource to transfer
	 * @param amount - Amount to transfer
	 * @param expectedState - Current expected state
	 * @param actions - List to add new actions to
	 * @param toSmeltery - Direction of transfer (true = to smeltery, false = to tank)
	 */
	private transferFluid(
		fluidResource: string,
		amount: number,
		expectedState: Partial<SmelteryState>,
		actions: PlanedAction[],
		toSmeltery: boolean,
	): void {
		if (toSmeltery) {
			// Transfer from tank to smeltery
			const tank = expectedState.residueTanksDetails.find(tank => tank.fluidResource === fluidResource);
			if (tank) {
				tank.fluidAmount -= amount;

				// Remove tank if empty
				if (tank.fluidAmount <= 0) {
					expectedState.residueTanksDetails = expectedState.residueTanksDetails.filter(
						t => t.fluidResource !== fluidResource,
					);
				}

				this.updateFluidAmounts(fluidResource, amount, expectedState, true);

				actions.push({
					action: {
						type: 'INSERT_FLUID',
						fluidName: fluidResource,
						amount: amount,
					},
					expectedState: {...expectedState},
				});
			}
		} else {
			// Transfer from smeltery to tank
			this.updateFluidAmounts(fluidResource, amount, expectedState, false);

			let remainingAmount = amount;

			// First, try to add to an existing tank with the same fluid
			const tank = expectedState.residueTanksDetails.find(tank => tank.fluidResource === fluidResource);
			if (tank) {
				// Calculate how much can fit in this tank
				const availableSpace = tank.fluidCapacity - tank.fluidAmount;
				const amountToAdd = Math.min(remainingAmount, availableSpace);

				// Add fluid to the tank
				tank.fluidAmount += amountToAdd;
				remainingAmount -= amountToAdd;
			}

			// If there's still fluid left, try to find another tank or create a new one
			if (remainingAmount > 0) {
				// Try to find another tank with the same fluid that has space
				const anotherTank = expectedState.residueTanksDetails.find(t => 
					t.fluidResource === fluidResource && 
					t !== tank && 
					t.fluidAmount < t.fluidCapacity
				);

				if (anotherTank) {
					// Calculate how much can fit in this tank
					const availableSpace = anotherTank.fluidCapacity - anotherTank.fluidAmount;
					const amountToAdd = Math.min(remainingAmount, availableSpace);

					// Add fluid to the tank
					anotherTank.fluidAmount += amountToAdd;
					remainingAmount -= amountToAdd;
				}

				// If there's still fluid left, create a new tank
				if (remainingAmount > 0) {
					expectedState.residueTanksDetails.push({
						fluidCapacity: CONFIG.SMELTERY.BASE_TANK_CAPACITY,
						fluidAmount: remainingAmount,
						fluidResource: fluidResource,
					});
				}
			}

			actions.push({
				action: {
					type: 'EXTRACT_FLUID',
					fluidName: fluidResource,
					amount: amount,
				},
				expectedState: {...expectedState},
			});
		}
	}

	/**
	 * Plans actions for the smeltery based on the current mode.
	 * Creates batches of actions and verifies the state's coherence before continuing.
	 * @returns A batch of actions to execute
	 */
	public planActions(): SmelteryActionBatch {
		// Update status to PLANNING
		this.updateStatus(SmelteryStatus.PLANNING);

		// Create a batch of actions based on the current mode
		let actions: SmelteryActionBatch = [];

		switch (this.state.mode) {
			case SmelteryMode.AUTO_LARGEST:
				actions = this.planActionsForAutoLargest();
				break;
			case SmelteryMode.AUTO_NO_BLOCK:
				actions = this.planActionsForAutoNoBlock();
				break;
			case SmelteryMode.AUTO_INGOTS_ONLY:
				actions = this.planActionsForAutoIngotsOnly();
				break;
			case SmelteryMode.BALANCED_ALLOY:
				actions = this.planActionsForBalancedAlloy();
				break;
			case SmelteryMode.MANUAL:
				// In manual mode, no automatic planning is done
				this.updateStatus(SmelteryStatus.IDLE);
				return [];
			default:
				// Unknown mode, return to IDLE
				this.updateStatus(SmelteryStatus.IDLE);
				return [];
		}

		// If no actions were planned, return to IDLE
		if (actions.length === 0) {
			this.updateStatus(SmelteryStatus.IDLE);
			return [];
		}

		return actions;
	}

	/**
	 * Processes all items and fluids in the smeltery, emptying it according to the current mode
	 * @returns A batch of actions to execute
	 */
	private dump(): SmelteryActionBatch {
		const actions: PlanedAction[] = [];
		const expectedState = {...this.state};

		// Process items in the smeltery
		if (expectedState.itemsIn.length > 0) {
			this.processItems(expectedState, actions);
		}

		// Process fluids in the smeltery
		if (expectedState.fluidIn.length > 0) {
			this.processFluids(expectedState, actions, true); // Always transfer to residue tanks in dump mode
		}

		// Process residue in tanks
		if (expectedState.residueTanksDetails.length > 0) {
			this.processResidueTanks(expectedState, actions);
		}

		// The smeltery should be empty now, and the fluid should be in the residue tank
		actions.push({
			action: {
				type: 'SEND_CURRENT_STATE',
			},
			expectedState: {
				...this.state,
				fluidInAmount: 0,
				itemInAmount: 0,
				fluidIn: [],
				itemsIn: [],
			},
		});

		return this.createActionBatches(actions);
	}

	/**
	 * Processes items in the smeltery, melting them into fluids
	 *
	 * @param expectedState - Current expected state
	 * @param actions - List to add new actions to
	 */
	private processItems(expectedState: Partial<SmelteryState>, actions: PlanedAction[]): void {
		for (const item of expectedState.itemsIn) {
			expectedState.itemsIn = [];
			expectedState.fluidInAmount += item.fluidAmountAfterMelting;

			const existingFluid = expectedState.fluidIn.find(fluid => fluid.fluidResource === item.fluidResource);
			if (existingFluid) {
				existingFluid.fluidAmount += item.fluidAmountAfterMelting;
			} else {
				expectedState.fluidIn.push({
					fluidCapacity: 0,
					fluidAmount: item.fluidAmountAfterMelting,
					fluidResource: item.fluidResource,
				});
			}
		}

		actions.push({
			action: {
				type: 'WAIT_MELTING',
			},
			expectedState: expectedState,
		});
	}

	/**
	 * Processes fluids in the smeltery, casting them or optionally moving to residue tanks
	 *
	 * @param expectedState - Current expected state
	 * @param actions - List to add new actions to
	 * @param transferToResidueTank - Whether to transfer remaining fluid to residue tanks (default: true)
	 */
	private processFluids(
		expectedState: Partial<SmelteryState>,
		actions: PlanedAction[],
		transferToResidueTank: boolean = true,
	): void {
		for (const fluid of expectedState.fluidIn) {
			let remainingFluid = fluid.fluidAmount;

			// Process fluid based on mode and available cast types
			remainingFluid = this.processFluidBasedOnMode(
				fluid.fluidResource,
				remainingFluid,
				expectedState,
				actions,
			);

			// If there's still fluid left and transfer to residue tank is enabled, move it to a residue tank
			if (remainingFluid > 0 && transferToResidueTank) {
				this.transferFluid(
					fluid.fluidResource,
					remainingFluid,
					expectedState,
					actions,
					false, // from smeltery to tank
				);
			}
		}
	}

	/**
	 * Processes fluids in residue tanks, moving them to the smeltery for casting
	 *
	 * @param expectedState - Current expected state
	 * @param actions - List to add new actions to
	 */
	private processResidueTanks(expectedState: Partial<SmelteryState>, actions: PlanedAction[]): void {
		for (const fluid of expectedState.residueTanksDetails) {
			let fluidToDump = fluid.fluidAmount;
			const availableUnits: UnitMeasureType[] = FluidRegistry[fluid.fluidResource].availableUnits;

			// Sort units by cost (largest first)
			availableUnits.sort((a: UnitMeasureType, b: UnitMeasureType) =>
				UnitOfMeasure[b].costInMilliBucket - UnitOfMeasure[a].costInMilliBucket);

			// Filter cast types based on mode
			const eligibleCastTypes = this.getEligibleCastTypes(availableUnits, expectedState.mode);

			// Process each eligible cast type
			for (const castType of eligibleCastTypes) {
				if (UnitOfMeasure[castType].hasCast) {
					const count = math.floor(fluidToDump / UnitOfMeasure[castType].costInMilliBucket);

					if (count > 0) {
						const amountToUse = count * UnitOfMeasure[castType].costInMilliBucket;

						// Transfer fluid from tank to smeltery
						this.transferFluid(
							fluid.fluidResource,
							amountToUse,
							expectedState,
							actions,
							true, // to smeltery
						);

						// Cast the fluid
						this.updateFluidAmounts(fluid.fluidResource, amountToUse, expectedState, false);

						actions.push({
							action: {
								type: 'CAST',
								fluidName: fluid.fluidResource,
								amount: amountToUse,
								castType: castType,
							},
							expectedState: {...expectedState},
						});

						fluidToDump -= amountToUse;
					}
				}
			}
		}
	}

	/**
	 * Plans actions for AUTO_LARGEST mode.
	 * In this mode, the smeltery will process all items (shouldBeAutomaticallyMelted) and cast the fluid from it in all castType possible with this fluid starting with the largest
	 * It will be aware of alloy and don't do it
	 * @returns A batch of actions to execute
	 */
	private planActionsForAutoLargest(): SmelteryActionBatch {
		const actions: PlanedAction[] = [];
		const expectedState = {...this.state};

		// TODO: Implement AUTO_LARGEST mode logic

		return this.createActionBatches(actions);
	}

	/**
	 * Plans actions for AUTO_NO_BLOCK mode.
	 * In this mode, the smeltery will process all items (shouldBeAutomaticallyMelted) and cast the fluid from it in all castType possible with this fluid starting with the largest except blocks.
	 * It will be aware of alloy and don't do it
	 * @returns A batch of actions to execute
	 */
	private planActionsForAutoNoBlock(): SmelteryActionBatch {
		const actions: PlanedAction[] = [];
		const expectedState = {...this.state};

		// TODO: Implement AUTO_NO_BLOCK mode logic

		return this.createActionBatches(actions);
	}

	/**
	 * Plans actions for AUTO_INGOTS_ONLY mode.
	 * In this mode, the smeltery will process all items (shouldBeAutomaticallyMelted) and cast the fluid from it in ingot or gem.
	 * every leftover will be put in a residue tank.
	 * It will be aware of alloy and don't do it
	 * @returns A batch of actions to execute
	 */
	private planActionsForAutoIngotsOnly(): SmelteryActionBatch {
		const actions: PlanedAction[] = [];
		const expectedState = {...this.state};

		// TODO: Implement AUTO_INGOTS_ONLY mode logic

		return this.createActionBatches(actions);
	}

	/**
	 * Plans actions for BALANCED_ALLOY mode.
	 * In this mode, the smeltery analyzes the current fluid in and reproduces the same balancing the input in the smeltery because of the capacity of the smeltery.
	 * after cast it in all castType possible with this fluid starting with the largest.
	 * @returns A batch of actions to execute
	 */
	private planActionsForBalancedAlloy(): SmelteryActionBatch {
		const actions: PlanedAction[] = [];
		const expectedState = {...this.state};

		// TODO: Implement BALANCED_ALLOY mode logic

		return this.createActionBatches(actions);
	}
}
