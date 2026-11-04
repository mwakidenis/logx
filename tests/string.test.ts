import { describe, expect, it } from "vitest";
import { camelCase, pascalCase, snakeCase, kebabCase, capitalize, capitalizeWords, trim, truncate, slugify, reverse, startsWith, endsWith, wordCount, escapeHtml } from "../src/string";

describe("string.camelCase", () => {
  it("converts to camelCase", () => {
    expect(camelCase("hello world")).toBe("helloWorld");
    expect(camelCase("Hello-World")).toBe("helloWorld");
  });
  it("returns empty for empty string", () => {
    expect(camelCase("")).toBe("");
  });
});

describe("string.pascalCase", () => {
  it("converts to PascalCase", () => {
    expect(pascalCase("hello world")).toBe("HelloWorld");
    expect(pascalCase("")).toBe("");
  });
});

describe("string.snakeCase", () => {
  it("converts to snake_case", () => {
    expect(snakeCase("hello world")).toBe("hello_world");
    expect(snakeCase("")).toBe("");
  });
});

describe("string.kebabCase", () => {
  it("converts to kebab-case", () => {
    expect(kebabCase("hello world")).toBe("hello-world");
    expect(kebabCase("")).toBe("");
  });
});

describe("string.capitalize", () => {
  it("capitalizes first character", () => {
    expect(capitalize("hello")).toBe("Hello");
    expect(capitalize("")).toBe("");
  });
});

describe("string.capitalizeWords", () => {
  it("capitalizes each word", () => {
    expect(capitalizeWords("hello world")).toBe("Hello World");
    expect(capitalizeWords("")).toBe("");
  });
});

describe("string.trim", () => {
  it("trims whitespace", () => {
    expect(trim("  hello  ")).toBe("hello");
  });
});

describe("string.truncate", () => {
  it("truncates long strings", () => {
    expect(truncate("hello world", { length: 8 })).toBe("hello...");
  });
  it("returns omission when length is too small", () => {
    expect(truncate("hello world", { length: 2, omission: "..." })).toBe("...");
  });
  it("returns original when shorter than length", () => {
    expect(truncate("hi", { length: 10 })).toBe("hi");
  });
});

describe("string.slugify", () => {
  it("creates a URL slug", () => {
    expect(slugify("Hello World!")).toBe("hello-world");
    expect(slugify("  ")).toBe("");
  });
});

describe("string.reverse", () => {
  it("reverses string", () => {
    expect(reverse("hello")).toBe("olleh");
  });
});

describe("string.startsWith/endsWith", () => {
  it("checks prefixes/suffixes", () => {
    expect(startsWith("hello", "he")).toBe(true);
    expect(startsWith("hello", "x")).toBe(false);
    expect(endsWith("hello", "lo")).toBe(true);
    expect(endsWith("hello", "x")).toBe(false);
  });
});

describe("string.wordCount", () => {
  it("counts words", () => {
    expect(wordCount("hello world")).toBe(2);
    expect(wordCount("")).toBe(0);
    expect(wordCount("   ")).toBe(0);
  });
});

describe("string.escapeHtml", () => {
  it("escapes HTML entities", () => {
    expect(escapeHtml("<a>&b</a>")).toBe("&lt;a&gt;&amp;b&lt;/a&gt;");
  });
});
