// Auto-generated from dragonsurvival-mcdoc-completion-zh-2.0.4
export interface McdocStruct {
    required: string[];
    optional: string[];
    fields: Record<string, "required" | "optional">;
}

export const MCDOC_STRUCTS: Record<string, McdocStruct> = {
    "AbilityLevel": {
        required: ["level"],
        optional: ["ability"],
        fields: {"ability":"optional","level":"required"}
    },
    "Action": {
        required: ["target_selection"],
        optional: ["trigger_rate"],
        fields: {"target_selection":"required","trigger_rate":"optional"}
    },
    "Activation": {
        required: ["activation_type"],
        optional: [],
        fields: {"activation_type":"required"}
    },
    "ActivationTrigger": {
        required: ["trigger_type"],
        optional: [],
        fields: {"trigger_type":"required"}
    },
    "Animations": {
        required: [],
        optional: ["start_and_charging","end"],
        fields: {"start_and_charging":"optional","end":"optional"}
    },
    "AreaCloudEffect_Block": {
        required: ["potion","duration","probability","particle"],
        optional: ["delay","radius"],
        fields: {"potion":"required","duration":"required","probability":"required","delay":"optional","radius":"optional","particle":"required"}
    },
    "AreaTarget": {
        required: ["applied_effects","radius"],
        optional: ["particle_trail"],
        fields: {"applied_effects":"required","radius":"required","particle_trail":"optional"}
    },
    "AttributeScale": {
        required: ["attributes","scale"],
        optional: [],
        fields: {"attributes":"required","scale":"required"}
    },
    "BackpackOffsets": {
        required: [],
        optional: ["position_offset","rotation_offset","scale"],
        fields: {"position_offset":"optional","rotation_offset":"optional","scale":"optional"}
    },
    "BeDragon": {
        required: [],
        optional: [],
        fields: {}
    },
    "BehaviourData": {
        required: ["width","height","max_movement_distance","max_lifespan"],
        optional: ["max_bounces","max_lingering_ticks"],
        fields: {"width":"required","height":"required","max_bounces":"optional","max_lingering_ticks":"optional","max_movement_distance":"required","max_lifespan":"required"}
    },
    "BlockBreakEffect_Block": {
        required: ["valid_blocks","probability"],
        optional: ["drop_loot"],
        fields: {"valid_blocks":"required","probability":"required","drop_loot":"optional"}
    },
    "BlockConversionData": {
        required: ["from_predicate","blocks_to"],
        optional: [],
        fields: {"from_predicate":"required","blocks_to":"required"}
    },
    "BlockConversionEffect_Block": {
        required: ["conversion_data","probability"],
        optional: [],
        fields: {"conversion_data":"required","probability":"required"}
    },
    "BlockEffect": {
        required: ["effect_type"],
        optional: [],
        fields: {"effect_type":"required"}
    },
    "BlockHarvestEffect_Block": {
        required: ["valid_blocks"],
        optional: ["probability","tool"],
        fields: {"valid_blocks":"required","probability":"optional","tool":"optional"}
    },
    "BlockPredicateSpecial": {
        required: ["type"],
        optional: [],
        fields: {"type":"required"}
    },
    "BlockTargeting": {
        required: ["block_effect"],
        optional: ["target_conditions"],
        fields: {"block_effect":"required","target_conditions":"optional"}
    },
    "BlockTo": {
        required: ["state","weight"],
        optional: [],
        fields: {"state":"required","weight":"required"}
    },
    "BlockVision": {
        required: ["base","range","display_type","colors"],
        optional: ["blocks","particle_rate","color_shift_rate"],
        fields: {"base":"required","blocks":"optional","range":"required","display_type":"required","colors":"required","particle_rate":"optional","color_shift_rate":"optional"}
    },
    "BlockVisionEffect_Entity": {
        required: ["block_visions"],
        optional: [],
        fields: {"block_visions":"required"}
    },
    "BonemealEffect_Block": {
        required: ["attempts","probability"],
        optional: [],
        fields: {"attempts":"required","probability":"required"}
    },
    "Bounds": {
        required: ["min","max"],
        optional: [],
        fields: {"min":"required","max":"required"}
    },
    "BreathParticlesEffect_Entity": {
        required: ["spread","speed_per_growth","main_particle","secondary_particle"],
        optional: [],
        fields: {"spread":"required","speed_per_growth":"required","main_particle":"required","secondary_particle":"required"}
    },
    "ChanneledActivation": {
        required: [],
        optional: ["initial_mana_cost","continuous_mana_cost","cast_time","cooldown","max_duration","notification","can_move_while_casting","sound","animations"],
        fields: {"initial_mana_cost":"optional","continuous_mana_cost":"optional","cast_time":"optional","cooldown":"optional","max_duration":"optional","notification":"optional","can_move_while_casting":"optional","sound":"optional","animations":"optional"}
    },
    "ChanneledAnimations": {
        required: [],
        optional: ["looping"],
        fields: {"looping":"optional"}
    },
    "ChanneledSound": {
        required: [],
        optional: ["looping"],
        fields: {"looping":"optional"}
    },
    "ChanneledTriggerPoint": {
        required: [],
        optional: ["trigger_point"],
        fields: {"trigger_point":"optional"}
    },
    "ColorEntry": {
        required: ["color"],
        optional: ["alpha"],
        fields: {"color":"required","alpha":"optional"}
    },
    "CompoundAbilityAnimation": {
        required: ["starting_animation_key","looping_animation_key","layer","locks_neck","locks_tail"],
        optional: ["transition_length"],
        fields: {"starting_animation_key":"required","looping_animation_key":"required","layer":"required","transition_length":"optional","locks_neck":"required","locks_tail":"required"}
    },
    "ConditionUpgrade": {
        required: ["conditions","require_previous"],
        optional: [],
        fields: {"conditions":"required","require_previous":"required"}
    },
    "ConstantTrigger": {
        required: [],
        optional: [],
        fields: {}
    },
    "ConvertItemFromAbility": {
        required: ["item_from","item_to"],
        optional: [],
        fields: {"item_from":"required","item_to":"required"}
    },
    "CooldownRecoveryEffect": {
        required: ["action_type","adjustment_type","amount"],
        optional: ["abilities","probability","exclude_this"],
        fields: {"abilities":"optional","action_type":"required","adjustment_type":"required","amount":"required","probability":"optional","exclude_this":"optional"}
    },
    "CustomPredicates": {
        required: [],
        optional: ["eye_in_fluid","weather_predicate","sun_light_level","has_duration_effect","is_nearby_entity","player_hunger","health_percentage","has_uuid","looking_at_block"],
        fields: {"eye_in_fluid":"optional","weather_predicate":"optional","sun_light_level":"optional","has_duration_effect":"optional","is_nearby_entity":"optional","player_hunger":"optional","health_percentage":"optional","has_uuid":"optional","looking_at_block":"optional"}
    },
    "CustomSoulIcons": {
        required: ["species","model"],
        optional: ["stage"],
        fields: {"species":"required","stage":"optional","model":"required"}
    },
    "DamageEffect_Entity": {
        required: ["damage_type","amount"],
        optional: ["scale","expression","use_claw"],
        fields: {"damage_type":"required","amount":"required","scale":"optional","expression":"optional","use_claw":"optional"}
    },
    "DamageModification": {
        required: ["base","damage_types","multiplier"],
        optional: [],
        fields: {"base":"required","damage_types":"required","multiplier":"required"}
    },
    "DamageModificationEffect_Entity": {
        required: ["modifications"],
        optional: [],
        fields: {"modifications":"required"}
    },
    "DamageModificationPenalty": {
        required: ["modification","duration"],
        optional: [],
        fields: {"modification":"required","duration":"required"}
    },
    "DamagePenalty": {
        required: ["damage_type","amount"],
        optional: [],
        fields: {"damage_type":"required","amount":"required"}
    },
    "DataMapDragonSpecies": {
        required: ["values"],
        optional: ["replace"],
        fields: {"replace":"optional","values":"required"}
    },
    "DataMapValues": {
        required: ["value"],
        optional: ["replace"],
        fields: {"replace":"optional","value":"required"}
    },
    "DataMapValues_": {
        required: ["value"],
        optional: ["replace"],
        fields: {"replace":"optional","value":"required"}
    },
    "DefaultSkin": {
        required: ["skin","glow_skin"],
        optional: [],
        fields: {"skin":"required","glow_skin":"required"}
    },
    "DestructionData": {
        required: ["crushing_growth","block_destruction_growth","crushing_damage_scalar","block_predicate","entity_predicate"],
        optional: [],
        fields: {"crushing_growth":"required","block_destruction_growth":"required","crushing_damage_scalar":"required","block_predicate":"required","entity_predicate":"required"}
    },
    "DietEntry": {
        required: ["items"],
        optional: ["properties","retain_effects"],
        fields: {"items":"required","properties":"optional","retain_effects":"optional"}
    },
    "DiscTarget": {
        required: ["applied_effects","radius","height"],
        optional: ["height_starts_below"],
        fields: {"applied_effects":"required","radius":"required","height":"required","height_starts_below":"optional"}
    },
    "DragonAbility": {
        required: ["activation","actions","icon"],
        optional: ["upgrade","usage_blocked","can_be_manually_disabled"],
        fields: {"activation":"required","upgrade":"optional","usage_blocked":"optional","actions":"required","can_be_manually_disabled":"optional","icon":"required"}
    },
    "DragonBeaconData": {
        required: ["effects","payment_data"],
        optional: [],
        fields: {"effects":"required","payment_data":"required"}
    },
    "DragonBody": {
        required: ["animation","emotes","scaling_proportions","crouch_height_ratio"],
        optional: ["is_default","unlockable_behavior","modifiers","can_hide_wings","model","texture_size","default_icon","bones_to_hide_for_toggle","mounting_offset","backpack_offset","bettercombat_weapon_offset"],
        fields: {"is_default":"optional","unlockable_behavior":"optional","modifiers":"optional","can_hide_wings":"optional","model":"optional","texture_size":"optional","animation":"required","default_icon":"optional","bones_to_hide_for_toggle":"optional","emotes":"required","scaling_proportions":"required","crouch_height_ratio":"required","mounting_offset":"optional","backpack_offset":"optional","bettercombat_weapon_offset":"optional"}
    },
    "DragonBreathTarget": {
        required: ["applied_effects","range_multiplier"],
        optional: [],
        fields: {"applied_effects":"required","range_multiplier":"required"}
    },
    "DragonEmote": {
        required: ["animation_key"],
        optional: ["translation_override","speed","duration","loops","blend","locks_head","locks_tail","third_person","can_move","sound"],
        fields: {"animation_key":"required","translation_override":"optional","speed":"optional","duration":"optional","loops":"optional","blend":"optional","locks_head":"optional","locks_tail":"optional","third_person":"optional","can_move":"optional","sound":"optional"}
    },
    "DragonEmoteSet": {
        required: ["emotes"],
        optional: [],
        fields: {"emotes":"required"}
    },
    "DragonGrowthEffect_Entity": {
        required: ["growth_type","action_type","amount"],
        optional: ["probability"],
        fields: {"growth_type":"required","action_type":"required","amount":"required","probability":"optional"}
    },
    "DragonGrowthUpgrade": {
        required: ["maximum_level","growth_requirement"],
        optional: [],
        fields: {"maximum_level":"required","growth_requirement":"required"}
    },
    "DragonPenalty": {
        required: ["effect","trigger"],
        optional: ["icon","condition"],
        fields: {"icon":"optional","condition":"optional","effect":"required","trigger":"required"}
    },
    "DragonPredicate": {
        required: [],
        optional: ["dragon_species","stage_specific","dragon_body","ability_levels","is_growth_stopped","marked_by_ender_dragon","flight_was_granted","spin_was_granted","is_flying"],
        fields: {"dragon_species":"optional","stage_specific":"optional","dragon_body":"optional","ability_levels":"optional","is_growth_stopped":"optional","marked_by_ender_dragon":"optional","flight_was_granted":"optional","spin_was_granted":"optional","is_flying":"optional"}
    },
    "DragonSpecies": {
        required: ["misc_resources"],
        optional: ["starting_growth","unlockable_behavior","mana_handling","custom_stage_progression","bodies","abilities","penalties"],
        fields: {"starting_growth":"optional","unlockable_behavior":"optional","mana_handling":"optional","custom_stage_progression":"optional","bodies":"optional","abilities":"optional","penalties":"optional","misc_resources":"required"}
    },
    "DragonStage": {
        required: ["growth_range","ticks_until_grown"],
        optional: ["is_default","modifiers","growth_items","is_natural_growth_stopped","destruction_data"],
        fields: {"is_default":"optional","growth_range":"required","ticks_until_grown":"required","modifiers":"optional","growth_items":"optional","is_natural_growth_stopped":"optional","destruction_data":"optional"}
    },
    "DragonStagePredicate": {
        required: [],
        optional: ["dragon_stage","growth_percentage","growth"],
        fields: {"dragon_stage":"optional","growth_percentage":"optional","growth":"optional"}
    },
    "DragonSurvival_ColorParticle": {
        required: ["red","green","blue","scale"],
        optional: [],
        fields: {"red":"required","green":"required","blue":"required","scale":"required"}
    },
    "DragonSurvival_Particle": {
        required: ["duration","swirls"],
        optional: [],
        fields: {"duration":"required","swirls":"required"}
    },
    "DragonSurvival_SeaSweepParticle": {
        required: ["quadSize"],
        optional: [],
        fields: {"quadSize":"required"}
    },
    "DurationInstanceBase": {
        required: ["id"],
        optional: ["duration","should_remove_automatically","early_removal_condition","custom_icon","is_hidden"],
        fields: {"id":"required","duration":"optional","should_remove_automatically":"optional","early_removal_condition":"optional","custom_icon":"optional","is_hidden":"optional"}
    },
    "Effect": {
        required: ["effect"],
        optional: ["duration","amplifier"],
        fields: {"effect":"required","duration":"optional","amplifier":"optional"}
    },
    "EffectModification": {
        required: ["base"],
        optional: ["effects","duration_modification","amplifier_modification"],
        fields: {"base":"required","effects":"optional","duration_modification":"optional","amplifier_modification":"optional"}
    },
    "EffectModificationEffect_Entity": {
        required: ["modifications"],
        optional: [],
        fields: {"modifications":"required"}
    },
    "EffectModificationPenalty": {
        required: ["modifications"],
        optional: [],
        fields: {"modifications":"required"}
    },
    "EndPlatform": {
        required: ["structure","spawn_position"],
        optional: [],
        fields: {"structure":"required","spawn_position":"required"}
    },
    "EntityCheckPredicate": {
        required: [],
        optional: ["check_for"],
        fields: {"check_for":"optional"}
    },
    "EntityEffect": {
        required: ["effect_type"],
        optional: [],
        fields: {"effect_type":"required"}
    },
    "EntityTargeting": {
        required: ["entity_effect","targeting_mode"],
        optional: ["target_conditions"],
        fields: {"entity_effect":"required","target_conditions":"optional","targeting_mode":"required"}
    },
    "ExperienceEffect": {
        required: ["experience_type","amount"],
        optional: ["probability"],
        fields: {"experience_type":"required","amount":"required","probability":"optional"}
    },
    "ExperienceLevelUpgrade": {
        required: ["maximum_level","level_requirement"],
        optional: [],
        fields: {"maximum_level":"required","level_requirement":"required"}
    },
    "ExperiencePointsUpgrade": {
        required: ["maximum_level","experience_cost"],
        optional: [],
        fields: {"maximum_level":"required","experience_cost":"required"}
    },
    "ExplodeBlockEffect_Block": {
        required: ["power","damage_type"],
        optional: ["probability","fire"],
        fields: {"probability":"optional","power":"required","fire":"optional","damage_type":"required"}
    },
    "Fear": {
        required: ["base","distance"],
        optional: ["entity_condition","walk_speed","sprint_speed"],
        fields: {"base":"required","entity_condition":"optional","distance":"required","walk_speed":"optional","sprint_speed":"optional"}
    },
    "FearPenalty": {
        required: ["fears"],
        optional: [],
        fields: {"fears":"required"}
    },
    "FillIcon": {
        required: ["empty","full"],
        optional: [],
        fields: {"empty":"required","full":"required"}
    },
    "FireEffect_Block": {
        required: ["ignite_probability"],
        optional: [],
        fields: {"ignite_probability":"required"}
    },
    "FlightEffect_Entity": {
        required: ["level_requirement"],
        optional: ["icon"],
        fields: {"level_requirement":"required","icon":"optional"}
    },
    "Food": {
        required: ["nutrition","saturation"],
        optional: ["can_always_eat","eat_seconds","effects","using_converts_to"],
        fields: {"nutrition":"required","saturation":"required","can_always_eat":"optional","eat_seconds":"optional","effects":"optional","using_converts_to":"optional"}
    },
    "FoodTooltip": {
        required: ["nutrition_icon","saturation_icon"],
        optional: ["font","color"],
        fields: {"font":"optional","nutrition_icon":"required","saturation_icon":"required","color":"optional"}
    },
    "GeneralData": {
        required: ["name","block_hit_effects","common_hit_effects","entity_hit_condition","entity_hit_effects","ticking_effects"],
        optional: ["is_impact_projectile"],
        fields: {"name":"required","is_impact_projectile":"optional","block_hit_effects":"required","common_hit_effects":"required","entity_hit_condition":"required","entity_hit_effects":"required","ticking_effects":"required"}
    },
    "GenericArrowData": {
        required: ["texture"],
        optional: ["piercing_level"],
        fields: {"texture":"required","piercing_level":"optional"}
    },
    "GenericArrowEntity": {
        required: ["general_data","type_data"],
        optional: ["projectile_level"],
        fields: {"projectile_level":"optional","general_data":"required","type_data":"required"}
    },
    "GenericBallData": {
        required: ["resources","behaviour_data"],
        optional: ["on_destroy_effects","trail_particle"],
        fields: {"resources":"required","behaviour_data":"required","on_destroy_effects":"optional","trail_particle":"optional"}
    },
    "GenericBallEntity": {
        required: ["general_data","type_data"],
        optional: ["projectile_level","bounces","lingering_ticks","movement_distance","lifespan"],
        fields: {"projectile_level":"optional","general_data":"required","type_data":"required","bounces":"optional","lingering_ticks":"optional","movement_distance":"optional","lifespan":"optional"}
    },
    "Glow": {
        required: ["base","color"],
        optional: [],
        fields: {"base":"required","color":"required"}
    },
    "GlowEffect_Entity": {
        required: ["glows"],
        optional: [],
        fields: {"glows":"required"}
    },
    "GrowthIcon": {
        required: ["hover_icon","icon"],
        optional: [],
        fields: {"hover_icon":"required","icon":"required"}
    },
    "GrowthItem": {
        required: ["items","growth_in_ticks"],
        optional: ["maximum_usages"],
        fields: {"items":"required","growth_in_ticks":"required","maximum_usages":"optional"}
    },
    "HarvestBonus": {
        required: ["base","blocks"],
        optional: ["base_speed","harvest_bonus","break_speed_multiplier"],
        fields: {"base":"required","blocks":"required","base_speed":"optional","harvest_bonus":"optional","break_speed_multiplier":"optional"}
    },
    "HarvestBonusEffect_Entity": {
        required: ["harvest_bonuses"],
        optional: [],
        fields: {"harvest_bonuses":"required"}
    },
    "HealEffect_Entity": {
        required: ["percentage"],
        optional: [],
        fields: {"percentage":"required"}
    },
    "HitByProjectileTrigger": {
        required: ["projectiles"],
        optional: [],
        fields: {"projectiles":"required"}
    },
    "HitByWaterPotionTrigger": {
        required: [],
        optional: [],
        fields: {}
    },
    "HoverIcon": {
        required: ["hover_icon","icon"],
        optional: [],
        fields: {"hover_icon":"required","icon":"required"}
    },
    "HungerEffect_Entity": {
        required: ["hunger_gain","saturation_gain","maximum_saturation","conversion_rate"],
        optional: [],
        fields: {"hunger_gain":"required","saturation_gain":"required","maximum_saturation":"required","conversion_rate":"required"}
    },
    "IgniteEffect_Entity": {
        required: ["ignite_ticks"],
        optional: [],
        fields: {"ignite_ticks":"required"}
    },
    "InstantTrigger": {
        required: ["trigger_rate"],
        optional: [],
        fields: {"trigger_rate":"required"}
    },
    "ItemBlacklistPenalty": {
        required: ["items"],
        optional: [],
        fields: {"items":"required"}
    },
    "ItemConversionData": {
        required: ["item_predicate","items_to"],
        optional: [],
        fields: {"item_predicate":"required","items_to":"required"}
    },
    "ItemConversionEffect_Entity": {
        required: ["item_conversions","probability"],
        optional: [],
        fields: {"item_conversions":"required","probability":"required"}
    },
    "ItemTo": {
        required: ["item","weight"],
        optional: ["conversion_rate","particles"],
        fields: {"item":"required","conversion_rate":"optional","weight":"required","particles":"optional"}
    },
    "ItemUpgrade": {
        required: ["items_per_level","downgrade_items"],
        optional: [],
        fields: {"items_per_level":"required","downgrade_items":"required"}
    },
    "ItemUsedTrigger": {
        required: ["item_predicates"],
        optional: [],
        fields: {"item_predicates":"required"}
    },
    "LevelBasedResource": {
        required: ["texture_entries"],
        optional: [],
        fields: {"texture_entries":"required"}
    },
    "LevelBasedResourceEntry": {
        required: ["texture_resource","from_level"],
        optional: [],
        fields: {"texture_resource":"required","from_level":"required"}
    },
    "LevelBasedTier": {
        required: ["tiers"],
        optional: [],
        fields: {"tiers":"required"}
    },
    "LevelBasedTierEntry": {
        required: ["tier","from_level"],
        optional: [],
        fields: {"tier":"required","from_level":"required"}
    },
    "LevelBasedValueMap": {
        required: ["type"],
        optional: [],
        fields: {"type":"required"}
    },
    "LightningHandler": {
        required: ["can_hurt_self","spawns_fire","ignores_items_and_experience"],
        optional: [],
        fields: {"can_hurt_self":"required","spawns_fire":"required","ignores_items_and_experience":"required"}
    },
    "LookingAtBlock": {
        required: ["predicate","distance"],
        optional: [],
        fields: {"predicate":"required","distance":"required"}
    },
    "LookingAtTarget": {
        required: ["applied_effects","range"],
        optional: [],
        fields: {"applied_effects":"required","range":"required"}
    },
    "ManaHandling": {
        required: [],
        optional: ["mana_xp_conversion","mana_per_level","max_mana_from_levels"],
        fields: {"mana_xp_conversion":"optional","mana_per_level":"optional","max_mana_from_levels":"optional"}
    },
    "ManaRecoveryEffect_Entity": {
        required: ["action_type","adjustment_type","amount"],
        optional: ["probability"],
        fields: {"action_type":"required","adjustment_type":"required","amount":"required","probability":"optional"}
    },
    "ManaSprites": {
        required: ["full","reserved","recovery","empty"],
        optional: [],
        fields: {"full":"required","reserved":"required","recovery":"required","empty":"required"}
    },
    "MineBlockUnderLava": {
        required: [],
        optional: ["block"],
        fields: {"block":"optional"}
    },
    "MiscResources": {
        required: ["altar_banner","ability_bar","growth_crystal","food_tooltip","primary_color","secondary_color"],
        optional: ["food_sprites","mana_sprites","growth_left_arrow","growth_right_arrow","claw_texture_slot"],
        fields: {"food_sprites":"optional","mana_sprites":"optional","altar_banner":"required","ability_bar":"required","growth_left_arrow":"optional","growth_right_arrow":"optional","growth_crystal":"required","food_tooltip":"required","primary_color":"required","secondary_color":"required","claw_texture_slot":"optional"}
    },
    "MobEffectPenalty": {
        required: ["potion"],
        optional: [],
        fields: {"potion":"required"}
    },
    "MobEffectRemovalEffect_Entity": {
        required: [],
        optional: ["categories","valid_effects","max_amount","maximum_effect_level"],
        fields: {"categories":"optional","valid_effects":"optional","max_amount":"optional","maximum_effect_level":"optional"}
    },
    "Modification": {
        required: ["type","amount"],
        optional: [],
        fields: {"type":"required","amount":"required"}
    },
    "Modifier": {
        required: ["attribute","amount","operation"],
        optional: [],
        fields: {"attribute":"required","amount":"required","operation":"required"}
    },
    "ModifierEffect_Entity": {
        required: ["modifiers"],
        optional: [],
        fields: {"modifiers":"required"}
    },
    "ModifierPenalty": {
        required: ["modifiers"],
        optional: [],
        fields: {"modifiers":"required"}
    },
    "ModifierWithDuration": {
        required: ["base","modifiers"],
        optional: [],
        fields: {"base":"required","modifiers":"required"}
    },
    "MountingOffsets": {
        required: [],
        optional: ["human_offset","dragon_offset","offset_per_scale_above_one"],
        fields: {"human_offset":"optional","dragon_offset":"optional","offset_per_scale_above_one":"optional"}
    },
    "NearbyEntityPredicate": {
        required: ["entity_types","radius"],
        optional: [],
        fields: {"entity_types":"required","radius":"required"}
    },
    "Notification": {
        required: [],
        optional: ["not_enough_mana","usage_blocked"],
        fields: {"not_enough_mana":"optional","usage_blocked":"optional"}
    },
    "OnAttackEffect_Entity": {
        required: ["potion"],
        optional: [],
        fields: {"potion":"required"}
    },
    "OnBlockBreak": {
        required: ["condition"],
        optional: [],
        fields: {"condition":"required"}
    },
    "OnDeath": {
        required: [],
        optional: [],
        fields: {}
    },
    "OnKeyPressed": {
        required: ["keys"],
        optional: [],
        fields: {"keys":"required"}
    },
    "OnKeyReleased": {
        required: ["keys"],
        optional: [],
        fields: {"keys":"required"}
    },
    "OnSelfHit": {
        required: [],
        optional: ["condition"],
        fields: {"condition":"optional"}
    },
    "OnTargetHit": {
        required: [],
        optional: ["condition"],
        fields: {"condition":"optional"}
    },
    "OnTargetKilled": {
        required: [],
        optional: ["condition"],
        fields: {"condition":"optional"}
    },
    "OxygenBonus": {
        required: ["base","oxygen_bonus"],
        optional: ["fluid_types"],
        fields: {"base":"required","fluid_types":"optional","oxygen_bonus":"required"}
    },
    "OxygenBonusEffect_Entity": {
        required: ["bonuses"],
        optional: [],
        fields: {"bonuses":"required"}
    },
    "ParticleEffect_Block": {
        required: ["particle_data","particle_count"],
        optional: [],
        fields: {"particle_data":"required","particle_count":"required"}
    },
    "ParticleEffect_Entity": {
        required: ["particle_data","particle_count"],
        optional: [],
        fields: {"particle_data":"required","particle_count":"required"}
    },
    "Parts": {
        required: [],
        optional: ["base","bottom","eyes","horns","spikes","claws","teeth","magic","extra","extra1","extra2","extra3","extra4","extra5","extra6","extra7"],
        fields: {"base":"optional","bottom":"optional","eyes":"optional","horns":"optional","spikes":"optional","claws":"optional","teeth":"optional","magic":"optional","extra":"optional","extra1":"optional","extra2":"optional","extra3":"optional","extra4":"optional","extra5":"optional","extra6":"optional","extra7":"optional"}
    },
    "PassiveActivation": {
        required: [],
        optional: ["continuous_mana_cost","cooldown","trigger"],
        fields: {"continuous_mana_cost":"optional","cooldown":"optional","trigger":"optional"}
    },
    "PassiveAnimations": {
        required: [],
        optional: ["looping"],
        fields: {"looping":"optional"}
    },
    "PassiveSound": {
        required: [],
        optional: ["looping"],
        fields: {"looping":"optional"}
    },
    "PassiveTriggerPoint": {
        required: [],
        optional: ["trigger_point"],
        fields: {"trigger_point":"optional"}
    },
    "PaymentData": {
        required: [],
        optional: ["experience_cost","duration_multiplier","amplifier_modification"],
        fields: {"experience_cost":"optional","duration_multiplier":"optional","amplifier_modification":"optional"}
    },
    "PenaltyEffect": {
        required: ["penalty_type"],
        optional: [],
        fields: {"penalty_type":"required"}
    },
    "PenaltyTrigger": {
        required: ["penalty_trigger"],
        optional: [],
        fields: {"penalty_trigger":"required"}
    },
    "PotionData": {
        required: ["effects","amplifier","duration"],
        optional: ["probability","effect_particles","show_icon"],
        fields: {"effects":"required","amplifier":"required","duration":"required","probability":"optional","effect_particles":"optional","show_icon":"optional"}
    },
    "PotionEffect_Entity": {
        required: ["potion"],
        optional: [],
        fields: {"potion":"required"}
    },
    "PreciseLevelBasedValue": {
        required: ["precise_base","precise_amount"],
        optional: [],
        fields: {"precise_base":"required","precise_amount":"required"}
    },
    "ProjectileAreaCloudEffect": {
        required: ["potion","duration","probability","particle"],
        optional: ["delay","radius"],
        fields: {"potion":"required","duration":"required","probability":"required","delay":"optional","radius":"optional","particle":"required"}
    },
    "ProjectileBlockEffect": {
        required: ["block_effect"],
        optional: [],
        fields: {"block_effect":"required"}
    },
    "ProjectileBlockParticleEffect": {
        required: ["particle_data","particle_count"],
        optional: [],
        fields: {"particle_data":"required","particle_count":"required"}
    },
    "ProjectileBlockRunFunctionEffect": {
        required: ["function"],
        optional: [],
        fields: {"function":"required"}
    },
    "ProjectileDamageEffect": {
        required: ["damage_type","amount"],
        optional: [],
        fields: {"damage_type":"required","amount":"required"}
    },
    "ProjectileData": {
        required: ["general_data"],
        optional: ["type_data"],
        fields: {"general_data":"required","type_data":"optional"}
    },
    "ProjectileEffect_Entity": {
        required: ["projectile_data","target_direction","number_of_projectiles","speed"],
        optional: ["projectile_spread"],
        fields: {"projectile_data":"required","target_direction":"required","number_of_projectiles":"required","projectile_spread":"optional","speed":"required"}
    },
    "ProjectileEntityEffect": {
        required: ["entity_effect"],
        optional: [],
        fields: {"entity_effect":"required"}
    },
    "ProjectileEntityParticleEffect": {
        required: ["particle_data","particle_count"],
        optional: [],
        fields: {"particle_data":"required","particle_count":"required"}
    },
    "ProjectileEntityPushEffect": {
        required: ["target_direction","push_force"],
        optional: [],
        fields: {"target_direction":"required","push_force":"required"}
    },
    "ProjectileEntityRunFunctionEffect": {
        required: ["function"],
        optional: [],
        fields: {"function":"required"}
    },
    "ProjectileExplosionEffect": {
        required: ["damage_type","explosion_power","fire","break_blocks","can_damage_self"],
        optional: [],
        fields: {"damage_type":"required","explosion_power":"required","fire":"required","break_blocks":"required","can_damage_self":"required"}
    },
    "ProjectileLightningEntityEffect": {
        required: ["data"],
        optional: [],
        fields: {"data":"required"}
    },
    "ProjectileLightningWorldEffect": {
        required: ["data"],
        optional: [],
        fields: {"data":"required"}
    },
    "ProjectilePotionEffect": {
        required: ["potion"],
        optional: [],
        fields: {"potion":"required"}
    },
    "ProjectileTargeting": {
        required: ["general_data","target_type"],
        optional: [],
        fields: {"general_data":"required","target_type":"required"}
    },
    "ProjectileTargeting_GeneralData": {
        required: ["effects"],
        optional: ["tick_rate","chance"],
        fields: {"effects":"required","tick_rate":"optional","chance":"optional"}
    },
    "ProjectileTargeting_GeneralData_Effect": {
        required: ["effect"],
        optional: ["condition"],
        fields: {"effect":"required","condition":"optional"}
    },
    "ProjectileWorldEffect": {
        required: ["world_effect"],
        optional: [],
        fields: {"world_effect":"required"}
    },
    "ProjectileWorldParticleEffect": {
        required: ["particle_data","particle_count"],
        optional: [],
        fields: {"particle_data":"required","particle_count":"required"}
    },
    "ProjectileWorldRunFunctionEffect": {
        required: ["function"],
        optional: [],
        fields: {"function":"required"}
    },
    "PushEffect_Entity": {
        required: ["target_direction","push_force"],
        optional: [],
        fields: {"target_direction":"required","push_force":"required"}
    },
    "RecoveryItems": {
        required: ["item_predicates","percent_restored"],
        optional: [],
        fields: {"item_predicates":"required","percent_restored":"required"}
    },
    "RemovalEntry": {
        required: [],
        optional: [],
        fields: {}
    },
    "ReplaceableValue": {
        required: ["value"],
        optional: ["replace"],
        fields: {"replace":"optional","value":"required"}
    },
    "ReplaceableValue_": {
        required: ["value"],
        optional: ["replace"],
        fields: {"replace":"optional","value":"required"}
    },
    "ReservedManaCost": {
        required: ["type","amount"],
        optional: [],
        fields: {"type":"required","amount":"required"}
    },
    "ResourceLocation": {
        required: ["from_level","texture_resource"],
        optional: [],
        fields: {"from_level":"required","texture_resource":"required"}
    },
    "RunFunctionEffect_Block": {
        required: ["function"],
        optional: [],
        fields: {"function":"required"}
    },
    "RunFunctionEffect_Entity": {
        required: ["function"],
        optional: [],
        fields: {"function":"required"}
    },
    "RunFunctionPenalty": {
        required: ["function"],
        optional: [],
        fields: {"function":"required"}
    },
    "ScalingProportions": {
        required: ["width","height","eye_height"],
        optional: ["scale_multiplier","shadow_multiplier"],
        fields: {"width":"required","height":"required","eye_height":"required","scale_multiplier":"optional","shadow_multiplier":"optional"}
    },
    "SelfTarget": {
        required: ["applied_effects"],
        optional: [],
        fields: {"applied_effects":"required"}
    },
    "SimpleAbilityAnimation": {
        required: ["animation_key","layer","locks_neck","locks_tail"],
        optional: ["transition_length"],
        fields: {"animation_key":"required","layer":"required","transition_length":"optional","locks_neck":"required","locks_tail":"required"}
    },
    "SimpleActivation": {
        required: [],
        optional: ["initial_mana_cost","cast_time","cooldown","notification","can_move_while_casting","sound","animations"],
        fields: {"initial_mana_cost":"optional","cast_time":"optional","cooldown":"optional","notification":"optional","can_move_while_casting":"optional","sound":"optional","animations":"optional"}
    },
    "SimpleTriggerPoint": {
        required: [],
        optional: ["trigger_point"],
        fields: {"trigger_point":"optional"}
    },
    "SkinDefaultParts": {
        required: ["species","stage","parts"],
        optional: ["body","model"],
        fields: {"species":"required","stage":"required","body":"optional","model":"optional","parts":"required"}
    },
    "SkinParts": {
        required: ["key","texture"],
        optional: ["localization","applicable_species","applicable_bodies","average_hue","is_colorable","include_in_randomizer","is_hue_randomizable","is_glowing"],
        fields: {"key":"required","localization":"optional","texture":"required","applicable_species":"optional","applicable_bodies":"optional","average_hue":"optional","is_colorable":"optional","include_in_randomizer":"optional","is_hue_randomizable":"optional","is_glowing":"optional"}
    },
    "SleepOnTreasure": {
        required: [],
        optional: ["nearby_treasure_amount"],
        fields: {"nearby_treasure_amount":"optional"}
    },
    "SmeltItemEffect_Entity": {
        required: [],
        optional: ["item_predicate","progress","grants_experience"],
        fields: {"item_predicate":"optional","progress":"optional","grants_experience":"optional"}
    },
    "Sound": {
        required: ["sound_event","interval"],
        optional: ["start","charging","end","volume","pitch"],
        fields: {"start":"optional","charging":"optional","end":"optional","sound_event":"required","volume":"optional","pitch":"optional","interval":"required"}
    },
    "SpeciesID": {
        required: [],
        optional: [],
        fields: {}
    },
    "SpinEffect_Entity": {
        required: ["level_requirement"],
        optional: ["fluid_types"],
        fields: {"level_requirement":"required","fluid_types":"optional"}
    },
    "StageResource": {
        required: ["growth_icon","default_skin"],
        optional: [],
        fields: {"growth_icon":"required","default_skin":"required"}
    },
    "StageResourcesID": {
        required: [],
        optional: [],
        fields: {}
    },
    "StealFromVillager": {
        required: [],
        optional: [],
        fields: {}
    },
    "StopNaturalGrowth": {
        required: [],
        optional: [],
        fields: {}
    },
    "SummonEntityEffect_Block": {
        required: ["base","entities","max_summons","nbt"],
        optional: ["attribute_scales","is_allied"],
        fields: {"base":"required","entities":"required","max_summons":"required","attribute_scales":"optional","nbt":"required","is_allied":"optional"}
    },
    "SummonEntityEffect_Entity": {
        required: ["base","entities","max_summons","nbt"],
        optional: ["attribute_scales","is_allied"],
        fields: {"base":"required","entities":"required","max_summons":"required","attribute_scales":"optional","nbt":"required","is_allied":"optional"}
    },
    "SummonEntityEffect_NBT": {
        required: [],
        optional: [],
        fields: {}
    },
    "SupplyTrigger": {
        required: ["supply_type","trigger_rate","reduction_rate","regeneration_rate"],
        optional: ["attribute","recovery_items","display_like_hunger_bar","particles_on_trigger"],
        fields: {"supply_type":"required","attribute":"optional","trigger_rate":"required","reduction_rate":"required","regeneration_rate":"required","recovery_items":"optional","display_like_hunger_bar":"optional","particles_on_trigger":"optional"}
    },
    "SwimEffect_Entity": {
        required: ["max_oxygen","fluid_type"],
        optional: [],
        fields: {"max_oxygen":"required","fluid_type":"required"}
    },
    "TargetDirection": {
        required: ["direction"],
        optional: [],
        fields: {"direction":"required"}
    },
    "Targeting": {
        required: ["target_type"],
        optional: [],
        fields: {"target_type":"required"}
    },
    "TeleportEffect_Entity": {
        required: ["target_direction","range"],
        optional: [],
        fields: {"target_direction":"required","range":"required"}
    },
    "TextureSize": {
        required: ["width","height"],
        optional: [],
        fields: {"width":"required","height":"required"}
    },
    "TickingManaCost": {
        required: ["type","amount"],
        optional: [],
        fields: {"type":"required","amount":"required"}
    },
    "UnlockableBehavior": {
        required: [],
        optional: ["unlock_condition","visibility"],
        fields: {"unlock_condition":"optional","visibility":"optional"}
    },
    "Upgrade": {
        required: ["upgrade_type"],
        optional: [],
        fields: {"upgrade_type":"required"}
    },
    "UpgradeAbility": {
        required: [],
        optional: ["ability","level"],
        fields: {"ability":"optional","level":"optional"}
    },
    "UseDragonSoul": {
        required: [],
        optional: [],
        fields: {}
    },
    "UseItemOnBlockEffect_Block": {
        required: ["item"],
        optional: ["probability","sound","valid_blocks"],
        fields: {"item":"required","probability":"optional","sound":"optional","valid_blocks":"optional"}
    },
    "UseItemOnLivingEntityEffect_Entity": {
        required: ["item"],
        optional: ["probability","sound","valid_entities"],
        fields: {"item":"required","probability":"optional","sound":"optional","valid_entities":"optional"}
    },
    "WeatherPredicate": {
        required: [],
        optional: ["is_raining","is_thundering","is_snowing","is_raining_or_snowing"],
        fields: {"is_raining":"optional","is_thundering":"optional","is_snowing":"optional","is_raining_or_snowing":"optional"}
    },
    "WeightedListEntry": {
        required: ["data","weight"],
        optional: [],
        fields: {"data":"required","weight":"required"}
    },
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
    "TargetingType": ["dragonsurvival:area","dragonsurvival:point"],
    "Tier": ["WOOD","STONE","IRON","DIAMOND","GOLD","NETHERITE"],
    "Type": ["living_entity","enemy","tamed","animal","item","experience_orb"],
    "UpgradeType": ["dragonsurvival:experience_points","dragonsurvival:experience_levels","dragonsurvival:dragon_growth","dragonsurvival:item_based","dragonsurvival:condition_based"],
    "Visibility": ["always_visible","always_hidden","visible_if_locked"],
};

