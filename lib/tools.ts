export type Tool = {
  slug: string;
  name: string;
  route: string;
  description: string;
  benefit: string;
  ctaLabel: string;
  useCaseCategoryRoute: string;
};

export const TOOLS: Tool[] = [
  {
    slug: "word-counter",
    name: "Word Counter",
    route: "/word-counter",
    description: "Count words, characters, and spacing instantly.",
    benefit: "Validate length for essays, resumes, and posts.",
    ctaLabel: "Open word counter",
    useCaseCategoryRoute: "/use-cases/word-counter",
  },
  {
    slug: "case-converter",
    name: "Case Converter",
    route: "/case-converter",
    description: "Convert text to title, sentence, upper, or lower case.",
    benefit: "Clean formatting before you publish or paste.",
    ctaLabel: "Open case converter",
    useCaseCategoryRoute: "/use-cases/case-converter",
  },
  {
    slug: "remove-duplicates",
    name: "Remove Duplicate Lines",
    route: "/remove-duplicates",
    description: "Remove duplicate lines while keeping order.",
    benefit: "Clean lists, logs, and CSV columns.",
    ctaLabel: "Remove duplicates",
    useCaseCategoryRoute: "/use-cases/remove-duplicates",
  },
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

export const TOOL_BY_ROUTE = Object.fromEntries(
  TOOLS.map((tool) => [tool.route, tool]),
) as Record<string, Tool>;

export const TRY_NEXT_BY_TOOL: Record<string, string[]> = {
  "/word-counter": ["/case-converter", "/remove-duplicates", "/text-to-speech"],
  "/case-converter": ["/word-counter", "/remove-duplicates", "/text-to-speech"],
  "/remove-duplicates": ["/word-counter", "/case-converter", "/text-to-speech"],
  "/text-to-speech": ["/word-counter", "/case-converter", "/remove-duplicates"],
};

export const RELATED_TOOLS_BY_TOOL: Record<string, string[]> = {
  "/word-counter": ["/case-converter", "/remove-duplicates", "/text-to-speech"],
  "/case-converter": ["/word-counter", "/remove-duplicates", "/text-to-speech"],
  "/remove-duplicates": ["/word-counter", "/case-converter", "/text-to-speech"],
  "/text-to-speech": ["/word-counter", "/case-converter", "/remove-duplicates"],
};

export const POST_ACTION_SUGGESTIONS: Record<
  string,
  { tools: string[]; useCaseSlug: string }
> = {
  "/word-counter": {
    tools: ["/case-converter", "/remove-duplicates"],
    useCaseSlug: "word-count-essay-500-1000-words",
  },
  "/case-converter": {
    tools: ["/word-counter", "/remove-duplicates"],
    useCaseSlug: "title-case-generator",
  },
  "/remove-duplicates": {
    tools: ["/word-counter", "/case-converter"],
    useCaseSlug: "remove-duplicate-lines",
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
      text: "Check character limits for social posts before you publish.",
      linkLabel: "Twitter/X limit use case",
      linkHref: "/use-cases/word-count-twitter-x-character-limit",
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
      linkLabel: "Remove extra spaces",
      linkHref: "/use-cases/remove-extra-spaces-and-fix-case",
    },
    {
      title: "Validate length after editing",
      text: "Measure the final output for ads and snippets.",
      linkLabel: "Open word counter",
      linkHref: "/word-counter",
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
