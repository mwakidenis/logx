import { describe, expect, it } from "vitest";
import { isString, isNumber, isBoolean, isArray, isObject, isPlainObject, isFunction, isDate, isEmail, isURL, isEmpty, isNil, isNull, isUndefined } from "../src/validation";

describe("validation.type guards", () => {
  it("isString", () => {
    expect(isString("x")).toBe(true);
    expect(isString(5)).toBe(false);
  });
  it("isNumber", () => {
    expect(isNumber(5)).toBe(true);
    expect(isNumber(NaN)).toBe(true);
    expect(isNumber("5")).toBe(false);
  });
  it("isBoolean", () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(1)).toBe(false);
  });
  it("isArray", () => {
    expect(isArray([1])).toBe(true);
    expect(isArray({})).toBe(false);
  });
  it("isObject", () => {
    expect(isObject({})).toBe(true);
    expect(isObject(null)).toBe(false);
  });
  it("isPlainObject", () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject(new Date())).toBe(false);
    expect(isPlainObject(Object.create(null))).toBe(true);
  });
  it("isFunction", () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction({})).toBe(false);
  });
  it("isDate", () => {
    expect(isDate(new Date())).toBe(true);
    expect(isDate("2024")).toBe(false);
  });
});

describe("validation.pattern", () => {
  it("isEmail", () => {
    expect(isEmail("a@b.com")).toBe(true);
    expect(isEmail("not-email")).toBe(false);
  });
  it("isURL", () => {
    expect(isURL("https://example.com")).toBe(true);
    expect(isURL("not-url")).toBe(false);
  });
});

describe("validation.nil/empty", () => {
  it("isNil/isNull/isUndefined", () => {
    expect(isNil(null)).toBe(true);
    expect(isNil(undefined)).toBe(true);
    expect(isNil(0)).toBe(false);
    expect(isNull(null)).toBe(true);
    expect(isNull(undefined)).toBe(false);
    expect(isUndefined(undefined)).toBe(true);
    expect(isUndefined(null)).toBe(false);
  });
  it("isEmpty", () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty("")).toBe(true);
    expect(isEmpty({})).toBe(true);
    expect(isEmpty(new Map())).toBe(true);
    expect(isEmpty(new Set())).toBe(true);
    expect(isEmpty([1])).toBe(false);
    expect(isEmpty({ a: 1 })).toBe(false);
    expect(isEmpty(new Map([["a", 1]]))).toBe(false);
  });
});
