export function sleep(ms: number): Promise<void> {
  if (!Number.isFinite(ms) || ms < 0) {
    throw new RangeError("sleep: ms must be a non-negative number");
  }
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface RetryOptions {
  retries?: number;
  delay?: number;
  backoff?: boolean;
  onRetry?: (attempt: number, error: unknown) => void;
}

export async function retry<T>(
  fn: () => Promise<T> | T,
  options: RetryOptions = {}
): Promise<T> {
  const retries = options.retries ?? 3;
  const delay = options.delay ?? 100;
  const backoff = options.backoff ?? false;

  if (!Number.isInteger(retries) || retries < 0) {
    throw new RangeError("retry: retries must be a non-negative integer");
  }
  if (!Number.isFinite(delay) || delay < 0) {
    throw new RangeError("retry: delay must be a non-negative number");
  }

  let lastError: unknown;
  let currentDelay = delay;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt === retries) break;
      if (options.onRetry) options.onRetry(attempt + 1, error);
      await sleep(currentDelay);
      if (backoff) currentDelay *= 2;
    }
  }
  throw lastError;
}

export interface TimeoutOptions {
  timeout: number;
  error?: Error;
}

export async function timeout<T>(promise: Promise<T>, options: TimeoutOptions): Promise<T> {
  if (!Number.isFinite(options.timeout) || options.timeout < 0) {
    throw new RangeError("timeout: timeout must be a non-negative number");
  }
  const timeoutError = options.error ?? new Error("Operation timed out");
  let timer: ReturnType<typeof setTimeout> | null = null;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(timeoutError), options.timeout);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

export async function withTimeout<T>(fn: () => Promise<T> | T, timeoutMs: number): Promise<T> {
  return timeout(Promise.resolve().then(fn), { timeout: timeoutMs });
}
