import type { Path } from "../types";

const SPLIT_REGEX = /[\.[\]]+/;

export function normalizePath(path: Path): Array<string | number> {
  const raw: Array<string | number | symbol> =
    typeof path === "string"
      ? String(path).split(SPLIT_REGEX).filter(Boolean)
      : [...path];

  return raw.map((segment) => {
    if (typeof segment === "symbol") {
      return segment.toString();
    }
    if (typeof segment === "string" && segment !== "" && /^\d+$/.test(segment)) {
      return Number(segment);
    }
    return segment;
  });
}

export function resolvePath(
  object: unknown,
  path: Path
): { found: boolean; value: unknown } {
  const segments = normalizePath(path);
  if (segments.length === 0) {
    return { found: true, value: object };
  }

  let current: unknown = object;
  for (const segment of segments) {
    if (current === null || typeof current !== "object") {
      return { found: false, value: undefined };
    }
    const record = current as Record<string | number, unknown>;
    if (!(segment in record)) {
      return { found: false, value: undefined };
    }
    current = record[segment];
  }

  return { found: true, value: current };
}

export type { Path };
export const getPath = resolvePath;
