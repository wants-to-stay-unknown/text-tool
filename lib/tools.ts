import { CLUSTERS } from "../src/content/clusters";

export type Tool = {
  slug: string;
  name: string;
  route: string;
  description: string;
  benefit: string;
  ctaLabel: string;
  useCaseCategoryRoute: string;
};

export const CLUSTER_TOOLS: Tool[] = CLUSTERS.flatMap((cluster) =>
  cluster.tools.map((tool) => ({
    ...tool,
    useCaseCategoryRoute: `/use-cases/${cluster.slug}`,
  })),
);

const EXTRA_TOOLS: Tool[] = [
  {
    slug: "text-to-speech",
    name: "Text to Speech",
    route: "/text-to-speech",
    description: "Listen to your text with natural voices.",
    benefit: "Proofread drafts and study on the go.",
    ctaLabel: "Open text to speech",
    useCaseCategoryRoute: "/use-cases/text-to-speech",
  },
];

export const TOOLS: Tool[] = [...CLUSTER_TOOLS, ...EXTRA_TOOLS];

const TOOL_CLUSTER_MAP = new Map<string, string>();
for (const cluster of CLUSTERS) {
  for (const tool of cluster.tools) {
    TOOL_CLUSTER_MAP.set(tool.route, cluster.slug);
  }
}
TOOL_CLUSTER_MAP.set("/text-to-speech", "text-to-speech");

export const TOOL_BY_ROUTE = Object.fromEntries(
  TOOLS.map((tool) => [tool.route, tool]),
) as Record<string, Tool>;

export function getClusterSlugForToolRoute(route: string) {
  return TOOL_CLUSTER_MAP.get(route) ?? "text-to-speech";
}

export function getCrossClusterToolRoutes(
  primaryToolRoute: string,
  count = 2,
) {
  const primaryCluster = getClusterSlugForToolRoute(primaryToolRoute);
  const toolRoutesByCluster = new Map<string, string[]>();

  for (const tool of TOOLS) {
    const cluster = getClusterSlugForToolRoute(tool.route);
    const existing = toolRoutesByCluster.get(cluster) ?? [];
    existing.push(tool.route);
    toolRoutesByCluster.set(cluster, existing);
  }

  const orderedClusters = [
    ...CLUSTERS.map((cluster) => cluster.slug),
    "text-to-speech",
  ];

  const picks: string[] = [];
  for (const cluster of orderedClusters) {
    if (cluster === primaryCluster) {
      continue;
    }
    const routes = toolRoutesByCluster.get(cluster) ?? [];
    if (routes.length > 0) {
      picks.push(routes[0]);
    }
  }

  if (picks.length < count) {
    const fallback = TOOLS.filter(
      (tool) => getClusterSlugForToolRoute(tool.route) !== primaryCluster,
    ).map((tool) => tool.route);
    for (const route of fallback) {
      if (!picks.includes(route)) {
        picks.push(route);
      }
      if (picks.length >= count) {
        break;
      }
    }
  }

  return picks.slice(0, count);
}

export const TRY_NEXT_BY_TOOL: Record<string, string[]> = {
  "/word-counter": [
    "/case-converter",
    "/text-cleaner",
    "/case-style-converter",
  ],
  "/character-counter": [
    "/case-converter",
    "/remove-duplicates",
    "/text-cleaner",
  ],
  "/case-converter": [
    "/word-counter",
    "/text-cleaner",
    "/character-counter",
  ],
  "/case-style-converter": [
    "/word-counter",
    "/remove-duplicates",
    "/character-counter",
  ],
  "/remove-duplicates": [
    "/word-counter",
    "/case-converter",
    "/character-counter",
  ],
  "/text-cleaner": ["/word-counter", "/case-converter", "/character-counter"],
  "/text-to-speech": ["/word-counter", "/case-converter", "/text-cleaner"],
};

export const RELATED_TOOLS_BY_TOOL: Record<string, string[]> = {
  "/word-counter": ["/character-counter", "/case-converter", "/text-cleaner"],
  "/character-counter": ["/word-counter", "/case-converter", "/text-cleaner"],
  "/case-converter": ["/case-style-converter", "/word-counter", "/text-cleaner"],
  "/case-style-converter": ["/case-converter", "/word-counter", "/remove-duplicates"],
  "/remove-duplicates": ["/text-cleaner", "/word-counter", "/case-converter"],
  "/text-cleaner": ["/remove-duplicates", "/case-converter", "/word-counter"],
  "/text-to-speech": ["/word-counter", "/case-converter", "/text-cleaner"],
};

export const POST_ACTION_SUGGESTIONS: Record<
  string,
  { tools: string[]; useCaseSlug: string }
