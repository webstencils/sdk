# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

### Changed

- Migrate from Lerna to Nx Workspace
- Improved ESLint integration with Nx Workspace
- Migrate documentation to MdBook
- Cleanup deprecated types and code
- Migrate example projects to latest MUI
- Reduce development dependencies
- Break dependency on Tailwind in samples
- API improvements
  - Change `query.parseFreshNode(node: FreshNode).toNode(normalize?)` to `query.parseFreshNode(node: FreshNode, normalize?: NormalizeNodeCallback) => Node`
  - Change `query.parseSerializedNode(node: SerializedNode).toNode(normalize?)` to `query.parseSerializedNode(node: SerializedNode, normalize?: NormalizeNodeCallback) => Node`
  - Change `query.parseReactElement(element: React.ReactElement).toNodeTree(normalize?)` to `query.parseReactElement(element: React.ReactElement, normalize?: NormalizeJsxNodeCallback) => NodeTree`
- New `Designer` (vite) demo project to replace the old `landing` (next.js)
- Reworked `Basic` demo, upgrade to latest MUI

### Fixed

- Documentation examples

## 0.1.0

### Added

- Initial inception as a public fork of the [craft.js](https://github.com/prevwong/craft.js)
