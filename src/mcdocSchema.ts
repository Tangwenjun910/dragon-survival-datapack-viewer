// Auto-generated from dragonsurvival-mcdoc-completion-zh-2.0.4
export interface McdocStruct {
    required: string[];
    optional: string[];
    fields: Record<string, "required" | "optional">;
}

export const MCDOC_STRUCTS: Record<string, McdocStruct> = {
    "AbilityLevel__data_advancement_predicate": {
        required: ["level"],
        optional: ["ability"],
        fields: {"ability":"optional","level":"required"}
    },
    "Action__data_dragonsurvival_dragon_ability": {
        required: ["target_selection"],
        optional: ["trigger_rate"],
        fields: {"target_selection":"required","trigger_rate":"optional"}
    },
    "ActivationTrigger__data_dragonsurvival_dragon_ability": {
        required: ["trigger_type"],
        optional: [],
        fields: {"trigger_type":"required"}
    },
    "Activation__data_dragonsurvival_dragon_ability": {
        required: ["activation_type"],
        optional: [],
        fields: {"activation_type":"required"}
    },
    "Animations__data_dragonsurvival_dragon_ability": {
        required: [],
        optional: ["start_and_charging","end"],
        fields: {"start_and_charging":"optional","end":"optional"}
    },
    "AreaCloudEffect_Block__data_dragonsurvival_dragon_ability": {
        required: ["potion","duration","probability","particle"],
        optional: ["delay","radius"],
        fields: {"potion":"required","duration":"required","probability":"required","delay":"optional","radius":"optional","particle":"required"}
    },
    "AreaTarget__data_dragonsurvival_dragon_ability": {
        required: ["applied_effects","radius"],
        optional: [],
        fields: {"applied_effects":"required","radius":"required"}
    },
    "AreaTarget__data_dragonsurvival_projectile_data": {
        required: ["radius"],
        optional: ["particle_trail"],
        fields: {"radius":"required","particle_trail":"optional"}
    },
    "AttributeScale__data_dragonsurvival_dragon_ability": {
        required: ["attributes","scale"],
        optional: [],
        fields: {"attributes":"required","scale":"required"}
    },
    "BackpackOffsets__data_dragonsurvival_dragon_body": {
        required: [],
        optional: ["position_offset","rotation_offset","scale"],
        fields: {"position_offset":"optional","rotation_offset":"optional","scale":"optional"}
    },
    "BeDragon__data_advancement_trigger": {
        required: [],
        optional: [],
        fields: {}
    },
    "BehaviourData__data_dragonsurvival_projectile_data": {
        required: ["width","height","max_movement_distance","max_lifespan"],
        optional: ["max_bounces","max_lingering_ticks"],
        fields: {"width":"required","height":"required","max_bounces":"optional","max_lingering_ticks":"optional","max_movement_distance":"required","max_lifespan":"required"}
    },
    "BlockBreakEffect_Block__data_dragonsurvival_dragon_ability": {
        required: ["valid_blocks","probability"],
        optional: ["drop_loot"],
        fields: {"valid_blocks":"required","probability":"required","drop_loot":"optional"}
    },
    "BlockConversionData__data_dragonsurvival_dragon_ability": {
        required: ["from_predicate","blocks_to"],
        optional: [],
        fields: {"from_predicate":"required","blocks_to":"required"}
    },
    "BlockConversionEffect_Block__data_dragonsurvival_dragon_ability": {
        required: ["conversion_data","probability"],
        optional: [],
        fields: {"conversion_data":"required","probability":"required"}
    },
    "BlockEffect__data_dragonsurvival_dragon_ability": {
        required: ["effect_type"],
        optional: [],
        fields: {"effect_type":"required"}
    },
    "BlockHarvestEffect_Block__data_dragonsurvival_dragon_ability": {
        required: ["valid_blocks"],
        optional: ["probability","tool"],
        fields: {"valid_blocks":"required","probability":"optional","tool":"optional"}
    },
    "BlockPredicateSpecial__data_dragonsurvival_dragon_ability": {
        required: ["type"],
        optional: [],
        fields: {"type":"required"}
    },
    "BlockTargeting__data_dragonsurvival_dragon_ability": {
        required: ["block_effect"],
        optional: ["target_conditions"],
        fields: {"block_effect":"required","target_conditions":"optional"}
    },
    "BlockTo__data_dragonsurvival_dragon_ability": {
        required: ["state","weight"],
        optional: [],
        fields: {"state":"required","weight":"required"}
    },
    "BlockVisionEffect_Entity__data_dragonsurvival_dragon_ability": {
        required: ["block_visions"],
        optional: [],
        fields: {"block_visions":"required"}
    },
    "BlockVision__data_dragonsurvival_dragon_ability": {
        required: ["base","range","display_type","colors"],
        optional: ["blocks","particle_rate","color_shift_rate"],
        fields: {"base":"required","blocks":"optional","range":"required","display_type":"required","colors":"required","particle_rate":"optional","color_shift_rate":"optional"}
    },
    "BonemealEffect_Block__data_dragonsurvival_dragon_ability": {
        required: ["attempts","probability"],
        optional: [],
        fields: {"attempts":"required","probability":"required"}
    },
    "Bounds__data_dragonsurvival_dragon_stage": {
        required: ["min","max"],
        optional: [],
        fields: {"min":"required","max":"required"}
    },
    "BreathParticlesEffect_Entity__data_dragonsurvival_dragon_ability": {
        required: ["spread","speed_per_growth","main_particle","secondary_particle"],
        optional: [],
        fields: {"spread":"required","speed_per_growth":"required","main_particle":"required","secondary_particle":"required"}
    },
    "ChanneledActivation__data_dragonsurvival_dragon_ability": {
        required: [],
        optional: ["initial_mana_cost","continuous_mana_cost","cast_time","cooldown","max_duration","notification","can_move_while_casting","sound","animations"],
        fields: {"initial_mana_cost":"optional","continuous_mana_cost":"optional","cast_time":"optional","cooldown":"optional","max_duration":"optional","notification":"optional","can_move_while_casting":"optional","sound":"optional","animations":"optional"}
    },
    "ChanneledAnimations__data_dragonsurvival_dragon_ability": {
        required: [],
        optional: ["looping"],
        fields: {"looping":"optional"}
    },
    "ChanneledSound__data_dragonsurvival_dragon_ability": {
        required: [],
        optional: ["looping"],
        fields: {"looping":"optional"}
    },
    "ChanneledTriggerPoint__data_dragonsurvival_dragon_ability": {
        required: [],
        optional: ["trigger_point"],
        fields: {"trigger_point":"optional"}
    },
    "ColorEntry__data_dragonsurvival_dragon_ability": {
        required: ["color"],
        optional: ["alpha"],
        fields: {"color":"required","alpha":"optional"}
    },
    "CompoundAbilityAnimation__data_dragonsurvival_dragon_ability": {
        required: ["starting_animation_key","looping_animation_key","layer","locks_neck","locks_tail"],
        optional: ["transition_length"],
        fields: {"starting_animation_key":"required","looping_animation_key":"required","layer":"required","transition_length":"optional","locks_neck":"required","locks_tail":"required"}
    },
    "ConditionUpgrade__data_dragonsurvival_dragon_ability": {
        required: ["conditions","require_previous"],
        optional: [],
        fields: {"conditions":"required","require_previous":"required"}
    },
    "ConstantTrigger__data_dragonsurvival_dragon_ability": {
        required: [],
        optional: [],
        fields: {}
    },
    "ConvertItemFromAbility__data_advancement_trigger": {
        required: ["item_from","item_to"],
        optional: [],
        fields: {"item_from":"required","item_to":"required"}
    },
    "CooldownRecoveryEffect__data_dragonsurvival_dragon_ability": {
        required: ["action_type","adjustment_type","amount"],
        optional: ["abilities","probability","exclude_this"],
        fields: {"abilities":"optional","action_type":"required","adjustment_type":"required","amount":"required","probability":"optional","exclude_this":"optional"}
    },
    "CustomPredicates__data_advancement_predicate": {
        required: [],
        optional: ["eye_in_fluid","weather_predicate","sun_light_level","has_duration_effect","is_nearby_entity","player_hunger","health_percentage","has_uuid","looking_at_block"],
        fields: {"eye_in_fluid":"optional","weather_predicate":"optional","sun_light_level":"optional","has_duration_effect":"optional","is_nearby_entity":"optional","player_hunger":"optional","health_percentage":"optional","has_uuid":"optional","looking_at_block":"optional"}
    },
    "CustomSoulIcons__assets_dragonsurvival_custom_soul_icons": {
        required: ["species","model"],
        optional: ["stage"],
        fields: {"species":"required","stage":"optional","model":"required"}
    },
    "DamageEffect_Entity__data_dragonsurvival_dragon_ability": {
        required: ["damage_type","amount"],
        optional: ["scale","expression","use_claw"],
        fields: {"damage_type":"required","amount":"required","scale":"optional","expression":"optional","use_claw":"optional"}
    },
    "DamageModificationEffect_Entity__data_dragonsurvival_dragon_ability": {
        required: ["modifications"],
        optional: [],
        fields: {"modifications":"required"}
    },
    "DamageModificationPenalty__data_dragonsurvival_dragon_penalty": {
        required: ["modification","duration"],
        optional: [],
        fields: {"modification":"required","duration":"required"}
    },
    "DamageModification__data_dragonsurvival_dragon_ability": {
        required: ["base","damage_types","multiplier"],
        optional: [],
        fields: {"base":"required","damage_types":"required","multiplier":"required"}
    },
    "DamageModification__data_dragonsurvival_dragon_penalty": {
        required: ["base","damage_types","multiplier"],
        optional: [],
        fields: {"base":"required","damage_types":"required","multiplier":"required"}
    },
    "DamagePenalty__data_dragonsurvival_dragon_penalty": {
        required: ["damage_type","amount"],
        optional: [],
        fields: {"damage_type":"required","amount":"required"}
    },
    "DataMapDragonSpecies__data_data_maps_dragon_species": {
        required: ["values"],
        optional: ["replace"],
        fields: {"replace":"optional","values":"required"}
    },
    "DefaultSkin__data_data_maps_dragon_species": {
        required: ["skin","glow_skin"],
        optional: [],
        fields: {"skin":"required","glow_skin":"required"}
    },
    "DestructionData__data_dragonsurvival_dragon_stage": {
        required: ["crushing_growth","block_destruction_growth","crushing_damage_scalar","block_predicate","entity_predicate"],
        optional: [],
        fields: {"crushing_growth":"required","block_destruction_growth":"required","crushing_damage_scalar":"required","block_predicate":"required","entity_predicate":"required"}
    },
    "DietEntry__data_data_maps_dragon_species": {
        required: ["items"],
        optional: ["properties","retain_effects"],
        fields: {"items":"required","properties":"optional","retain_effects":"optional"}
    },
    "DiscTarget__data_dragonsurvival_dragon_ability": {
        required: ["applied_effects","radius","height"],
        optional: ["height_starts_below"],
        fields: {"applied_effects":"required","radius":"required","height":"required","height_starts_below":"optional"}
    },
    "DragonAbility__data_dragonsurvival_dragon_ability": {
        required: ["activation","actions","icon"],
        optional: ["upgrade","usage_blocked","can_be_manually_disabled"],
        fields: {"activation":"required","upgrade":"optional","usage_blocked":"optional","actions":"required","can_be_manually_disabled":"optional","icon":"required"}
    },
    "DragonBeaconData__data_data_maps_dragon_species": {
        required: ["effects","payment_data"],
        optional: [],
        fields: {"effects":"required","payment_data":"required"}
    },
    "DragonBody__data_dragonsurvival_dragon_body": {
        required: ["animation","emotes","scaling_proportions","crouch_height_ratio"],
        optional: ["is_default","unlockable_behavior","modifiers","can_hide_wings","model","texture_size","default_icon","bones_to_hide_for_toggle","mounting_offset","backpack_offset","bettercombat_weapon_offset"],
        fields: {"is_default":"optional","unlockable_behavior":"optional","modifiers":"optional","can_hide_wings":"optional","model":"optional","texture_size":"optional","animation":"required","default_icon":"optional","bones_to_hide_for_toggle":"optional","emotes":"required","scaling_proportions":"required","crouch_height_ratio":"required","mounting_offset":"optional","backpack_offset":"optional","bettercombat_weapon_offset":"optional"}
    },
    "DragonBreathTarget__data_dragonsurvival_dragon_ability": {
        required: ["applied_effects","range_multiplier"],
        optional: [],
        fields: {"applied_effects":"required","range_multiplier":"required"}
    },
    "DragonEmoteSet__data_dragonsurvival_dragon_body": {
        required: ["emotes"],
        optional: [],
        fields: {"emotes":"required"}
    },
    "DragonEmote__data_dragonsurvival_dragon_body": {
        required: ["animation_key"],
        optional: ["translation_override","speed","duration","loops","blend","locks_head","locks_tail","third_person","can_move","sound"],
        fields: {"animation_key":"required","translation_override":"optional","speed":"optional","duration":"optional","loops":"optional","blend":"optional","locks_head":"optional","locks_tail":"optional","third_person":"optional","can_move":"optional","sound":"optional"}
    },
    "DragonGrowthEffect_Entity__data_dragonsurvival_dragon_ability": {
        required: ["growth_type","action_type","amount"],
        optional: ["probability"],
        fields: {"growth_type":"required","action_type":"required","amount":"required","probability":"optional"}
    },
    "DragonGrowthUpgrade__data_dragonsurvival_dragon_ability": {
        required: ["maximum_level","growth_requirement"],
        optional: [],
        fields: {"maximum_level":"required","growth_requirement":"required"}
    },
    "DragonPenalty__data_dragonsurvival_dragon_penalty": {
        required: ["effect","trigger"],
        optional: ["icon","condition"],
        fields: {"icon":"optional","condition":"optional","effect":"required","trigger":"required"}
    },
    "DragonPredicate__data_advancement_predicate": {
        required: [],
        optional: ["dragon_species","stage_specific","dragon_body","ability_levels","is_growth_stopped","marked_by_ender_dragon","flight_was_granted","spin_was_granted","is_flying"],
        fields: {"dragon_species":"optional","stage_specific":"optional","dragon_body":"optional","ability_levels":"optional","is_growth_stopped":"optional","marked_by_ender_dragon":"optional","flight_was_granted":"optional","spin_was_granted":"optional","is_flying":"optional"}
    },
    "DragonSpecies__data_dragonsurvival_dragon_species": {
        required: ["misc_resources"],
        optional: ["starting_growth","unlockable_behavior","mana_handling","custom_stage_progression","bodies","abilities","penalties"],
        fields: {"starting_growth":"optional","unlockable_behavior":"optional","mana_handling":"optional","custom_stage_progression":"optional","bodies":"optional","abilities":"optional","penalties":"optional","misc_resources":"required"}
    },
    "DragonStagePredicate__data_advancement_predicate": {
        required: [],
        optional: ["dragon_stage","growth_percentage","growth"],
        fields: {"dragon_stage":"optional","growth_percentage":"optional","growth":"optional"}
    },
    "DragonStage__data_dragonsurvival_dragon_stage": {
        required: ["growth_range","ticks_until_grown"],
        optional: ["is_default","modifiers","growth_items","is_natural_growth_stopped","destruction_data"],
        fields: {"is_default":"optional","growth_range":"required","ticks_until_grown":"required","modifiers":"optional","growth_items":"optional","is_natural_growth_stopped":"optional","destruction_data":"optional"}
    },
    "DragonSurvival_ColorParticle__util_particle": {
        required: ["red","green","blue","scale"],
        optional: [],
        fields: {"red":"required","green":"required","blue":"required","scale":"required"}
    },
    "DragonSurvival_Particle__util_particle": {
        required: ["duration","swirls"],
        optional: [],
        fields: {"duration":"required","swirls":"required"}
    },
    "DragonSurvival_SeaSweepParticle__util_particle": {
        required: ["quadSize"],
        optional: [],
        fields: {"quadSize":"required"}
    },
    "DurationInstanceBase__data_dragonsurvival_dragon_ability": {
        required: ["id"],
        optional: ["duration","should_remove_automatically","early_removal_condition","custom_icon","is_hidden"],
        fields: {"id":"required","duration":"optional","should_remove_automatically":"optional","early_removal_condition":"optional","custom_icon":"optional","is_hidden":"optional"}
    },
    "DurationInstanceBase__data_dragonsurvival_dragon_penalty": {
        required: ["id"],
        optional: ["duration","should_remove_automatically","early_removal_condition","custom_icon","is_hidden"],
        fields: {"id":"required","duration":"optional","should_remove_automatically":"optional","early_removal_condition":"optional","custom_icon":"optional","is_hidden":"optional"}
    },
    "EffectModificationEffect_Entity__data_dragonsurvival_dragon_ability": {
        required: ["modifications"],
        optional: [],
        fields: {"modifications":"required"}
    },
    "EffectModificationPenalty__data_dragonsurvival_dragon_penalty": {
        required: ["modifications"],
        optional: [],
        fields: {"modifications":"required"}
    },
    "EffectModification__data_dragonsurvival_dragon_ability": {
        required: ["base"],
        optional: ["effects","duration_modification","amplifier_modification"],
        fields: {"base":"required","effects":"optional","duration_modification":"optional","amplifier_modification":"optional"}
    },
    "EffectModification__data_dragonsurvival_dragon_penalty": {
        required: ["base"],
        optional: ["effects","duration_modification","amplifier_modification"],
        fields: {"base":"required","effects":"optional","duration_modification":"optional","amplifier_modification":"optional"}
    },
    "Effect__data_data_maps_dragon_species": {
        required: ["effect"],
        optional: ["duration","amplifier"],
        fields: {"effect":"required","duration":"optional","amplifier":"optional"}
    },
    "EndPlatform__data_data_maps_dragon_species": {
        required: ["structure","spawn_position"],
        optional: [],
        fields: {"structure":"required","spawn_position":"required"}
    },
    "EntityCheckPredicate__data_advancement_predicate": {
        required: [],
        optional: ["check_for"],
        fields: {"check_for":"optional"}
    },
    "EntityEffect__data_dragonsurvival_dragon_ability": {
        required: ["effect_type"],
        optional: [],
        fields: {"effect_type":"required"}
    },
    "EntityTargeting__data_dragonsurvival_dragon_ability": {
        required: ["entity_effect","targeting_mode"],
        optional: ["target_conditions"],
        fields: {"entity_effect":"required","target_conditions":"optional","targeting_mode":"required"}
    },
    "ExperienceEffect__data_dragonsurvival_dragon_ability": {
        required: ["experience_type","amount"],
        optional: ["probability"],
        fields: {"experience_type":"required","amount":"required","probability":"optional"}
    },
    "ExperienceLevelUpgrade__data_dragonsurvival_dragon_ability": {
        required: ["maximum_level","level_requirement"],
        optional: [],
        fields: {"maximum_level":"required","level_requirement":"required"}
    },
    "ExperiencePointsUpgrade__data_dragonsurvival_dragon_ability": {
        required: ["maximum_level","experience_cost"],
        optional: [],
        fields: {"maximum_level":"required","experience_cost":"required"}
    },
    "ExplodeBlockEffect_Block__data_dragonsurvival_dragon_ability": {
        required: ["power","damage_type"],
        optional: ["probability","fire"],
        fields: {"probability":"optional","power":"required","fire":"optional","damage_type":"required"}
    },
    "FearPenalty__data_dragonsurvival_dragon_penalty": {
        required: ["fears"],
        optional: [],
        fields: {"fears":"required"}
    },
    "Fear__data_dragonsurvival_dragon_penalty": {
        required: ["base","distance"],
        optional: ["entity_condition","walk_speed","sprint_speed"],
        fields: {"base":"required","entity_condition":"optional","distance":"required","walk_speed":"optional","sprint_speed":"optional"}
    },
    "FillIcon__data_dragonsurvival_dragon_species": {
        required: ["empty","full"],
        optional: [],
        fields: {"empty":"required","full":"required"}
    },
    "FireEffect_Block__data_dragonsurvival_dragon_ability": {
        required: ["ignite_probability"],
        optional: [],
        fields: {"ignite_probability":"required"}
    },
    "FlightEffect_Entity__data_dragonsurvival_dragon_ability": {
        required: ["level_requirement"],
        optional: ["icon"],
        fields: {"level_requirement":"required","icon":"optional"}
    },
    "FoodTooltip__data_dragonsurvival_dragon_species": {
        required: ["nutrition_icon","saturation_icon"],
        optional: ["font","color"],
        fields: {"font":"optional","nutrition_icon":"required","saturation_icon":"required","color":"optional"}
    },
    "Food__data_data_maps_dragon_species": {
        required: ["nutrition","saturation"],
        optional: ["can_always_eat","eat_seconds","effects","using_converts_to"],
        fields: {"nutrition":"required","saturation":"required","can_always_eat":"optional","eat_seconds":"optional","effects":"optional","using_converts_to":"optional"}
    },
    "GeneralData__data_dragonsurvival_projectile_data": {
        required: ["name","block_hit_effects","common_hit_effects","entity_hit_condition","entity_hit_effects","ticking_effects"],
        optional: ["is_impact_projectile"],
        fields: {"name":"required","is_impact_projectile":"optional","block_hit_effects":"required","common_hit_effects":"required","entity_hit_condition":"required","entity_hit_effects":"required","ticking_effects":"required"}
    },
    "GenericArrowData__data_dragonsurvival_projectile_data": {
        required: ["texture"],
        optional: ["piercing_level"],
        fields: {"texture":"required","piercing_level":"optional"}
    },
    "GenericArrowEntity__world_entity_generic_arrow_entity": {
        required: ["general_data","type_data"],
        optional: ["projectile_level"],
        fields: {"projectile_level":"optional","general_data":"required","type_data":"required"}
    },
    "GenericBallData__data_dragonsurvival_projectile_data": {
        required: ["resources","behaviour_data"],
        optional: ["on_destroy_effects","trail_particle"],
        fields: {"resources":"required","behaviour_data":"required","on_destroy_effects":"optional","trail_particle":"optional"}
    },
    "GenericBallEntity__world_entity_generic_ball_entity": {
        required: ["general_data","type_data"],
        optional: ["projectile_level","bounces","lingering_ticks","movement_distance","lifespan"],
        fields: {"projectile_level":"optional","general_data":"required","type_data":"required","bounces":"optional","lingering_ticks":"optional","movement_distance":"optional","lifespan":"optional"}
    },
    "GlowEffect_Entity__data_dragonsurvival_dragon_ability": {
        required: ["glows"],
        optional: [],
        fields: {"glows":"required"}
    },
    "Glow__data_dragonsurvival_dragon_ability": {
        required: ["base","color"],
        optional: [],
        fields: {"base":"required","color":"required"}
    },
    "GrowthIcon__data_data_maps_dragon_species": {
        required: ["hover_icon","icon"],
        optional: [],
        fields: {"hover_icon":"required","icon":"required"}
    },
    "GrowthItem__data_dragonsurvival_dragon_stage": {
        required: ["items","growth_in_ticks"],
        optional: ["maximum_usages"],
        fields: {"items":"required","growth_in_ticks":"required","maximum_usages":"optional"}
    },
    "HarvestBonusEffect_Entity__data_dragonsurvival_dragon_ability": {
        required: ["harvest_bonuses"],
        optional: [],
        fields: {"harvest_bonuses":"required"}
    },
    "HarvestBonus__data_dragonsurvival_dragon_ability": {
        required: ["base","blocks"],
        optional: ["base_speed","harvest_bonus","break_speed_multiplier"],
        fields: {"base":"required","blocks":"required","base_speed":"optional","harvest_bonus":"optional","break_speed_multiplier":"optional"}
    },
    "HealEffect_Entity__data_dragonsurvival_dragon_ability": {
        required: ["percentage"],
        optional: [],
        fields: {"percentage":"required"}
    },
    "HitByProjectileTrigger__data_dragonsurvival_dragon_penalty": {
        required: ["projectiles"],
        optional: [],
        fields: {"projectiles":"required"}
    },
    "HitByWaterPotionTrigger__data_dragonsurvival_dragon_penalty": {
        required: [],
        optional: [],
        fields: {}
    },
    "HoverIcon__data_dragonsurvival_dragon_species": {
        required: ["hover_icon","icon"],
        optional: [],
        fields: {"hover_icon":"required","icon":"required"}
    },
    "HungerEffect_Entity__data_dragonsurvival_dragon_ability": {
        required: ["hunger_gain","saturation_gain","maximum_saturation","conversion_rate"],
        optional: [],
        fields: {"hunger_gain":"required","saturation_gain":"required","maximum_saturation":"required","conversion_rate":"required"}
    },
    "IgniteEffect_Entity__data_dragonsurvival_dragon_ability": {
        required: ["ignite_ticks"],
        optional: [],
        fields: {"ignite_ticks":"required"}
    },
    "InstantTrigger__data_dragonsurvival_dragon_penalty": {
        required: ["trigger_rate"],
        optional: [],
        fields: {"trigger_rate":"required"}
    },
    "ItemBlacklistPenalty__data_dragonsurvival_dragon_penalty": {
        required: ["items"],
        optional: [],
        fields: {"items":"required"}
    },
    "ItemConversionData__data_dragonsurvival_dragon_ability": {
        required: ["item_predicate","items_to"],
        optional: [],
        fields: {"item_predicate":"required","items_to":"required"}
    },
    "ItemConversionEffect_Entity__data_dragonsurvival_dragon_ability": {
        required: ["item_conversions","probability"],
        optional: [],
        fields: {"item_conversions":"required","probability":"required"}
    },
    "ItemTo__data_dragonsurvival_dragon_ability": {
        required: ["item","weight"],
        optional: ["conversion_rate","particles"],
        fields: {"item":"required","conversion_rate":"optional","weight":"required","particles":"optional"}
    },
    "ItemUpgrade__data_dragonsurvival_dragon_ability": {
        required: ["items_per_level","downgrade_items"],
        optional: [],
        fields: {"items_per_level":"required","downgrade_items":"required"}
    },
    "ItemUsedTrigger__data_dragonsurvival_dragon_penalty": {
        required: ["item_predicates"],
        optional: [],
        fields: {"item_predicates":"required"}
    },
    "LevelBasedResourceEntry__data_dragonsurvival_dragon_ability": {
        required: ["texture_resource","from_level"],
        optional: [],
        fields: {"texture_resource":"required","from_level":"required"}
    },
    "LevelBasedResource__data_dragonsurvival_dragon_ability": {
        required: ["texture_entries"],
        optional: [],
        fields: {"texture_entries":"required"}
    },
    "LevelBasedResource__data_dragonsurvival_projectile_data": {
        required: ["texture_entries"],
        optional: [],
        fields: {"texture_entries":"required"}
    },
    "LevelBasedTierEntry__data_dragonsurvival_dragon_ability": {
        required: ["tier","from_level"],
        optional: [],
        fields: {"tier":"required","from_level":"required"}
    },
    "LevelBasedTier__data_dragonsurvival_dragon_ability": {
        required: ["tiers"],
        optional: [],
        fields: {"tiers":"required"}
    },
    "LevelBasedValueMap__data_dragonsurvival_dragon_ability": {
        required: ["type"],
        optional: [],
        fields: {"type":"required"}
    },
    "LevelBasedValueMap__data_dragonsurvival_dragon_body": {
        required: ["type"],
        optional: [],
        fields: {"type":"required"}
    },
    "LevelBasedValueMap__data_dragonsurvival_dragon_penalty": {
        required: ["type"],
        optional: [],
        fields: {"type":"required"}
    },
    "LevelBasedValueMap__data_dragonsurvival_dragon_stage": {
        required: ["type"],
        optional: [],
        fields: {"type":"required"}
    },
    "LevelBasedValueMap__data_dragonsurvival_projectile_data": {
        required: ["type"],
        optional: [],
        fields: {"type":"required"}
    },
    "LightningHandler__data_dragonsurvival_projectile_data": {
        required: ["can_hurt_self","spawns_fire","ignores_items_and_experience"],
        optional: [],
        fields: {"can_hurt_self":"required","spawns_fire":"required","ignores_items_and_experience":"required"}
    },
    "LookingAtBlock__data_advancement_predicate": {
        required: ["predicate","distance"],
        optional: [],
        fields: {"predicate":"required","distance":"required"}
    },
    "LookingAtTarget__data_dragonsurvival_dragon_ability": {
        required: ["applied_effects","range"],
        optional: [],
        fields: {"applied_effects":"required","range":"required"}
    },
    "ManaHandling__data_dragonsurvival_dragon_species": {
        required: [],
        optional: ["mana_xp_conversion","mana_per_level","max_mana_from_levels"],
        fields: {"mana_xp_conversion":"optional","mana_per_level":"optional","max_mana_from_levels":"optional"}
    },
    "ManaRecoveryEffect_Entity__data_dragonsurvival_dragon_ability": {
        required: ["action_type","adjustment_type","amount"],
        optional: ["probability"],
        fields: {"action_type":"required","adjustment_type":"required","amount":"required","probability":"optional"}
    },
    "ManaSprites__data_dragonsurvival_dragon_species": {
        required: ["full","reserved","recovery","empty"],
        optional: [],
        fields: {"full":"required","reserved":"required","recovery":"required","empty":"required"}
    },
    "MineBlockUnderLava__data_advancement_trigger": {
        required: [],
        optional: ["block"],
        fields: {"block":"optional"}
    },
    "MiscResources__data_dragonsurvival_dragon_species": {
        required: ["altar_banner","ability_bar","growth_crystal","food_tooltip","primary_color","secondary_color"],
        optional: ["food_sprites","mana_sprites","growth_left_arrow","growth_right_arrow","claw_texture_slot"],
        fields: {"food_sprites":"optional","mana_sprites":"optional","altar_banner":"required","ability_bar":"required","growth_left_arrow":"optional","growth_right_arrow":"optional","growth_crystal":"required","food_tooltip":"required","primary_color":"required","secondary_color":"required","claw_texture_slot":"optional"}
    },
    "MobEffectPenalty__data_dragonsurvival_dragon_penalty": {
        required: ["potion"],
        optional: [],
        fields: {"potion":"required"}
    },
    "MobEffectRemovalEffect_Entity__data_dragonsurvival_dragon_ability": {
        required: [],
        optional: ["categories","valid_effects","max_amount","maximum_effect_level"],
        fields: {"categories":"optional","valid_effects":"optional","max_amount":"optional","maximum_effect_level":"optional"}
    },
    "Modification__data_dragonsurvival_dragon_ability": {
        required: ["type","amount"],
        optional: [],
        fields: {"type":"required","amount":"required"}
    },
    "Modification__data_dragonsurvival_dragon_penalty": {
        required: ["type","amount"],
        optional: [],
        fields: {"type":"required","amount":"required"}
    },
    "ModifierEffect_Entity__data_dragonsurvival_dragon_ability": {
        required: ["modifiers"],
        optional: [],
        fields: {"modifiers":"required"}
    },
    "ModifierPenalty__data_dragonsurvival_dragon_penalty": {
        required: ["modifiers"],
        optional: [],
        fields: {"modifiers":"required"}
    },
    "ModifierWithDuration__data_dragonsurvival_dragon_ability": {
        required: ["base","modifiers"],
        optional: [],
        fields: {"base":"required","modifiers":"required"}
    },
    "ModifierWithDuration__data_dragonsurvival_dragon_penalty": {
        required: ["base","modifiers"],
        optional: [],
        fields: {"base":"required","modifiers":"required"}
    },
    "Modifier__data_dragonsurvival_dragon_ability": {
        required: ["attribute","amount","operation"],
        optional: [],
        fields: {"attribute":"required","amount":"required","operation":"required"}
    },
    "Modifier__data_dragonsurvival_dragon_body": {
        required: ["attribute","amount","operation"],
        optional: [],
        fields: {"attribute":"required","amount":"required","operation":"required"}
    },
    "Modifier__data_dragonsurvival_dragon_penalty": {
        required: ["attribute","amount","operation"],
        optional: [],
        fields: {"attribute":"required","amount":"required","operation":"required"}
    },
    "Modifier__data_dragonsurvival_dragon_stage": {
        required: ["attribute","amount","operation"],
        optional: [],
        fields: {"attribute":"required","amount":"required","operation":"required"}
    },
    "MountingOffsets__data_dragonsurvival_dragon_body": {
        required: [],
        optional: ["human_offset","dragon_offset","offset_per_scale_above_one"],
        fields: {"human_offset":"optional","dragon_offset":"optional","offset_per_scale_above_one":"optional"}
    },
    "NearbyEntityPredicate__data_advancement_predicate": {
        required: ["entity_types","radius"],
        optional: [],
        fields: {"entity_types":"required","radius":"required"}
    },
    "Notification__data_dragonsurvival_dragon_ability": {
        required: [],
        optional: ["not_enough_mana","usage_blocked"],
        fields: {"not_enough_mana":"optional","usage_blocked":"optional"}
    },
    "OnAttackEffect_Entity__data_dragonsurvival_dragon_ability": {
        required: ["potion"],
        optional: [],
        fields: {"potion":"required"}
    },
    "OnBlockBreak__data_dragonsurvival_dragon_ability": {
        required: ["condition"],
        optional: [],
        fields: {"condition":"required"}
    },
    "OnDeath__data_dragonsurvival_dragon_ability": {
        required: [],
        optional: [],
        fields: {}
    },
    "OnKeyPressed__data_dragonsurvival_dragon_ability": {
        required: ["keys"],
        optional: [],
        fields: {"keys":"required"}
    },
    "OnKeyReleased__data_dragonsurvival_dragon_ability": {
        required: ["keys"],
        optional: [],
        fields: {"keys":"required"}
    },
    "OnSelfHit__data_dragonsurvival_dragon_ability": {
        required: [],
        optional: ["condition"],
        fields: {"condition":"optional"}
    },
    "OnTargetHit__data_dragonsurvival_dragon_ability": {
        required: [],
        optional: ["condition"],
        fields: {"condition":"optional"}
    },
    "OnTargetKilled__data_dragonsurvival_dragon_ability": {
        required: [],
        optional: ["condition"],
        fields: {"condition":"optional"}
    },
    "OxygenBonusEffect_Entity__data_dragonsurvival_dragon_ability": {
        required: ["bonuses"],
        optional: [],
        fields: {"bonuses":"required"}
    },
    "OxygenBonus__data_dragonsurvival_dragon_ability": {
        required: ["base","oxygen_bonus"],
        optional: ["fluid_types"],
        fields: {"base":"required","fluid_types":"optional","oxygen_bonus":"required"}
    },
    "ParticleEffect_Block__data_dragonsurvival_dragon_ability": {
        required: ["particle_data","particle_count"],
        optional: [],
        fields: {"particle_data":"required","particle_count":"required"}
    },
    "ParticleEffect_Entity__data_dragonsurvival_dragon_ability": {
        required: ["particle_data","particle_count"],
        optional: [],
        fields: {"particle_data":"required","particle_count":"required"}
    },
    "Parts__assets_dragonsurvival_skin_default_parts": {
        required: [],
        optional: ["base","bottom","eyes","horns","spikes","claws","teeth","magic","extra","extra1","extra2","extra3","extra4","extra5","extra6","extra7"],
        fields: {"base":"optional","bottom":"optional","eyes":"optional","horns":"optional","spikes":"optional","claws":"optional","teeth":"optional","magic":"optional","extra":"optional","extra1":"optional","extra2":"optional","extra3":"optional","extra4":"optional","extra5":"optional","extra6":"optional","extra7":"optional"}
    },
    "PassiveActivation__data_dragonsurvival_dragon_ability": {
        required: [],
        optional: ["continuous_mana_cost","cooldown","trigger"],
        fields: {"continuous_mana_cost":"optional","cooldown":"optional","trigger":"optional"}
    },
    "PassiveAnimations__data_dragonsurvival_dragon_ability": {
        required: [],
        optional: ["looping"],
        fields: {"looping":"optional"}
    },
    "PassiveSound__data_dragonsurvival_dragon_ability": {
        required: [],
        optional: ["looping"],
        fields: {"looping":"optional"}
    },
    "PassiveTriggerPoint__data_dragonsurvival_dragon_ability": {
        required: [],
        optional: ["trigger_point"],
        fields: {"trigger_point":"optional"}
    },
    "PaymentData__data_data_maps_dragon_species": {
        required: [],
        optional: ["experience_cost","duration_multiplier","amplifier_modification"],
        fields: {"experience_cost":"optional","duration_multiplier":"optional","amplifier_modification":"optional"}
    },
    "PenaltyEffect__data_dragonsurvival_dragon_penalty": {
        required: ["penalty_type"],
        optional: [],
        fields: {"penalty_type":"required"}
    },
    "PenaltyTrigger__data_dragonsurvival_dragon_penalty": {
        required: ["penalty_trigger"],
        optional: [],
        fields: {"penalty_trigger":"required"}
    },
    "PotionData__data_dragonsurvival_dragon_ability": {
        required: ["effects","amplifier","duration"],
        optional: ["probability","effect_particles","show_icon"],
        fields: {"effects":"required","amplifier":"required","duration":"required","probability":"optional","effect_particles":"optional","show_icon":"optional"}
    },
    "PotionData__data_dragonsurvival_dragon_penalty": {
        required: ["effects","amplifier","duration"],
        optional: ["probability","effect_particles","show_icon"],
        fields: {"effects":"required","amplifier":"required","duration":"required","probability":"optional","effect_particles":"optional","show_icon":"optional"}
    },
    "PotionData__data_dragonsurvival_projectile_data": {
        required: ["effects","amplifier","duration"],
        optional: ["probability","effect_particles","show_icon"],
        fields: {"effects":"required","amplifier":"required","duration":"required","probability":"optional","effect_particles":"optional","show_icon":"optional"}
    },
    "PotionEffect_Entity__data_dragonsurvival_dragon_ability": {
        required: ["potion"],
        optional: [],
        fields: {"potion":"required"}
    },
    "PreciseLevelBasedValue__data_dragonsurvival_dragon_ability": {
        required: ["precise_base","precise_amount"],
        optional: [],
        fields: {"precise_base":"required","precise_amount":"required"}
    },
    "PreciseLevelBasedValue__data_dragonsurvival_dragon_body": {
        required: ["precise_base","precise_amount"],
        optional: [],
        fields: {"precise_base":"required","precise_amount":"required"}
    },
    "PreciseLevelBasedValue__data_dragonsurvival_dragon_penalty": {
        required: ["precise_base","precise_amount"],
        optional: [],
        fields: {"precise_base":"required","precise_amount":"required"}
    },
    "PreciseLevelBasedValue__data_dragonsurvival_dragon_stage": {
        required: ["precise_base","precise_amount"],
        optional: [],
        fields: {"precise_base":"required","precise_amount":"required"}
    },
    "ProjectileAreaCloudEffect__data_dragonsurvival_projectile_data": {
        required: ["potion","duration","probability","particle"],
        optional: ["delay","radius"],
        fields: {"potion":"required","duration":"required","probability":"required","delay":"optional","radius":"optional","particle":"required"}
    },
    "ProjectileBlockEffect__data_dragonsurvival_projectile_data": {
        required: ["block_effect"],
        optional: [],
        fields: {"block_effect":"required"}
    },
    "ProjectileBlockParticleEffect__data_dragonsurvival_projectile_data": {
        required: ["particle_data","particle_count"],
        optional: [],
        fields: {"particle_data":"required","particle_count":"required"}
    },
    "ProjectileBlockRunFunctionEffect__data_dragonsurvival_projectile_data": {
        required: ["function"],
        optional: [],
        fields: {"function":"required"}
    },
    "ProjectileDamageEffect__data_dragonsurvival_projectile_data": {
        required: ["damage_type","amount"],
        optional: [],
        fields: {"damage_type":"required","amount":"required"}
    },
    "ProjectileData__data_dragonsurvival_projectile_data": {
        required: ["general_data"],
        optional: ["type_data"],
        fields: {"general_data":"required","type_data":"optional"}
    },
    "ProjectileEffect_Entity__data_dragonsurvival_dragon_ability": {
        required: ["projectile_data","target_direction","number_of_projectiles","speed"],
        optional: ["projectile_spread"],
        fields: {"projectile_data":"required","target_direction":"required","number_of_projectiles":"required","projectile_spread":"optional","speed":"required"}
    },
    "ProjectileEntityEffect__data_dragonsurvival_projectile_data": {
        required: ["entity_effect"],
        optional: [],
        fields: {"entity_effect":"required"}
    },
    "ProjectileEntityParticleEffect__data_dragonsurvival_projectile_data": {
        required: ["particle_data","particle_count"],
        optional: [],
        fields: {"particle_data":"required","particle_count":"required"}
    },
    "ProjectileEntityPushEffect__data_dragonsurvival_projectile_data": {
        required: ["target_direction","push_force"],
        optional: [],
        fields: {"target_direction":"required","push_force":"required"}
    },
    "ProjectileEntityRunFunctionEffect__data_dragonsurvival_projectile_data": {
        required: ["function"],
        optional: [],
        fields: {"function":"required"}
    },
    "ProjectileExplosionEffect__data_dragonsurvival_projectile_data": {
        required: ["damage_type","explosion_power","fire","break_blocks","can_damage_self"],
        optional: [],
        fields: {"damage_type":"required","explosion_power":"required","fire":"required","break_blocks":"required","can_damage_self":"required"}
    },
    "ProjectileLightningEntityEffect__data_dragonsurvival_projectile_data": {
        required: ["data"],
        optional: [],
        fields: {"data":"required"}
    },
    "ProjectileLightningWorldEffect__data_dragonsurvival_projectile_data": {
        required: ["data"],
        optional: [],
        fields: {"data":"required"}
    },
    "ProjectilePotionEffect__data_dragonsurvival_projectile_data": {
        required: ["potion"],
        optional: [],
        fields: {"potion":"required"}
    },
    "ProjectileTargeting_GeneralData_Effect__data_dragonsurvival_projectile_data": {
        required: ["effect"],
        optional: ["condition"],
        fields: {"effect":"required","condition":"optional"}
    },
    "ProjectileTargeting_GeneralData__data_dragonsurvival_projectile_data": {
        required: ["effects"],
        optional: ["tick_rate","chance"],
        fields: {"effects":"required","tick_rate":"optional","chance":"optional"}
    },
    "ProjectileTargeting__data_dragonsurvival_projectile_data": {
        required: ["general_data","target_type"],
        optional: [],
        fields: {"general_data":"required","target_type":"required"}
    },
    "ProjectileWorldEffect__data_dragonsurvival_projectile_data": {
        required: ["world_effect"],
        optional: [],
        fields: {"world_effect":"required"}
    },
    "ProjectileWorldParticleEffect__data_dragonsurvival_projectile_data": {
        required: ["particle_data","particle_count"],
        optional: [],
        fields: {"particle_data":"required","particle_count":"required"}
    },
    "ProjectileWorldRunFunctionEffect__data_dragonsurvival_projectile_data": {
        required: ["function"],
        optional: [],
        fields: {"function":"required"}
    },
    "PushEffect_Entity__data_dragonsurvival_dragon_ability": {
        required: ["target_direction","push_force"],
        optional: [],
        fields: {"target_direction":"required","push_force":"required"}
    },
    "RecoveryItems__data_dragonsurvival_dragon_penalty": {
        required: ["item_predicates","percent_restored"],
        optional: [],
        fields: {"item_predicates":"required","percent_restored":"required"}
    },
    "ReplaceableValue___data_data_maps_dragon_species": {
        required: ["value"],
        optional: ["replace"],
        fields: {"replace":"optional","value":"required"}
    },
    "ReplaceableValue__data_data_maps_dragon_species": {
        required: ["value"],
        optional: ["replace"],
        fields: {"replace":"optional","value":"required"}
    },
    "ReservedManaCost__data_dragonsurvival_dragon_ability": {
        required: ["type","amount"],
        optional: [],
        fields: {"type":"required","amount":"required"}
    },
    "ResourceLocation__data_dragonsurvival_projectile_data": {
        required: ["from_level","texture_resource"],
        optional: [],
        fields: {"from_level":"required","texture_resource":"required"}
    },
    "RunFunctionEffect_Block__data_dragonsurvival_dragon_ability": {
        required: ["function"],
        optional: [],
        fields: {"function":"required"}
    },
    "RunFunctionEffect_Entity__data_dragonsurvival_dragon_ability": {
        required: ["function"],
        optional: [],
        fields: {"function":"required"}
    },
    "RunFunctionPenalty__data_dragonsurvival_dragon_penalty": {
        required: ["function"],
        optional: [],
        fields: {"function":"required"}
    },
    "ScalingProportions__data_dragonsurvival_dragon_body": {
        required: ["width","height","eye_height"],
        optional: ["scale_multiplier","shadow_multiplier"],
        fields: {"width":"required","height":"required","eye_height":"required","scale_multiplier":"optional","shadow_multiplier":"optional"}
    },
    "SelfTarget__data_dragonsurvival_dragon_ability": {
        required: ["applied_effects"],
        optional: [],
        fields: {"applied_effects":"required"}
    },
    "SimpleAbilityAnimation__data_dragonsurvival_dragon_ability": {
        required: ["animation_key","layer","locks_neck","locks_tail"],
        optional: ["transition_length"],
        fields: {"animation_key":"required","layer":"required","transition_length":"optional","locks_neck":"required","locks_tail":"required"}
    },
    "SimpleActivation__data_dragonsurvival_dragon_ability": {
        required: [],
        optional: ["initial_mana_cost","cast_time","cooldown","notification","can_move_while_casting","sound","animations"],
        fields: {"initial_mana_cost":"optional","cast_time":"optional","cooldown":"optional","notification":"optional","can_move_while_casting":"optional","sound":"optional","animations":"optional"}
    },
    "SimpleTriggerPoint__data_dragonsurvival_dragon_ability": {
        required: [],
        optional: ["trigger_point"],
        fields: {"trigger_point":"optional"}
    },
    "SkinDefaultParts__assets_dragonsurvival_skin_default_parts": {
        required: ["species","stage","parts"],
        optional: ["body","model"],
        fields: {"species":"required","stage":"required","body":"optional","model":"optional","parts":"required"}
    },
    "SkinParts__assets_dragonsurvival_skin_parts": {
        required: ["key","texture"],
        optional: ["localization","applicable_species","applicable_bodies","average_hue","is_colorable","include_in_randomizer","is_hue_randomizable","is_glowing"],
        fields: {"key":"required","localization":"optional","texture":"required","applicable_species":"optional","applicable_bodies":"optional","average_hue":"optional","is_colorable":"optional","include_in_randomizer":"optional","is_hue_randomizable":"optional","is_glowing":"optional"}
    },
    "SleepOnTreasure__data_advancement_trigger": {
        required: [],
        optional: ["nearby_treasure_amount"],
        fields: {"nearby_treasure_amount":"optional"}
    },
    "SmeltItemEffect_Entity__data_dragonsurvival_dragon_ability": {
        required: [],
        optional: ["item_predicate","progress","grants_experience"],
        fields: {"item_predicate":"optional","progress":"optional","grants_experience":"optional"}
    },
    "Sound__data_dragonsurvival_dragon_ability": {
        required: [],
        optional: ["start","charging","end"],
        fields: {"start":"optional","charging":"optional","end":"optional"}
    },
    "Sound__data_dragonsurvival_dragon_body": {
        required: ["sound_event","interval"],
        optional: ["volume","pitch"],
        fields: {"sound_event":"required","volume":"optional","pitch":"optional","interval":"required"}
    },
    "SpeciesID__data_data_maps_dragon_species": {
        required: [],
        optional: [],
        fields: {}
    },
    "SpinEffect_Entity__data_dragonsurvival_dragon_ability": {
        required: ["level_requirement"],
        optional: ["fluid_types"],
        fields: {"level_requirement":"required","fluid_types":"optional"}
    },
    "StageResource__data_data_maps_dragon_species": {
        required: ["growth_icon","default_skin"],
        optional: [],
        fields: {"growth_icon":"required","default_skin":"required"}
    },
    "StageResourcesID__data_data_maps_dragon_species": {
        required: [],
        optional: [],
        fields: {}
    },
    "StealFromVillager__data_advancement_trigger": {
        required: [],
        optional: [],
        fields: {}
    },
    "StopNaturalGrowth__data_advancement_trigger": {
        required: [],
        optional: [],
        fields: {}
    },
    "SummonEntityEffect_Block__data_dragonsurvival_dragon_ability": {
        required: ["base","entities","max_summons","nbt"],
        optional: ["attribute_scales","is_allied"],
        fields: {"base":"required","entities":"required","max_summons":"required","attribute_scales":"optional","nbt":"required","is_allied":"optional"}
    },
    "SummonEntityEffect_Entity__data_dragonsurvival_dragon_ability": {
        required: ["base","entities","max_summons","nbt"],
        optional: ["attribute_scales","is_allied"],
        fields: {"base":"required","entities":"required","max_summons":"required","attribute_scales":"optional","nbt":"required","is_allied":"optional"}
    },
    "SummonEntityEffect_NBT__data_dragonsurvival_dragon_ability": {
        required: [],
        optional: [],
        fields: {}
    },
    "SupplyTrigger__data_dragonsurvival_dragon_penalty": {
        required: ["supply_type","trigger_rate","reduction_rate","regeneration_rate"],
        optional: ["attribute","recovery_items","display_like_hunger_bar","particles_on_trigger"],
        fields: {"supply_type":"required","attribute":"optional","trigger_rate":"required","reduction_rate":"required","regeneration_rate":"required","recovery_items":"optional","display_like_hunger_bar":"optional","particles_on_trigger":"optional"}
    },
    "SwimEffect_Entity__data_dragonsurvival_dragon_ability": {
        required: ["max_oxygen","fluid_type"],
        optional: [],
        fields: {"max_oxygen":"required","fluid_type":"required"}
    },
    "TargetDirection__data_dragonsurvival_dragon_ability": {
        required: ["direction"],
        optional: [],
        fields: {"direction":"required"}
    },
    "TargetDirection__data_dragonsurvival_projectile_data": {
        required: ["direction"],
        optional: [],
        fields: {"direction":"required"}
    },
    "Targeting__data_dragonsurvival_dragon_ability": {
        required: ["target_type"],
        optional: [],
        fields: {"target_type":"required"}
    },
    "TeleportEffect_Entity__data_dragonsurvival_dragon_ability": {
        required: ["target_direction","range"],
        optional: [],
        fields: {"target_direction":"required","range":"required"}
    },
    "TextureSize__data_dragonsurvival_dragon_body": {
        required: ["width","height"],
        optional: [],
        fields: {"width":"required","height":"required"}
    },
    "TickingManaCost__data_dragonsurvival_dragon_ability": {
        required: ["type","amount"],
        optional: [],
        fields: {"type":"required","amount":"required"}
    },
    "UnlockableBehavior__data_dragonsurvival_dragon_body": {
        required: [],
        optional: ["unlock_condition","visibility"],
        fields: {"unlock_condition":"optional","visibility":"optional"}
    },
    "UnlockableBehavior__data_dragonsurvival_dragon_species": {
        required: [],
        optional: ["unlock_condition","visibility"],
        fields: {"unlock_condition":"optional","visibility":"optional"}
    },
    "UpgradeAbility__data_advancement_trigger": {
        required: [],
        optional: ["ability","level"],
        fields: {"ability":"optional","level":"optional"}
    },
    "Upgrade__data_dragonsurvival_dragon_ability": {
        required: ["upgrade_type"],
        optional: [],
        fields: {"upgrade_type":"required"}
    },
    "UseDragonSoul__data_advancement_trigger": {
        required: [],
        optional: [],
        fields: {}
    },
    "UseItemOnBlockEffect_Block__data_dragonsurvival_dragon_ability": {
        required: ["item"],
        optional: ["probability","sound","valid_blocks"],
        fields: {"item":"required","probability":"optional","sound":"optional","valid_blocks":"optional"}
    },
    "UseItemOnLivingEntityEffect_Entity__data_dragonsurvival_dragon_ability": {
        required: ["item"],
        optional: ["probability","sound","valid_entities"],
        fields: {"item":"required","probability":"optional","sound":"optional","valid_entities":"optional"}
    },
    "WeatherPredicate__data_advancement_predicate": {
        required: [],
        optional: ["is_raining","is_thundering","is_snowing","is_raining_or_snowing"],
        fields: {"is_raining":"optional","is_thundering":"optional","is_snowing":"optional","is_raining_or_snowing":"optional"}
    },
    "WeightedListEntry__data_dragonsurvival_dragon_ability": {
        required: ["data","weight"],
        optional: [],
        fields: {"data":"required","weight":"required"}
    },
};

