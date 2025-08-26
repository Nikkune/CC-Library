import {UnitOfMeasure} from './fluid_enums';
import {FluidRegistry} from './fluid_registry';
import {ItemKey}       from './item_types';

//@ts-ignore
export type FluidKey = keyof typeof FluidRegistry;
export type UnitMeasureType = keyof typeof UnitOfMeasure;

export interface AlloyingRecipe {
	//@ts-ignore
	readonly ingredientsNeeded: readonly FluidKey[];
	readonly quantityNeeded: readonly number[];
	readonly quantityProduced: number;
}

export interface FluidResource {
	readonly availableUnits: readonly UnitMeasureType[];
	readonly shouldKeep: boolean;
	readonly obtentionMethods?: {
		readonly alloying?: readonly AlloyingRecipe[];
		//@ts-ignore
		readonly melting?: readonly ItemKey[];
	};
}

export interface TankDetails {
	fluidCapacity: number;
	fluidAmount: number;
	fluidResource: FluidKey | null;
}