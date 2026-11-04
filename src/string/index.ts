const WORD_SPLIT = /[^a-zA-Z0-9]+/;

function words(input: string): string[] {
  return String(input)
    .split(WORD_SPLIT)
    .filter((word) => word.length > 0);
}

export function camelCase(input: string): string {
  const list = words(input);
  if (list.length === 0) return "";
  return list
    .map((word, index) => {
      const cased = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      return index === 0 ? cased.toLowerCase() : cased;
    })
    .join("");
}

export function pascalCase(input: string): string {
  const list = words(input);
  if (list.length === 0) return "";
  return list
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

export function snakeCase(input: string): string {
  const list = words(input);
  if (list.length === 0) return "";
  return list.map((word) => word.toLowerCase()).join("_");
}

export function kebabCase(input: string): string {
  const list = words(input);
  if (list.length === 0) return "";
  return list.map((word) => word.toLowerCase()).join("-");
}

export function capitalize(input: string): string {
  const text = String(input);
  if (text.length === 0) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function capitalizeWords(input: string): string {
  const list = words(input);
  if (list.length === 0) return "";
  return list
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function trim(input: string): string {
  return String(input).trim();
}

export function truncate(
  input: string,
  options: { length?: number; omission?: string } = {}
): string {
  const text = String(input);
  const length = options.length ?? 30;
  const omission = options.omission ?? "...";
  if (text.length <= length) return text;
  if (length <= omission.length) return omission;
  return text.slice(0, length - omission.length) + omission;
}

export function slugify(input: string): string {
  const text = String(input).trim().toLowerCase();
  return text
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
    .join("-")
    .replace(/^-+|-+$/g, "");
}

export function reverse(input: string): string {
  return [...String(input)].reverse().join("");
}

export function startsWith(input: string, prefix: string): boolean {
  return String(input).startsWith(String(prefix));
}

export function endsWith(input: string, suffix: string): boolean {
  return String(input).endsWith(String(suffix));
}

export function wordCount(input: string): number {
  const text = String(input).trim();
  if (text.length === 0) return 0;
  return text.split(/\s+/).filter((word) => word.length > 0).length;
}

const ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(input: string): string {
  return String(input).replace(/[&<>"']/g, (char) => ESCAPE_MAP[char]);
}
