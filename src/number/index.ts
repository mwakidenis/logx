export function clamp(value: number, min: number, max: number): number {
  if (min > max) {
    throw new RangeError("clamp: min must not be greater than max");
  }
  return Math.min(Math.max(value, min), max);
}

export function inRange(value: number, start: number, end?: number): boolean {
  const min = end === undefined ? Math.min(0, start) : Math.min(start, end);
  const max = end === undefined ? Math.max(0, start) : Math.max(start, end);
  return value >= min && value < max;
}

export function random(min: number, max: number, floating = false): number {
  if (min > max) {
    throw new RangeError("random: min must not be greater than max");
  }
  const value = Math.random() * (max - min) + min;
  return floating ? value : Math.floor(value);
}

export function randomInt(min: number, max: number): number {
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new TypeError("randomInt: min and max must be integers");
  }
  if (min > max) {
    throw new RangeError("randomInt: min must not be greater than max");
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function round(value: number, decimals = 0): number {
  if (!Number.isInteger(decimals) || decimals < 0) {
    throw new RangeError("round: decimals must be a non-negative integer");
  }
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

export function floor(value: number, decimals = 0): number {
  if (!Number.isInteger(decimals) || decimals < 0) {
    throw new RangeError("floor: decimals must be a non-negative integer");
  }
  const factor = 10 ** decimals;
  return Math.floor(value * factor) / factor;
}

export function ceil(value: number, decimals = 0): number {
  if (!Number.isInteger(decimals) || decimals < 0) {
    throw new RangeError("ceil: decimals must be a non-negative integer");
  }
  const factor = 10 ** decimals;
  return Math.ceil(value * factor) / factor;
}

export function precision(value: number): number {
  if (!Number.isFinite(value)) {
    throw new RangeError("precision: value must be a finite number");
  }
  const text = String(value);
  const dotIndex = text.indexOf(".");
  if (dotIndex === -1) return 0;
  return text.slice(dotIndex + 1).length;
}

export function isEven(value: number): boolean {
  return Number.isInteger(value) && value % 2 === 0;
}

export function isOdd(value: number): boolean {
  return Number.isInteger(value) && value % 2 !== 0;
}

export function isPrime(value: number): boolean {
  if (!Number.isInteger(value) || value < 2) return false;
  if (value === 2) return true;
  if (value % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(value); i += 2) {
    if (value % i === 0) return false;
  }
  return true;
}

export function percentage(value: number, total: number): number {
  if (!Number.isFinite(value) || !Number.isFinite(total)) {
    throw new RangeError("percentage: value and total must be finite numbers");
  }
  if (total === 0) {
    throw new RangeError("percentage: total must not be zero");
  }
  return (value / total) * 100;
}

export function formatNumber(value: number, options: Intl.NumberFormatOptions = {}): string {
  if (!Number.isFinite(value)) {
    throw new RangeError("formatNumber: value must be a finite number");
  }
  return new Intl.NumberFormat(undefined, options).format(value);
}
