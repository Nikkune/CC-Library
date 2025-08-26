import {FluidKey}      from './fluid_types';
import {MeltableItems} from '../manager/item_registry';

//@ts-ignore
export type ItemKey = keyof typeof MeltableItems;

export interface ItemResource {
	shouldBeAutomaticallyMelted: boolean;
	//@ts-ignore
	fluidResource: FluidKey;
	fluidAmountAfterMelting: number;
}

export interface ItemsDetails {
	itemName: ItemKey;
	itemAmount: number;
}