#!/usr/bin/env node
"use strict";

const { execSync } = require("child_process");

const scripts = {
  "build": "npm run build",
  "clean": "npm run clean",
  "test": "npm test",
  "test:coverage": "npm run test:coverage",
  "lint": "npm run lint",
  "lint:fix": "npm run lint:fix",
  "typecheck": "npm run typecheck",
  "format": "npm run format",
  "format:check": "npm run format:check",
  "docs": "npm run docs",
  "benchmark": "npm run benchmark",
  "pack:check": "npm run pack:check",
};

const [, , name] = process.argv;

if (!name || !scripts[name]) {
  console.error(`Usage: node scripts/run.js <script>`);
  console.error(`Available: ${Object.keys(scripts).join(", ")}`);
  process.exit(1);
}

try {
  execSync(scripts[name], { stdio: "inherit" });
} catch (err) {
  process.exit(1);
}
