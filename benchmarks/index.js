const { chunk, unique, flatten, difference, intersection, union, shuffle, sample } = require("../dist/cjs/array");
const { camelCase, pascalCase, snakeCase, kebabCase, truncate, slugify, escapeHtml } = require("../dist/cjs/string");
const { clamp, randomInt, round, isPrime, percentage } = require("../dist/cjs/number");
const { sum, mean, median, factorial, gcd, fibonacci } = require("../dist/cjs/math");
const { debounce, throttle, once, memoize, compose, pipe } = require("../dist/cjs/function");
const { groupBy, keyBy, countBy, sortBy, orderBy, partition, find, every } = require("../dist/cjs/collection");
const { isValidDate, addDays, differenceInDays } = require("../dist/cjs/date");
const { isEmail, isURL, isEmpty } = require("../dist/cjs/validation");
const { sleep, retry, timeout } = require("../dist/cjs/async");
const { secureCompare, secureRandomInt } = require("../dist/cjs/security");

const LABEL_PAD = 32;
function bench(name, fn, iterations = 10000) {
  const start = process.hrtime.bigint();
  for (let i = 0; i < iterations; i += 1) {
    fn();
  }
  const end = process.hrtime.bigint();
  const ms = Number(end - start) / 1_000_000;
  const perOp = (ms / iterations) * 1_000_000;
  console.log(name.padEnd(LABEL_PAD) + ms.toFixed(2) + " ms total | " + perOp.toFixed(3) + " us/op");
  return ms;
}

function makeArray(size) {
  return Array.from({ length: size }, (_, i) => i);
}

console.log("LOGX Benchmarks");
console.log("============================\n");

console.log("--- Array ---");
const small = makeArray(10);
const medium = makeArray(1000);
const large = makeArray(10000);

bench("chunk small (n=10, size=3)", () => chunk(small, 3));
bench("chunk medium (n=1000, size=10)", () => chunk(medium, 10));
bench("chunk large (n=10000, size=100)", () => chunk(large, 100));

bench("unique small (n=10)", () => unique(small));
bench("unique medium (n=1000)", () => unique(medium));
bench("unique large (n=10000)", () => unique(large));

const nested = [1, [2, [3, [4, 5]]], 6];
bench("flatten depth=1", () => flatten(nested));
bench("flatten depth=2", () => flatten(nested, 2));

const a1 = makeArray(500);
const a2 = makeArray(500).map((x) => x + 250);
bench("difference (n=500)", () => difference(a1, a2));
bench("intersection (n=500)", () => intersection(a1, a2));
bench("union (n=500)", () => union(a1, a2));

bench("shuffle (n=1000)", () => shuffle(medium));
bench("sample (n=1000)", () => sample(medium));

console.log("\n--- String ---");
bench("camelCase", () => camelCase("hello-world-this-is-a-test-string"));
bench("pascalCase", () => pascalCase("hello-world-this-is-a-test-string"));
bench("snakeCase", () => snakeCase("helloWorldThisIsATest"));
bench("kebabCase", () => kebabCase("helloWorldThisIsATest"));
bench("truncate (long)", () => truncate("A very long string that needs to be truncated for display purposes", { length: 20 }));
bench("slugify", () => slugify("Hello World! This is a Test---123"));
bench("escapeHtml", () => escapeHtml("<div>Hello & welcome</div>"));

console.log("\n--- Number ---");
bench("clamp", () => clamp(50, 0, 100));
bench("randomInt", () => randomInt(1, 1000));
bench("round (2 decimals)", () => round(3.14159, 2));
bench("isPrime (997)", () => isPrime(997));
bench("percentage", () => percentage(25, 200));

console.log("\n--- Math ---");
const nums = makeArray(1000);
bench("sum (n=1000)", () => sum(nums));
bench("mean (n=1000)", () => mean(nums));
bench("median (n=1000)", () => median(nums));
bench("factorial (20)", () => factorial(20));
bench("gcd", () => gcd(123456, 789012));
bench("fibonacci (50)", () => fibonacci(50));

console.log("\n--- Function ---");
const identity = (x) => x;
const add1 = (x) => x + 1;
const double = (x) => x * 2;
bench("debounce (1ms)", () => { const d = debounce(identity, 1); d(1); d.cancel(); });
bench("throttle (1ms)", () => { const t = throttle(identity, 1); t(1); t.cancel(); });
bench("once", () => { const o = once(identity); o(1); o(1); });
bench("memoize", () => { const m = memoize((n) => n * 2); m(21); m(21); });
bench("compose (2 fns)", () => compose(double, add1)(5));
bench("pipe (2 fns)", () => pipe(add1, double)(5));

console.log("\n--- Collection ---");
const users = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 35 },
  { name: "Diana", age: 28 },
];
bench("groupBy", () => groupBy(users, (u) => u.age >= 30 ? "senior" : "junior"));
bench("keyBy", () => keyBy(users, (u) => u.name));
bench("countBy", () => countBy(users, (u) => u.age >= 30 ? "senior" : "junior"));
bench("sortBy", () => sortBy(users, (u) => u.age));
bench("orderBy", () => orderBy(users, [(u) => u.age], ["desc"]));
bench("partition", () => partition(users, (u) => u.age >= 30));
bench("find", () => find(users, (u) => u.name === "Charlie"));
bench("every", () => every(users, (u) => u.age > 0));

console.log("\n--- Date ---");
const d1 = new Date(2024, 0, 1);
const d2 = new Date(2024, 0, 30);
bench("isValidDate", () => isValidDate(d1));
bench("addDays", () => addDays(d1, 5));
bench("differenceInDays", () => differenceInDays(d1, d2));

console.log("\n--- Validation ---");
bench("isEmail", () => isEmail("user@example.com"));
bench("isURL", () => isURL("https://example.com"));
bench("isEmpty", () => isEmpty({}));

console.log("\n--- Async ---");
bench("sleep (1ms)", async () => { await sleep(1); });
bench("retry (success)", async () => { await retry(() => Promise.resolve("ok"), { retries: 3, delay: 0 }); });
bench("timeout (resolve)", async () => { await timeout(Promise.resolve("ok"), { timeout: 1000 }); });

console.log("\n--- Security ---");
bench("secureCompare (equal)", () => secureCompare("secret", "secret"));
bench("secureCompare (diff)", () => secureCompare("secret1", "secret2"));
bench("secureRandomInt", () => secureRandomInt(1, 1000));

console.log("\nDone.");
