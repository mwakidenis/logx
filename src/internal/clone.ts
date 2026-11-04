import { isDate, isMap, isNil, isPlainObject, isRegExp, isSet } from "./predicates";

function deepCloneInternal(value: unknown, seen: WeakMap<object, unknown>): unknown {
  if (isNil(value) || typeof value !== "object") {
    return value;
  }

  if (seen.has(value)) {
    return seen.get(value);
  }

  if (Array.isArray(value)) {
    const copy: unknown[] = [];
    seen.set(value, copy);
    for (const item of value) {
      copy.push(deepCloneInternal(item, seen));
    }
    return copy;
  }

  if (isDate(value)) {
    return new Date(value.getTime());
  }

  if (isRegExp(value)) {
    return new RegExp(value.source, value.flags);
  }

  if (isMap(value)) {
    const copy = new Map<unknown, unknown>();
    seen.set(value, copy);
    for (const [key, item] of value) {
      copy.set(key, deepCloneInternal(item, seen));
    }
    return copy;
  }

  if (isSet(value)) {
    const copy = new Set<unknown>();
    seen.set(value, copy);
    for (const item of value) {
      copy.add(deepCloneInternal(item, seen));
    }
    return copy;
  }

  if (isPlainObject(value)) {
    const copy: Record<string, unknown> = {};
    seen.set(value, copy);
    for (const [key, item] of Object.entries(value)) {
      copy[key] = deepCloneInternal(item, seen);
    }
    return copy;
  }

  return value;
}

export function deepClone(value: unknown): unknown {
  return deepCloneInternal(value, new WeakMap());
}
