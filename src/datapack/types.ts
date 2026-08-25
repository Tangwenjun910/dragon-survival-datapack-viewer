export const REGISTRY_KINDS = [
    'dragon_species',
    'dragon_stage',
    'dragon_ability',
    'dragon_penalty',
    'projectile_data',
    'dragon_body',
    'dragon_emote_set',
    'diet_entries',
    'stage_resources',
    'end_platforms',
    'dragon_beacon_data',
    'body_icons'
] as const;

export type RegistryKind = typeof REGISTRY_KINDS[number];

export const REGISTRY_LABELS: Record<RegistryKind, string> = {
    dragon_species: '龙种',
    dragon_stage: '阶段',
    dragon_ability: '能力',
    dragon_penalty: '惩罚',
    projectile_data: '弹射物',
    dragon_body: '龙体',
    dragon_emote_set: '表情组',
    diet_entries: '食物列表',
    stage_resources: '阶段资源',
    end_platforms: '末地平台',
    dragon_beacon_data: '祭坛/信标效果',
    body_icons: '龙体图标'
};

export const DATA_MAP_KINDS: RegistryKind[] = [
    'diet_entries',
    'stage_resources',
    'end_platforms',
    'dragon_beacon_data',
    'body_icons'
];

export interface DiscoveredFile {
    kind: RegistryKind;
    namespace: string;
    id: string;
    filePath: string;
    isTag: boolean;
}

export interface TagModel {
    registry: RegistryKind;
    namespace: string;
    id: string;
    filePath: string;
    values: string[];
}

export interface EntryModel {
    kind: RegistryKind;
    namespace: string;
    id: string;
    filePath: string;
    data: unknown;
    meta: {
        abilities?: string[];
        penalties?: string[];
        stages?: string[];
    };
}

export interface NamespaceModel {
    namespace: string;
    entries: EntryModel[];
    tags: TagModel[];
}

export interface FileError {
    filePath: string;
    message: string;
}

export interface DSModel {
    roots: string[];
    namespaces: NamespaceModel[];
    errors: FileError[];
}

export function isRegistryKind(value: string): value is RegistryKind {
    return (REGISTRY_KINDS as readonly string[]).includes(value);
}
