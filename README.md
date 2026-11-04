# LOGX

**The Modern JavaScript Utility Engine**

A powerful, modular JavaScript and TypeScript utility library designed to simplify development through reusable functions, optimized algorithms, and developer-focused tools.

**Author and maintainer:** Mwaki Denis  
**Homepage:** https://github.com/mwakidenis/logx  
**License:** MIT  
**Version:** 0.1.0  
**NPM package:** `@mwakidenis/logx`

---

## Installation

```bash
npm install @mwakidenis/logx
```

LOGX requires Node.js 20 or newer. It has zero runtime dependencies.

## Quick start

### TypeScript / ESM

```ts
import { chunk, unique, groupBy, camelCase, debounce } from "@mwakidenis/logx";

const data = [1, 2, 2, 3, 4, 4, 5];
console.log(unique(data)); // [1, 2, 3, 4, 5]

const grouped = groupBy(["apple", "apricot", "banana"], (item) => item[0]);
console.log(grouped); // { a: ["apple", "apricot"], b: ["banana"] }

const slugified = camelCase("hello-world");
console.log(slugified); // helloWorld

const logged = debounce(console.log, 100);
```

### JavaScript / CommonJS

```js
const { chunk, unique } = require("@mwakidenis/logx");

console.log(unique([1, 2, 2, 3])); // [1, 2, 3]
```

### Modular imports (tree-shaking friendly)

```ts
import { chunk } from "@mwakidenis/logx/array";
import { camelCase } from "@mwakidenis/logx/string";
import { debounce } from "@mwakidenis/logx/function";

// Direct subpath imports
import { chunk } from "@mwakidenis/logx/array/chunk";
```

## API overview

| Module | Description |
|--------|-------------|
| `array` | chunk, compact, unique, flatten, flattenDeep, difference, intersection, union, shuffle, sample, first, last, take, drop, partition |
| `object` | clone, deepClone, get, set, has, pick, omit, merge, keys, values, entries, invert, mapValues, mapKeys |
| `string` | camelCase, pascalCase, snakeCase, kebabCase, capitalize, capitalizeWords, trim, truncate, slugify, reverse, startsWith, endsWith, wordCount, escapeHtml |
| `number` | clamp, inRange, random, randomInt, round, floor, ceil, precision, isEven, isOdd, isPrime, percentage, formatNumber |
| `math` | sum, mean, median, min, max, mode, variance, standardDeviation, factorial, gcd, lcm, fibonacci, percentageChange |
| `function` | debounce, throttle, once, memoize, curry, compose, pipe, negate, noop, identity |
| `collection` | groupBy, keyBy, countBy, partition, sortBy, orderBy, count, find, findLast, every, some |
| `date` | isValidDate, addDays, addMonths, addYears, differenceInDays, differenceInHours, startOfDay, endOfDay, isBefore, isAfter, isSameDay |
| `validation` | isString, isNumber, isBoolean, isArray, isObject, isPlainObject, isFunction, isDate, isEmail, isURL, isEmpty, isNil, isNull, isUndefined |
| `async` | sleep, retry, timeout, withTimeout |
| `browser` | safeStorage, localStorage, sessionStorage, cookie helpers, environment detection |
| `security` | secureCompare, escapeHtml, secureRandom, secureRandomInt |

## Runtime requirements

- Node.js >= 20
- Bundlers: Vite, webpack, Rollup, esbuild (ESM + CommonJS + tree-shaking supported)

## Browser support

LOGX works in modern browsers. The `browser` and `security` modules detect the runtime and degrade gracefully when browser APIs are unavailable (e.g. private browsing, missing `localStorage`).

## Tree-shaking

LOGX is side-effect free (`"sideEffects": false`). Each module and function is independently importable, so bundlers can eliminate unused code.

## Error handling

LOGX throws descriptive `TypeError` and `RangeError` instances for invalid arguments. It never mutates user-supplied arrays or objects unless explicitly documented. See `docs/error-handling.md`.

## Performance philosophy

LOGX favors clear, maintainable implementations over premature micro-optimization. Benchmarks live in `benchmarks/`. See `docs/performance.md`.

## Testing

```bash
npm test
npm run test:coverage
```

Tests use Vitest. Target coverage is 90% statements and branches for the stable core. See `docs/testing.md`.

## Contributing

See `CONTRIBUTING.md` and `docs/contributing.md`.

## Security reporting

See `SECURITY.md` and `docs/security.md`.

## License

MIT. See `LICENSE`.

## Author and repository

Mwaki Denis — https://github.com/mwakidenis/logx
