# DSH Official Brand

让 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 桌面端左上角的「DSH 本地构建」兜底标签，显示为官方 Logo（FishLogo）+ 名称（BrandWordmark），并补上点击 Logo 新建会话的能力。

![icon](./icon.svg)

## 效果

- 左上角品牌位由「DSH 本地构建」变成官方鱼形 Logo + `DeepSeek Harness` 字标；
- 点击 Logo / 字标 → 新建一个会话（在 macOS 上默认这块是拖拽窗口区，本插件用 `-webkit-app-region: no-drag` 把它改回可点击）。

## 安装

在 DSH 里把它作为本地 bundle 安装（DSH 设置 → 插件/ bundles → 从本地目录安装），选择本仓库目录即可。安装后**刷新 DSH 界面**生效。

也可在 DSH 会话里直接让助手执行安装：

```
请用 plugin_manager 的 install_bundle，target 填本仓库在本地的路径。
```

## 卸载 / 回退

在 DSH 设置页禁用或卸载 `@local/dsh-official-brand`，左上角即恢复原生的「DSH 本地构建」兜底。

## 为什么需要它

上游 `@deepseek-ai/dsh-client-ui-brand-official` 插件源码里，注册 `sidebar.brand.mark` / `sidebar.brand.name` 两个 slot 的代码被 `if (process.env.DSH_CLIENT_BUILD_PROFILE !== 'official') return` 门控。但发行版编译产物 `lib/client.js` 里这段门控在**构建期就被 tree-shake 掉了**（既没有 `DSH_CLIENT_BUILD_PROFILE`，也没有 `sidebar.brand.mark` 等字符串），所以运行时设任何环境变量都恢复不了官方品牌。本插件用客户端模块直接把这两个 slot 填回去。

关于点击新建会话：该行为本来在侧边栏外壳 `SidebarRoot` 里，macOS 上外壳把品牌区渲染成不可点击的 `<span>`（窗口拖拽区）。本插件在品牌组件上自行加了 `onClick → ctx.uiWorkspace.startSession()`，并声明 `inject: ['slots', 'uiWorkspace']` 以通过运行时服务 guard。

详见 [docs/DETAIL.md](./docs/DETAIL.md)。

## 兼容

- 需要 DSH 客户端具备 `client-ui-primitives`（导出 `FishLogo` / `BrandWordmark`）与 `uiWorkspace.startSession()` 服务（当前 DSH 桌面版均具备）。
- 仅改前端展示与点击行为，不修改任何打包脚本或运行时逻辑。

## License

MIT
