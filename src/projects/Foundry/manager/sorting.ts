//import {Smeltery}                                                                          from './smeltery';
//
//export class Sorting {
//	private readonly smeltery: Smeltery;
//	private readonly notMeltableInventory: string;
//	private readonly leftoverTanks: Tank[];
//
//	constructor(smeltery: Smeltery, notMeltableInventory: string, leftoverTanks: Tank[]) {
//		this.smeltery = smeltery;
//		this.notMeltableInventory = notMeltableInventory;
//		this.leftoverTanks = leftoverTanks;
//	}
//
//	// =============================
//	// Helper
//	// =============================
//
//	private isCastable(cast: FluidAmount): casts | undefined {
//		switch (cast) {
//			case FluidAmount.NUGGET:
//				return 'NUGGET';
//			case FluidAmount.INGOT:
//				return 'INGOT';
//			case FluidAmount.GEM:
//				return 'GEM';
//			case FluidAmount.PANE:
//				return 'PANE';
//			case FluidAmount.BLOCK:
//				return 'BLOCK';
//			default:
//				return undefined;
//		}
//	}
//
//	private moveToTank(fluid: SmelteryFluidInfo, amount: number): IMoveResult {
//		const actions: ISmelteryAction[] = [];
//		let toMove = amount;
//
//		// Step 1: Fill tanks with the same fluid
//		for (const tank of this.leftoverTanks) {
//			if (toMove === 0) break;
//
//			if (tank.fluidName !== fluid.name) continue;
//
//			const capacity = tank.capacity - tank.amount;
//			if (capacity <= 0) continue;
//
//			const amountToAdd = Math.min(toMove, capacity);
//			actions.push({
//				type: ActionType.MOVE_FLUID,
//				to: tank.peripheralName,
//				fluid: fluid,
//				amount: amountToAdd,
//			});
//
//			toMove -= amountToAdd;
//		}
//
//		// Step 2: If we still have fluid, fill empty tanks with it
//		for (const tank of this.leftoverTanks) {
//			if (toMove === 0) break;
//
//			if (tank.amount > 0) continue; // pas vide
//
//			const amountToAdd = Math.min(toMove, tank.capacity);
//			actions.push({
//				type: ActionType.MOVE_FLUID,
//				from: 'smeltery',
//				to: tank.peripheralName,
//				fluid,
//				amount: amountToAdd,
//			});
//
//			toMove -= amountToAdd;
//		}
//
//		// Step 3: If we still have fluid, return it
//		if (toMove > 0) {
//			return {
//				success: false,
//				actions,
//				error: `Cannot process ${fluid.name} (${toMove}mB): all tanks are full or incompatible`,
//			};
//		}
//
//		return {success: true, actions};
//	}
//
//	private packageOrMoveToTank(fluid: SmelteryFluidInfo, amount: number): IMoveResult {
//		const actions: ISmelteryAction[] = [];
//
//		// Step 1: Package as much as possible
//		if (amount >= 1000) {
//			const count = Math.floor(amount / 1000);
//			actions.push({
//				type: ActionType.PACKAGE_FLUID,
//				fluid,
//				amount: count * 1000,
//			});
//			amount -= count * 1000;
//		}
//
//		// Step 2: If we still have fluid, fill empty tanks with it
//		if (amount > 0) {
//			const result = this.moveToTank(fluid, amount);
//			if (!result.success) {
//				return {success: false, actions: [...actions, ...result.actions], error: result.error};
//			}
//			actions.push(...result.actions);
//		}
//
//		// Step 3: If we still have fluid, return it
//		if (amount > 0) {
//			return {
//				success: false,
//				actions,
//				error: `Cannot process ${fluid.name} (${amount}mB): all tanks are full or incompatible`,
//			};
//		}
//
//		return {success: true, actions};
//	}
//
//	private insertFromTankIfAvailable(actions: ISmelteryAction[], fluid: SmelteryFluidInfo): number {
//		let totalAmount = fluid.amount;
//		for (const tank of this.leftoverTanks) {
//			if (tank.fluidName === fluid.name && tank.amount > 0) {
//				actions.push({
//					type: ActionType.INSERT_FLUID,
//					from: tank.peripheralName,
//					fluid,
//					amount: tank.amount,
//				});
//				totalAmount += tank.amount;
//			}
//		}
//		return totalAmount;
//	}
//
//	private castFluid(fluid: SmelteryFluidInfo, amountToProcess: number, cast: FluidAmount[] | FluidAmount): IMoveResult {
//		const actions: ISmelteryAction[] = [];
//
//		if (Array.isArray(cast)) {
//			const sortedCasts = fluid.fluid.validCasts.sort((a, b) => b - a).map(c => this.isCastable(c)).filter(Boolean) as casts[];
//
//			for (const castName of sortedCasts) {
//				const castAmount = FluidAmount[castName];
//				if (amountToProcess >= castAmount) {
//					const count = Math.floor(amountToProcess / castAmount);
//					actions.push({
//						type: ActionType.CAST_FLUID,
//						fluid: fluid,
//						cast: castName,
//						amount: castAmount * count,
//					});
//					amountToProcess -= castAmount * count;
//				}
//			}
//		} else {
//			const count = Math.floor(amountToProcess / cast);
//			if (count > 0) {
//				actions.push({
//					type: ActionType.CAST_FLUID,
//					fluid: fluid,
//					cast: 'INGOT',
//					amount: cast * count,
//				});
//				amountToProcess -= cast * count;
//			}
//		}
//
//		if (amountToProcess > 0) {
//			const result = this.moveToTank(fluid, amountToProcess);
//			if (result.success) {
//				actions.push(...result.actions);
//			} else {
//				return {
//					success: false,
//					actions,
//					error: `Cannot process ${fluid.name} (${amountToProcess}mB): remaining fluid could not be handled`,
//				};
//			}
//		}
//
//		return {success: true, actions};
//	};
//
//	public clearSmelteryAndLeftoverTanksIfPossible(mode: SmelteryMode): IMoveResult {
//		const actions: ISmelteryAction[] = [];
//		const fluids = this.smeltery.getFluidInSmeltery().sort((a, b) => b.amount - a.amount);
//
//		if (fluids.length === 0) return {success: true, actions};
//
//		const handleResult = (result: IMoveResult): IMoveResult | null => {
//			if (result.success) {
//				actions.push(...result.actions);
//				return null; // ok
//			}
//			return {
//				success: false,
//				actions,
//				error: result.error,
//			};
//		};
//
//		for (const fluid of fluids) {
//			let amountToProcess = this.insertFromTankIfAvailable(actions, fluid);
//
//			if (!fluid.fluid) {
//				const result = this.packageOrMoveToTank(fluid, amountToProcess);
//				const err = handleResult(result);
//				if (err) return err;
//				continue;
//			}
//
//			let result: IMoveResult;
//			switch (mode) {
//				case SmelteryMode.MANUAL:
//				case SmelteryMode.BALANCED_ALLOY:
//				case SmelteryMode.AUTO_LARGEST:
//					result = this.castFluid(fluid, amountToProcess, fluid.fluid.validCasts);
//					break;
//				case SmelteryMode.AUTO_NO_BLOCK:
//					result = this.castFluid(fluid, amountToProcess, fluid.fluid.validCasts.filter(c => c !== FluidAmount.BLOCK));
//					break;
//				case SmelteryMode.AUTO_INGOTS_ONLY:
//					result = this.castFluid(fluid, amountToProcess, FluidAmount.INGOT);
//					break;
//			}
//
//			const err = handleResult(result);
//			if (err) return err;
//		}
//
//		return {success: true, actions};
//	}
//
//	public moveNotMeltable(items: Items[]): IMoveResult {
//		const actions: ISmelteryAction[] = [];
//
//		for (const item of items) {
//			actions.push({
//				type: ActionType.MOVE_ITEM,
//				item: item.name,
//				amount: item.amount,
//				to: this.notMeltableInventory,
//			});
//		}
//
//		return {success: true, actions};
//	}
//}