export interface Cancelable {
  cancel: () => void;
  flush: () => void;
  pending: () => boolean;
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): T & Cancelable {
  if (!Number.isFinite(wait) || wait < 0) {
    throw new RangeError("debounce: wait must be a non-negative number");
  }
  let timer: ReturnType<typeof setTimeout> | null = null;
  let pending: { fn: (...args: unknown[]) => unknown; args: unknown[] } | null = null;

  const invoke = (): void => {
    timer = null;
    if (pending) {
      pending.fn(...pending.args);
      pending = null;
    }
  };

  const debounced = function (this: unknown, ...args: unknown[]): void {
    pending = { fn: func.bind(this), args };
    if (timer) clearTimeout(timer);
    timer = setTimeout(invoke, wait);
  } as unknown as T & Cancelable;

  debounced.cancel = (): void => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    pending = null;
  };

  debounced.flush = (): void => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    if (pending) {
      pending.fn(...pending.args);
      pending = null;
    }
  };

  debounced.pending = (): boolean => timer !== null;

  return debounced;
}

export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): T & Cancelable {
  if (!Number.isFinite(wait) || wait < 0) {
    throw new RangeError("throttle: wait must be a non-negative number");
  }
  let lastCall = 0;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let pending: { fn: (...args: unknown[]) => unknown; args: unknown[] } | null = null;

  const invoke = (): void => {
    lastCall = Date.now();
    timer = null;
    if (pending) {
      pending.fn(...pending.args);
      pending = null;
    }
  };

  const throttled = function (this: unknown, ...args: unknown[]): void {
    const now = Date.now();
    const remaining = wait - (now - lastCall);
    pending = { fn: func.bind(this), args };
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      lastCall = now;
      if (pending) {
        pending.fn(...pending.args);
        pending = null;
      }
    } else if (!timer) {
      timer = setTimeout(invoke, remaining);
    }
  } as unknown as T & Cancelable;

  throttled.cancel = (): void => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    pending = null;
  };

  throttled.flush = invoke;
  throttled.pending = (): boolean => timer !== null;

  return throttled;
}

export function once<T extends (...args: unknown[]) => unknown>(func: T): T {
  let called = false;
  let result: unknown;
  const onceFunc = function (this: unknown, ...args: unknown[]): unknown {
    if (!called) {
      called = true;
      result = func.apply(this, args);
    }
    return result;
  } as T;
  return onceFunc;
}

export function memoize<T extends (...args: unknown[]) => unknown>(
  func: T,
  resolver?: (...args: unknown[]) => unknown
): T {
  const cache = new Map<unknown, unknown>();
  const memoized = function (this: unknown, ...args: unknown[]): unknown {
    const key = resolver ? resolver.apply(this, args) : args[0];
    if (cache.has(key)) return cache.get(key);
    const result = func.apply(this, args);
    cache.set(key, result);
    return result;
  } as T;
  return memoized;
}

export function curry(func: (...args: unknown[]) => unknown): (...args: unknown[]) => unknown {
  return function curried(this: unknown, ...args: unknown[]): unknown {
    if (args.length >= func.length) {
      return func.apply(this, args);
    }
    return (...moreArgs: unknown[]) => curried.apply(this, [...args, ...moreArgs]);
  };
}

export function compose(
  ...funcs: Array<(...args: unknown[]) => unknown>
): (...args: unknown[]) => unknown {
  if (funcs.length === 0) {
    return identity;
  }
  return function composed(this: unknown, ...args: unknown[]): unknown {
    let result: unknown = funcs[funcs.length - 1].apply(this, args);
    for (let i = funcs.length - 2; i >= 0; i -= 1) {
      result = funcs[i].call(this, result);
    }
    return result;
  };
}

export function pipe(
  ...funcs: Array<(...args: unknown[]) => unknown>
): (...args: unknown[]) => unknown {
  if (funcs.length === 0) {
    return identity;
  }
  return function piped(this: unknown, ...args: unknown[]): unknown {
    let result: unknown = funcs[0].apply(this, args);
    for (let i = 1; i < funcs.length; i += 1) {
      result = funcs[i].call(this, result);
    }
    return result;
  };
}

export function negate<T extends (...args: unknown[]) => unknown>(predicate: T): T {
  const negated = function (this: unknown, ...args: unknown[]): unknown {
    return !predicate.apply(this, args);
  } as T;
  return negated;
}

export function noop(): void {
  // intentionally does nothing
}

export function identity<T>(value: T): T {
  return value;
}
