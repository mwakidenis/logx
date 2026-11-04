import { describe, expect, it, vi } from "vitest";
import { clamp, inRange, random, randomInt, round, floor, ceil, precision, isEven, isOdd, isPrime, percentage, formatNumber } from "../src/number";

describe("number.clamp", () => {
  it("clamps within range", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(15, 0, 10)).toBe(10);
  });
  it("throws when min > max", () => {
    expect(() => clamp(5, 10, 0)).toThrow(RangeError);
  });
});

describe("number.inRange", () => {
  it("checks range [start, end)", () => {
    expect(inRange(5, 0, 10)).toBe(true);
    expect(inRange(0, 0, 10)).toBe(true);
    expect(inRange(10, 0, 10)).toBe(false);
    expect(inRange(5, 10, 0)).toBe(true);
  });
});

describe("number.random/randomInt", () => {
  beforeEach(() => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("returns integer in range", () => {
    expect(randomInt(1, 10)).toBe(6);
    expect(random(0, 100, true)).toBe(50);
  });
  it("randomInt throws on non-integers", () => {
    expect(() => randomInt(1.5, 10)).toThrow(TypeError);
    expect(() => randomInt(10, 1)).toThrow(RangeError);
  });
  it("random throws when min > max", () => {
    expect(() => random(10, 1)).toThrow(RangeError);
  });
});

describe("number.round/floor/ceil", () => {
  it("rounds to decimals", () => {
    expect(round(1.234, 2)).toBe(1.23);
    expect(floor(1.999, 1)).toBe(1.9);
    expect(ceil(1.001, 1)).toBe(1.1);
  });
  it("throws on negative decimals", () => {
    expect(() => round(1, -1)).toThrow(RangeError);
  });
});

describe("number.precision", () => {
  it("returns decimal digit count", () => {
    expect(precision(1.23)).toBe(2);
    expect(precision(5)).toBe(0);
    expect(precision(1.2345)).toBe(4);
  });
  it("throws on non-finite", () => {
    expect(() => precision(NaN)).toThrow(RangeError);
  });
});

describe("number.parity", () => {
  it("checks even/odd", () => {
    expect(isEven(2)).toBe(true);
    expect(isEven(3)).toBe(false);
    expect(isOdd(3)).toBe(true);
    expect(isOdd(2)).toBe(false);
    expect(isEven(2.5)).toBe(false);
  });
});

describe("number.isPrime", () => {
  it("checks primality", () => {
    expect(isPrime(2)).toBe(true);
    expect(isPrime(7)).toBe(true);
    expect(isPrime(9)).toBe(false);
    expect(isPrime(1)).toBe(false);
    expect(isPrime(0)).toBe(false);
  });
});

describe("number.percentage", () => {
  it("computes percentage", () => {
    expect(percentage(50, 200)).toBe(25);
  });
  it("throws on zero total", () => {
    expect(() => percentage(1, 0)).toThrow(RangeError);
  });
});

describe("number.formatNumber", () => {
  it("formats number", () => {
    expect(formatNumber(1000)).toBe("1,000");
  });
  it("uses options", () => {
    expect(formatNumber(0.5, { style: "percent" })).toBe("50%");
  });
  it("throws on non-finite", () => {
    expect(() => formatNumber(NaN)).toThrow(RangeError);
  });
});
