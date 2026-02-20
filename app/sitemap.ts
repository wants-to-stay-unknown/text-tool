import type { MetadataRoute } from "next";

import { USE_CASES, USE_CASE_CATEGORIES } from "../lib/use-cases";
import { WORD_COUNTS } from "../lib/word-counts";

const BASE_URL = "https://text-tool.live";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/word-counter`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/case-converter`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/remove-duplicates`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/text-to-speech`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms-and-conditions`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/use-cases`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const wordCountRoutes: MetadataRoute.Sitemap = WORD_COUNTS.map((count) => ({
    url: `${BASE_URL}/${count}-words`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const useCaseCategoryRoutes: MetadataRoute.Sitemap = USE_CASE_CATEGORIES.map(
    (category) => ({
      url: `${BASE_URL}/use-cases/${category.slug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    }),
  );

  const useCaseRoutes: MetadataRoute.Sitemap = USE_CASES.map((useCase) => ({
    url: `${BASE_URL}/use-cases/${useCase.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...wordCountRoutes,
    ...useCaseCategoryRoutes,
    ...useCaseRoutes,
  ];
}
