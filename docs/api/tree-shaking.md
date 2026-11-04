# Tree-shaking

LOGX is side-effect free (`"sideEffects": false` in `package.json`). Each module and function is independently importable, so bundlers (Vite, webpack, Rollup, esbuild) can eliminate unused code.

## Import patterns that tree-shake

```ts
// Root import — bundler keeps only used exports
import { chunk, unique } from "@mwakidenis/logx";

// Module import
import { camelCase } from "@mwakidenis/logx/string";

// Direct subpath import
import { debounce } from "@mwakidenis/logx/function";
```

## Verify tree-shaking

Check your bundle output to confirm unused functions are eliminated. Internal modules (`src/internal/*`) are not exported and never bundled.
