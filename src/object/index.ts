import { isPlainObject } from "../internal/predicates";
import { getPath, normalizePath } from "../internal/path";
import { AlikeObject, Path } from "../types";
import { deepClone } from "../internal/clone";

const PROTECTED_KEYS = new Set(["__proto__", "prototype", "constructor"]);

function isSafeKey(key: string): boolean {
  return !PROTECTED_KEYS.has(key);
}

export function clone<T>(value: T): T {
  if (value === null || typeof value !== "object") {
    return value;
  }
  if (Array.isArray(value)) {
    return value.slice() as unknown as T;
  }
  return { ...value };
}

export { deepClone };

export function get(object: unknown, path: Path, defaultValue?: unknown): unknown {
  const { found, value } = getPath(object, path);
  return found ? value : defaultValue;
}

export function has(object: unknown, path: Path): boolean {
  return getPath(object, path).found;
}

export function set(object: AlikeObject, path: Path, value: unknown): AlikeObject {
  const segments = normalizePath(path);
  if (segments.length === 0) {
    return object;
  }

  let current: AlikeObject = object;
  for (let i = 0; i < segments.length - 1; i += 1) {
    const segment = segments[i];
    const next = current[segment];
    if (next === null || typeof next !== "object") {
      const created = typeof segment === "number" ? [] : {};
      current[segment] = created;
      current = created;
    } else {
      current = next as AlikeObject;
    }
  }

  current[segments[segments.length - 1]] = value;
  return object;
}

export function pick<T extends object, K extends keyof T>(
  object: T,
  keys: readonly K[]
): Partial<T> {
  const result: Partial<T> = {};
  for (const key of keys) {
    if (key in object && isSafeKey(String(key))) {
      result[key] = object[key];
    }
  }
  return result;
}

export function omit<T extends object>(object: T, keys: readonly (keyof T)[]): Partial<T> {
  const omitSet = new Set(keys);
  const result: Partial<T> = {};
  for (const key of Object.keys(object) as Array<keyof T>) {
    if (!omitSet.has(key)) {
      result[key] = object[key];
    }
  }
  return result;
}

export function merge(
  target: object,
  ...sources: Array<object | null | undefined>
): object {
  for (const source of sources) {
    if (source === null || typeof source !== "object") continue;
    if (!isPlainObject(source)) continue;
    for (const [key, value] of Object.entries(source)) {
      if (!isSafeKey(key)) continue;
      const targetValue = (target as Record<string, unknown>)[key];
      if (isPlainObject(value) && isPlainObject(targetValue)) {
        (target as Record<string, unknown>)[key] = merge(targetValue, value);
      } else {
        (target as Record<string, unknown>)[key] = value;
      }
    }
  }
  return target;
}

export function keys(object: object): string[] {
  return Object.keys(object);
}

export function values(object: object): unknown[] {
  return Object.values(object);
}

export function entries(object: object): [string, unknown][] {
  return Object.entries(object);
}

export function invert(object: object): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(object)) {
    result[String(value)] = key;
  }
  return result;
}

export function mapValues<T, U>(
  object: Record<string, T>,
  iteratee: (value: T, key: string) => U
): Record<string, U> {
  const result: Record<string, U> = {};
  for (const [key, value] of Object.entries(object)) {
    result[key] = iteratee(value, key);
  }
  return result;
}

export function mapKeys<T>(
  object: Record<string, T>,
  iteratee: (key: string, value: T) => string
): Record<string, T> {
  const result: Record<string, T> = {};
  for (const [key, value] of Object.entries(object)) {
    result[iteratee(key, value)] = value;
  }
  return result;
}
