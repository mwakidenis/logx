import { describe, expect, it } from "vitest";
import { clone, deepClone, get, set, has, pick, omit, merge, keys, values, entries, invert, mapValues, mapKeys } from "../src/object";

describe("object.clone", () => {
  it("clones plain object shallowly", () => {
    const src = { a: 1, b: "x" };
    expect(clone(src)).toEqual({ a: 1, b: "x" });
    expect(clone(src)).not.toBe(src);
  });
  it("clones array shallowly", () => {
    const src = [1, 2, 3];
    expect(clone(src)).toEqual([1, 2, 3]);
    expect(clone(src)).not.toBe(src);
  });
  it("returns primitives unchanged", () => {
    expect(clone(5)).toBe(5);
    expect(clone("x")).toBe("x");
    expect(clone(null)).toBeNull();
    expect(clone(undefined)).toBeUndefined();
  });
});

describe("object.deepClone", () => {
  it("deep clones nested objects", () => {
    const src = { a: { b: [1, 2] } };
    const out = deepClone(src) as { a: { b: number[] } };
    expect(out).toEqual(src);
    expect(out).not.toBe(src);
    expect(out.a).not.toBe(src.a);
  });
  it("handles dates", () => {
    const d = new Date("2024-01-01");
    expect(deepClone(d)).toEqual(d);
    expect(deepClone(d)).not.toBe(d);
  });
  it("handles circular references", () => {
    const src = { a: 1 } as Record<string, unknown>;
    src.self = src;
    const out = deepClone(src) as Record<string, unknown>;
    expect(out.self).toBe(out);
  });
  it("handles arrays and Maps/Sets", () => {
    expect(deepClone([1, [2]])).toEqual([1, [2]]);
    const m = new Map([["a", 1]]);
    expect((deepClone(m) as Map<string, number>).get("a")).toBe(1);
    const s = new Set([1, 2]);
    expect((deepClone(s) as Set<number>).has(1)).toBe(true);
  });
});

describe("object.get", () => {
  const obj = { a: { b: { c: 42 } }, arr: [10, 20] };
  it("gets nested value by path", () => {
    expect(get(obj, "a.b.c")).toBe(42);
    expect(get(obj, ["a", "b", "c"])).toBe(42);
  });
  it("gets array index path", () => {
    expect(get(obj, "arr.1")).toBe(20);
  });
  it("returns default for missing path", () => {
    expect(get(obj, "a.b.d", "fallback")).toBe("fallback");
  });
  it("returns undefined for missing path without default", () => {
    expect(get(obj, "missing")).toBeUndefined();
  });
  it("works on null/undefined", () => {
    expect(get(null, "a.b")).toBeUndefined();
    expect(get(undefined, "a")).toBeUndefined();
  });
});

describe("object.has", () => {
  const obj = { a: { b: 1 } };
  it("returns true for existing path", () => {
    expect(has(obj, "a.b")).toBe(true);
  });
  it("returns false for missing path", () => {
    expect(has(obj, "a.c")).toBe(false);
  });
});

describe("object.set", () => {
  it("sets nested value creating intermediate objects", () => {
    const obj: Record<string, unknown> = {};
    set(obj, "a.b.c", 5);
    expect(obj.a).toEqual({ b: { c: 5 } });
  });
  it("sets array index path", () => {
    const obj: Record<string, unknown> = { arr: [1, 2] };
    set(obj, "arr.1", 99);
    expect((obj.arr as unknown[])[1]).toBe(99);
  });
  it("returns mutated object", () => {
    const obj: Record<string, unknown> = { a: 1 };
    const result = set(obj, "a", 2);
    expect(result).toBe(obj);
    expect(obj.a).toBe(2);
  });
});

describe("object.pick", () => {
  it("picks specified keys", () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(pick(obj, ["a", "c"])).toEqual({ a: 1, c: 3 });
  });
  it("ignores missing keys", () => {
    const obj: Record<string, number> = { a: 1 };
    expect(pick(obj, ["b"])).toEqual({});
  });
});

describe("object.omit", () => {
  it("omits specified keys", () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(omit(obj, ["b"])).toEqual({ a: 1, c: 3 });
  });
});

describe("object.merge", () => {
  it("merges sources into target deeply", () => {
    const target = { a: { x: 1 } };
    const result = merge(target, { a: { y: 2 }, b: 3 });
    expect(result).toEqual({ a: { x: 1, y: 2 }, b: 3 });
    expect(result).toBe(target);
  });
  it("skips non-plain sources", () => {
    expect(merge({ a: 1 }, null, undefined, [1, 2])).toEqual({ a: 1 });
  });
  it("does not allow prototype keys", () => {
    const obj: Record<string, unknown> = {};
    merge(obj, JSON.parse('{"__proto__": {"polluted": true}}') as object);
    expect(({} as Record<string, unknown>).polluted).toBeUndefined();
  });
});

describe("object.keys/values/entries", () => {
  const obj = { b: 2, a: 1 };
  it("returns keys", () => {
    expect(keys(obj)).toEqual(["b", "a"]);
  });
  it("returns values", () => {
    expect(values(obj)).toEqual([2, 1]);
  });
  it("returns entries", () => {
    expect(entries(obj)).toEqual([["b", 2], ["a", 1]]);
  });
});

describe("object.invert", () => {
  it("inverts keys and values", () => {
    expect(invert({ a: "1", b: "2" })).toEqual({ "1": "a", "2": "b" });
  });
});

describe("object.mapValues/mapKeys", () => {
  const obj = { a: 1, b: 2 };
  it("maps values", () => {
    expect(mapValues(obj, (v) => v * 10)).toEqual({ a: 10, b: 20 });
  });
  it("maps keys", () => {
    expect(mapKeys(obj, (k) => k.toUpperCase())).toEqual({ A: 1, B: 2 });
  });
});
