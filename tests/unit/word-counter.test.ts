import { describe, expect, it } from "vitest";

import { countTextStats } from "../../lib/word-counter";

describe("countTextStats", () => {
  it("handles empty input", () => {
    expect(countTextStats("")).toEqual({
      words: 0,
      characters: 0,
      charactersNoSpaces: 0,
      lines: 0,
      sentences: 0,
    });
  });

  it("handles whitespace-only input", () => {
    const stats = countTextStats("   \n\t  ");
    expect(stats.words).toBe(0);
    expect(stats.characters).toBe(6);
    expect(stats.charactersNoSpaces).toBe(0);
    expect(stats.lines).toBe(2);
  });

  it("counts words with multiple spaces and newlines", () => {
    const stats = countTextStats("Hello   world\nthis\tis  text");
    expect(stats.words).toBe(5);
    expect(stats.lines).toBe(2);
  });

  it("handles unicode and emoji", () => {
    const stats = countTextStats("Hello 👋 world 🌍");
    expect(stats.words).toBe(3);
    expect(stats.charactersNoSpaces).toBeGreaterThan(0);
  });

  it("counts sentences with punctuation", () => {
    const stats = countTextStats("Hello world. How are you? I'm fine!");
    expect(stats.sentences).toBe(3);
  });

  it("handles Windows newlines", () => {
    const stats = countTextStats("one\r\ntwo\r\nthree");
    expect(stats.lines).toBe(3);
    expect(stats.words).toBe(3);
  });

  it("handles trailing newline", () => {
    const stats = countTextStats("one\ntwo\n");
    expect(stats.lines).toBe(3);
    expect(stats.words).toBe(2);
  });

  it("handles long input", () => {
    const longText = "word ".repeat(10000);
    const stats = countTextStats(longText);
    expect(stats.words).toBe(10000);
  });
});
