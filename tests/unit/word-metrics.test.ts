import { describe, expect, it } from "vitest";

import { getWordMetrics } from "../../lib/word-metrics";

describe("getWordMetrics", () => {
  it("calculates reading and speaking time", () => {
    const metrics = getWordMetrics(1000);
    expect(metrics.readingTimeMinutes).toBe(5);
    expect(metrics.speakingTimeMinutes).toBe(8);
  });

  it("calculates page estimates", () => {
    const metrics = getWordMetrics(1000);
    expect(metrics.pagesSingleSpaced).toBe(2);
    expect(metrics.pagesDoubleSpaced).toBe(4);
  });

  it("calculates sentence and paragraph estimates", () => {
    const metrics = getWordMetrics(1000);
    expect(metrics.sentencesEstimate).toBe(50);
    expect(metrics.paragraphsEstimate).toBe(7);
  });
});
