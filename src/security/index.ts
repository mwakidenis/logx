import { isNil } from "../internal/predicates";
import { escapeHtml } from "../string";

export function secureCompare(a: unknown, b: unknown): boolean {
  const aString = isNil(a) ? "" : toSafeString(a);
  const bString = isNil(b) ? "" : toSafeString(b);
  if (aString.length !== bString.length) return false;
  let difference = 0;
  for (let i = 0; i < aString.length; i += 1) {
    difference |= aString.charCodeAt(i) ^ bString.charCodeAt(i);
  }
  return difference === 0;
}

function toSafeString(value: unknown): string {
  if (typeof value === "string") return value;
  return Object.prototype.toString.call(value);
}

export { escapeHtml };

export function secureRandom(length: number): Uint8Array {
  if (!Number.isInteger(length) || length < 1 || length > 1024) {
    throw new RangeError("secureRandom: length must be an integer between 1 and 1024");
  }
  const buffer = new Uint8Array(length);
  crypto.getRandomValues(buffer);
  return buffer;
}

export function secureRandomInt(min: number, max: number): number {
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new TypeError("secureRandomInt: min and max must be integers");
  }
  if (min > max) {
    throw new RangeError("secureRandomInt: min must not be greater than max");
  }
  const range = max - min + 1;
  const bytesNeeded = Math.ceil(Math.log2(range) / 8);
  const buffer = new Uint8Array(bytesNeeded);
  crypto.getRandomValues(buffer);
  let value = 0;
  for (let i = 0; i < bytesNeeded; i += 1) {
    value = value * 256 + buffer[i];
  }
  return min + (value % range);
}
