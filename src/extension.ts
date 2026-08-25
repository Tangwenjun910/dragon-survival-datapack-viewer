import * as path from 'path';
import * as fsp from 'fs/promises';
import * as vscode from 'vscode';
import { DragonDataProvider } from './DragonDataProvider';
import { AssetNamespace, DATA_MAP_KINDS, DiscoveredFile, DSModel, RegistryKind } from './datapack/types';
import { findAssetDirectories, scanAssetsDirectory, scanDirectory } from './datapack/scanner';
import { loadModel } from './datapack/parser';
import { parseJsonc } from './datapack/jsonc';
import { discoverInWorkspace } from './workspaceScanner';

let provider: DragonDataProvider | undefined;
let manualPath: string | undefined;
let currentModel: DSModel | undefined;

export async function activate(context: vscode.ExtensionContext): Promise<void> {
    provider = new DragonDataProvider(context.extensionUri, {
        onSave: (filePath, text) => saveFile(filePath, text),
        onSelect: () => selectDatapack(context),
        onRefresh: () => refresh(),
        onOpenFile: (filePath) => openFile(filePath),
        onAddFile: (kind, namespace) => addFile(kind as RegistryKind, namespace),
        onDeleteFile: (filePath) => deleteFile(filePath)
    });

    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            DragonDataProvider.viewType,
            provider,
            { webviewOptions: { retainContextWhenHidden: true } }
        )
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('dragonSurvivalDatapack.open', () => {
            void vscode.commands.executeCommand('dragonSurvivalDatapack.view.focus');
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('dragonSurvivalDatapack.refresh', () => refresh())
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('dragonSurvivalDatapack.selectDatapack', () => selectDatapack(context))
    );

    context.subscriptions.push(
        vscode.workspace.onDidChangeWorkspaceFolders(() => {
            void refresh();
        })
    );

    manualPath = context.globalState.get<string>('dragonSurvivalDatapack.manualPath');
    await refresh();
}

export function deactivate(): void {
    // Nothing to clean up.
}

async function refresh(): Promise<void> {
    const fileMap = new Map<string, DiscoveredFile>();
    const workspaceFiles = await discoverInWorkspace();

    for (const file of workspaceFiles) {
        fileMap.set(file.filePath, file);
    }

    if (manualPath) {
        const manualFiles = await scanDirectory(manualPath);
        for (const file of manualFiles) {
            fileMap.set(file.filePath, file);
        }
    }

    const files = [...fileMap.values()];
    let assets: AssetNamespace[] = [];
    try {
        assets = await collectAssets();
    } catch (error) {
        console.error('Failed to collect assets:', error);
    }

    if (files.length === 0) {
        currentModel = { roots: [], namespaces: [], assets, errors: [] };
        provider?.setModel(currentModel);
        return;
    }

    let model: DSModel;
    try {
        model = await loadModel(files);
    } catch (error) {
        currentModel = { roots: [], namespaces: [], assets, errors: [{ filePath: '', message: String(error) }] };
        vscode.window.showErrorMessage(`解析数据包失败: ${error instanceof Error ? error.message : String(error)}`);
        provider?.setModel(currentModel);
        return;
    }

    model.assets = assets;
    currentModel = model;
    provider?.setModel(model);
}

async function collectAssets(): Promise<AssetNamespace[]> {
    const dirs = new Set<string>();
    const folders = vscode.workspace.workspaceFolders ?? [];

    for (const folder of folders) {
        for (const dir of await findAssetDirectories(folder.uri.fsPath)) {
            dirs.add(dir);
        }
    }

    if (manualPath) {
        for (const dir of await findAssetDirectories(manualPath)) {
            dirs.add(dir);
        }
    }

    const result: AssetNamespace[] = [];
    for (const dir of dirs) {
        result.push(...await scanAssetsDirectory(dir));
    }
    return result;
}

async function selectDatapack(context: vscode.ExtensionContext): Promise<void> {
    const picked = await vscode.window.showOpenDialog({
        canSelectFiles: false,
        canSelectFolders: true,
        canSelectMany: false,
        openLabel: '选择数据包/模组源码目录',
        title: '选择包含 data 目录的龙之生存数据包或模组源码'
    });

    if (!picked || picked.length === 0) {
        return;
    }

    manualPath = picked[0].fsPath;
    await context.globalState.update('dragonSurvivalDatapack.manualPath', manualPath);
    await refresh();
}

