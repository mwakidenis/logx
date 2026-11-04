import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/array/index.ts",
    "src/object/index.ts",
    "src/string/index.ts",
    "src/number/index.ts",
    "src/math/index.ts",
    "src/function/index.ts",
    "src/collection/index.ts",
    "src/date/index.ts",
    "src/validation/index.ts",
    "src/async/index.ts",
    "src/browser/index.ts",
    "src/security/index.ts",
  ],
  format: ["esm", "cjs"],
  dts: {
    resolve: true,
  },
  splitting: false,
  clean: true,
  shims: true,
  outDir: "dist",
  cjsInterop: true,
  skipNodeModulesBundle: true,
  external: [],
  bundle: true,
});
