export type ClusterTool = {
  slug: string;
  name: string;
  route: string;
  description: string;
  benefit: string;
  ctaLabel: string;
};

export type Cluster = {
  slug: string;
  title: string;
  description: string;
  useCaseCategoryTitle: string;
  useCaseCategoryDescription: string;
  tools: ClusterTool[];
};

export const CLUSTERS: Cluster[] = [
  {
    slug: "word-limits",
    title: "Word & Limits",
    description:
      "Count words, characters, and timing details so drafts hit every limit.",
    useCaseCategoryTitle: "Word & Limits Use Cases",
    useCaseCategoryDescription:
      "Practical scenarios for word counts, character limits, and timing estimates.",
    tools: [
      {
        slug: "word-counter",
        name: "Word Counter",
        route: "/word-counter",
        description: "Count words, characters, and spacing instantly.",
        benefit: "Validate length for essays, resumes, and scripts.",
        ctaLabel: "Open word counter",
      },
      {
        slug: "character-counter",
        name: "Character Counter",
        route: "/character-counter",
        description: "Track character limits for social and SEO copy.",
        benefit: "Stay within platform limits before you publish.",
        ctaLabel: "Open character counter",
      },
    ],
  },
  {
    slug: "case-format",
    title: "Case & Format",
    description:
      "Convert casing and normalize formatting for copy and code identifiers.",
    useCaseCategoryTitle: "Case & Format Use Cases",
    useCaseCategoryDescription:
      "Fix capitalization, sentence case, and code-friendly casing in seconds.",
    tools: [
      {
        slug: "case-converter",
        name: "Case Converter",
        route: "/case-converter",
        description: "Convert text to title, sentence, upper, or lower case.",
        benefit: "Clean formatting before you publish or paste.",
        ctaLabel: "Open case converter",
      },
      {
        slug: "case-style-converter",
        name: "Case Style Converter",
        route: "/case-style-converter",
        description: "Convert to camelCase, snake_case, or kebab-case.",
        benefit: "Standardize identifiers for code and data work.",
        ctaLabel: "Open case styles",
      },
    ],
  },
  {
    slug: "clean-dedupe",
    title: "Clean & Dedupe",
    description:
      "Remove duplicates and clean messy lists with multi-step automation.",
    useCaseCategoryTitle: "Clean & Dedupe Use Cases",
    useCaseCategoryDescription:
      "Clean lists, remove duplicates, and prep text for imports.",
    tools: [
      {
        slug: "remove-duplicates",
        name: "Remove Duplicate Lines",
        route: "/remove-duplicates",
        description: "Remove duplicate lines while keeping order.",
        benefit: "Clean lists, logs, and CSV columns.",
        ctaLabel: "Remove duplicates",
      },
      {
        slug: "text-cleaner",
        name: "Text Cleaner",
        route: "/text-cleaner",
        description: "Clean text with multi-step toggles in one pass.",
        benefit: "Remove extra spaces, blanks, and duplicates.",
        ctaLabel: "Open text cleaner",
      },
    ],
  },
];
