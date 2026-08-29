import * as vscode from 'vscode';
import { MCDOC_FIELD_INFO } from './mcdocSchema';

const KIND_PATTERNS: Record<string, RegExp> = {
    dragon_ability: /\/data\/[^/]+\/dragonsurvival\/dragon_ability\//i,
    dragon_species: /\/data\/[^/]+\/dragonsurvival\/dragon_species\//i,
    dragon_stage: /\/data\/[^/]+\/dragonsurvival\/dragon_stage\//i,
    dragon_penalty: /\/data\/[^/]+\/dragonsurvival\/dragon_penalty\//i,
    projectile_data: /\/data\/[^/]+\/dragonsurvival\/projectile_data\//i,
    dragon_body: /\/data\/[^/]+\/dragonsurvival\/dragon_body\//i,
    dragon_emote_set: /\/data\/[^/]+\/dragonsurvival\/dragon_emote_set\//i
};

function formatInfo(info: string): string {
    return info
        .replace(/\n/g, '\n\n')
        .replace(/[。；]/g, m => m + '\n\n')
        .replace(/\s+-\s+/g, '\n- ');
}

function field(name: string, insert: string, detail: string): vscode.CompletionItem {
    const item = new vscode.CompletionItem(name, vscode.CompletionItemKind.Field);
    item.insertText = new vscode.SnippetString(insert);
    item.detail = detail;
    if (MCDOC_FIELD_INFO[name]) {
        item.documentation = new vscode.MarkdownString(formatInfo(MCDOC_FIELD_INFO[name]));
    }
    return item;
}

function value(name: string, insert: string, detail: string): vscode.CompletionItem {
    const item = new vscode.CompletionItem(name, vscode.CompletionItemKind.EnumMember);
    const clean = insert.replace(/^"+|"+$/g, '');
    item.insertText = clean;
    item.filterText = name;
    item.detail = detail;
    if (MCDOC_FIELD_INFO[name]) {
        item.documentation = new vscode.MarkdownString(formatInfo(MCDOC_FIELD_INFO[name]));
    }
    return item;
}

function abilityItems(): vscode.CompletionItem[] {
    return [
        field('actions', '"actions": []', '能力动作列表'),
        field('activation', '"activation": {\n\t"activation_type": "dragonsurvival:simple"\n}', '激活方式'),
        field('icon', '"icon": {\n\t"texture_entries": []\n}', '技能图标'),
        field('upgrade', '"upgrade": {\n\t"upgrade_type": "dragonsurvival:experience_points",\n\t"maximum_level": 1\n}', '升级配置'),
        field('usage_blocked', '"usage_blocked": {\n\t"condition": "minecraft:random_chance",\n\t"chance": 0.5\n}', '使用限制'),
        field('can_be_manually_disabled', '"can_be_manually_disabled": true', '可手动禁用'),
        field('target_selection', '"target_selection": {\n\t"target_type": "dragonsurvival:self",\n\t"applied_effects": {}\n}', '目标选择'),
        field('trigger_rate', '"trigger_rate": 0', '触发频率'),
        field('trigger_point', '"trigger_point": "default"', '触发点'),
        field('initial_mana_cost', '"initial_mana_cost": 1', '初始魔力消耗'),
        field('continuous_mana_cost', '"continuous_mana_cost": {\n\t"type": "ticking",\n\t"amount": 1\n}', '持续魔力消耗'),
        field('cast_time', '"cast_time": 1', '施法时间'),
        field('cooldown', '"cooldown": 1', '冷却'),
        field('max_duration', '"max_duration": 1', '最大持续时间'),
        field('notification', '"notification": {\n\t"not_enough_mana": "",\n\t"usage_blocked": ""\n}', '通知'),
        field('can_move_while_casting', '"can_move_while_casting": true', '移动时施法'),
        field('sound', '"sound": {\n\t"start": "",\n\t"end": ""\n}', '声音'),
        field('animations', '"animations": {\n\t"start_and_charging": {\n\t\t"animation_key": "",\n\t\t"layer": "BASE",\n\t\t"locks_neck": false,\n\t\t"locks_tail": false\n\t}\n}', '动画'),
        field('upgrade_type', '"upgrade_type": "dragonsurvival:experience_points"', '升级类型'),
        field('maximum_level', '"maximum_level": 1', '最大等级'),
        field('experience_cost', '"experience_cost": 1', '经验消耗'),
        field('level_requirement', '"level_requirement": 1', '等级要求'),
        field('growth_requirement', '"growth_requirement": 1', '成长要求'),
        field('items_per_level', '"items_per_level": []', '每级物品'),
        field('downgrade_items', '"downgrade_items": ""', '降级物品'),
        field('conditions', '"conditions": []', '条件列表'),
        field('require_previous', '"require_previous": false', '需要前置'),
        field('effect_type', '"effect_type": ""', '效果类型')
    ];
}

