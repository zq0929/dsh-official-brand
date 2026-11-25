# DSH Official Brand

让 DSH 左上角显示官方 Logo 与名称，替代默认的「DSH 本地构建」兜底标签。

## 为什么需要这个插件

上游 `@deepseek-ai/dsh-client-ui-brand-official` 插件源码里，`sidebar.brand.mark` 和
`sidebar.brand.name` 两个 slot 的注册被 `if (process.env.DSH_CLIENT_BUILD_PROFILE !== 'official') return`
门控。但在我们安装的发行版中，这段门控代码在**构建期就被 tree-shake 掉了**：编译产物
`lib/client.js` 里既没有 `DSH_CLIENT_BUILD_PROFILE`，也没有 `sidebar.brand.mark` 等字符串。
因此运行时设置任何环境变量都无法恢复官方品牌注册。

## 原理

官方 Logo 组件 `FishLogo` 和 `BrandWordmark` 本身仍在浏览器模块表中
（`@deepseek-ai/dsh-client-ui-primitives` 导出）。本插件在客户端直接用 `require()` 拿到这两个组件，
并按官方 `Brand.tsx` 的实现填回两个品牌 slot：

- `sidebar.brand.mark` → `<FishLogo size={size} />`
- `sidebar.brand.name` → `<BrandWordmark includeMark={false} />`

## 作用范围

仅影响前端显示，不改动任何打包脚本或运行时逻辑；可随时在设置页禁用/卸载以恢复原样。
