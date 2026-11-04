# API Reference

This reference is generated from the actual source code documentation.

## Modules

| Module | File | Description |
|--------|------|-------------|
| `array` | `src/array/index.ts` | chunk, compact, unique, flatten, flattenDeep, difference, intersection, union, shuffle, sample, first, last, take, drop, partition, groupConsecutive |
| `object` | `src/object/index.ts` | clone, deepClone, get, set, has, pick, omit, merge, keys, values, entries, invert, mapValues, mapKeys |
| `string` | `src/string/index.ts` | camelCase, pascalCase, snakeCase, kebabCase, capitalize, capitalizeWords, trim, truncate, slugify, reverse, startsWith, endsWith, wordCount, escapeHtml |
| `number` | `src/number/index.ts` | clamp, inRange, random, randomInt, round, floor, ceil, precision, isEven, isOdd, isPrime, percentage, formatNumber |
| `math` | `src/math/index.ts` | sum, mean, median, min, max, mode, variance, standardDeviation, factorial, gcd, lcm, fibonacci, percentageChange |
| `function` | `src/function/index.ts` | debounce, throttle, once, memoize, curry, compose, pipe, negate, noop, identity |
| `collection` | `src/collection/index.ts` | groupBy, keyBy, countBy, partition, sortBy, orderBy, count, find, findLast, every, some |
| `date` | `src/date/index.ts` | isValidDate, addDays, addMonths, addYears, differenceInDays, differenceInHours, startOfDay, endOfDay, isBefore, isAfter, isSameDay |
| `validation` | `src/validation/index.ts` | isString, isNumber, isBoolean, isArray, isObject, isPlainObject, isFunction, isDate, isEmail, isURL, isEmpty, isNil, isNull, isUndefined |
| `async` | `src/async/index.ts` | sleep, retry, timeout, withTimeout |
| `browser` | `src/browser/index.ts` | safeStorage, localStorageHelpers, sessionStorageHelpers, getCookie, setCookie, removeCookie, isBrowser, isNode |
| `security` | `src/security/index.ts` | secureCompare, secureRandom, secureRandomInt, escapeHtml |

## Import patterns

```ts
// Root import (tree-shaken by bundlers)
import { chunk, unique } from "@mwakidenis/logx";

// Module import
import { camelCase } from "@mwakidenis/logx/string";

// Direct subpath import
import { debounce } from "@mwakidenis/logx/function";

// CommonJS
const { chunk } = require("@mwakidenis/logx");
```

## Type safety

Every function includes TypeScript type declarations. Generic types preserve input/output relationships, for example:

```ts
import { chunk } from "@mwakidenis/logx";

const numbers: number[] = chunk([1, 2, 3, 4], 2); // number[][]
const strings: string[] = chunk(["a", "b"], 1);   // string[][]
```
