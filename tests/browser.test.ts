import { describe, expect, it } from "vitest";
import { isBrowser, isNode, hasLocalStorage, hasSessionStorage, safeStorage, getCookie, setCookie, removeCookie, localStorageHelpers, sessionStorageHelpers } from "../src/browser";

describe("browser.environment", () => {
  it("exposes environment flags", () => {
    expect(typeof isBrowser).toBe("boolean");
    expect(typeof isNode).toBe("boolean");
    expect(typeof hasLocalStorage).toBe("boolean");
    expect(typeof hasSessionStorage).toBe("boolean");
  });
  it("isNode is true in this environment", () => {
    expect(isNode).toBe(true);
  });
});

describe("browser.safeStorage", () => {
  it("wraps a storage API", () => {
    const store: Record<string, string> = {};
    const storage: Storage = {
      getItem: (k) => store[k] ?? null,
      setItem: (k, v) => { store[k] = v; },
      removeItem: (k) => { delete store[k]; },
      clear: () => { Object.keys(store).forEach((k) => delete store[k]); },
      length: 0,
      key: () => null,
    };
    const s = safeStorage(storage);
    s.set("a", "1");
    expect(s.get("a")).toBe("1");
    s.remove("a");
    expect(s.get("a")).toBeNull();
    s.set("b", "2");
    s.clear();
    expect(s.get("b")).toBeNull();
  });
  it("handles storage exceptions gracefully", () => {
    const storage: Storage = new Proxy({} as Storage, {
      get: () => { throw new Error("quota"); },
    });
    const s = safeStorage(storage);
    expect(s.get("a")).toBeNull();
    expect(() => s.set("a", "b")).not.toThrow();
    expect(() => s.remove("a")).not.toThrow();
    expect(() => s.clear()).not.toThrow();
  });
});

describe("browser.cookies", () => {
  it("getCookie returns null when no document", () => {
    expect(getCookie("x")).toBeNull();
  });
  it("setCookie/removeCookie no-op without document", () => {
    expect(() => setCookie("x", "y")).not.toThrow();
    expect(() => removeCookie("x")).not.toThrow();
  });
});

describe("browser.storageHelpers", () => {
  it("returns null when storage unavailable", () => {
    expect(localStorageHelpers()).toBeNull();
    expect(sessionStorageHelpers()).toBeNull();
  });
});
