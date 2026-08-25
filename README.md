# Dragon Survival Datapack Viewer（龙之生存数据包可视化）

一个 VS Code 扩展：在侧边栏打开图形化界面，自动识别 **Dragon Survival（龙之生存）** 的
数据包 JSON，把龙种、成长阶段、能力、惩罚、弹射物数据转换成一眼就能看懂的卡片与流程图。

## 功能

- 🐉 **侧边栏 Webview**：打开 VS Code 后自动出现在活动栏，无需额外面板。
- 🔍 **自动扫描工作区**：自动发现 `data/<命名空间>/dragonsurvival/` 下的：
  - `dragon_species`（龙种）
  - `dragon_stage`（阶段）
  - `dragon_ability`（能力）
  - `dragon_penalty`（惩罚）
  - `projectile_data`（弹射物）
  - 以及 `tags/dragonsurvival/` 下的标签，用于解析龙种引用的能力/惩罚。
- 📂 **手动选择目录**：也可以直接选择数据包目录或模组源码目录（例如 `star_dragon`）。
- 🗂️ **图形化概览**：命名空间页签、龙种卡片、阶段链流程图、能力/惩罚/弹射物卡片。
- ✏️ **基础编辑**：在详情页点击“编辑 JSON”，修改后保存回文件（保存为标准 JSON 格式）。
- ⚠️ **JSONC 兼容**：能读取带 `//` 注释和尾逗号的非标准 JSON。

## 使用方法

1. 用 VS Code 打开包含数据包的文件夹（例如 `star_dragon` 或 `star_dragon_datapack`），
   或点击侧边栏的 **选择目录** 手动指定。
2. 侧边栏会自动显示识别到的命名空间。
3. 点击卡片查看详情；点击“编辑 JSON”可修改并保存。

## 开发调试

```bash
npm install
npm run compile
```

在 VS Code 中按 `F5` 启动 Extension Development Host。

## 目录结构

```text
src/
  extension.ts              # 扩展入口与命令
  DragonDataProvider.ts     # 侧边栏 Webview Provider
  datapack/
    types.ts                # 数据模型
    scanner.ts              # 数据包目录扫描
    parser.ts               # JSON 解析与标签引用解析
    jsonc.ts                # JSONC 清理
  workspaceScanner.ts       # 基于 workspace.findFiles 的扫描
media/
  main.js                   # Webview 前端逻辑
  style.css                 # Webview 样式
  dragon.svg                # 活动栏图标
```

## 已知限制

- 保存时会重写为标准 JSON（移除注释和尾逗号）。
- 目前是“基础编辑”，适合修改数值、ID、颜色等；复杂嵌套建议配合原始 JSON 视图。
- 如果数据包使用了跨命名空间标签，解析时会尽量在所有已发现命名空间中查找。
