## 0.5.0 (2024-04-23)


### 🚀 Features

- **core:** component template metadata ([#42](https://github.com/webstencils/sdk/pull/42))

### ❤️  Thank You

- Denys Vuika @DenysVuika

## 0.4.0 (2024-04-13)


### 🚀 Features

- **ui:** component breadcrumbs ([#33](https://github.com/webstencils/sdk/pull/33))
- **ui:** switch component breadcrumbs to radix ([#34](https://github.com/webstencils/sdk/pull/34))
- **ui:** toolbox components ([#36](https://github.com/webstencils/sdk/pull/36))

### ❤️  Thank You

- Denys Vuika @DenysVuika

## 0.3.0 (2024-04-06)


### 🚀 Features

- add cloneTree utility ([#27](https://github.com/webstencils/sdk/pull/27))

### 🩹 Fixes

- remove console.log from parseTree ([4143d34](https://github.com/webstencils/sdk/commit/4143d34))

### ❤️  Thank You

- Denys Vuika @DenysVuika

## 0.2.0 (2024-04-02)


### 🚀 Features

- **ui:** introduce ui package ([#9](https://github.com/webstencils/sdk/pull/9))
- **ui:** dialog components ([a356787](https://github.com/webstencils/sdk/commit/a356787))
- **ui:** accordion component ([#12](https://github.com/webstencils/sdk/pull/12))
- **ui:** property editor implementation ([422425f](https://github.com/webstencils/sdk/commit/422425f))

### 🩹 Fixes

- **core:** typings fixes ([#11](https://github.com/webstencils/sdk/pull/11))

### ❤️  Thank You

- Denys Vuika @DenysVuika

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 0.1.0

### Added

- Initial release as a public fork of the [craft.js](https://github.com/prevwong/craft.js) with project modifications

### Changed

- Migrate from Lerna to Nx Workspace
- Improved ESLint integration with Nx Workspace
- Migrate documentation to MdBook
- Cleanup deprecated types and code
- Migrate example projects to latest MUI
- Reduce development dependencies
- Break dependency on Tailwind in samples
- Rework `core` and `layers` projects as Nx react libraries
- API improvements
  - Change `query.parseFreshNode(node: FreshNode).toNode(normalize?)` to `query.parseFreshNode(node: FreshNode, normalize?: NormalizeNodeCallback) => Node`
  - Change `query.parseSerializedNode(node: SerializedNode).toNode(normalize?)` to `query.parseSerializedNode(node: SerializedNode, normalize?: NormalizeNodeCallback) => Node`
  - Change `query.parseReactElement(element: React.ReactElement).toNodeTree(normalize?)` to `query.parseReactElement(element: React.ReactElement, normalize?: NormalizeJsxNodeCallback) => NodeTree`
- New `Designer` (vite) demo project to replace the old `landing` (next.js)
- Reworked `Basic` demo, upgrade to latest MUI

### Fixed

- Documentation examples
