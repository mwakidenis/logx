# Getting Started with LOGX

LOGX — The Modern JavaScript Utility Engine — is a modular, zero-dependency utility library for JavaScript and TypeScript. It provides reusable functions for arrays, objects, strings, numbers, math, dates, collections, functions, async flows, validation, browser APIs, and security helpers.

## What you'll learn

- How to install LOGX
- How to import functions (root, modular, and direct subpath)
- How to use LOGX in TypeScript and JavaScript
- Where to find the full API reference

## Prerequisites

- Node.js >= 20
- npm (comes with Node.js)

## Installation

```bash
npm install @mwakidenis/logx
```

LOGX has zero runtime dependencies, so installation is fast and lightweight.

## Your first import

### TypeScript / ESM

```ts
import { chunk, unique, camelCase, debounce } from "@mwakidenis/logx";

console.log(unique([1, 2, 2, 3])); // [1, 2, 3]
console.log(camelCase("hello-world")); // helloWorld
```

### JavaScript / CommonJS

```js
const { chunk, unique } = require("@mwakidenis/logx");

console.log(unique([1, 2, 2, 3])); // [1, 2, 3]
```

### Modular imports (tree-shaking)

Import only what you need to keep your bundle small:

```ts
import { chunk } from "@mwakidenis/logx/array";
import { camelCase } from "@mwakidenis/logx/string";
import { debounce } from "@mwakidenis/logx/function";
```

### Direct function imports

```ts
import { chunk } from "@mwakidenis/logx/array/chunk";
```

## Next steps

- [Installation](./installation.md) — detailed setup options
- [API Reference](../api/README.md) — full function catalog
- [Architecture](./architecture.md) — how LOGX is organized
- [Development](./development.md) — contributing and building
