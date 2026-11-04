import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { sleep, retry, timeout, withTimeout } from "../src/async";

describe("async.sleep", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("resolves after ms", async () => {
    const promise = sleep(50);
    vi.advanceTimersByTime(50);
    await expect(promise).resolves.toBeUndefined();
  });
  it("throws on negative", () => {
    expect(() => sleep(-1)).toThrow(RangeError);
  });
});

describe("async.retry", () => {
  beforeEach(() => {
    vi.useRealTimers();
  });

  it("retries until success", async () => {
    let calls = 0;
    const fn = async () => {
      calls += 1;
      await Promise.resolve();
      if (calls < 3) throw new Error("fail");
      return "ok";
    };
    expect(await retry(fn, { retries: 3, delay: 0 })).toBe("ok");
    expect(calls).toBe(3);
  });
  it("throws after exhausting retries", async () => {
    const fn = async () => {
      await Promise.resolve();
      throw new Error("always fail");
    };
    await expect(retry(fn, { retries: 2, delay: 0 })).rejects.toThrow("always fail");
  });
});

describe("async.timeout/withTimeout", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("rejects when promise exceeds timeout", async () => {
    const p = new Promise<string>(() => { });
    const promise = timeout(p, { timeout: 50 });
    vi.advanceTimersByTime(50);
    await expect(promise).rejects.toThrow("Operation timed out");
  });
  it("resolves when within timeout", async () => {
    const p = new Promise<string>((r) => setTimeout(() => r("done"), 0));
    const promise = timeout(p, { timeout: 100 });
    vi.advanceTimersByTime(10);
    await expect(promise).resolves.toBe("done");
  });
  it("withTimeout rejects on delay", async () => {
    const fn = () => sleep(1000);
    const promise = withTimeout(fn, 50);
    vi.advanceTimersByTime(50);
    await expect(promise).rejects.toThrow("Operation timed out");
  });

  it("withTimeout resolves when within timeout", async () => {
    const promise = withTimeout(() => "ok", 50);
    vi.advanceTimersByTime(10);
    await expect(promise).resolves.toBe("ok");
  });

  it("timeout accepts custom error", async () => {
    const p = new Promise<string>(() => { });
    const custom = new Error("custom timeout");
    const promise = timeout(p, { timeout: 50, error: custom });
    vi.advanceTimersByTime(50);
    await expect(promise).rejects.toBe(custom);
  });
});
