import type { MetadataRoute } from "next";

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
  ];

  const wordCountRoutes: MetadataRoute.Sitemap = WORD_COUNTS.map((count) => ({
    url: `${BASE_URL}/${count}-words`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...wordCountRoutes];
}
