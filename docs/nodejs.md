# Node.js Support

LOGX requires Node.js >= 20. It is tested against Node.js 20 and 22 in CI.

## Engines

```json
"engines": { "node": ">=20" }
```

## Module formats

LOGX publishes both ESM and CommonJS:

- ESM entry: `dist/esm/index.js`
- CommonJS entry: `dist/cjs/index.js`
- TypeScript declarations: `dist/esm/index.d.ts`

Both `import()` and `require()` are supported.

## Consuming in Node.js

```js
// CommonJS
const { unique } = require("@mwakidenis/logx");

// ESM
import { unique } from "@mwakidenis/logx";
```

## TypeScript consumers

Declarations are included; no `@types` package is required.
