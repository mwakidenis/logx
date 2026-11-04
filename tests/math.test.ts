import { describe, expect, it } from "vitest";
import { sum, mean, median, min, max, mode, variance, standardDeviation, factorial, gcd, lcm, fibonacci, percentageChange } from "../src/math";

describe("math.sum", () => {
  it("sums values", () => {
    expect(sum([1, 2, 3])).toBe(6);
    expect(sum([])).toBe(0);
  });
});

describe("math.mean", () => {
  it("computes mean", () => {
    expect(mean([1, 2, 3, 4])).toBe(2.5);
  });
  it("throws on empty", () => {
    expect(() => mean([])).toThrow(RangeError);
  });
});

describe("math.median", () => {
  it("computes median", () => {
    expect(median([1, 2, 3])).toBe(2);
    expect(median([1, 2, 3, 4])).toBe(2.5);
  });
  it("throws on empty", () => {
    expect(() => median([])).toThrow(RangeError);
  });
});

describe("math.min/max", () => {
  it("computes min/max", () => {
    expect(min([3, 1, 2])).toBe(1);
    expect(max([3, 1, 2])).toBe(3);
  });
  it("throws on empty", () => {
    expect(() => min([])).toThrow(RangeError);
    expect(() => max([])).toThrow(RangeError);
  });
});

describe("math.mode", () => {
  it("computes mode", () => {
    expect(mode([1, 2, 2, 3])).toEqual([2]);
    expect(mode([1, 1, 2, 2])).toEqual([1, 2]);
    expect(mode([])).toEqual([]);
  });
});

describe("math.variance/standardDeviation", () => {
  it("computes variance and stddev", () => {
    expect(variance([1, 2, 3])).toBeCloseTo(2 / 3);
    expect(standardDeviation([1, 2, 3])).toBeCloseTo(Math.sqrt(2 / 3));
  });
  it("sample variance", () => {
    expect(variance([1, 2, 3], true)).toBe(1);
  });
  it("sample variance throws with single value", () => {
    expect(() => variance([5], true)).toThrow(RangeError);
  });
  it("throws on empty", () => {
    expect(() => variance([])).toThrow(RangeError);
  });
});

describe("math.factorial", () => {
  it("computes factorial", () => {
    expect(factorial(5)).toBe(120);
    expect(factorial(0)).toBe(1);
  });
  it("throws on negative/non-integer", () => {
    expect(() => factorial(-1)).toThrow(RangeError);
    expect(() => factorial(1.5)).toThrow(RangeError);
  });
});

describe("math.gcd/lcm", () => {
  it("computes gcd/lcm", () => {
    expect(gcd(12, 8)).toBe(4);
    expect(lcm(12, 8)).toBe(24);
  });
  it("lcm with zero returns zero", () => {
    expect(lcm(0, 5)).toBe(0);
    expect(lcm(5, 0)).toBe(0);
  });
  it("throws on non-integers", () => {
    expect(() => gcd(1.5, 2)).toThrow(TypeError);
    expect(() => lcm(1.5, 2)).toThrow(TypeError);
  });
});

describe("math.fibonacci", () => {
  it("computes fibonacci sequence", () => {
    expect(fibonacci(5)).toEqual([0, 1, 1, 2, 3]);
    expect(fibonacci(0)).toEqual([]);
  });
  it("throws on negative", () => {
    expect(() => fibonacci(-1)).toThrow(RangeError);
  });
});

describe("math.percentageChange", () => {
  it("computes percentage change", () => {
    expect(percentageChange(100, 150)).toBe(50);
  });
  it("throws on zero initial", () => {
    expect(() => percentageChange(0, 10)).toThrow(RangeError);
  });
});
