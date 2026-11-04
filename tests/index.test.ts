/// <reference types="vitest/globals" />

import * as mod from "../src/index.ts";

describe("LOGX core", () => {
  it("exports all modules", () => {
    expect(typeof mod.chunk).toBe("function");
    expect(typeof mod.unique).toBe("function");
    expect(typeof mod.camelCase).toBe("function");
    expect(typeof mod.debounce).toBe("function");
    expect(typeof mod.isValidDate).toBe("function");
  });
});
