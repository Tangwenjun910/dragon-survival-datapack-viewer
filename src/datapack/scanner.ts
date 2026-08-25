import * as fs from 'fs';
import * as fsp from 'fs/promises';
import * as path from 'path';
import { DATA_MAP_KINDS, DiscoveredFile, isRegistryKind, RegistryKind } from './types';

const SKIP_DIRS = new Set([
    'node_modules',
    '.git',
    '.hg',
    '.svn',
    'build',
    'bin',
    'out',
    'target',
    'dist',
    '.vscode',
    '.idea',
    'logs',
    'run'
]);

const REGISTRY_DIRS: RegistryKind[] = [
    'dragon_species',
    'dragon_stage',
    'dragon_ability',
    'dragon_penalty',
    'projectile_data',
    'dragon_body',
    'dragon_emote_set'
];

async function pathIsDirectory(p: string): Promise<boolean> {
    try {
        const stat = await fsp.stat(p);
        return stat.isDirectory();
    } catch {
        return false;
    }
}

/** Returns the directories that look like Dragon Survival data roots (`<root>/data`). */
export async function findDataDirectories(searchRoot: string, maxDepth = 8): Promise<string[]> {
    const result: string[] = [];

    async function walk(dir: string, depth: number): Promise<void> {
        if (depth > maxDepth) {
            return;
        }

        let entries: fs.Dirent[];
        try {
            entries = await fsp.readdir(dir, { withFileTypes: true });
        } catch {
            return;
        }

        for (const entry of entries) {
            if (!entry.isDirectory() || SKIP_DIRS.has(entry.name)) {
                continue;
            }

            const full = path.join(dir, entry.name);

            if (entry.name === 'data' && await looksLikeDragonSurvivalData(full)) {
                result.push(full);
                continue; // Do not descend into a data dir; its layout is fixed.
            }

            await walk(full, depth + 1);
        }
    }

    await walk(searchRoot, 0);
    return result;
}

export async function looksLikeDragonSurvivalData(dataDir: string): Promise<boolean> {
    let namespaceEntries: fs.Dirent[];
    try {
        namespaceEntries = await fsp.readdir(dataDir, { withFileTypes: true });
    } catch {
        return false;
    }

    for (const ns of namespaceEntries) {
        if (!ns.isDirectory()) {
            continue;
        }

        const dsDir = path.join(dataDir, ns.name, 'dragonsurvival');
        try {
            const dsEntries = await fsp.readdir(dsDir, { withFileTypes: true });
            if (dsEntries.some(e => e.isDirectory() && isRegistryKind(e.name))) {
                return true;
            }
        } catch {
            // Not a Dragon Survival registry directory.
        }

        const dataMapsDir = path.join(dataDir, ns.name, 'data_maps', 'dragonsurvival');
        try {
            const dataMapEntries = await fsp.readdir(dataMapsDir, { withFileTypes: true });
            if (dataMapEntries.some(e => e.isDirectory())) {
                return true;
            }
        } catch {
            // Not a Dragon Survival data-map directory.
        }
    }

    return false;
}

/** Scan a single `data` directory for Dragon Survival registry JSON and tag JSON. */
export async function scanDataDirectory(dataDir: string): Promise<DiscoveredFile[]> {
    const files: DiscoveredFile[] = [];
    let namespaces: fs.Dirent[];

    try {
        namespaces = await fsp.readdir(dataDir, { withFileTypes: true });
    } catch {
        return files;
    }

    for (const ns of namespaces) {
        if (!ns.isDirectory()) {
            continue;
        }

        // Registry files: data/<namespace>/dragonsurvival/<registry>/*.json
        const dsDir = path.join(dataDir, ns.name, 'dragonsurvival');
        await collectRegistryFiles(dsDir, ns.name, false, files);

        // Tag files: data/<namespace>/tags/dragonsurvival/<registry>/*.json
        const tagsDir = path.join(dataDir, ns.name, 'tags', 'dragonsurvival');
        await collectRegistryFiles(tagsDir, ns.name, true, files);

        // Data map files: data/<namespace>/data_maps/dragonsurvival/<target>/*.json
        const dataMapsDir = path.join(dataDir, ns.name, 'data_maps', 'dragonsurvival');
        await collectDataMapFiles(dataMapsDir, ns.name, files);
    }

    return files;
}

