import { describe, expect, it } from "vitest";
import { isValidDate, addDays, addMonths, addYears, differenceInDays, differenceInHours, startOfDay, endOfDay, isBefore, isAfter, isSameDay } from "../src/date";

describe("date.isValidDate", () => {
  it("validates dates", () => {
    expect(isValidDate(new Date())).toBe(true);
    expect(isValidDate(new Date("invalid"))).toBe(false);
    expect(isValidDate(null)).toBe(false);
  });
});

describe("date.addDays", () => {
  it("adds days", () => {
    const d = new Date(2024, 0, 15);
    expect(addDays(d, 5).getDate()).toBe(20);
  });
  it("throws on invalid", () => {
    expect(() => addDays(new Date("invalid"), 1)).toThrow(TypeError);
  });
});

describe("date.addMonths", () => {
  it("adds months and clamps end-of-month", () => {
    const d = new Date(2024, 0, 31);
    expect(addMonths(d, 1).getDate()).toBe(29); // Feb 2024
  });
  it("throws on invalid", () => {
    expect(() => addMonths(new Date("invalid"), 1)).toThrow(TypeError);
  });
});

describe("date.addYears", () => {
  it("adds years", () => {
    const d = new Date(2020, 1, 29);
    expect(addYears(d, 1).getFullYear()).toBe(2021);
  });
});

describe("date.difference", () => {
  it("computes day/hour difference", () => {
    const start = new Date(2024, 0, 1);
    const end = new Date(2024, 0, 3);
    expect(differenceInDays(start, end)).toBe(2);
    expect(differenceInHours(start, end)).toBe(48);
  });
});

describe("date.startOfDay/endOfDay", () => {
  it("normalizes day bounds", () => {
    const d = new Date(2024, 0, 15, 10, 30, 45, 999);
    const start = startOfDay(d);
    expect(start.getHours()).toBe(0);
    expect(start.getMinutes()).toBe(0);
    const end = endOfDay(d);
    expect(end.getHours()).toBe(23);
    expect(end.getMilliseconds()).toBe(999);
  });
});

describe("date.compare", () => {
  const a = new Date(2024, 0, 1);
  const b = new Date(2024, 0, 2);
  it("compares dates", () => {
    expect(isBefore(a, b)).toBe(true);
    expect(isAfter(b, a)).toBe(true);
    expect(isSameDay(a, a)).toBe(true);
    expect(isSameDay(a, b)).toBe(false);
  });
  it("throws on invalid", () => {
    expect(() => isBefore(new Date("invalid"), b)).toThrow(TypeError);
  });
});
