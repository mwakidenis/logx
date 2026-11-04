import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { debounce, throttle, once, memoize, curry, compose, pipe, negate, noop, identity } from "../src/function";

describe("function.debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("delays invocation", () => {
    const fn = vi.fn();
    const d = debounce(fn, 100);
    d("a");
    d("b");
    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenLastCalledWith("b");
  });
  it("cancel prevents invocation", () => {
    const fn = vi.fn();
    const d = debounce(fn, 100);
    d("a");
    d.cancel();
    vi.advanceTimersByTime(100);
    expect(fn).not.toHaveBeenCalled();
  });
  it("flush invokes immediately", () => {
    const fn = vi.fn();
    const d = debounce(fn, 100);
    d("a");
    d.flush();
    expect(fn).toHaveBeenCalledTimes(1);
  });
  it("pending reports state", () => {
    const d = debounce(() => {}, 100);
    expect(d.pending()).toBe(false);
    d();
    expect(d.pending()).toBe(true);
    vi.advanceTimersByTime(100);
    expect(d.pending()).toBe(false);
  });
});

describe("function.throttle", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("invokes immediately then throttles", () => {
    const fn = vi.fn();
    const t = throttle(fn, 100);
    t();
    t();
    expect(fn).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(2);
  });
  it("invokes trailing call after wait", () => {
    const fn = vi.fn();
    const t = throttle(fn, 100);
    t();
    vi.advanceTimersByTime(50);
    t();
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(2);
  });
  it("cancel prevents trailing", () => {
    const fn = vi.fn();
    const t = throttle(fn, 100);
    t("a");
    t.cancel();
    vi.advanceTimersByTime(200);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe("function.once", () => {
  it("invokes only once", () => {
    const fn = vi.fn(() => 42);
    const o = once(fn);
    expect(o()).toBe(42);
    expect(o()).toBe(42);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe("function.memoize", () => {
  it("caches by argument", () => {
    const fn = vi.fn((n: number) => n * 2);
    const m = memoize(fn);
    expect(m(3)).toBe(6);
    expect(m(3)).toBe(6);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe("function.curry", () => {
  it("curries function", () => {
    const add = (a: number, b: number, c: number) => a + b + c;
    const curried = curry(add);
    expect(curried(1)(2)(3)).toBe(6);
    expect(curried(1, 2)(3)).toBe(6);
  });
});

describe("function.compose/pipe", () => {
  it("composes right to left", () => {
    const add1 = (n: number) => n + 1;
    const double = (n: number) => n * 2;
    expect(compose(double, add1)(3)).toBe(8);
  });
  it("pipes left to right", () => {
    const add1 = (n: number) => n + 1;
    const double = (n: number) => n * 2;
    expect(pipe(add1, double)(3)).toBe(8);
  });
  it("compose/pipe with no functions return identity", () => {
    expect(compose()(5)).toBe(5);
    expect(pipe()(5)).toBe(5);
  });
});

describe("function.negate/noop/identity", () => {
  it("negates predicate", () => {
    const isEven = (n: number) => n % 2 === 0;
    const isOdd = negate(isEven);
    expect(isOdd(3)).toBe(true);
  });
  it("noop does nothing", () => {
    expect(noop()).toBeUndefined();
  });
  it("identity returns value", () => {
    expect(identity(42)).toBe(42);
  });
});
