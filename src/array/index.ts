export function chunk<T>(array: readonly T[], size: number): T[][] {
  if (!Number.isInteger(size) || size < 1) {
    throw new RangeError("chunk: size must be a positive integer");
  }
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export function compact<T>(array: readonly T[]): Array<NonNullable<T>> {
  return array.filter((item) => item !== null && item !== undefined);
}

export function unique<T>(array: readonly T[]): T[] {
  return Array.from(new Set(array));
}

export function flatten(array: readonly unknown[], depth = 1): unknown[] {
  if (depth !== Infinity && (!Number.isInteger(depth) || depth < 0)) {
    throw new RangeError("flatten: depth must be a non-negative integer");
  }
  const result: unknown[] = [];
  const walk = (item: unknown, currentDepth: number): void => {
    if (Array.isArray(item) && currentDepth < depth) {
      for (const child of item) {
        walk(child, currentDepth + 1);
      }
    } else {
      result.push(item);
    }
  };
  for (const item of array) {
    walk(item, 0);
  }
  return result;
}

export function flattenDeep(array: readonly unknown[]): unknown[] {
  return flatten(array, Infinity);
}

export function difference<T>(array: readonly T[], ...values: readonly T[][]): T[] {
  const excluded = new Set<T>();
  for (const valueList of values) {
    for (const item of valueList) {
      excluded.add(item);
    }
  }
  return array.filter((item) => !excluded.has(item));
}

export function intersection<T>(...arrays: readonly T[][]): T[] {
  if (arrays.length === 0) {
    return [];
  }
  const first = arrays[0];
  const sets = arrays.slice(1).map((array) => new Set(array));
  const result: T[] = [];
  const seen = new Set<T>();
  for (const item of first) {
    if (seen.has(item)) continue;
    if (sets.every((set) => set.has(item))) {
      seen.add(item);
      result.push(item);
    }
  }
  return result;
}

export function union<T>(...arrays: readonly T[][]): T[] {
  return Array.from(new Set(arrays.flat()));
}

export function shuffle<T>(array: readonly T[]): T[] {
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temporary = result[i];
    result[i] = result[j];
    result[j] = temporary;
  }
  return result;
}

export function sample<T>(array: readonly T[]): T | undefined {
  if (array.length === 0) {
    return undefined;
  }
  return array[Math.floor(Math.random() * array.length)];
}

export function first<T>(array: readonly T[]): T | undefined;
export function first<T>(array: readonly T[], count: number): T[];
export function first<T>(array: readonly T[], count?: number): T | T[] | undefined {
  if (count === undefined) {
    return array.length === 0 ? undefined : array[0];
  }
  if (!Number.isInteger(count) || count < 0) {
    throw new RangeError("first: count must be a non-negative integer");
  }
  return array.slice(0, count);
}

export function last<T>(array: readonly T[]): T | undefined;
export function last<T>(array: readonly T[], count: number): T[];
export function last<T>(array: readonly T[], count?: number): T | T[] | undefined {
  if (count === undefined) {
    return array.length === 0 ? undefined : array[array.length - 1];
  }
  if (!Number.isInteger(count) || count < 0) {
    throw new RangeError("last: count must be a non-negative integer");
  }
  return array.slice(Math.max(array.length - count, 0));
}

export function take<T>(array: readonly T[], count: number): T[] {
  if (!Number.isInteger(count) || count < 0) {
    throw new RangeError("take: count must be a non-negative integer");
  }
  return array.slice(0, count);
}

export function drop<T>(array: readonly T[], count: number): T[] {
  if (!Number.isInteger(count) || count < 0) {
    throw new RangeError("drop: count must be a non-negative integer");
  }
  return array.slice(count);
}

export function partition<T>(
  array: readonly T[],
  predicate: (value: T, index: number) => unknown
): [T[], T[]] {
  const truthy: T[] = [];
  const falsy: T[] = [];
  for (let i = 0; i < array.length; i += 1) {
    const value = array[i];
    if (predicate(value, i)) {
      truthy.push(value);
    } else {
      falsy.push(value);
    }
  }
  return [truthy, falsy];
}

export function groupConsecutive<T>(array: readonly T[]): T[][] {
  const groups: T[][] = [];
  for (const item of array) {
    const lastGroup = groups[groups.length - 1];
    if (lastGroup && Object.is(lastGroup[lastGroup.length - 1], item)) {
      lastGroup.push(item);
    } else {
      groups.push([item]);
    }
  }
  return groups;
}
