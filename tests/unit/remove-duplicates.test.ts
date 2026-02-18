import { describe, expect, it } from "vitest";

import {
  DEFAULT_OPTIONS,
  removeDuplicates,
} from "../../lib/remove-duplicates";

describe("removeDuplicates", () => {
  it("handles empty input", () => {
    const result = removeDuplicates("", DEFAULT_OPTIONS);
    expect(result.output).toBe("");
    expect(result.totalLines).toBe(0);
  });

  it("removes exact duplicates and preserves order", () => {
    const result = removeDuplicates("a\nb\na\nc", DEFAULT_OPTIONS);
    expect(result.output).toBe("a\nb\nc");
    expect(result.removedDuplicates).toBe(1);
  });

  it("handles whitespace-only lines", () => {
    const result = removeDuplicates("a\n \nA", {
      ...DEFAULT_OPTIONS,
      caseSensitive: false,
      removeEmpty: true,
    });
    expect(result.output).toBe("a");
  });

  it("supports trim whitespace comparison", () => {
    const result = removeDuplicates("a\n a \nA", {
      ...DEFAULT_OPTIONS,
      caseSensitive: false,
      trimWhitespace: true,
    });
    expect(result.output).toBe("a");
  });

  it("keeps last occurrence when keepFirst is false", () => {
    const result = removeDuplicates("a\nb\na\nc", {
      ...DEFAULT_OPTIONS,
      keepFirst: false,
    });
    expect(result.output).toBe("b\na\nc");
  });

  it("handles Windows newlines", () => {
    const result = removeDuplicates("a\r\na\r\nb", DEFAULT_OPTIONS);
    expect(result.output).toBe("a\r\nb");
  });

  it("is idempotent", () => {
    const input = "a\nb\na";
    const once = removeDuplicates(input, DEFAULT_OPTIONS).output;
    const twice = removeDuplicates(once, DEFAULT_OPTIONS).output;
    expect(twice).toBe(once);
  });
});
