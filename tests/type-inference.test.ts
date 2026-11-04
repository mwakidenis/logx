import { describe, expect, it } from "vitest";
import {
  chunk, unique, first, last, sample, partition,
} from "../src/array";
import {
  clone, get, set, pick, mapValues, invert,
} from "../src/object";
import {
  camelCase, truncate, escapeHtml,
} from "../src/string";
import {
  clamp, randomInt, isPrime, formatNumber,
} from "../src/number";
import {
  sum, median, factorial, fibonacci,
} from "../src/math";
import {
  once, memoize, compose, pipe, identity, noop,
} from "../src/function";
import {
  groupBy, keyBy, find, findLast, every,
} from "../src/collection";
import {
  isValidDate, addDays, differenceInDays, isSameDay,
} from "../src/date";
import {
  isString, isNumber, isArray, isNil,
} from "../src/validation";
import {
  sleep, retry, withTimeout,
} from "../src/async";
import {
  secureCompare, secureRandomInt,
} from "../src/security";

function assertType<T>(_value: T): void {}

describe("type inference — array", () => {
  it("chunk preserves element type", () => {
    const nums: number[] = [1, 2, 3];
    const result: number[][] = chunk(nums, 2);
    assertType<number[][]>(result);
    expect(result).toEqual([[1, 2], [3]]);
  });

  it("unique preserves element type", () => {
    const strs: string[] = ["a", "b", "a"];
    const result: string[] = unique(strs);
    assertType<string[]>(result);
    expect(result).toEqual(["a", "b"]);
  });

  it("first returns element or undefined", () => {
    const nums: number[] = [1, 2, 3];
    const head: number | undefined = first(nums);
    assertType<number | undefined>(head);
    expect(head).toBe(1);
  });

  it("first with count returns array", () => {
    const nums: number[] = [1, 2, 3];
    const result: number[] = first(nums, 2);
    assertType<number[]>(result);
    expect(result).toEqual([1, 2]);
  });

  it("partition returns tuple of arrays", () => {
    const nums: number[] = [1, 2, 3, 4];
    const [evens, odds]: [number[], number[]] = partition(nums, (n) => n % 2 === 0);
    assertType<number[]>(evens);
    assertType<number[]>(odds);
    expect(evens).toEqual([2, 4]);
    expect(odds).toEqual([1, 3]);
  });

  it("sample returns element or undefined", () => {
    const nums: number[] = [1, 2, 3];
    const picked: number | undefined = sample(nums);
    assertType<number | undefined>(picked);
    expect(nums).toContain(picked!);
  });

  it("last returns element or undefined", () => {
    const nums: number[] = [1, 2, 3];
    const tail: number | undefined = last(nums);
    assertType<number | undefined>(tail);
    expect(tail).toBe(3);
  });
});

describe("type inference — object", () => {
  it("clone preserves type", () => {
    const obj = { a: 1, b: "x" };
    const result = clone(obj);
    assertType<{ a: number; b: string }>(result);
    expect(result).toEqual({ a: 1, b: "x" });
  });

  it("get returns value or default", () => {
    const obj = { a: { b: 42 } };
    const result = get(obj, "a.b", 0) as number | undefined;
    assertType<number | undefined>(result);
    expect(result).toBe(42);
  });

  it("set returns mutated object", () => {
    const obj: Record<string, unknown> = {};
    const result = set(obj, "a.b", 1);
    assertType<Record<string, unknown>>(result);
    expect(result).toBe(obj);
    expect(obj).toEqual({ a: { b: 1 } });
  });

  it("pick returns partial", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = pick(obj, ["a", "c"]);
    assertType<Partial<{ a: number; b: number; c: number }>>(result);
    expect(result).toEqual({ a: 1, c: 3 });
  });

  it("mapValues transforms value type", () => {
    const obj = { a: 1, b: 2 };
    const result = mapValues(obj, (v) => v * 10);
    assertType<Record<string, number>>(result);
    expect(result).toEqual({ a: 10, b: 20 });
  });

  it("invert returns record", () => {
    const obj = { a: "1", b: "2" };
    const result = invert(obj);
    assertType<Record<string, string>>(result);
    expect(result).toEqual({ "1": "a", "2": "b" });
  });
});

describe("type inference — string", () => {
  it("camelCase returns string", () => {
    const result = camelCase("hello world");
    assertType<string>(result);
    expect(result).toBe("helloWorld");
  });

  it("truncate returns string", () => {
    const result = truncate("hello world", { length: 5 });
    assertType<string>(result);
    expect(result).toBe("he...");
  });

  it("escapeHtml returns string", () => {
    const result = escapeHtml("<a>");
    assertType<string>(result);
    expect(result).toBe("&lt;a&gt;");
  });
});

describe("type inference — number", () => {
  it("clamp returns number", () => {
    const result = clamp(5, 0, 10);
    assertType<number>(result);
    expect(result).toBe(5);
  });

  it("randomInt returns number", () => {
    const result = randomInt(1, 10);
    assertType<number>(result);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(10);
  });

  it("isPrime returns boolean", () => {
    const result = isPrime(7);
    assertType<boolean>(result);
    expect(result).toBe(true);
  });

  it("formatNumber returns string", () => {
    const result = formatNumber(1000);
    assertType<string>(result);
    expect(result).toBe("1,000");
  });
});

