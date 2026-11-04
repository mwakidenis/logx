// Modular imports (tree-shaking friendly)
import { chunk } from "@mwakidenis/logx/array";
import { camelCase } from "@mwakidenis/logx/string";
import { debounce } from "@mwakidenis/logx/function";

// Direct subpath import
import { chunk as chunkDirect } from "@mwakidenis/logx/array/chunk";

console.log(chunk([1, 2, 3, 4], 2)); // [[1, 2], [3, 4]]
console.log(camelCase("foo-bar")); // fooBar

const logged = debounce(console.log, 50);
logged("modular import works");