export const MCDOC_STRUCT_CHILDREN: Record<string, Record<string, string[]>> = {
    "Action__data_dragonsurvival_dragon_ability": {"target_selection":["Targeting__data_dragonsurvival_dragon_ability"],"trigger_rate":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
    "Animations__data_dragonsurvival_dragon_ability": {"start_and_charging":["CompoundAbilityAnimation__data_dragonsurvival_dragon_ability","SimpleAbilityAnimation__data_dragonsurvival_dragon_ability"],"end":["SimpleAbilityAnimation__data_dragonsurvival_dragon_ability"]},
    "AreaCloudEffect_Block__data_dragonsurvival_dragon_ability": {"potion":["PotionData__data_dragonsurvival_dragon_ability"],"duration":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"],"probability":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"],"delay":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"],"radius":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
    "AreaTarget__data_dragonsurvival_dragon_ability": {"applied_effects":["BlockTargeting__data_dragonsurvival_dragon_ability","EntityTargeting__data_dragonsurvival_dragon_ability"],"radius":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
    "AreaTarget__data_dragonsurvival_projectile_data": {"radius":["LevelBasedValueMap__data_dragonsurvival_projectile_data"]},
    "AttributeScale__data_dragonsurvival_dragon_ability": {"scale":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
    "BehaviourData__data_dragonsurvival_projectile_data": {"width":["LevelBasedValueMap__data_dragonsurvival_projectile_data"],"height":["LevelBasedValueMap__data_dragonsurvival_projectile_data"],"max_bounces":["LevelBasedValueMap__data_dragonsurvival_projectile_data"],"max_lingering_ticks":["LevelBasedValueMap__data_dragonsurvival_projectile_data"],"max_movement_distance":["LevelBasedValueMap__data_dragonsurvival_projectile_data"],"max_lifespan":["LevelBasedValueMap__data_dragonsurvival_projectile_data"]},
    "BlockBreakEffect_Block__data_dragonsurvival_dragon_ability": {"valid_blocks":["BlockPredicateSpecial__data_dragonsurvival_dragon_ability"],"probability":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
    "BlockConversionData__data_dragonsurvival_dragon_ability": {"blocks_to":["BlockTo__data_dragonsurvival_dragon_ability"]},
    "BlockConversionEffect_Block__data_dragonsurvival_dragon_ability": {"conversion_data":["BlockConversionData__data_dragonsurvival_dragon_ability"],"probability":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
    "BlockHarvestEffect_Block__data_dragonsurvival_dragon_ability": {"probability":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
    "BlockTargeting__data_dragonsurvival_dragon_ability": {"block_effect":["BlockEffect__data_dragonsurvival_dragon_ability"]},
    "BlockVision__data_dragonsurvival_dragon_ability": {"base":["DurationInstanceBase__data_dragonsurvival_dragon_ability"],"range":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"],"colors":["ColorEntry__data_dragonsurvival_dragon_ability"]},
    "BlockVisionEffect_Entity__data_dragonsurvival_dragon_ability": {"block_visions":["BlockVision__data_dragonsurvival_dragon_ability"]},
    "BonemealEffect_Block__data_dragonsurvival_dragon_ability": {"attempts":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"],"probability":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
    "ChanneledActivation__data_dragonsurvival_dragon_ability": {"initial_mana_cost":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"],"continuous_mana_cost":["TickingManaCost__data_dragonsurvival_dragon_ability"],"cast_time":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"],"cooldown":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"],"max_duration":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"],"notification":["Notification__data_dragonsurvival_dragon_ability"],"sound":["Sound__data_dragonsurvival_dragon_ability"],"animations":["Animations__data_dragonsurvival_dragon_ability"]},
    "ChanneledAnimations__data_dragonsurvival_dragon_ability": {"looping":["SimpleAbilityAnimation__data_dragonsurvival_dragon_ability"]},
    "CooldownRecoveryEffect__data_dragonsurvival_dragon_ability": {"amount":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"],"probability":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
    "CustomPredicates__data_advancement_predicate": {"weather_predicate":["WeatherPredicate__data_advancement_predicate"],"is_nearby_entity":["NearbyEntityPredicate__data_advancement_predicate"],"looking_at_block":["LookingAtBlock__data_advancement_predicate"]},
    "DamageEffect_Entity__data_dragonsurvival_dragon_ability": {"amount":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
    "DamageModification__data_dragonsurvival_dragon_ability": {"base":["DurationInstanceBase__data_dragonsurvival_dragon_ability"],"multiplier":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
    "DamageModification__data_dragonsurvival_dragon_penalty": {"base":["DurationInstanceBase__data_dragonsurvival_dragon_penalty"],"multiplier":["LevelBasedValueMap__data_dragonsurvival_dragon_penalty"]},
    "DamageModificationEffect_Entity__data_dragonsurvival_dragon_ability": {"modifications":["DamageModification__data_dragonsurvival_dragon_ability"]},
    "DamageModificationPenalty__data_dragonsurvival_dragon_penalty": {"modification":["DamageModification__data_dragonsurvival_dragon_penalty"]},
    "DataMapDragonSpecies__data_data_maps_dragon_species": {"values":["SpeciesID__data_data_maps_dragon_species"]},
    "DietEntry__data_data_maps_dragon_species": {"properties":["Food__data_data_maps_dragon_species"]},
    "DiscTarget__data_dragonsurvival_dragon_ability": {"applied_effects":["BlockTargeting__data_dragonsurvival_dragon_ability","EntityTargeting__data_dragonsurvival_dragon_ability"],"radius":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"],"height":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
    "DragonAbility__data_dragonsurvival_dragon_ability": {"activation":["Activation__data_dragonsurvival_dragon_ability"],"upgrade":["Upgrade__data_dragonsurvival_dragon_ability"],"actions":["Action__data_dragonsurvival_dragon_ability"],"icon":["LevelBasedResource__data_dragonsurvival_dragon_ability"]},
    "DragonBeaconData__data_data_maps_dragon_species": {"effects":["Effect__data_data_maps_dragon_species"],"payment_data":["PaymentData__data_data_maps_dragon_species"]},
    "DragonBody__data_dragonsurvival_dragon_body": {"unlockable_behavior":["UnlockableBehavior__data_dragonsurvival_dragon_body"],"modifiers":["Modifier__data_dragonsurvival_dragon_body"],"texture_size":["TextureSize__data_dragonsurvival_dragon_body"],"emotes":["DragonEmoteSet__data_dragonsurvival_dragon_body"],"scaling_proportions":["ScalingProportions__data_dragonsurvival_dragon_body"],"mounting_offset":["MountingOffsets__data_dragonsurvival_dragon_body"],"backpack_offset":["BackpackOffsets__data_dragonsurvival_dragon_body"]},
    "DragonBreathTarget__data_dragonsurvival_dragon_ability": {"applied_effects":["BlockTargeting__data_dragonsurvival_dragon_ability","EntityTargeting__data_dragonsurvival_dragon_ability"],"range_multiplier":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
    "DragonEmote__data_dragonsurvival_dragon_body": {"sound":["Sound__data_dragonsurvival_dragon_body"]},
    "DragonEmoteSet__data_dragonsurvival_dragon_body": {"emotes":["DragonEmote__data_dragonsurvival_dragon_body"]},
    "DragonGrowthEffect_Entity__data_dragonsurvival_dragon_ability": {"amount":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"],"probability":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
    "DragonGrowthUpgrade__data_dragonsurvival_dragon_ability": {"growth_requirement":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
    "DragonPenalty__data_dragonsurvival_dragon_penalty": {"effect":["PenaltyEffect__data_dragonsurvival_dragon_penalty"],"trigger":["PenaltyTrigger__data_dragonsurvival_dragon_penalty"]},
    "DragonPredicate__data_advancement_predicate": {"stage_specific":["DragonStagePredicate__data_advancement_predicate"],"ability_levels":["AbilityLevel__data_advancement_predicate"]},
    "DragonSpecies__data_dragonsurvival_dragon_species": {"unlockable_behavior":["UnlockableBehavior__data_dragonsurvival_dragon_species"],"mana_handling":["ManaHandling__data_dragonsurvival_dragon_species"],"misc_resources":["MiscResources__data_dragonsurvival_dragon_species"]},
    "DragonStage__data_dragonsurvival_dragon_stage": {"growth_range":["Bounds__data_dragonsurvival_dragon_stage"],"modifiers":["Modifier__data_dragonsurvival_dragon_stage"],"growth_items":["GrowthItem__data_dragonsurvival_dragon_stage"],"destruction_data":["DestructionData__data_dragonsurvival_dragon_stage"]},
    "DurationInstanceBase__data_dragonsurvival_dragon_ability": {"duration":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
    "DurationInstanceBase__data_dragonsurvival_dragon_penalty": {"duration":["LevelBasedValueMap__data_dragonsurvival_dragon_penalty"]},
    "EffectModification__data_dragonsurvival_dragon_ability": {"base":["DurationInstanceBase__data_dragonsurvival_dragon_ability"],"duration_modification":["Modification__data_dragonsurvival_dragon_ability"],"amplifier_modification":["Modification__data_dragonsurvival_dragon_ability"]},
    "EffectModification__data_dragonsurvival_dragon_penalty": {"base":["DurationInstanceBase__data_dragonsurvival_dragon_penalty"],"duration_modification":["Modification__data_dragonsurvival_dragon_penalty"],"amplifier_modification":["Modification__data_dragonsurvival_dragon_penalty"]},
    "EffectModificationEffect_Entity__data_dragonsurvival_dragon_ability": {"modifications":["EffectModification__data_dragonsurvival_dragon_ability"]},
    "EffectModificationPenalty__data_dragonsurvival_dragon_penalty": {"modifications":["EffectModification__data_dragonsurvival_dragon_penalty"]},
    "EntityTargeting__data_dragonsurvival_dragon_ability": {"entity_effect":["EntityEffect__data_dragonsurvival_dragon_ability"]},
    "ExperienceEffect__data_dragonsurvival_dragon_ability": {"amount":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"],"probability":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
    "ExperienceLevelUpgrade__data_dragonsurvival_dragon_ability": {"level_requirement":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
    "ExperiencePointsUpgrade__data_dragonsurvival_dragon_ability": {"experience_cost":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
    "ExplodeBlockEffect_Block__data_dragonsurvival_dragon_ability": {"probability":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"],"power":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
    "Fear__data_dragonsurvival_dragon_penalty": {"base":["DurationInstanceBase__data_dragonsurvival_dragon_penalty"],"distance":["LevelBasedValueMap__data_dragonsurvival_dragon_penalty"],"walk_speed":["LevelBasedValueMap__data_dragonsurvival_dragon_penalty"],"sprint_speed":["LevelBasedValueMap__data_dragonsurvival_dragon_penalty"]},
    "FearPenalty__data_dragonsurvival_dragon_penalty": {"fears":["Fear__data_dragonsurvival_dragon_penalty"]},
    "FireEffect_Block__data_dragonsurvival_dragon_ability": {"ignite_probability":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
    "GeneralData__data_dragonsurvival_projectile_data": {"block_hit_effects":["ProjectileBlockEffect__data_dragonsurvival_projectile_data"],"common_hit_effects":["ProjectileTargeting__data_dragonsurvival_projectile_data"],"entity_hit_effects":["ProjectileEntityEffect__data_dragonsurvival_projectile_data"],"ticking_effects":["ProjectileTargeting__data_dragonsurvival_projectile_data"]},
    "GenericArrowData__data_dragonsurvival_projectile_data": {"texture":["LevelBasedResource__data_dragonsurvival_projectile_data"],"piercing_level":["LevelBasedValueMap__data_dragonsurvival_projectile_data"]},
    "GenericArrowEntity__world_entity_generic_arrow_entity": {"general_data":["GeneralData__data_dragonsurvival_projectile_data"],"type_data":["GenericArrowData__data_dragonsurvival_projectile_data"]},
    "GenericBallData__data_dragonsurvival_projectile_data": {"resources":["LevelBasedResource__data_dragonsurvival_projectile_data"],"behaviour_data":["BehaviourData__data_dragonsurvival_projectile_data"],"on_destroy_effects":["ProjectileTargeting__data_dragonsurvival_projectile_data"]},
    "GenericBallEntity__world_entity_generic_ball_entity": {"general_data":["GeneralData__data_dragonsurvival_projectile_data"],"type_data":["GenericBallData__data_dragonsurvival_projectile_data"]},
    "Glow__data_dragonsurvival_dragon_ability": {"base":["DurationInstanceBase__data_dragonsurvival_dragon_ability"]},
    "GlowEffect_Entity__data_dragonsurvival_dragon_ability": {"glows":["Glow__data_dragonsurvival_dragon_ability"]},
    "HarvestBonus__data_dragonsurvival_dragon_ability": {"base":["DurationInstanceBase__data_dragonsurvival_dragon_ability"],"base_speed":["LevelBasedTier__data_dragonsurvival_dragon_ability"],"harvest_bonus":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"],"break_speed_multiplier":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
    "HarvestBonusEffect_Entity__data_dragonsurvival_dragon_ability": {"harvest_bonuses":["HarvestBonus__data_dragonsurvival_dragon_ability"]},
    "HealEffect_Entity__data_dragonsurvival_dragon_ability": {"percentage":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
    "HungerEffect_Entity__data_dragonsurvival_dragon_ability": {"hunger_gain":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"],"saturation_gain":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"],"maximum_saturation":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"],"conversion_rate":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
    "IgniteEffect_Entity__data_dragonsurvival_dragon_ability": {"ignite_ticks":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
    "ItemConversionData__data_dragonsurvival_dragon_ability": {"items_to":["ItemTo__data_dragonsurvival_dragon_ability"]},
    "ItemConversionEffect_Entity__data_dragonsurvival_dragon_ability": {"item_conversions":["ItemConversionData__data_dragonsurvival_dragon_ability"],"probability":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
    "ItemTo__data_dragonsurvival_dragon_ability": {"particles":["ParticleEffect_Entity__data_dragonsurvival_dragon_ability"]},
    "LevelBasedResource__data_dragonsurvival_dragon_ability": {"texture_entries":["LevelBasedResourceEntry__data_dragonsurvival_dragon_ability"]},
    "LevelBasedResource__data_dragonsurvival_projectile_data": {"texture_entries":["ResourceLocation__data_dragonsurvival_projectile_data"]},
    "LevelBasedTier__data_dragonsurvival_dragon_ability": {"tiers":["LevelBasedTierEntry__data_dragonsurvival_dragon_ability"]},
    "LookingAtTarget__data_dragonsurvival_dragon_ability": {"applied_effects":["BlockTargeting__data_dragonsurvival_dragon_ability","EntityTargeting__data_dragonsurvival_dragon_ability"],"range":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
    "ManaRecoveryEffect_Entity__data_dragonsurvival_dragon_ability": {"amount":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"],"probability":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
    "MiscResources__data_dragonsurvival_dragon_species": {"mana_sprites":["ManaSprites__data_dragonsurvival_dragon_species"],"growth_left_arrow":["HoverIcon__data_dragonsurvival_dragon_species"],"growth_right_arrow":["HoverIcon__data_dragonsurvival_dragon_species"],"growth_crystal":["FillIcon__data_dragonsurvival_dragon_species"],"food_tooltip":["FoodTooltip__data_dragonsurvival_dragon_species"]},
    "MobEffectPenalty__data_dragonsurvival_dragon_penalty": {"potion":["PotionData__data_dragonsurvival_dragon_penalty"]},
    "MobEffectRemovalEffect_Entity__data_dragonsurvival_dragon_ability": {"max_amount":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"],"maximum_effect_level":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
    "Modification__data_dragonsurvival_dragon_ability": {"amount":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
    "Modification__data_dragonsurvival_dragon_penalty": {"amount":["LevelBasedValueMap__data_dragonsurvival_dragon_penalty"]},
    "Modifier__data_dragonsurvival_dragon_ability": {"amount":["LevelBasedValueMap__data_dragonsurvival_dragon_ability","PreciseLevelBasedValue__data_dragonsurvival_dragon_ability"]},
    "Modifier__data_dragonsurvival_dragon_body": {"amount":["LevelBasedValueMap__data_dragonsurvival_dragon_body","PreciseLevelBasedValue__data_dragonsurvival_dragon_body"]},
    "Modifier__data_dragonsurvival_dragon_penalty": {"amount":["LevelBasedValueMap__data_dragonsurvival_dragon_penalty","PreciseLevelBasedValue__data_dragonsurvival_dragon_penalty"]},
    "Modifier__data_dragonsurvival_dragon_stage": {"amount":["LevelBasedValueMap__data_dragonsurvival_dragon_stage","PreciseLevelBasedValue__data_dragonsurvival_dragon_stage"]},
    "ModifierEffect_Entity__data_dragonsurvival_dragon_ability": {"modifiers":["ModifierWithDuration__data_dragonsurvival_dragon_ability"]},
    "ModifierPenalty__data_dragonsurvival_dragon_penalty": {"modifiers":["ModifierWithDuration__data_dragonsurvival_dragon_penalty"]},
    "ModifierWithDuration__data_dragonsurvival_dragon_ability": {"base":["DurationInstanceBase__data_dragonsurvival_dragon_ability"],"modifiers":["Modifier__data_dragonsurvival_dragon_ability"]},
    "ModifierWithDuration__data_dragonsurvival_dragon_penalty": {"base":["DurationInstanceBase__data_dragonsurvival_dragon_penalty"],"modifiers":["Modifier__data_dragonsurvival_dragon_penalty"]},
    "OnAttackEffect_Entity__data_dragonsurvival_dragon_ability": {"potion":["PotionData__data_dragonsurvival_dragon_ability"]},
    "OxygenBonus__data_dragonsurvival_dragon_ability": {"base":["DurationInstanceBase__data_dragonsurvival_dragon_ability"],"oxygen_bonus":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
    "OxygenBonusEffect_Entity__data_dragonsurvival_dragon_ability": {"bonuses":["OxygenBonus__data_dragonsurvival_dragon_ability"]},
    "ParticleEffect_Block__data_dragonsurvival_dragon_ability": {"particle_count":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
    "ParticleEffect_Entity__data_dragonsurvival_dragon_ability": {"particle_count":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
    "PassiveActivation__data_dragonsurvival_dragon_ability": {"continuous_mana_cost":["ReservedManaCost__data_dragonsurvival_dragon_ability"],"cooldown":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"],"trigger":["ActivationTrigger__data_dragonsurvival_dragon_ability"]},
    "PassiveAnimations__data_dragonsurvival_dragon_ability": {"looping":["SimpleAbilityAnimation__data_dragonsurvival_dragon_ability"]},
    "PotionData__data_dragonsurvival_dragon_ability": {"amplifier":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"],"duration":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"],"probability":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
    "PotionData__data_dragonsurvival_dragon_penalty": {"amplifier":["LevelBasedValueMap__data_dragonsurvival_dragon_penalty"],"duration":["LevelBasedValueMap__data_dragonsurvival_dragon_penalty"],"probability":["LevelBasedValueMap__data_dragonsurvival_dragon_penalty"]},
    "PotionData__data_dragonsurvival_projectile_data": {"amplifier":["LevelBasedValueMap__data_dragonsurvival_projectile_data"],"duration":["LevelBasedValueMap__data_dragonsurvival_projectile_data"],"probability":["LevelBasedValueMap__data_dragonsurvival_projectile_data"]},
    "PotionEffect_Entity__data_dragonsurvival_dragon_ability": {"potion":["PotionData__data_dragonsurvival_dragon_ability"]},
    "ProjectileAreaCloudEffect__data_dragonsurvival_projectile_data": {"potion":["PotionData__data_dragonsurvival_projectile_data"],"duration":["LevelBasedValueMap__data_dragonsurvival_projectile_data"],"delay":["LevelBasedValueMap__data_dragonsurvival_projectile_data"],"radius":["LevelBasedValueMap__data_dragonsurvival_projectile_data"]},
    "ProjectileBlockParticleEffect__data_dragonsurvival_projectile_data": {"particle_count":["LevelBasedValueMap__data_dragonsurvival_projectile_data"]},
    "ProjectileDamageEffect__data_dragonsurvival_projectile_data": {"amount":["LevelBasedValueMap__data_dragonsurvival_projectile_data"]},
    "ProjectileData__data_dragonsurvival_projectile_data": {"general_data":["GeneralData__data_dragonsurvival_projectile_data"],"type_data":["GenericArrowData__data_dragonsurvival_projectile_data","GenericBallData__data_dragonsurvival_projectile_data"]},
    "ProjectileEffect_Entity__data_dragonsurvival_dragon_ability": {"target_direction":["TargetDirection__data_dragonsurvival_dragon_ability"],"number_of_projectiles":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"],"projectile_spread":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"],"speed":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
    "ProjectileEntityParticleEffect__data_dragonsurvival_projectile_data": {"particle_count":["LevelBasedValueMap__data_dragonsurvival_projectile_data"]},
    "ProjectileEntityPushEffect__data_dragonsurvival_projectile_data": {"target_direction":["TargetDirection__data_dragonsurvival_projectile_data"],"push_force":["LevelBasedValueMap__data_dragonsurvival_projectile_data"]},
    "ProjectileExplosionEffect__data_dragonsurvival_projectile_data": {"explosion_power":["LevelBasedValueMap__data_dragonsurvival_projectile_data"]},
    "ProjectileLightningEntityEffect__data_dragonsurvival_projectile_data": {"data":["LightningHandler__data_dragonsurvival_projectile_data"]},
    "ProjectileLightningWorldEffect__data_dragonsurvival_projectile_data": {"data":["LightningHandler__data_dragonsurvival_projectile_data"]},
    "ProjectilePotionEffect__data_dragonsurvival_projectile_data": {"potion":["PotionData__data_dragonsurvival_projectile_data"]},
    "ProjectileTargeting__data_dragonsurvival_projectile_data": {"general_data":["ProjectileTargeting_GeneralData__data_dragonsurvival_projectile_data"]},
    "ProjectileTargeting_GeneralData__data_dragonsurvival_projectile_data": {"effects":["ProjectileTargeting_GeneralData_Effect__data_dragonsurvival_projectile_data"]},
    "ProjectileTargeting_GeneralData_Effect__data_dragonsurvival_projectile_data": {"effect":["ProjectileBlockEffect__data_dragonsurvival_projectile_data","ProjectileEntityEffect__data_dragonsurvival_projectile_data","ProjectileWorldEffect__data_dragonsurvival_projectile_data"]},
    "ProjectileWorldParticleEffect__data_dragonsurvival_projectile_data": {"particle_count":["LevelBasedValueMap__data_dragonsurvival_projectile_data"]},
    "PushEffect_Entity__data_dragonsurvival_dragon_ability": {"target_direction":["TargetDirection__data_dragonsurvival_dragon_ability"],"push_force":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
    "ReservedManaCost__data_dragonsurvival_dragon_ability": {"amount":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
    "SelfTarget__data_dragonsurvival_dragon_ability": {"applied_effects":["BlockTargeting__data_dragonsurvival_dragon_ability","EntityTargeting__data_dragonsurvival_dragon_ability"]},
    "SimpleActivation__data_dragonsurvival_dragon_ability": {"initial_mana_cost":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"],"cast_time":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"],"cooldown":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"],"notification":["Notification__data_dragonsurvival_dragon_ability"],"sound":["Sound__data_dragonsurvival_dragon_ability"],"animations":["Animations__data_dragonsurvival_dragon_ability"]},
    "SkinDefaultParts__assets_dragonsurvival_skin_default_parts": {"parts":["Parts__assets_dragonsurvival_skin_default_parts"]},
    "SmeltItemEffect_Entity__data_dragonsurvival_dragon_ability": {"progress":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
    "StageResource__data_data_maps_dragon_species": {"growth_icon":["GrowthIcon__data_data_maps_dragon_species"],"default_skin":["DefaultSkin__data_data_maps_dragon_species"]},
    "SummonEntityEffect_Block__data_dragonsurvival_dragon_ability": {"base":["DurationInstanceBase__data_dragonsurvival_dragon_ability"],"entities":["WeightedListEntry__data_dragonsurvival_dragon_ability"],"max_summons":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"],"attribute_scales":["AttributeScale__data_dragonsurvival_dragon_ability"],"nbt":["SummonEntityEffect_NBT__data_dragonsurvival_dragon_ability"]},
    "SummonEntityEffect_Entity__data_dragonsurvival_dragon_ability": {"base":["DurationInstanceBase__data_dragonsurvival_dragon_ability"],"entities":["WeightedListEntry__data_dragonsurvival_dragon_ability"],"max_summons":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"],"attribute_scales":["AttributeScale__data_dragonsurvival_dragon_ability"],"nbt":["SummonEntityEffect_NBT__data_dragonsurvival_dragon_ability"]},
    "SupplyTrigger__data_dragonsurvival_dragon_penalty": {"recovery_items":["RecoveryItems__data_dragonsurvival_dragon_penalty"]},
    "SwimEffect_Entity__data_dragonsurvival_dragon_ability": {"max_oxygen":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
    "TeleportEffect_Entity__data_dragonsurvival_dragon_ability": {"target_direction":["TargetDirection__data_dragonsurvival_dragon_ability"],"range":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
    "TickingManaCost__data_dragonsurvival_dragon_ability": {"amount":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
    "UseItemOnBlockEffect_Block__data_dragonsurvival_dragon_ability": {"probability":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
    "UseItemOnLivingEntityEffect_Entity__data_dragonsurvival_dragon_ability": {"probability":["LevelBasedValueMap__data_dragonsurvival_dragon_ability"]},
};

export const MCDOC_ENUM_VALUES: Record<string, string[]> = {
    "ActionType": ["set","add"],
    "ActivationTriggers": ["dragonsurvival:constant","dragonsurvival:on_self_hit","dragonsurvival:on_target_hit","dragonsurvival:on_target_killed","dragonsurvival:on_death","dragonsurvival:on_block_break","dragonsurvival:on_key_pressed","dragonsurvival:on_key_released"],
    "ActivationType": ["dragonsurvival:passive","dragonsurvival:simple","dragonsurvival:channeled"],
    "AdjustmentType": ["percent","flat"],
    "AnimationLayer": ["BASE","BREATH","BITE"],
    "BlockEffectType": ["dragonsurvival:bonemeal","dragonsurvival:conversion","dragonsurvival:summon_entity","dragonsurvival:fire","dragonsurvival:area_cloud","dragonsurvival:block_break","dragonsurvival:particle","dragonsurvival:run_function","dragonsurvival:use_item","dragonsurvival:explosion","dragonsurvival:block_harvest"],
    "Categories": ["BENEFICIAL","HARMFUL","NEUTRAL"],
    "ChanneledTriggerPointData": ["default","charging","channel_completion"],
    "ClawSlot": ["sword","pickaxe","shovel","axe"],
    "CooldownRecoveryActionType": ["set","reduce"],
    "DirectionType": ["looking_at","towards_entity","up","down","east","west","south","north"],
    "DisplayType": ["outline","particles","simple_shader","none"],
    "EntityEffectType": ["dragonsurvival:damage","dragonsurvival:modifier","dragonsurvival:potion","dragonsurvival:projectile","dragonsurvival:summon_entity","dragonsurvival:damage_modification","dragonsurvival:breath_particles","dragonsurvival:ignite","dragonsurvival:harvest_bonus","dragonsurvival:on_attack","dragonsurvival:flight","dragonsurvival:spin","dragonsurvival:item_conversion","dragonsurvival:swim","dragonsurvival:effect_modification","dragonsurvival:particle","dragonsurvival:glow","dragonsurvival:oxygen_bonus","dragonsurvival:block_vision","dragonsurvival:run_function","dragonsurvival:smelting","dragonsurvival:heal","dragonsurvival:teleport","dragonsurvival:push","dragonsurvival:hunger","dragonsurvival:effect_removal","dragonsurvival:use_item","dragonsurvival:dragon_growth","dragonsurvival:mana_recovery","dragonsurvival:experience","dragonsurvival:cooldown_recovery"],
    "ExperienceType": ["levels","points"],
    "Keys": ["key.keyboard.unknown","key.mouse.left","key.mouse.right","key.mouse.middle","key.mouse.4","key.mouse.5","key.mouse.6","key.mouse.7","key.mouse.8","key.mouse.#","key.keyboard.0","key.keyboard.1","key.keyboard.2","key.keyboard.3","key.keyboard.4","key.keyboard.5","key.keyboard.6","key.keyboard.7","key.keyboard.8","key.keyboard.9","key.keyboard.a","key.keyboard.b","key.keyboard.c","key.keyboard.d","key.keyboard.e","key.keyboard.f","key.keyboard.g","key.keyboard.h","key.keyboard.i","key.keyboard.j","key.keyboard.k","key.keyboard.l","key.keyboard.m","key.keyboard.n","key.keyboard.o","key.keyboard.p","key.keyboard.q","key.keyboard.r","key.keyboard.s","key.keyboard.t","key.keyboard.u","key.keyboard.v","key.keyboard.w","key.keyboard.x","key.keyboard.y","key.keyboard.z","key.keyboard.f1","key.keyboard.f2","key.keyboard.f3","key.keyboard.f4","key.keyboard.f5","key.keyboard.f6","key.keyboard.f7","key.keyboard.f8","key.keyboard.f9","key.keyboard.f10","key.keyboard.f11","key.keyboard.f12","key.keyboard.f13","key.keyboard.f14","key.keyboard.f15","key.keyboard.f16","key.keyboard.f17","key.keyboard.f18","key.keyboard.f19","key.keyboard.f20","key.keyboard.f21","key.keyboard.f22","key.keyboard.f23","key.keyboard.f24","key.keyboard.f25","key.keyboard.num.lock","key.keyboard.keypad.0","key.keyboard.keypad.1","key.keyboard.keypad.2","key.keyboard.keypad.3","key.keyboard.keypad.4","key.keyboard.keypad.5","key.keyboard.keypad.6","key.keyboard.keypad.7","key.keyboard.keypad.8","key.keyboard.keypad.9","key.keyboard.keypad.add","key.keyboard.keypad.decimal","key.keyboard.keypad.enter","key.keyboard.keypad.equal","key.keyboard.keypad.multiply","key.keyboard.keypad.divide","key.keyboard.keypad.subtract","key.keyboard.down","key.keyboard.left","key.keyboard.right","key.keyboard.up","key.keyboard.apostrophe","key.keyboard.backslash","key.keyboard.comma","key.keyboard.equal","key.keyboard.grave.accent","key.keyboard.left.bracket","key.keyboard.minus","key.keyboard.period","key.keyboard.right.bracket","key.keyboard.semicolon","key.keyboard.slash","key.keyboard.space","key.keyboard.tab","key.keyboard.left.alt","key.keyboard.left.control","key.keyboard.left.shift","key.keyboard.left.win","key.keyboard.right.alt","key.keyboard.right.control","key.keyboard.right.shift","key.keyboard.right.win","key.keyboard.enter","key.keyboard.escape","key.keyboard.backspace","key.keyboard.delete","key.keyboard.end","key.keyboard.home","key.keyboard.insert","key.keyboard.page.down","key.keyboard.page.up","key.keyboard.caps.lock","key.keyboard.pause","key.keyboard.scroll.lock","key.keyboard.menu","key.keyboard.print.screen","key.keyboard.world.1","key.keyboard.world.2","scancode.###"],
    "ModificationType": ["additive","multiplicative"],
    "PassiveTriggerPointData": ["default"],
    "PenaltyTriggerType": ["dragonsurvival:supply","dragonsurvival:instant","dragonsurvival:item_used","dragonsurvival:hit_by_projectile","dragonsurvival:hit_by_water_potion"],
    "PenaltyType": ["dragonsurvival:take_damage","dragonsurvival:mob_effect","dragonsurvival:item_blacklist","dragonsurvival:damage_modification","dragonsurvival:fear","dragonsurvival:informational","dragonsurvival:modifier","dragonsurvival:effect_modification","dragonsurvival:run_function"],
    "ProjectileBlockEffectType": ["dragonsurvival:particle","dragonsurvival:run_function","dragonsurvival:area_cloud"],
    "ProjectileEntityEffectType": ["dragonsurvival:damage","dragonsurvival:potion","dragonsurvival:lightning","dragonsurvival:particle","dragonsurvival:run_function","dragonsurvival:push"],
    "ProjectileWorldEffectType": ["dragonsurvival:explosion","dragonsurvival:lightning","dragonsurvival:particle","dragonsurvival:run_function"],
    "SimpleTriggerPointData": ["default","charging"],
    "TargetingMode": ["all","allies","allies_and_self","non_allies","non_enemies","neutral","enemies","items","all_except_self"],
    "TargetingType": ["dragonsurvival:area","dragonsurvival:dragon_breath","dragonsurvival:looking_at","dragonsurvival:self","dragonsurvival:disc","dragonsurvival:point"],
    "Tier": ["WOOD","STONE","IRON","DIAMOND","GOLD","NETHERITE"],
    "Type": ["living_entity","enemy","tamed","animal","item","experience_orb"],
    "UpgradeType": ["dragonsurvival:experience_points","dragonsurvival:experience_levels","dragonsurvival:dragon_growth","dragonsurvival:item_based","dragonsurvival:condition_based"],
    "Visibility": ["always_visible","always_hidden","visible_if_locked"],
};

export const MCDOC_FIELD_INFO: Record<string, string> = {
    "abilities": "可选的能力/技能集合",
    "ability": "需要查询的技能/能力",
    "ability_bar": "施法条\n此处的资源的注册方式与原版的`\"命名空间:资源路径\"`不同\n- 若用图片`assets/dragonsurvival/textures/gui/custom/casting_bars/sea/cast_bar.png`\n- 请这么写`\"dragonsurvival:textures/gui/custom/casting_bars/sea/cast_bar.png\"`",
    "ability_levels": "检查技能/能力等级",
    "action_type": "值的指定方式\n- Flat: 按amount取值\n- Percent: 根据当前百阶段进行缩放\n- 公式: amount * (max_growth - min_growth) (max_growth与min_growth均取自当前阶段)",
    "actions": "定义能力实际效果",
    "activation": "决定能力如何激活",
    "activation_type": "能力激活类型\n- `dragonsurvival:passive` 被动激活(持续不断的触发)\n- `dragonsurvival:simple` 简单激活(施法成功后只触发一次)\n- `dragonsurvival:channeled` 引导激活(施法成功后按住持续触发)",
    "adjustment_type": "决定数值的计算方式\n- percent(百分比)\n- flat(数值)",
    "alpha": "默认: 0.3",
    "altar_banner": "在龙祭坛和物种界面中使用的横幅\n此处的资源的注册方式与原版的`\"命名空间:资源路径\"`不同\n- 若用图片`assets/dragonsurvival/textures/gui/custom/altar/sea/altar_icon.png`\n- 请这么写`\"dragonsurvival:textures/gui/custom/altar/sea/altar_icon.png\"`",
    "amount": "控制属性修改的数值和计算方式",
    "amplifier": "默认值：0",
    "amplifier_modification": "效果等级乘数\n(默认值：0)",
    "animation": "此身体使用的动画文件 (位于`assets/<命名空间>/animations/`下的`.json`文件)",
    "animation_key": "施法开始时的循环动画\n这里需要填入动画id",
    "animations": "在能力的各个阶段播放的动画\n(简单激活不支持循环动画)",
    "applicable_bodies": "可应用该组件的身体类型列表",
    "applicable_species": "可应用该组件的物种列表",
    "applied_effects": "定义效果的执行类型以及效果",
    "attempts": "骨粉应用的频率",
    "attribute": "生物属性(https://zh.minecraft.wiki/w/属性)",
    "attribute_scales": "调整召唤实体的属性(https://zh.minecraft.wiki/w/属性)",
    "attributes": "生物属性(https://zh.minecraft.wiki/w/属性)",
    "average_hue": "平均色相\n- 这将在游戏中调整皮肤组件色相时作为默认值\n- 可通过龙之生存mod中自带的`assets\\dragonsurvival\\colors.py`脚本批处理",
    "backpack_offset": "决定背包的放置位置(基础位置是骨骼'BackpackBone')",
    "base": "基础\n- 使用`assets\\<命名空间>\\skin\\parts\\base\\`目录下JSON文件中key的值",
    "base_speed": "基础挖掘速度\n- 该项不会影响挖掘等级!!!\n- 由其中指定的工具类型决定`基础挖掘速度`",
    "behaviour_data": "基本数据",
    "bettercombat_weapon_offset": "与 Better Combat 模组兼容的武器位置偏移",
    "blend": "动画是否允许与其他动画混合\n(默认:fasle)",
    "block_destruction_growth": "龙行走时能破坏方块的最小成长值",
    "block_effect": "方块效果\n- `dragonsurvival:particle` 生成粒子\n- `dragonsurvival:run_function` 运行函数\n- `dragonsurvival:area_cloud` 生成药水云",
    "block_hit_effects": "击中方块时执行的效果\n- 执行者: `server`\n- 执行位置: 击中方块的方块中心",
    "block_predicate": "决定龙行走时能够破坏的方块",
    "blocks": "决定这项加成适用的方块\n同时决定效果悬停提示信息，例如：\n- 若此项填入 `#minecraft:mineable/axe`     则显示 \"工具类型: 斧\"\n- 若此项填入 `#minecraft:mineable/hoe`     则显示 \"工具类型: 锄\"\n- 若此项填入 `#minecraft:mineable/shovel`  则显示 \"工具类型: 铲\"\n- 若此项填入 `#minecraft:mineable/pickaxe` 则显示 \"工具类型: 镐\"\n- 若不是上述项则显示为空",
    "blocks_to": "要转换成的方块的加权列表",
    "bodies": "如果不使用全局默认的身体类型列表，可以定义此项\n标签将使用 `data/命名空间/tags/dragonsurvival/dragon_body/` 中指定json文件包含的数据",
    "body": "指定该 默认组件表 将映射至的身体类型id\n不填写默认所有身体类型都适用",
    "bones_to_hide_for_toggle": "当翅膀隐藏时将隐藏的骨骼列表\n(默认：'WingLeft', 'WingRight', 'SmallWingLeft' 和 'SmallWingRight')",
    "bottom": "底部\n- 使用`assets\\<命名空间>\\skin\\parts\\bottom\\`目录下JSON文件中key的值",
    "bounces": "已弹跳的次数(撞到方块或实体后反弹，若达到最大限制则尝试`滞留`)",
    "break_blocks": "能破坏方块",
    "break_speed_multiplier": "附加挖掘速度\n- 计算方式: 1 + break_speed_multiplier",
    "can_always_eat": "当玩家的饥饿槽/饱和度满的时候，物品是否可以吃?\n(默认: false)",
    "can_be_manually_disabled": "决定是否可以通过物种界面按CTRL+点击来禁用该能力\n(默认: true)",
    "can_damage_self": "能伤害自己",
    "can_hide_wings": "决定翅膀是否可以隐藏\n(默认：true)",
    "can_hurt_self": "能伤害自己",
    "can_move": "是否允许玩家在动画中移动\n(默认:fasle)",
    "can_move_while_casting": "施法者是否可以在施法时移动\n(默认：true)",
    "cast_time": "施放能力所需的蓄力时间",
    "categories": "按效果类别过滤要移除的状态效果\n- BENEFICIAL(有益)\n- HARMFUL(有害)\n- NEUTRAL(中性)",
    "chance": "效果触发的概率\n(默认：1)",
    "charging": "蓄力开始时的音效",
    "check_for": "检查实体类型\n- `living_entity` 活着的实体\n- `enemy` 敌对生物(Enemy 接口实现类或Mob子类实体)\n- `tamed` 已被驯服的生物(TamableAnimal 且已被驯服)\n- `animal` 动物(Animal 的子类)\n- `item` 物品实体\n- `experience_or` 经验球",
    "claw_texture_slot": "确定使用哪个爪物品(等级)来渲染爪纹理\n- sword    剑\n- pickaxe  镐\n- shovel   锹\n- axe      斧",
    "claws": "爪\n- 使用`assets\\<命名空间>\\skin\\parts\\claws\\`目录下JSON文件中key的值",
    "color": "发光颜色",
    "color_shift_rate": "颜色变化速率\n默认: 1",
    "colors": "要使用的颜色 - 如果指定了多个，将在它们之间循环",
    "common_hit_effects": "击中任何东西都会执行的效果\n- `world_effect`\n- `dragonsurvival:point`\n- `执行者`: 弹射物自身\n- `执行位置`: 弹射物击中判定成功时的位置(会出现在弹射物的轨迹上)\n- `dragonsurvival:area`\n- `执行者`: 弹射物自身\n- `执行位置`: 范围内所有复合的实体(不包括弹射物本身)\n- `entity_effect`\n- `dragonsurvival:point`\n- 无任何效果\n- `dragonsurvival:area`\n- `执行者`: 范围内所有符合的实体(不包括弹射物本身)\n- `执行位置`: 弹射物击中判定成功时的位置(会出现在弹射物的轨迹上)\n- `block_effect`\n- `dragonsurvival:point`\n- `执行者`: `server`\n- `执行位置`: 弹射物击中判定成功时的 `方块位置中心`(会出现在弹射物的轨迹上)\n- `dragonsurvival:area`\n- `执行者`: `server`\n- `执行位置`: 弹射物为中心范围内所有符合的方块中心",
    "condition": "可用于进行伤害上下文相关检查\n可用参数：\n- this_entity(能力持有者)\n- origin\n- damage_source\n- attacking_entity(可选)\n- direct_attacking_entity(可选)\n谓词(https://zh.minecraft.wiki/w/谓词)",
    "conditions": "解锁下一等级的条件\n谓词(https://zh.minecraft.wiki/w/谓词)",
    "continuous_mana_cost": "能力激活期间的法力消耗",
    "conversion_data": "转化速率",
    "conversion_rate": "转换量",
    "cooldown": "施法成功后的冷却时间",
    "crouch_height_ratio": "决定下蹲时高度变化多少",
    "crushing_damage_scalar": "决定碾压伤害如何缩放(成长值 * 比例因子)",
    "crushing_growth": "龙行走时能对实体造成碾压伤害的最小成长值",
    "custom_icon": "如果未提供自定义图标，将使用能力/缺陷图标代替\n此处的资源的注册方式与原版的`\"命名空间:资源路径\"`不同\n- 若用图片`assets/dragonsurvival/textures/ability_effect/fire_immunity.png`\n- 请这么写`\"dragonsurvival:textures/ability_effect/fire_immunity.png\"`",
    "custom_stage_progression": "如果不使用全局默认的阶段列表，可以定义此项\n标签将使用 `data/命名空间/tags/dragonsurvival/dragon_stage/` 中指定json文件包含的数据",
    "damage_type": "伤害类型(https://zh.minecraft.wiki/w/伤害类型定义格式)",
    "damage_types": "将调整的伤害类型(https://zh.minecraft.wiki/w/伤害类型定义格式)",
    "data": "实体id",
    "default_icon": "默认GUI图标，在当前物种没有特定图标时使用",
    "default_skin": "默认皮肤贴图\n- 会出现在物种选择界面、选择测试资源包的时候作为皮肤",
    "delay": "药水云生效前的延迟时间",
    "destruction_data": "破坏行为数据",
    "direction": "朝向\n- `looking_at` 视线方向\n- `towards_entity` 朝向实体方向\n- `up` 上\n- `down` 下\n- `east` 东\n- `west` 西\n- `south` 南\n- `north` 北",
    "display_like_hunger_bar": "是否在UI界面中以类似饥饿条的形式显示此缺陷状态\n(默认:false)",
    "display_type": "决定如何标记方块\n- `outline` 勾勒方块轮廓，可以透过其他方块看到\n- `particles` 在方块周围创建粒子\n- `simple_shader` 在方块表面简单的覆盖一层着色",
    "distance": "决定在实体逃跑前您可以接近它的距离\n最大允许距离为64",
    "downgrade_items": "可用于降级的物品",
    "dragon_body": "检查玩家是否使用了给定的龙身体类型\n例如 `dragonsurvival:center`",
    "dragon_offset": "龙类骑乘位置偏移\n(默认：[0, 0, 0])",
    "dragon_species": "检查玩家是否属于特定的物种",
    "dragon_stage": "检查玩家的成长进度(龙阶段)\n例如 `dragonsurvival:adult`",
    "drop_loot": "破坏方块时掉落战利品(如果有的话)\n(默认：false)",
    "duration": "默认值：无限持续时间",
    "duration_modification": "持续时间修改",
    "duration_multiplier": "效果持续时间乘数\n(默认值：1)",
    "early_removal_condition": "导致实例在匹配时被移除的条件\n谓词(https://zh.minecraft.wiki/w/谓词)",
    "eat_seconds": "吃这个物品所需的时间(以秒为单位)\n默认为`1.6`",
    "effect": "定义缺陷的效果",
    "effect_particles": "是否显示效果粒子\n(默认：false)",
    "effect_type": "实体效果类型\n- `dragonsurvival:damage` 造成伤害\n- `dragonsurvival:modifier` 添加生物属性修改(https://zh.minecraft.wiki/w/属性)\n- `dragonsurvival:potion` 施加药水效果\n- `dragonsurvival:projectile` 发射自定义弹射物\n- `dragonsurvival:summon_entity` 召唤实体\n- `dragonsurvival:damage_modification` 修改受到的伤害\n- `dragonsurvival:breath_particles` 生成龙息粒子\n- `dragonsurvival:ignite` 点燃实体\n- `dragonsurvival:harvest_bonus` 调整挖掘速度\n- `dragonsurvival:on_attack` 在攻击时触发\n- `dragonsurvival:flight` 启用飞行能力\n- `dragonsurvival:spin` 触发旋转攻击\n- `dragonsurvival:item_conversion` 转换物品实体的物品类型\n- `dragonsurvival:swim` 允许龙在特定流体中游泳，并配置最大氧气值\n- `dragonsurvival:effect_modification` 修改状态效果的持续时间和等级\n- `dragonsurvival:particle` 生成粒子\n- `dragonsurvival:glow` 使实体发光\n- `dragonsurvival:oxygen_bonus` 在特定流体中增加氧气值，允许龙在水下或熔岩中停留更长时间，支持无限氧气模式\n- `dragonsurvival:block_vision` 让指定方块生成粒子进行标记\n- `dragonsurvival:run_function` 运行函数\n- `dragonsurvival:smelting` 熔炼物品\n- `dragonsurvival:heal` 治疗实体\n- `dragonsurvival:teleport` 传送实体\n- `dragonsurvival:push` 推动实体\n- `dragonsurvival:hunger` 调整饥饿值\n- `dragonsurvival:effect_removal` 移除效果\n- `dragonsurvival:use_item` 对目标实体使用特定物品\n- `dragonsurvival:dragon_growth` 调整龙成长值\n- `dragonsurvival:mana_recovery` 恢复魔法值\n- `dragonsurvival:experience` 调整玩家经验值\n- `dragonsurvival:cooldown_recovery` 能力/技能冷却时间恢复",
    "effects": "吃掉后给予的药水效果",
    "emotes": "此身体可以使用的表情\n- 可引用自 `data/dragonsurvival/dragon_emote_set/`中的`json`文件在外部编写，例如 `\"dragonsurvival:default_emotes\"`\n- 或者直接在此填写(但是不建议，可能影响可读性)",
    "empty": "施法时\n此处的资源的注册方式与原版的`\"命名空间:资源路径\"`不同\n- 若用图片`assets/dragonsurvival/textures/gui/custom/mana_icons/sea/empty.png`\n- 请这么写`\"dragonsurvival:textures/gui/custom/mana_icons/sea/empty.png\"`",
    "end": "施法结束时的音效",
    "entities": "加权列表允许自定义权重\n否则每个实体将具有相同的权重(因此相同几率)",
    "entity_condition": "决定哪些实体受影响 - 可用的战利品上下文：\n- this_entity(目标)\n- origin(目标位置)\n谓词(https://zh.minecraft.wiki/w/谓词)",
    "entity_effect": "实体效果\n- `dragonsurvival:damage` 造成伤害\n- `dragonsurvival:potion` 施加药水效果\n- `dragonsurvival:lightning` 生成闪电\n- `dragonsurvival:particle` 生成粒子\n- `dragonsurvival:run_function` 运行函数\n- `dragonsurvival:push` 推动实体",
    "entity_hit_condition": "击中实体的谓词判断(用于`entity_hit_effects`)\n具有施法者和目标之间的上下文，允许进行适当的盟友或敌人检查\n谓词(https://zh.minecraft.wiki/w/谓词)",
    "entity_hit_effects": "击中实体时执行的效果\n- 执行者：被击中的实体\n- 执行位置：被击中的实体",
    "entity_predicate": "决定行走时碾压伤害作用的实体",
    "entity_types": "要检查的实体类型",
    "exclude_this": "是否排除自身能力\n(默认: true)",
    "experience_cost": "与激活的信标交互时的经验消耗\n(默认值：0)",
    "experience_type": "经验处理类型\n- `levels` 按等级计算\n- `points` 按经验点数计算",
    "explosion_power": "爆炸强度",
    "expression": "使用 EvalEx 表达式引擎计算最终伤害值的数学公式\n(https://ezylang.github.io/EvalEx/references/references.html)\n- 默认值: `\"amount * scale\"`",
    "extra": "额外\n- 使用`assets\\<命名空间>\\skin\\parts\\extra\\`目录下JSON文件中key的值",
    "extra1": "额外1\n- 使用`assets\\<命名空间>\\skin\\parts\\extra\\`目录下JSON文件中key的值",
    "extra2": "额外2\n- 使用`assets\\<命名空间>\\skin\\parts\\extra\\`目录下JSON文件中key的值",
    "extra3": "额外3\n- 使用`assets\\<命名空间>\\skin\\parts\\extra\\`目录下JSON文件中key的值",
    "extra4": "额外4\n- 使用`assets\\<命名空间>\\skin\\parts\\extra\\`目录下JSON文件中key的值",
    "extra5": "额外5\n- 使用`assets\\<命名空间>\\skin\\parts\\extra\\`目录下JSON文件中key的值",
    "extra6": "额外6\n- 使用`assets\\<命名空间>\\skin\\parts\\extra\\`目录下JSON文件中key的值",
    "extra7": "额外7\n- 使用`assets\\<命名空间>\\skin\\parts\\extra\\`目录下JSON文件中key的值",
    "eye_height": "眼睛高度(视角高度)",
    "eye_in_fluid": "实体眼睛是否处于特定流体中(如水中、熔岩中)",
    "eyes": "眼\n- 使用`assets\\<命名空间>\\skin\\parts\\eyes\\`目录下JSON文件中key的值",
    "fire": "能产生火焰\n(默认: true)",
    "flight_was_granted": "检查飞行能力是否被授予\n若相关配置启用，原初锚也可将其设为'true'",
    "fluid_type": "实体可以游泳的流体类型",
    "fluid_types": "旋转效果可以使用的流体\n(如果未指定，则只能在空中使用)",
    "font": "使用的自定义字体(https://zh.minecraft.wiki/w/自定义字体)\n(默认：dragonsurvival:food_tooltip_icon_font)",
    "food_sprites": "食物条图标 - 如果未指定，将渲染原版食物条\n此处的资源的注册方式与原版的`\"命名空间:资源路径\"`不同\n- 若用图片`assets/dragonsurvival/textures/gui/custom/food_icons/sea_food_icons.png`\n- 请这么写`\"dragonsurvival:textures/gui/custom/food_icons/sea_food_icons.png\"`",
    "food_tooltip": "确定饮食条目的工具提示渲染方式",
    "from_level": "指定从哪个等级开始使用对应的图标\n(该条目定义了一个阶梯函数，每个`from_level`决定了对应区间的起点)",
    "from_predicate": "决定哪些方块将被转换",
    "full": "满法力点\n此处的资源的注册方式与原版的`\"命名空间:资源路径\"`不同\n- 若用图片`assets/dragonsurvival/textures/gui/custom/mana_icons/sea/full.png`\n- 请这么写`\"dragonsurvival:textures/gui/custom/mana_icons/sea/full.png\"`",
    "function": "Minecraft函数",
    "general_data": "决定自定义弹射物的效果\n- 执行顺序:\n1. ticking_effects\n2. entity_hit_effects / block_hit_effects\n4. common_hit_effects",
    "glow_skin": "皮肤发光纹理资源路径\n此处的资源的注册方式与原版的`\"命名空间:资源路径\"`不同\n- 若用图片`assets/dragonsurvival/textures/dragon/sea_dragon/adult_glow.png`\n- 请这么写`\"dragonsurvival:textures/dragon/sea_dragon/adult_glow.png\"`",
    "grants_experience": "是否授予熔炼经验(在配方中定义)\n(默认：true)",
    "growth": "检查成长值的原始数值",
    "growth_crystal": "成长水晶 - 根据阶段内的进度填充",
    "growth_icon": "成长阶段图标\n- 会出现在龙背包的右上角、物种旗帜左上角等位置",
    "growth_in_ticks": "每次使用增加的成长值\n值为0会使物品改为切换'is_growth_stopped'字段\n(该字段在默认的'is_natural_growth_stopped'条件中使用)",
    "growth_items": "可用于增加(或减少)龙成长值的物品",
    "growth_left_arrow": "左箭头，用于在存在超过4个阶段时导航\n(如果未指定，将使用通用图标)",
    "growth_percentage": "检查在当前阶段内的完成度(0-100%)",
    "growth_range": "阶段的最小和最大成长值",
    "growth_requirement": "解锁该等级所需的龙成长值",
    "growth_right_arrow": "右箭头，用于在存在超过4个阶段时导航\n(如果未指定，将使用通用图标)",
    "growth_type": "决定如何应用成长值\n- add(相加)\n- set(设置)",
    "harvest_bonus": "基础挖掘等级(决定方块被挖掘后是否掉落物品)\n- 该项不会影响挖掘速度!!!\n- 由结果决定挖掘等级，例如\n- 1 = 木制/金制\n- 2 = 石制\n- 3 = 铁制\n- 4 = 钻石制/下界合金制",
    "has_duration_effect": "是否拥有特定的，由 `dragonsurvival:modifier` 实现的持续效果",
    "has_uuid": "实体是否具有特定的UUID",
    "health_percentage": "实体健康值百分比范围",
    "height": "用于实体选择的 圆柱体范围高度",
    "height_starts_below": "如果启用，圆盘的起始高度将下移1格(默认：false)\n(适用于以施法者所站地面为目标的情况)",
    "horns": "角\n- 使用`assets\\<命名空间>\\skin\\parts\\horns\\`目录下JSON文件中key的值",
    "hover_icon": "鼠标悬停时显示的替换图标资源路径\n此处的资源的注册方式与原版的`\"命名空间:资源路径\"`不同\n- 若用图片`assets/dragonsurvival/textures/gui/custom/stage/sea/adult_stage_hover.png`\n- 请这么写`\"dragonsurvival:textures/gui/custom/stage/sea/adult_stage_hover.png\"`",
    "human_offset": "人类骑乘位置偏移\n(默认：[0, 0, 0])",
    "hunger_gain": "饥饿值增益(可用负值表示消耗)\n直接增加或减少玩家的饥饿值(食物条)",
    "icon": "普通图标资源路径\n此处的资源的注册方式与原版的`\"命名空间:资源路径\"`不同\n- 若用图片`assets/dragonsurvival/textures/gui/custom/stage/sea/adult_stage_main.png`\n- 请这么写`\"dragonsurvival:textures/gui/custom/stage/sea/adult_stage_main.png\"`",
    "id": "要创建的实例的唯一ID\n可在实体子谓词 `dragonsurvival:custom_predicates` 中用于检测",
    "ignite_probability": "点燃概率",
    "ignite_ticks": "点燃时间(ticks)",
    "ignores_items_and_experience": "忽略物品与经验球",
    "include_in_randomizer": "该组件是否包含在随机选择器中\n(默认: true)",
    "initial_mana_cost": "法力消耗(在施法时间完成时消耗)",
    "interval": "决定音效播放的频率(计算方式为 emote_ticks % interval == 0)",
    "is_allied": "如果启用，实体将被召唤者拥有并被视为盟友(默认：true)\n(这也意味着可以通过相关按键绑定改变攻击和移动行为)",
    "is_colorable": "可能有颜色的\n(默认: true)",
    "is_default": "决定此身体是否是默认身体全局列表的一部分(默认：false)",
    "is_flying": "用于检测龙是否正在飞行(仅检测龙生的飞行)",
    "is_glowing": "是否默认发光\n(默认: false)",
    "is_growth_stopped": "检查龙的成长是否被手动停止",
    "is_hidden": "如果启用，实例将不会显示为效果\n(默认：false)",
    "is_hue_randomizable": "色相是否允许被随机化\n(默认: true)",
    "is_impact_projectile": "决定该实体能不能破坏击中的 陶罐、紫颂花 等方块\n(默认: false)",
    "is_natural_growth_stopped": "决定何时停止龙自然成长的条件",
    "is_nearby_entity": "附近是否存在符合条件的实体",
    "is_raining": "正在下雨",
    "is_raining_or_snowing": "正在下雨或下雪\n- 性能优于单独检测雨天和雪天",
    "is_snowing": "正在下雪",
    "is_thundering": "处于雷暴天气",
    "item": "需要转化成的物品id",
    "item_conversions": "一个转换的列表",
    "item_from": "检查从什么物品进行转换",
    "item_predicate": "决定哪些物品将被转换",
    "item_predicates": "能够缓解此缺陷的物品列表(使用物品谓词)",
    "item_to": "检查转换成的物品",
    "items": "有效的资源位置（命名空间:路径）\n命名空间和路径中允许使用正则表达式",
    "items_per_level": "每个等级的有效物品(用于解锁该等级)",
    "items_to": "要转换成的物品的加权列表",
    "key": "组件标识符，应与JSON文件名一致",
    "keys": "https://zh.minecraft.wiki/w/键控代码",
    "layer": "动画层",
    "level": "需要检查的等级",
    "level_requirement": "解锁该等级所需的经验等级",
    "lifespan": "已存在的时间(若达到最大限制则尝试移除实体)\n(单位：ticks)",
    "lingering_ticks": "已滞留的时间(碰撞后停止移动的时间，若达到最大限制则尝试移除实体)\n(单位：ticks)",
    "localization": "使用文本组件定义皮肤组件本地化文本\n- 若不填写将使用`skin_part.<命名空间>.<物种id>.<该JSON定义的key值>`作为本地化键, 例如`skin_part.dragonsurvival.sea_dragon.base_1`",
    "locks_head": "该动画是否锁定头部\n(默认:fasle)",
    "locks_neck": "锁定脖子",
    "locks_tail": "锁定尾巴",
    "looking_at_block": "实体是否看向特定的方块",
    "looping": "施法中的循环音效",
    "looping_animation_key": "第一段动画结束后的循环动画\n这里需要填入动画id",
    "loops": "动画是否循环播放\n(默认:fasle)",
    "magic": "魔法\n- 使用`assets\\<命名空间>\\skin\\parts\\magic\\`目录下JSON文件中key的值",
    "main_particle": "主要粒子",
    "mana_handling": "指定一些法力交互\n特别是经验值(等级)如何与之交互(例如，当所有法力耗尽时，将经验值转换为法力)",
    "mana_per_level": "指定每经验等级获得多少法力(默认：0)\n如果值为0，则不授予额外法力\n(默认的'mana_handling'条目使用值0.25，表示每4个经验等级=1点法力)",
    "mana_sprites": "法力图标 - 如果未指定，将使用通用纹理\n(以物种的主色调着色)",
    "mana_xp_conversion": "指定经验值转换为法力的比率(默认：0)\n如果值为0，则不进行转换\n(默认的'mana_handling'条目使用值0.1，表示1点法力=10点经验值)",
    "marked_by_ender_dragon": "当末影龙死亡且玩家曾对其造成伤害时设置此标志\n在末地维度与充能状态的原初锚方块交互时清除\n(需满足末影龙存活且方块处于充能状态)",
    "max_amount": "限制单次最多移除多少个状态效果",
    "max_bounces": "最大弹跳的次数(撞到方块或实体后反弹，若达到最大限制则尝试滞留)",
    "max_duration": "技能持续释放的时间限制(单位：ticks)\n并且，在达到该限制后会尝试执行带有`\"trigger_point\":\"channel_completion\"`的`actions`项",
    "max_lifespan": "最大存在时间(若达到最大限制则尝试移除实体)\n(单位：ticks)",
    "max_lingering_ticks": "最大滞留时间(碰撞后停止移动的时间，若达到最大限制则尝试移除实体)\n(单位：ticks)",
    "max_mana_from_levels": "指定通过经验等级可以获得的最大法力值(默认：0)\n如果值为0，则不授予额外法力\n(默认的'mana_handling'条目使用值9，表示在经验等级36时达到上限)",
    "max_movement_distance": "最大移动距离(若达到最大限制则尝试移除实体)",
    "max_oxygen": "实体在指定流体中可以憋气的时间(以刻为单位)\n(值'-1'表示无限氧气)",
    "max_summons": "每个实例最多召唤的实体数量",
    "maximum_effect_level": "只移除低于或等于指定等级的效果",
    "maximum_level": "最大技能等级",
    "maximum_saturation": "最大饱和度\n设置通过此能力获得的饱和度上限",
    "maximum_usages": "决定此物品可以使用多少次(默认：无限)",
    "misc_resources": "指向物种相关各种资源(纹理等)的位置",
    "model": "指定龙魂将使用的烘焙模型(https://zh.minecraft.wiki/w/烘焙模型)",
    "modifications": "定义要修改的效果",
    "modifiers": "定义将要应用的生物属性修改(https://zh.minecraft.wiki/w/属性)",
    "mounting_offset": "决定骑乘者的放置位置",
    "movement_distance": "已移动的距离(若达到最大限制则尝试移除实体)",
    "multiplier": "值'0'表示目标将对此伤害免疫",
    "name": "注册的自定义弹射物名称",
    "nbt": "调整召唤实体的nbt",
    "nearby_treasure_amount": "睡在指定片数以上的财宝堆中才能触发",
    "not_enough_mana": "没有足够的法力来施法时的提示信息",
    "notification": "指定在以下情况下显示的消息：\n- 没有足够的法力来启动施法\n- 能力被阻止('usage_blocked'条件)\n(默认情况下，每个能力都会有一个包含\"法力不足\"消息的通知条目)",
    "number_of_projectiles": "单次发射的弹射物数量",
    "nutrition": "吃掉后给予的饥饿值(上限为20.0)",
    "nutrition_icon": "营养图标\n码位字符串(https://zh.minecraft.wiki/w/自定义字体#码位字符串)",
    "offset_per_scale_above_one": "缩放相关的额外偏移\n(默认：[0, 0, 0])",
    "on_destroy_effects": "当实体消失时将会执行的效果\n- `world_effect`\n- `dragonsurvival:point`\n- `执行者`: 弹射物自身\n- `执行位置`: 弹射物击中判定成功时的位置(会出现在弹射物的轨迹上)\n- `dragonsurvival:area`\n- `执行者`: 弹射物自身\n- `执行位置`: 范围内所有复合的实体(不包括弹射物本身)\n- `entity_effect`\n- `dragonsurvival:point`\n- 无任何效果\n- `dragonsurvival:area`\n- `执行者`: 范围内所有符合的实体(不包括弹射物本身)\n- `执行位置`: 弹射物击中判定成功时的位置(会出现在弹射物的轨迹上)\n- `block_effect`\n- `dragonsurvival:point`\n- `执行者`: `server`\n- `执行位置`: 弹射物击中判定成功时的 `方块位置中心`(会出现在弹射物的轨迹上)\n- `dragonsurvival:area`\n- `执行者`: `server`\n- `执行位置`: 弹射物为中心范围内所有符合的方块中心",
    "operation": "对数据的操作方式",
    "oxygen_bonus": "控制提供的氧气加成量",
    "particle": "粒子效果",
    "particle_count": "粒子数量",
    "particle_data": "粒子数据",
    "particle_rate": "粒子速率\n默认: 10",
    "particle_trail": "粒子效果",
    "particles": "粒子",
    "particles_on_trigger": "当惩罚效果触发时使用的粒子效果",
    "parts": "该物种此阶段将使用的默认皮肤组件",
    "penalties": "指定此物种拥有的缺陷\n标签将使用 `data/命名空间/tags/dragonsurvival/dragon_penalty/` 中指定json文件包含的数据",
    "penalty_trigger": "缺陷触发器类型\n- `dragonsurvival:supply` 定义缺陷条触发\n- `dragonsurvival:instant` 即时触发\n- `dragonsurvival:item_used` 物品使用触发\n- `dragonsurvival:hit_by_projectile` 被投射物击中触发\n- `dragonsurvival:hit_by_water_potion` 被药水击中触发",
    "penalty_type": "缺陷效果类型\n- `dragonsurvival:take_damage` 造成伤害\n- `dragonsurvival:mob_effect` 给予药水效果\n- `dragonsurvival:item_blacklist` 物品黑名单\n- `dragonsurvival:damage_modification` 修改收到的伤害参数\n- `dragonsurvival:fear` 让生物恐惧玩家\n- `dragonsurvival:informational` 信息(无实际效果，仅供测试)\n- `dragonsurvival:modifier` 添加生物属性修改(https://zh.minecraft.wiki/w/属性)\n- `dragonsurvival:effect_modification` 修改状态效果的持续时间和等级\n- `dragonsurvival:run_function` 运行函数",
    "percent_restored": "使用该物品后缺陷条的恢复比例(使用百分比)",
    "percentage": "目标实体最大生命值的百分比(1 = 100%)将被治疗",
    "piercing_level": "箭类实体能射穿实体的数量\n此值将会复制到同名nbt中",
    "pitch": "音效音调\n(默认：1)",
    "player_hunger": "玩家饥饿值范围",
    "position_offset": "位置偏移\n(默认：[0, 0, 0])",
    "potion": "定义将要使用的药水效果",
    "power": "爆炸强度",
    "precise_amount": "每级增量值",
    "precise_base": "基础值",
    "primary_color": "龙饮食工具提示文本和边框颜色\n通用法力图标颜色",
    "probability": "控制效果触发的概率\n0 (0%) 到 1 (100%)\n(默认：1)",
    "progress": "每次效果应用时增加的熔炼进度(1 = 100%)\n如果物品在3秒内不再被熔炼，进度将重置\n(如果未指定进度，物品将立即熔炼完成)",
    "projectile_data": "该技能所自定义的弹射物数据\n- 可引用自 `data/dragonsurvival/projectile_data` 在外部编写，例如 `\"dragonsurvival:ball_lightning\"`\n- 或者直接在此填写(但是不建议，由于数据过多影响可读性，该mcdoc也未在此实现)",
    "projectile_level": "弹射物等级\n(复制自召唤该实体的技能等级)",
    "projectile_spread": "弹道扩散",
    "properties": "定义具体的食物效果",
    "push_force": "控制施加推力的大小(可为负数)",
    "radius": "进行检测的范围半径",
    "range": "最大距离",
    "range_multiplier": "默认范围基于施法者的体型比例",
    "recovery": "当恢复法力时，在'recovery'和'empty'之间切换\n此处的资源的注册方式与原版的`\"命名空间:资源路径\"`不同\n- 若用图片`assets/dragonsurvival/textures/gui/custom/mana_icons/sea/recovery.png`\n- 请这么写`\"dragonsurvival:textures/gui/custom/mana_icons/sea/recovery.png\"`",
    "recovery_items": "可用于缓解或消除缺陷的特殊物品列表",
    "reduction_rate": "当触发条件满足时，缺陷条减少的比例(使用百分比)",
    "regeneration_rate": "当触发条件不再满足时，缺陷条恢复的比例(使用百分比)",
    "require_previous": "如果启用，只有在前置条件也匹配时才能解锁下一级升级\n如果禁用，则最高匹配条件的等级决定当前等级",
    "reserved": "保留的法力点\n此处的资源的注册方式与原版的`\"命名空间:资源路径\"`不同\n- 若用图片`assets/dragonsurvival/textures/gui/custom/mana_icons/sea/reserved.png`\n- 请这么写`\"dragonsurvival:textures/gui/custom/mana_icons/sea/reserved.png\"`",
    "resources": "贴图数据\n空/无效 数据可能导致游戏崩溃",
    "retain_effects": "是否继承物品原本拥有的状态效果\n(默认:：false)",
    "rotation_offset": "旋转偏移\n(默认：[0, 0, 0])",
    "saturation": "吃掉后恢复的饱和度",
    "saturation_gain": "饱和度增益\n直接增加玩家的饱和度(隐藏的饱食度)",
    "saturation_icon": "饱和度图标\n码位字符串(https://zh.minecraft.wiki/w/自定义字体#码位字符串)",
    "scale": "伤害缩放属性(https://zh.minecraft.wiki/w/属性)\n将作为 `scale` 变量在 `expression` 表达式中使用\n- 默认为 `dragonsurvival:dragon_ability_damage`",
    "scale_multiplier": "整体缩放倍率\n(默认：1)",
    "scaling_proportions": "高度和宽度尺寸如何计算(使用实体的当前比例)",
    "secondary_color": "龙饮食工具提示边框颜色",
    "secondary_particle": "次级粒子",
    "shadow_multiplier": "阴影大小倍率\n(默认：1)",
    "should_remove_automatically": "如果启用，创建的实例将在以下情况下被移除(默认：false)：\n- 施法者的能力不再激活(适用于所有实例)\n- 能力的目标条件不再匹配(仅适用于施法者的实例)",
    "show_icon": "是否在HUD显示效果图标\n(默认：true)",
    "skin": "皮肤纹理资源路径\n此处的资源的注册方式与原版的`\"命名空间:资源路径\"`不同\n- 若用图片`assets/dragonsurvival/textures/dragon/sea_dragon/adult.png`\n- 请这么写`\"dragonsurvival:textures/dragon/sea_dragon/adult.png\"`",
    "sound": "在能力的各个阶段播放的音效\n(简单激活不支持循环音效)",
    "sound_event": "音效id",
    "spawn_position": "放置平台的坐标\n- 该项仅适用于`end_platforms.json - 末地平台`",
    "spawns_fire": "产生火焰",
    "species": "指定使用该龙魂图标的物种id",
    "speed": "弹射物初速度",
    "speed_per_growth": "根据成长值计算粒子的速度\nspeed_per_growth * 成长值",
    "spikes": "背棘\n- 使用`assets\\<命名空间>\\skin\\parts\\spikes\\`目录下JSON文件中key的值",
    "spin_was_granted": "检查旋转能力是否被授予\n若相关配置启用，原初锚也可将其设为'true'",
    "spread": "控制粒子发射的扩散角度或范围",
    "sprint_speed": "实体逃跑时的冲刺移动速度修正值(默认：1.3)\n当您太接近实体时使用此值",
    "stage": "指定使用该龙魂图标的物种阶段id",
    "stage_specific": "检查龙玩家的成长阶段和成长进度",
    "start": "施法开始时的音效",
    "start_and_charging": "最开始蓄力的动画\n(例如 吐息喷吐前的蓄力动画)",
    "starting_animation_key": "施法开始时的第一段动画\n这里需要填入动画id",
    "starting_growth": "初始成长值将为此值或第一阶段的最小成长值",
    "state": "指定方块数据",
    "structure": "放置平台的结构id\n- 该项仅适用于`end_platforms.json - 末地平台`",
    "sun_light_level": "检测天空光照等级",
    "supply_type": "缺陷条将使用的图标\n图标路径：`assets\\dragonsurvival\\textures\\gui\\custom\\supply_icons\\<supply_type>.png`\n图标规格：9x9像素单图标，横向拼接为27x9像素的PNG图片",
    "swirls": "是否启用漩涡效果",
    "target_conditions": "决定选择哪些实体作为目标 - 可用的战利品上下文：\n- attacking_entity(施法者)\n- this_entity(目标)\n- origin(目标位置)\n谓词(https://zh.minecraft.wiki/w/谓词)",
    "target_direction": "发射方向",
    "target_selection": "定义如何选择目标以及效果的定义",
    "target_type": "目标选择器\n- `dragonsurvival:area` 以施法者为中心radius半径内的目标\n- `dragonsurvival:dragon_breath` 施法者前方的锥形区域内的目标\n- `dragonsurvival:looking_at` 施法者正在看向的特定实体或方块\n- `dragonsurvival:self` 施法者自身\n- `dragonsurvival:disc` 玩家周围的圆柱形区域",
    "targeting_mode": "对要选择的实体进行预过滤\n(具有施法者和目标之间的上下文，允许进行适当的盟友或敌人检查)\n- `all` 任何目标\n- `allies` 只选中被视为盟友的实体\n- `allies_and_self` 与'Allies'相同，但也包括施法者自身\n- `non_allies` 选中任何非盟友\n- `non_enemies` 排除被视为敌人的实体，可能包括：(分类为怪物的实体、以施法者为目标的生物)\n- `neutral` 选中中立实体(非盟友且非敌人)\n- `enemies` 选中被视为敌人的实体，可能包括：(分类为怪物的实体、以施法者为目标的生物)\n- `items` 选中物品\n- `all_except_self` 选中除施法者之外的任何目标",
    "teeth": "牙齿\n- 使用`assets\\<命名空间>\\skin\\parts\\teeth\\`目录下JSON文件中key的值",
    "texture": "此皮肤组件将使用的贴图\n此处的资源的注册方式与原版的`\"命名空间:资源路径\"`不同\n- 若用图片`assets/dragonsurvival/textures/dragon/custom/cave_base_2.png`\n- 请这么写`\"dragonsurvival:textures/dragon/custom/cave_base_2.png\"`",
    "texture_entries": "根据等级决定将使用的贴图",
    "texture_resource": "该等级将使用的技能图标(必须放在'assets/<命名空间>/textures/gui/sprites'目录中)\n(需要省略'textures/gui/sprites'路径和'.png'文件扩展名)",
    "texture_size": "贴图大小(默认512x512)",
    "third_person": "是否主要在第三人称下显示\n(默认:fasle)",
    "tick_rate": "效果触发的频率(current_tick % rate == 0)\n(默认: 0)",
    "ticking_effects": "弹射物未落地时，每tick都会执行的效果\n- `world_effect`\n- `dragonsurvival:point`\n- `执行者`: 弹射物自身\n- `执行位置`: 弹射物击中判定成功时的位置(会出现在弹射物的轨迹上)\n- `dragonsurvival:area`\n- `执行者`: 弹射物自身\n- `执行位置`: 范围内所有复合的实体(不包括弹射物本身)\n- `entity_effect`\n- `dragonsurvival:point`\n- 无任何效果\n- `dragonsurvival:area`\n- `执行者`: 范围内所有符合的实体(不包括弹射物本身)\n- `执行位置`: 弹射物击中判定成功时的位置(会出现在弹射物的轨迹上)\n- `block_effect`\n- `dragonsurvival:point`\n- `执行者`: `server`\n- `执行位置`: 弹射物击中判定成功时的 `方块位置中心`(会出现在弹射物的轨迹上)\n- `dragonsurvival:area`\n- `执行者`: `server`\n- `执行位置`: 弹射物为中心范围内所有符合的方块中心",
    "ticks_until_grown": "达到最大成长所需的刻数(可以在1刻到1年之间指定)(20刻 = 1秒)",
    "tier": "工具类型",
    "tiers": "将使用的工具类型",
    "tool": "指定所用的工具",
    "trail_particle": "拖尾粒子",
    "transition_length": "动画过渡时间\n(默认：0)",
    "translation_override": "翻译覆盖\n- 如果不提供，使用`animationKey`作为翻译键",
    "trigger": "能力触发时机\n(默认：dragonsurvival:constant)",
    "trigger_point": "指定该效果触发的施法阶段 (自龙生`1.21.1-v2.0.36-26.09.2025`加入)\n- `default` 默认（施法成功后触发）",
    "trigger_rate": "效果触发的频率(current_tick % rate == 0)",
    "trigger_type": "激活触发器类型\n- `dragonsurvival:constant` 恒定触发\n- `dragonsurvival:on_self_hit` 当自己受到伤害时触发\n- `dragonsurvival:on_target_hit` 当目标受到伤害时触发\n- `dragonsurvival:on_target_killed` 当目标被击杀时触发\n- `dragonsurvival:on_death` 当死亡时触发\n- `dragonsurvival:on_block_break` 当破坏方块时\n- `dragonsurvival:on_key_pressed` 当按键按下时\n- `dragonsurvival:on_key_released` 当按键施放时",
    "type": "等级依赖函数(https://zh.minecraft.wiki/w/魔咒数据格式/等级依赖函数)",
    "type_data": "决定自定义弹射物的外观\n- 若是`texture`+`piercing_level`则是自定义箭类实体\n- 若是`resources`+`behaviour_data`则是自定义火球类实体",
    "unlock_condition": "解锁条件\n谓词(https://zh.minecraft.wiki/w/谓词)",
    "unlockable_behavior": "指定此身体的解锁条件及其在龙编辑器中的可见性",
    "upgrade": "定义能力的最大等级及升级方式\n(如果未定义升级，最大等级将为1)",
    "upgrade_type": "升级所用的方式\n- `dragonsurvival:experience_points` 通过消耗经验升级\n- `dragonsurvival:experience_levels` 通过经验等级自动升级\n- `dragonsurvival:dragon_growth` 通过成长度升级\n- `dragonsurvival:item_based` 通过物品升级\n- `dragonsurvival:condition_based` 通过条件判断升级",
    "usage_blocked": "如果条件匹配则禁用该能力\n谓词(https://zh.minecraft.wiki/w/谓词)",
    "use_claw": "是否在造成伤害时临时装备龙爪上的工具\n(默认: false)",
    "using_converts_to": "与牛奶桶的工作方式类似",
    "valid_blocks": "决定哪些方块将被破坏",
    "valid_effects": "指定要移除状态效果列表",
    "valid_entities": "过滤哪些实体可以成为目标",
    "visibility": "可见性\n- always_visible    始终可见\n- always_hidden     始终隐藏\n- visible_if_locked 如果锁定则可见",
    "volume": "音效音量\n(默认：1)",
    "walk_speed": "实体逃跑时的行走移动速度修正值(默认：1)",
    "weather_predicate": "天气相关的判断条件(内部判断用的逻辑是and)",
    "weight": "权重值",
    "width": "龙的身体宽度",
    "world_effect": "世界效果\n可用效果列表:\n- `dragonsurvival:explosion` 造成爆炸\n- `dragonsurvival:lightning` 召唤闪电\n- `dragonsurvival:particle` 生成粒子\n- `dragonsurvival:run_function` 运行函数",
};

export const MCDOC_DISPATCH: Record<string, Record<string, string>> = {
    "dragonsurvival:ability_block_effect": {"dragonsurvival:bonemeal":"BonemealEffect_Block__data_dragonsurvival_dragon_ability","dragonsurvival:conversion":"BlockConversionEffect_Block__data_dragonsurvival_dragon_ability","dragonsurvival:summon_entity":"SummonEntityEffect_Block__data_dragonsurvival_dragon_ability","dragonsurvival:fire":"FireEffect_Block__data_dragonsurvival_dragon_ability","dragonsurvival:area_cloud":"AreaCloudEffect_Block__data_dragonsurvival_dragon_ability","dragonsurvival:block_break":"BlockBreakEffect_Block__data_dragonsurvival_dragon_ability","dragonsurvival:particle":"ParticleEffect_Block__data_dragonsurvival_dragon_ability","dragonsurvival:run_function":"RunFunctionEffect_Block__data_dragonsurvival_dragon_ability","dragonsurvival:use_item":"UseItemOnBlockEffect_Block__data_dragonsurvival_dragon_ability","dragonsurvival:explosion":"ExplodeBlockEffect_Block__data_dragonsurvival_dragon_ability","dragonsurvival:block_harvest":"BlockHarvestEffect_Block__data_dragonsurvival_dragon_ability"},
    "dragonsurvival:ability_entity_effect": {"dragonsurvival:damage":"DamageEffect_Entity__data_dragonsurvival_dragon_ability","dragonsurvival:modifier":"ModifierEffect_Entity__data_dragonsurvival_dragon_ability","dragonsurvival:potion":"PotionEffect_Entity__data_dragonsurvival_dragon_ability","dragonsurvival:projectile":"ProjectileEffect_Entity__data_dragonsurvival_dragon_ability","dragonsurvival:summon_entity":"SummonEntityEffect_Entity__data_dragonsurvival_dragon_ability","dragonsurvival:damage_modification":"DamageModificationEffect_Entity__data_dragonsurvival_dragon_ability","dragonsurvival:breath_particles":"BreathParticlesEffect_Entity__data_dragonsurvival_dragon_ability","dragonsurvival:ignite":"IgniteEffect_Entity__data_dragonsurvival_dragon_ability","dragonsurvival:harvest_bonus":"HarvestBonusEffect_Entity__data_dragonsurvival_dragon_ability","dragonsurvival:on_attack":"OnAttackEffect_Entity__data_dragonsurvival_dragon_ability","dragonsurvival:flight":"FlightEffect_Entity__data_dragonsurvival_dragon_ability","dragonsurvival:spin":"SpinEffect_Entity__data_dragonsurvival_dragon_ability","dragonsurvival:item_conversion":"ItemConversionEffect_Entity__data_dragonsurvival_dragon_ability","dragonsurvival:swim":"SwimEffect_Entity__data_dragonsurvival_dragon_ability","dragonsurvival:effect_modification":"EffectModificationEffect_Entity__data_dragonsurvival_dragon_ability","dragonsurvival:particle":"ParticleEffect_Entity__data_dragonsurvival_dragon_ability","dragonsurvival:glow":"GlowEffect_Entity__data_dragonsurvival_dragon_ability","dragonsurvival:oxygen_bonus":"OxygenBonusEffect_Entity__data_dragonsurvival_dragon_ability","dragonsurvival:block_vision":"BlockVisionEffect_Entity__data_dragonsurvival_dragon_ability","dragonsurvival:run_function":"RunFunctionEffect_Entity__data_dragonsurvival_dragon_ability","dragonsurvival:smelting":"SmeltItemEffect_Entity__data_dragonsurvival_dragon_ability","dragonsurvival:heal":"HealEffect_Entity__data_dragonsurvival_dragon_ability","dragonsurvival:teleport":"TeleportEffect_Entity__data_dragonsurvival_dragon_ability","dragonsurvival:push":"PushEffect_Entity__data_dragonsurvival_dragon_ability","dragonsurvival:hunger":"HungerEffect_Entity__data_dragonsurvival_dragon_ability","dragonsurvival:effect_removal":"MobEffectRemovalEffect_Entity__data_dragonsurvival_dragon_ability","dragonsurvival:use_item":"UseItemOnLivingEntityEffect_Entity__data_dragonsurvival_dragon_ability","dragonsurvival:dragon_growth":"DragonGrowthEffect_Entity__data_dragonsurvival_dragon_ability","dragonsurvival:mana_recovery":"ManaRecoveryEffect_Entity__data_dragonsurvival_dragon_ability","dragonsurvival:experience":"ExperienceEffect__data_dragonsurvival_dragon_ability","dragonsurvival:cooldown_recovery":"CooldownRecoveryEffect__data_dragonsurvival_dragon_ability"},
    "dragonsurvival:ability_targeting": {"dragonsurvival:area":"AreaTarget__data_dragonsurvival_dragon_ability","dragonsurvival:dragon_breath":"DragonBreathTarget__data_dragonsurvival_dragon_ability","dragonsurvival:looking_at":"LookingAtTarget__data_dragonsurvival_dragon_ability","dragonsurvival:self":"SelfTarget__data_dragonsurvival_dragon_ability","dragonsurvival:disc":"DiscTarget__data_dragonsurvival_dragon_ability"},
    "dragonsurvival:activation": {"dragonsurvival:passive":"PassiveActivation__data_dragonsurvival_dragon_ability","dragonsurvival:simple":"SimpleActivation__data_dragonsurvival_dragon_ability","dragonsurvival:channeled":"ChanneledActivation__data_dragonsurvival_dragon_ability"},
    "dragonsurvival:activation_trigger": {"dragonsurvival:constant":"ConstantTrigger__data_dragonsurvival_dragon_ability","dragonsurvival:on_self_hit":"OnSelfHit__data_dragonsurvival_dragon_ability","dragonsurvival:on_target_hit":"OnTargetHit__data_dragonsurvival_dragon_ability","dragonsurvival:on_target_killed":"OnTargetKilled__data_dragonsurvival_dragon_ability","dragonsurvival:on_death":"OnDeath__data_dragonsurvival_dragon_ability","dragonsurvival:on_block_break":"OnBlockBreak__data_dragonsurvival_dragon_ability","dragonsurvival:on_key_pressed":"OnKeyPressed__data_dragonsurvival_dragon_ability","dragonsurvival:on_key_released":"OnKeyReleased__data_dragonsurvival_dragon_ability"},
    "dragonsurvival:animatioin": {"dragonsurvival:passive":"PassiveAnimations__data_dragonsurvival_dragon_ability","dragonsurvival:channeled":"ChanneledAnimations__data_dragonsurvival_dragon_ability"},
    "dragonsurvival:penalty_effect": {"dragonsurvival:take_damage":"DamagePenalty__data_dragonsurvival_dragon_penalty","dragonsurvival:mob_effect":"MobEffectPenalty__data_dragonsurvival_dragon_penalty","dragonsurvival:item_blacklist":"ItemBlacklistPenalty__data_dragonsurvival_dragon_penalty","dragonsurvival:damage_modification":"DamageModificationPenalty__data_dragonsurvival_dragon_penalty","dragonsurvival:fear":"FearPenalty__data_dragonsurvival_dragon_penalty","dragonsurvival:modifier":"ModifierPenalty__data_dragonsurvival_dragon_penalty","dragonsurvival:effect_modification":"EffectModificationPenalty__data_dragonsurvival_dragon_penalty","dragonsurvival:run_function":"RunFunctionPenalty__data_dragonsurvival_dragon_penalty"},
    "dragonsurvival:penalty_trigger": {"dragonsurvival:supply":"SupplyTrigger__data_dragonsurvival_dragon_penalty","dragonsurvival:instant":"InstantTrigger__data_dragonsurvival_dragon_penalty","dragonsurvival:item_used":"ItemUsedTrigger__data_dragonsurvival_dragon_penalty","dragonsurvival:hit_by_projectile":"HitByProjectileTrigger__data_dragonsurvival_dragon_penalty","dragonsurvival:hit_by_water_potion":"HitByWaterPotionTrigger__data_dragonsurvival_dragon_penalty"},
    "dragonsurvival:projectile_block_effect": {"dragonsurvival:particle":"ProjectileBlockParticleEffect__data_dragonsurvival_projectile_data","dragonsurvival:run_function":"ProjectileBlockRunFunctionEffect__data_dragonsurvival_projectile_data","dragonsurvival:area_cloud":"ProjectileAreaCloudEffect__data_dragonsurvival_projectile_data"},
    "dragonsurvival:projectile_entity_effect": {"dragonsurvival:damage":"ProjectileDamageEffect__data_dragonsurvival_projectile_data","dragonsurvival:potion":"ProjectilePotionEffect__data_dragonsurvival_projectile_data","dragonsurvival:lightning":"ProjectileLightningEntityEffect__data_dragonsurvival_projectile_data","dragonsurvival:particle":"ProjectileEntityParticleEffect__data_dragonsurvival_projectile_data","dragonsurvival:run_function":"ProjectileEntityRunFunctionEffect__data_dragonsurvival_projectile_data","dragonsurvival:push":"ProjectileEntityPushEffect__data_dragonsurvival_projectile_data"},
    "dragonsurvival:projectile_targeting": {"dragonsurvival:area":"AreaTarget__data_dragonsurvival_projectile_data"},
    "dragonsurvival:projectile_world_effect": {"dragonsurvival:explosion":"ProjectileExplosionEffect__data_dragonsurvival_projectile_data","dragonsurvival:lightning":"ProjectileLightningWorldEffect__data_dragonsurvival_projectile_data","dragonsurvival:particle":"ProjectileWorldParticleEffect__data_dragonsurvival_projectile_data","dragonsurvival:run_function":"ProjectileWorldRunFunctionEffect__data_dragonsurvival_projectile_data"},
    "dragonsurvival:sound": {"dragonsurvival:passive":"PassiveSound__data_dragonsurvival_dragon_ability","dragonsurvival:channeled":"ChanneledSound__data_dragonsurvival_dragon_ability"},
    "dragonsurvival:trigger_point": {"dragonsurvival:passive":"PassiveTriggerPoint__data_dragonsurvival_dragon_ability","dragonsurvival:simple":"SimpleTriggerPoint__data_dragonsurvival_dragon_ability","dragonsurvival:channeled":"ChanneledTriggerPoint__data_dragonsurvival_dragon_ability"},
    "dragonsurvival:upgrade_type": {"dragonsurvival:experience_points":"ExperiencePointsUpgrade__data_dragonsurvival_dragon_ability","dragonsurvival:experience_levels":"ExperienceLevelUpgrade__data_dragonsurvival_dragon_ability","dragonsurvival:dragon_growth":"DragonGrowthUpgrade__data_dragonsurvival_dragon_ability","dragonsurvival:item_based":"ItemUpgrade__data_dragonsurvival_dragon_ability","dragonsurvival:condition_based":"ConditionUpgrade__data_dragonsurvival_dragon_ability"},
    "minecraft:entity": {"dragonsurvival:generic_arrow_entity":"GenericArrowEntity__world_entity_generic_arrow_entity","dragonsurvival:generic_ball_entity":"GenericBallEntity__world_entity_generic_ball_entity"},
    "minecraft:entity_sub_predicate": {"dragonsurvival:dragon_predicate":"DragonPredicate__data_advancement_predicate","dragonsurvival:entity_check_predicate":"EntityCheckPredicate__data_advancement_predicate","dragonsurvival:custom_predicates":"CustomPredicates__data_advancement_predicate"},
    "minecraft:particle": {"dragonsurvival:fire":"DragonSurvival_Particle__util_particle","dragonsurvival:large_fire":"DragonSurvival_Particle__util_particle","dragonsurvival:poison":"DragonSurvival_Particle__util_particle","dragonsurvival:large_poison":"DragonSurvival_Particle__util_particle","dragonsurvival:sun":"DragonSurvival_Particle__util_particle","dragonsurvival:large_sun":"DragonSurvival_Particle__util_particle","dragonsurvival:lightning":"DragonSurvival_Particle__util_particle","dragonsurvival:large_lightning":"DragonSurvival_Particle__util_particle","dragonsurvival:treasure":"DragonSurvival_ColorParticle__util_particle","dragonsurvival:sea_sweep":"DragonSurvival_SeaSweepParticle__util_particle"},
    "minecraft:resource": {"dragonsurvival:custom_soul_icons":"CustomSoulIcons__assets_dragonsurvival_custom_soul_icons","dragonsurvival:skin_default_parts":"SkinDefaultParts__assets_dragonsurvival_skin_default_parts","dragonsurvival:skin_parts":"SkinParts__assets_dragonsurvival_skin_parts","dragonsurvival:data_map_dragon_species":"DataMapDragonSpecies__data_data_maps_dragon_species","dragonsurvival:data_map_diet_entries":"ComplexRemovalDataMap","dragonsurvival:data_map_stage_resources":"ComplexRemovalDataMap","dragonsurvival:data_map_end_platforms":"DataMap","dragonsurvival:data_map_dragon_beacon_data":"DataMap","dragonsurvival:data_map_body_icons":"ComplexRemovalDataMap","dragonsurvival:dragon_ability":"DragonAbility__data_dragonsurvival_dragon_ability","dragonsurvival:activation_trigger":"ActivationTrigger__data_dragonsurvival_dragon_ability","dragonsurvival:upgrade_type":"Upgrade__data_dragonsurvival_dragon_ability","dragonsurvival:ability_targeting":"Targeting__data_dragonsurvival_dragon_ability","dragonsurvival:ability_entity_effect":"EntityEffect__data_dragonsurvival_dragon_ability","dragonsurvival:ability_block_effect":"BlockEffect__data_dragonsurvival_dragon_ability","dragonsurvival:dragon_body":"DragonBody__data_dragonsurvival_dragon_body","dragonsurvival:dragon_emote_set":"DragonEmoteSet__data_dragonsurvival_dragon_body","dragonsurvival:dragon_penalty":"DragonPenalty__data_dragonsurvival_dragon_penalty","dragonsurvival:penalty_effect":"PenaltyEffect__data_dragonsurvival_dragon_penalty","dragonsurvival:penalty_trigger":"PenaltyTrigger__data_dragonsurvival_dragon_penalty","dragonsurvival:dragon_species":"DragonSpecies__data_dragonsurvival_dragon_species","dragonsurvival:dragon_stage":"DragonStage__data_dragonsurvival_dragon_stage","dragonsurvival:projectile_data":"ProjectileData__data_dragonsurvival_projectile_data","dragonsurvival:projectile_world_effect":"ProjectileWorldEffect__data_dragonsurvival_projectile_data","dragonsurvival:projectile_block_effect":"ProjectileBlockEffect__data_dragonsurvival_projectile_data","dragonsurvival:projectile_entity_effect":"ProjectileEntityEffect__data_dragonsurvival_projectile_data"},
    "minecraft:trigger": {"dragonsurvival:be_dragon":"BeDragon__data_advancement_trigger","dragonsurvival:convert_item_from_ability":"ConvertItemFromAbility__data_advancement_trigger","dragonsurvival:mine_block_under_lava":"MineBlockUnderLava__data_advancement_trigger","dragonsurvival:sleep_on_treasure":"SleepOnTreasure__data_advancement_trigger","dragonsurvival:steal_from_villager":"StealFromVillager__data_advancement_trigger","dragonsurvival:stop_natural_growth":"StopNaturalGrowth__data_advancement_trigger","dragonsurvival:upgrade_ability":"UpgradeAbility__data_advancement_trigger","dragonsurvival:use_dragon_soul":"UseDragonSoul__data_advancement_trigger"},
};

export const MCDOC_STRUCT_OWNERS: Record<string, string> = {
    "AbilityLevel__data_advancement_predicate": "data_advancement_predicate",
    "Action__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "Activation__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "ActivationTrigger__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "Animations__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "AreaCloudEffect_Block__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "AreaTarget__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "AreaTarget__data_dragonsurvival_projectile_data": "data_dragonsurvival_projectile_data",
    "AttributeScale__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "BackpackOffsets__data_dragonsurvival_dragon_body": "data_dragonsurvival_dragon_body",
    "BeDragon__data_advancement_trigger": "data_advancement_trigger",
    "BehaviourData__data_dragonsurvival_projectile_data": "data_dragonsurvival_projectile_data",
    "BlockBreakEffect_Block__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "BlockConversionData__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "BlockConversionEffect_Block__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "BlockEffect__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "BlockHarvestEffect_Block__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "BlockPredicateSpecial__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "BlockTargeting__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "BlockTo__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "BlockVision__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "BlockVisionEffect_Entity__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "BonemealEffect_Block__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "Bounds__data_dragonsurvival_dragon_stage": "data_dragonsurvival_dragon_stage",
    "BreathParticlesEffect_Entity__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "ChanneledActivation__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "ChanneledAnimations__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "ChanneledSound__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "ChanneledTriggerPoint__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "ColorEntry__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "CompoundAbilityAnimation__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "ConditionUpgrade__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "ConstantTrigger__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "ConvertItemFromAbility__data_advancement_trigger": "data_advancement_trigger",
    "CooldownRecoveryEffect__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "CustomPredicates__data_advancement_predicate": "data_advancement_predicate",
    "CustomSoulIcons__assets_dragonsurvival_custom_soul_icons": "assets_dragonsurvival_custom_soul_icons",
    "DamageEffect_Entity__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "DamageModification__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "DamageModification__data_dragonsurvival_dragon_penalty": "data_dragonsurvival_dragon_penalty",
    "DamageModificationEffect_Entity__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "DamageModificationPenalty__data_dragonsurvival_dragon_penalty": "data_dragonsurvival_dragon_penalty",
    "DamagePenalty__data_dragonsurvival_dragon_penalty": "data_dragonsurvival_dragon_penalty",
    "DataMapDragonSpecies__data_data_maps_dragon_species": "data_data_maps_dragon_species",
    "DefaultSkin__data_data_maps_dragon_species": "data_data_maps_dragon_species",
    "DestructionData__data_dragonsurvival_dragon_stage": "data_dragonsurvival_dragon_stage",
    "DietEntry__data_data_maps_dragon_species": "data_data_maps_dragon_species",
    "DiscTarget__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "DragonAbility__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "DragonBeaconData__data_data_maps_dragon_species": "data_data_maps_dragon_species",
    "DragonBody__data_dragonsurvival_dragon_body": "data_dragonsurvival_dragon_body",
    "DragonBreathTarget__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "DragonEmote__data_dragonsurvival_dragon_body": "data_dragonsurvival_dragon_body",
    "DragonEmoteSet__data_dragonsurvival_dragon_body": "data_dragonsurvival_dragon_body",
    "DragonGrowthEffect_Entity__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "DragonGrowthUpgrade__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "DragonPenalty__data_dragonsurvival_dragon_penalty": "data_dragonsurvival_dragon_penalty",
    "DragonPredicate__data_advancement_predicate": "data_advancement_predicate",
    "DragonSpecies__data_dragonsurvival_dragon_species": "data_dragonsurvival_dragon_species",
    "DragonStage__data_dragonsurvival_dragon_stage": "data_dragonsurvival_dragon_stage",
    "DragonStagePredicate__data_advancement_predicate": "data_advancement_predicate",
    "DragonSurvival_ColorParticle__util_particle": "util_particle",
    "DragonSurvival_Particle__util_particle": "util_particle",
    "DragonSurvival_SeaSweepParticle__util_particle": "util_particle",
    "DurationInstanceBase__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "DurationInstanceBase__data_dragonsurvival_dragon_penalty": "data_dragonsurvival_dragon_penalty",
    "Effect__data_data_maps_dragon_species": "data_data_maps_dragon_species",
    "EffectModification__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "EffectModification__data_dragonsurvival_dragon_penalty": "data_dragonsurvival_dragon_penalty",
    "EffectModificationEffect_Entity__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "EffectModificationPenalty__data_dragonsurvival_dragon_penalty": "data_dragonsurvival_dragon_penalty",
    "EndPlatform__data_data_maps_dragon_species": "data_data_maps_dragon_species",
    "EntityCheckPredicate__data_advancement_predicate": "data_advancement_predicate",
    "EntityEffect__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "EntityTargeting__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "ExperienceEffect__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "ExperienceLevelUpgrade__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "ExperiencePointsUpgrade__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "ExplodeBlockEffect_Block__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "Fear__data_dragonsurvival_dragon_penalty": "data_dragonsurvival_dragon_penalty",
    "FearPenalty__data_dragonsurvival_dragon_penalty": "data_dragonsurvival_dragon_penalty",
    "FillIcon__data_dragonsurvival_dragon_species": "data_dragonsurvival_dragon_species",
    "FireEffect_Block__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "FlightEffect_Entity__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "Food__data_data_maps_dragon_species": "data_data_maps_dragon_species",
    "FoodTooltip__data_dragonsurvival_dragon_species": "data_dragonsurvival_dragon_species",
    "GeneralData__data_dragonsurvival_projectile_data": "data_dragonsurvival_projectile_data",
    "GenericArrowData__data_dragonsurvival_projectile_data": "data_dragonsurvival_projectile_data",
    "GenericArrowEntity__world_entity_generic_arrow_entity": "world_entity_generic_arrow_entity",
    "GenericBallData__data_dragonsurvival_projectile_data": "data_dragonsurvival_projectile_data",
    "GenericBallEntity__world_entity_generic_ball_entity": "world_entity_generic_ball_entity",
    "Glow__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "GlowEffect_Entity__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "GrowthIcon__data_data_maps_dragon_species": "data_data_maps_dragon_species",
    "GrowthItem__data_dragonsurvival_dragon_stage": "data_dragonsurvival_dragon_stage",
    "HarvestBonus__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "HarvestBonusEffect_Entity__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "HealEffect_Entity__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "HitByProjectileTrigger__data_dragonsurvival_dragon_penalty": "data_dragonsurvival_dragon_penalty",
    "HitByWaterPotionTrigger__data_dragonsurvival_dragon_penalty": "data_dragonsurvival_dragon_penalty",
    "HoverIcon__data_dragonsurvival_dragon_species": "data_dragonsurvival_dragon_species",
    "HungerEffect_Entity__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "IgniteEffect_Entity__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "InstantTrigger__data_dragonsurvival_dragon_penalty": "data_dragonsurvival_dragon_penalty",
    "ItemBlacklistPenalty__data_dragonsurvival_dragon_penalty": "data_dragonsurvival_dragon_penalty",
    "ItemConversionData__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "ItemConversionEffect_Entity__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "ItemTo__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "ItemUpgrade__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "ItemUsedTrigger__data_dragonsurvival_dragon_penalty": "data_dragonsurvival_dragon_penalty",
    "LevelBasedResource__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "LevelBasedResource__data_dragonsurvival_projectile_data": "data_dragonsurvival_projectile_data",
    "LevelBasedResourceEntry__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "LevelBasedTier__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "LevelBasedTierEntry__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "LevelBasedValueMap__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "LevelBasedValueMap__data_dragonsurvival_dragon_body": "data_dragonsurvival_dragon_body",
    "LevelBasedValueMap__data_dragonsurvival_dragon_penalty": "data_dragonsurvival_dragon_penalty",
    "LevelBasedValueMap__data_dragonsurvival_dragon_stage": "data_dragonsurvival_dragon_stage",
    "LevelBasedValueMap__data_dragonsurvival_projectile_data": "data_dragonsurvival_projectile_data",
    "LightningHandler__data_dragonsurvival_projectile_data": "data_dragonsurvival_projectile_data",
    "LookingAtBlock__data_advancement_predicate": "data_advancement_predicate",
    "LookingAtTarget__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "ManaHandling__data_dragonsurvival_dragon_species": "data_dragonsurvival_dragon_species",
    "ManaRecoveryEffect_Entity__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "ManaSprites__data_dragonsurvival_dragon_species": "data_dragonsurvival_dragon_species",
    "MineBlockUnderLava__data_advancement_trigger": "data_advancement_trigger",
    "MiscResources__data_dragonsurvival_dragon_species": "data_dragonsurvival_dragon_species",
    "MobEffectPenalty__data_dragonsurvival_dragon_penalty": "data_dragonsurvival_dragon_penalty",
    "MobEffectRemovalEffect_Entity__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "Modification__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "Modification__data_dragonsurvival_dragon_penalty": "data_dragonsurvival_dragon_penalty",
    "Modifier__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "Modifier__data_dragonsurvival_dragon_body": "data_dragonsurvival_dragon_body",
    "Modifier__data_dragonsurvival_dragon_penalty": "data_dragonsurvival_dragon_penalty",
    "Modifier__data_dragonsurvival_dragon_stage": "data_dragonsurvival_dragon_stage",
    "ModifierEffect_Entity__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "ModifierPenalty__data_dragonsurvival_dragon_penalty": "data_dragonsurvival_dragon_penalty",
    "ModifierWithDuration__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "ModifierWithDuration__data_dragonsurvival_dragon_penalty": "data_dragonsurvival_dragon_penalty",
    "MountingOffsets__data_dragonsurvival_dragon_body": "data_dragonsurvival_dragon_body",
    "NearbyEntityPredicate__data_advancement_predicate": "data_advancement_predicate",
    "Notification__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "OnAttackEffect_Entity__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "OnBlockBreak__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "OnDeath__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "OnKeyPressed__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "OnKeyReleased__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "OnSelfHit__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "OnTargetHit__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "OnTargetKilled__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "OxygenBonus__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "OxygenBonusEffect_Entity__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "ParticleEffect_Block__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "ParticleEffect_Entity__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "Parts__assets_dragonsurvival_skin_default_parts": "assets_dragonsurvival_skin_default_parts",
    "PassiveActivation__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "PassiveAnimations__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "PassiveSound__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "PassiveTriggerPoint__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "PaymentData__data_data_maps_dragon_species": "data_data_maps_dragon_species",
    "PenaltyEffect__data_dragonsurvival_dragon_penalty": "data_dragonsurvival_dragon_penalty",
    "PenaltyTrigger__data_dragonsurvival_dragon_penalty": "data_dragonsurvival_dragon_penalty",
    "PotionData__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "PotionData__data_dragonsurvival_dragon_penalty": "data_dragonsurvival_dragon_penalty",
    "PotionData__data_dragonsurvival_projectile_data": "data_dragonsurvival_projectile_data",
    "PotionEffect_Entity__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "PreciseLevelBasedValue__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "PreciseLevelBasedValue__data_dragonsurvival_dragon_body": "data_dragonsurvival_dragon_body",
    "PreciseLevelBasedValue__data_dragonsurvival_dragon_penalty": "data_dragonsurvival_dragon_penalty",
    "PreciseLevelBasedValue__data_dragonsurvival_dragon_stage": "data_dragonsurvival_dragon_stage",
    "ProjectileAreaCloudEffect__data_dragonsurvival_projectile_data": "data_dragonsurvival_projectile_data",
    "ProjectileBlockEffect__data_dragonsurvival_projectile_data": "data_dragonsurvival_projectile_data",
    "ProjectileBlockParticleEffect__data_dragonsurvival_projectile_data": "data_dragonsurvival_projectile_data",
    "ProjectileBlockRunFunctionEffect__data_dragonsurvival_projectile_data": "data_dragonsurvival_projectile_data",
    "ProjectileDamageEffect__data_dragonsurvival_projectile_data": "data_dragonsurvival_projectile_data",
    "ProjectileData__data_dragonsurvival_projectile_data": "data_dragonsurvival_projectile_data",
    "ProjectileEffect_Entity__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "ProjectileEntityEffect__data_dragonsurvival_projectile_data": "data_dragonsurvival_projectile_data",
    "ProjectileEntityParticleEffect__data_dragonsurvival_projectile_data": "data_dragonsurvival_projectile_data",
    "ProjectileEntityPushEffect__data_dragonsurvival_projectile_data": "data_dragonsurvival_projectile_data",
    "ProjectileEntityRunFunctionEffect__data_dragonsurvival_projectile_data": "data_dragonsurvival_projectile_data",
    "ProjectileExplosionEffect__data_dragonsurvival_projectile_data": "data_dragonsurvival_projectile_data",
    "ProjectileLightningEntityEffect__data_dragonsurvival_projectile_data": "data_dragonsurvival_projectile_data",
    "ProjectileLightningWorldEffect__data_dragonsurvival_projectile_data": "data_dragonsurvival_projectile_data",
    "ProjectilePotionEffect__data_dragonsurvival_projectile_data": "data_dragonsurvival_projectile_data",
    "ProjectileTargeting__data_dragonsurvival_projectile_data": "data_dragonsurvival_projectile_data",
    "ProjectileTargeting_GeneralData__data_dragonsurvival_projectile_data": "data_dragonsurvival_projectile_data",
    "ProjectileTargeting_GeneralData_Effect__data_dragonsurvival_projectile_data": "data_dragonsurvival_projectile_data",
    "ProjectileWorldEffect__data_dragonsurvival_projectile_data": "data_dragonsurvival_projectile_data",
    "ProjectileWorldParticleEffect__data_dragonsurvival_projectile_data": "data_dragonsurvival_projectile_data",
    "ProjectileWorldRunFunctionEffect__data_dragonsurvival_projectile_data": "data_dragonsurvival_projectile_data",
    "PushEffect_Entity__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "RecoveryItems__data_dragonsurvival_dragon_penalty": "data_dragonsurvival_dragon_penalty",
    "ReplaceableValue___data_data_maps_dragon_species": "data_data_maps_dragon_species",
    "ReplaceableValue__data_data_maps_dragon_species": "data_data_maps_dragon_species",
    "ReservedManaCost__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "ResourceLocation__data_dragonsurvival_projectile_data": "data_dragonsurvival_projectile_data",
    "RunFunctionEffect_Block__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "RunFunctionEffect_Entity__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "RunFunctionPenalty__data_dragonsurvival_dragon_penalty": "data_dragonsurvival_dragon_penalty",
    "ScalingProportions__data_dragonsurvival_dragon_body": "data_dragonsurvival_dragon_body",
    "SelfTarget__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "SimpleAbilityAnimation__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "SimpleActivation__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "SimpleTriggerPoint__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "SkinDefaultParts__assets_dragonsurvival_skin_default_parts": "assets_dragonsurvival_skin_default_parts",
    "SkinParts__assets_dragonsurvival_skin_parts": "assets_dragonsurvival_skin_parts",
    "SleepOnTreasure__data_advancement_trigger": "data_advancement_trigger",
    "SmeltItemEffect_Entity__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "Sound__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "Sound__data_dragonsurvival_dragon_body": "data_dragonsurvival_dragon_body",
    "SpeciesID__data_data_maps_dragon_species": "data_data_maps_dragon_species",
    "SpinEffect_Entity__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "StageResource__data_data_maps_dragon_species": "data_data_maps_dragon_species",
    "StageResourcesID__data_data_maps_dragon_species": "data_data_maps_dragon_species",
    "StealFromVillager__data_advancement_trigger": "data_advancement_trigger",
    "StopNaturalGrowth__data_advancement_trigger": "data_advancement_trigger",
    "SummonEntityEffect_Block__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "SummonEntityEffect_Entity__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "SummonEntityEffect_NBT__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "SupplyTrigger__data_dragonsurvival_dragon_penalty": "data_dragonsurvival_dragon_penalty",
    "SwimEffect_Entity__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "TargetDirection__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "TargetDirection__data_dragonsurvival_projectile_data": "data_dragonsurvival_projectile_data",
    "Targeting__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "TeleportEffect_Entity__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "TextureSize__data_dragonsurvival_dragon_body": "data_dragonsurvival_dragon_body",
    "TickingManaCost__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "UnlockableBehavior__data_dragonsurvival_dragon_body": "data_dragonsurvival_dragon_body",
    "UnlockableBehavior__data_dragonsurvival_dragon_species": "data_dragonsurvival_dragon_species",
    "Upgrade__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "UpgradeAbility__data_advancement_trigger": "data_advancement_trigger",
    "UseDragonSoul__data_advancement_trigger": "data_advancement_trigger",
    "UseItemOnBlockEffect_Block__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "UseItemOnLivingEntityEffect_Entity__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
    "WeatherPredicate__data_advancement_predicate": "data_advancement_predicate",
    "WeightedListEntry__data_dragonsurvival_dragon_ability": "data_dragonsurvival_dragon_ability",
};

export const MCDOC_TYPE_ALIASES: Record<string, { params: string[]; expression: string }> = {
    "ComplexRemovalDataMap__data_data_maps_dragon_species": {"params":["K","V","R"],"expression":"struct {"},
    "DataMap__data_data_maps_dragon_species": {"params":["K","V"],"expression":"struct {"},
    "LevelBasedValue__data_dragonsurvival_dragon_ability": {"params":[],"expression":"(float | LevelBasedValueMap)"},
    "LevelBasedValue__data_dragonsurvival_dragon_body": {"params":[],"expression":"(float | LevelBasedValueMap)"},
    "LevelBasedValue__data_dragonsurvival_dragon_penalty": {"params":[],"expression":"(float | LevelBasedValueMap)"},
    "LevelBasedValue__data_dragonsurvival_dragon_stage": {"params":[],"expression":"(float | LevelBasedValueMap)"},
    "LevelBasedValue__data_dragonsurvival_projectile_data": {"params":[],"expression":"(float | LevelBasedValueMap)"},
    "PNG_Path__data_data_maps_dragon_species": {"params":[],"expression":"#[match_regex=\"^(?:([a-z0-9_.-]+):)?([a-z0-9/._-]+\\\\.png)$\"] string"},
    "PNG_Path__data_dragonsurvival_dragon_ability": {"params":[],"expression":"#[match_regex=\"^(?:([a-z0-9_.-]+):)?([a-z0-9/._-]+\\\\.png)$\"] string"},
    "PNG_Path__data_dragonsurvival_dragon_penalty": {"params":[],"expression":"#[match_regex=\"^(?:([a-z0-9_.-]+):)?([a-z0-9/._-]+\\\\.png)$\"] string"},
    "PNG_Path__data_dragonsurvival_dragon_species": {"params":[],"expression":"#[match_regex=\"^(?:([a-z0-9_.-]+):)?([a-z0-9/._-]+\\\\.png)$\"] string"},
    "SimpleMap__data_data_maps_dragon_species": {"params":["K","V"],"expression":"struct {"},
};

export const KIND_TO_STRUCT: Record<string, string> = {"dragon_ability":"DragonAbility__data_dragonsurvival_dragon_ability","dragon_species":"DragonSpecies__data_dragonsurvival_dragon_species","dragon_stage":"DragonStage__data_dragonsurvival_dragon_stage","dragon_penalty":"DragonPenalty__data_dragonsurvival_dragon_penalty","projectile_data":"ProjectileData__data_dragonsurvival_projectile_data","dragon_body":"DragonBody__data_dragonsurvival_dragon_body","dragon_emote_set":"DragonEmoteSet__data_dragonsurvival_dragon_body"};
