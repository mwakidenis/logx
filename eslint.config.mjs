import { fileURLToPath } from "url";
import { dirname } from "path";
import tseslint from "typescript-eslint";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default tseslint.config({
  files: ["src/**/*.ts", "tests/**/*.ts"],
  ignores: [
    "coverage/**",
    "dist/**",
    "benchmarks/**",
    "examples/**",
    "scripts/**",
    "docs/**",
    "node_modules/**",
    "*.config.*",
  ],
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ["./tsconfig.json"],
      tsconfigRootDir: __dirname,
    },
  },
  rules: {
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  },
});
