export const UnitOfMeasure = {
	NUGGET: {
		costInMilliBucket: 10,
		hasCast: true,
	},
	INGOT: {
		costInMilliBucket: 90,
		hasCast: true,
	},
	GEM: {
		costInMilliBucket: 100,
		hasCast: true,
	},
	PANE: {
		costInMilliBucket: 250,
		hasCast: true,
	},
	SLIMEBALL: {
		costInMilliBucket: 250,
		hasCast: false,
	},
	BOTTLE: {
		costInMilliBucket: 250,
		hasCast: false,
	},
	BLOCK: {
		costInMilliBucket: 810,
		hasCast: true,
	},
	BUCKET: {
		costInMilliBucket: 1000,
		hasCast: false,
	},
	mB: {
		costInMilliBucket: 1,
		hasCast: false,
	},
} as const satisfies Record<string, {costInMilliBucket: number; hasCast: boolean}>;