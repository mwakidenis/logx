# Development

This guide covers setting up LOGX for local development, running quality gates, and building the package.

## Setup

```bash
# Clone the repository
git clone https://github.com/mwakidenis/logx.git
cd logx

# Install dependencies
npm install
```

## Available scripts

| Script | Purpose |
|--------|---------|
| `npm run build` | Build ESM + CJS + declarations with tsup |
| `npm run clean` | Remove dist, caches, node_modules |
| `npm test` | Run Vitest test suite |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run typecheck` | Run TypeScript type check |
| `npm run format` | Format with Prettier |
| `npm run format:check` | Check formatting |
| `npm run docs` | Generate API docs with TypeDoc |
| `npm run benchmark` | Run benchmarks |
| `npm run pack:check` | Dry-run `npm pack` to inspect contents |

## Quality gate order

Before committing, always run in this order:

1. `npm run format:check` — formatting
2. `npm run lint` — static analysis
3. `npm run typecheck` — TypeScript validation
4. `npm test` — automated tests
5. `npm run build` — production build

## Adding a new function

1. Create or edit the function in the appropriate `src/<module>/index.ts`.
2. Add tests in `tests/<module>.test.ts` covering normal, empty, invalid, boundary, null/undefined, and mutation cases.
3. Run `npm run typecheck`, `npm run lint`, `npm test`, and `npm run build`.
4. Add a changeset: `npx changeset`.

## TypeScript

LOGX uses strict TypeScript. Avoid `any`. Use generics to preserve types. Every public export must have declaration output.
