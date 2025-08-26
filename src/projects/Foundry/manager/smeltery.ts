import {RednetReceiverHelper, RednetSenderHelper}         from '../../../APIs/rednet_utils';
import {UnitOfMeasure}                                    from './fluid_enums';
import {FluidRegistry}                                    from './fluid_registry';
import {UnitMeasureType}                                  from './fluid_types';
import {SmelteryMode, SmelteryStatus}                     from './smeltery_enums';
import {PlanedAction, SmelteryActionBatch, SmelteryState} from './smeltery_types';

const CONFIG = {
	PERIPHERALS: {
		MODEM_SIDE: 'left',
	},
	SMELTERY: {
		MAX_ACTIONS_PER_BATCH: 3,
		BASE_TANK_CAPACITY: 12000,
	},
} as const;

export class Smeltery {
	private rednetReceiver: RednetReceiverHelper;
	private rednetSender: RednetSenderHelper;
	private readonly size: number;
	private state: SmelteryState;
	private readonly interfaceId: number; // the one who actually interacts (move fluid, insert item, ...) with the smeltery, get info from it
	private readonly frontendId: number; // the one who displays information from this gateway, send action from the user to this gateway

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

	private initializePeripherals(): void {
		const modem = peripheral.wrap(CONFIG.PERIPHERALS.MODEM_SIDE) as ModemPeripheral || error('No modem found');
		this.rednetReceiver = new RednetReceiverHelper(modem);
		this.rednetSender = new RednetSenderHelper(modem);
	}

