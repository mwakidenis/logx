export function sum(values: readonly number[]): number {
  return values.reduce((total, value) => total + value, 0);
}

export function mean(values: readonly number[]): number {
  if (values.length === 0) {
    throw new RangeError("mean: array must not be empty");
  }
  return sum(values) / values.length;
}

export function median(values: readonly number[]): number {
  if (values.length === 0) {
    throw new RangeError("median: array must not be empty");
  }
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }
  return sorted[middle];
}

export function min(values: readonly number[]): number {
  if (values.length === 0) {
    throw new RangeError("min: array must not be empty");
  }
  return Math.min(...values);
}

export function max(values: readonly number[]): number {
  if (values.length === 0) {
    throw new RangeError("max: array must not be empty");
  }
  return Math.max(...values);
}

export function mode(values: readonly number[]): number[] {
  if (values.length === 0) return [];
  const counts = new Map<number, number>();
  let maxCount = 0;
  for (const value of values) {
    const count = (counts.get(value) ?? 0) + 1;
    counts.set(value, count);
    if (count > maxCount) maxCount = count;
  }
  const result: number[] = [];
  for (const [value, count] of counts) {
    if (count === maxCount) result.push(value);
  }
  return result.sort((a, b) => a - b);
}

export function variance(values: readonly number[], sample = false): number {
  if (values.length === 0) {
    throw new RangeError("variance: array must not be empty");
  }
  const avg = mean(values);
  const squaredDifferences = values.map((value) => (value - avg) ** 2);
  const divisor = sample ? values.length - 1 : values.length;
  if (divisor <= 0) {
    throw new RangeError("variance: not enough values for sample variance");
  }
  return sum(squaredDifferences) / divisor;
}

export function standardDeviation(values: readonly number[], sample = false): number {
  return Math.sqrt(variance(values, sample));
}

export function factorial(value: number): number {
  if (!Number.isInteger(value) || value < 0) {
    throw new RangeError("factorial: value must be a non-negative integer");
  }
  let result = 1;
  for (let i = 2; i <= value; i += 1) {
    result *= i;
  }
  return result;
}

export function gcd(a: number, b: number): number {
  if (!Number.isInteger(a) || !Number.isInteger(b)) {
    throw new TypeError("gcd: arguments must be integers");
  }
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const temporary = y;
    y = x % y;
    x = temporary;
  }
  return x;
}

export function lcm(a: number, b: number): number {
  if (!Number.isInteger(a) || !Number.isInteger(b)) {
    throw new TypeError("lcm: arguments must be integers");
  }
  if (a === 0 || b === 0) return 0;
  return Math.abs((a * b) / gcd(a, b));
}

export function fibonacci(count: number): number[] {
  if (!Number.isInteger(count) || count < 0) {
    throw new RangeError("fibonacci: count must be a non-negative integer");
  }
  const result: number[] = [];
  let a = 0;
  let b = 1;
  for (let i = 0; i < count; i += 1) {
    result.push(a);
    [a, b] = [b, a + b];
  }
  return result;
}

export function percentageChange(initial: number, final: number): number {
  if (!Number.isFinite(initial) || !Number.isFinite(final)) {
    throw new RangeError("percentageChange: values must be finite numbers");
  }
  if (initial === 0) {
    throw new RangeError("percentageChange: initial value must not be zero");
  }
  return ((final - initial) / initial) * 100;
}