function abilityValues(): vscode.CompletionItem[] {
    const items: vscode.CompletionItem[] = [];
    const activationTypes = ['passive', 'simple', 'channeled'];
    for (const type of activationTypes) {
        items.push(value(`dragonsurvival:${type}`, `"dragonsurvival:${type}"`, '激活类型'));
    }
    const upgradeTypes = ['experience_points', 'experience_levels', 'dragon_growth', 'item_based', 'condition_based'];
    for (const type of upgradeTypes) {
        items.push(value(`dragonsurvival:${type}`, `"dragonsurvival:${type}"`, '升级类型'));
    }
    const targetTypes = ['area', 'dragon_breath', 'looking_at', 'self', 'disc'];
    for (const type of targetTypes) {
        items.push(value(`dragonsurvival:${type}`, `"dragonsurvival:${type}"`, '目标类型'));
    }
    const entityEffects = [
        'damage', 'modifier', 'potion', 'projectile', 'summon_entity', 'damage_modification',
        'breath_particles', 'ignite', 'harvest_bonus', 'on_attack', 'flight', 'spin',
        'item_conversion', 'swim', 'effect_modification', 'particle', 'glow', 'oxygen_bonus',
        'block_vision', 'run_function', 'smelting', 'heal', 'teleport', 'push', 'hunger',
        'effect_removal', 'use_item', 'dragon_growth', 'mana_recovery', 'experience',
        'cooldown_recovery'
    ];
    for (const type of entityEffects) {
        items.push(value(`dragonsurvival:${type}`, `"dragonsurvival:${type}"`, '实体效果类型'));
    }
    const blockEffects = [
        'bonemeal', 'conversion', 'summon_entity', 'fire', 'area_cloud', 'block_break',
        'particle', 'run_function', 'use_item', 'explosion', 'block_harvest'
    ];
    for (const type of blockEffects) {
        items.push(value(`dragonsurvival:${type}`, `"dragonsurvival:${type}"`, '方块效果类型'));
    }
    const triggerPoints = ['default', 'charging', 'channel_completion'];
    for (const point of triggerPoints) {
        items.push(value(point, `"${point}"`, '触发点'));
    }
    return items;
}

function speciesItems(): vscode.CompletionItem[] {
    return [
        field('abilities', '"abilities": "#namespace:id"', '能力标签/引用'),
        field('penalties', '"penalties": "#namespace:id"', '惩罚标签/引用'),
        field('misc_resources', '"misc_resources": {}', '杂项资源'),
        field('starting_growth', '"starting_growth": 0', '初始成长值'),
        field('unlockable_behavior', '"unlockable_behavior": {}', '解锁行为'),
        field('mana_handling', '"mana_handling": {}', '法力处理'),
        field('custom_stage_progression', '"custom_stage_progression": ""', '自定义阶段进度'),
        field('bodies', '"bodies": ""', '龙体列表'),
        field('food_sprites', '"food_sprites": ""', '食物图标'),
        field('mana_sprites', '"mana_sprites": {\n\t"full": "",\n\t"reserved": "",\n\t"recovery": "",\n\t"empty": ""\n}', '魔力图标'),
        field('altar_banner', '"altar_banner": ""', '祭坛横幅'),
        field('ability_bar', '"ability_bar": ""', '能力槽'),
        field('growth_left_arrow', '"growth_left_arrow": {\n\t"hover_icon": "",\n\t"icon": ""\n}', '成长左箭头'),
        field('growth_right_arrow', '"growth_right_arrow": {\n\t"hover_icon": "",\n\t"icon": ""\n}', '成长右箭头'),
        field('growth_crystal', '"growth_crystal": {\n\t"empty": "",\n\t"full": ""\n}', '成长水晶'),
        field('food_tooltip', '"food_tooltip": {\n\t"font": "",\n\t"nutrition_icon": "",\n\t"saturation_icon": ""\n}', '食物提示')
    ];
}