async function saveFile(filePath: string, text: string): Promise<void> {
    try {
        const parsed = parseJsonc<unknown>(text);
        const formatted = JSON.stringify(parsed, null, 2);
        await vscode.workspace.fs.writeFile(vscode.Uri.file(filePath), Buffer.from(formatted, 'utf-8'));
        vscode.window.showInformationMessage(`已保存 ${filePath}`);
        await refresh();
    } catch (error) {
        vscode.window.showErrorMessage(`保存失败: ${error instanceof Error ? error.message : String(error)}`);
    }
}

async function openFile(filePath: string): Promise<void> {
    try {
        const document = await vscode.workspace.openTextDocument(vscode.Uri.file(filePath));
        await vscode.window.showTextDocument(document, { preview: true, preserveFocus: true });
    } catch (error) {
        vscode.window.showErrorMessage(`无法打开文件: ${error instanceof Error ? error.message : String(error)}`);
    }
}

async function addFile(kind: RegistryKind, namespace: string): Promise<void> {
    const dataSurvivalDir = await findDataSurvivalDir(namespace);
    if (!dataSurvivalDir) {
        vscode.window.showErrorMessage(`找不到命名空间 ${namespace} 的 dragonsurvival 目录，请先选择数据包目录`);
        return;
    }

    const isDataMap = (DATA_MAP_KINDS as readonly string[]).includes(kind);
    let safeId: string;

    if (isDataMap) {
        // Data-map files have fixed names (e.g. body_icons.json, diet_entries.json).
        safeId = kind;
    } else {
        const id = await vscode.window.showInputBox({
            prompt: `输入新的 ${kind} 文件名（不需要 .json）`,
            value: `new_${kind.replace('dragon_', '').replace('_data', '')}`
        });

        if (!id) {
            return;
        }

        safeId = id.trim().replace(/[^a-zA-Z0-9_.-]/g, '_');
    }

    let targetDir: string;
    if (isDataMap) {
        const dataMapTarget = kind === 'body_icons' ? 'dragon_body' : 'dragon_species';
        targetDir = path.join(path.dirname(dataSurvivalDir), 'data_maps', 'dragonsurvival', dataMapTarget);
    } else {
        targetDir = path.join(dataSurvivalDir, kind);
    }

    const targetPath = path.join(targetDir, `${safeId}.json`);

    try {
        await vscode.workspace.fs.stat(vscode.Uri.file(targetPath));
        if (isDataMap) {
            vscode.window.showInformationMessage(`该数据映射文件已存在: ${targetPath}`);
        } else {
            vscode.window.showErrorMessage(`文件已存在: ${targetPath}`);
        }
        return;
    } catch {
        // File does not exist yet - expected.
    }

    const content = buildDefaultTemplate(kind, namespace, safeId);
    try {
        await vscode.workspace.fs.createDirectory(vscode.Uri.file(targetDir));
        await vscode.workspace.fs.writeFile(
            vscode.Uri.file(targetPath),
            Buffer.from(JSON.stringify(content, null, 2), 'utf-8')
        );
        if (kind === 'dragon_species') {
            await createSpeciesCompanionFiles(namespace, safeId, dataSurvivalDir);
        } else if (kind === 'dragon_ability') {
            await addAbilityToTags(namespace, safeId);
        } else if (kind === 'dragon_penalty') {
            await addPenaltyToTags(namespace, safeId);
        }
        vscode.window.showInformationMessage(`已创建 ${targetPath}`);
        await refresh();
    } catch (error) {
        vscode.window.showErrorMessage(`创建文件失败: ${error instanceof Error ? error.message : String(error)}`);
    }
}

async function deleteFile(filePath: string): Promise<void> {
    const answer = await vscode.window.showWarningMessage(
        `确定要删除这个文件吗？\n${filePath}`,
        { modal: true },
        '删除'
    );

    if (answer !== '删除') {
        return;
    }

    try {
        await vscode.workspace.fs.delete(vscode.Uri.file(filePath));
        vscode.window.showInformationMessage(`已删除 ${filePath}`);
        await refresh();
    } catch (error) {
        vscode.window.showErrorMessage(`删除文件失败: ${error instanceof Error ? error.message : String(error)}`);
    }
}