	private updateStatus(newStatus: SmelteryStatus): void {
		this.rednetSender.put(this.frontendId, 'smelteryStatus', {status: newStatus});
		this.state.status = newStatus;
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

	private dump(): SmelteryActionBatch {
		const actions: PlanedAction[] = [];
		const expectedState = {...this.state};

		const hasItems = expectedState.itemsIn.length > 0;
		if (hasItems) {
			for (const item of expectedState.itemsIn) {
				expectedState.itemsIn = [];
				expectedState.fluidInAmount += item.fluidAmountAfterMelting;
				if (expectedState.fluidIn.find((fluid) => fluid.fluidResource === item.fluidResource)) {
					expectedState.fluidIn.find((fluid) => fluid.fluidResource === item.fluidResource)!.fluidAmount += item.fluidAmountAfterMelting;
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

		const hasFluid = expectedState.fluidIn.length > 0;
		if (hasFluid) {
			for (const fluid of expectedState.fluidIn) {
				let fluidToDump = fluid.fluidAmount;
				const availableUnits: UnitMeasureType[] = FluidRegistry[fluid.fluidResource].availableUnits;
				availableUnits.sort((a: UnitMeasureType, b: UnitMeasureType) => UnitOfMeasure[b].costInMilliBucket - UnitOfMeasure[a].costInMilliBucket);
				switch (expectedState.mode) {
					case SmelteryMode.MANUAL:
					case SmelteryMode.AUTO_LARGEST:
					case SmelteryMode.BALANCED_ALLOY:
						for (const cast of availableUnits) {
							if (UnitOfMeasure[cast].hasCast) {
								const count = math.floor(fluidToDump / UnitOfMeasure[cast].costInMilliBucket);
								if (count > 0) {
									expectedState.fluidInAmount -= count * UnitOfMeasure[cast].costInMilliBucket;
									expectedState.fluidIn.find((fluid) => fluid.fluidResource === fluid.fluidResource)!.fluidAmount -= count * UnitOfMeasure[cast].costInMilliBucket;
									actions.push({
										action: {
											type: 'CAST',
											fluidName: fluid,
											amount: count * UnitOfMeasure[cast].costInMilliBucket,
											castType: cast,
										},
										expectedState: expectedState,
									});
									fluidToDump -= count * UnitOfMeasure[cast].costInMilliBucket;
								}
							}
						}
						break;
					case SmelteryMode.AUTO_NO_BLOCK:
						for (const cast of availableUnits) {
							if (cast !== 'BLOCK') {
								for (const cast of availableUnits) {
									if (UnitOfMeasure[cast].hasCast) {
										const count = math.floor(fluidToDump / UnitOfMeasure[cast].costInMilliBucket);
										if (count > 0) {
											expectedState.fluidInAmount -= count * UnitOfMeasure[cast].costInMilliBucket;
											expectedState.fluidIn.find((fluid) => fluid.fluidResource === fluid.fluidResource)!.fluidAmount -= count * UnitOfMeasure[cast].costInMilliBucket;
											actions.push({
												action: {
													type: 'CAST',
													fluidName: fluid,
													amount: count * UnitOfMeasure[cast].costInMilliBucket,
													castType: cast,
												},
												expectedState: expectedState,
											});
											fluidToDump -= count * UnitOfMeasure[cast].costInMilliBucket;
										}
									}
								}
							}
						}
						break;
					case SmelteryMode.AUTO_INGOTS_ONLY:
						for (const cast of availableUnits) {
							if (cast == 'INGOT' || cast == 'GEM') {
								for (const cast of availableUnits) {
									if (UnitOfMeasure[cast].hasCast) {
										const count = math.floor(fluidToDump / UnitOfMeasure[cast].costInMilliBucket);
										if (count > 0) {
											expectedState.fluidInAmount -= count * UnitOfMeasure[cast].costInMilliBucket;
											expectedState.fluidIn.find((fluid) => fluid.fluidResource === fluid.fluidResource)!.fluidAmount -= count * UnitOfMeasure[cast].costInMilliBucket;
											actions.push({
												action: {
													type: 'CAST',
													fluidName: fluid,
													amount: count * UnitOfMeasure[cast].costInMilliBucket,
													castType: cast,
												},
												expectedState: expectedState,
											});
											fluidToDump -= count * UnitOfMeasure[cast].costInMilliBucket;
										}
									}
								}
							}
						}
						break;
					default:
						this.state.status = SmelteryStatus.ERROR;
						return [];
				}

				if (fluidToDump > 0) {
					expectedState.fluidInAmount -= fluidToDump;
					expectedState.fluidIn = expectedState.fluidIn.filter((fluidToCheck) => fluidToCheck.fluidResource !== fluid.fluidResource);
					const tank = expectedState.residueTanksDetails.find((tank) => tank.fluidResource === fluid.fluidResource);
					if (tank) {
						tank.fluidAmount += fluidToDump;
					} else {
						expectedState.residueTanksDetails.push({
							fluidCapacity: CONFIG.SMELTERY.BASE_TANK_CAPACITY,
							fluidAmount: fluidToDump,
							fluidResource: fluid.fluidResource,
						});
					}
					actions.push({
						action: {
							type: 'EXTRACT_FLUID',
							fluidName: fluid.fluidResource,
							amount: fluidToDump,
						},
						expectedState: expectedState,
					});
				}
			}
		}

		const hasResidueInTank = expectedState.residueTanksDetails.length > 0;
		if (hasResidueInTank) {
			for (const fluid of expectedState.residueTanksDetails) {
				let fluidToDump = fluid.fluidAmount;
				const availableUnits: UnitMeasureType[] = FluidRegistry[fluid.fluidResource].availableUnits;
				availableUnits.sort((a: UnitMeasureType, b: UnitMeasureType) => UnitOfMeasure[b].costInMilliBucket - UnitOfMeasure[a].costInMilliBucket);
				switch (expectedState.mode) {
					case SmelteryMode.MANUAL:
					case SmelteryMode.AUTO_LARGEST:
					case SmelteryMode.BALANCED_ALLOY:
						for (const cast of availableUnits) {
							if (UnitOfMeasure[cast].hasCast) {
								const count = math.floor(fluidToDump / UnitOfMeasure[cast].costInMilliBucket);
								if (count > 0) {
									expectedState.residueTanksDetails.find((tank) => tank.fluidResource === fluid.fluidResource)!.fluidAmount -= count * UnitOfMeasure[cast].costInMilliBucket;
									expectedState.fluidInAmount += count * UnitOfMeasure[cast].costInMilliBucket;
									if (expectedState.fluidIn.find((fluid) => fluid.fluidResource === fluid.fluidResource)) {
										expectedState.fluidIn.find((fluid) => fluid.fluidResource === fluid.fluidResource)!.fluidAmount += count * UnitOfMeasure[cast].costInMilliBucket;
									} else {
										expectedState.fluidIn.push({
											fluidCapacity: 0,
											fluidAmount: count * UnitOfMeasure[cast].costInMilliBucket,
											fluidResource: fluid.fluidResource,
										});
									}
									actions.push({
										action: {
											type: 'INSERT_FLUID',
											fluidName: fluid.fluidResource,
											amount: count * UnitOfMeasure[cast].costInMilliBucket,
										},
										expectedState: expectedState,
									});
									expectedState.fluidInAmount -= count * UnitOfMeasure[cast].costInMilliBucket;
									expectedState.fluidIn.find((fluid) => fluid.fluidResource === fluid.fluidResource)!.fluidAmount -= count * UnitOfMeasure[cast].costInMilliBucket;
									actions.push({
										action: {
											type: 'CAST',
											fluidName: fluid,
											amount: count * UnitOfMeasure[cast].costInMilliBucket,
											castType: cast,
										},
										expectedState: expectedState,
									});
									fluidToDump -= count * UnitOfMeasure[cast].costInMilliBucket;
								}
							}
						}
						break;
					case SmelteryMode.AUTO_NO_BLOCK:
						for (const cast of availableUnits) {
							if (cast !== 'BLOCK') {
								for (const cast of availableUnits) {
									if (UnitOfMeasure[cast].hasCast) {
										const count = math.floor(fluidToDump / UnitOfMeasure[cast].costInMilliBucket);
										if (count > 0) {
											expectedState.residueTanksDetails.find((tank) => tank.fluidResource === fluid.fluidResource)!.fluidAmount -= count * UnitOfMeasure[cast].costInMilliBucket;
											expectedState.fluidInAmount += count * UnitOfMeasure[cast].costInMilliBucket;
											if (expectedState.fluidIn.find((fluid) => fluid.fluidResource === fluid.fluidResource)) {
												expectedState.fluidIn.find((fluid) => fluid.fluidResource === fluid.fluidResource)!.fluidAmount += count * UnitOfMeasure[cast].costInMilliBucket;
											} else {
												expectedState.fluidIn.push({
													fluidCapacity: 0,
													fluidAmount: count * UnitOfMeasure[cast].costInMilliBucket,
													fluidResource: fluid.fluidResource,
												});
											}
											actions.push({
												action: {
													type: 'INSERT_FLUID',
													fluidName: fluid.fluidResource,
													amount: count * UnitOfMeasure[cast].costInMilliBucket,
												},
												expectedState: expectedState,
											});
											expectedState.fluidInAmount -= count * UnitOfMeasure[cast].costInMilliBucket;
											expectedState.fluidIn.find((fluid) => fluid.fluidResource === fluid.fluidResource)!.fluidAmount -= count * UnitOfMeasure[cast].costInMilliBucket;
											actions.push({
												action: {
													type: 'CAST',
													fluidName: fluid,
													amount: count * UnitOfMeasure[cast].costInMilliBucket,
													castType: cast,
												},
												expectedState: expectedState,
											});
											fluidToDump -= count * UnitOfMeasure[cast].costInMilliBucket;
										}
									}
								}
							}
						}
						break;
					case SmelteryMode.AUTO_INGOTS_ONLY:
						for (const cast of availableUnits) {
							if (cast == 'INGOT' || cast == 'GEM') {
								for (const cast of availableUnits) {
									if (UnitOfMeasure[cast].hasCast) {
										const count = math.floor(fluidToDump / UnitOfMeasure[cast].costInMilliBucket);
										if (count > 0) {
											expectedState.residueTanksDetails.find((tank) => tank.fluidResource === fluid.fluidResource)!.fluidAmount -= count * UnitOfMeasure[cast].costInMilliBucket;
											expectedState.fluidInAmount += count * UnitOfMeasure[cast].costInMilliBucket;
											if (expectedState.fluidIn.find((fluid) => fluid.fluidResource === fluid.fluidResource)) {
												expectedState.fluidIn.find((fluid) => fluid.fluidResource === fluid.fluidResource)!.fluidAmount += count * UnitOfMeasure[cast].costInMilliBucket;
											} else {
												expectedState.fluidIn.push({
													fluidCapacity: 0,
													fluidAmount: count * UnitOfMeasure[cast].costInMilliBucket,
													fluidResource: fluid.fluidResource,
												});
											}
											actions.push({
												action: {
													type: 'INSERT_FLUID',
													fluidName: fluid.fluidResource,
													amount: count * UnitOfMeasure[cast].costInMilliBucket,
												},
												expectedState: expectedState,
											});
											expectedState.fluidInAmount -= count * UnitOfMeasure[cast].costInMilliBucket;
											expectedState.fluidIn.find((fluid) => fluid.fluidResource === fluid.fluidResource)!.fluidAmount -= count * UnitOfMeasure[cast].costInMilliBucket;
											actions.push({
												action: {
													type: 'CAST',
													fluidName: fluid,
													amount: count * UnitOfMeasure[cast].costInMilliBucket,
													castType: cast,
												},
												expectedState: expectedState,
											});
											fluidToDump -= count * UnitOfMeasure[cast].costInMilliBucket;
										}
									}
								}
							}
						}
						break;
					default:
						this.state.status = SmelteryStatus.ERROR;
						return [];
				}
			}
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
		const toReturn: SmelteryActionBatch = [];

		for (let i = 0; i < actions.length; i += CONFIG.SMELTERY.MAX_ACTIONS_PER_BATCH) {
			toReturn.push(actions.slice(i, i + CONFIG.SMELTERY.MAX_ACTIONS_PER_BATCH));
		}

		return toReturn;
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

		// TODO

		const toReturn: SmelteryActionBatch = [];

		for (let i = 0; i < actions.length; i += CONFIG.SMELTERY.MAX_ACTIONS_PER_BATCH) {
			toReturn.push(actions.slice(i, i + CONFIG.SMELTERY.MAX_ACTIONS_PER_BATCH));
		}

		return toReturn;
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

		// TODO

		const toReturn: SmelteryActionBatch = [];

		for (let i = 0; i < actions.length; i += CONFIG.SMELTERY.MAX_ACTIONS_PER_BATCH) {
			toReturn.push(actions.slice(i, i + CONFIG.SMELTERY.MAX_ACTIONS_PER_BATCH));
		}

		return toReturn;
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

		// TODO

		const toReturn: SmelteryActionBatch = [];

		for (let i = 0; i < actions.length; i += CONFIG.SMELTERY.MAX_ACTIONS_PER_BATCH) {
			toReturn.push(actions.slice(i, i + CONFIG.SMELTERY.MAX_ACTIONS_PER_BATCH));
		}

		return toReturn;
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

		// TODO

		const toReturn: SmelteryActionBatch = [];

		for (let i = 0; i < actions.length; i += CONFIG.SMELTERY.MAX_ACTIONS_PER_BATCH) {
			toReturn.push(actions.slice(i, i + CONFIG.SMELTERY.MAX_ACTIONS_PER_BATCH));
		}

		return toReturn;
	}
}
