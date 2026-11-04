# Testing

LOGX uses Vitest for automated testing. Every exported function has unit tests.

## Run tests

```bash
# All tests
npm test

# With coverage
npm run test:coverage
```

## Coverage target

The stable core targets at least 90% statement, branch, function, and line coverage. Thresholds are enforced in `vitest.config.mts`.

## Test structure

`tests/<module>.test.ts` — one file per source module.

Each function is tested with:

1. Normal input
2. Empty input
3. Invalid input
4. Boundary values
5. `null` / `undefined` where applicable
6. Type inference (TypeScript)
7. Input mutation (input must not change)
8. Asynchronous rejection (async functions)

## Writing tests

- Use deterministic tests. Mock randomness (`Math.random`) and timers (`vi.useFakeTimers`).
- Never manipulate coverage reports.
- All tests must pass before a milestone is complete.

## Example test

```ts
import { describe, expect, it, vi } from "vitest";
import { unique } from "../src/array";

describe("array.unique", () => {
  it("removes duplicates", () => {
    expect(unique([1, 2, 2, 3])).toEqual([1, 2, 3]);
  });
  it("handles empty input", () => {
    expect(unique([])).toEqual([]);
  });
  it("does not mutate input", () => {
    const input = [1, 2, 2];
    unique(input);
    expect(input).toEqual([1, 2, 2]);
  });
});
```
