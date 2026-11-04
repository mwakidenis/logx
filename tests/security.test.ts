import { describe, expect, it } from "vitest";
import { secureCompare, secureRandom, secureRandomInt, escapeHtml } from "../src/security";

describe("security.secureCompare", () => {
  it("returns true for equal values", () => {
    expect(secureCompare("abc", "abc")).toBe(true);
    expect(secureCompare("", "")).toBe(true);
  });
  it("returns false when lengths differ", () => {
    expect(secureCompare("abc", "abcd")).toBe(false);
  });
  it("handles null/undefined", () => {
    expect(secureCompare(null, undefined)).toBe(true);
    expect(secureCompare("a", null)).toBe(false);
  });
});

describe("security.secureRandom", () => {
  it("returns bytes of requested length", () => {
    const buf = secureRandom(16);
    expect(buf.length).toBe(16);
  });
  it("throws on invalid length", () => {
    expect(() => secureRandom(0)).toThrow(RangeError);
    expect(() => secureRandom(-1)).toThrow(RangeError);
    expect(() => secureRandom(2000)).toThrow(RangeError);
    expect(() => secureRandom(1.5)).toThrow(RangeError);
  });
});

describe("security.secureRandomInt", () => {
  it("returns ints within range", () => {
    for (let i = 0; i < 100; i += 1) {
      const v = secureRandomInt(1, 6);
      expect(v).toBeGreaterThanOrEqual(1);
      expect(v).toBeLessThanOrEqual(6);
    }
  });
  it("throws on invalid args", () => {
    expect(() => secureRandomInt(5, 1)).toThrow(RangeError);
    expect(() => secureRandomInt(1.5, 5)).toThrow(TypeError);
  });
});

describe("security.escapeHtml", () => {
  it("escapes HTML", () => {
    expect(escapeHtml("<x>")).toBe("&lt;x&gt;");
  });
});
