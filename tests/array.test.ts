import { describe, expect, it, vi } from "vitest";
import { chunk, compact, unique, flatten, flattenDeep, difference, intersection, union, shuffle, sample, first, last, take, drop, partition, groupConsecutive } from "../src/array";

describe("array.chunk", () => {
  it("splits array into chunks of given size", () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });
  it("returns empty array for empty input", () => {
    expect(chunk([], 3)).toEqual([]);
  });
  it("single chunk when size >= length", () => {
    expect(chunk([1, 2], 5)).toEqual([[1, 2]]);
  });
  it("throws on non-positive size", () => {
    expect(() => chunk([1, 2], 0)).toThrow(RangeError);
    expect(() => chunk([1, 2], -1)).toThrow(RangeError);
    expect(() => chunk([1, 2], 2.5)).toThrow(RangeError);
  });
  it("does not mutate input", () => {
    const input = [1, 2, 3];
    chunk(input, 2);
    expect(input).toEqual([1, 2, 3]);
  });
});

describe("array.compact", () => {
  it("removes null and undefined values", () => {
    expect(compact([1, null, 2, undefined, 3])).toEqual([1, 2, 3]);
  });
  it("removes empty array", () => {
    expect(compact([null, undefined])).toEqual([]);
  });
  it("preserves falsy non-null values", () => {
    expect(compact([0, false, "", null])).toEqual([0, false, ""]);
  });
  it("does not mutate input", () => {
    const input = [1, null, 2];
    compact(input);
    expect(input).toEqual([1, null, 2]);
  });
});

describe("array.unique", () => {
  it("removes duplicate values", () => {
    expect(unique([1, 2, 2, 3, 1])).toEqual([1, 2, 3]);
  });
  it("returns empty array for empty input", () => {
    expect(unique([])).toEqual([]);
  });
  it("preserves order of first occurrence", () => {
    expect(unique(["b", "a", "b", "c", "a"])).toEqual(["b", "a", "c"]);
  });
  it("works with objects by reference", () => {
    const a = { id: 1 };
    const b = { id: 1 };
    expect(unique([a, b, a])).toEqual([a, b]);
  });
});

describe("array.flatten", () => {
  it("flattens one level by default", () => {
    expect(flatten([1, [2, 3], 4])).toEqual([1, 2, 3, 4]);
  });
  it("flattens to specified depth", () => {
    expect(flatten([1, [2, [3, [4]]]], 2)).toEqual([1, 2, 3, [4]]);
  });
  it("depth 0 returns copy", () => {
    expect(flatten([1, [2]], 0)).toEqual([1, [2]]);
  });
  it("throws on negative depth", () => {
    expect(() => flatten([1], -1)).toThrow(RangeError);
  });
  it("returns empty for empty input", () => {
    expect(flatten([])).toEqual([]);
  });
});

describe("array.flattenDeep", () => {
  it("flattens nested arrays completely", () => {
    expect(flattenDeep([1, [2, [3, [4]]]])).toEqual([1, 2, 3, 4]);
  });
  it("returns empty for empty input", () => {
    expect(flattenDeep([])).toEqual([]);
  });
});

describe("array.difference", () => {
  it("returns values excluded by other arrays", () => {
    expect(difference([1, 2, 3, 4], [2, 4])).toEqual([1, 3]);
  });
  it("supports multiple exclusion arrays", () => {
    expect(difference([1, 2, 3], [2], [3])).toEqual([1]);
  });
  it("returns copy when no exclusions", () => {
    expect(difference([1, 2])).toEqual([1, 2]);
  });
  it("handles empty input", () => {
    expect(difference([], [1])).toEqual([]);
  });
});

describe("array.intersection", () => {
  it("returns common values", () => {
    expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
  });
  it("returns empty for no common values", () => {
    expect(intersection([1, 2], [3, 4])).toEqual([]);
  });
  it("returns empty for no arrays", () => {
    expect(intersection()).toEqual([]);
  });
  it("deduplicates", () => {
    expect(intersection([1, 1, 2], [1, 2, 2])).toEqual([1, 2]);
  });
});

