import {FluidResource} from './fluid_types';

export interface ItemResource {
	shouldBeAutomaticallyMelted: boolean;
	fluidResource: FluidResource;
	fluidAmountAfterMelting: number;
}