import {UnitOfMeasure}                from './fluid_enums';
import {FluidResource, TankDetails}   from './fluid_types';
import {ItemResource}                 from './item_types';
import {SmelteryMode, SmelteryStatus} from './smeltery_enums';

export type CastType = { [K in keyof typeof UnitOfMeasure]: typeof UnitOfMeasure[K]['hasCast'] extends true ? K : never }[keyof typeof UnitOfMeasure]
export type SmelteryAction = { [K in keyof SmelteryActionArgs]: { type: K } & SmelteryActionArgs[K] }[keyof SmelteryActionArgs];

export type SmelteryActionArgs = {
	INSERT_FLUID: { fluidResource: FluidResource; amount: number; };
	EXTRACT_FLUID: { fluidResource: FluidResource; amount: number; };
	INSERT_ITEM: { itemResource: ItemResource; amount: number; };
	SEND_FLUID_WHEN_CHANGED: {};
	CAST: { fluidResource: FluidResource; amount: number; castType: CastType; };
}

export interface SmelteryState {
	mode: SmelteryMode;
	status: SmelteryStatus;
	fluidCapacity: number;
	fluidAmount: number;
	fluidIn: FluidResource[];
	itemCapacity: number;
	itemAmount: number;
	itemsIn: ItemResource[];
	residueTanksCount: number;
	residueTanksDetails: TankDetails[];
}