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
- 📂 **手动选择目录**：也可以直接选择数据包目录或模组源码目录（例如 `example_mod`）。
- 🗂️ **图形化概览**：命名空间页签、龙种卡片、阶段链流程图、能力/惩罚/弹射物卡片。
- ✏️ **基础编辑**：在详情页点击“编辑 JSON”，修改后保存回文件（保存为标准 JSON 格式）。
- ⚠️ **JSONC 兼容**：能读取带 `//` 注释和尾逗号的非标准 JSON。

## 使用方法

1. 用 VS Code 打开包含数据包的文件夹（例如 `example_mod` 或 `example_mod_datapack`），
   或点击侧边栏的 **选择目录** 手动指定。
2. 侧边栏会自动显示识别到的命名空间。
3. 点击卡片查看详情；点击“编辑 JSON”可修改并保存。

## 开发调试

```bash
npm install
npm run compile
```

在 VS Code 中按 `F5` 启动 Extension Development Host。

字段校验自测（确认“字段放错分支会报错”，同时合法数据不误报）：
```bash
npm test
```

- `test/schema-bindings.js`：两个引擎里的 `...dispatch` 绑定表是否与 `mcdoc-src` 一致
- `test/enum-tables.js`：判别字段的枚举候选是否覆盖 mcdoc 里所有 dispatch 取值
- `test/field-placement-cases.js`：编辑器诊断——字段放错变体/分支必须报错
- `test/webview-resolve.js`：侧边栏界面——同样的字段必须被标为无效
- `test/variant-matrix.js`：反向保护——所有合法变体与联合分支必须零告警
- `test/scan-unvalidated.js`：覆盖率报告，列出仍无法校验的位置（调试用）

同步上游字段定义（mcdoc）的步骤：

1. 下载 [dragonsurvival-mcdoc-completion-zh](https://github.com/Dragon-LinFeng/dragonsurvival-mcdoc-completion-zh) 的 master ZIP，解压后覆盖 `mcdoc-src/`（ZIP 内为 LF 换行，请保持 LF）。
2. 更新 `scripts/generateMcdocSchema.js` 顶部的 `UPSTREAM_VERSION`。
3. 重新生成并自检：

```bash
node scripts/generateMcdocSchema.js
npm test
```

`npm test` 会检查两个引擎的 dispatch 绑定表与枚举表是否跟上了新 mcdoc，以及新字段是否引入误报；如果失败，按提示补 `DISPATCH_BINDINGS` / `ENUM_VALUES` / `ENUM_OPTIONS` 即可。

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
test/
  run-all.js                # 运行全部校验测试
  docgen.js                 # 按 mcdoc 生成合法数据包文档（测试用）
```

## 图标来源

- 活动栏龙图标使用 [Font Awesome Free](https://fontawesome.com) 的 `dragon` 图标。
- License: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)（图标部分），其余代码为 MIT License。

## JSON 编辑补全

插件内置了常见龙之生存字段的 JSON 补全与悬浮说明，不依赖外部 Spyglass/MCDoc 文件，也不会向你的数据包目录复制任何补全文件。

## 已知限制

- 保存时会重写为标准 JSON（移除注释和尾逗号）。
- 目前是“基础编辑”，适合修改数值、ID、颜色等；复杂嵌套建议配合原始 JSON 视图。
- 如果数据包使用了跨命名空间标签，解析时会尽量在所有已发现命名空间中查找。
- 少数位置无法做字段校验：原版谓词与 NBT（`usage_blocked`、`condition`、`nbt` 等）以及 `particle_data` 这类 mcdoc 未展开的原版类型，只校验外层字段名。`npm test` 里的覆盖率报告会列出这些位置。

## 鸣谢：
核心数据补全来源LinFeng的https://github.com/Dragon-LinFeng/dragonsurvival-mcdoc-completion-zh
（当前同步自 **v2.1.0**，适用于 龙之生存 1.21.1 **v2.0.71** 及以上；`mcdoc-src/` 为该项目的 mcdoc 源文件副本）

## 声明：
本项目是基于 龙之生存 的第三方开发工具。
- 龙之生存 Mod 本体：版权归原开发者所有
- 核心补全数据来源为https://github.com/Dragon-LinFeng/dragonsurvival-mcdoc-completion-zh ，本项目只是将其插件化和图形化