describe("array.union", () => {
  it("returns combined unique values", () => {
    expect(union([1, 2], [2, 3])).toEqual([1, 2, 3]);
  });
  it("handles no arrays", () => {
    expect(union()).toEqual([]);
  });
});

describe("array.shuffle", () => {
  it("returns same length with same elements", () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffle(input);
    expect(result).toHaveLength(5);
    expect(unique(result).sort()).toEqual([1, 2, 3, 4, 5]);
  });
  it("does not mutate input", () => {
    const input = [1, 2, 3];
    shuffle(input);
    expect(input).toEqual([1, 2, 3]);
  });
  it("returns empty for empty input", () => {
    expect(shuffle([])).toEqual([]);
  });
});

describe("array.sample", () => {
  beforeEach(() => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("returns an element from the array", () => {
    expect(sample(["a", "b", "c"])).toBe("b");
  });
  it("returns undefined for empty array", () => {
    expect(sample([])).toBeUndefined();
  });
});

describe("array.first", () => {
  it("returns first element", () => {
    expect(first([1, 2, 3])).toBe(1);
  });
  it("returns undefined for empty", () => {
    expect(first([])).toBeUndefined();
  });
  it("returns first N elements", () => {
    expect(first([1, 2, 3, 4], 2)).toEqual([1, 2]);
  });
  it("throws on invalid count", () => {
    expect(() => first([1], -1)).toThrow(RangeError);
    expect(() => first([1], 1.5)).toThrow(RangeError);
  });
});

describe("array.last", () => {
  it("returns last element", () => {
    expect(last([1, 2, 3])).toBe(3);
  });
  it("returns undefined for empty", () => {
    expect(last([])).toBeUndefined();
  });
  it("returns last N elements", () => {
    expect(last([1, 2, 3, 4], 2)).toEqual([3, 4]);
  });
  it("throws on invalid count", () => {
    expect(() => last([1], -1)).toThrow(RangeError);
  });
});

describe("array.take", () => {
  it("returns first N elements", () => {
    expect(take([1, 2, 3, 4], 2)).toEqual([1, 2]);
  });
  it("returns all when count >= length", () => {
    expect(take([1, 2], 5)).toEqual([1, 2]);
  });
  it("returns empty for count 0", () => {
    expect(take([1, 2], 0)).toEqual([]);
  });
  it("throws on invalid count", () => {
    expect(() => take([1], -1)).toThrow(RangeError);
  });
});

describe("array.drop", () => {
  it("drops first N elements", () => {
    expect(drop([1, 2, 3, 4], 2)).toEqual([3, 4]);
  });
  it("returns all when count 0", () => {
    expect(drop([1, 2], 0)).toEqual([1, 2]);
  });
  it("returns empty when count >= length", () => {
    expect(drop([1, 2], 5)).toEqual([]);
  });
  it("throws on invalid count", () => {
    expect(() => drop([1], -1)).toThrow(RangeError);
  });
});

describe("array.partition", () => {
  it("splits by predicate", () => {
    const [even, odd] = partition([1, 2, 3, 4, 5], (n) => n % 2 === 0);
    expect(even).toEqual([2, 4]);
    expect(odd).toEqual([1, 3, 5]);
  });
  it("returns two empty arrays for empty input", () => {
    const [a, b] = partition([], () => true);
    expect(a).toEqual([]);
    expect(b).toEqual([]);
  });
});

describe("array.groupConsecutive", () => {
  it("groups consecutive equal values", () => {
    expect(groupConsecutive([1, 1, 2, 2, 2, 3])).toEqual([[1, 1], [2, 2, 2], [3]]);
  });
  it("returns empty for empty input", () => {
    expect(groupConsecutive([])).toEqual([]);
  });
});