async function createSpeciesCompanionFiles(namespace: string, speciesId: string, dataSurvivalDir: string): Promise<void> {
    const dataDir = path.dirname(dataSurvivalDir);
    const speciesFull = `${namespace}:${speciesId}`;

    const updateDataMap = async (
        targetRegistry: string,
        mapName: string,
        update: (values: Record<string, unknown>) => void
    ): Promise<void> => {
        const filePath = path.join(dataDir, 'data_maps', 'dragonsurvival', targetRegistry, `${mapName}.json`);
        const fileUri = vscode.Uri.file(filePath);

        await vscode.workspace.fs.createDirectory(vscode.Uri.file(path.dirname(filePath)));

        let data: Record<string, any> = { values: {} };
        try {
            const existing = await vscode.workspace.fs.readFile(fileUri);
            data = parseJsonc(Buffer.from(existing).toString('utf-8')) as Record<string, any>;
            if (!data || typeof data !== 'object') {
                data = { values: {} };
            }
            data.values = data.values || {};
        } catch {
            // File does not exist yet - create from scratch.
        }

        update(data.values);
        await vscode.workspace.fs.writeFile(fileUri, Buffer.from(JSON.stringify(data, null, 2), 'utf-8'));
    };

    await updateDataMap('dragon_species', 'diet_entries', (values) => {
        if (!values[speciesFull]) {
            values[speciesFull] = { 'neoforge:value': [] };
        }
    });

    await updateDataMap('dragon_species', 'stage_resources', (values) => {
        if (!values[speciesFull]) {
            values[speciesFull] = {};
        }
    });

    await updateDataMap('dragon_species', 'end_platforms', (values) => {
        if (!values[speciesFull]) {
            values[speciesFull] = { structure: '', spawn_position: [0, 50, 0] };
        }
    });

    await updateDataMap('dragon_species', 'dragon_beacon_data', (values) => {
        if (!values[speciesFull]) {
            values[speciesFull] = {
                effects: [],
                payment_data: { duration_multiplier: 30, experience_cost: 60 }
            };
        }
    });

    await updateDataMap('dragon_body', 'body_icons', (values) => {
        const defaultBodyKeys = ['center', 'north', 'east', 'south', 'west', 'no_model'];
        const bodyKeys = Object.keys(values).length > 0 ? Object.keys(values) : defaultBodyKeys;

        for (const bodyKey of bodyKeys) {
            if (!values[bodyKey]) {
                values[bodyKey] = {};
            }
            const bodyMap = values[bodyKey] as Record<string, unknown>;
            if (bodyMap && typeof bodyMap === 'object' && !Array.isArray(bodyMap)) {
                if (bodyMap[speciesFull] === undefined) {
                    bodyMap[speciesFull] = '';
                }
            }
        }
    });

    const createTagFile = async (registry: string, tagId: string, values: unknown[]): Promise<void> => {
        const filePath = path.join(dataDir, 'tags', 'dragonsurvival', registry, `${tagId}.json`);
        const fileUri = vscode.Uri.file(filePath);

        try {
            await vscode.workspace.fs.stat(fileUri);
            return;
        } catch {
            // Does not exist - create it.
        }

        await vscode.workspace.fs.createDirectory(vscode.Uri.file(path.dirname(filePath)));
        await vscode.workspace.fs.writeFile(fileUri, Buffer.from(JSON.stringify({ values }, null, 2), 'utf-8'));
    };

    await createTagFile('dragon_ability', speciesId, []);
    await createTagFile('dragon_penalty', speciesId, []);
    await createTagFile('dragon_species', speciesId, [speciesFull]);
}

async function addAbilityToTags(namespace: string, abilityId: string): Promise<void> {
    const abilityFull = `${namespace}:${abilityId}`;

    const appendToTagFile = async (filePath: string, value: string): Promise<void> => {
        const fileUri = vscode.Uri.file(filePath);
        let data: Record<string, any> = { values: [] };

        try {
            const existing = await vscode.workspace.fs.readFile(fileUri);
            data = parseJsonc(Buffer.from(existing).toString('utf-8')) as Record<string, any>;
            if (!data || typeof data !== 'object') data = { values: [] };
        } catch {
            await vscode.workspace.fs.createDirectory(vscode.Uri.file(path.dirname(filePath)));
        }

        if (!Array.isArray(data.values)) data.values = [];
        if (!data.values.includes(value)) data.values.push(value);

        await vscode.workspace.fs.writeFile(fileUri, Buffer.from(JSON.stringify(data, null, 2), 'utf-8'));
    };

    const sameNamespace = currentModel?.namespaces.find(ns => ns.namespace === namespace);
    const sameNamespaceAbilityTags = (sameNamespace?.tags || []).filter(tag =>
        tag.registry === 'dragon_ability' && tag.id !== 'order'
    );

    for (const tag of sameNamespaceAbilityTags) {
        await appendToTagFile(tag.filePath, abilityFull);
    }

    const orderTag = currentModel?.namespaces.flatMap(ns => ns.tags).find(tag =>
        tag.registry === 'dragon_ability' && tag.id === 'order'
    );

    if (orderTag) {
        await appendToTagFile(orderTag.filePath, abilityFull);
    } else {
        const dragonDataDir = getNamespaceDataDir('dragonsurvival');
        if (dragonDataDir) {
            await appendToTagFile(
                path.join(dragonDataDir, 'tags', 'dragonsurvival', 'dragon_ability', 'order.json'),
                abilityFull
            );
        }
    }
}