function stageItems(): vscode.CompletionItem[] {
    return [
        field('is_default', '"is_default": false', '默认阶段'),
        field('growth_range', '"growth_range": {\n\t"min": 0,\n\t"max": 100\n}', '成长范围'),
        field('ticks_until_grown', '"ticks_until_grown": 216000', '成熟刻数'),
        field('modifiers', '"modifiers": []', '属性修正'),
        field('growth_items', '"growth_items": []', '成长物品'),
        field('is_natural_growth_stopped', '"is_natural_growth_stopped": {}', '停止自然成长'),
        field('destruction_data', '"destruction_data": {}', '破坏行为')
    ];
}

function penaltyItems(): vscode.CompletionItem[] {
    return [
        field('effect', '"effect": {}', '效果'),
        field('trigger', '"trigger": {}', '触发'),
        field('icon', '"icon": ""', '图标'),
        field('condition', '"condition": {}', '条件')
    ];
}

function projectileItems(): vscode.CompletionItem[] {
    return [
        field('general_data', '"general_data": {}', '通用数据'),
        field('type_data', '"type_data": {}', '类型数据')
    ];
}

function bodyItems(): vscode.CompletionItem[] {
    return [
        field('animation', '"animation": ""', '动画'),
        field('is_default', '"is_default": false', '默认龙体'),
        field('modifiers', '"modifiers": []', '属性修正'),
        field('scaling_proportions', '"scaling_proportions": {}', '缩放比例')
    ];
}

function emoteItems(): vscode.CompletionItem[] {
    return [
        field('emotes', '"emotes": []', '表情动作')
    ];
}

function valuesForKind(kind: string | undefined): vscode.CompletionItem[] {
    if (kind === 'dragon_ability') {
        return abilityValues();
    }
    return [];
}

const ENUM_VALUE_LISTS: Record<string, string[]> = {
    activation_type: ['dragonsurvival:passive', 'dragonsurvival:simple', 'dragonsurvival:channeled'],
    upgrade_type: ['dragonsurvival:experience_points', 'dragonsurvival:experience_levels', 'dragonsurvival:dragon_growth', 'dragonsurvival:item_based', 'dragonsurvival:condition_based'],
    target_type: ['dragonsurvival:area', 'dragonsurvival:dragon_breath', 'dragonsurvival:looking_at', 'dragonsurvival:self', 'dragonsurvival:disc'],
    effect_type: [
        'dragonsurvival:damage', 'dragonsurvival:modifier', 'dragonsurvival:potion', 'dragonsurvival:projectile',
        'dragonsurvival:summon_entity', 'dragonsurvival:damage_modification', 'dragonsurvival:breath_particles',
        'dragonsurvival:ignite', 'dragonsurvival:harvest_bonus', 'dragonsurvival:on_attack', 'dragonsurvival:flight',
        'dragonsurvival:spin', 'dragonsurvival:item_conversion', 'dragonsurvival:swim', 'dragonsurvival:effect_modification',
        'dragonsurvival:particle', 'dragonsurvival:glow', 'dragonsurvival:oxygen_bonus', 'dragonsurvival:block_vision',
        'dragonsurvival:run_function', 'dragonsurvival:smelting', 'dragonsurvival:heal', 'dragonsurvival:teleport',
        'dragonsurvival:push', 'dragonsurvival:hunger', 'dragonsurvival:effect_removal', 'dragonsurvival:use_item',
        'dragonsurvival:dragon_growth', 'dragonsurvival:mana_recovery', 'dragonsurvival:experience',
        'dragonsurvival:cooldown_recovery',
        'dragonsurvival:bonemeal', 'dragonsurvival:conversion', 'dragonsurvival:fire', 'dragonsurvival:area_cloud',
        'dragonsurvival:block_break', 'dragonsurvival:explosion', 'dragonsurvival:block_harvest'
    ],
    trigger_point: ['default', 'charging', 'channel_completion'],
    direction: ['looking_at', 'towards_entity', 'up', 'down', 'east', 'west', 'south', 'north'],
    display_type: ['outline', 'particles', 'simple_shader', 'none'],
    modification_type: ['additive', 'multiplicative'],
    penalty_type: ['dragonsurvival:take_damage', 'dragonsurvival:mob_effect', 'dragonsurvival:item_blacklist', 'dragonsurvival:damage_modification', 'dragonsurvival:fear', 'dragonsurvival:informational', 'dragonsurvival:modifier', 'dragonsurvival:effect_modification', 'dragonsurvival:run_function'],
    penalty_trigger: ['dragonsurvival:supply', 'dragonsurvival:instant', 'dragonsurvival:item_used', 'dragonsurvival:hit_by_projectile', 'dragonsurvival:hit_by_water_potion'],
    adjustment_type: ['percent', 'flat'],
    experience_type: ['levels', 'points'],
    cooldown_recovery_action_type: ['set', 'reduce']
};

