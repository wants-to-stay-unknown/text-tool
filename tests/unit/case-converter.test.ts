import { describe, expect, it } from "vitest";

import {
  applyCaseMode,
  toLowercase,
  toSentenceCase,
  toTitleCase,
  toToggleCase,
  toUppercase,
} from "../../lib/case-converter";

describe("case converter", () => {
  it("handles empty input", () => {
    expect(applyCaseMode("", "uppercase")).toBe("");
  });

  it("converts to uppercase", () => {
    expect(toUppercase("Hello")).toBe("HELLO");
  });

  it("converts to lowercase", () => {
    expect(toLowercase("Hello")).toBe("hello");
  });

  it("converts to title case", () => {
    expect(toTitleCase("hello WORLD")).toBe("Hello World");
  });

  it("converts to sentence case", () => {
    expect(toSentenceCase("hello world. new SENTENCE!")).toBe(
      "Hello world. New sentence!"
    );
  });

  it("converts to toggle case", () => {
    expect(toToggleCase("AbC!")).toBe("aBc!");
  });

  it("preserves punctuation and line breaks", () => {
    expect(applyCaseMode("hello-world\nnext", "uppercase")).toBe(
      "HELLO-WORLD\nNEXT"
    );
  });

  it("handles unicode and emoji", () => {
    expect(applyCaseMode("hello 👋", "uppercase")).toBe("HELLO 👋");
  });

  it("is idempotent for same mode", () => {
    const once = applyCaseMode("hello world", "uppercase");
    const twice = applyCaseMode(once, "uppercase");
    expect(twice).toBe(once);
  });
});
