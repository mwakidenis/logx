import { isValidDate } from "./isValidDate";

export { isValidDate };

export function addDays(date: Date, days: number): Date {
  if (!isValidDate(date)) throw new TypeError("addDays: date must be a valid Date");
  if (!Number.isInteger(days)) {
    throw new TypeError("addDays: days must be an integer");
  }
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function addMonths(date: Date, months: number): Date {
  if (!isValidDate(date)) throw new TypeError("addMonths: date must be a valid Date");
  if (!Number.isInteger(months)) {
    throw new TypeError("addMonths: months must be an integer");
  }
  const result = new Date(date);
  const day = result.getDate();
  result.setMonth(result.getMonth() + months);
  if (result.getDate() !== day) {
    result.setDate(0);
  }
  return result;
}

export function addYears(date: Date, years: number): Date {
  if (!isValidDate(date)) throw new TypeError("addYears: date must be a valid Date");
  if (!Number.isInteger(years)) {
    throw new TypeError("addYears: years must be an integer");
  }
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  if (result.getDate() < 1) {
    result.setDate(0);
  }
  return result;
}

export function startOfDay(date: Date): Date {
  if (!isValidDate(date)) throw new TypeError("startOfDay: date must be a valid Date");
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

export function endOfDay(date: Date): Date {
  if (!isValidDate(date)) throw new TypeError("endOfDay: date must be a valid Date");
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
}

export function differenceInDays(startDate: Date, endDate: Date): number {
  if (!isValidDate(startDate)) throw new TypeError("differenceInDays: startDate must be a valid Date");
  if (!isValidDate(endDate)) throw new TypeError("differenceInDays: endDate must be a valid Date");
  const start = startOfDay(startDate);
  const end = startOfDay(endDate);
  const difference = end.getTime() - start.getTime();
  return Math.round(difference / (1000 * 60 * 60 * 24));
}

export function differenceInHours(startDate: Date, endDate: Date): number {
  if (!isValidDate(startDate)) throw new TypeError("differenceInHours: startDate must be a valid Date");
  if (!isValidDate(endDate)) throw new TypeError("differenceInHours: endDate must be a valid Date");
  return Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60));
}

export function isBefore(left: Date, right: Date): boolean {
  if (!isValidDate(left)) throw new TypeError("isBefore: left must be a valid Date");
  if (!isValidDate(right)) throw new TypeError("isBefore: right must be a valid Date");
  return left.getTime() < right.getTime();
}

export function isAfter(left: Date, right: Date): boolean {
  if (!isValidDate(left)) throw new TypeError("isAfter: left must be a valid Date");
  if (!isValidDate(right)) throw new TypeError("isAfter: right must be a valid Date");
  return left.getTime() > right.getTime();
}

export function isSameDay(left: Date, right: Date): boolean {
  if (!isValidDate(left)) throw new TypeError("isSameDay: left must be a valid Date");
  if (!isValidDate(right)) throw new TypeError("isSameDay: right must be a valid Date");
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}