export const MCDOC_FIELD_INFO: Record<string, string> = {
    "abilities": "标签将使用 `data/命名空间/tags/dragonsurvival/dragon_ability/` 中指定json文件包含的数据",
    "ability": "想要检查的龙能力ID",
    "ability_bar": "- 请这么写`\"dragonsurvival:textures/gui/custom/casting_bars/sea/cast_bar.png\"`",
    "ability_levels": "检查技能/能力等级",
    "action_type": "- 公式: amount * (max_growth - min_growth) (max_growth与min_growth均取自当前阶段)",
    "actions": "定义能力实际效果",
    "activation": "决定能力如何激活",
    "activation_type": "- `dragonsurvival:channeled` 引导激活(施法成功后按住持续触发)",
    "adjustment_type": "- flat(数值)",
    "alpha": "默认: 0.3",
    "altar_banner": "- 请这么写`\"dragonsurvival:textures/gui/custom/altar/sea/altar_icon.png\"`",
    "amount": "将造成的伤害",
    "amplifier": "- 0=1级、1=2级、...",
    "amplifier_modification": "效果等级修改",
    "animation": "此身体使用的动画文件 (位于`assets/<命名空间>/animations/`下的`.json`文件)",
    "animation_key": "动画键",
    "animations": "(简单激活不支持循环动画)",
    "applicable_bodies": "可应用该组件的身体类型列表",
    "applicable_species": "可应用该组件的物种列表",
    "applied_effects": "定义效果的执行类型以及效果",
    "attempts": "骨粉应用的频率",
    "attribute": "生物属性(https://zh.minecraft.wiki/w/属性)",
    "attribute_scales": "调整召唤实体的属性(https://zh.minecraft.wiki/w/属性)",
    "attributes": "生物属性(https://zh.minecraft.wiki/w/属性)",
    "average_hue": "- 可通过龙之生存mod中自带的`assets\\dragonsurvival\\colors.py`脚本批处理",
    "backpack_offset": "决定背包的放置位置(基础位置是骨骼'BackpackBone')",
    "base": "控制修改效果的持续时间和其他基础设置",
    "base_speed": "- 由其中指定的工具类型决定`基础挖掘速度`",
    "behaviour_data": "基本数据",
    "bettercombat_weapon_offset": "与 Better Combat 模组兼容的武器位置偏移",
    "blend": "(默认:fasle)",
    "block_destruction_growth": "龙行走时能破坏方块的最小成长值",
    "block_effect": "- `dragonsurvival:area_cloud` 生成药水云",
    "block_hit_effects": "- 执行位置: 击中方块的方块中心",
    "block_predicate": "决定龙行走时能够破坏的方块",
    "blocks": "- 若不是上述项则显示为空",
    "blocks_to": "要转换成的方块的加权列表",
    "bodies": "标签将使用 `data/命名空间/tags/dragonsurvival/dragon_body/` 中指定json文件包含的数据",
    "body": "不填写默认所有身体类型都适用",
    "bones_to_hide_for_toggle": "(默认：'WingLeft', 'WingRight', 'SmallWingLeft' 和 'SmallWingRight')",
    "bottom": "- 使用`assets\\<命名空间>\\skin\\parts\\bottom\\`目录下JSON文件中key的值",
    "bounces": "已弹跳的次数(撞到方块或实体后反弹，若达到最大限制则尝试`滞留`)",
    "break_blocks": "能破坏方块",
    "break_speed_multiplier": "- 计算方式: 1 + break_speed_multiplier",
    "can_always_eat": "(默认: false)",
    "can_be_manually_disabled": "(默认: true)",
    "can_damage_self": "能伤害自己",
    "can_hide_wings": "(默认：true)",
    "can_hurt_self": "能伤害自己",
    "can_move": "(默认:fasle)",
    "can_move_while_casting": "(默认：true)",
    "cast_time": "施放能力所需的蓄力时间",
    "categories": "- NEUTRAL(中性)",
    "chance": "(默认：1)",
    "charging": "蓄力开始时的音效",
    "check_for": "- `experience_or` 经验球",
    "claw_texture_slot": "- axe      斧",
    "claws": "- 使用`assets\\<命名空间>\\skin\\parts\\claws\\`目录下JSON文件中key的值",
    "color": "覆盖龙饮食条目工具提示的主色调",
    "color_shift_rate": "默认: 1",
    "colors": "要使用的颜色 - 如果指定了多个，将在它们之间循环",
    "common_hit_effects": "- `执行位置`: 弹射物为中心范围内所有符合的方块中心",
    "condition": "谓词(https://zh.minecraft.wiki/w/谓词)",
    "conditions": "谓词(https://zh.minecraft.wiki/w/谓词)",
    "continuous_mana_cost": "能力激活期间的法力消耗",
    "conversion_data": "转化速率",
    "conversion_rate": "转换量",
    "cooldown": "施法成功后的冷却时间",
    "crouch_height_ratio": "决定下蹲时高度变化多少",
    "crushing_damage_scalar": "决定碾压伤害如何缩放(成长值 * 比例因子)",
    "crushing_growth": "龙行走时能对实体造成碾压伤害的最小成长值",
    "custom_icon": "- 请这么写`\"dragonsurvival:textures/ability_effect/fire_immunity.png\"`",
    "custom_stage_progression": "标签将使用 `data/命名空间/tags/dragonsurvival/dragon_stage/` 中指定json文件包含的数据",
    "damage_type": "伤害类型(https://zh.minecraft.wiki/w/伤害类型定义格式)",
    "damage_types": "伤害类型(https://zh.minecraft.wiki/w/伤害类型定义格式)",
    "data": "闪电数据",
    "default_icon": "默认GUI图标，在当前物种没有特定图标时使用",
    "default_skin": "- 会出现在物种选择界面、选择测试资源包的时候作为皮肤",
    "delay": "药水云生效前的延迟时间",
    "destruction_data": "破坏行为数据",
    "direction": "- `north` 北",
    "display_like_hunger_bar": "(默认:false)",
    "display_type": "- `simple_shader` 在方块表面简单的覆盖一层着色",
    "distance": "最大允许距离为64",
    "downgrade_items": "可用于降级的物品",
    "dragon_body": "例如 `dragonsurvival:center`",
    "dragon_offset": "(默认：[0, 0, 0])",
    "dragon_species": "检查玩家是否属于特定的物种",
    "dragon_stage": "例如 `dragonsurvival:adult`",
    "drop_loot": "(默认：false)",
    "duration": "粒子生命周期",
    "duration_modification": "持续时间修改",
    "duration_multiplier": "(默认值：1)",
    "early_removal_condition": "谓词(https://zh.minecraft.wiki/w/谓词)",
    "eat_seconds": "默认为`1.6`",
    "effect": "- entity_effect",
    "effect_particles": "(默认：false)",
    "effect_type": "- `dragonsurvival:cooldown_recovery` 能力/技能冷却时间恢复",
    "effects": "定义将执行的效果列表",
    "emotes": "- 或者直接在此填写(但是不建议，可能影响可读性)",
    "empty": "- 请这么写`\"dragonsurvival:textures/gui/custom/mana_icons/sea/empty.png\"`",
    "end": "施法结束时的音效",
    "entities": "否则每个实体将具有相同的权重(因此相同几率)",
    "entity_condition": "谓词(https://zh.minecraft.wiki/w/谓词)",
    "entity_effect": "- `dragonsurvival:push` 推动实体",
    "entity_hit_condition": "谓词(https://zh.minecraft.wiki/w/谓词)",
    "entity_hit_effects": "- 执行位置：被击中的实体",
    "entity_predicate": "决定行走时碾压伤害作用的实体",
    "entity_types": "要检查的实体类型",
    "exclude_this": "(默认: true)",
    "experience_cost": "升级所需的经验点数",
    "experience_type": "- `points` 按经验点数计算",
    "explosion_power": "爆炸强度",
    "expression": "- 默认值: `\"amount * scale\"`",
    "extra": "- 使用`assets\\<命名空间>\\skin\\parts\\extra\\`目录下JSON文件中key的值",
    "extra1": "- 使用`assets\\<命名空间>\\skin\\parts\\extra\\`目录下JSON文件中key的值",
    "extra2": "- 使用`assets\\<命名空间>\\skin\\parts\\extra\\`目录下JSON文件中key的值",
    "extra3": "- 使用`assets\\<命名空间>\\skin\\parts\\extra\\`目录下JSON文件中key的值",
    "extra4": "- 使用`assets\\<命名空间>\\skin\\parts\\extra\\`目录下JSON文件中key的值",
    "extra5": "- 使用`assets\\<命名空间>\\skin\\parts\\extra\\`目录下JSON文件中key的值",
    "extra6": "- 使用`assets\\<命名空间>\\skin\\parts\\extra\\`目录下JSON文件中key的值",
    "extra7": "- 使用`assets\\<命名空间>\\skin\\parts\\extra\\`目录下JSON文件中key的值",
    "eye_height": "眼睛高度(视角高度)",
    "eye_in_fluid": "实体眼睛是否处于特定流体中(如水中、熔岩中)",
    "eyes": "- 使用`assets\\<命名空间>\\skin\\parts\\eyes\\`目录下JSON文件中key的值",
    "fire": "能产生火焰",
    "flight_was_granted": "若相关配置启用，原初锚也可将其设为'true'",
    "fluid_type": "实体可以游泳的流体类型",
    "fluid_types": "(如果未指定，则只能在空中使用)",
    "font": "(默认：dragonsurvival:food_tooltip_icon_font)",
    "food_sprites": "- 请这么写`\"dragonsurvival:textures/gui/custom/food_icons/sea_food_icons.png\"`",
    "food_tooltip": "确定饮食条目的工具提示渲染方式",
    "from_level": "(该条目定义了一个阶梯函数，每个`from_level`决定了对应区间的起点)",
    "from_predicate": "决定哪些方块将被转换",
    "full": "- 请这么写`\"dragonsurvival:textures/gui/custom/mana_icons/sea/full.png\"`",
    "function": "Minecraft函数",
    "general_data": "决定自定义弹射物的效果",
    "glow_skin": "- 请这么写`\"dragonsurvival:textures/dragon/sea_dragon/adult_glow.png\"`",
    "grants_experience": "(默认：true)",
    "growth": "检查成长值的原始数值",
    "growth_crystal": "成长水晶 - 根据阶段内的进度填充",
    "growth_icon": "- 会出现在龙背包的右上角、物种旗帜左上角等位置",
    "growth_in_ticks": "(该字段在默认的'is_natural_growth_stopped'条件中使用)",
    "growth_items": "可用于增加(或减少)龙成长值的物品",
    "growth_left_arrow": "(如果未指定，将使用通用图标)",
    "growth_percentage": "检查在当前阶段内的完成度(0-100%)",
    "growth_range": "阶段的最小和最大成长值",
    "growth_requirement": "解锁该等级所需的龙成长值",
    "growth_right_arrow": "(如果未指定，将使用通用图标)",
    "growth_type": "- set(设置)",
    "harvest_bonus": "- 4 = 钻石制/下界合金制",
    "has_duration_effect": "是否拥有特定的，由 `dragonsurvival:modifier` 实现的持续效果",
    "has_uuid": "实体是否具有特定的UUID",
    "health_percentage": "实体健康值百分比范围",
    "height": "碰撞箱高度",
    "height_starts_below": "(适用于以施法者所站地面为目标的情况)",
    "horns": "- 使用`assets\\<命名空间>\\skin\\parts\\horns\\`目录下JSON文件中key的值",
    "hover_icon": "- 请这么写`\"dragonsurvival:textures/gui/custom/stage/sea/right_arrow_hover.png\"`",
    "human_offset": "(默认：[0, 0, 0])",
    "hunger_gain": "直接增加或减少玩家的饥饿值(食物条)",
    "icon": "- 请这么写`\"dragonsurvival:textures/gui/custom/stage/sea/right_arrow_main.png\"`",
    "id": "要创建的实例的唯一ID",
    "ignite_probability": "点燃概率",
    "ignite_ticks": "点燃时间(ticks)",
    "ignores_items_and_experience": "忽略物品与经验球",
    "include_in_randomizer": "(默认: true)",
    "initial_mana_cost": "法力消耗(在施法时间完成时消耗)",
    "interval": "决定音效播放的频率(计算方式为 emote_ticks % interval == 0)",
    "is_allied": "(这也意味着可以通过相关按键绑定改变攻击和移动行为)",
    "is_colorable": "(默认: true)",
    "is_default": "(默认：false)",
    "is_flying": "用于检测龙是否正在飞行(仅检测龙生的飞行)",
    "is_glowing": "(默认: false)",
    "is_growth_stopped": "检查龙的成长是否被手动停止",
    "is_hidden": "(默认：false)",
    "is_hue_randomizable": "(默认: true)",
    "is_impact_projectile": "(默认: false)",
    "is_natural_growth_stopped": "决定何时停止龙自然成长的条件",
    "is_nearby_entity": "附近是否存在符合条件的实体",
    "is_raining": "正在下雨",
    "is_raining_or_snowing": "- 性能优于单独检测雨天和雪天",
    "is_snowing": "正在下雪",
    "is_thundering": "处于雷暴天气",
    "item": "需要转化成的物品id",
    "item_conversions": "一个转换的列表",
    "item_from": "检查从什么物品进行转换",
    "item_predicate": "决定哪些物品将被转换",
    "item_predicates": "能够缓解此缺陷的物品列表(使用物品谓词)",
    "item_to": "检查转换成的物品",
    "items": "命名空间和路径中允许使用正则表达式",
    "items_per_level": "每个等级的有效物品(用于解锁该等级)",
    "items_to": "要转换成的物品的加权列表",
    "key": "组件标识符，应与JSON文件名一致",
    "keys": "https://zh.minecraft.wiki/w/键控代码",
    "layer": "动画层",
    "level": "等级等于多少时触发",
    "level_requirement": "解锁该等级所需的经验等级",
    "lifespan": "(单位：ticks)",
    "lingering_ticks": "(单位：ticks)",
    "localization": "- 若不填写将使用`skin_part.<命名空间>.<物种id>.<该JSON定义的key值>`作为本地化键, 例如`skin_part.dragonsurvival.sea_dragon.base_1`",
    "locks_head": "(默认:fasle)",
    "locks_neck": "锁定脖子",
    "locks_tail": "(默认:fasle)",
    "looking_at_block": "实体是否看向特定的方块",
    "looping": "施法中的循环音效",
    "looping_animation_key": "这里需要填入动画id",
    "loops": "(默认:fasle)",
    "magic": "- 使用`assets\\<命名空间>\\skin\\parts\\magic\\`目录下JSON文件中key的值",
    "main_particle": "主要粒子",
    "mana_handling": "特别是经验值(等级)如何与之交互(例如，当所有法力耗尽时，将经验值转换为法力)",
    "mana_per_level": "(默认的'mana_handling'条目使用值0.25，表示每4个经验等级=1点法力)",
    "mana_sprites": "(以物种的主色调着色)",
    "mana_xp_conversion": "(默认的'mana_handling'条目使用值0.1，表示1点法力=10点经验值)",
    "marked_by_ender_dragon": "(需满足末影龙存活且方块处于充能状态)",
    "max_amount": "限制单次最多移除多少个状态效果",
    "max_bounces": "最大弹跳的次数(撞到方块或实体后反弹，若达到最大限制则尝试滞留)",
    "max_duration": "并且，在达到该限制后会尝试执行带有`\"trigger_point\":\"channel_completion\"`的`actions`项",
    "max_lifespan": "(单位：ticks)",
    "max_lingering_ticks": "(单位：ticks)",
    "max_mana_from_levels": "(默认的'mana_handling'条目使用值9，表示在经验等级36时达到上限)",
    "max_movement_distance": "最大移动距离(若达到最大限制则尝试移除实体)",
    "max_oxygen": "(值'-1'表示无限氧气)",
    "max_summons": "每个实例最多召唤的实体数量",
    "maximum_effect_level": "只移除低于或等于指定等级的效果",
    "maximum_level": "最大技能等级",
    "maximum_saturation": "设置通过此能力获得的饱和度上限",
    "maximum_usages": "决定此物品可以使用多少次(默认：无限)",
    "misc_resources": "指向物种相关各种资源(纹理等)的位置",
    "model": "(不填写默认使用`dragonsurvival:dragon_model`)",
    "modifications": "定义要修改的效果",
    "modifiers": "(在范围内意味着如果阶段范围在10到15之间，当前成长值为12，则\"等级\"将为2)",
    "mounting_offset": "决定骑乘者的放置位置",
    "movement_distance": "已移动的距离(若达到最大限制则尝试移除实体)",
    "multiplier": "值'0'表示目标将对此伤害免疫",
    "name": "注册的自定义弹射物名称",
    "nbt": "调整召唤实体的nbt",
    "nearby_treasure_amount": "睡在指定片数以上的财宝堆中才能触发",
    "not_enough_mana": "没有足够的法力来施法时的提示信息",
    "notification": "(默认情况下，每个能力都会有一个包含\"法力不足\"消息的通知条目)",
    "number_of_projectiles": "单次发射的弹射物数量",
    "nutrition": "吃掉后给予的饥饿值(上限为20.0)",
    "nutrition_icon": "码位字符串(https://zh.minecraft.wiki/w/自定义字体#码位字符串)",
    "offset_per_scale_above_one": "(默认：[0, 0, 0])",
    "on_destroy_effects": "- `执行位置`: 弹射物为中心范围内所有符合的方块中心",
    "operation": "对数据的操作方式",
    "oxygen_bonus": "控制提供的氧气加成量",
    "particle": "粒子效果",
    "particle_count": "粒子数量",
    "particle_data": "粒子数据",
    "particle_rate": "默认: 10",
    "particle_trail": "粒子效果",
    "particles": "粒子",
    "particles_on_trigger": "当惩罚效果触发时使用的粒子效果",
    "parts": "该物种此阶段将使用的默认皮肤组件",
    "penalties": "标签将使用 `data/命名空间/tags/dragonsurvival/dragon_penalty/` 中指定json文件包含的数据",
    "penalty_trigger": "- `dragonsurvival:hit_by_water_potion` 被药水击中触发",
    "penalty_type": "- `dragonsurvival:run_function` 运行函数",
    "percent_restored": "使用该物品后缺陷条的恢复比例(使用百分比)",
    "percentage": "目标实体最大生命值的百分比(1 = 100%)将被治疗",
    "piercing_level": "此值将会复制到同名nbt中",
    "pitch": "(默认：1)",
    "player_hunger": "玩家饥饿值范围",
    "position_offset": "(默认：[0, 0, 0])",
    "potion": "药水云将携带的药水效果",
    "power": "爆炸强度",
    "precise_amount": "每级增量值",
    "precise_base": "基础值",
    "primary_color": "通用法力图标颜色",
    "probability": "0 (0%) 到 1 (100%)",
    "progress": "(如果未指定进度，物品将立即熔炼完成)",
    "projectile_data": "- 或者直接在此填写(但是不建议，由于数据过多影响可读性，该mcdoc也未在此实现)",
    "projectile_level": "(复制自召唤该实体的技能等级)",
    "projectile_spread": "弹道扩散",
    "properties": "定义具体的食物效果",
    "push_force": "控制施加推力的大小(可为负数)",
    "radius": "作用半径",
    "range": "最大距离",
    "range_multiplier": "默认范围基于施法者的体型比例",
    "recovery": "- 请这么写`\"dragonsurvival:textures/gui/custom/mana_icons/sea/recovery.png\"`",
    "recovery_items": "可用于缓解或消除缺陷的特殊物品列表",
    "reduction_rate": "当触发条件满足时，缺陷条减少的比例(使用百分比)",
    "regeneration_rate": "当触发条件不再满足时，缺陷条恢复的比例(使用百分比)",
    "require_previous": "如果禁用，则最高匹配条件的等级决定当前等级",
    "reserved": "- 请这么写`\"dragonsurvival:textures/gui/custom/mana_icons/sea/reserved.png\"`",
    "resources": "空/无效 数据可能导致游戏崩溃",
    "retain_effects": "(默认:：false)",
    "rotation_offset": "(默认：[0, 0, 0])",
    "saturation": "吃掉后恢复的饱和度",
    "saturation_gain": "直接增加玩家的饱和度(隐藏的饱食度)",
    "saturation_icon": "码位字符串(https://zh.minecraft.wiki/w/自定义字体#码位字符串)",
    "scale": "粒子缩放",
    "scale_multiplier": "(默认：1)",
    "scaling_proportions": "高度和宽度尺寸如何计算(使用实体的当前比例)",
    "secondary_color": "龙饮食工具提示边框颜色",
    "secondary_particle": "次级粒子",
    "shadow_multiplier": "(默认：1)",
    "should_remove_automatically": "- 能力的目标条件不再匹配(仅适用于施法者的实例)",
    "show_icon": "(默认：true)",
    "skin": "- 请这么写`\"dragonsurvival:textures/dragon/sea_dragon/adult.png\"`",
    "sound": "动画所用音效",
    "sound_event": "音效id",
    "spawn_position": "- 该项仅适用于`end_platforms.json - 末地平台`",
    "spawns_fire": "产生火焰",
    "species": "指定该 默认组件表 将映射至的物种id",
    "speed": "动画播放速度",
    "speed_per_growth": "speed_per_growth * 成长值",
    "spikes": "- 使用`assets\\<命名空间>\\skin\\parts\\spikes\\`目录下JSON文件中key的值",
    "spin_was_granted": "若相关配置启用，原初锚也可将其设为'true'",
    "spread": "控制粒子发射的扩散角度或范围",
    "sprint_speed": "当您太接近实体时使用此值",
    "stage": "指定该 默认组件表 将映射至的物种阶段id",
    "stage_specific": "检查龙玩家的成长阶段和成长进度",
    "start": "施法开始时的音效",
    "start_and_charging": "(例如 吐息喷吐前的蓄力动画)",
    "starting_animation_key": "这里需要填入动画id",
    "starting_growth": "初始成长值将为此值或第一阶段的最小成长值",
    "state": "指定方块数据",
    "structure": "- 该项仅适用于`end_platforms.json - 末地平台`",
    "sun_light_level": "检测天空光照等级",
    "supply_type": "图标规格：9x9像素单图标，横向拼接为27x9像素的PNG图片",
    "swirls": "是否启用漩涡效果",
    "target_conditions": "谓词(https://zh.minecraft.wiki/w/谓词)",
    "target_direction": "决定施加推力的方向",
    "target_selection": "定义如何选择目标以及效果的定义",
    "target_type": "- `dragonsurvival:point` 执行者当前位置",
    "targeting_mode": "- `all_except_self` 选中除施法者之外的任何目标",
    "teeth": "- 使用`assets\\<命名空间>\\skin\\parts\\teeth\\`目录下JSON文件中key的值",
    "texture": "贴图数据",
    "texture_entries": "空/无效 数据可能导致游戏崩溃",
    "texture_resource": "(需要省略'textures/entity/projectiles'路径和'.png'文件扩展名)",
    "texture_size": "贴图大小(默认512x512)",
    "third_person": "(默认:fasle)",
    "tick_rate": "(默认: 0)",
    "ticking_effects": "- `执行位置`: 弹射物为中心范围内所有符合的方块中心",
    "ticks_until_grown": "达到最大成长所需的刻数(可以在1刻到1年之间指定)(20刻 = 1秒)",
    "tier": "工具类型",
    "tiers": "将使用的工具类型",
    "tool": "指定所用的工具",
    "trail_particle": "拖尾粒子",
    "transition_length": "(默认：0)",
    "translation_override": "- 如果不提供，使用`animationKey`作为翻译键",
    "trigger": "定义缺陷触发器",
    "trigger_point": "- `default` 默认（施法成功后触发）",
    "trigger_rate": "缺陷条减少的速度(检查条件是'game_time % trigger_rate == 0')",
    "trigger_type": "- `dragonsurvival:on_key_released` 当按键施放时",
    "type": "等级依赖函数(https://zh.minecraft.wiki/w/魔咒数据格式/等级依赖函数)",
    "type_data": "决定自定义弹射物的外观",
    "unlock_condition": "谓词(https://zh.minecraft.wiki/w/谓词)",
    "unlockable_behavior": "(默认每个物种使用相同的条目，其值在'mana_handling'字段规范中提及)",
    "upgrade": "(如果未定义升级，最大等级将为1)",
    "upgrade_type": "- `dragonsurvival:condition_based` 通过条件判断升级",
    "usage_blocked": "谓词(https://zh.minecraft.wiki/w/谓词)",
    "use_claw": "(默认: false)",
    "using_converts_to": "与牛奶桶的工作方式类似",
    "valid_blocks": "决定哪些方块将被破坏",
    "valid_effects": "指定要移除状态效果列表",
    "valid_entities": "过滤哪些实体可以成为目标",
    "visibility": "- visible_if_locked 如果锁定则可见",
    "volume": "(默认：1)",
    "walk_speed": "实体逃跑时的行走移动速度修正值(默认：1)",
    "weather_predicate": "天气相关的判断条件(内部判断用的逻辑是and)",
    "weight": "权重值",
    "width": "碰撞箱宽度",
    "world_effect": "- `dragonsurvival:run_function` 运行函数",
};

