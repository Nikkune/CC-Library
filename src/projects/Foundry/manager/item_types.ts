import {FluidRegistry} from './fluid_registry';

export type MeltableItemsType = {
	readonly [K: string]: ItemResource;
};

export interface ItemResource {
	shouldBeAutomaticallyMelted: boolean;
	fluidResource: (keyof typeof FluidRegistry);
	fluidAmountAfterMelting: number;
}