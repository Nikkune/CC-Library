import {UnitOfMeasure} from '../APIs/fluid_enums';
import {ItemResource}  from '../APIs/item_types';

const LAPIS_VARIANT: ItemResource = {
	shouldBeAutomaticallyMelted: true,
	fluidResource: 'MOLTEN_LAPIS',
	fluidAmountAfterMelting: 240 * UnitOfMeasure.mB.costInMilliBucket,
};

export const MeltableItems = {
	ANCIENT_DEBRIS: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_DEBRIS',
		fluidAmountAfterMelting: 120 * UnitOfMeasure.mB.costInMilliBucket,
	},
	LARGE_AMETHYST_BUD: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_AMETHYST',
		fluidAmountAfterMelting: 600 * UnitOfMeasure.mB.costInMilliBucket,
	},
	MEDIUM_AMETHYST_BUD: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_AMETHYST',
		fluidAmountAfterMelting: 400 * UnitOfMeasure.mB.costInMilliBucket,
	},
	SMALL_AMETHYST_BUD: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_AMETHYST',
		fluidAmountAfterMelting: 200 * UnitOfMeasure.mB.costInMilliBucket,
	},
	AMETHYST_CLUSTER: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_AMETHYST',
		fluidAmountAfterMelting: 800 * UnitOfMeasure.mB.costInMilliBucket,
	},
	AQUITE_ORE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_AQUITE',
		fluidAmountAfterMelting: 200 * UnitOfMeasure.mB.costInMilliBucket,
	},
	CHAROITE_ORE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_CHAROITE',
		fluidAmountAfterMelting: 200 * UnitOfMeasure.mB.costInMilliBucket,
	},
	DIAMOND_ORE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_DIAMOND',
		fluidAmountAfterMelting: 200 * UnitOfMeasure.mB.costInMilliBucket,
	},
	DIOPSIDE_ORE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_DIOPSIDE',
		fluidAmountAfterMelting: 200 * UnitOfMeasure.mB.costInMilliBucket,
	},
	EMERALD_ORE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_EMERALD',
		fluidAmountAfterMelting: 200 * UnitOfMeasure.mB.costInMilliBucket,
	},
	EPIDOTE_ORE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_EPIDOTE',
		fluidAmountAfterMelting: 200 * UnitOfMeasure.mB.costInMilliBucket,
	},
	FALSITE_ORE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_FALSITE',
		fluidAmountAfterMelting: 240 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_FALSITE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_FALSITE',
		fluidAmountAfterMelting: 120 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_FALSITE_BLOCK: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_FALSITE',
		fluidAmountAfterMelting: 1080 * UnitOfMeasure.mB.costInMilliBucket,
	},
	HORIZONITE_ORE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_HORIZONITE',
		fluidAmountAfterMelting: 240 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_HORIZONITE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_HORIZONITE',
		fluidAmountAfterMelting: 120 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_HORIZONITE_BLOCK: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_HORIZONITE',
		fluidAmountAfterMelting: 1080 * UnitOfMeasure.mB.costInMilliBucket,
	},
	HUREAULITE_ORE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_HUREAULITE',
		fluidAmountAfterMelting: 200 * UnitOfMeasure.mB.costInMilliBucket,
	},
	KEPU_ORE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_KEPU',
		fluidAmountAfterMelting: 240 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_KEPU: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_KEPU',
		fluidAmountAfterMelting: 120 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_KEPU_BLOCK: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_KEPU',
		fluidAmountAfterMelting: 1080 * UnitOfMeasure.mB.costInMilliBucket,
	},
	LAPIS_ORE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_LAPIS',
		fluidAmountAfterMelting: 600 * UnitOfMeasure.mB.costInMilliBucket,
	},
	GLACIO_LAPIS_ORE: LAPIS_VARIANT,
	ARIDROCK_LAPIS_ORE: LAPIS_VARIANT,
	LIMESTONE_LAPIS_ORE: LAPIS_VARIANT,
	ALUMINUM_ORE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_ALUMINUM',
		fluidAmountAfterMelting: 240 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_ALUMINUM: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_ALUMINUM',
		fluidAmountAfterMelting: 120 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_ALUMINUM_BLOCK: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_ALUMINUM',
		fluidAmountAfterMelting: 1080 * UnitOfMeasure.mB.costInMilliBucket,
	},
	CALORITE_ORE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_CALORITE',
		fluidAmountAfterMelting: 240 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_CALORITE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_CALORITE',
		fluidAmountAfterMelting: 120 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_CALORITE_BLOCK: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_CALORITE',
		fluidAmountAfterMelting: 1080 * UnitOfMeasure.mB.costInMilliBucket,
	},
	CLOGGRUM_ORE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_CLOGGRUM',
		fluidAmountAfterMelting: 240 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_CLOGGRUM: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_CLOGGRUM',
		fluidAmountAfterMelting: 120 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_CLOGGRUM_BLOCK: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_CLOGGRUM',
		fluidAmountAfterMelting: 1080 * UnitOfMeasure.mB.costInMilliBucket,
	},
	COBALT_ORE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_COBALT',
		fluidAmountAfterMelting: 240 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_COBALT: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_COBALT',
		fluidAmountAfterMelting: 120 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_COBALT_BLOCK: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_COBALT',
		fluidAmountAfterMelting: 1080 * UnitOfMeasure.mB.costInMilliBucket,
	},
	COPPER_ORE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_COPPER',
		fluidAmountAfterMelting: 720 * UnitOfMeasure.mB.costInMilliBucket,
	},
	GLACIO_COPPER_ORE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_COPPER',
		fluidAmountAfterMelting: 240 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_COPPER: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_COPPER',
		fluidAmountAfterMelting: 120 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_COPPER_BLOCK: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_COPPER',
		fluidAmountAfterMelting: 1080 * UnitOfMeasure.mB.costInMilliBucket,
	},
	DESH_ORE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_DESH',
		fluidAmountAfterMelting: 240 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_DESH: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_DESH',
		fluidAmountAfterMelting: 120 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_DESH_BLOCK: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_DESH',
		fluidAmountAfterMelting: 1080 * UnitOfMeasure.mB.costInMilliBucket,
	},
	DRACONIUM_ORE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_DRACONIUM',
		fluidAmountAfterMelting: 240 * UnitOfMeasure.mB.costInMilliBucket,
	},
	ELEMENTIUM_ORE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_ELEMENTIUM',
		fluidAmountAfterMelting: 240 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_ELEMENTIUM: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_ELEMENTIUM',
		fluidAmountAfterMelting: 120 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_ELEMENTIUM_BLOCK: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_ELEMENTIUM',
		fluidAmountAfterMelting: 1080 * UnitOfMeasure.mB.costInMilliBucket,
	},
	FROSTSTEEL_ORE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_FROSTSTEEL',
		fluidAmountAfterMelting: 240 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_FROSTSTEEL: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_FROSTSTEEL',
		fluidAmountAfterMelting: 120 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_FROSTSTEEL_BLOCK: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_FROSTSTEEL',
		fluidAmountAfterMelting: 1080 * UnitOfMeasure.mB.costInMilliBucket,
	},
	GILDED_BLACKSTONE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_GOLD',
		fluidAmountAfterMelting: 80 * UnitOfMeasure.mB.costInMilliBucket,
	},
	GOLD_ORE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_GOLD',
		fluidAmountAfterMelting: 240 * UnitOfMeasure.mB.costInMilliBucket,
	},
	NETHER_GOLD_ORE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_GOLD',
		fluidAmountAfterMelting: 120 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_GOLD: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_GOLD',
		fluidAmountAfterMelting: 120 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_GOLD_BLOCK: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_GOLD',
		fluidAmountAfterMelting: 1080 * UnitOfMeasure.mB.costInMilliBucket,
	},
	IESNIUM_ORE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_IESNIUM',
		fluidAmountAfterMelting: 240 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_IESNIUM: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_IESNIUM',
		fluidAmountAfterMelting: 120 * UnitOfMeasure.mB.costInMilliBucket,
	},
	IRON_ORE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_IRON',
		fluidAmountAfterMelting: 240 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_IRON: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_IRON',
		fluidAmountAfterMelting: 120 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_IRON_BLOCK: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_IRON',
		fluidAmountAfterMelting: 1080 * UnitOfMeasure.mB.costInMilliBucket,
	},
	LEAD_ORE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_LEAD',
		fluidAmountAfterMelting: 240 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_LEAD: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_LEAD',
		fluidAmountAfterMelting: 120 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_LEAD_BLOCK: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_LEAD',
		fluidAmountAfterMelting: 1080 * UnitOfMeasure.mB.costInMilliBucket,
	},
	NICKEL_ORE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_NICKEL',
		fluidAmountAfterMelting: 240 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_NICKEL: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_NICKEL',
		fluidAmountAfterMelting: 120 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_NICKEL_BLOCK: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_NICKEL',
		fluidAmountAfterMelting: 1080 * UnitOfMeasure.mB.costInMilliBucket,
	},
	OSMIUM_ORE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_OSMIUM',
		fluidAmountAfterMelting: 240 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_OSMIUM: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_OSMIUM',
		fluidAmountAfterMelting: 120 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_OSMIUM_BLOCK: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_OSMIUM',
		fluidAmountAfterMelting: 1080 * UnitOfMeasure.mB.costInMilliBucket,
	},
	OSTRUM_ORE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_OSTRUM',
		fluidAmountAfterMelting: 240 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_OSTRUM: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_OSTRUM',
		fluidAmountAfterMelting: 120 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_OSTRUM_BLOCK: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_OSTRUM',
		fluidAmountAfterMelting: 1080 * UnitOfMeasure.mB.costInMilliBucket,
	},
	REGALIUM_ORE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_REGALIUM',
		fluidAmountAfterMelting: 240 * UnitOfMeasure.mB.costInMilliBucket,
	},
	SILVER_ORE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_SILVER',
		fluidAmountAfterMelting: 240 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_SILVER: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_SILVER',
		fluidAmountAfterMelting: 120 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_SILVER_BLOCK: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_SILVER',
		fluidAmountAfterMelting: 1080 * UnitOfMeasure.mB.costInMilliBucket,
	},
	TIN_ORE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_TIN',
		fluidAmountAfterMelting: 240 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_TIN: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_TIN',
		fluidAmountAfterMelting: 120 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_TIN_BLOCK: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_TIN',
		fluidAmountAfterMelting: 1080 * UnitOfMeasure.mB.costInMilliBucket,
	},
	URANIUM_ORE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_URANIUM',
		fluidAmountAfterMelting: 240 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_URANIUM: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_URANIUM',
		fluidAmountAfterMelting: 120 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_URANIUM_BLOCK: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_URANIUM',
		fluidAmountAfterMelting: 1080 * UnitOfMeasure.mB.costInMilliBucket,
	},
	UTHERIUM_ORE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_UTHERIUM',
		fluidAmountAfterMelting: 240 * UnitOfMeasure.mB.costInMilliBucket,
	},
	ZINC_ORE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_ZINC',
		fluidAmountAfterMelting: 240 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_ZINC: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_ZINC',
		fluidAmountAfterMelting: 120 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_ZINC_BLOCK: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_ZINC',
		fluidAmountAfterMelting: 1080 * UnitOfMeasure.mB.costInMilliBucket,
	},
	MOONSTONE_ORE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_MOONSTONE',
		fluidAmountAfterMelting: 100 * UnitOfMeasure.mB.costInMilliBucket,
	},
	PYROPE_ORE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_PYROPE',
		fluidAmountAfterMelting: 200 * UnitOfMeasure.mB.costInMilliBucket,
	},
	QUARTZ_ORE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_QUARTZ',
		fluidAmountAfterMelting: 200 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RED_BERYL_ORE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_RED_BERYL',
		fluidAmountAfterMelting: 200 * UnitOfMeasure.mB.costInMilliBucket,
	},
	EARTH_SLIME_CRYSTAL_CLUSTER: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'EARTH_SLIME',
		fluidAmountAfterMelting: 2000 * UnitOfMeasure.mB.costInMilliBucket,
	},
	LARGE_EARTH_SLIME_CRYSTAL_BUD: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'EARTH_SLIME',
		fluidAmountAfterMelting: 1500 * UnitOfMeasure.mB.costInMilliBucket,
	},
	MEDIUM_EARTH_SLIME_CRYSTAL_BUD: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'EARTH_SLIME',
		fluidAmountAfterMelting: 1000 * UnitOfMeasure.mB.costInMilliBucket,
	},
	SMALL_EARTH_SLIME_CRYSTAL_BUD: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'EARTH_SLIME',
		fluidAmountAfterMelting: 500 * UnitOfMeasure.mB.costInMilliBucket,
	},
	ENDER_SLIME_CRYSTAL_CLUSTER: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'ENDER_SLIME',
		fluidAmountAfterMelting: 2000 * UnitOfMeasure.mB.costInMilliBucket,
	},
	LARGE_ENDER_SLIME_CRYSTAL_BUD: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'ENDER_SLIME',
		fluidAmountAfterMelting: 1500 * UnitOfMeasure.mB.costInMilliBucket,
	},
	MEDIUM_ENDER_SLIME_CRYSTAL_BUD: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'ENDER_SLIME',
		fluidAmountAfterMelting: 1000 * UnitOfMeasure.mB.costInMilliBucket,
	},
	SMALL_ENDER_SLIME_CRYSTAL_BUD: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'ENDER_SLIME',
		fluidAmountAfterMelting: 500 * UnitOfMeasure.mB.costInMilliBucket,
	},
	ICHOR_SLIME_CRYSTAL_CLUSTER: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'ICHOR',
		fluidAmountAfterMelting: 2000 * UnitOfMeasure.mB.costInMilliBucket,
	},
	LARGE_ICHOR_SLIME_CRYSTAL_BUD: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'ICHOR',
		fluidAmountAfterMelting: 1500 * UnitOfMeasure.mB.costInMilliBucket,
	},
	MEDIUM_ICHOR_SLIME_CRYSTAL_BUD: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'ICHOR',
		fluidAmountAfterMelting: 1000 * UnitOfMeasure.mB.costInMilliBucket,
	},
	SMALL_ICHOR_SLIME_CRYSTAL_BUD: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'ICHOR',
		fluidAmountAfterMelting: 500 * UnitOfMeasure.mB.costInMilliBucket,
	},
	SKY_SLIME_CRYSTAL_CLUSTER: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'SKY_SLIME',
		fluidAmountAfterMelting: 2000 * UnitOfMeasure.mB.costInMilliBucket,
	},
	LARGE_SKY_SLIME_CRYSTAL_BUD: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'SKY_SLIME',
		fluidAmountAfterMelting: 1500 * UnitOfMeasure.mB.costInMilliBucket,
	},
	MEDIUM_SKY_SLIME_CRYSTAL_BUD: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'SKY_SLIME',
		fluidAmountAfterMelting: 1000 * UnitOfMeasure.mB.costInMilliBucket,
	},
	SMALL_SKY_SLIME_CRYSTAL_BUD: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'SKY_SLIME',
		fluidAmountAfterMelting: 500 * UnitOfMeasure.mB.costInMilliBucket,
	},
	VENTIUM_ORE: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_VENTIUM',
		fluidAmountAfterMelting: 240 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_VENTIUM: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_VENTIUM',
		fluidAmountAfterMelting: 120 * UnitOfMeasure.mB.costInMilliBucket,
	},
	RAW_VENTIUM_BLOCK: {
		shouldBeAutomaticallyMelted: true,
		fluidResource: 'MOLTEN_VENTIUM',
		fluidAmountAfterMelting: 1080 * UnitOfMeasure.mB.costInMilliBucket,
	},
} as const satisfies Record<string, ItemResource>;