function enumItemsForKey(key: string): vscode.CompletionItem[] {
    const values = [...(ENUM_VALUE_LISTS[key] || [])];
    if (key === 'effect_type') {
        const config = vscode.workspace.getConfiguration('dragonSurvivalDatapack');
        const customs = new Set<string>(config.get<string[]>('customEffectTypes', []));
        for (const def of config.get<Array<{ type: string }>>('customEffects', [])) {
            if (def && typeof def.type === 'string') customs.add(def.type);
        }
        for (const custom of customs) {
            if (!values.includes(custom)) values.push(custom);
        }
    }
    return values.map(v => value(v, v, '枚举值'));
}

function detectValueContext(document: vscode.TextDocument, position: vscode.Position): { inValue: boolean; key?: string } {
    const textBefore = document.lineAt(position.line).text.substring(0, position.character);
    const match = textBefore.match(/"([A-Za-z_][A-Za-z0-9_]*)"\s*:\s*"([^"]*)$/);
    if (match) {
        return { inValue: true, key: match[1] };
    }
    return { inValue: false };
}

function applyEnumTextEdits(document: vscode.TextDocument, position: vscode.Position, items: vscode.CompletionItem[]): void {
    const line = document.lineAt(position.line).text;
    for (const item of items) {
        if (item.kind !== vscode.CompletionItemKind.EnumMember) {
            continue;
        }
        if (typeof item.insertText !== 'string') {
            continue;
        }
        let quote = -1;
        for (let i = position.character - 1; i >= 0; i--) {
            if (line[i] === '"' && (i === 0 || line[i - 1] !== '\\')) {
                quote = i;
                break;
            }
        }
        if (quote < 0) {
            continue;
        }
        const range = new vscode.Range(position.line, quote + 1, position.line, position.character);
        item.textEdit = vscode.TextEdit.replace(range, item.insertText);
    }
}

export function registerDragonCompletionProvider(): vscode.Disposable {
    const detectKind = (document: vscode.TextDocument): string | undefined => {
        const normalized = document.uri.fsPath.replace(/\\/g, '/');
        for (const [name, pattern] of Object.entries(KIND_PATTERNS)) {
            if (pattern.test(normalized)) {
                return name;
            }
        }
        return undefined;
    };

    const completion = vscode.languages.registerCompletionItemProvider(
        { language: 'json' },
        {
            provideCompletionItems(document: vscode.TextDocument, position: vscode.Position): vscode.CompletionItem[] {
                const kind = detectKind(document);
                if (!kind) {
                    return [];
                }

                const context = detectValueContext(document, position);
                const items: vscode.CompletionItem[] = [];

                if (context.inValue) {
                    if (context.key && ENUM_VALUE_LISTS[context.key]) {
                        items.push(...enumItemsForKey(context.key));
                    }
                    applyEnumTextEdits(document, position, items);
                    return items;
                }

                if (kind === 'dragon_ability') {
                    items.push(...abilityItems());
                } else if (kind === 'dragon_species') {
                    items.push(...speciesItems());
                } else if (kind === 'dragon_stage') {
                    items.push(...stageItems());
                } else if (kind === 'dragon_penalty') {
                    items.push(...penaltyItems());
                } else if (kind === 'projectile_data') {
                    items.push(...projectileItems());
                } else if (kind === 'dragon_body') {
                    items.push(...bodyItems());
                } else if (kind === 'dragon_emote_set') {
                    items.push(...emoteItems());
                }

                return items;
            }
        },
        '"',
        ':'
    );

    const hover = vscode.languages.registerHoverProvider(
        { language: 'json' },
        {
            provideHover(document: vscode.TextDocument, position: vscode.Position): vscode.Hover | undefined {
                const kind = detectKind(document);
                if (!kind) {
                    return undefined;
                }

                const range = document.getWordRangeAtPosition(position);
                if (!range) {
                    return undefined;
                }

                const word = document.getText(range);
                const info = MCDOC_FIELD_INFO[word];
                if (!info) {
                    return undefined;
                }

                const md = new vscode.MarkdownString();
                md.appendMarkdown(`**${word}**\n\n${formatInfo(info)}`);
                return new vscode.Hover(md, range);
            }
        }
    );

    return vscode.Disposable.from(completion, hover);
}