async function collectRegistryFiles(
    dsDir: string,
    namespace: string,
    isTag: boolean,
    output: DiscoveredFile[]
): Promise<void> {
    let registryDirs: fs.Dirent[];
    try {
        registryDirs = await fsp.readdir(dsDir, { withFileTypes: true });
    } catch {
        return;
    }

    for (const registryDir of registryDirs) {
        if (!registryDir.isDirectory() || !isRegistryKind(registryDir.name)) {
            continue;
        }

        const registryPath = path.join(dsDir, registryDir.name);
        let files: fs.Dirent[];
        try {
            files = await fsp.readdir(registryPath, { withFileTypes: true });
        } catch {
            continue;
        }

        for (const file of files) {
            if (!file.isFile() || !file.name.endsWith('.json')) {
                continue;
            }

            output.push({
                kind: registryDir.name,
                namespace,
                id: path.basename(file.name, '.json'),
                filePath: path.join(registryPath, file.name),
                isTag
            });
        }
    }
}

async function collectDataMapFiles(
    dataMapsDir: string,
    namespace: string,
    output: DiscoveredFile[]
): Promise<void> {
    let targetDirs: fs.Dirent[];
    try {
        targetDirs = await fsp.readdir(dataMapsDir, { withFileTypes: true });
    } catch {
        return;
    }

    for (const targetDir of targetDirs) {
        if (!targetDir.isDirectory()) {
            continue;
        }

        const targetPath = path.join(dataMapsDir, targetDir.name);
        let files: fs.Dirent[];
        try {
            files = await fsp.readdir(targetPath, { withFileTypes: true });
        } catch {
            continue;
        }

        for (const file of files) {
            if (!file.isFile() || !file.name.endsWith('.json')) {
                continue;
            }

            const kind = path.basename(file.name, '.json');
            if ((DATA_MAP_KINDS as readonly string[]).includes(kind)) {
                output.push({
                    kind: kind as RegistryKind,
                    namespace,
                    id: kind,
                    filePath: path.join(targetPath, file.name),
                    isTag: false
                });
            }
        }
    }
}

/** Scan a user-selected folder. Returns discovered files under all matching `data` directories. */
export async function scanDirectory(searchRoot: string): Promise<DiscoveredFile[]> {
    const dataDirs = await findDataDirectories(searchRoot);

    // If the user picked the `data` directory itself, scan it directly.
    if (await looksLikeDragonSurvivalData(searchRoot)) {
        dataDirs.push(searchRoot);
    }

    const files: DiscoveredFile[] = [];

    for (const dataDir of dataDirs) {
        files.push(...await scanDataDirectory(dataDir));
    }

    return files;
}

/** Determine datapack root labels for display from a list of data directories. */
export function getRootLabels(dataDirs: string[]): string[] {
    const roots = new Set<string>();

    for (const dataDir of dataDirs) {
        // If the parent looks like a datapack root (has pack.mcmeta), show the parent.
        const parent = path.dirname(dataDir);
        roots.add(parent);
    }

    return [...roots];
}

/** Classify a file path (from workspace.findFiles) into a DiscoveredFile, if it is relevant. */
export function classifyFilePath(filePath: string): DiscoveredFile | undefined {
    const normalized = filePath.split(/[\\/]+/);
    const dataIndex = normalized.lastIndexOf('data');

    if (dataIndex < 0 || dataIndex + 3 >= normalized.length) {
        return undefined;
    }

    const namespace = normalized[dataIndex + 1];
    const section = normalized[dataIndex + 2];
    const registry = normalized[dataIndex + 3];

    if (section === 'dragonsurvival' && isRegistryKind(registry)) {
        const id = path.basename(filePath, '.json');
        return { kind: registry, namespace, id, filePath, isTag: false };
    }

    if (section === 'tags' && registry === 'dragonsurvival' && normalized.length > dataIndex + 5) {
        const registryName = normalized[dataIndex + 4];
        if (isRegistryKind(registryName)) {
            const id = path.basename(filePath, '.json');
            return { kind: registryName, namespace, id, filePath, isTag: true };
        }
    }

    return undefined;
}