describe("type inference — math", () => {
  it("sum returns number", () => {
    const result = sum([1, 2, 3]);
    assertType<number>(result);
    expect(result).toBe(6);
  });

  it("median returns number", () => {
    const result = median([1, 2, 3]);
    assertType<number>(result);
    expect(result).toBe(2);
  });

  it("factorial returns number", () => {
    const result = factorial(5);
    assertType<number>(result);
    expect(result).toBe(120);
  });

  it("fibonacci returns number array", () => {
    const result = fibonacci(5);
    assertType<number[]>(result);
    expect(result).toEqual([0, 1, 1, 2, 3]);
  });
});

describe("type inference — function", () => {
  it("once preserves function type", () => {
    const fn = (x: number) => x * 2;
    const o = once(fn as (...args: unknown[]) => unknown);
    const result = o(21) as number;
    assertType<number>(result);
    expect(result).toBe(42);
  });

  it("memoize preserves function type", () => {
    const fn = (x: number) => x * 2;
    const m = memoize(fn as (...args: unknown[]) => unknown);
    const result = m(21) as number;
    assertType<number>(result);
    expect(result).toBe(42);
  });

  it("compose returns function", () => {
    const add1 = (x: number) => x + 1;
    const double = (x: number) => x * 2;
    const result = compose(double as (...args: unknown[]) => unknown, add1 as (...args: unknown[]) => unknown)(3) as number;
    assertType<number>(result);
    expect(result).toBe(8);
  });

  it("pipe returns function", () => {
    const add1 = (x: number) => x + 1;
    const double = (x: number) => x * 2;
    const result = pipe(add1 as (...args: unknown[]) => unknown, double as (...args: unknown[]) => unknown)(3) as number;
    assertType<number>(result);
    expect(result).toBe(8);
  });

  it("identity preserves type", () => {
    const result = identity<{ id: number }>({ id: 1 });
    assertType<{ id: number }>(result);
    expect(result).toEqual({ id: 1 });
  });

  it("noop returns void", () => {
    const result = noop();
    assertType<void>(result);
    expect(result).toBeUndefined();
  });
});

describe("type inference — collection", () => {
  it("groupBy returns record of arrays", () => {
    const result = groupBy([1, 2, 3], (n) => n > 1 ? "big" : "small");
    assertType<Record<string, number[]>>(result);
    expect(result).toEqual({ small: [1], big: [2, 3] });
  });

  it("keyBy returns record", () => {
    const result = keyBy([{ id: "a" }, { id: "b" }], (x) => x.id);
    assertType<Record<string, { id: string }>>(result);
    expect(result).toEqual({ a: { id: "a" }, b: { id: "b" } });
  });

  it("find returns element or undefined", () => {
    const result = find([1, 2, 3], (n) => n > 2);
    assertType<number | undefined>(result);
    expect(result).toBe(3);
  });

  it("findLast returns element or undefined", () => {
    const result = findLast([1, 2, 3], (n) => n > 1);
    assertType<number | undefined>(result);
    expect(result).toBe(3);
  });

  it("every returns boolean", () => {
    const result = every([2, 4, 6], (n) => n % 2 === 0);
    assertType<boolean>(result);
    expect(result).toBe(true);
  });
});

describe("type inference — date", () => {
  it("isValidDate is type guard", () => {
    const d: Date = new Date();
    if (isValidDate(d)) {
      assertType<Date>(d);
    }
    expect(isValidDate(d)).toBe(true);
  });

  it("addDays returns Date", () => {
    const result = addDays(new Date(), 1);
    assertType<Date>(result);
    expect(result).toBeInstanceOf(Date);
  });

  it("differenceInDays returns number", () => {
    const result = differenceInDays(new Date(2024, 0, 1), new Date(2024, 0, 3));
    assertType<number>(result);
    expect(result).toBe(2);
  });

  it("isSameDay returns boolean", () => {
    const d = new Date();
    const result = isSameDay(d, d);
    assertType<boolean>(result);
    expect(result).toBe(true);
  });
});

describe("type inference — validation", () => {
  it("isString is type guard", () => {
    const value: unknown = "hello";
    if (isString(value)) {
      assertType<string>(value);
      expect(value).toBe("hello");
    }
  });

  it("isNumber is type guard", () => {
    const value: unknown = 42;
    if (isNumber(value)) {
      assertType<number>(value);
      expect(value).toBe(42);
    }
  });

  it("isArray is type guard", () => {
    const value: unknown = [1, 2];
    if (isArray(value)) {
      assertType<unknown[]>(value);
      expect(value).toEqual([1, 2]);
    }
  });

  it("isNil is type guard", () => {
    const value: unknown = null;
    if (isNil(value)) {
      assertType<null | undefined>(value);
    }
  });
});

describe("type inference — async", () => {
  it("sleep returns Promise<void>", async () => {
    const promise = sleep(10);
    assertType<Promise<void>>(promise);
    await promise;
  });

  it("retry returns Promise<T>", async () => {
    const promise = retry(async () => { await Promise.resolve(); return "ok"; }, { retries: 1, delay: 0 });
    assertType<Promise<string>>(promise);
    expect(await promise).toBe("ok");
  });

  it("withTimeout returns Promise<T>", async () => {
    const promise = withTimeout(async () => { await Promise.resolve(); return "done"; }, 1000);
    assertType<Promise<string>>(promise);
    expect(await promise).toBe("done");
  });
});

describe("type inference — security", () => {
  it("secureCompare returns boolean", () => {
    const result = secureCompare("a", "a");
    assertType<boolean>(result);
    expect(result).toBe(true);
  });

  it("secureRandomInt returns number", () => {
    const result = secureRandomInt(1, 6);
    assertType<number>(result);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(6);
  });
});
