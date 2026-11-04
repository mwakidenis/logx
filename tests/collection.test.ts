import { describe, expect, it } from "vitest";
import { groupBy, keyBy, countBy, partition, sortBy, orderBy, count, find, findLast, every, some } from "../src/collection";

describe("collection.groupBy", () => {
  it("groups by iteratee", () => {
    expect(groupBy([6.1, 4.2, 6.3], Math.floor)).toEqual({ 6: [6.1, 6.3], 4: [4.2] });
  });
  it("returns empty for empty", () => {
    expect(groupBy([], () => 1)).toEqual({});
  });
});

describe("collection.keyBy", () => {
  it("keys by iteratee", () => {
    expect(keyBy([{ id: "a" }, { id: "b" }], (x) => x.id)).toEqual({ a: { id: "a" }, b: { id: "b" } });
  });
});

describe("collection.countBy", () => {
  it("counts by iteratee", () => {
    expect(countBy([6.1, 4.2, 6.3], Math.floor)).toEqual({ 6: 2, 4: 1 });
  });
});

describe("collection.partition", () => {
  it("partitions by predicate", () => {
    const [a, b] = partition([1, 2, 3, 4], (n) => n % 2 === 0);
    expect(a).toEqual([2, 4]);
    expect(b).toEqual([1, 3]);
  });
});

describe("collection.sortBy", () => {
  it("sorts by iteratee", () => {
    expect(sortBy(["ccc", "bb", "a"], (s) => s.length)).toEqual(["a", "bb", "ccc"]);
  });
});

describe("collection.orderBy", () => {
  it("orders by multiple iteratees", () => {
    const users = [{ user: "fred", age: 48 }, { user: "barney", age: 36 }, { user: "fred", age: 40 }];
    const result = orderBy(users, [(u) => u.user], ["asc"]);
    expect(result[0].user).toBe("barney");
  });
});

describe("collection.count", () => {
  it("counts all or matching", () => {
    expect(count([1, 2, 3])).toBe(3);
    expect(count([1, 2, 3], (n) => n > 1)).toBe(2);
  });
});

describe("collection.find/findLast", () => {
  it("finds first/last matching", () => {
    expect(find([1, 2, 3, 4], (n) => n > 2)).toBe(3);
    expect(findLast([1, 2, 3, 4], (n) => n > 2)).toBe(4);
    expect(find([1, 2], (n) => n > 9)).toBeUndefined();
  });
});

describe("collection.every/some", () => {
  it("checks every/some", () => {
    expect(every([2, 4, 6], (n) => n % 2 === 0)).toBe(true);
    expect(some([1, 2, 3], (n) => n > 2)).toBe(true);
    expect(some([1, 2], (n) => n > 9)).toBe(false);
  });
  it("uses truthiness when no predicate", () => {
    expect(every([1, 2, 3])).toBe(true);
    expect(every([0, 1])).toBe(false);
    expect(some([0, 0, 1])).toBe(true);
    expect(some([0, 0])).toBe(false);
  });
});
