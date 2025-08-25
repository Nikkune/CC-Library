//import {UnitOfMeasure}                           from './fluid_enums';
//import {FluidResource, Fluid, UnitOfMeasureType} from './fluid_types';
//import {ItemResource}                            from './item_types';
//
//// -------------------
//// Helpers
//// -------------------
//const CASTS = {
//	INGOT: [UnitOfMeasure.BLOCK, UnitOfMeasure.INGOT, UnitOfMeasure.NUGGET],
//	GEM: [UnitOfMeasure.BLOCK, UnitOfMeasure.GEM],
//	INGOT_BLOCK: [UnitOfMeasure.BLOCK, UnitOfMeasure.INGOT],
//	PANE: [UnitOfMeasure.BLOCK, UnitOfMeasure.PANE],
//};
//
//const makeFluid = (name: string, casts: UnitOfMeasureType[], packageable: boolean, methods?: FluidResource['obtentionMethods']): FluidResource =>
//	({name, availableUnits: casts, packageable, obtentionMethods: methods});
//
//const makeAlloy = (...ingredientsNeeded: FluidResource[]): FluidResource['obtentionMethods'] =>
//	({alloying: {ingredientsNeeded}});
//
//const makeMelting = (...ingredientsAccepted: ItemResource[]): FluidResource['obtentionMethods'] =>
//	({melting: {ingredientsAccepted}});
//
//const alloy = (fluid: string, amount: number): Fluid =>
//	({name: fluid, amount});
//
//// -------------------
//// Registry
//// -------------------
//export const FluidRegistry: FluidResource[] = [
//	makeFluid('blazing_blood', []),
//	makeFluid('dragonsteel', CASTS.INGOT),
//	makeFluid('molten_alfsteel', CASTS.INGOT),
//	makeFluid('molten_aluminum', CASTS.INGOT, makeMelting('raw_aluminum', 'raw_aluminum_block', 'aluminum_ore', 'deepslate_aluminum_ore')),
//	makeFluid('molten_amethyst', CASTS.GEM),
//	makeFluid('molten_amethyst_bronze', CASTS.INGOT, makeAlloy(
//		alloy('molten_amethyst', FluidAmount.GEM),
//		alloy('molten_copper', FluidAmount.INGOT),
//	)),
//	makeFluid('molten_aquite', CASTS.GEM, makeMelting('everdawn_aquite_ore', 'everbright_aquite_ore')),
//	makeFluid('molten_arcane_gold', CASTS.INGOT),
//	makeFluid('molten_baolian', CASTS.INGOT, makeAlloy(
//		alloy('molten_obsidian', 1000),
//		alloy('molten_red_beryl', 100),
//		alloy('molten_epidote', 100),
//	)),
//	makeFluid('molten_blazing_copper', CASTS.INGOT, makeAlloy(
//		alloy('molten_copper', FluidAmount.BLOCK),
//		alloy('blazing_blood', 1000),
//	)),
//	makeFluid('molten_brass', CASTS.INGOT, makeAlloy(
//		alloy('molten_copper', FluidAmount.INGOT),
//		alloy('molten_zinc', FluidAmount.INGOT),
//	)),
//	makeFluid('molten_bronze', CASTS.INGOT, makeAlloy(
//		alloy('molten_copper', 3 * FluidAmount.INGOT),
//		alloy('molten_tin', FluidAmount.INGOT),
//	)),
//	makeFluid('molten_calorite', CASTS.INGOT, makeMelting('raw_calorite', 'raw_calorite_block', 'venus_calorite_ore')),
//	makeFluid('molten_charoite', CASTS.GEM, makeMelting('everdawn_charoite_ore', 'everbright_charoite_ore')),
//	makeFluid('molten_chorus', [], makeMelting('popped_chorus_fruit', 'chorus_flower')),
//	makeFluid('molten_chorus_metal', CASTS.INGOT),
//	makeFluid('molten_clay', CASTS.INGOT_BLOCK, makeMelting('clay_ball', 'clay')),
//	makeFluid('molten_cloggrum', CASTS.INGOT, makeMelting('raw_cloggrum', 'raw_cloggrum_block', 'shiverstone_cloggrum_ore', 'depthrock_cloggrum_ore')),
//	makeFluid('molten_cobalt', CASTS.INGOT, makeMelting('raw_cobalt', 'raw_cobalt_block', 'cobalt_ore')),
//	makeFluid('molten_constantan', CASTS.INGOT, makeAlloy(
//		alloy('molten_copper', FluidAmount.INGOT),
//		alloy('molten_nickel', FluidAmount.INGOT),
//	)),
//	makeFluid('molten_copper', CASTS.INGOT, makeMelting('raw_copper', 'raw_copper_block', 'copper_ore', 'deepslate_copper_ore')),
//	makeFluid('molten_crusteel', CASTS.INGOT),
//	makeFluid('molten_cyber_steel', CASTS.INGOT, makeAlloy(
//		alloy('molten_chorus_metal', 180),
//		alloy('magma', FluidAmount.SLIMEBALL),
//		alloy('liquid_coal', 250),
//	)),
//	makeFluid('molten_debris', [FluidAmount.INGOT, FluidAmount.NUGGET], makeMelting('ancient_debris')),
//	makeFluid('molten_desh', CASTS.INGOT, makeMelting('raw_desh', 'raw_desh_block', 'moon_desh_ore')),
//	makeFluid('molten_diamond', CASTS.GEM, makeMelting('diamond_ore', 'deepslate_diamond_ore', 'mars_diamond_ore', 'venus_diamond_ore', 'aridrock_diamond_ore', 'limestone_diamond_ore', 'depthrock_diamond_ore', 'shiverstone_diamond_ore')),
//	makeFluid('molten_diopside', CASTS.GEM, makeMelting('everdawn_diopside_ore', 'everbright_diopside_ore')),
//	makeFluid('molten_draconium', CASTS.INGOT, makeMelting('draconium_dust', 'overworld_draconium_ore', 'nether_draconium_ore', 'end_draconium_ore')),
//	makeFluid('molten_draconium_awakened', CASTS.INGOT),
//	makeFluid('molten_duralumin', CASTS.INGOT, makeAlloy(
//		alloy('molten_copper', FluidAmount.INGOT),
//		alloy('molten_aluminum', FluidAmount.BLOCK),
//	)),
//	makeFluid('molten_durasteel', CASTS.INGOT, makeAlloy(
//		alloy('molten_ender', FluidAmount.SLIMEBALL),
//		alloy('molten_aluminum', FluidAmount.INGOT),
//		alloy('molten_debris', FluidAmount.INGOT),
//	)),
//	makeFluid('molten_ebony_psimetal', CASTS.INGOT_BLOCK),
//	makeFluid('molten_electrical_copper', CASTS.INGOT, makeAlloy(
//		alloy('molten_blazing_copper', 180),
//		alloy('liquid_redstone', 1000),
//	)),
//	makeFluid('molten_electrum', CASTS.INGOT, makeAlloy(
//		alloy('molten_gold', FluidAmount.INGOT),
//		alloy('molten_silver', FluidAmount.INGOT),
//	)),
//	makeFluid('molten_elementium', CASTS.INGOT, makeMelting('raw_elementium', 'raw_elementium_block', 'elementium_ore')),
//	makeFluid('molten_emerald', CASTS.GEM, makeMelting('emerald_ore', 'deepslate_emerald_ore', 'everbright_emerald_ore', 'everdawn_emerald_ore')),
//	makeFluid('molten_ender', [FluidAmount.PANE]),
//	makeFluid('molten_enderium', CASTS.INGOT, makeAlloy(
//		alloy('molten_ender', 2 * FluidAmount.SLIMEBALL),
//		alloy('molten_lead', 3 * FluidAmount.INGOT),
//		alloy('molten_diamond', FluidAmount.GEM),
//	)),
//	makeFluid('molten_epidote', CASTS.GEM, makeMelting('deepslate_epidote_ore')),
//	makeFluid('molten_fairy', CASTS.INGOT, makeAlloy(
//		alloy('molten_gold', FluidAmount.INGOT),
//		alloy('liquid_soul', FluidAmount.BLOCK),
//		alloy('milk', 1000),
//	)),
//	makeFluid('molten_falsite', CASTS.INGOT, makeMelting('raw_falsite', 'raw_falsite_block', 'falsite_ore')),
//	makeFluid('molten_felsteel', CASTS.INGOT, makeAlloy(
//		alloy('molten_blazing_copper', 180),
//		alloy('molten_debris', 2 * FluidAmount.INGOT),
//		alloy('molten_duralumin', 180),
//	)),
//	makeFluid('molten_fiery', CASTS.INGOT_BLOCK),
//	makeFluid('molten_flux_infused', CASTS.INGOT),
//	makeFluid('molten_forgotten_metal', CASTS.INGOT),
//	makeFluid('molten_froststeel', CASTS.INGOT, makeMelting('raw_froststeel', 'raw_froststeel_block', 'shiverstone_froststeel_ore')),
//	makeFluid('molten_galu', CASTS.INGOT, makeAlloy(
//		alloy('molten_obsidian', 1000),
//		alloy('molten_red_beryl', 100),
//		alloy('molten_hureaulite', 100),
//	)),
//	makeFluid('molten_gausum', CASTS.INGOT, makeAlloy(
//		alloy('molten_blazing_copper', 180),
//		alloy('molten_debris', 2 * FluidAmount.INGOT),
//		alloy('molten_lapis', 810),
//	)),
//	makeFluid('molten_gelot', CASTS.INGOT),
//	makeFluid('molten_glass', CASTS.PANE),
//	makeFluid('molten_gold', CASTS.INGOT, makeMelting('raw_gold', 'raw_gold_block', 'gold_ore', 'deepslate_gold_ore', 'gilded_blackstone', 'depthrock_gold_ore', 'venus_gold_ore', 'aridrock_gold_ore', 'limestone_gold_ore', 'nether_gold_ore', 'blue_nether_gold_ore', 'brimstone_nether_gold_ore')),
//	makeFluid('molten_hepatizon', CASTS.INGOT, makeAlloy(
//		alloy('molten_copper', 2 * FluidAmount.INGOT),
//		alloy('molten_cobalt', FluidAmount.INGOT),
//		alloy('molten_quartz', FluidAmount.BLOCK),
//	)),
//	makeFluid('molten_horizonite', CASTS.INGOT, makeMelting('raw_horizonite', 'raw_horizonite_block', 'horizonite_ore')),
//	makeFluid('molten_hureaulite', CASTS.INGOT, makeMelting('deepslate_hureaulite_ore')),
//	makeFluid('molten_iesnium', CASTS.INGOT, makeMelting('raw_iesnium', 'iesnium_ore')),
//	makeFluid('molten_invar', CASTS.INGOT, makeAlloy(
//		alloy('molten_iron', 2 * FluidAmount.INGOT),
//		alloy('molten_nickel', FluidAmount.INGOT),
//	)),
//	makeFluid('molten_iron', CASTS.INGOT, makeMelting('raw_iron', 'raw_iron_block', 'iron_ore', 'deepslate_iron_ore', 'moon_iron_ore', 'mars_iron_ore', 'mercury_iron_ore', 'glacio_iron_ore', 'aridrock_iron_ore', 'limestone_iron_ore', 'basalt_iron_ore', 'depthrock_iron_ore', 'shiverstone_iron_ore')),
//	makeFluid('molten_ivory_psimetal', CASTS.INGOT_BLOCK),
//	makeFluid('molten_kelp', []),
//	makeFluid('molten_kepu', CASTS.INGOT, makeMelting('raw_kepu', 'raw_kepu_block', 'kepu_ore')),
//	makeFluid('molten_knightmetal', CASTS.INGOT),
//	makeFluid('molten_lapis', CASTS.INGOT, makeMelting('lapis_ore', 'deepslate_lapis_ore', 'glacio_lapis_ore', 'aridrock_lapis_ore', 'limestone_lapis_ore')),
//	makeFluid('molten_lavium', CASTS.INGOT),
//	makeFluid('molten_lead', CASTS.INGOT, makeMelting('raw_lead', 'raw_lead_block', 'lead_ore', 'deepslate_lead_ore')),
//	makeFluid('molten_lumium', CASTS.INGOT, makeAlloy(
//		alloy('molten_tin', 3 * FluidAmount.INGOT),
//		alloy('molten_silver', FluidAmount.INGOT),
//		alloy('glowstone', 500),
//	)),
//	makeFluid('molten_magma_steel', CASTS.INGOT, makeAlloy(
//		alloy('molten_iron', 2 * FluidAmount.INGOT),
//		alloy('magma', FluidAmount.SLIMEBALL),
//		alloy('liquid_coal', 250),
//	)),
//	makeFluid('molten_manasteel', CASTS.INGOT),
//	makeFluid('molten_manyullyn', CASTS.INGOT, makeAlloy(
//		alloy('molten_cobalt', 3 * FluidAmount.INGOT),
//		alloy('molten_debris', FluidAmount.INGOT),
//	)),
//	makeFluid('molten_moonstone', CASTS.GEM, makeMelting('everdawn_moonstone_ore', 'everbright_moonstone_ore')),
//	makeFluid('molten_netherite', CASTS.INGOT, makeAlloy(
//		alloy('molten_debris', 4 * FluidAmount.NUGGET),
//		alloy('molten_gold', FluidAmount.NUGGET),
//	)),
//	makeFluid('molten_nickel', CASTS.INGOT, makeMelting('raw_nickel', 'raw_nickel_block', 'nickel_ore', 'deepslate_nickel_ore')),
//	makeFluid('molten_obsidian', CASTS.PANE),
//	makeFluid('molten_osmium', CASTS.INGOT, makeMelting('raw_osmium', 'raw_osmium_block', 'osmium_ore', 'deepslate_osmium_ore')),
//	makeFluid('molten_pig_iron', CASTS.INGOT, makeAlloy(
//		alloy('molten_iron', FluidAmount.INGOT),
//		alloy('blood', 2 * FluidAmount.SLIMEBALL),
//		alloy('honey', FluidAmount.BOTTLE),
//	)),
//	makeFluid('molten_pink_slime', []),
//	makeFluid('molten_piroot', CASTS.INGOT),
//	makeFluid('molten_platinum', CASTS.INGOT),
//	makeFluid('molten_proto_lava', [], makeAlloy(
//		alloy('molten_ender', FluidAmount.SLIMEBALL),
//		alloy('molten_chorus', 90),
//		alloy('lava', 1000),
//	)),
//	makeFluid('molten_psimetal', CASTS.INGOT_BLOCK),
//	makeFluid('molten_pyrope', CASTS.GEM, makeMelting('everdawn_pyrope_ore', 'everbright_pyrope_ore')),
//	makeFluid('molten_qivium', CASTS.INGOT),
//	makeFluid('molten_quartz', CASTS.GEM, makeMelting('nether_quartz')),
//	makeFluid('molten_queens_slime', CASTS.INGOT, makeAlloy(
//		alloy('molten_cobalt', FluidAmount.INGOT),
//		alloy('molten_gold', FluidAmount.INGOT),
//		alloy('magma', FluidAmount.SLIMEBALL),
//	)),
//	makeFluid('molten_red_beryl', CASTS.GEM, makeMelting('red_beryl_ore', 'deepslate_red_beryl_ore')),
//	makeFluid('molten_refined_glowstone', CASTS.INGOT),
//	makeFluid('molten_refined_obsidian', CASTS.INGOT, makeAlloy(
//		alloy('molten_obsidian', FluidAmount.PANE),
//		alloy('molten_diamond', FluidAmount.GEM),
//		alloy('molten_osmium', FluidAmount.INGOT),
//	)),
//	makeFluid('molten_regalium', CASTS.INGOT_BLOCK, makeMelting('depthrock_regalium_ore', 'shiverstone_regalium_ore')),
//	makeFluid('molten_rose_gold', CASTS.INGOT, makeAlloy(
//		alloy('molten_gold', FluidAmount.INGOT),
//		alloy('molten_copper', FluidAmount.INGOT),
//	)),
//	makeFluid('molten_shadow_steel', []),
//	makeFluid('molten_shulker', []),
//	makeFluid('molten_signalum', CASTS.INGOT, makeAlloy(
//		alloy('molten_copper', 3 * FluidAmount.INGOT),
//		alloy('molten_silver', FluidAmount.INGOT),
//		alloy('liquid_redstone', 400),
//	)),
//	makeFluid('molten_silver', CASTS.INGOT, makeMelting('raw_silver', 'raw_silver_block', 'silver_ore', 'deepslate_silver_ore', 'aridrock_silver_ore', 'limestone_silver_ore')),
//	makeFluid('molten_slimesteel', CASTS.INGOT, makeAlloy(
//		alloy('molten_iron',FluidAmount.INGOT),
//		alloy('skyslime', FluidAmount.SLIMEBALL),
//		alloy('seared_stone',250)
//	)),
//	makeFluid('molten_steel', CASTS.INGOT),
//	makeFluid('molten_terrasteel', CASTS.INGOT),
//	makeFluid('molten_tin', CASTS.INGOT, makeMelting('raw_tin', 'raw_tin_block', 'tin_ore', 'deepslate_tin_ore')),
//	makeFluid('molten_tungsten', CASTS.INGOT),
//	makeFluid('molten_uranium', CASTS.INGOT, makeMelting('raw_uranium', 'raw_uranium_block', 'uranium_ore', 'deepslate_uranium_ore')),
//	makeFluid('molten_utherium', CASTS.GEM, makeMelting('depthrock_utherium_ore', 'shiverstone_utherium_ore', 'tremblecrust_utherium_ore')),
//	makeFluid('molten_ventium', CASTS.INGOT, makeMelting('raw_ventium', 'raw_ventium_block', 'ventium_ore')),
//	makeFluid('molten_wavy', CASTS.INGOT),
//	makeFluid('molten_yokel', CASTS.INGOT, makeAlloy(
//		alloy('molten_kelp', 250),
//		alloy('molten_aluminum', FluidAmount.INGOT),
//		alloy('molten_iron', FluidAmount.INGOT),
//	)),
//	makeFluid('molten_zinc', CASTS.INGOT, makeMelting('raw_zinc', 'raw_zinc_block', 'zinc_ore', 'deepslate_zinc_ore')),
//	makeFluid('plastic', []),
//	makeFluid('shellite', CASTS.INGOT),
//	makeFluid('soul_infused', CASTS.INGOT),
//	makeFluid('twinite', CASTS.INGOT)
//];
//
//// -------------------
//// Utils
//// -------------------
//export function isItemMeltable(item: ItemResource): boolean {
//	const MELTING_METHOD = 'melting';
//
//	return Object.values(FluidRegistry).some(fluid =>
//		fluid.obtentionMethods?.[MELTING_METHOD]?.ingredientsAccepted.includes(item) ?? false
//	);
//}