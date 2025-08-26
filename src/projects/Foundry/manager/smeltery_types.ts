import {FluidKey, TankDetails, UnitMeasureType} from './fluid_types';
import {ItemKey, ItemsDetails}                  from './item_types';
import {SmelteryMode, SmelteryStatus}           from './smeltery_enums';

export type SmelteryAction = { [K in keyof SmelteryActionArgs]: { type: K } & SmelteryActionArgs[K] }[keyof SmelteryActionArgs];

export type SmelteryActionArgs = {
	SEND_CURRENT_STATE: {};
	WAIT_MELTING: {};
	EJECT_ITEM: { itemName: ItemKey; amount: number; };
	INSERT_ITEM: { itemName: ItemKey; amount: number; };
	INSERT_FLUID: { fluidName: FluidKey; amount: number; };
	EXTRACT_FLUID: { fluidName: FluidKey; amount: number; };
	EXTRACT_ITEM: { itemName: ItemKey; amount: number; };
	CAST: { fluidName: FluidKey; amount: number; castType: UnitMeasureType; };
}

export interface SmelteryState {
	mode: SmelteryMode;
	status: SmelteryStatus;
	fluidInCapacity: number;
	fluidInAmount: number;
	fluidIn: TankDetails[];
	itemInCapacity: number;
	itemInAmount: number;
	itemsIn: ItemKey[];
	itemsToProcess: ItemsDetails[];
	residueTanksCount: number;
	residueTanksDetails: TankDetails[];
}

export type PlanedAction = {
	action: SmelteryAction;
	expectedState: Partial<SmelteryState>;
}

export type SmelteryActionBatch = PlanedAction[][]