async function addPenaltyToTags(namespace: string, penaltyId: string): Promise<void> {
    const penaltyFull = `${namespace}:${penaltyId}`;

    const appendToTagFile = async (filePath: string, value: string): Promise<void> => {
        const fileUri = vscode.Uri.file(filePath);
        let data: Record<string, any> = { values: [] };

        try {
            const existing = await vscode.workspace.fs.readFile(fileUri);
            data = parseJsonc(Buffer.from(existing).toString('utf-8')) as Record<string, any>;
            if (!data || typeof data !== 'object') data = { values: [] };
        } catch {
            await vscode.workspace.fs.createDirectory(vscode.Uri.file(path.dirname(filePath)));
        }

        if (!Array.isArray(data.values)) data.values = [];
        if (!data.values.includes(value)) data.values.push(value);

        await vscode.workspace.fs.writeFile(fileUri, Buffer.from(JSON.stringify(data, null, 2), 'utf-8'));
    };

    const sameNamespace = currentModel?.namespaces.find(ns => ns.namespace === namespace);
    const sameNamespacePenaltyTags = (sameNamespace?.tags || []).filter(tag =>
        tag.registry === 'dragon_penalty' && tag.id !== 'order'
    );

    for (const tag of sameNamespacePenaltyTags) {
        await appendToTagFile(tag.filePath, penaltyFull);
    }

    const orderTag = currentModel?.namespaces.flatMap(ns => ns.tags).find(tag =>
        tag.registry === 'dragon_penalty' && tag.id === 'order'
    );

    if (orderTag) {
        await appendToTagFile(orderTag.filePath, penaltyFull);
    } else {
        const dragonDataDir = getNamespaceDataDir('dragonsurvival');
        if (dragonDataDir) {
            await appendToTagFile(
                path.join(dragonDataDir, 'tags', 'dragonsurvival', 'dragon_penalty', 'order.json'),
                penaltyFull
            );
        }
    }
}

function getNamespaceDataDir(namespace: string): string | undefined {
    const ns = currentModel?.namespaces.find(item => item.namespace === namespace);
    const firstEntry = ns?.entries[0];
    if (!firstEntry) return undefined;

    const registryDir = path.dirname(firstEntry.filePath);
    const dsDir = path.dirname(registryDir);
    return path.dirname(dsDir);
}

async function findDataSurvivalDir(namespace: string): Promise<string | undefined> {
    if (currentModel) {
        const ns = currentModel.namespaces.find(item => item.namespace === namespace);
        const firstEntry = ns?.entries[0];
        if (firstEntry) {
            const registryDir = path.dirname(firstEntry.filePath);
            return path.dirname(registryDir);
        }
    }

    const basePath = getBasePath();
    if (!basePath) return undefined;

    const bestDataDir = await findBestDataDir(basePath);
    return path.join(bestDataDir, namespace, 'dragonsurvival');
}

async function findBestDataDir(basePath: string): Promise<string> {
    if (path.basename(basePath).toLowerCase() === 'data') {
        return basePath;
    }

    const skip = new Set(['node_modules', '.git', 'build', 'out', 'bin', 'target', 'dist', 'logs', 'run']);

    const findDir = async (name: string, maxDepth = 6): Promise<string | undefined> => {
        const queue = [{ dir: basePath, depth: 0 }];
        while (queue.length > 0) {
            const current = queue.shift()!;
            if (current.depth > maxDepth) continue;
            let entries;
            try {
                entries = await fsp.readdir(current.dir, { withFileTypes: true });
            } catch {
                continue;
            }
            for (const entry of entries) {
                if (!entry.isDirectory() || skip.has(entry.name)) continue;
                const full = path.join(current.dir, entry.name);
                if (entry.name === name) return full;
                queue.push({ dir: full, depth: current.depth + 1 });
            }
        }
        return undefined;
    };

    const dataDir = await findDir('data');
    if (dataDir) return dataDir;

    const resourcesDir = await findDir('resources');
    if (resourcesDir) return path.join(resourcesDir, 'data');

    const srcDir = await findDir('src');
    if (srcDir) return path.join(srcDir, 'main', 'resources', 'data');

    return path.join(basePath, 'data');
}

