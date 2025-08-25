import {FluidResource} from './fluid_types';

export const FluidRegistry = {
	MOLTEN_BAOLIAN: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			alloying: [
				{
					ingredientsNeeded: ['MOLTEN_OBSIDIAN', 'MOLTEN_RED_BERYL', 'MOLTEN_EPIDOTE'],
					quantityNeeded: [1000, 100, 100],
					quantityProduced: 180,
				},
			],
		},
	},
	MOLTEN_BLAZING_COPPER: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			alloying: [
				{
					ingredientsNeeded: ['MOLTEN_COPPER', 'BLAZING_BLOOD'],
					quantityNeeded: [810, 1000],
					quantityProduced: 810,
				},
			],
		},
	},
	MOLTEN_CYBER_STEEL: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			alloying: [
				{
					ingredientsNeeded: ['MOLTEN_CHORUS_METAL', 'MAGMA', 'LIQUID_COAL'],
					quantityNeeded: [180, 250, 250],
					quantityProduced: 90,
				},
			],
		},
	},
	MOLTEN_DURALUMIN: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			alloying: [
				{
					ingredientsNeeded: ['MOLTEN_COPPER', 'MOLTEN_ALUMINUM'],
					quantityNeeded: [90, 810],
					quantityProduced: 450,
				},
			],
		},
	},
	MOLTEN_DURASTEEL: {
		availableUnits: [],
		shouldKeep: true,
		obtentionMethods: {
			alloying: [
				{
					ingredientsNeeded: ['MOLTEN_ENDER', 'MOLTEN_ALUMINUM', 'MOLTEN_DEBRIS'],
					quantityNeeded: [250, 90, 90],
					quantityProduced: 90,
				},
			],
		},
	},
	MOLTEN_ELECTRICAL_COPPER: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			alloying: [
				{
					ingredientsNeeded: ['MOLTEN_BLAZING_COPPER', 'LIQUID_REDSTONE'],
					quantityNeeded: [180, 1000],
					quantityProduced: 180,
				},
			],
		},
	},
	MOLTEN_FELSTEEL: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			alloying: [
				{
					ingredientsNeeded: ['MOLTEN_BLAZING_COPPER', 'MOLTEN_DEBRIS', 'MOLTEN_DURALUMIN'],
					quantityNeeded: [180, 180, 180],
					quantityProduced: 270,
				},
			],
		},
	},
	MOLTEN_GALU: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			alloying: [
				{
					ingredientsNeeded: ['MOLTEN_OBSIDIAN', 'MOLTEN_RED_BERYL', 'MOLTEN_HUREAULITE'],
					quantityNeeded: [1000, 100, 100],
					quantityProduced: 180,
				},
			],
		},
	},
	MOLTEN_GAUSUM: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			alloying: [
				{
					ingredientsNeeded: ['MOLTEN_BLAZING_COPPER', 'MOLTEN_DEBRIS', 'MOLTEN_LAPIS'],
					quantityNeeded: [180, 180, 810],
					quantityProduced: 180,
				},
			],
		},
	},
	MOLTEN_MAGMA_STEEL: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			alloying: [
				{
					ingredientsNeeded: ['MOLTEN_IRON', 'MAGMA', 'LIQUID_COAL'],
					quantityNeeded: [180, 250, 250],
					quantityProduced: 90,
				},
			],
		},
	},
	MOLTEN_PROTO_LAVA: {
		availableUnits: [],
		shouldKeep: true,
		obtentionMethods: {
			alloying: [
				{
					ingredientsNeeded: ['MOLTEN_ENDER', 'MOLTEN_CHORUS', 'LAVA'],
					quantityNeeded: [250, 90, 1000],
					quantityProduced: 1000,
				},
			],
		},
	},
	MOLTEN_YOKEL: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			alloying: [
				{
					ingredientsNeeded: ['MOLTEN_KELP', 'MOLTEN_ALUMINUM', 'MOLTEN_IRON'],
					quantityNeeded: [250, 90, 90],
					quantityProduced: 180,
				},
			],
		},
	},
	MOLTEN_AMETHYST_BRONZE: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			alloying: [
				{
					ingredientsNeeded: ['MOLTEN_COPPER', 'MOLTEN_AMETHYST'],
					quantityNeeded: [90, 100],
					quantityProduced: 90,
				},
			],
		},
	},
	MOLTEN_BRASS: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			alloying: [
				{
					ingredientsNeeded: ['MOLTEN_COPPER', 'MOLTEN_ZINC'],
					quantityNeeded: [90, 90],
					quantityProduced: 180,
				},
			],
		},
	},
	MOLTEN_BRONZE: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			alloying: [
				{
					ingredientsNeeded: ['MOLTEN_COPPER', 'MOLTEN_TIN'],
					quantityNeeded: [270, 90],
					quantityProduced: 360,
				},
			],
		},
	},
	MOLTEN_CONSTANTAN: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			alloying: [
				{
					ingredientsNeeded: ['MOLTEN_COPPER', 'MOLTEN_NICKEL'],
					quantityNeeded: [90, 90],
					quantityProduced: 180,
				},
			],
		},
	},
	MOLTEN_ELECTRUM: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			alloying: [
				{
					ingredientsNeeded: ['MOLTEN_GOLD', 'MOLTEN_SILVER'],
					quantityNeeded: [90, 90],
					quantityProduced: 180,
				},
			],
		},
	},
	MOLTEN_INVAR: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			alloying: [
				{
					ingredientsNeeded: ['MOLTEN_IRON', 'MOLTEN_NICKEL'],
					quantityNeeded: [180, 90],
					quantityProduced: 270,
				},
			],
		},
	},
	MOLTEN_MANYULLYN: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			alloying: [
				{
					ingredientsNeeded: ['MOLTEN_COBALT', 'MOLTEN_DEBRIS'],
					quantityNeeded: [270, 90],
					quantityProduced: 360,
				},
			],
		},
	},
	MOLTEN_NETHERITE: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			alloying: [
				{
					ingredientsNeeded: ['MOLTEN_DEBRIS', 'MOLTEN_GOLD'],
					quantityNeeded: [40, 20],
					quantityProduced: 10,
				},
			],
		},
	},
	MOLTEN_OBSIDIAN: {
		availableUnits: ['BLOCK'],
		shouldKeep: true,
		obtentionMethods: {
			alloying: [
				{
					ingredientsNeeded: ['WATER', 'LAVA'],
					quantityNeeded: [50, 100],
					quantityProduced: 100,
				},
			],
		},
	},
	MOLTEN_ROSE_GOLD: {
		availableUnits: ['BLOCK'],
		shouldKeep: true,
		obtentionMethods: {
			alloying: [
				{
					ingredientsNeeded: ['MOLTEN_COPPER', 'MOLTEN_GOLD'],
					quantityNeeded: [90, 90],
					quantityProduced: 180,
				},
			],
		},
	},
	MOLTEN_ENDERIUM: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			alloying: [
				{
					ingredientsNeeded: ['MOLTEN_LEAD', 'MOLTEN_DIAMOND', 'MOLTEN_ENDER'],
					quantityNeeded: [270, 100, 500],
					quantityProduced: 180,
				},
			],
		},
	},
	MOLTEN_FAIRY: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			alloying: [
				{
					ingredientsNeeded: ['MOLTEN_GOLD', 'LIQUID_SOUL', 'MILK'],
					quantityNeeded: [90, 1000, 1000],
					quantityProduced: 180,
				},
			],
		},
	},
	MOLTEN_HEPATIZON: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			alloying: [
				{
					ingredientsNeeded: ['MOLTEN_COPPER', 'MOLTEN_COBALT', 'MOLTEN_QUARTZ'],
					quantityNeeded: [180, 90, 400],
					quantityProduced: 180,
				},
			],
		},
	},
	MOLTEN_LUMIUM: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			alloying: [
				{
					ingredientsNeeded: ['MOLTEN_TIN', 'MOLTEN_SILVER', 'ENERGIZED_GLOWSTONE'],
					quantityNeeded: [270, 90, 500],
					quantityProduced: 360,
				},
			],
		},
	},
	MOLTEN_PIG_IRON: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			alloying: [
				{
					ingredientsNeeded: ['MOLTEN_IRON', 'BLOOD', 'HONEY'],
					quantityNeeded: [90, 500, 250],
					quantityProduced: 180,
				},
			],
		},
	},
	MOLTEN_PINK_SLIME: {
		availableUnits: ['INGOT'],
		shouldKeep: true,
		obtentionMethods: {
			alloying: [
				{
					ingredientsNeeded: ['MOLTEN_GOLD', 'MOLTEN_IRON', 'PINK_SLIME'],
					quantityNeeded: [180, 180, 1000],
					quantityProduced: 90,
				},
			],
		},
	},
	MOLTEN_QUEENS_SLIME: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			alloying: [
				{
					ingredientsNeeded: ['MOLTEN_COBALT', 'MOLTEN_GOLD', 'MAGMA'],
					quantityNeeded: [90, 90, 250],
					quantityProduced: 180,
				},
			],
		},
	},
	MOLTEN_REFINED_OBSIDIAN: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			alloying: [
				{
					ingredientsNeeded: ['MOLTEN_OBSIDIAN', 'MOLTEN_DIAMOND', 'MOLTEN_OSMIUM'],
					quantityNeeded: [250, 100, 90],
					quantityProduced: 90,
				},
			],
		},
	},
	MOLTEN_SIGNALUM: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			alloying: [
				{
					ingredientsNeeded: ['MOLTEN_COPPER', 'MOLTEN_SILVER', 'LIQUID_REDSTONE'],
					quantityNeeded: [270, 90, 400],
					quantityProduced: 360,
				},
			],
		},
	},
	MOLTEN_SLIMESTEEL: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			alloying: [
				{
					ingredientsNeeded: ['MOLTEN_IRON', 'SKY_SLIME', 'SEARED_STONE'],
					quantityNeeded: [90, 250, 250],
					quantityProduced: 180,
				},
			],
		},
	},
	DRAGONSTEEL: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {},
	},
	SHELLITE: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {},
	},
	SOUL_INFUSED: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {},
	},
	TWINITE: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {},
	},
	MOLTEN_ALUMINUM: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			melting: ['ALUMINUM_ORE', 'RAW_ALUMINUM', 'RAW_ALUMINUM_BLOCK'],
		},
	},
	BLAZING_BLOOD: {
		availableUnits: [],
		shouldKeep: true,
		obtentionMethods: {},
	},
	MOLTEN_GLASS: {
		availableUnits: ['BLOCK', 'PANE'],
		shouldKeep: false,
		obtentionMethods: {},
	},
	WATER: {
		availableUnits: [],
		shouldKeep: false,
		obtentionMethods: {},
	},
	MOLTEN_ENDER: {
		availableUnits: ['PANE'],
		shouldKeep: true,
		obtentionMethods: {},
	},
	MILK: {
		availableUnits: [],
		shouldKeep: false,
		obtentionMethods: {},
	},
	VENOM: {
		availableUnits: [],
		shouldKeep: false,
		obtentionMethods: {},
	},
	BLOOD: {
		availableUnits: [],
		shouldKeep: false,
		obtentionMethods: {},
	},
	MOLTEN_AMETHYST: {
		availableUnits: ['BLOCK', 'GEM'],
		shouldKeep: true,
		obtentionMethods: {
			melting: ['AMETHYST_CLUSTER', 'LARGE_AMETHYST_BUD', 'MEDIUM_AMETHYST_BUD', 'SMALL_AMETHYST_BUD'],
		},
	},
	MOLTEN_AQUITE: {
		availableUnits: ['BLOCK', 'GEM'],
		shouldKeep: true,
		obtentionMethods: {
			melting: ['AQUITE_ORE'],
		},
	},
	MOLTEN_CHAROITE: {
		availableUnits: ['BLOCK', 'GEM'],
		shouldKeep: true,
		obtentionMethods: {
			melting: ['CHAROITE_ORE'],
		},
	},
	MOLTEN_CHORUS: {
		availableUnits: [],
		shouldKeep: false,
		obtentionMethods: {},
	},
	MOLTEN_CHORUS_METAL: {
		availableUnits: [],
		shouldKeep: false,
		obtentionMethods: {},
	},
	MOLTEN_CLAY: {
		availableUnits: ['BLOCK', 'INGOT'],
		shouldKeep: false,
		obtentionMethods: {},
	},
	LIQUID_COAL: {
		availableUnits: ['BLOCK', 'GEM'],
		shouldKeep: true,
		obtentionMethods: {},
	},
	MOLTEN_CRUSTEEL: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {},
	},
	MOLTEN_DIAMOND: {
		availableUnits: ['BLOCK', 'GEM'],
		shouldKeep: true,
		obtentionMethods: {
			melting: ['DIAMOND_ORE'],
		},
	},
	MOLTEN_DIOPSIDE: {
		availableUnits: ['BLOCK', 'GEM'],
		shouldKeep: true,
		obtentionMethods: {
			melting: ['DIOPSIDE_ORE'],
		},
	},
	MOLTEN_EMERALD: {
		availableUnits: ['BLOCK', 'GEM'],
		shouldKeep: true,
		obtentionMethods: {
			melting: ['EMERALD_ORE'],
		},
	},
	MOLTEN_EPIDOTE: {
		availableUnits: ['BLOCK', 'GEM'],
		shouldKeep: true,
		obtentionMethods: {
			melting: ['EPIDOTE_ORE'],
		},
	},
	MOLTEN_FALSITE: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			melting: ['FALSITE_ORE', 'RAW_FALSITE', 'RAW_FALSITE_BLOCK'],
		},
	},
	MOLTEN_GELOT: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {},
	},
	MOLTEN_HORIZONITE: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			melting: ['HORIZONITE_ORE', 'RAW_HORIZONITE', 'RAW_HORIZONITE_BLOCK'],
		},
	},
	MOLTEN_HUREAULITE: {
		availableUnits: ['BLOCK', 'GEM'],
		shouldKeep: true,
		obtentionMethods: {
			melting: ['HUREAULITE_ORE'],
		},
	},
	MOLTEN_KELP: {
		availableUnits: [],
		shouldKeep: false,
		obtentionMethods: {},
	},
	MOLTEN_KEPU: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			melting: ['KEPU_ORE', 'RAW_KEPU', 'RAW_KEPU_BLOCK'],
		},
	},
	MOLTEN_LAPIS: {
		availableUnits: ['BLOCK', 'GEM'],
		shouldKeep: true,
		obtentionMethods: {
			melting: ['LAPIS_ORE', 'ARIDROCK_LAPIS_ORE', 'GLACIO_LAPIS_ORE', 'LIMESTONE_LAPIS_ORE'],
		},
	},
	MOLTEN_LAVIUM: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {},
	},
	MOLTEN_ALFSTEEL: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {},
	},
	MOLTEN_ARCANE_GOLD: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {},
	},
	MOLTEN_CALORITE: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			melting: ['CALORITE_ORE', 'RAW_CALORITE', 'RAW_CALORITE_BLOCK'],
		},
	},
	MOLTEN_CLOGGRUM: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			melting: ['CLOGGRUM_ORE', 'RAW_CLOGGRUM', 'RAW_CLOGGRUM_BLOCK'],
		},
	},
	MOLTEN_COBALT: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			melting: ['COBALT_ORE', 'RAW_COBALT', 'RAW_COBALT_BLOCK'],
		},
	},
	MOLTEN_COPPER: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			melting: ['COPPER_ORE', 'RAW_COPPER', 'RAW_COPPER_BLOCK', 'GLACIO_COPPER_ORE'],
		},
	},
	MOLTEN_DESH: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			melting: ['DESH_ORE', 'RAW_DESH', 'RAW_DESH_BLOCK'],
		},
	},
	MOLTEN_DRACONIUM: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			melting: ['DRACONIUM_ORE'],
		},
	},
	MOLTEN_DRACONIUM_AWAKENED: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {},
	},
	MOLTEN_EBONY_PSIMETAL: {
		availableUnits: ['BLOCK', 'INGOT'],
		shouldKeep: true,
		obtentionMethods: {},
	},
	MOLTEN_IVORY_PSIMETAL: {
		availableUnits: ['BLOCK', 'INGOT'],
		shouldKeep: true,
		obtentionMethods: {},
	},
	MOLTEN_PSIMETAL: {
		availableUnits: ['BLOCK', 'INGOT'],
		shouldKeep: true,
		obtentionMethods: {},
	},
	MOLTEN_ELEMENTIUM: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			melting: ['ELEMENTIUM_ORE', 'RAW_ELEMENTIUM', 'RAW_ELEMENTIUM_BLOCK'],
		},
	},
	MOLTEN_FIERY: {
		availableUnits: ['BLOCK', 'INGOT'],
		shouldKeep: true,
		obtentionMethods: {},
	},
	MOLTEN_FLUX_INFUSED: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {},
	},
	MOLTEN_FORGOTTEN_METAL: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {},
	},
	MOLTEN_FROSTSTEEL: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			melting: ['FROSTSTEEL_ORE', 'RAW_FROSTSTEEL', 'RAW_FROSTSTEEL_BLOCK'],
		},
	},
	MOLTEN_GOLD: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			melting: ['GOLD_ORE', 'RAW_GOLD', 'RAW_GOLD_BLOCK', 'GILDED_BLACKSTONE', 'NETHER_GOLD_ORE'],
		},
	},
	MOLTEN_IESNIUM: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			melting: ['IESNIUM_ORE', 'RAW_IESNIUM'],
		},
	},
	MOLTEN_IRON: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			melting: ['IRON_ORE', 'RAW_IRON', 'RAW_IRON_BLOCK'],
		},
	},
	MOLTEN_KNIGHTMETAL: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {},
	},
	MOLTEN_KNIGHTSLIME: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {},
	},
	MOLTEN_LEAD: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			melting: ['LEAD_ORE', 'RAW_LEAD', 'RAW_LEAD_BLOCK'],
		},
	},
	MOLTEN_MANASTEEL: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {},
	},
	MOLTEN_DEBRIS: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			melting: ['ANCIENT_DEBRIS']
		},
	},
	MOLTEN_NICKEL: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			melting: ['NICKEL_ORE', 'RAW_NICKEL', 'RAW_NICKEL_BLOCK'],
		},
	},
	MOLTEN_OSMIUM: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			melting: ['OSMIUM_ORE', 'RAW_OSMIUM', 'RAW_OSMIUM_BLOCK'],
		}
	},
	MOLTEN_OSTRUM: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			melting: ['OSTRUM_ORE', 'RAW_OSTRUM', 'RAW_OSTRUM_BLOCK'],
		}
	},
	MOLTEN_PLATINUM: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {}
	},
	MOLTEN_REFINED_GLOWSTONE: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {}
	},
	MOLTEN_REFINED_RADIANCE: {
		availableUnits: ['INGOT'],
		shouldKeep: true,
		obtentionMethods: {}
	},
	MOLTEN_REGALIUM: {
		availableUnits: ['BLOCK', 'GEM'],
		shouldKeep: true,
		obtentionMethods: {
			melting: ['REGALIUM_ORE'],
		}
	},
	MOLTEN_SHADOW_STEEL: {
		availableUnits: ['INGOT'],
		shouldKeep: true,
		obtentionMethods: {}
	},
	MOLTEN_SILVER: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			melting: ['SILVER_ORE', 'RAW_SILVER', 'RAW_SILVER_BLOCK'],
		}
	},
	MOLTEN_SOULSTEEL: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {}
	},
	MOLTEN_STEEL:{
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {}
	},
	MOLTEN_TERRASTEEL: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {}
	},
	MOLTEN_TIN: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			melting: ['TIN_ORE', 'RAW_TIN', 'RAW_TIN_BLOCK'],
		}
	},
	MOLTEN_URANIUM: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			melting: ['URANIUM_ORE', 'RAW_URANIUM', 'RAW_URANIUM_BLOCK'],
		}
	},
	MOLTEN_UTHERIUM: {
		availableUnits: ['BLOCK', 'GEM'],
		shouldKeep: true,
		obtentionMethods: {
			melting: ['UTHERIUM_ORE'],
		}
	},
	MOLTEN_ZINC: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			melting: ['ZINC_ORE', 'RAW_ZINC', 'RAW_ZINC_BLOCK'],
		}
	},
	MOLTEN_MOONSTONE: {
		availableUnits: ['BLOCK', 'GEM'],
		shouldKeep: true,
		obtentionMethods: {
			melting: ['MOONSTONE_ORE'],
		}
	},
	MOLTEN_PIROOT: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {}
	},
	MOLTEN_PYROPE: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			melting: ['PYROPE_ORE'],
		}
	},
	MOLTEN_QUARTZ: {
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			melting: ['QUARTZ_ORE'],
		}
	},
	MOLTEN_RED_BERYL: {
		availableUnits: ['BLOCK', 'GEM'],
		shouldKeep: true,
		obtentionMethods: {
			melting: ['RED_BERYL_ORE'],
		}
	},
	LIQUID_REDSTONE: {
		availableUnits: [],
		shouldKeep: false,
		obtentionMethods: {}
	},
	SCORCHED_STONE: {
		availableUnits: ['BLOCK', 'INGOT'],
		shouldKeep: false,
		obtentionMethods: {}
	},
	SEARED_STONE: {
		availableUnits: ['BLOCK', 'INGOT'],
		shouldKeep: false,
		obtentionMethods: {}
	},
	MOLTEN_SHULKER: {
		availableUnits: [],
		shouldKeep: false,
		obtentionMethods: {}
	},
	EARTH_SLIME: {
		availableUnits: ['BLOCK', 'SLIMEBALL'],
		shouldKeep: false,
		obtentionMethods: {
			melting: ['EARTH_SLIME_CRYSTAL_CLUSTER', 'LARGE_EARTH_SLIME_CRYSTAL_BUD', 'MEDIUM_EARTH_SLIME_CRYSTAL_BUD', 'SMALL_EARTH_SLIME_CRYSTAL_BUD']
		}
	},
	ENDER_SLIME: {
		availableUnits: ['BLOCK', 'SLIMEBALL'],
		shouldKeep: false,
		obtentionMethods: {
			melting: ['ENDER_SLIME_CRYSTAL_CLUSTER', 'LARGE_ENDER_SLIME_CRYSTAL_BUD', 'MEDIUM_ENDER_SLIME_CRYSTAL_BUD', 'SMALL_ENDER_SLIME_CRYSTAL_BUD']
		}
	},
	SKY_SLIME: {
		availableUnits: ['BLOCK', 'SLIMEBALL'],
		shouldKeep: false,
		obtentionMethods: {
			melting: ['SKY_SLIME_CRYSTAL_CLUSTER', 'LARGE_SKY_SLIME_CRYSTAL_BUD', 'MEDIUM_SKY_SLIME_CRYSTAL_BUD', 'SMALL_SKY_SLIME_CRYSTAL_BUD']
		}
	},
	ICHOR: {
		availableUnits: ['BLOCK', 'SLIMEBALL'],
		shouldKeep: false,
		obtentionMethods: {
			melting: ['ICHOR_SLIME_CRYSTAL_CLUSTER', 'LARGE_ICHOR_SLIME_CRYSTAL_BUD', 'MEDIUM_ICHOR_SLIME_CRYSTAL_BUD', 'SMALL_ICHOR_SLIME_CRYSTAL_BUD']
		}
	},
	MAGMA: {
		availableUnits: ['BLOCK'],
		shouldKeep: false,
		obtentionMethods: {}
	},
	LIQUID_SOUL: {
		availableUnits: [],
		shouldKeep: false,
		obtentionMethods: {}
	},
	MOLTEN_VENTIUM:{
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {
			melting: ['VENTIUM_ORE', 'RAW_VENTIUM', 'RAW_VENTIUM_BLOCK'],
		}
	},
	MOLTEN_WAVY:{
		availableUnits: ['BLOCK', 'INGOT', 'NUGGET'],
		shouldKeep: true,
		obtentionMethods: {}
	}
} as const satisfies Record<string, FluidResource>;