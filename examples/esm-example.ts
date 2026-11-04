// ESM / TypeScript example
import { chunk, unique, camelCase, debounce, groupBy, isEmail } from "@mwakidenis/logx";

// Array utilities
const numbers = [1, 2, 2, 3, 4, 4, 5];
console.log(unique(numbers)); // [1, 2, 3, 4, 5]

const chunked = chunk([1, 2, 3, 4, 5], 2);
console.log(chunked); // [[1, 2], [3, 4], [5]]

// String utilities
console.log(camelCase("hello-world")); // helloWorld

// Object utilities
const user = { id: 1, name: "Alice", age: 30 };
const picked = { ...user };
console.log(picked.name); // Alice

// Collection utilities
const items = ["apple", "apricot", "banana", "blueberry"];
const grouped = groupBy(items, (item) => item[0]);
console.log(grouped); // { a: ["apple", "apricot"], b: ["banana", "blueberry"] }

// Validation
console.log(isEmail("user@example.com")); // true

// Function utilities — debounce
const log = debounce(console.log, 100);
log("debounced message");
