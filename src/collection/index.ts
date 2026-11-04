import { isNil } from "../internal/predicates";

export function groupBy<T>(
  collection: readonly T[],
  iteratee: (value: T, index: number) => string | number
): Record<string, T[]> {
  const result: Record<string, T[]> = {};
  for (let i = 0; i < collection.length; i += 1) {
    const value = collection[i];
    const key = String(iteratee(value, i));
    if (isNil(result[key])) result[key] = [];
    result[key].push(value);
  }
  return result;
}

export function keyBy<T>(
  collection: readonly T[],
  iteratee: (value: T, index: number) => string | number
): Record<string, T> {
  const result: Record<string, T> = {};
  for (let i = 0; i < collection.length; i += 1) {
    const key = String(iteratee(collection[i], i));
    result[key] = collection[i];
  }
  return result;
}

export function countBy<T>(
  collection: readonly T[],
  iteratee: (value: T, index: number) => string | number
): Record<string, number> {
  const result: Record<string, number> = {};
  for (let i = 0; i < collection.length; i += 1) {
    const key = String(iteratee(collection[i], i));
    result[key] = (result[key] ?? 0) + 1;
  }
  return result;
}

export function partition<T>(
  collection: readonly T[],
  predicate: (value: T, index: number) => unknown
): [T[], T[]] {
  const truthy: T[] = [];
  const falsy: T[] = [];
  for (let i = 0; i < collection.length; i += 1) {
    if (predicate(collection[i], i)) truthy.push(collection[i]);
    else falsy.push(collection[i]);
  }
  return [truthy, falsy];
}

function compareValues(a: unknown, b: unknown): number {
  const aValue = a as number | string;
  const bValue = b as number | string;
  if (aValue < bValue) return -1;
  if (aValue > bValue) return 1;
  return 0;
}

export function sortBy<T>(
  collection: readonly T[],
  iteratee: (value: T) => unknown
): T[] {
  return [...collection].sort((a, b) => compareValues(iteratee(a), iteratee(b)));
}

export function orderBy<T>(
  collection: readonly T[],
  iteratees: Array<(value: T) => unknown>,
  directions: Array<"asc" | "desc"> = []
): T[] {
  return [...collection].sort((a, b) => {
    for (let i = 0; i < iteratees.length; i += 1) {
      const valueA = iteratees[i](a);
      const valueB = iteratees[i](b);
      if (valueA === valueB) continue;
      const direction = directions[i] === "desc" ? -1 : 1;
      return compareValues(valueA, valueB) * direction;
    }
    return 0;
  });
}

export function count<T>(collection: readonly T[], predicate?: (value: T) => unknown): number {
  if (predicate === undefined) return collection.length;
  let total = 0;
  for (const value of collection) {
    if (predicate(value)) total += 1;
  }
  return total;
}

export function find<T>(
  collection: readonly T[],
  predicate: (value: T, index: number) => unknown
): T | undefined {
  for (let i = 0; i < collection.length; i += 1) {
    if (predicate(collection[i], i)) return collection[i];
  }
  return undefined;
}

export function findLast<T>(
  collection: readonly T[],
  predicate: (value: T, index: number) => unknown
): T | undefined {
  for (let i = collection.length - 1; i >= 0; i -= 1) {
    if (predicate(collection[i], i)) return collection[i];
  }
  return undefined;
}

export function every<T>(collection: readonly T[], predicate?: (value: T) => unknown): boolean {
  if (predicate === undefined) {
    return collection.every(Boolean);
  }
  for (const value of collection) {
    if (!predicate(value)) return false;
  }
  return true;
}

export function some<T>(collection: readonly T[], predicate?: (value: T) => unknown): boolean {
  if (predicate === undefined) {
    return collection.some(Boolean);
  }
  for (const value of collection) {
    if (predicate(value)) return true;
  }
  return false;
}
