// Object deep clone example
import { clone, deepClone, get, set, merge } from "@mwakidenis/logx";

const original = { a: { b: [1, 2] }, c: 3 };

// Shallow clone
const shallow = clone(original);
shallow.a.b.push(3); // mutates original's nested array!
console.log(original.a.b); // [1, 2, 3]

// Deep clone (safe)
const deep = deepClone(original);
deep.a.b.push(4); // does NOT mutate original
console.log(original.a.b); // [1, 2, 3]

// Get nested value safely
console.log(get(original, "a.b.0")); // 1
console.log(get(original, "missing", "default")); // "default"

// Set nested value
const obj = {};
set(obj, "user.profile.name", "Alice");
console.log(obj.user.profile.name); // Alice

// Merge
const target = { a: 1 };
merge(target, { b: 2 }, { c: 3 });
console.log(target); // { a: 1, b: 2, c: 3 }
