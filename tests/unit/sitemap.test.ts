import { describe, expect, it } from "vitest";

import sitemap from "../../app/sitemap";
import { USE_CASES, USE_CASE_CATEGORIES } from "../../lib/use-cases";
import { TOOLS } from "../../lib/tools";

describe("sitemap", () => {
  it("includes tool, category, and use-case routes", () => {
    const entries = sitemap();
    const urls = new Set(entries.map((entry) => entry.url));

    const sampleTool = TOOLS[0];
    const sampleCategory = USE_CASE_CATEGORIES[0];
    const sampleUseCase = USE_CASES[0];

    expect(urls).toContain(`https://text-tool.live${sampleTool.route}`);
    expect(urls).toContain(`https://text-tool.live/use-cases/${sampleCategory.slug}`);
    expect(urls).toContain(`https://text-tool.live/use-cases/${sampleUseCase.slug}`);
  });
});
