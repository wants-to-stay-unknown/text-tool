import { describe, expect, it } from "vitest";

import {
  USE_CASES,
  USE_CASE_BY_SLUG,
  getCategorySlugForToolRoute,
} from "../../lib/use-cases";

describe("use cases", () => {
  it("maps unique slugs", () => {
    const slugs = USE_CASES.map((useCase) => useCase.slug);
    expect(new Set(slugs).size).toBe(slugs.length);

    for (const slug of slugs) {
      expect(USE_CASE_BY_SLUG[slug]).toBeDefined();
    }
  });

  it("meets minimum category counts", () => {
    const counts = {
      "word-limits": 0,
      "case-format": 0,
      "clean-dedupe": 0,
    };

    for (const useCase of USE_CASES) {
      const category = getCategorySlugForToolRoute(useCase.primaryToolRoute);
      if (category in counts) {
        counts[category as keyof typeof counts] += 1;
      }
    }

    expect(USE_CASES.length).toBeGreaterThanOrEqual(150);
    expect(counts["word-limits"]).toBeGreaterThanOrEqual(60);
    expect(counts["case-format"]).toBeGreaterThanOrEqual(45);
    expect(counts["clean-dedupe"]).toBeGreaterThanOrEqual(45);
  });

  it("resolves related use cases", () => {
    for (const useCase of USE_CASES) {
      expect(useCase.relatedSlugs.length).toBeGreaterThanOrEqual(3);
      for (const slug of useCase.relatedSlugs) {
        expect(USE_CASE_BY_SLUG[slug]).toBeDefined();
      }
    }
  });
});