function getBasePath(): string | undefined {
    if (manualPath) return manualPath;
    const firstFolder = vscode.workspace.workspaceFolders?.[0];
    return firstFolder?.uri.fsPath;
}

function buildDefaultTemplate(kind: RegistryKind, namespace: string, id: string): unknown {
    switch (kind) {
        case 'dragon_species':
            return {
                abilities: `#${namespace}:${id}`,
                misc_resources: {
                    food_sprites: `${namespace}:textures/gui/custom/food_icons/${id}_food_icons.png`,
                    mana_sprites: {
                        full: `${namespace}:textures/gui/custom/mana_icons/${id}/full.png`,
                        reserved: `${namespace}:textures/gui/custom/mana_icons/${id}/reserved.png`,
                        recovery: `${namespace}:textures/gui/custom/mana_icons/${id}/recovery.png`,
                        empty: `${namespace}:textures/gui/custom/mana_icons/${id}/empty.png`
                    },
                    altar_banner: `${namespace}:textures/gui/custom/altar/${id}/altar_icon.png`,
                    ability_bar: `${namespace}:textures/gui/custom/casting_bars/${id}/cast_bar.png`,
                    growth_left_arrow: {
                        hover_icon: `${namespace}:textures/gui/custom/stage/${id}/left_arrow_hover.png`,
                        icon: `${namespace}:textures/gui/custom/stage/${id}/left_arrow_main.png`
                    },
                    growth_right_arrow: {
                        hover_icon: `${namespace}:textures/gui/custom/stage/${id}/right_arrow_hover.png`,
                        icon: `${namespace}:textures/gui/custom/stage/${id}/right_arrow_main.png`
                    },
                    growth_crystal: {
                        empty: `${namespace}:textures/gui/custom/stage/${id}/point_main.png`,
                        full: `${namespace}:textures/gui/custom/stage/${id}/point_hover.png`
                    },
                    food_tooltip: {
                        font: `${namespace}:food_tooltip_icon_font`,
                        nutrition_icon: '\\uEA01',
                        saturation_icon: '\\uEA04'
                    },
                    primary_color: '#FFFFFF',
                    secondary_color: '#FFFFFF',
                    claw_texture_slot: 'PICKAXE'
                },
                penalties: `#${namespace}:${id}`
            };
        case 'dragon_stage':
            return {
                growth_range: { min: 10.0, max: 25.0 },
                ticks_until_grown: 216000,
                is_default: false,
                modifiers: [],
                growth_items: []
            };
        case 'dragon_ability':
            return {
                activation: { activation_type: 'dragonsurvival:simple' },
                icon: {
                    texture_entries: [
                        { from_level: 0, texture_resource: `${namespace}:abilities/${id}` }
                    ]
                },
                actions: []
            };
        case 'dragon_penalty':
            return {
                icon: `${namespace}:penalties/${id}`,
                effect: {
                    penalty_type: 'dragonsurvival:take_damage',
                    amount: 1,
                    damage_type: 'minecraft:magic'
                },
                trigger: {
                    penalty_trigger: 'dragonsurvival:supply',
                    trigger_rate: 20,
                    recovery_items: []
                }
            };
        case 'projectile_data':
            return {
                general_data: {
                    name: `${namespace}:${id}`,
                    entity_hit_effects: [],
                    block_hit_effects: [],
                    common_hit_effects: [],
                    ticking_effects: []
                },
                type_data: {
                    behaviour_data: { width: 0.5, height: 0.5 },
                    resources: {
                        texture_entries: [
                            { from_level: 1, texture_resource: `${namespace}:${id}` }
                        ]
                    },
                    on_destroy_effects: []
                }
            };
        case 'dragon_body':
            return {
                animation: `${namespace}:${id}`,
                is_default: false,
                modifiers: [],
                scaling_proportions: { width: 0.6, height: 2.0, eye_height: 1.8 }
            };
        case 'dragon_emote_set':
            return { emotes: [] };
        case 'diet_entries':
        case 'stage_resources':
        case 'end_platforms':
        case 'dragon_beacon_data':
        case 'body_icons':
            return { values: {} };
    }
}
