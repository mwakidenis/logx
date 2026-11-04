<p align="center">
  <a href="https://github.com/mwakidenis/logx">
    <img src="https://img.shields.io/badge/LOGX-The%20Modern%20JavaScript%20Utility%20Engine-blue.svg?style=for-the-badge&logo=javascript" alt="LOGX">
  </a>
</p>

<p align="center">
  <b>A powerful, modular JavaScript and TypeScript utility library</b>
</p>

<p align="center">
  <b>Author and maintainer:</b> Mwaki Denis
</p>

<p align="center">
  <a href="https://github.com/mwakidenis/logx"><img title="GITHUB" src="https://img.shields.io/badge/GITHUB-mwakidenis%2Flogx-red.svg?style=for-the-badge&logo=github"></a>
  <a href="https://github.com/mwakidenis/logx/stargazers"><img title="STARS" src="https://img.shields.io/github/stars/mwakidenis/logx?&style=social"></a>
  <a href="https://github.com/mwakidenis/logx/network/members"><img title="Forks" src="https://img.shields.io/github/forks/mwakidenis/logx?style=social"></a>
  <a href="https://github.com/mwakidenis/logx/watchers"><img title="Watching" src="https://img.shields.io/github/watchers/mwakidenis/logx?label=Watching&style=social"></a>
</p>

---

## 🚀 Installation

LOGX requires **Node.js >= 20** and has **zero runtime dependencies**.

```bash
npm install @mwakidenis/logx
```

---

## ⚡ Quick Start

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

### Modular Imports (Tree-Shaking Friendly)

```ts
import { chunk } from "@mwakidenis/logx/array";
import { camelCase } from "@mwakidenis/logx/string";
import { debounce } from "@mwakidenis/logx/function";

// Direct subpath imports
import { chunk } from "@mwakidenis/logx/array/chunk";
```

---

## 📚 API Overview

| Module | Description |
|--------|-------------|
| **array** | chunk, compact, unique, flatten, flattenDeep, difference, intersection, union, shuffle, sample, first, last, take, drop, partition |
| **object** | clone, deepClone, get, set, has, pick, omit, merge, keys, values, entries, invert, mapValues, mapKeys |
| **string** | camelCase, pascalCase, snakeCase, kebabCase, capitalize, capitalizeWords, trim, truncate, slugify, reverse, startsWith, endsWith, wordCount, escapeHtml |
| **number** | clamp, inRange, random, randomInt, round, floor, ceil, precision, isEven, isOdd, isPrime, percentage, formatNumber |
| **math** | sum, mean, median, min, max, mode, variance, standardDeviation, factorial, gcd, lcm, fibonacci, percentageChange |
| **function** | debounce, throttle, once, memoize, curry, compose, pipe, negate, noop, identity |
| **collection** | groupBy, keyBy, countBy, partition, sortBy, orderBy, count, find, findLast, every, some |
| **date** | isValidDate, addDays, addMonths, addYears, differenceInDays, differenceInHours, startOfDay, endOfDay, isBefore, isAfter, isSameDay |
| **validation** | isString, isNumber, isBoolean, isArray, isObject, isPlainObject, isFunction, isDate, isEmail, isURL, isEmpty, isNil, isNull, isUndefined |
| **async** | sleep, retry, timeout, withTimeout |
| **browser** | safeStorage, localStorage, sessionStorage, cookie helpers, environment detection |
| **security** | secureCompare, escapeHtml, secureRandom, secureRandomInt |

---

## 📖 Documentation

<details>
<summary><b>Getting Started</b></summary>

- [Installation](./docs/installation.md)
- [Quick Start](./docs/getting-started.md)
- [API Reference](./docs/api/README.md)

</details>

<details>
<summary><b>Development</b></summary>

- [Architecture](./docs/architecture.md)
- [Development](./docs/development.md)
- [Testing](./docs/testing.md)
- [Performance](./docs/performance.md)

</details>

<details>
<summary><b>Guides</b></summary>

- [Browser Support](./docs/browser.md)
- [Node.js Support](./docs/nodejs.md)
- [Error Handling](./docs/error-handling.md)
- [Versioning](./docs/versioning.md)
- [Releasing](./docs/releasing.md)
- [Security](./docs/security.md)
- [FAQ](./docs/faq.md)
- [Contributing](./docs/contributing.md)

</details>

---

## 🛠 Runtime Requirements

- **Node.js:** >= 20
- **Bundlers:** Vite, webpack, Rollup, esbuild (ESM + CommonJS + tree-shaking supported)
- **Browser:** Modern browsers (Chrome, Edge, Firefox, Safari)

---

## 🌐 Browser Support

LOGX works in modern browsers. The `browser` and `security` modules detect the runtime at call time and degrade gracefully when browser APIs are unavailable (e.g. private browsing, missing `localStorage`).

Browser globals are never accessed during module initialization.

---

## 🌳 Tree-Shaking

LOGX is side-effect free (`"sideEffects": false`). Each module and function is independently importable, so bundlers can eliminate unused code.

---

## ⚠ Error Handling

LOGX throws descriptive `TypeError` and `RangeError` instances for invalid arguments. It never mutates user-supplied arrays or objects unless explicitly documented.

---

## ⚡ Performance Philosophy

LOGX favors clear, maintainable implementations over premature micro-optimization. Benchmarks live in `benchmarks/`.

---

## 🧪 Testing

```bash
npm test
npm run test:coverage
```

Tests use Vitest. Target coverage is 90% statements and branches for the stable core.

---

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) and [docs/contributing.md](./docs/contributing.md).

---

## 🔒 Security Reporting

See [SECURITY.md](./SECURITY.md) and [docs/security.md](./docs/security.md).

---

## 📄 License

MIT. See [LICENSE](./LICENSE).

---

## 👤 Author and Repository

**Mwaki Denis** — https://github.com/mwakidenis/logx

**NPM Package:** https://www.npmjs.com/package/@mwakidenis/logx

---

<p align="center">
  <b>Built with ❤️ by Mwaki Denis</b>
</p>
