// @ts-check
(function () {
    const vscode = acquireVsCodeApi();

    /** @type {{ model: any }} */
    const state = {
        model: null
    };

    let currentNamespace = null;
    let currentDetail = null;
    let editingEntry = null;

    const KIND_LABELS = {
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

    const $ = (id) => document.getElementById(id);

    document.addEventListener('DOMContentLoaded', () => {
        $('selectBtn').addEventListener('click', () => send({ type: 'select' }));
        $('refreshBtn').addEventListener('click', () => send({ type: 'refresh' }));
        $('editorClose').addEventListener('click', closeEditor);
        $('editorCancel').addEventListener('click', closeEditor);
        $('editorSave').addEventListener('click', saveEditor);
        $('editorOverlay').addEventListener('click', (event) => {
            if (event.target === $('editorOverlay')) closeEditor();
        });
        $('editorText').addEventListener('input', () => {
            $('editorError').textContent = '';
        });

        $('overview').addEventListener('click', (event) => {
            const target = event.target;
            if (!(target instanceof Element)) return;

            const addBtn = target.closest('.add-file-btn');
            if (addBtn) {
                const kind = addBtn.getAttribute('data-kind');
                const namespace = addBtn.getAttribute('data-namespace');
                if (kind && namespace) send({ type: 'addFile', kind, namespace });
                return;
            }

            const deleteBtn = target.closest('.delete-file-btn');
            if (deleteBtn) {
                const filePath = decodeURIComponent(deleteBtn.getAttribute('data-file-path') || '');
                if (filePath) send({ type: 'deleteFile', filePath });
                return;
            }

            const editTagBtn = target.closest('.edit-tag-btn');
            if (editTagBtn) {
                const filePath = decodeURIComponent(editTagBtn.getAttribute('data-tag-file') || '');
                const values = JSON.parse(decodeURIComponent(editTagBtn.getAttribute('data-tag-values') || '[]'));
                if (filePath) openEditor({ filePath, data: { values } });
                return;
            }

            const assetOpenBtn = target.closest('.asset-file-open');
            if (assetOpenBtn) {
                const filePath = decodeURIComponent(assetOpenBtn.getAttribute('data-file-path') || '');
                if (filePath) send({ type: 'openFile', filePath });
                return;
            }

            const card = target.closest('[data-kind]');
            if (card) {
                const kind = card.getAttribute('data-kind');
                const id = card.getAttribute('data-id');
                if (kind && id) showDetailByFullId(kind, id);
            }
        });

        $('detail').addEventListener('click', (event) => {
            const target = event.target;
            if (!(target instanceof Element)) return;

            const addMapBtn = target.closest('.add-map-entry');
            if (addMapBtn) {
                const path = JSON.parse(decodeURIComponent(addMapBtn.getAttribute('data-map-path') || '[]'));
                addMapEntry(path);
                return;
            }

            const deleteMapBtn = target.closest('.delete-map-entry');
            if (deleteMapBtn) {
                const path = JSON.parse(decodeURIComponent(deleteMapBtn.getAttribute('data-map-path') || '[]'));
                const key = deleteMapBtn.getAttribute('data-map-key') || '';
                deleteMapEntry(path, key);
                return;
            }

            const addFieldBtn = target.closest('.add-field-btn');
            if (addFieldBtn) {
                const path = JSON.parse(decodeURIComponent(addFieldBtn.getAttribute('data-map-path') || '[]'));
                const field = addFieldBtn.getAttribute('data-field-key') || '';
                addFieldToObject(path, field);
                return;
            }

            const deleteFieldBtn = target.closest('.delete-field-btn');
            if (deleteFieldBtn) {
                const path = JSON.parse(decodeURIComponent(deleteFieldBtn.getAttribute('data-map-path') || '[]'));
                const field = deleteFieldBtn.getAttribute('data-field-key') || '';
                deleteFieldFromObject(path, field);
                return;
            }

            const addBtn = target.closest('.add-array-btn');
            if (addBtn) {
                const path = JSON.parse(decodeURIComponent(addBtn.getAttribute('data-array-path') || '[]'));
                addArrayItem(path);
                return;
            }

            const deleteArrayBtn = target.closest('.delete-array-item');
            if (deleteArrayBtn) {
                const path = JSON.parse(decodeURIComponent(deleteArrayBtn.getAttribute('data-array-path') || '[]'));
                const index = Number(deleteArrayBtn.getAttribute('data-array-index'));
                deleteArrayItem(path, index);
                return;
            }

            const deleteBtn = target.closest('.delete-action-btn');
            if (deleteBtn) {
                const index = Number(deleteBtn.getAttribute('data-action-index'));
                deleteAction(index);
            }
        });

        $('detail').addEventListener('change', (event) => {
            const target = event.target;
            if (!(target instanceof Element) || !currentDetail) return;

            if (target.matches('.st-map-key')) {
                const path = JSON.parse(decodeURIComponent(target.getAttribute('data-map-path') || '[]'));
                const oldKey = target.getAttribute('data-map-old-key') || '';
                const newKey = target.value.trim();
                renameMapKey(path, oldKey, newKey);
                return;
            }

            if (!target.matches('.st-edit-field')) return;

            const path = JSON.parse(decodeURIComponent(target.getAttribute('data-edit-path') || '[]'));
            let value;
            if (target.type === 'number') {
                const raw = target.value.trim();
                value = raw === '' ? '' : Number(raw);
            } else if (target.tagName === 'SELECT') {
                value = target.value === 'true' ? true : target.value === 'false' ? false : target.value;
            } else {
                value = target.value;
            }

            setAtPath(currentDetail.data, path, value);
            autoCompleteMissingFields(path, value);
            renderDetail(currentDetail);
            saveCurrentDetail();
        });

        send({ type: 'ready' });
    });

    window.addEventListener('message', (event) => {
        const message = event.data;
        if (!message || message.type !== 'state') return;

        state.model = message.model || { roots: [], namespaces: [], assets: [], errors: [] };
        if (!Array.isArray(state.model.assets)) {
            state.model.assets = [];
        }
        if (!currentNamespace || !state.model.namespaces.some(ns => ns.namespace === currentNamespace)) {
            currentNamespace = state.model.namespaces.length > 0 ? state.model.namespaces[0].namespace : null;
        }
        if (currentDetail) {
            const fresh = findEntry(currentDetail.kind, currentDetail.namespace + ':' + currentDetail.id);
            currentDetail = fresh || null;
        }
        renderAll();
    });

    function send(message) {
        vscode.postMessage(message);
    }

    // ---------- Rendering ----------

    function renderAll() {
        try {
            renderRoots();
            renderStatus();
            renderNamespaceTabs();
            if (currentDetail) {
                $('overview').hidden = true;
                $('detail').hidden = false;
                renderDetail(currentDetail);
            } else {
                $('detail').hidden = true;
                $('overview').hidden = false;
                renderOverview();
            }
        } catch (error) {
            const overview = $('overview');
            if (overview) {
                overview.hidden = false;
                overview.innerHTML = `<div class="empty-state">⚠️ 界面渲染出错：${esc(error && error.message ? error.message : String(error))}</div>`;
            }
        }
    }

    function renderRoots() {
        const model = state.model;
        const roots = model.roots || [];
        const el = $('roots');
        if (roots.length === 0) {
            el.textContent = '未找到数据包：请打开工作区或手动选择目录';
        } else {
            el.textContent = '📁 ' + roots.join('  |  ');
        }
    }

    function renderStatus() {
        const model = state.model;
        const entries = model.namespaces.flatMap(ns => ns.entries || []);
        const errors = model.errors || [];
        const el = $('status');
        let text = `共 ${entries.length} 个数据文件`;
        if (model.namespaces.length > 0) {
            text += `，${model.namespaces.length} 个命名空间`;
        }
        if (errors.length > 0) {
            text += `，⚠️ ${errors.length} 个解析错误`;
        }
        el.textContent = text;
    }

    function renderNamespaceTabs() {
        const container = $('namespaceTabs');
        container.innerHTML = '';
        const model = state.model;

        if (!model.namespaces || model.namespaces.length === 0) {
            return;
        }

        for (const ns of model.namespaces) {
            const button = document.createElement('button');
            button.textContent = ns.namespace;
            button.className = ns.namespace === currentNamespace ? 'active' : '';
            button.addEventListener('click', () => {
                currentNamespace = ns.namespace;
                currentDetail = null;
                renderAll();
            });
            container.appendChild(button);
        }
    }

    function renderAddFileButton(kind, namespace) {
        return `<button class="add-file-btn" data-kind="${esc(kind)}" data-namespace="${esc(namespace)}">＋ 添加文件</button>`;
    }

    function renderOverview() {
        const container = $('overview');
        const ns = getCurrentNamespace();

        if (!ns) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>🐉 没有发现龙之生存数据包。</p>
                    <p>请打开包含 <code>data/&lt;命名空间&gt;/dragonsurvival/</code> 的工作区，<br>
                    或点击“选择目录”手动指定数据包/模组源码目录。</p>
                    <button class="add-file-btn" data-kind="dragon_species" data-namespace="dragonsurvival">＋ 增加龙种</button>
                    <p style="font-size: 11px; color: var(--vscode-descriptionForeground, #9d9d9d); margin-top: 8px;">
                        点击后会在当前工作区自动创建基础龙种数据包。
                    </p>
                </div>`;
            return;
        }

        const species = getEntries(ns, 'dragon_species');
        const stages = getEntries(ns, 'dragon_stage');
        const abilities = getEntries(ns, 'dragon_ability');
        const penalties = getEntries(ns, 'dragon_penalty');
        const projectiles = getEntries(ns, 'projectile_data');
        // 数据映射、龙体、表情组、标签必须固定放在 dragonsurvival 命名空间下。
        const globalNs = state.model.namespaces.find(item => item.namespace === 'dragonsurvival') || ns;
        const dragonBodies = getEntries(globalNs, 'dragon_body');
        const dragonEmotes = getEntries(globalNs, 'dragon_emote_set');
        const dietEntries = getEntries(globalNs, 'diet_entries');
        const stageResources = getEntries(globalNs, 'stage_resources');
        const endPlatforms = getEntries(globalNs, 'end_platforms');
        const beaconData = getEntries(globalNs, 'dragon_beacon_data');
        const bodyIcons = getEntries(globalNs, 'body_icons');
        const globalTags = globalNs.tags || [];

        let html = '';

        // Species overview
        html += `<div class="section-title">🐲 龙种 (${species.length}) ${renderAddFileButton('dragon_species', ns.namespace)}</div>`;
        if (species.length === 0) {
            html += `<div class="empty-state">未定义 dragon_species</div>`;
        } else {
            html += `<div class="card-grid">`;
            for (const entry of species) {
                html += renderSpeciesCard(entry);
            }
            html += `</div>`;
        }

        // Stage overview
        html += `<div class="section-title">📈 成长阶段 (${stages.length}) ${renderAddFileButton('dragon_stage', ns.namespace)}</div>`;
        html += renderEntryGrid(stages, (entry) => {
            const d = entry.data || {};
            const range = d.growth_range || {};
            const ticks = d.ticks_until_grown;
            return `
                <div class="card" data-kind="${entry.kind}" data-namespace="${entry.namespace}" data-id="${entry.namespace}:${entry.id}">
                    <div class="card-header">
                        <span class="card-title">${esc(entry.id)}</span>
                        ${d.is_default ? '<span class="badge">默认</span>' : ''}
                        <button class="delete-file-btn" data-file-path="${encodeURIComponent(entry.filePath)}" title="删除文件">🗑</button>
                    </div>
                    <div class="card-subtitle">成长范围 ${fmt(range.min)} ~ ${fmt(range.max)}</div>
                    <div class="card-subtitle">成熟耗时 ${formatTicks(ticks)}</div>
                    <div class="card-subtitle">属性修正 ${(d.modifiers || []).length} 条 · 成长物品 ${(d.growth_items || []).length} 种</div>
                </div>`;
        });

        // Ability overview
        html += `<div class="section-title">⚡ 能力 (${abilities.length}) ${renderAddFileButton('dragon_ability', ns.namespace)}</div>`;
        html += renderEntryGrid(abilities, (entry) => {
            const d = entry.data || {};
            const activation = d.activation || {};
            const upgrade = d.upgrade || {};
            return `
                <div class="card" data-kind="${entry.kind}" data-namespace="${entry.namespace}" data-id="${entry.namespace}:${entry.id}">
                    <div class="card-header">
                        <span class="card-title">${esc(entry.id)}</span>
                        <span class="badge">${esc(activation.activation_type || 'unknown')}</span>
                        <button class="delete-file-btn" data-file-path="${encodeURIComponent(entry.filePath)}" title="删除文件">🗑</button>
                    </div>
                    <div class="card-subtitle">最大等级 ${upgrade.maximum_level ?? 1}</div>
                    ${activation.cooldown ? `<div class="card-subtitle">冷却 ${activation.cooldown} tick</div>` : ''}
                    ${activation.cast_time ? `<div class="card-subtitle">施法 ${activation.cast_time} tick</div>` : ''}
                    <div class="card-subtitle">动作 ${(d.actions || []).length} 组</div>
                </div>`;
        });

        // Penalty overview
        html += `<div class="section-title">⚠️ 惩罚 (${penalties.length}) ${renderAddFileButton('dragon_penalty', ns.namespace)}</div>`;
        html += renderEntryGrid(penalties, (entry) => {
            const d = entry.data || {};
            const effect = d.effect || {};
            const trigger = d.trigger || {};
            return `
                <div class="card" data-kind="${entry.kind}" data-namespace="${entry.namespace}" data-id="${entry.namespace}:${entry.id}">
                    <div class="card-header">
                        <span class="card-title">${esc(entry.id)}</span>
                        <span class="badge">${esc(effect.penalty_type || 'unknown')}</span>
                        <button class="delete-file-btn" data-file-path="${encodeURIComponent(entry.filePath)}" title="删除文件">🗑</button>
                    </div>
                    <div class="card-subtitle">触发 ${esc(trigger.penalty_trigger || 'unknown')}</div>
                    <div class="card-subtitle">恢复物品 ${countRecoveryItems(d)} 种</div>
                </div>`;
        });

        // Projectile overview
        html += `<div class="section-title">🎯 弹射物 (${projectiles.length}) ${renderAddFileButton('projectile_data', ns.namespace)}</div>`;
        html += renderEntryGrid(projectiles, (entry) => {
            const d = entry.data || {};
            const g = d.general_data || {};
            const t = d.type_data || {};
            const b = t.behaviour_data || {};
            return `
                <div class="card" data-kind="${entry.kind}" data-namespace="${entry.namespace}" data-id="${entry.namespace}:${entry.id}">
                    <div class="card-header">
                        <span class="card-title">${esc(entry.id)}</span>
                        <button class="delete-file-btn" data-file-path="${encodeURIComponent(entry.filePath)}" title="删除文件">🗑</button>
                    </div>
                    <div class="card-subtitle">${esc(g.name || '')}</div>
                    <div class="card-subtitle">最大寿命 ${fmt(b.max_lifespan)} tick · 移动距离 ${fmt(b.max_movement_distance)}</div>
                </div>`;
        });

        // Dragon body / emote set（固定放在 dragonsurvival 命名空间）
        html += `<div class="section-title">🦴 龙体 (${dragonBodies.length}) ${renderAddFileButton('dragon_body', globalNs.namespace)}</div>`;
        html += renderEntryGrid(dragonBodies, (entry) => renderSimpleDataCard(entry));
        html += `<div class="section-title">😀 表情组 (${dragonEmotes.length}) ${renderAddFileButton('dragon_emote_set', globalNs.namespace)}</div>`;
        html += renderEntryGrid(dragonEmotes, (entry) => renderSimpleDataCard(entry));

        // Data maps（固定放在 dragonsurvival 命名空间）
        html += `<div class="section-title">🍖 食物列表 (${dietEntries.length}) ${renderAddFileButton('diet_entries', globalNs.namespace)}</div>`;
        html += renderEntryGrid(dietEntries, (entry) => renderSimpleDataCard(entry));
        html += `<div class="section-title">🎨 阶段资源 (${stageResources.length}) ${renderAddFileButton('stage_resources', globalNs.namespace)}</div>`;
        html += renderEntryGrid(stageResources, (entry) => renderSimpleDataCard(entry));
        html += `<div class="section-title">🌌 末地平台 (${endPlatforms.length}) ${renderAddFileButton('end_platforms', globalNs.namespace)}</div>`;
        html += renderEntryGrid(endPlatforms, (entry) => renderSimpleDataCard(entry));
        html += `<div class="section-title">✨ 祭坛/信标效果 (${beaconData.length}) ${renderAddFileButton('dragon_beacon_data', globalNs.namespace)}</div>`;
        html += renderEntryGrid(beaconData, (entry) => renderSimpleDataCard(entry));
        html += `<div class="section-title">🧩 龙体图标 (${bodyIcons.length}) ${renderAddFileButton('body_icons', globalNs.namespace)}</div>`;
        html += renderEntryGrid(bodyIcons, (entry) => renderSimpleDataCard(entry));

        // Tags（固定放在 dragonsurvival 命名空间）
        html += `<div class="section-title">🏷️ 标签 (${globalTags.length})</div>`;
        html += globalTags.length ? `<div class="card-grid">${globalTags.map(tag => renderTagCard(tag)).join('')}</div>` : '<div class="empty-state">暂无标签</div>';


        // Resource pack (assets)
        const assetNamespaces = state.model.assets || [];
        html += `<div class="section-title">📦 资源包 (${assetNamespaces.length} 个命名空间)</div>`;
        html += assetNamespaces.length
            ? `<div class="card-grid">${assetNamespaces.map(nsAsset => renderAssetNamespaceCard(nsAsset)).join('')}</div>`
            : '<div class="empty-state">未发现 assets 资源目录</div>';



        if (state.model.errors && state.model.errors.length > 0) {
            html += `<div class="section-title">⚠️ 解析错误 (${state.model.errors.length})</div>`;
            html += `<div class="empty-state">${state.model.errors.map(err => `<div>${esc(err.filePath || '')}: ${esc(err.message)}</div>`).join('')}</div>`;
        }

        container.innerHTML = html;
    }

    function renderSimpleDataCard(entry) {
        return `
            <div class="card" data-kind="${entry.kind}" data-namespace="${entry.namespace}" data-id="${entry.namespace}:${entry.id}">
                <div class="card-header">
                    <span class="card-title">${esc(KIND_LABELS[entry.kind] || entry.id)}</span>
                    <button class="delete-file-btn" data-file-path="${encodeURIComponent(entry.filePath)}" title="删除文件">🗑</button>
                </div>
                <div class="card-subtitle">${esc(entry.id)}</div>
                <div class="card-subtitle">${esc(entry.filePath)}</div>
            </div>`;
    }

    function renderTagCard(tag) {
        const registryLabel = KIND_LABELS[tag.registry] || tag.registry;
        return `
            <div class="card">
                <div class="card-header">
                    <span class="card-title">${esc(tag.id)}</span>
                    <span class="badge">${esc(registryLabel)}</span>
                    <button class="delete-file-btn" data-file-path="${encodeURIComponent(tag.filePath)}" title="删除文件">🗑</button>
                </div>
                <div class="card-subtitle">${(tag.values || []).length} 个引用</div>
                <button class="edit-tag-btn back-button" data-tag-file="${encodeURIComponent(tag.filePath)}" data-tag-values="${encodeURIComponent(JSON.stringify(tag.values || []))}" style="margin-top: 6px">编辑</button>
            </div>`;
    }

    function renderAssetNamespaceCard(nsAsset) {
        return `
            <div class="card">
                <div class="card-header">
                    <span class="card-title">📦 ${esc(nsAsset.namespace)}</span>
                    <span class="badge">${nsAsset.totalFiles} 文件</span>
                </div>
                ${nsAsset.categories.map(cat => `
                    <details class="asset-category">
                        <summary>${esc(cat.name)} (${cat.fileCount})</summary>
                        <div class="asset-file-list">
                            ${cat.files.slice(0, 20).map(file => `
                                <button class="asset-file-open back-button" data-file-path="${encodeURIComponent(file.filePath)}" title="打开文件">${esc(file.relativePath)}</button>
                            `).join('')}
                            ${cat.files.length > 20 ? `<div class="card-subtitle">还有 ${cat.files.length - 20} 个文件</div>` : ''}
                        </div>
                    </details>`).join('')}
            </div>`;
    }



    function renderEntryGrid(entries, cardRenderer) {
        if (entries.length === 0) {
            return `<div class="empty-state">暂无数据</div>`;
        }
        return `<div class="card-grid">${entries.map(cardRenderer).join('')}</div>`;
    }

    function renderSpeciesCard(entry) {
        const d = entry.data || {};
        const meta = entry.meta || {};
        const stages = (meta.stages && meta.stages.length > 0) ? meta.stages : getDefaultStages(getCurrentNamespace());
        const abilities = meta.abilities || [];
        const penalties = meta.penalties || [];
        const colors = (d.misc_resources || {});
        const primary = colors.primary_color || '#FFFFFF';
        const secondary = colors.secondary_color || '#FFFFFF';

        const flowHtml = stages.length > 0 ? `
            <div class="flow">
                ${stages.map((stage, i) => {
                    const stageEntry = findEntry('dragon_stage', stage);
                    const isDefault = stageEntry && stageEntry.data && stageEntry.data.is_default;
                    return `
                        ${i > 0 ? '<span class="flow-arrow">→</span>' : ''}
                        <span class="flow-node ${isDefault ? 'default' : ''}" title="${esc(stage)}">${esc(shortName(stage))}</span>`;
                }).join('')}
            </div>` : '<div class="card-subtitle">未配置自定义阶段链</div>';

        return `
            <div class="card species-card" style="--species-color:${esc(primary)}" data-kind="${entry.kind}" data-namespace="${entry.namespace}" data-id="${entry.namespace}:${entry.id}">
                <div class="card-header">
                    <span class="card-title">${esc(entry.id)}</span>
                    <span class="badge">${abilities.length} 能力 · ${penalties.length} 惩罚</span>
                    <button class="delete-file-btn" data-file-path="${encodeURIComponent(entry.filePath)}" title="删除文件">🗑</button>
                </div>
                <div class="card-subtitle">${esc(entry.filePath)}</div>
                <div class="color-swatches">
                    <span class="color-swatch" style="background:${esc(primary)}" title="主色 ${esc(primary)}"></span>
                    <span class="color-swatch" style="background:${esc(secondary)}" title="辅色 ${esc(secondary)}"></span>
                </div>
                <div class="color-hex-list">
                    <span class="chip">主 ${esc(primary)}</span>
                    <span class="chip">辅 ${esc(secondary)}</span>
                </div>
                ${flowHtml}
                ${renderChips(abilities.slice(0, 12), 'dragon_ability', '能力')}
                ${renderChips(penalties.slice(0, 8), 'dragon_penalty', '惩罚')}
            </div>`;
    }

    function renderChips(ids, kind, label) {
        if (!ids || ids.length === 0) return '';
        const max = 12;
        const shown = ids.slice(0, max);
        const more = ids.length - shown.length;
        return `<div class="chip-list"><span class="badge">${label}</span>${shown.map(id => `<span class="chip">${esc(shortName(id))}</span>`).join('')}${more > 0 ? `<span class="chip">+${more}</span>` : ''}</div>`;
    }

    // ---------- Detail ----------

    function renderDetail(entry) {
        const container = $('detail');
        let body = '';

        if (entry.kind === 'dragon_species') body = renderSpeciesDetail(entry);
        else if (entry.kind === 'dragon_stage') body = renderStageDetail(entry);
        else if (entry.kind === 'dragon_ability') body = renderAbilityDetail(entry);
        else if (entry.kind === 'dragon_penalty') body = renderPenaltyDetail(entry);
        else if (entry.kind === 'projectile_data') body = renderProjectileDetail(entry);
        else if (entry.kind === 'dragon_body') body = renderDragonBodyDetail(entry);
        else if (entry.kind === 'dragon_emote_set') body = renderDragonEmoteSetDetail(entry);
        else if (entry.kind === 'diet_entries') body = renderDietEntriesDetail(entry);
        else if (entry.kind === 'stage_resources') body = renderStageResourcesDetail(entry);
        else if (entry.kind === 'end_platforms') body = renderEndPlatformsDetail(entry);
        else if (entry.kind === 'dragon_beacon_data') body = renderDragonBeaconDataDetail(entry);
        else if (entry.kind === 'body_icons') body = renderBodyIconsDetail(entry);
        else body = `<pre class="raw">${esc(JSON.stringify(entry.data, null, 2))}</pre>`;

        container.innerHTML = `
            <div class="detail-header">
                <button class="back-button" id="backBtn">← 返回</button>
                <h2>${esc(entry.id)}</h2>
                <span class="badge">${esc(entry.kind)}</span>
                <button class="back-button" id="openFileBtn">打开文件</button>
                <button class="back-button primary" id="editBtn">编辑 JSON</button>
            </div>
            <div class="detail-path">${esc(entry.filePath)}</div>
            ${body}
            <details>
                <summary>查看原始 JSON</summary>
                <pre class="raw">${esc(JSON.stringify(entry.data, null, 2))}</pre>
            </details>`;

        $('backBtn').addEventListener('click', () => {
            currentDetail = null;
            renderAll();
        });
        $('openFileBtn').addEventListener('click', () => send({ type: 'openFile', filePath: entry.filePath }));
        $('editBtn').addEventListener('click', () => openEditor(entry));

        if (entry.kind === 'dragon_species') {
            bindSpeciesColorHandlers(entry);
        } else if (entry.kind === 'dragon_stage') {
            bindStageEditorHandlers(entry);
        } else if (entry.kind === 'dragon_ability') {
            bindAbilityEditorHandlers(entry);
        }
    }

    function renderSpeciesDetail(entry) {
        const d = entry.data || {};
        const meta = entry.meta || {};
        const stages = (meta.stages && meta.stages.length > 0) ? meta.stages : getDefaultStages(getCurrentNamespace());
        const abilities = meta.abilities || [];
        const penalties = meta.penalties || [];
        const colors = d.misc_resources || {};
        const primaryColor = colors.primary_color || '#FFFFFF';
        const secondaryColor = colors.secondary_color || '#FFFFFF';

        return `
            <div class="section-title">食物悬浮框颜色</div>
            <div class="color-edit-grid">
                <label class="color-edit-field">
                    <span class="form-label">主色</span>
                    <div class="color-edit-control">
                        <input type="color" id="primaryColorPicker" value="${esc(primaryColor)}">
                        <span id="primaryColorHex" class="color-hex">${esc(primaryColor)}</span>
                    </div>
                </label>
                <label class="color-edit-field">
                    <span class="form-label">辅色</span>
                    <div class="color-edit-control">
                        <input type="color" id="secondaryColorPicker" value="${esc(secondaryColor)}">
                        <span id="secondaryColorHex" class="color-hex">${esc(secondaryColor)}</span>
                    </div>
                </label>
            </div>
            <button id="saveColorBtn" class="back-button primary">保存颜色</button>

            <div class="section-title">🐲 龙种引用</div>
            <div class="ability-editor">${renderStructuredForm({ abilities: d.abilities, penalties: d.penalties }, 0, [])}</div>

            <div class="section-title">🎨 misc_resources 全部字段</div>
            <div class="ability-editor">${renderStructuredForm(d.misc_resources || {}, 0, ['misc_resources'])}</div>

            <div class="section-title">阶段链</div>
            <div class="flow">
                ${stages.length ? stages.map((stage, i) => {
                    const stageEntry = findEntry('dragon_stage', stage);
                    const isDefault = stageEntry && stageEntry.data && stageEntry.data.is_default;
                    return `${i > 0 ? '<span class="flow-arrow">→</span>' : ''}<span class="flow-node ${isDefault ? 'default' : ''}" title="${esc(stage)}">${esc(shortName(stage))}</span>`;
                }).join('') : '<span class="empty-state">未配置</span>'}
            </div>
            <div class="section-title">能力 (${abilities.length})</div>
            ${renderIdTable(abilities, 'dragon_ability')}
            <div class="section-title">惩罚 (${penalties.length})</div>
            ${renderIdTable(penalties, 'dragon_penalty')}
        `;
    }

    function bindSpeciesColorHandlers(entry) {
        const primary = $('primaryColorPicker');
        const secondary = $('secondaryColorPicker');
        const saveBtn = $('saveColorBtn');

        if (!primary || !secondary) {
            return;
        }

        const primaryHex = $('primaryColorHex');
        const secondaryHex = $('secondaryColorHex');

        primary.addEventListener('input', () => {
            if (primaryHex) primaryHex.textContent = primary.value;
        });
        secondary.addEventListener('input', () => {
            if (secondaryHex) secondaryHex.textContent = secondary.value;
        });

        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                const data = JSON.parse(JSON.stringify(entry.data || {}));
                data.misc_resources = data.misc_resources || {};
                data.misc_resources.primary_color = primary.value;
                data.misc_resources.secondary_color = secondary.value;

                send({
                    type: 'save',
                    filePath: entry.filePath,
                    text: JSON.stringify(data, null, 2)
                });
            });
        }
    }


    function renderStageDetail(entry) {
        const d = entry.data || {};
        const range = d.growth_range || {};
        const modifiers = d.modifiers || [];
        const growthItems = d.growth_items || [];
        const destruction = d.destruction_data || {};

        const infoItems = [
            ['成长范围', `${fmt(range.min)} ~ ${fmt(range.max)}`],
            ['成熟耗时', formatTicks(d.ticks_until_grown)],
            ['方块破坏成长', fmt(destruction.block_destruction_growth)],
            ['碾压成长', fmt(destruction.crushing_growth)]
        ].filter(item => item[1] !== undefined && item[1] !== '').map(([k, v]) => `<div class="info-item"><div class="info-label">${esc(k)}</div><div class="info-value">${esc(v)}</div></div>`).join('');

        const modifierRows = modifiers.map(m => {
            const amount = typeof m.amount === 'object' ? JSON.stringify(m.amount) : fmt(m.amount);
            return `<tr><td>${esc(m.attribute || '')}</td><td>${esc(m.operation || '')}</td><td>${esc(amount)}</td></tr>`;
        }).join('');

        const itemRows = growthItems.map(item => {
            const items = typeof item.items === 'string' ? item.items : JSON.stringify(item.items);
            return `<tr><td>${esc(items)}</td><td>${formatTicks(item.growth_in_ticks)}</td></tr>`;
        }).join('');

        return `
            <div class="section-title">阶段属性</div>
            <div class="ability-editor">
                <div class="editor-field">
                    <label class="form-label">默认阶段</label>
                    <select id="isDefaultStage" class="form-select">
                        <option value="true" ${d.is_default ? 'selected' : ''}>是</option>
                        <option value="false" ${!d.is_default ? 'selected' : ''}>否</option>
                    </select>
                </div>
                <div class="editor-field">
                    <label class="form-label">自然生长停止</label>
                    <select id="isNaturalGrowthStopped" class="form-select">
                        <option value="true" ${d.is_natural_growth_stopped ? 'selected' : ''}>是</option>
                        <option value="false" ${!d.is_natural_growth_stopped ? 'selected' : ''}>否</option>
                    </select>
                </div>
                <button id="saveStageBtn" class="back-button primary">保存修改</button>
            </div>
            <div class="info-grid">${infoItems}</div>
            <div class="section-title">属性修正 (${modifiers.length})</div>
            ${modifiers.length ? `<table><thead><tr><th>属性</th><th>运算</th><th>数值</th></tr></thead><tbody>${modifierRows}</tbody></table>` : '<div class="empty-state">无</div>'}
            <div class="section-title">成长物品 (${growthItems.length})</div>
            ${growthItems.length ? `<table><thead><tr><th>物品</th><th>成长时间</th></tr></thead><tbody>${itemRows}</tbody></table>` : '<div class="empty-state">无</div>'}
        `;
    }

    function bindStageEditorHandlers(entry) {
        const saveBtn = $('saveStageBtn');
        if (!saveBtn) return;

        saveBtn.addEventListener('click', () => {
            const data = JSON.parse(JSON.stringify(entry.data || {}));
            const isDefault = $('isDefaultStage');
            const stopped = $('isNaturalGrowthStopped');

            if (isDefault) {
                data.is_default = isDefault.value === 'true';
            }

            if (stopped) {
                if (stopped.value === 'true') {
                    if (!data.is_natural_growth_stopped) {
                        data.is_natural_growth_stopped = {
                            type_specific: {
                                type: 'dragonsurvival:dragon_predicate',
                                is_growth_stopped: true
                            }
                        };
                    }
                } else {
                    delete data.is_natural_growth_stopped;
                }
            }

            send({
                type: 'save',
                filePath: entry.filePath,
                text: JSON.stringify(data, null, 2)
            });
        });
    }

    function renderAbilityDetail(entry) {
        const d = entry.data || {};
        const activation = d.activation || {};
        const upgrade = d.upgrade || {};
        const actions = d.actions || [];
        const icon = d.icon || {};

        const iconEntries = (icon.texture_entries || []).map(ie => `<span class="chip">Lv${ie.from_level} → ${esc(shortName(ie.texture_resource))}</span>`).join('');

        return `
            <div class="section-title">激活方式</div>
            ${renderActivationEditor(activation)}
            <div class="section-title">升级</div>
            ${renderUpgradeEditor(upgrade)}
            ${d.usage_blocked ? `
                <div class="section-title">使用限制</div>
                <div class="ability-editor">${renderStructuredForm(d.usage_blocked, 0, ['usage_blocked'])}</div>` : ''}
            ${d.can_be_manually_disabled != null ? `
                <div class="section-title">其他</div>
                <div class="ability-editor">
                    <div class="editor-field">
                        <label class="form-label">可手动禁用</label>
                        <select id="canBeManuallyDisabled" class="form-select">
                            <option value="true" ${d.can_be_manually_disabled ? 'selected' : ''}>是</option>
                            <option value="false" ${!d.can_be_manually_disabled ? 'selected' : ''}>否</option>
                        </select>
                    </div>
                </div>` : ''}
            <div class="section-title">图标</div>
            ${renderStructuredForm(icon, 0, ['icon'])}
            <div class="section-title">动作 (${actions.length})</div>
            ${actions.length ? actions.map((action, i) => `
                <div class="action-block" data-action-index="${i}">
                    <div class="action-header">
                        <span>动作 ${i + 1}</span>
                        <button class="delete-action-btn" data-action-index="${i}" title="删除该动作">🗑</button>
                    </div>
                    ${renderStructuredForm(action, 0, ['actions', i])}
                </div>`).join('') : '<div class="empty-state">暂无动作，点击下方按钮添加</div>'}
            <button id="addActionBtn" class="back-button primary" style="margin-top: 4px">＋ 添加动作</button>
            <button id="saveAbilityBtn" class="back-button primary" style="margin-top: 12px">保存修改</button>
        `;

    }

    const ACTIVATION_TYPE_OPTIONS = [
        { value: 'dragonsurvival:passive', label: '被动 Passive' },
        { value: 'dragonsurvival:simple', label: '简单 Simple' },
        { value: 'dragonsurvival:channeled', label: '持续 Channeled' }
    ];

    const UPGRADE_TYPE_OPTIONS = [
        { value: 'dragonsurvival:experience_points', label: '经验点数 Experience Points' },
        { value: 'dragonsurvival:experience_levels', label: '经验等级 Experience Level' },
        { value: 'dragonsurvival:dragon_growth', label: '龙之成长 Dragon Growth' },
        { value: 'dragonsurvival:item_based', label: '物品 Item' },
        { value: 'dragonsurvival:condition_based', label: '条件 Condition' }
    ];

    function renderActivationEditor(activation) {
        const activationType = activation.activation_type || 'dragonsurvival:simple';
        const continuous = activation.continuous_mana_cost || {};
        const canMove = activation.can_move_while_casting !== false;

        return `
            <div class="ability-editor">
                <div class="editor-field">
                    <label class="form-label">激活类型</label>
                    <select id="activationType" class="form-select">
                        ${ACTIVATION_TYPE_OPTIONS.map(option => `<option value="${esc(option.value)}" ${option.value === activationType ? 'selected' : ''}>${esc(option.label)}</option>`).join('')}
                    </select>
                </div>
                ${renderEditableNumber('初始魔力消耗', 'initialManaCost', activation.initial_mana_cost)}
                <div class="editor-field">
                    <label class="form-label">持续魔力消耗</label>
                    <div class="editor-row">
                        <select id="continuousManaType" class="form-select">
                            <option value="ticking" ${continuous.type === 'ticking' ? 'selected' : ''}>Ticking</option>
                        </select>
                        <input type="number" id="continuousManaAmount" class="form-input" step="0.01"
                            value="${typeof continuous.amount === 'number' ? continuous.amount : ''}" placeholder="数值">
                    </div>
                </div>
                ${renderEditableNumber('施法时间（tick）', 'castTime', activation.cast_time)}
                ${renderEditableNumber('冷却（tick）', 'cooldown', activation.cooldown)}
                ${renderEditableNumber('最大持续时间（tick）', 'maxDuration', activation.max_duration)}
                <div class="editor-field">
                    <label class="form-label">移动时施法</label>
                    <select id="canMoveWhileCasting" class="form-select">
                        <option value="true" ${canMove ? 'selected' : ''}>是</option>
                        <option value="false" ${!canMove ? 'selected' : ''}>否</option>
                    </select>
                </div>
            </div>`;
    }

    function renderUpgradeEditor(upgrade) {
        const upgradeType = upgrade.upgrade_type || 'dragonsurvival:experience_levels';
        const maxLevel = upgrade.maximum_level ?? 1;
        const requirement = upgrade.experience_cost || upgrade.level_requirement || upgrade.growth_requirement;
        let requirementPath = 'experience_cost';
        let requirementLabel = '等级/经验要求';
        if (upgrade.experience_cost) requirementPath = 'experience_cost';
        else if (upgrade.level_requirement) requirementPath = 'level_requirement';
        else if (upgrade.growth_requirement) requirementPath = 'growth_requirement';
        if (upgradeType.includes('experience_points')) requirementLabel = '经验消耗';
        else if (upgradeType.includes('experience_levels')) requirementLabel = '等级要求';
        else if (upgradeType.includes('dragon_growth')) requirementLabel = '成长要求';

        return `
            <div class="ability-editor">
                <div class="editor-field">
                    <label class="form-label">升级类型</label>
                    <select id="upgradeType" class="form-select">
                        ${UPGRADE_TYPE_OPTIONS.map(option => `<option value="${esc(option.value)}" ${option.value === upgradeType ? 'selected' : ''}>${esc(option.label)}</option>`).join('')}
                    </select>
                </div>
                <div class="editor-field">
                    <label class="form-label">最大等级</label>
                    <input type="number" id="maxLevel" class="form-input" value="${esc(maxLevel)}">
                </div>
                ${requirement ? `
                    <div class="editor-field">
                        <label class="form-label">${esc(requirementLabel)}</label>
                        ${renderLevelBasedValue(requirement, ['upgrade', requirementPath])}
                    </div>` : ''}
            </div>`;
    }

    function renderEditableNumber(label, id, value) {
        const isSimple = typeof value === 'number' || value === undefined || value === null;
        if (isSimple) {
            return `
                <div class="editor-field">
                    <label class="form-label">${esc(label)}</label>
                    <input type="number" id="${id}" class="form-input" step="0.01" value="${value ?? ''}">
                </div>`;
        }
        return `
            <div class="editor-field">
                <label class="form-label">${esc(label)}</label>
                ${renderLevelBasedValue(value)}
            </div>`;
    }

    function renderLevelBasedValue(value, path = []) {
        if (value === null || value === undefined) return '';
        if (typeof value === 'number') {
            return `<span class="form-value">${esc(value)}</span>`;
        }
        if (typeof value === 'object') {
            if (value.type === 'minecraft:linear') {
                const base = value.base ?? '';
                const per = value.per_level_above_first ?? '';
                return `<span class="form-value">基础 ${esc(base)}${per !== '' ? `，每级 +${esc(per)}` : ''}</span>`;
            }
            if (value.type === 'minecraft:lookup' && Array.isArray(value.values)) {
                return `<span class="form-value">各级数值：${esc(value.values.join(' / '))}</span>`;
            }
            return renderStructuredForm(value, 0, path);
        }
        return `<span class="form-value">${esc(String(value))}</span>`;
    }

    function bindAbilityEditorHandlers(entry) {
        const saveBtn = $('saveAbilityBtn');
        if (!saveBtn) return;

        const addActionBtn = $('addActionBtn');
        if (addActionBtn) {
            addActionBtn.addEventListener('click', () => {
                const data = entry.data || {};
                data.actions = Array.isArray(data.actions) ? data.actions : [];
                data.actions.push({
                    target_selection: {
                        target_type: 'dragonsurvival:self',
                        applied_effects: {
                            entity_effect: [],
                            block_effect: []
                        }
                    },
                    trigger_point: 'default',
                    trigger_rate: 0
                });
                renderDetail(entry);
                saveCurrentDetail();
            });
        }

        saveBtn.addEventListener('click', () => {
            const data = JSON.parse(JSON.stringify(entry.data || {}));
            data.activation = data.activation || {};

            const activationType = $('activationType');
            if (activationType) data.activation.activation_type = activationType.value;

            setNumberField(data.activation, 'initial_mana_cost', $('initialManaCost'));
            setNumberField(data.activation, 'cast_time', $('castTime'));
            setNumberField(data.activation, 'cooldown', $('cooldown'));
            setNumberField(data.activation, 'max_duration', $('maxDuration'));

            const contType = $('continuousManaType');
            const contAmount = $('continuousManaAmount');
            if (contType && contAmount && contAmount.value.trim() !== '') {
                data.activation.continuous_mana_cost = {
                    type: contType.value,
                    amount: Number(contAmount.value)
                };
            } else {
                delete data.activation.continuous_mana_cost;
            }

            const canMove = $('canMoveWhileCasting');
            if (canMove) data.activation.can_move_while_casting = canMove.value === 'true';

            data.upgrade = data.upgrade || {};
            const upgradeType = $('upgradeType');
            if (upgradeType) data.upgrade.upgrade_type = upgradeType.value;
            setNumberField(data.upgrade, 'maximum_level', $('maxLevel'));

            const canDisable = $('canBeManuallyDisabled');
            if (canDisable) data.can_be_manually_disabled = canDisable.value === 'true';

            send({
                type: 'save',
                filePath: entry.filePath,
                text: JSON.stringify(data, null, 2)
            });
        });
    }

    function setNumberField(obj, key, input) {
        if (!input) return;
        const val = input.value.trim();
        if (val === '') {
            delete obj[key];
        } else {
            obj[key] = Number(val);
        }
    }

    function renderStructuredForm(value, depth = 0, path = []) {
        if (value === null || value === undefined) {
            return '<span class="form-value">—</span>';
        }

        if (Array.isArray(value)) {
            if (path.length > 0 && path[path.length - 1] === 'spawn_position') {
                const labels = ['X', 'Y', 'Z'];
                return `<div class="form-object">
                    ${[0, 1, 2].map(i => {
                        const coordPath = encodeURIComponent(JSON.stringify([...path, i]));
                        return `<div class="form-field">
                            <span class="form-label">${labels[i]}</span>
                            <input type="number" class="form-input st-edit-field" data-edit-path="${coordPath}" step="0.01" value="${esc(value[i] ?? 0)}">
                        </div>`;
                    }).join('')}
                </div>`;
            }

            const encodedPath = encodeURIComponent(JSON.stringify(path));
            const addBtn = `<button class="add-array-btn" data-array-path="${encodedPath}">＋ 添加</button>`;
            if (value.length === 0) {
                return `<div class="form-array"><span class="form-empty">空</span>${addBtn}</div>`;
            }
            return `<div class="form-array">
                ${value.map((item, i) => `
                    <div class="form-card">
                        <div class="form-card-header">
                            <span class="form-card-title">${typeof item === 'object' && item !== null ? `第 ${i + 1} 项` : `第 ${i + 1} 项`}</span>
                            <button class="delete-array-item" data-array-path="${encodedPath}" data-array-index="${i}" title="删除此项">🗑</button>
                        </div>
                        ${renderStructuredForm(item, depth + 1, [...path, i])}
                    </div>`).join('')}
                ${addBtn}
            </div>`;
        }

        if (typeof value === 'object') {
            const entries = Object.entries(value);
            const encodedPath = encodeURIComponent(JSON.stringify(path));
            const isMap = path.length > 0 && path[path.length - 1] === 'values';

            if (isMap) {
                const addBtn = `<button class="add-map-entry" data-map-path="${encodedPath}">＋ 添加条目</button>`;
                return `<div class="form-object">
                    ${entries.map(([key, val]) => `
                        <div class="form-card">
                            <div class="form-card-header">
                                <input type="text" class="form-input st-map-key" data-map-path="${encodedPath}" data-map-old-key="${esc(key)}" value="${esc(key)}">
                                <button class="delete-map-entry" data-map-path="${encodedPath}" data-map-key="${esc(key)}" title="删除条目">🗑</button>
                            </div>
                            ${renderStructuredForm(val, depth + 1, [...path, key])}
                        </div>`).join('')}
                    ${addBtn}
                </div>`;
            }

            if (entries.length === 0) {
                const lastKey = path[path.length - 1];
                if (lastKey === 'applied_effects') {
                    return `<div class="form-object">${renderFieldPalette(path, value, false, false)}</div>`;
                }
                return '<span class="form-empty">空对象</span>';
            }

            const isProperties = path.length > 0 && path[path.length - 1] === 'properties';
            const isDietEntryRoot = Object.prototype.hasOwnProperty.call(value, 'items') && Object.prototype.hasOwnProperty.call(value, 'properties');
            const canDeleteField = isProperties || isDietEntryRoot;

            return `<div class="form-object">${entries.map(([key, val]) => {
                const label = humanizeKey(key);
                const childPath = [...path, key];
                const pathStr = encodeURIComponent(JSON.stringify(path));
                const deleteBtn = canDeleteField && key !== 'items'
                    ? `<button class="delete-field-btn" data-map-path="${pathStr}" data-field-key="${esc(key)}" title="删除字段">🗑</button>`
                    : '';

                if (Array.isArray(val)) {
                    return `
                        <div class="form-row">
                            <span class="form-label">${esc(label)}</span>
                            <span class="form-badge">${val.length}</span>
                            ${deleteBtn}
                        </div>
                        ${renderStructuredForm(val, depth + 1, childPath)}`;
                }

                if (val && typeof val === 'object') {
                    return `
                        <div class="form-row">
                            <span class="form-label">${esc(label)}</span>
                            ${deleteBtn}
                        </div>
                        <div class="form-card">${renderStructuredForm(val, depth + 1, childPath)}</div>`;
                }

                const fieldPath = encodeURIComponent(JSON.stringify(childPath));
                const enumOptions = ENUM_OPTIONS[childPath[childPath.length - 1]];
                let fieldControl;

                if (enumOptions) {
                    const currentValue = String(val);
                    const optionsHtml = enumOptions.map(option =>
                        `<option value="${esc(option.value)}" ${option.value === currentValue ? 'selected' : ''}>${esc(option.label)}</option>`
                    ).join('');
                    const currentOption = enumOptions.find(option => option.value === currentValue);
                    fieldControl = `<select class="form-select st-edit-field st-enum-field" data-edit-path="${fieldPath}">
                        ${currentOption ? '' : `<option value="${esc(currentValue)}" selected>${esc(currentValue)}</option>`}
                        ${optionsHtml}
                    </select>`;
                } else if (typeof val === 'boolean') {
                    fieldControl = `<select class="form-select st-edit-field" data-edit-path="${fieldPath}">
                        <option value="true" ${val ? 'selected' : ''}>是</option>
                        <option value="false" ${!val ? 'selected' : ''}>否</option>
                    </select>`;
                } else if (typeof val === 'number') {
                    fieldControl = `<input type="number" class="form-input st-edit-field" data-edit-path="${fieldPath}" step="0.01" value="${esc(val)}">`;
                } else {
                    fieldControl = `<input type="text" class="form-input st-edit-field" data-edit-path="${fieldPath}" value="${esc(val)}">`;
                }

                return `
                    <div class="form-field">
                        <span class="form-label">${esc(label)}</span>
                        <span class="field-control-row">${fieldControl}${deleteBtn}</span>
                    </div>`;
            }).join('')}${renderFieldPalette(path, value, isProperties, isDietEntryRoot)}</div>`;
        }

        return `<div class="form-field"><span class="form-value">${esc(formatValue(value))}</span></div>`;
    }

    const OPTIONAL_FIELD_LABELS = {
        nutrition: '营养',
        saturation: '饱和度',
        eat_seconds: '食用时间',
        can_always_eat: '饱食度满可吃',
        using_converts_to: '吃完变成',
        effects: '附加效果',
        retain_effects: '保留原效果',
        entity_effect: '实体效果',
        block_effect: '方块效果'
    };

    const PROPERTY_FIELD_DEFAULTS = {
        nutrition: 0,
        saturation: 0,
        eat_seconds: 1.6,
        can_always_eat: false,
        using_converts_to: { id: '', count: 1 },
        effects: []
    };

    function renderFieldPalette(path, obj, isProperties, isDietEntryRoot) {
        const encodedPath = encodeURIComponent(JSON.stringify(path));
        const buttons = [];
        const lastKey = path[path.length - 1];

        if (lastKey === 'applied_effects') {
            for (const field of ['entity_effect', 'block_effect']) {
                if (!(field in obj)) {
                    buttons.push(`<button class="add-field-btn" data-map-path="${encodedPath}" data-field-key="${esc(field)}" title="添加字段">＋ ${esc(OPTIONAL_FIELD_LABELS[field] || field)}</button>`);
                }
            }
        }

        if (isProperties) {
            for (const [field, def] of Object.entries(PROPERTY_FIELD_DEFAULTS)) {
                if (!(field in obj)) {
                    buttons.push(`<button class="add-field-btn" data-map-path="${encodedPath}" data-field-key="${esc(field)}" title="添加字段">＋ ${esc(OPTIONAL_FIELD_LABELS[field] || field)}</button>`);
                }
            }
        }

        if (isDietEntryRoot && !('retain_effects' in obj)) {
            buttons.push(`<button class="add-field-btn" data-map-path="${encodedPath}" data-field-key="retain_effects" title="添加字段">＋ ${esc(OPTIONAL_FIELD_LABELS.retain_effects)}</button>`);
        }

        if (buttons.length === 0) {
            return '';
        }

        return `<div class="field-palette">
            <span class="form-label">可添加字段</span>
            <div class="field-palette-buttons">${buttons.join('')}</div>
        </div>`;
    }


    const FORM_KEY_LABELS = {
        target_selection: '目标选择',
        target_type: '目标类型',
        range_multiplier: '范围倍率',
        applied_effects: '应用效果',
        entity_effect: '实体效果',
        block_effect: '方块效果',
        effect_type: '效果类型',
        target_conditions: '目标条件',
        targeting_mode: '目标模式',
        trigger_point: '触发点',
        trigger_rate: '触发频率',
        activation_type: '激活类型',
        initial_mana_cost: '初始魔力消耗',
        continuous_mana_cost: '持续魔力消耗',
        cast_time: '施法时间',
        cooldown: '冷却',
        max_duration: '最大持续时间',
        can_move_while_casting: '移动时施法',
        notification: '通知',
        sound: '声音',
        animations: '动画',
        upgrade_type: '升级类型',
        maximum_level: '最大等级',
        level_requirement: '等级要求',
        experience_cost: '经验消耗',
        growth_requirement: '成长要求',
        usage_blocked: '使用限制',
        condition: '条件',
        terms: '条款',
        require_previous: '需要前置',
        modifiers: '属性修正',
        amount: '数值',
        base: '基础值',
        per_level_above_first: '每级增加',
        values: '数值表',
        fallback: '默认值',
        icon: '图标',
        texture_entries: '图标纹理',
        from_level: '起始等级',
        texture_resource: '纹理资源',
        movement_speed: '移动速度',
        damage: '伤害',
        potion: '药水效果',
        probability: '概率',
        duration: '持续时间',
        amplifier: '等级',
        effects: '效果',
        entity: '实体',
        predicate: '条件',
        type: '类型',
        id: 'ID',
        count: '数量',
        items: '物品',
        input: '输入',
        output: '输出',
        progress: '进度',
        particle: '粒子',
        scale: '大小',
        spread: '扩散',
        speed_per_growth: '成长速度',
        penalty_type: '惩罚类型',
        penalty_trigger: '触发类型',
        supply_type: '供给类型',
        reduction_rate: '减少速率',
        regeneration_rate: '恢复速率',
        recovery_items: '恢复物品',
        display_like_hunger_bar: '类似饥饿条显示',
        particles_on_trigger: '触发粒子',
        item_predicates: '物品条件',
        percent_restored: '恢复比例',
        damage_types: '伤害类型',
        fears: '恐惧列表',
        modifications: '修改列表',
        duration: '持续时间',
        function: '函数'
    };

    const ENUM_OPTIONS = {
        target_type: [
            { value: 'dragonsurvival:area', label: '区域 Area' },
            { value: 'dragonsurvival:dragon_breath', label: '龙息 Dragon Breath' },
            { value: 'dragonsurvival:looking_at', label: '注视实体/方块 Looking At' },
            { value: 'dragonsurvival:self', label: '自身 Self' },
            { value: 'dragonsurvival:disc', label: '圆柱区域 Disc' }
        ],
        effect_type: [
            { value: 'dragonsurvival:damage', label: '造成伤害 Damage' },
            { value: 'dragonsurvival:modifier', label: '属性修改 Modifier' },
            { value: 'dragonsurvival:potion', label: '药水效果 Potion' },
            { value: 'dragonsurvival:projectile', label: '发射弹射物 Projectile' },
            { value: 'dragonsurvival:summon_entity', label: '召唤实体 Summon' },
            { value: 'dragonsurvival:damage_modification', label: '伤害修改 Damage Modification' },
            { value: 'dragonsurvival:breath_particles', label: '龙息粒子 Breath Particles' },
            { value: 'dragonsurvival:ignite', label: '点燃 Ignite' },
            { value: 'dragonsurvival:harvest_bonus', label: '挖掘加成 Harvest Bonus' },
            { value: 'dragonsurvival:on_attack', label: '攻击触发 On Attack' },
            { value: 'dragonsurvival:flight', label: '飞行 Flight' },
            { value: 'dragonsurvival:spin', label: '旋转攻击 Spin' },
            { value: 'dragonsurvival:item_conversion', label: '物品转换 Item Conversion' },
            { value: 'dragonsurvival:swim', label: '游泳 Swim' },
            { value: 'dragonsurvival:effect_modification', label: '效果修改 Effect Modification' },
            { value: 'dragonsurvival:particle', label: '粒子 Particle' },
            { value: 'dragonsurvival:glow', label: '发光 Glow' },
            { value: 'dragonsurvival:oxygen_bonus', label: '氧气加成 Oxygen Bonus' },
            { value: 'dragonsurvival:block_vision', label: '方块视野 Block Vision' },
            { value: 'dragonsurvival:run_function', label: '运行函数 Run Function' },
            { value: 'dragonsurvival:smelting', label: '熔炼 Smelting' },
            { value: 'dragonsurvival:heal', label: '治疗 Heal' },
            { value: 'dragonsurvival:teleport', label: '传送 Teleport' },
            { value: 'dragonsurvival:push', label: '推动 Push' },
            { value: 'dragonsurvival:hunger', label: '饥饿 Hunger' },
            { value: 'dragonsurvival:effect_removal', label: '移除效果 Effect Removal' },
            { value: 'dragonsurvival:use_item', label: '使用物品 Use Item' },
            { value: 'dragonsurvival:dragon_growth', label: '龙成长 Dragon Growth' },
            { value: 'dragonsurvival:mana_recovery', label: '法力恢复 Mana Recovery' },
            { value: 'dragonsurvival:experience', label: '经验 Experience' },
            { value: 'dragonsurvival:cooldown_recovery', label: '冷却恢复 Cooldown Recovery' }
        ],
        targeting_mode: [
            { value: 'all', label: '所有目标 All' },
            { value: 'allies', label: '盟友 Allies' },
            { value: 'allies_and_self', label: '盟友及自身 Allies And Self' },
            { value: 'non_allies', label: '非盟友 Non Allies' },
            { value: 'non_enemies', label: '非敌人 Non Enemies' },
            { value: 'neutral', label: '中立 Neutral' },
            { value: 'enemies', label: '敌人 Enemies' },
            { value: 'items', label: '物品 Items' },
            { value: 'all_except_self', label: '除自身外全部 All Except Self' }
        ],
        activation_type: [
            { value: 'dragonsurvival:passive', label: '被动 Passive' },
            { value: 'dragonsurvival:simple', label: '简单 Simple' },
            { value: 'dragonsurvival:channeled', label: '引导 Channeled' }
        ],
        trigger_point: [
            { value: 'default', label: '默认 Default' },
            { value: 'charging', label: '蓄力中 Charging' },
            { value: 'channel_completion', label: '引导结束 Channel Completion' }
        ],
        upgrade_type: [
            { value: 'dragonsurvival:experience_points', label: '经验点数 Experience Points' },
            { value: 'dragonsurvival:experience_levels', label: '经验等级 Experience Level' },
            { value: 'dragonsurvival:dragon_growth', label: '龙之成长 Dragon Growth' },
            { value: 'dragonsurvival:item_based', label: '物品 Item' },
            { value: 'dragonsurvival:condition_based', label: '条件 Condition' }
        ],
        direction: [
            { value: 'looking_at', label: '视线方向 Looking At' },
            { value: 'towards_entity', label: '朝向实体 Towards Entity' },
            { value: 'up', label: '上 Up' },
            { value: 'down', label: '下 Down' },
            { value: 'east', label: '东 East' },
            { value: 'west', label: '西 West' },
            { value: 'south', label: '南 South' },
            { value: 'north', label: '北 North' }
        ],
        display_type: [
            { value: 'outline', label: '轮廓 Outline' },
            { value: 'particles', label: '粒子 Particles' },
            { value: 'simple_shader', label: '着色器 Simple Shader' },
            { value: 'none', label: '无 None' }
        ],
        modification_type: [
            { value: 'additive', label: '加法 Additive' },
            { value: 'multiplicative', label: '乘法 Multiplicative' }
        ],
        penalty_type: [
            { value: 'dragonsurvival:take_damage', label: '造成伤害 Take Damage' },
            { value: 'dragonsurvival:mob_effect', label: '药水效果 Mob Effect' },
            { value: 'dragonsurvival:item_blacklist', label: '物品黑名单 Item Blacklist' },
            { value: 'dragonsurvival:damage_modification', label: '伤害修改 Damage Modification' },
            { value: 'dragonsurvival:fear', label: '恐惧 Fear' },
            { value: 'dragonsurvival:informational', label: '信息 Informational' },
            { value: 'dragonsurvival:modifier', label: '属性修改 Modifier' },
            { value: 'dragonsurvival:effect_modification', label: '效果修改 Effect Modification' },
            { value: 'dragonsurvival:run_function', label: '运行函数 Run Function' }
        ],
        penalty_trigger: [
            { value: 'dragonsurvival:supply', label: '缺陷条 Supply' },
            { value: 'dragonsurvival:instant', label: '即时 Instant' },
            { value: 'dragonsurvival:item_used', label: '物品使用 Item Used' },
            { value: 'dragonsurvival:hit_by_projectile', label: '被投射物击中 Hit By Projectile' },
            { value: 'dragonsurvival:hit_by_water_potion', label: '被药水击中 Hit By Water Potion' }
        ]
    };


    function humanizeKey(key) {
        if (FORM_KEY_LABELS[key]) {
            return FORM_KEY_LABELS[key];
        }
        const spaced = key.replace(/_/g, ' ');
        return spaced.charAt(0).toUpperCase() + spaced.slice(1);
    }

    function formatValue(value) {
        if (Array.isArray(value)) {
            return value.join(', ');
        }
        if (typeof value === 'boolean') {
            return value ? '是' : '否';
        }
        if (typeof value === 'object') {
            return JSON.stringify(value);
        }
        return String(value);
    }


    function renderPenaltyDetail(entry) {
        const d = entry.data || {};
        const effect = d.effect || {};
        const trigger = d.trigger || {};

        const infoItems = [
            ['图标', d.icon || ''],
            ['惩罚类型', effect.penalty_type || ''],
            ['触发类型', trigger.penalty_trigger || '']
        ].filter(item => item[1] !== '' && item[1] !== undefined).map(([k, v]) => `<div class="info-item"><div class="info-label">${esc(k)}</div><div class="info-value">${esc(v)}</div></div>`).join('');

        return `
            <div class="info-grid">${infoItems}</div>
            ${d.condition ? `
                <div class="section-title">触发条件</div>
                <div class="ability-editor">${renderStructuredForm(d.condition, 0, ['condition'])}</div>` : ''}
            <div class="section-title">⚠️ 效果（effect）</div>
            <div class="ability-editor">${renderStructuredForm(effect, 0, ['effect'])}</div>
            <div class="section-title">⚡ 触发（trigger）</div>
            <div class="ability-editor">${renderStructuredForm(trigger, 0, ['trigger'])}</div>
        `;
    }

    function renderProjectileDetail(entry) {
        const d = entry.data || {};
        const g = d.general_data || {};
        const t = d.type_data || {};
        const b = t.behaviour_data || {};

        const infoItems = [
            ['名称', g.name || ''],
            ['宽度', JSON.stringify(b.width || '')],
            ['高度', JSON.stringify(b.height || '')],
            ['最大寿命', b.max_lifespan != null ? `${fmt(b.max_lifespan)} tick` : ''],
            ['最大滞留', b.max_lingering_ticks != null ? `${fmt(b.max_lingering_ticks)} tick` : ''],
            ['最大移动距离', b.max_movement_distance != null ? fmt(b.max_movement_distance) : ''],
            ['拖尾粒子', JSON.stringify(t.trail_particle || '')]
        ].filter(item => item[1] !== '' && item[1] !== undefined).map(([k, v]) => `<div class="info-item"><div class="info-label">${esc(k)}</div><div class="info-value">${esc(v)}</div></div>`).join('');

        return `
            <div class="info-grid">${infoItems}</div>
            <div class="section-title">持续效果 (${(g.ticking_effects || []).length})</div>
            ${renderStructuredForm(g.ticking_effects || [], 0, ['general_data', 'ticking_effects'])}
            <div class="section-title">销毁效果 (${(t.on_destroy_effects || []).length})</div>
            ${renderStructuredForm(t.on_destroy_effects || [], 0, ['type_data', 'on_destroy_effects'])}
        `;
    }

    function renderDragonBodyDetail(entry) {
        const d = entry.data || {};
        const infoItems = [
            ['动画', d.animation || ''],
            ['默认', d.is_default ? '是' : '否'],
            ['可隐藏翅膀', d.can_hide_wings != null ? (d.can_hide_wings ? '是' : '否') : ''],
            ['表情组', d.emotes || ''],
            ['默认图标', d.default_icon || ''],
            ['蹲下高度比例', fmt(d.crouch_height_ratio || '')]
        ].filter(item => item[1] !== '' && item[1] !== undefined).map(([k, v]) => `<div class="info-item"><div class="info-label">${esc(k)}</div><div class="info-value">${esc(v)}</div></div>`).join('');

        return `
            <div class="info-grid">${infoItems}</div>
            <div class="section-title">属性修正 (${(d.modifiers || []).length})</div>
            ${renderStructuredForm(d.modifiers || [], 0, ['modifiers'])}
            <div class="section-title">缩放比例</div>
            ${renderStructuredForm(d.scaling_proportions || {}, 0, ['scaling_proportions'])}
        `;
    }

    function renderDragonEmoteSetDetail(entry) {
        const d = entry.data || {};
        const emotes = d.emotes || [];
        return `
            <div class="section-title">表情动作 (${emotes.length})</div>
            <div class="card-grid">
                ${emotes.map((emote, i) => `
                    <div class="card">
                        <div class="card-header"><span class="card-title">${esc(emote.animation_key || '动画')}</span><span class="badge">${emote.loops ? '循环' : '单次'}</span></div>
                        <div class="card-subtitle">可移动 ${emote.can_move ? '是' : '否'} · 融合 ${emote.blend ? '是' : '否'}</div>
                        <div class="card-subtitle">锁定头 ${emote.locks_head ? '是' : '否'} · 锁定尾 ${emote.locks_tail ? '是' : '否'}</div>
                        ${emote.sound ? `<div class="card-subtitle">声音 ${esc(emote.sound.sound_event || '')} · 间隔 ${fmt(emote.sound.interval)}</div>` : ''}
                        ${emote.speed != null ? `<div class="card-subtitle">速度 ${fmt(emote.speed)}</div>` : ''}
                        ${emote.translation_override ? `<div class="card-subtitle">覆盖 ${esc(emote.translation_override)}</div>` : ''}
                    </div>`).join('')}
            </div>`;
    }

    function renderDietEntriesDetail(entry) {
        return renderStructuredForm(entry.data || {}, 0, []);
    }

    function renderStageResourcesDetail(entry) {
        return renderStructuredForm(entry.data || {}, 0, []);
    }

    function renderEndPlatformsDetail(entry) {
        return renderStructuredForm(entry.data || {}, 0, []);
    }

    function renderDragonBeaconDataDetail(entry) {
        return renderStructuredForm(entry.data || {}, 0, []);
    }

    function renderBodyIconsDetail(entry) {
        return renderStructuredForm(entry.data || {}, 0, []);
    }

    function formatItemList(items) {
        if (Array.isArray(items)) return items.join(', ');
        return String(items ?? '');
    }


    function renderIdTable(ids, kind) {
        if (!ids || ids.length === 0) return '<div class="empty-state">无</div>';
        const rows = ids.map(id => {
            const entry = findEntry(kind, id);
            return `<tr><td>${esc(id)}</td><td>${entry ? `<span class="chip">${esc(entry.kind)}</span>` : '<span class="chip" style="color:var(--error)">未找到</span>'}</td></tr>`;
        }).join('');
        return `<table><thead><tr><th>ID</th><th>状态</th></tr></thead><tbody>${rows}</tbody></table>`;
    }

    // ---------- Editor ----------

    function openEditor(entry) {
        editingEntry = entry;
        $('editorTitle').textContent = `编辑 ${entry.id} (${entry.kind})`;
        $('editorText').value = JSON.stringify(entry.data, null, 2);
        $('editorError').textContent = '';
        $('editorOverlay').hidden = false;
        $('editorText').focus();
    }

    function closeEditor() {
        $('editorOverlay').hidden = true;
        editingEntry = null;
    }

    function saveEditor() {
        if (!editingEntry) return;
        const text = $('editorText').value;
        try {
            JSON.parse(text);
        } catch (error) {
            $('editorError').textContent = `JSON 格式错误：${error.message}`;
            return;
        }
        send({ type: 'save', filePath: editingEntry.filePath, text });
        closeEditor();
    }

    // ---------- Helpers ----------

    function getCurrentNamespace() {
        if (!state.model || !state.model.namespaces) return null;
        return state.model.namespaces.find(ns => ns.namespace === currentNamespace) || null;
    }

    function getEntries(ns, kind) {
        return (ns.entries || []).filter(e => e.kind === kind);
    }

    function getDefaultStages(ns) {
        if (!ns) return [];
        return getEntries(ns, 'dragon_stage')
            .filter(e => e.data && e.data.is_default === true)
            .sort((a, b) => {
                const aMin = (a.data && a.data.growth_range && a.data.growth_range.min) || 0;
                const bMin = (b.data && b.data.growth_range && b.data.growth_range.min) || 0;
                return aMin - bMin;
            })
            .map(e => `${e.namespace}:${e.id}`);
    }

    function findEntry(kind, id) {
        const model = state.model;
        if (!model) return null;
        // id may be "namespace:id" or just "id"
        const [nsPart, idPart] = id.includes(':') ? id.split(':') : [null, id];
        for (const ns of model.namespaces) {
            if (nsPart && ns.namespace !== nsPart) continue;
            const entry = (ns.entries || []).find(e => e.kind === kind && e.id === idPart);
            if (entry) return entry;
        }
        return null;
    }

    function shortName(id) {
        if (!id) return '';
        return id.includes(':') ? id.split(':')[1] : id;
    }

    function esc(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function fmt(value) {
        if (value === null || value === undefined) return '';
        if (typeof value === 'object') return JSON.stringify(value);
        return String(value);
    }

    function formatTicks(ticks) {
        if (ticks === null || ticks === undefined || isNaN(Number(ticks))) return '';
        const value = Number(ticks);
        const abs = Math.abs(value);
        const sign = value < 0 ? '-' : '';
        const seconds = Math.round(abs / 20);
        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        if (days > 0) return `${sign}${days}天 ${hours}小时`;
        if (hours > 0) return `${sign}${hours}小时 ${minutes}分`;
        if (minutes > 0) return `${sign}${minutes}分 ${secs}秒`;
        return `${sign}${secs}秒`;
    }

    function countRecoveryItems(d) {
        const trigger = d.trigger || {};
        const items = trigger.recovery_items || [];
        let count = 0;
        for (const item of items) {
            const preds = Array.isArray(item.item_predicates) ? item.item_predicates : [];
            for (const pred of preds) {
                count += Array.isArray(pred.items) ? pred.items.length : (pred.items ? 1 : 0);
            }
        }
        return count;
    }

    function deleteAction(index) {
        if (!currentDetail || !Array.isArray(currentDetail.data.actions)) {
            return;
        }
        currentDetail.data.actions.splice(index, 1);
        renderDetail(currentDetail);
        saveCurrentDetail();
    }

    function saveCurrentDetail() {
        if (!currentDetail) return;
        send({
            type: 'save',
            filePath: currentDetail.filePath,
            text: JSON.stringify(currentDetail.data, null, 2)
        });
    }
    function createDefaultArrayItem(path, arr) {
        const template = getArrayTemplate(path);
        if (arr.length > 0) {
            const firstClone = JSON.parse(JSON.stringify(arr[0]));
            if (template) {
                return mergeDeep(template, firstClone);
            }
            return firstClone;
        }
        return template || {};
    }

    function getArrayTemplate(path) {
        const lastKey = path[path.length - 1];

        if (lastKey === 'entity_effect') {
            return { effect_type: '' };
        }
        if (lastKey === 'block_effect') {
            return { effect_type: '' };
        }
        if (lastKey === 'ticking_effects') {
            return {
                general_data: { effects: [] },
                target_type: 'dragonsurvival:area',
                radius: { type: 'minecraft:linear', base: 1, per_level_above_first: 0 }
            };
        }
        if (lastKey === 'on_destroy_effects') {
            return {
                general_data: { effects: [] },
                target_type: 'dragonsurvival:point'
            };
        }
        if (lastKey === 'recovery_items') {
            return {
                item_predicates: [],
                percent_restored: 0.5
            };
        }
        if (lastKey === 'modifiers') {
            return {
                attribute: '',
                amount: 1,
                operation: 'add_value'
            };
        }
        if (lastKey === 'growth_items') {
            return {
                items: '',
                growth_in_ticks: 0
            };
        }
        if (lastKey === 'texture_entries') {
            return {
                from_level: 0,
                texture_resource: ''
            };
        }
        if (lastKey === 'emotes') {
            return {
                animation_key: '',
                can_move: true,
                loops: true
            };
        }
        if (lastKey === 'effects') {
            if (path.includes('properties')) {
                return {
                    effect: '',
                    duration: 0,
                    amplifier: 0,
                    probability: 1.0
                };
            }
            return {
                effect: '',
                duration: 0
            };
        }
        if (lastKey === 'conversions') {
            return {
                input: { items: '' },
                output: { id: '', count: 1 }
            };
        }
        if (lastKey === 'neoforge:value' || path.includes('values')) {
            return {
                items: '',
                properties: {
                    nutrition: 0,
                    saturation: 0,
                    eat_seconds: 1.6,
                    can_always_eat: false,
                    using_converts_to: {
                        id: '',
                        count: 1
                    },
                    effects: []
                },
                retain_effects: false
            };
        }

        return {};
    }

    function mergeDeep(base, override) {
        if (Array.isArray(base) || Array.isArray(override)) {
            return override;
        }
        if (base && typeof base === 'object' && override && typeof override === 'object') {
            const result = {};
            const keys = new Set([...Object.keys(base), ...Object.keys(override)]);
            for (const key of keys) {
                result[key] = Object.prototype.hasOwnProperty.call(override, key)
                    ? mergeDeep(base[key], override[key])
                    : base[key];
            }
            return result;
        }
        return override !== undefined ? override : base;
    }


    function addArrayItem(path) {
        if (!currentDetail) return;
        const arr = getAtPath(currentDetail.data || {}, path);
        if (!Array.isArray(arr)) return;

        const item = createDefaultArrayItem(path, arr);
        arr.push(item);
        renderDetail(currentDetail);
        saveCurrentDetail();
    }

    function deleteArrayItem(path, index) {
        if (!currentDetail) return;
        const arr = getAtPath(currentDetail.data || {}, path);
        if (!Array.isArray(arr)) return;

        arr.splice(index, 1);
        renderDetail(currentDetail);
        saveCurrentDetail();
    }

    function getAtPath(root, path) {
        let current = root;
        for (const key of path) {
            if (current === null || current === undefined) return undefined;
            current = current[key];
        }
        return current;
    }

    function setAtPath(root, path, value) {
        if (!path || path.length === 0) return;
        let current = root;
        for (let i = 0; i < path.length - 1; i++) {
            if (current === null || current === undefined) return;
            current = current[path[i]];
        }
        if (current !== null && current !== undefined) {
            current[path[path.length - 1]] = value;
        }
    }

    const EFFECT_AUTO_FIELDS = {
        'dragonsurvival:damage': { damage_type: 'minecraft:magic', amount: 1 },
        'dragonsurvival:modifier': { modifiers: [] },
        'dragonsurvival:potion': { potion: { effects: [], amplifier: 0, duration: 0 } },
        'dragonsurvival:projectile': {
            projectile_data: '',
            target_direction: { direction: 'looking_at' },
            number_of_projectiles: 1,
            speed: 1
        },
        'dragonsurvival:summon_entity': { base: {}, entities: [], max_summons: 1, nbt: {} },
        'dragonsurvival:damage_modification': { modifications: [] },
        'dragonsurvival:breath_particles': { spread: 0.05, speed_per_growth: 0.03, main_particle: { type: '' }, secondary_particle: { type: '' } },
        'dragonsurvival:ignite': { ignite_ticks: 100 },
        'dragonsurvival:harvest_bonus': { harvest_bonuses: [] },
        'dragonsurvival:on_attack': { potion: { effects: [], amplifier: 0, duration: 0 } },
        'dragonsurvival:flight': { level_requirement: 1 },
        'dragonsurvival:spin': { level_requirement: 1 },
        'dragonsurvival:item_conversion': { item_conversions: [], probability: 0 },
        'dragonsurvival:swim': { max_oxygen: 300, fluid_type: 'minecraft:water' },
        'dragonsurvival:effect_modification': { modifications: [] },
        'dragonsurvival:particle': { particle_data: {}, particle_count: 1 },
        'dragonsurvival:glow': { glows: [] },
        'dragonsurvival:oxygen_bonus': { bonuses: [] },
        'dragonsurvival:block_vision': { block_visions: [] },
        'dragonsurvival:run_function': { function: '' },
        'dragonsurvival:smelting': { progress: 1, grants_experience: true },
        'dragonsurvival:heal': { percentage: 1 },
        'dragonsurvival:teleport': { target_direction: { direction: 'looking_at' }, range: 16 },
        'dragonsurvival:push': { target_direction: { direction: 'looking_at' }, push_force: 1 },
        'dragonsurvival:hunger': { hunger: 1 },
        'dragonsurvival:effect_removal': { effects: [] },
        'dragonsurvival:use_item': { item: '', count: 1 },
        'dragonsurvival:dragon_growth': { growth: 1 },
        'dragonsurvival:mana_recovery': { mana: 1 },
        'dragonsurvival:experience': { experience: 1 },
        'dragonsurvival:cooldown_recovery': { cooldown: 1 }
    };

    const PENALTY_EFFECT_AUTO_FIELDS = {
        'dragonsurvival:take_damage': { damage_type: 'minecraft:magic', amount: 1 },
        'dragonsurvival:mob_effect': { potion: { effects: [], amplifier: 0, duration: 0 } },
        'dragonsurvival:item_blacklist': { items: [] },
        'dragonsurvival:damage_modification': {
            modification: { base: { id: '' }, damage_types: [], multiplier: 1 },
            duration: 1
        },
        'dragonsurvival:fear': { fears: [] },
        'dragonsurvival:informational': {},
        'dragonsurvival:modifier': { modifiers: [] },
        'dragonsurvival:effect_modification': { modifications: [] },
        'dragonsurvival:run_function': { function: '' }
    };

    const PENALTY_TRIGGER_AUTO_FIELDS = {
        'dragonsurvival:supply': {
            supply_type: 'star_dragon:star_points',
            trigger_rate: 20,
            reduction_rate: 0,
            regeneration_rate: 0,
            recovery_items: [],
            display_like_hunger_bar: false
        },
        'dragonsurvival:instant': { trigger_rate: 20 },
        'dragonsurvival:item_used': { item_predicates: [] },
        'dragonsurvival:hit_by_projectile': { projectiles: [] },
        'dragonsurvival:hit_by_water_potion': {}
    };

    function autoCompleteMissingFields(path, value) {
        if (!currentDetail) return;
        const field = path[path.length - 1];

        if (field === 'effect_type') {
            const obj = getAtPath(currentDetail.data || {}, path.slice(0, -1));
            const template = EFFECT_AUTO_FIELDS[value];
            if (obj && template && typeof obj === 'object' && !Array.isArray(obj)) {
                for (const [key, def] of Object.entries(template)) {
                    if (!Object.prototype.hasOwnProperty.call(obj, key)) {
                        obj[key] = JSON.parse(JSON.stringify(def));
                    }
                }
            }
        }

        if (field === 'target_type') {
            const obj = getAtPath(currentDetail.data || {}, path.slice(0, -1));
            if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
                let fields = {};
                if (value === 'dragonsurvival:area') fields = { radius: { type: 'minecraft:linear', base: 1, per_level_above_first: 0 } };
                else if (value === 'dragonsurvival:dragon_breath') fields = { range_multiplier: 1 };
                else if (value === 'dragonsurvival:looking_at') fields = { range: 16 };
                else if (value === 'dragonsurvival:disc') fields = { radius: { type: 'minecraft:linear', base: 1, per_level_above_first: 0 }, height: { type: 'minecraft:linear', base: 2, per_level_above_first: 0 }, height_starts_below: false };
                for (const [key, def] of Object.entries(fields)) {
                    if (!Object.prototype.hasOwnProperty.call(obj, key)) {
                        obj[key] = JSON.parse(JSON.stringify(def));
                    }
                }
            }
        }

        if (field === 'penalty_type') {
            const obj = getAtPath(currentDetail.data || {}, path.slice(0, -1));
            const template = PENALTY_EFFECT_AUTO_FIELDS[value];
            if (obj && template && typeof obj === 'object' && !Array.isArray(obj)) {
                for (const [key, def] of Object.entries(template)) {
                    if (!Object.prototype.hasOwnProperty.call(obj, key)) {
                        obj[key] = JSON.parse(JSON.stringify(def));
                    }
                }
            }
        }

        if (field === 'penalty_trigger') {
            const obj = getAtPath(currentDetail.data || {}, path.slice(0, -1));
            const template = PENALTY_TRIGGER_AUTO_FIELDS[value];
            if (obj && template && typeof obj === 'object' && !Array.isArray(obj)) {
                for (const [key, def] of Object.entries(template)) {
                    if (!Object.prototype.hasOwnProperty.call(obj, key)) {
                        obj[key] = JSON.parse(JSON.stringify(def));
                    }
                }
            }
        }
    }


    function cloneValueTemplate(value) {
        if (Array.isArray(value)) {
            return [];
        }
        if (value && typeof value === 'object') {
            const clone = {};
            for (const [key, child] of Object.entries(value)) {
                if (Array.isArray(child)) {
                    clone[key] = [];
                } else if (child && typeof child === 'object') {
                    clone[key] = cloneValueTemplate(child);
                } else if (typeof child !== 'boolean' && typeof child !== 'number') {
                    clone[key] = '';
                } else {
                    clone[key] = child;
                }
            }
            return clone;
        }
        return value;
    }

    function addMapEntry(path) {
        if (!currentDetail) return;
        const obj = getAtPath(currentDetail.data || {}, path);
        if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return;

        let counter = 1;
        let key = `new_entry_${counter}`;
        while (Object.prototype.hasOwnProperty.call(obj, key)) {
            counter++;
            key = `new_entry_${counter}`;
        }

        // Use a built-in template per data-map type instead of copying the first entry.
        const template = getMapEntryTemplate();
        let value;
        if (template !== undefined) {
            value = JSON.parse(JSON.stringify(template));
        } else {
            const firstValue = Object.values(obj)[0];
            value = {};
            if (Array.isArray(firstValue)) value = [];
            else if (firstValue && typeof firstValue === 'object') value = cloneValueTemplate(firstValue);
            else value = firstValue;
        }

        obj[key] = value;
        renderDetail(currentDetail);
        saveCurrentDetail();
    }

    function getMapEntryTemplate() {
        if (!currentDetail) return undefined;
        const kind = currentDetail.kind;

        if (kind === 'diet_entries') {
            return { 'neoforge:value': [] };
        }
        if (kind === 'stage_resources') {
            return {};
        }
        if (kind === 'end_platforms') {
            return { structure: '', spawn_position: [0, 50, 0] };
        }
        if (kind === 'dragon_beacon_data') {
            return {
                effects: [],
                payment_data: { duration_multiplier: 30, experience_cost: 60 }
            };
        }
        if (kind === 'body_icons') {
            const speciesIds = [];
            for (const ns of state.model.namespaces) {
                for (const entry of ns.entries || []) {
                    if (entry.kind === 'dragon_species') {
                        speciesIds.push(`${entry.namespace}:${entry.id}`);
                    }
                }
            }
            const value = {};
            for (const id of speciesIds) {
                value[id] = '';
            }
            return value;
        }

        return undefined;
    }

    function deleteMapEntry(path, key) {
        if (!currentDetail) return;
        const obj = getAtPath(currentDetail.data || {}, path);
        if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return;

        delete obj[key];
        renderDetail(currentDetail);
        saveCurrentDetail();
    }

    function renameMapKey(path, oldKey, newKey) {
        if (!currentDetail) return;
        if (!newKey || newKey === oldKey) return;

        const obj = getAtPath(currentDetail.data || {}, path);
        if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return;
        if (Object.prototype.hasOwnProperty.call(obj, newKey)) return;

        obj[newKey] = obj[oldKey];
        delete obj[oldKey];
        renderDetail(currentDetail);
        saveCurrentDetail();
    }

    function addFieldToObject(path, field) {
        if (!currentDetail) return;
        const obj = getAtPath(currentDetail.data || {}, path);
        if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return;
        if (Object.prototype.hasOwnProperty.call(obj, field)) return;

        obj[field] = getFieldDefault(field);
        renderDetail(currentDetail);
        saveCurrentDetail();
    }

    function deleteFieldFromObject(path, field) {
        if (!currentDetail) return;
        const obj = getAtPath(currentDetail.data || {}, path);
        if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return;

        delete obj[field];
        renderDetail(currentDetail);
        saveCurrentDetail();
    }

    function getFieldDefault(field) {
        if (field === 'retain_effects') {
            return false;
        }
        if (field === 'entity_effect' || field === 'block_effect') {
            return [];
        }
        if (Object.prototype.hasOwnProperty.call(PROPERTY_FIELD_DEFAULTS, field)) {
            return JSON.parse(JSON.stringify(PROPERTY_FIELD_DEFAULTS[field]));
        }
        return {};
    }




    function showDetailByFullId(kind, fullId) {
        const entry = findEntry(kind, fullId);
        if (entry) {
            currentDetail = entry;
            renderAll();
        }
    }

    // Kept for potential external callers / debugging.
    window.__showDetail = showDetailByFullId;
})();
