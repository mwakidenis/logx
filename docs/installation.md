# Installation

LOGX is distributed as the `@mwakidenis/logx` package on npm.

## Requirements

- Node.js >= 20
- A bundler (Vite, webpack, Rollup, esbuild) for browser use

## Install with npm

```bash
npm install @mwakidenis/logx
```

## Install with Yarn

```bash
yarn add @mwakidenis/logx
```

## Install with pnpm

```bash
pnpm add @mwakidenis/logx
```

## Zero runtime dependencies

LOGX has no runtime dependencies. Your install footprint is minimal and your dependency tree stays clean.

## TypeScript

TypeScript declarations ship with the package. No separate `@types` package is needed.

## Browser

LOGX works in modern browsers. The `browser` and `security` modules detect the runtime at call time (not at module load) and degrade gracefully when browser APIs are unavailable.

## Verify the install

```bash
# ESM
node --input-type=module -e "import { unique } from '@mwakidenis/logx'; console.log(unique([1,2,2,3]));"

# CommonJS
node -e "const { unique } = require('@mwakidenis/logx'); console.log(unique([1,2,2,3]));"
```

Both should print `[ 1, 2, 3 ]`.