> = {
  "/word-counter": {
    tools: ["/character-counter", "/case-converter"],
    useCaseSlug: "word-count-essay-500-1000-words",
  },
  "/character-counter": {
    tools: ["/word-counter", "/case-converter"],
    useCaseSlug: "character-count-twitter-x",
  },
  "/case-converter": {
    tools: ["/case-style-converter", "/word-counter"],
    useCaseSlug: "title-case-generator",
  },
  "/case-style-converter": {
    tools: ["/case-converter", "/remove-duplicates"],
    useCaseSlug: "camelcase-to-snakecase",
  },
  "/remove-duplicates": {
    tools: ["/text-cleaner", "/word-counter"],
    useCaseSlug: "remove-duplicate-lines",
  },
  "/text-cleaner": {
    tools: ["/remove-duplicates", "/case-converter"],
    useCaseSlug: "clean-text-for-import",
  },
  "/text-to-speech": {
    tools: ["/word-counter", "/case-converter"],
    useCaseSlug: "text-to-speech-for-proofreading",
  },
};

export const TOOL_TIPS: Record<
  string,
  { title: string; text: string; linkLabel: string; linkHref: string }[]
> = {
  "/word-counter": [
    {
      title: "Match platform limits",
      text: "Count words and characters before you post.",
      linkLabel: "Character limit guide",
      linkHref: "/use-cases/character-count-twitter-x",
    },
    {
      title: "Estimate speaking time",
      text: "Use word count to plan presentations and scripts.",
      linkLabel: "Speech time estimator",
      linkHref: "/use-cases/word-count-speech-time-estimator",
    },
    {
      title: "Polish before converting",
      text: "Clean and format text after you hit the target length.",
      linkLabel: "Try case converter",
      linkHref: "/case-converter",
    },
  ],
  "/character-counter": [
    {
      title: "Check social limits",
      text: "Pick a platform preset to track remaining characters.",
      linkLabel: "Twitter/X limit",
      linkHref: "/use-cases/character-count-twitter-x",
    },
    {
      title: "Optimize SEO snippets",
      text: "Keep metadata within search result limits.",
      linkLabel: "Meta description limits",
      linkHref: "/use-cases/character-count-meta-description",
    },
    {
      title: "Measure before formatting",
      text: "Adjust case once your length is locked.",
      linkLabel: "Open case converter",
      linkHref: "/case-converter",
    },
  ],
  "/case-converter": [
    {
      title: "Keep title case consistent",
      text: "Standardize headings and titles before publishing.",
      linkLabel: "Title case generator",
      linkHref: "/use-cases/title-case-generator",
    },
    {
      title: "Fix spacing and casing together",
      text: "Tidy extra spaces when you paste from documents.",
      linkLabel: "Clean text quickly",
      linkHref: "/text-cleaner",
    },
    {
      title: "Validate length after editing",
      text: "Measure the final output for ads and snippets.",
      linkLabel: "Open word counter",
      linkHref: "/word-counter",
    },
  ],
  "/case-style-converter": [
    {
      title: "Normalize identifiers",
      text: "Convert naming styles before you paste into code.",
      linkLabel: "camelCase to snake_case",
      linkHref: "/use-cases/camelcase-to-snakecase",
    },
    {
      title: "Prep data columns",
      text: "Standardize header naming across files.",
      linkLabel: "snake_case to camelCase",
      linkHref: "/use-cases/snakecase-to-camelcase",
    },
    {
      title: "Check length limits",
      text: "Validate identifiers and labels for UI limits.",
      linkLabel: "Character counter",
      linkHref: "/character-counter",
    },
  ],
  "/remove-duplicates": [
    {
      title: "Clean before exporting",
      text: "Remove duplicates so your list is ready to share.",
      linkLabel: "Unique list generator",
      linkHref: "/use-cases/unique-list-generator",
    },
    {
      title: "Fix empty rows",
      text: "Drop blank lines and duplicates at once.",
      linkLabel: "Remove empty lines",
      linkHref: "/use-cases/remove-empty-lines-and-duplicates",
    },
    {
      title: "Format after cleanup",
      text: "Apply consistent casing to cleaned lists.",
      linkLabel: "Try case converter",
      linkHref: "/case-converter",
    },
  ],
  "/text-cleaner": [
    {
      title: "Clean copied lists",
      text: "Remove spaces, blanks, and duplicates in one pass.",
      linkLabel: "Clean copied lists",
      linkHref: "/use-cases/clean-copied-list-duplicates",
    },
    {
      title: "Sort for imports",
      text: "Sort A–Z when your tools need alphabetical lists.",
      linkLabel: "Sort lines A–Z",
      linkHref: "/use-cases/sort-lines-a-z",
    },
    {
      title: "Fix formatting after cleanup",
      text: "Apply case rules once the list is clean.",
      linkLabel: "Open case converter",
      linkHref: "/case-converter",
    },
  ],
  "/text-to-speech": [
    {
      title: "Proofread by listening",
      text: "Catch awkward phrasing by hearing it read aloud.",
      linkLabel: "Proofreading use case",
      linkHref: "/use-cases/text-to-speech-for-proofreading",
    },
    {
      title: "Study with audio",
      text: "Convert notes into audio for passive review.",
      linkLabel: "Studying use case",
      linkHref: "/use-cases/text-to-speech-for-studying",
    },
    {
      title: "Count before you record",
      text: "Estimate timing for narrated content.",
      linkLabel: "Word counter",
      linkHref: "/word-counter",
    },
  ],
};