export const MCDOC_DISPATCH: Record<string, Record<string, string>> = {
    "dragonsurvival:ability_block_effect": {"dragonsurvival:bonemeal":"BonemealEffect_Block","dragonsurvival:conversion":"BlockConversionEffect_Block","dragonsurvival:summon_entity":"SummonEntityEffect_Block","dragonsurvival:fire":"FireEffect_Block","dragonsurvival:area_cloud":"AreaCloudEffect_Block","dragonsurvival:block_break":"BlockBreakEffect_Block","dragonsurvival:particle":"ParticleEffect_Block","dragonsurvival:run_function":"RunFunctionEffect_Block","dragonsurvival:use_item":"UseItemOnBlockEffect_Block","dragonsurvival:explosion":"ExplodeBlockEffect_Block","dragonsurvival:block_harvest":"BlockHarvestEffect_Block"},
    "dragonsurvival:ability_entity_effect": {"dragonsurvival:damage":"DamageEffect_Entity","dragonsurvival:modifier":"ModifierEffect_Entity","dragonsurvival:potion":"PotionEffect_Entity","dragonsurvival:projectile":"ProjectileEffect_Entity","dragonsurvival:summon_entity":"SummonEntityEffect_Entity","dragonsurvival:damage_modification":"DamageModificationEffect_Entity","dragonsurvival:breath_particles":"BreathParticlesEffect_Entity","dragonsurvival:ignite":"IgniteEffect_Entity","dragonsurvival:harvest_bonus":"HarvestBonusEffect_Entity","dragonsurvival:on_attack":"OnAttackEffect_Entity","dragonsurvival:flight":"FlightEffect_Entity","dragonsurvival:spin":"SpinEffect_Entity","dragonsurvival:item_conversion":"ItemConversionEffect_Entity","dragonsurvival:swim":"SwimEffect_Entity","dragonsurvival:effect_modification":"EffectModificationEffect_Entity","dragonsurvival:particle":"ParticleEffect_Entity","dragonsurvival:glow":"GlowEffect_Entity","dragonsurvival:oxygen_bonus":"OxygenBonusEffect_Entity","dragonsurvival:block_vision":"BlockVisionEffect_Entity","dragonsurvival:run_function":"RunFunctionEffect_Entity","dragonsurvival:smelting":"SmeltItemEffect_Entity","dragonsurvival:heal":"HealEffect_Entity","dragonsurvival:teleport":"TeleportEffect_Entity","dragonsurvival:push":"PushEffect_Entity","dragonsurvival:hunger":"HungerEffect_Entity","dragonsurvival:effect_removal":"MobEffectRemovalEffect_Entity","dragonsurvival:use_item":"UseItemOnLivingEntityEffect_Entity","dragonsurvival:dragon_growth":"DragonGrowthEffect_Entity","dragonsurvival:mana_recovery":"ManaRecoveryEffect_Entity","dragonsurvival:experience":"ExperienceEffect","dragonsurvival:cooldown_recovery":"CooldownRecoveryEffect"},
    "dragonsurvival:ability_targeting": {"dragonsurvival:area":"AreaTarget","dragonsurvival:dragon_breath":"DragonBreathTarget","dragonsurvival:looking_at":"LookingAtTarget","dragonsurvival:self":"SelfTarget","dragonsurvival:disc":"DiscTarget"},
    "dragonsurvival:activation": {"dragonsurvival:passive":"PassiveActivation","dragonsurvival:simple":"SimpleActivation","dragonsurvival:channeled":"ChanneledActivation"},
    "dragonsurvival:activation_trigger": {"dragonsurvival:constant":"ConstantTrigger","dragonsurvival:on_self_hit":"OnSelfHit","dragonsurvival:on_target_hit":"OnTargetHit","dragonsurvival:on_target_killed":"OnTargetKilled","dragonsurvival:on_death":"OnDeath","dragonsurvival:on_block_break":"OnBlockBreak","dragonsurvival:on_key_pressed":"OnKeyPressed","dragonsurvival:on_key_released":"OnKeyReleased"},
    "dragonsurvival:animatioin": {"dragonsurvival:passive":"PassiveAnimations","dragonsurvival:channeled":"ChanneledAnimations"},
    "dragonsurvival:penalty_effect": {"dragonsurvival:take_damage":"DamagePenalty","dragonsurvival:mob_effect":"MobEffectPenalty","dragonsurvival:item_blacklist":"ItemBlacklistPenalty","dragonsurvival:damage_modification":"DamageModificationPenalty","dragonsurvival:fear":"FearPenalty","dragonsurvival:modifier":"ModifierPenalty","dragonsurvival:effect_modification":"EffectModificationPenalty","dragonsurvival:run_function":"RunFunctionPenalty"},
    "dragonsurvival:penalty_trigger": {"dragonsurvival:supply":"SupplyTrigger","dragonsurvival:instant":"InstantTrigger","dragonsurvival:item_used":"ItemUsedTrigger","dragonsurvival:hit_by_projectile":"HitByProjectileTrigger","dragonsurvival:hit_by_water_potion":"HitByWaterPotionTrigger"},
    "dragonsurvival:projectile_block_effect": {"dragonsurvival:particle":"ProjectileBlockParticleEffect","dragonsurvival:run_function":"ProjectileBlockRunFunctionEffect","dragonsurvival:area_cloud":"ProjectileAreaCloudEffect"},
    "dragonsurvival:projectile_entity_effect": {"dragonsurvival:damage":"ProjectileDamageEffect","dragonsurvival:potion":"ProjectilePotionEffect","dragonsurvival:lightning":"ProjectileLightningEntityEffect","dragonsurvival:particle":"ProjectileEntityParticleEffect","dragonsurvival:run_function":"ProjectileEntityRunFunctionEffect","dragonsurvival:push":"ProjectileEntityPushEffect"},
    "dragonsurvival:projectile_targeting": {"dragonsurvival:area":"AreaTarget"},
    "dragonsurvival:projectile_world_effect": {"dragonsurvival:explosion":"ProjectileExplosionEffect","dragonsurvival:lightning":"ProjectileLightningWorldEffect","dragonsurvival:particle":"ProjectileWorldParticleEffect","dragonsurvival:run_function":"ProjectileWorldRunFunctionEffect"},
    "dragonsurvival:sound": {"dragonsurvival:passive":"PassiveSound","dragonsurvival:channeled":"ChanneledSound"},
    "dragonsurvival:trigger_point": {"dragonsurvival:passive":"PassiveTriggerPoint","dragonsurvival:simple":"SimpleTriggerPoint","dragonsurvival:channeled":"ChanneledTriggerPoint"},
    "dragonsurvival:upgrade_type": {"dragonsurvival:experience_points":"ExperiencePointsUpgrade","dragonsurvival:experience_levels":"ExperienceLevelUpgrade","dragonsurvival:dragon_growth":"DragonGrowthUpgrade","dragonsurvival:item_based":"ItemUpgrade","dragonsurvival:condition_based":"ConditionUpgrade"},
    "minecraft:entity": {"dragonsurvival:generic_arrow_entity":"GenericArrowEntity","dragonsurvival:generic_ball_entity":"GenericBallEntity"},
    "minecraft:entity_sub_predicate": {"dragonsurvival:dragon_predicate":"DragonPredicate","dragonsurvival:entity_check_predicate":"EntityCheckPredicate","dragonsurvival:custom_predicates":"CustomPredicates"},
    "minecraft:particle": {"\"dragonsurvival:fire\",\"dragonsurvival:large_fire\",\"dragonsurvival:poison\",\"dragonsurvival:large_poison\",\"dragonsurvival:sun\",\"dragonsurvival:large_sun\",\"dragonsurvival:lightning\",\"dragonsurvival:large_lightning\",":"DragonSurvival_Particle","\"dragonsurvival:treasure\"":"DragonSurvival_ColorParticle","\"dragonsurvival:sea_sweep\"":"DragonSurvival_SeaSweepParticle"},
    "minecraft:resource": {"dragonsurvival:custom_soul_icons":"CustomSoulIcons","dragonsurvival:skin_default_parts":"SkinDefaultParts","dragonsurvival:skin_parts":"SkinParts","dragonsurvival:data_map_dragon_species":"DataMapDragonSpecies","dragonsurvival:dragon_ability":"DragonAbility","dragonsurvival:activation_trigger":"ActivationTrigger","dragonsurvival:upgrade_type":"Upgrade","dragonsurvival:ability_targeting":"Targeting","dragonsurvival:ability_entity_effect":"EntityEffect","dragonsurvival:ability_block_effect":"BlockEffect","dragonsurvival:dragon_body":"DragonBody","dragonsurvival:dragon_emote_set":"DragonEmoteSet","dragonsurvival:dragon_penalty":"DragonPenalty","dragonsurvival:penalty_effect":"PenaltyEffect","dragonsurvival:penalty_trigger":"PenaltyTrigger","dragonsurvival:dragon_species":"DragonSpecies","dragonsurvival:dragon_stage":"DragonStage","dragonsurvival:projectile_data":"ProjectileData","dragonsurvival:projectile_world_effect":"ProjectileWorldEffect","dragonsurvival:projectile_block_effect":"ProjectileBlockEffect","dragonsurvival:projectile_entity_effect":"ProjectileEntityEffect"},
};

export const KIND_TO_STRUCT: Record<string, string> = {"dragon_ability":"DragonAbility","dragon_species":"DragonSpecies","dragon_stage":"DragonStage","dragon_penalty":"DragonPenalty","projectile_data":"ProjectileData","dragon_body":"DragonBody","dragon_emote_set":"DragonEmoteSet"};
