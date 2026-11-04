# Architecture

LOGX follows a modular, layered architecture designed for tree-shaking, testability, and long-term maintainability.

## Directory layout

```
src/
  index.ts              # Root barrel — re-exports every public module
  array/                # Array utilities
  object/               # Object utilities
  string/               # String utilities
  number/               # Number utilities
  math/                 # Math utilities
  function/             # Function utilities
  collection/           # Collection utilities
  date/                 # Date utilities
  validation/           # Type guards and validation
  async/                # Async flow control
  browser/              # Browser-specific utilities
  security/             # Security helpers
  types/                # Shared TypeScript types
  internal/             # Private implementation helpers (not exported)
```

## Layers

### Public API layer (`src/*/index.ts`)

Each module has a single `index.ts` barrel that exports all public functions. These barrels are the only files consumers import. Implementation details live in the same file as the barrel to keep each module self-contained.

### Shared types layer (`src/types/index.ts`)

Common types (`Path`, `Dictionary`, `Primitive`, `JsonValue`, `AlikeObject`, `TruncateOptions`) used across modules.

### Internal layer (`src/internal/`)

Private helpers consumed by multiple modules:

- `predicates.ts` — type guards (`isString`, `isPlainObject`, `isSafeKey`, etc.)
- `path.ts` — property path normalization and resolution
- `clone.ts` — deep clone with circular-reference handling

Internal modules are **not** part of the package exports map and are never exposed to consumers.

## Design principles

- **Zero runtime dependencies** — only JavaScript/TypeScript built-ins.
- **Tree-shaking friendly** — `"sideEffects": false`, independent module entrypoints.
- **No input mutation** — arrays and objects are never mutated unless explicitly documented.
- **Explicit error handling** — descriptive `TypeError`/`RangeError` for invalid arguments.
- **Original implementations** — no code copied from other libraries.

## Build outputs

`tsup` produces three artifacts per module entrypoint:

- ESM (`dist/esm/<module>/index.js`)
- CommonJS (`dist/cjs/<module>/index.js`)
- TypeScript declarations (`dist/esm/<module>/index.d.ts` + `.d.mts`)
