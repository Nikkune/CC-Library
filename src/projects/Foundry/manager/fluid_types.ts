import {UnitOfMeasure} from './fluid_enums';
import {ItemResource}  from './item_types';

export type UnitOfMeasureType = typeof UnitOfMeasure[keyof typeof UnitOfMeasure];

export interface FluidResource {
	availableUnits: UnitOfMeasureType[];
	packageable: boolean;
	obtentionMethods?: {
		alloying?: { ingredientsNeeded: FluidResource[]; };
		melting?: { ingredientsAccepted: ItemResource[]; };
	};
}

export interface TankDetails {
	fluidCapacity: number;
	fluidAmount: number;
	fluidResource: FluidResource | null;
}