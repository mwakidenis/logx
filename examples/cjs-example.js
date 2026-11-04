// CommonJS example
const { unique, camelCase, clamp } = require("@mwakidenis/logx");

console.log(unique([1, 2, 2, 3])); // [1, 2, 3]
console.log(camelCase("hello-world")); // helloWorld
console.log(clamp(5, 0, 10)); // 5
