import {UnitOfMeasure} from './fluid_enums';
import {FluidRegistry} from './fluid_registry';
import {MeltableItems} from './item_registry';

//@ts-ignore
export type FluidKey = keyof typeof FluidRegistry;

export interface AlloyingRecipe {
	//@ts-ignore
	readonly ingredientsNeeded: readonly FluidKey[];
	readonly quantityNeeded: readonly number[];
	readonly quantityProduced: number;
}

export interface FluidResource {
	readonly availableUnits: readonly (keyof typeof UnitOfMeasure)[];
	readonly shouldKeep: boolean;
	readonly obtentionMethods?: {
		readonly alloying?: readonly AlloyingRecipe[];
		readonly melting?: readonly (keyof typeof MeltableItems)[];
	};
}

export interface TankDetails {
	fluidCapacity: number;
	fluidAmount: number;
	fluidResource: FluidResource | null;
}