import { describe, expect, it } from "vitest";

import { sanitizeText } from "../../lib/text-safety";

describe("sanitizeText", () => {
  it("removes null bytes", () => {
    expect(sanitizeText("a\u0000b", 10)).toBe("ab");
  });

  it("enforces max length", () => {
    expect(sanitizeText("hello world", 5)).toBe("hello");
  });
});
