export type UseCaseFaq = {
  question: string;
  answer: string;
};

export type UseCaseCrossLink = {
  href: string;
  label: string;
  text: string;
};

export type UseCase = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  primaryToolRoute: string;
  intro: string[];
  steps: string[];
  faq: UseCaseFaq[];
  relatedSlugs: string[];
  crossLink: UseCaseCrossLink;
  keywords?: string[];
};

const WORD_COUNTER_SHARED =
  "Use the extra metrics to guide revisions: sentence count highlights run on lines, paragraph count reveals pacing issues, and reading time helps you match audience expectations. If the draft is over the limit, reduce filler phrases and combine short sentences. If it is under, add supporting details in the sections that carry the main argument so your edits improve clarity, not just length.";
const WORD_COUNTER_EXTRA =
  "A good workflow is to set a target range and check the count after each major edit. If you are over, tighten the sections that repeat ideas or add examples. If you are under, expand the paragraph that carries the most value for the reader. Making small adjustments throughout the draft is faster than cutting an entire section at the end.";
const CHARACTER_COUNTER_SHARED =
  "Character limits are strict, so treat them like a hard budget. Keep the main idea in the first sentence, then trim adjectives, duplicate emojis, or long links to stay under the limit. If you need variations, draft two or three versions and compare the totals so you can pick the clearest option that still fits.";
const CHARACTER_COUNTER_EXTRA =
  "Many platforms show a shorter preview than the full limit, so aim to keep the key message within the first line. If you are close to the cap, replace long phrases with shorter verbs and consider removing filler hashtags. Save a shorter backup version so you can swap it in quickly when you need to post fast.";
const CASE_CONVERTER_SHARED =
  "After conversion, scan for acronyms and brand names that must stay in a specific case. The converter gives you a fast baseline, but a quick manual review ensures the output matches your style guide. If you are working with multi line lists, convert everything in one pass so the formatting stays consistent across the entire set.";
const CASE_CONVERTER_EXTRA =
  "If you maintain a style guide, keep a short checklist of casing rules so you can validate the output quickly. For recurring tasks, save the input source so you can rerun conversions when the text changes. Consistency builds trust, especially when the text appears across multiple pages or channels.";
const CASE_STYLE_SHARED =
  "When converting identifiers, keep an eye on abbreviations and numbers to ensure the output is still readable. It helps to standardize on one style per project so mappings stay simple. If you are converting a long list, paste everything at once to keep the conversion consistent and easier to audit.";
const CASE_STYLE_EXTRA =
  "Pick a single style per system and document it so teammates know what to expect. If you are translating between styles, keep a small mapping list of exceptions such as abbreviations or acronyms. That short list prevents subtle bugs when identifiers move across services.";
const REMOVE_DUPLICATES_SHARED =
  "Before you finalize the output, decide whether you need to preserve the original order or sort alphabetically. Trimming whitespace and removing empty lines often catches near duplicates that look different but mean the same thing. Save the cleaned list for future imports so you do not have to repeat the cleanup later.";
const REMOVE_DUPLICATES_EXTRA =
  "If order matters, keep first so the earliest entry remains. If the list is only for analysis, sorting can make it easier to compare against another dataset. After you remove duplicates, scan the first and last few entries to confirm the list still looks complete.";
const TEXT_CLEANER_SHARED =
  "Multi step cleaning is most effective when you decide the final destination first. If the output is going into a spreadsheet, sorting can help you audit the list. If order matters, keep sorting off and focus on removing blanks, duplicates, and extra spaces. Run the cleaner again whenever new entries are added so the dataset stays tidy.";
const TEXT_CLEANER_EXTRA =
  "For large datasets, clean in smaller chunks to spot issues early. If you need a unique list, turn on dedupe after trimming so near duplicates collapse together. Keep a backup of the raw input so you can rerun the cleanup if your requirements change.";
const TEXT_TO_SPEECH_SHARED =
  "Use a voice that matches the tone you want to review, and adjust the speed until the text feels natural. Pausing and replaying short sections is often more effective than listening all the way through once. Keep the cleaned text nearby so you can make quick edits between playback sessions.";
const TEXT_TO_SPEECH_EXTRA =
  "If the audio feels too fast, slow it down and listen for awkward transitions or missing words. When you find a rough spot, pause, edit the text, and replay just that section. A few quick passes are usually enough to smooth out the final version.";

const CATEGORY_BY_TOOL_ROUTE: Record<string, string> = {
  "/word-counter": "word-limits",
  "/character-counter": "word-limits",
  "/case-converter": "case-format",
  "/case-style-converter": "case-format",
  "/remove-duplicates": "clean-dedupe",
  "/text-cleaner": "clean-dedupe",
  "/text-to-speech": "text-to-speech",
};

const CROSS_LINKS_BY_CATEGORY: Record<string, UseCaseCrossLink[]> = {
  "word-limits": [
    {
      href: "/case-converter",
      label: "Case Converter",
      text: "Once the length is right, polish casing with the",
    },
    {
      href: "/text-cleaner",
      label: "Text Cleaner",
      text: "If your draft has messy spacing, clean it with the",
    },
  ],
  "case-format": [
    {
      href: "/character-counter",
      label: "Character Counter",
      text: "If the final text must fit a limit, check it in the",
    },
    {
      href: "/text-cleaner",
      label: "Text Cleaner",
      text: "If the input has extra spaces or blanks, tidy it with the",
    },
  ],
  "clean-dedupe": [
    {
      href: "/case-converter",
      label: "Case Converter",
      text: "After cleanup, normalize casing with the",
    },
    {
      href: "/word-counter",
      label: "Word Counter",
      text: "If you need length stats on the output, use the",
    },
  ],
  "text-to-speech": [
    {
      href: "/word-counter",
      label: "Word Counter",
      text: "If you need timing estimates before playback, use the",
    },
    {
      href: "/case-converter",
      label: "Case Converter",
      text: "If the script needs formatting first, run it through the",
    },
  ],
};

function getCategoryForToolRoute(route: string) {
  return CATEGORY_BY_TOOL_ROUTE[route] ?? "text-to-speech";
}

function getSharedParagraphs(route: string) {
  switch (route) {
    case "/character-counter":
      return [CHARACTER_COUNTER_SHARED, CHARACTER_COUNTER_EXTRA];
    case "/case-converter":
      return [CASE_CONVERTER_SHARED, CASE_CONVERTER_EXTRA];
    case "/case-style-converter":
      return [CASE_STYLE_SHARED, CASE_STYLE_EXTRA];
    case "/remove-duplicates":
      return [REMOVE_DUPLICATES_SHARED, REMOVE_DUPLICATES_EXTRA];
    case "/text-cleaner":
      return [TEXT_CLEANER_SHARED, TEXT_CLEANER_EXTRA];
    case "/text-to-speech":
      return [TEXT_TO_SPEECH_SHARED, TEXT_TO_SPEECH_EXTRA];
    case "/word-counter":
    default:
      return [WORD_COUNTER_SHARED, WORD_COUNTER_EXTRA];
  }
}

function buildCrossLink(category: string, index: number): UseCaseCrossLink {
  const options =
    CROSS_LINKS_BY_CATEGORY[category] ?? CROSS_LINKS_BY_CATEGORY["word-limits"];
  return options[index % options.length];
}

type WordLimitSeed = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  primaryToolRoute: "/word-counter" | "/character-counter";
  context: string;
  audience: string;
  goal: string;
  limit: string;
  detail: string;
  platform?: string;
  keywords?: string[];
};

type CaseFormatSeed = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  primaryToolRoute: "/case-converter" | "/case-style-converter";
  context: string;
  audience: string;
  goal: string;
  format: string;
  detail: string;
  keywords?: string[];
};

type CleanSeed = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  primaryToolRoute: "/remove-duplicates" | "/text-cleaner";
  context: string;
  audience: string;
  goal: string;
  detail: string;
  keywords?: string[];
};

type TextToSpeechSeed = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  primaryToolRoute: "/text-to-speech";
  context: string;
  audience: string;
  goal: string;
  detail: string;
  keywords?: string[];
};

function buildWordLimitIntro(seed: WordLimitSeed, index: number) {
  const wordTemplates = [
    () =>
      `When ${seed.audience} work on ${seed.context}, the expected length usually lands around ${seed.limit}. Hitting that range matters because ${seed.goal}. If you wait until the end to check, it is easy to discover you are far off target, which forces rushed edits. A live word count keeps the draft aligned while you write so you can adjust sections early. ${seed.detail}`,
    () =>
      `${seed.context} are easier to revise when you know the length target from the start. Most drafts in this category sit near ${seed.limit}, so counting words as you go helps you stay inside the guardrails while still adding useful detail. ${seed.detail} The fastest way to stay on track is to check the total after every major edit instead of waiting until the final pass.`,
  ];

  const characterTemplates = [
    () =>
      `Platforms like ${seed.platform} enforce a hard limit of ${seed.limit}, so a message that reads well in a doc can still be truncated in the UI. ${seed.goal} depends on keeping the first line visible, which is why a quick character check matters before publishing. ${seed.detail} Counting characters early helps you avoid last minute edits and keeps the message consistent.`,
    () =>
      `${seed.context} often look short, but ${seed.platform} counts every space, emoji, and symbol toward the ${seed.limit} limit. ${seed.detail} If your copy is over the cap, you may lose the strongest call to action in the preview. A character counter keeps you inside the limit while you refine the phrasing.`,
  ];

  const toolTemplates =
    seed.primaryToolRoute === "/character-counter"
      ? characterTemplates
      : wordTemplates;

  const introOne = toolTemplates[index % toolTemplates.length]();
  const introTwo =
    seed.primaryToolRoute === "/character-counter"
      ? `Paste your ${seed.context} into the character counter, select the ${seed.platform} preset, and watch the remaining budget update instantly. The tool counts spaces and punctuation so the total matches what the platform accepts. If you are over ${seed.limit}, shorten the lead sentence, replace long phrases, or move a secondary detail to a follow up post. Recheck the count after each edit to keep the final copy ready to publish.`
      : `Paste your ${seed.context} into the word counter to see words, characters, sentences, and paragraphs at a glance. Use those metrics to decide whether to cut repeated points, expand a thin section, or tighten the opening. If you are targeting ${seed.limit}, check the count after each edit so the final draft stays inside the range before you format or submit.`;

  return [introOne, introTwo, ...getSharedParagraphs(seed.primaryToolRoute)];
}

function buildWordLimitSteps(seed: WordLimitSeed, index: number) {
  const wordSteps = [
    [
      `Paste the ${seed.context} into the word counter.`,
      `Compare the total word count to ${seed.limit}.`,
      "Review sentence and paragraph counts to spot pacing issues.",
      "Trim or expand sections to reach the target range.",
      "Recheck after edits before final formatting.",
    ],
    [
      `Draft the ${seed.context} and paste it into the tool.`,
      `Confirm the count aligns with ${seed.limit}.`,
      "Use reading and speaking time to gauge pace.",
      "Tighten repeated ideas or add missing context.",
      "Run a final count before you submit or publish.",
    ],
  ];

  const characterSteps = [
    [
      `Paste your ${seed.context} into the character counter.`,
      `Select the ${seed.platform} preset.`,
      `Check remaining characters against the ${seed.limit} limit.`,
      "Shorten the hook or move extra detail to a follow up.",
      "Save the final copy and post with confidence.",
    ],
    [
      `Draft the ${seed.context} and open the ${seed.platform} preset.`,
      "Review the remaining character budget.",
      "Cut filler words or extra punctuation if you are over.",
      "Recount after edits to confirm the final length.",
      "Keep a shorter backup version for quick tweaks.",
    ],
  ];

  return seed.primaryToolRoute === "/character-counter"
    ? characterSteps[index % characterSteps.length]
    : wordSteps[index % wordSteps.length];
}

function buildWordLimitFaq(seed: WordLimitSeed) {
  if (seed.primaryToolRoute === "/character-counter") {
    return [
      {
        question: `Does ${seed.platform} count spaces in the limit?`,
        answer:
          "Yes, spaces and punctuation count toward the total, so include them when you measure.",
      },
      {
        question: "Do emojis count as characters?",
        answer:
          "Yes, emojis are counted as characters and reduce the remaining budget.",
      },
      {
        question: `What happens if I exceed ${seed.limit}?`,
        answer:
          "Most platforms truncate or block the post, so stay under the limit for a clean preview.",
      },
    ];
  }

  return [
    {
      question: `Should I include headings in the ${seed.context} count?`,
      answer:
        "Yes, include all text that will appear in the final version so the count matches reality.",
    },
    {
      question: `How close should I stay to ${seed.limit}?`,
      answer:
        "Aim to stay inside the range with a small buffer so late edits do not push you over.",
    },
    {
      question: "Does formatting affect the count?",
      answer:
        "No, the counter uses plain text, so formatting does not change the total.",
    },
  ];
}

function buildCaseFormatIntro(seed: CaseFormatSeed, index: number) {
  const caseTemplates = [
    () =>
      `If you are formatting ${seed.context}, inconsistent casing makes the content feel unpolished for ${seed.audience}. ${seed.goal} is easier when every line follows the same pattern. ${seed.detail} A case converter standardizes the text quickly so you can focus on the content instead of manual fixes.`,
    () =>
      `${seed.context} often come from multiple sources, which leads to mixed casing and uneven formatting. ${seed.detail} Using ${seed.format} as a consistent format helps ${seed.audience} scan the text faster and keeps the final output aligned with your style guide.`,
  ];

  const styleTemplates = [
    () =>
      `Teams often mix naming styles across ${seed.context}, which creates messy mappings and inconsistent code. ${seed.goal} is simpler when everything uses ${seed.format}. ${seed.detail} A case style converter gives you clean identifiers without manual edits.`,
    () =>
      `When ${seed.context} are shared between systems, a consistent ${seed.format} format reduces bugs and makes integration easier. ${seed.detail} Converting the full list in one pass keeps the output predictable and ready for reuse.`,
  ];

  const introOne =
    seed.primaryToolRoute === "/case-style-converter"
      ? styleTemplates[index % styleTemplates.length]()
      : caseTemplates[index % caseTemplates.length]();

  const introTwo =
    seed.primaryToolRoute === "/case-style-converter"
      ? `Paste the identifiers into the case style converter and choose ${seed.format}. The tool normalizes spaces, dashes, and underscores so you get consistent output even from mixed inputs. Review the result for abbreviations, then copy the list into your codebase, schema, or mapping file.`
      : `Paste your text into the case converter and select ${seed.format}. The output keeps line breaks so multi line lists stay intact. Review the result for acronyms or product names, then copy the cleaned text into your document or CMS.`;

  return [introOne, introTwo, ...getSharedParagraphs(seed.primaryToolRoute)];
}

function buildCaseFormatSteps(seed: CaseFormatSeed, index: number) {
  const converterSteps = [
    [
      `Paste the ${seed.context} into the case converter.`,
      `Select ${seed.format}.`,
      "Review the output for brand or acronym exceptions.",
      "Copy the converted text into your destination.",
      "Recheck formatting after final edits.",
    ],
    [
      `Collect the ${seed.context} you want to normalize.`,
      `Apply ${seed.format} with the converter.`,
      "Scan for names that should keep custom casing.",
      "Paste the output into your final layout.",
      "Save the format rules for future drafts.",
    ],
  ];

  const styleSteps = [
    [
      `Paste the ${seed.context} into the style converter.`,
      `Choose ${seed.format} as the output style.`,
      "Review the converted identifiers for accuracy.",
      "Copy the list into your code or data file.",
      "Reuse the converter whenever new identifiers arrive.",
    ],
    [
      `Gather the ${seed.context} you want to normalize.`,
      `Set the output to ${seed.format}.`,
      "Convert the full list in one pass.",
      "Spot check abbreviations and numbers.",
      "Paste the output into your mapping layer.",
    ],
  ];

  return seed.primaryToolRoute === "/case-style-converter"
    ? styleSteps[index % styleSteps.length]
    : converterSteps[index % converterSteps.length];
}

function buildCaseFormatFaq(seed: CaseFormatSeed) {
  if (seed.primaryToolRoute === "/case-style-converter") {
    return [
      {
        question: "Does the converter handle numbers in identifiers?",
        answer:
          "Yes, numbers stay in place while surrounding words are re cased.",
      },
      {
        question: "Will it remove separators like spaces and dashes?",
        answer:
          "Yes, spaces, dashes, and underscores are normalized into the target style.",
      },
      {
        question: `Is ${seed.format} the best choice for every system?`,
        answer:
          "Use one style per system and keep it consistent to reduce mapping errors.",
      },
    ];
  }

  return [
    {
      question: "Does the converter keep line breaks?",
      answer:
        "Yes, line breaks are preserved so multi line lists stay aligned.",
    },
    {
      question: "Will acronyms be lowercased?",
      answer:
        "Some modes will change acronyms, so review the output for exceptions.",
    },
    {
      question: `Can I apply ${seed.format} to large blocks of text?`,
      answer:
        "Yes, the converter supports long text blocks and updates instantly.",
    },
  ];
}

function buildCleanIntro(seed: CleanSeed, index: number) {
  const dedupeTemplates = [
    () =>
      `Duplicate ${seed.context} slow down ${seed.audience} and create noisy datasets. ${seed.goal} gets harder when repeats slip into the list. ${seed.detail} A duplicate remover makes cleanup fast while preserving the order you need.`,
    () =>
      `${seed.context} often include repeats from exports, merges, or manual edits. ${seed.detail} Removing duplicates early helps ${seed.audience} avoid rework and makes the list easier to analyze or import.`,
  ];

  const cleanerTemplates = [
    () =>
      `When ${seed.context} are pulled from multiple sources, they often include blank lines, double spaces, and repeated entries. ${seed.detail} A text cleaner lets ${seed.audience} fix all of those issues in one pass so the data is ready to use.`,
    () =>
      `${seed.context} can look clean at a glance but still include extra spacing and duplicates. ${seed.detail} Using a cleaner before you import or share the list reduces mistakes and keeps the output consistent for ${seed.audience}.`,
  ];

  const introOne =
    seed.primaryToolRoute === "/text-cleaner"
      ? cleanerTemplates[index % cleanerTemplates.length]()
      : dedupeTemplates[index % dedupeTemplates.length]();
  const introTwo =
    seed.primaryToolRoute === "/text-cleaner"
      ? "Paste the list into the text cleaner and toggle the cleanup steps you need. Remove empty lines, collapse extra spaces, and dedupe in one pass so the output is ready for imports or analysis. If order matters, leave sorting off; if you need auditing, turn sorting on and scan the cleaned list."
      : "Paste the list into the remove duplicates tool and choose options for trimming, case sensitivity, and order. You can remove empty lines, collapse extra spaces, and sort the output when needed. Copy the cleaned list into your spreadsheet or system once the duplicates are gone.";

  return [introOne, introTwo, ...getSharedParagraphs(seed.primaryToolRoute)];
}

function buildCleanSteps(seed: CleanSeed, index: number) {
  const dedupeSteps = [
    [
      `Paste the ${seed.context} into the remove duplicates tool.`,
      "Set trimming and case sensitivity options.",
      "Process the list to remove repeats.",
      "Sort A-Z if you need an ordered output.",
      "Copy the cleaned list into your destination.",
    ],
    [
      `Collect the ${seed.context} you want to clean.`,
      "Enable remove empty lines if needed.",
      "Remove duplicates while keeping the preferred order.",
      "Review the output for missing entries.",
      "Paste the final list into your workflow.",
    ],
  ];

  const cleanerSteps = [
    [
      `Paste the ${seed.context} into the text cleaner.`,
      "Enable remove empty lines and extra spaces.",
      "Turn on duplicate removal if you need a unique list.",
      "Sort A-Z if you want a quick audit.",
      "Copy the cleaned output for reuse.",
    ],
    [
      `Import the ${seed.context} into the text cleaner.`,
      "Toggle the cleanup steps you need.",
      "Review the output line count and duplicates removed.",
      "Adjust options if order matters.",
      "Save the cleaned list for your next import.",
    ],
  ];

  return seed.primaryToolRoute === "/text-cleaner"
    ? cleanerSteps[index % cleanerSteps.length]
    : dedupeSteps[index % dedupeSteps.length];
}

function buildCleanFaq(seed: CleanSeed) {
  if (seed.primaryToolRoute === "/text-cleaner") {
    return [
      {
        question: "Does the cleaner keep line breaks?",
        answer:
          "Yes, line breaks are preserved unless you remove empty lines or sort.",
      },
      {
        question: "What does unique list mode do?",
        answer:
          "It removes duplicates and sorts the output so you get a clean list.",
      },
      {
        question: "Can I use it for large lists?",
        answer:
          "Yes, the tool is designed to handle long lists efficiently.",
      },
    ];
  }

  return [
    {
      question: "Will it keep the original order?",
      answer:
        "Yes, keep first preserves the original order of the first occurrence.",
    },
    {
      question: "Does trimming change the text itself?",
      answer:
        "Trimming removes leading and trailing spaces, not the content of each line.",
    },
    {
      question: "Can I sort after removing duplicates?",
      answer:
        "Yes, sorting happens after dedupe so the list stays clean.",
    },
  ];
}

function buildTextToSpeechIntro(seed: TextToSpeechSeed, index: number) {
  const templates = [
    () =>
      `Listening to ${seed.context} helps ${seed.audience} ${seed.goal} without staring at a screen. ${seed.detail} Text to speech turns the written draft into audio so you can focus on pacing, clarity, and flow.`,
    () =>
      `${seed.context} are easier to improve when you hear them aloud. ${seed.detail} For ${seed.audience}, text to speech is a fast way to ${seed.goal} and catch issues that silent reading misses.`,
  ];

  const introOne = templates[index % templates.length]();
  const introTwo =
    "Paste your text into the tool, choose a clear voice, and adjust the speed until it feels natural. Pause and replay tricky sections as you edit so the final version reads smoothly when spoken. You can also vary the speed to match how quickly you plan to deliver the content.";

  return [introOne, introTwo, ...getSharedParagraphs(seed.primaryToolRoute)];
}

function buildTextToSpeechSteps(seed: TextToSpeechSeed, index: number) {
  const steps = [
    [
      `Paste the ${seed.context} into the text to speech tool.`,
      "Choose a voice that matches the tone you want.",
      "Set a comfortable playback speed.",
      "Listen, pause, and edit sections that sound off.",
      "Replay the updated text to confirm the flow.",
    ],
    [
      `Load the ${seed.context} into the tool.`,
      "Pick a voice and adjust rate and pitch.",
      "Play the audio and note awkward phrasing.",
      "Edit the text and replay short segments.",
      "Repeat until the delivery feels natural.",
    ],
  ];

  return steps[index % steps.length];
}

function buildTextToSpeechFaq() {
  return [
    {
      question: "Can I change the playback speed?",
      answer:
        "Yes, use the rate control to speed up or slow down the voice.",
    },
    {
      question: "Does the tool store my text?",
      answer: "No, the text stays in your browser and is not saved.",
    },
    {
      question: "Will it work on mobile?",
      answer:
        "Most modern mobile browsers support speech synthesis, but voices vary by device.",
    },
  ];
}

function buildUseCase(
  seed:
    | WordLimitSeed
    | CaseFormatSeed
    | CleanSeed
    | TextToSpeechSeed,
  index: number,
) {
  const category = getCategoryForToolRoute(seed.primaryToolRoute);
  let intro: string[];
  let steps: string[];
  let faq: UseCaseFaq[];

  if (
    seed.primaryToolRoute === "/word-counter" ||
    seed.primaryToolRoute === "/character-counter"
  ) {
    intro = buildWordLimitIntro(seed as WordLimitSeed, index);
    steps = buildWordLimitSteps(seed as WordLimitSeed, index);
    faq = buildWordLimitFaq(seed as WordLimitSeed);
  } else if (
    seed.primaryToolRoute === "/case-converter" ||
    seed.primaryToolRoute === "/case-style-converter"
  ) {
    intro = buildCaseFormatIntro(seed as CaseFormatSeed, index);
    steps = buildCaseFormatSteps(seed as CaseFormatSeed, index);
    faq = buildCaseFormatFaq(seed as CaseFormatSeed);
  } else if (
    seed.primaryToolRoute === "/remove-duplicates" ||
    seed.primaryToolRoute === "/text-cleaner"
  ) {
    intro = buildCleanIntro(seed as CleanSeed, index);
    steps = buildCleanSteps(seed as CleanSeed, index);
    faq = buildCleanFaq(seed as CleanSeed);
  } else {
    intro = buildTextToSpeechIntro(seed as TextToSpeechSeed, index);
    steps = buildTextToSpeechSteps(seed as TextToSpeechSeed, index);
    faq = buildTextToSpeechFaq();
  }

  return {
    ...seed,
    intro,
    steps,
    faq,
    relatedSlugs: [],
    crossLink: buildCrossLink(category, index),
  } satisfies UseCase;
}

const WORD_LIMIT_SEEDS: WordLimitSeed[] = [
  {
    slug: "word-count-essay-500-1000-words",
    title: "Word Count for 500 to 1000 Word Essays",
    description:
      "Count words for 500 to 1000 word essays and stay inside the assignment range.",
    h1: "Word Count for 500 to 1000 Word Essays",
    primaryToolRoute: "/word-counter",
    context: "essay drafts",
    audience: "students",
    goal: "you stay within the assignment range and avoid last minute cuts",
    limit: "500 to 1000 words",
    detail:
      "If your instructor grades for structure, use paragraph count to balance sections instead of trimming the conclusion.",
    keywords: ["500 word essay", "1000 word essay", "essay word count"],
  },
  {
    slug: "word-count-college-application",
    title: "College Application Word Count Helper",
    description:
      "Track college application essay length and stay under admissions limits.",
    h1: "College Application Word Count Helper",
    primaryToolRoute: "/word-counter",
    context: "college application essays",
    audience: "applicants",
    goal: "you stay under the admissions cap while keeping the story intact",
    limit: "500 to 650 words",
    detail:
      "Admissions portals can truncate text without warning, so a quick count after each revision keeps the final draft safe.",
  },
  {
    slug: "word-count-blog-post",
    title: "Word Count for Blog Posts",
    description:
      "Measure blog post length to match your content brief and reader intent.",
    h1: "Word Count for Blog Posts",
    primaryToolRoute: "/word-counter",
    context: "blog posts",
    audience: "content marketers",
    goal: "each post matches the brief without adding filler",
    limit: "800 to 1500 words",
    detail:
      "Use sentence count to spot sections that feel dense and break them into shorter paragraphs.",
  },
  {
    slug: "word-count-youtube-script",
    title: "Word Count for YouTube Scripts",
    description:
      "Estimate YouTube script length and speaking time from word count.",
    h1: "Word Count for YouTube Scripts",
    primaryToolRoute: "/word-counter",
    context: "YouTube scripts",
    audience: "video creators",
    goal: "your script matches the planned runtime",
    limit: "1200 to 1600 words",
    detail:
      "Speaking time estimates help you decide if the intro should be tighter or if a call to action needs more breathing room.",
  },
  {
    slug: "word-count-resume-summary",
    title: "Word Count for Resume Summaries",
    description:
      "Keep resume summaries concise with fast word counting.",
    h1: "Word Count for Resume Summaries",
    primaryToolRoute: "/word-counter",
    context: "resume summaries",
    audience: "job seekers",
    goal: "the summary stays concise and easy to scan",
    limit: "50 to 80 words",
    detail:
      "A tight word count helps recruiters see impact fast, especially in the first two lines.",
  },
  {
    slug: "word-count-speech-time-estimator",
    title: "Word Count for Speech Time Estimates",
    description:
      "Estimate speech timing with word count and speaking pace.",
    h1: "Word Count for Speech Time Estimates",
    primaryToolRoute: "/word-counter",
    context: "speech scripts",
    audience: "speakers",
    goal: "the delivery fits the time slot",
    limit: "650 to 900 words",
    detail:
      "If the script runs long, tighten transition phrases and shorten the opening story.",
  },
  {
    slug: "word-count-cover-letter",
    title: "Word Count for Cover Letters",
    description:
      "Check cover letter length so it stays focused and readable.",
    h1: "Word Count for Cover Letters",
    primaryToolRoute: "/word-counter",
    context: "cover letters",
    audience: "job seekers",
    goal: "the letter stays focused without repeating the resume",
    limit: "250 to 400 words",
    detail:
      "Shorter letters keep attention on achievements, so trim repeated phrases early.",
  },
  {
    slug: "word-count-executive-summary",
    title: "Word Count for Executive Summaries",
    description:
      "Keep executive summaries tight and aligned with leadership expectations.",
    h1: "Word Count for Executive Summaries",
    primaryToolRoute: "/word-counter",
    context: "executive summaries",
    audience: "operators",
    goal: "leaders can scan the summary quickly",
    limit: "200 to 300 words",
    detail:
      "Use sentence count to avoid long, multi clause sentences that slow down scanning.",
  },
  {
    slug: "word-count-product-description",
    title: "Word Count for Product Descriptions",
    description:
      "Measure product description length to keep listings clear and focused.",
    h1: "Word Count for Product Descriptions",
    primaryToolRoute: "/word-counter",
    context: "product descriptions",
    audience: "ecommerce teams",
    goal: "customers see the benefits without scrolling",
    limit: "150 to 300 words",
    detail:
      "Shorter descriptions increase readability, so prioritize features that influence purchase decisions.",
  },
  {
    slug: "word-count-press-release",
    title: "Word Count for Press Releases",
    description:
      "Keep press releases concise by tracking word count.",
    h1: "Word Count for Press Releases",
    primaryToolRoute: "/word-counter",
    context: "press releases",
    audience: "PR teams",
    goal: "the release stays scannable for journalists",
    limit: "400 to 600 words",
    detail:
      "Use paragraph count to keep sections balanced between overview, details, and quotes.",
  },
  {
    slug: "word-count-book-chapter",
    title: "Word Count for Book Chapters",
    description:
      "Measure chapter length to keep pacing consistent across a book.",
    h1: "Word Count for Book Chapters",
    primaryToolRoute: "/word-counter",
    context: "book chapters",
    audience: "authors",
    goal: "chapters stay consistent in length and pacing",
    limit: "2000 to 4000 words",
    detail:
      "A steady range keeps chapters from feeling rushed or dragging in the middle.",
  },
  {
    slug: "word-count-newsletter",
    title: "Word Count for Newsletters",
    description:
      "Track newsletter length to keep issues easy to read.",
    h1: "Word Count for Newsletters",
    primaryToolRoute: "/word-counter",
    context: "newsletter issues",
    audience: "newsletter writers",
    goal: "readers can finish the issue quickly",
    limit: "300 to 600 words",
    detail:
      "Reading time helps you decide when to split a long issue into multiple segments.",
  },
  {
    slug: "word-count-podcast-script",
    title: "Word Count for Podcast Scripts",
    description:
      "Estimate podcast timing with word count and speaking pace.",
    h1: "Word Count for Podcast Scripts",
    primaryToolRoute: "/word-counter",
    context: "podcast scripts",
    audience: "podcasters",
    goal: "each episode fits the planned duration",
    limit: "1500 to 2500 words",
    detail:
      "Speaking time helps you balance intro, discussion, and outro segments.",
  },
  {
    slug: "word-count-webinar-script",
    title: "Word Count for Webinar Scripts",
    description:
      "Keep webinar scripts aligned with time slots using word count.",
    h1: "Word Count for Webinar Scripts",
    primaryToolRoute: "/word-counter",
    context: "webinar scripts",
    audience: "hosts",
    goal: "the presentation fits the run of show",
    limit: "2000 to 3000 words",
    detail:
      "Use paragraph count to ensure each section has enough breathing room for slides.",
  },
  {
    slug: "word-count-job-description",
    title: "Word Count for Job Descriptions",
    description:
      "Measure job description length to keep candidates engaged.",
    h1: "Word Count for Job Descriptions",
    primaryToolRoute: "/word-counter",
    context: "job descriptions",
    audience: "recruiters",
    goal: "candidates can scan the role quickly",
    limit: "600 to 900 words",
    detail:
      "Shorter sentences improve readability, especially for requirements sections.",
  },
  {
    slug: "word-count-grant-proposal",
    title: "Word Count for Grant Proposals",
    description:
      "Track word count for grant proposal sections and stay within limits.",
    h1: "Word Count for Grant Proposals",
    primaryToolRoute: "/word-counter",
    context: "grant proposal sections",
    audience: "grant writers",
    goal: "the proposal stays within the funder limits",
    limit: "1500 to 2500 words",
    detail:
      "Use word count per section to balance need, approach, and impact statements.",
  },
  {
    slug: "word-count-research-abstract",
    title: "Word Count for Research Abstracts",
    description:
      "Keep research abstracts within conference word limits.",
    h1: "Word Count for Research Abstracts",
    primaryToolRoute: "/word-counter",
    context: "research abstracts",
    audience: "researchers",
    goal: "the abstract stays within submission limits",
    limit: "150 to 250 words",
    detail:
      "Abstracts often require strict caps, so count words after every revision.",
  },
  {
    slug: "word-count-personal-statement",
    title: "Word Count for Personal Statements",
    description:
      "Measure personal statement length to stay inside application caps.",
    h1: "Word Count for Personal Statements",
    primaryToolRoute: "/word-counter",
    context: "personal statements",
    audience: "applicants",
    goal: "the narrative fits the application cap",
    limit: "600 to 800 words",
    detail:
      "Use paragraph count to keep the opening and conclusion balanced.",
  },
  {
    slug: "word-count-case-study",
    title: "Word Count for Case Studies",
    description:
      "Track case study length to keep it focused and persuasive.",
    h1: "Word Count for Case Studies",
    primaryToolRoute: "/word-counter",
    context: "case studies",
    audience: "marketing teams",
    goal: "the story stays focused on results",
    limit: "800 to 1200 words",
    detail:
      "Use sentence count to tighten long paragraphs in the results section.",
  },
  {
    slug: "word-count-landing-page",
    title: "Word Count for Landing Page Copy",
    description:
      "Measure landing page copy length to keep it conversion focused.",
    h1: "Word Count for Landing Page Copy",
    primaryToolRoute: "/word-counter",
    context: "landing page copy",
    audience: "growth teams",
    goal: "the page stays conversion focused",
    limit: "300 to 600 words",
    detail:
      "Shorter sections keep the CTA visible without excessive scrolling.",
  },
  {
    slug: "word-count-meeting-agenda",
    title: "Word Count for Meeting Agendas",
    description:
      "Keep meeting agendas short and action oriented.",
    h1: "Word Count for Meeting Agendas",
    primaryToolRoute: "/word-counter",
    context: "meeting agendas",
    audience: "team leads",
    goal: "the agenda stays brief and scannable",
    limit: "150 to 250 words",
    detail:
      "Use paragraph count to separate discussion items from decisions.",
  },
  {
    slug: "word-count-project-update",
    title: "Word Count for Project Updates",
    description:
      "Measure project updates so stakeholders can scan them fast.",
    h1: "Word Count for Project Updates",
    primaryToolRoute: "/word-counter",
    context: "project updates",
    audience: "project managers",
    goal: "stakeholders can scan updates quickly",
    limit: "250 to 400 words",
    detail:
      "Reading time helps you keep updates short enough for weekly cadence.",
  },
  {
    slug: "word-count-email-sequence",
    title: "Word Count for Email Sequences",
    description:
      "Track per email word count in sequences to keep them concise.",
    h1: "Word Count for Email Sequences",
    primaryToolRoute: "/word-counter",
    context: "email sequence drafts",
    audience: "marketers",
    goal: "each email stays focused on one action",
    limit: "120 to 180 words per email",
    detail:
      "Shorter sentences make calls to action clearer in multi email flows.",
  },
  {
    slug: "word-count-onboarding-email",
    title: "Word Count for Onboarding Emails",
    description:
      "Keep onboarding emails short so users take the next step.",
    h1: "Word Count for Onboarding Emails",
    primaryToolRoute: "/word-counter",
    context: "onboarding emails",
    audience: "product teams",
    goal: "users reach activation without skimming past key steps",
    limit: "150 to 250 words",
    detail:
      "Keep the setup checklist short and use the word count to tighten extras.",
  },
  {
    slug: "word-count-customer-support-response",
    title: "Word Count for Support Responses",
    description:
      "Measure support response length to keep replies clear.",
    h1: "Word Count for Support Responses",
    primaryToolRoute: "/word-counter",
    context: "support responses",
    audience: "support teams",
    goal: "responses stay clear without overwhelming customers",
    limit: "80 to 150 words",
    detail:
      "Sentence count helps you keep each answer to one or two simple steps.",
  },
  {
    slug: "word-count-legal-brief",
    title: "Word Count for Legal Brief Summaries",
    description:
      "Track legal brief summary length for clarity and structure.",
    h1: "Word Count for Legal Brief Summaries",
    primaryToolRoute: "/word-counter",
    context: "legal brief summaries",
    audience: "legal teams",
    goal: "the summary is concise and easy to reference",
    limit: "900 to 1200 words",
    detail:
      "Use paragraph counts to keep background, argument, and conclusion balanced.",
  },
  {
    slug: "word-count-sop-procedure",
    title: "Word Count for SOP Procedures",
    description:
      "Keep SOP procedures readable by tracking word count.",
    h1: "Word Count for SOP Procedures",
    primaryToolRoute: "/word-counter",
    context: "SOP procedures",
    audience: "operations teams",
    goal: "steps stay clear and easy to follow",
    limit: "500 to 900 words",
    detail:
      "Shorter paragraphs help frontline teams follow procedures without confusion.",
  },
  {
    slug: "word-count-interview-script",
    title: "Word Count for Interview Scripts",
    description:
      "Measure interview scripts so sessions stay on schedule.",
    h1: "Word Count for Interview Scripts",
    primaryToolRoute: "/word-counter",
    context: "interview scripts",
    audience: "researchers",
    goal: "interviews fit the scheduled time",
    limit: "800 to 1200 words",
    detail:
      "Speaking time estimates help you decide how many questions to include.",
  },
  {
    slug: "word-count-portfolio-case-study",
    title: "Word Count for Portfolio Case Studies",
    description:
      "Keep portfolio case studies concise and outcome focused.",
    h1: "Word Count for Portfolio Case Studies",
    primaryToolRoute: "/word-counter",
    context: "portfolio case studies",
    audience: "designers",
    goal: "readers can scan the outcome quickly",
    limit: "700 to 1000 words",
    detail:
      "Use sentence count to tighten the challenge and results sections.",
  },
  {
    slug: "word-count-event-description",
    title: "Word Count for Event Descriptions",
    description:
      "Measure event descriptions to keep them short and compelling.",
    h1: "Word Count for Event Descriptions",
    primaryToolRoute: "/word-counter",
    context: "event descriptions",
    audience: "event marketers",
    goal: "attendees see the key details quickly",
    limit: "120 to 200 words",
    detail:
      "Short copy keeps logistics clear and leaves room for a strong call to action.",
  },
  {
    slug: "character-count-twitter-x",
    title: "Character Count for X / Twitter Posts",
    description:
      "Check character count for X / Twitter posts before you publish.",
    h1: "Character Count for X / Twitter Posts",
    primaryToolRoute: "/character-counter",
    context: "X posts",
    audience: "social teams",
    goal: "the hook stays visible and the post is not truncated",
    limit: "280 characters",
    detail:
      "Short links and emojis can still push the copy over the limit if you are not tracking them.",
    platform: "X / Twitter",
  },
  {
    slug: "character-count-instagram-caption",
    title: "Character Count for Instagram Captions",
    description:
      "Measure Instagram caption length and keep the first line focused.",
    h1: "Character Count for Instagram Captions",
    primaryToolRoute: "/character-counter",
    context: "Instagram captions",
    audience: "social teams",
    goal: "the preview line stays clean and readable",
    limit: "2200 characters",
    detail:
      "Captions look shorter in the preview, so a tight first sentence makes the post more engaging.",
    platform: "Instagram",
  },
  {
    slug: "character-count-linkedin-post",
    title: "Character Count for LinkedIn Posts",
    description:
      "Track LinkedIn post characters to keep updates readable.",
    h1: "Character Count for LinkedIn Posts",
    primaryToolRoute: "/character-counter",
    context: "LinkedIn posts",
    audience: "professional teams",
    goal: "the update stays clear and scannable",
    limit: "3000 characters",
    detail:
      "Long posts can lose the point, so keeping the hook tight improves engagement.",
    platform: "LinkedIn",
  },
  {
    slug: "character-count-meta-description",
    title: "Character Count for Meta Descriptions",
    description:
      "Keep meta descriptions within search result limits.",
    h1: "Character Count for Meta Descriptions",
    primaryToolRoute: "/character-counter",
    context: "meta descriptions",
    audience: "SEO teams",
    goal: "search snippets show a complete sentence",
    limit: "150 to 160 characters",
    detail:
      "Truncated snippets look unfinished, so monitor the character total as you edit.",
    platform: "Search results",
  },
  {
    slug: "character-count-youtube-title",
    title: "Character Count for YouTube Titles",
    description:
      "Measure YouTube title length to avoid truncation.",
    h1: "Character Count for YouTube Titles",
    primaryToolRoute: "/character-counter",
    context: "YouTube titles",
    audience: "video creators",
    goal: "the full title displays across devices",
    limit: "100 characters",
    detail:
      "Keep the most important words at the front so the title still reads well if it is shortened.",
    platform: "YouTube",
  },
  {
    slug: "character-count-sms-text",
    title: "Character Count for SMS Text Messages",
    description:
      "Check SMS character limits to stay within a single segment.",
    h1: "Character Count for SMS Text Messages",
    primaryToolRoute: "/character-counter",
    context: "SMS messages",
    audience: "growth teams",
    goal: "messages stay inside one segment for clarity",
    limit: "160 characters",
    detail:
      "Exceeding the limit splits the message and can confuse the call to action.",
    platform: "SMS",
  },
  {
    slug: "character-count-email-subject-line",
    title: "Character Count for Email Subject Lines",
    description:
      "Measure subject line length so it fits in inbox previews.",
    h1: "Character Count for Email Subject Lines",
    primaryToolRoute: "/character-counter",
    context: "email subject lines",
    audience: "email marketers",
    goal: "the subject line fits in the inbox preview",
    limit: "35 to 50 characters",
    detail:
      "Shorter subject lines reduce truncation on mobile clients.",
    platform: "Email clients",
  },
  {
    slug: "character-count-google-ads-headline",
    title: "Character Count for Google Ads Headlines",
    description:
      "Check Google Ads headline length before you publish ads.",
    h1: "Character Count for Google Ads Headlines",
    primaryToolRoute: "/character-counter",
    context: "Google Ads headlines",
    audience: "performance marketers",
    goal: "the full headline appears without truncation",
    limit: "30 characters",
    detail:
      "Shorter headlines keep the value proposition intact across placements.",
    platform: "Google Ads",
  },
  {
    slug: "character-count-google-ads-description",
    title: "Character Count for Google Ads Descriptions",
    description:
      "Track Google Ads description length to keep copy compliant.",
    h1: "Character Count for Google Ads Descriptions",
    primaryToolRoute: "/character-counter",
    context: "Google Ads descriptions",
    audience: "performance marketers",
    goal: "the description meets character limits",
    limit: "90 characters",
    detail:
      "Descriptions that are too long can be truncated or rejected by the platform.",
    platform: "Google Ads",
  },
  {
    slug: "character-count-facebook-primary-text",
    title: "Character Count for Facebook Primary Text",
    description:
      "Measure Facebook ad primary text length for cleaner previews.",
    h1: "Character Count for Facebook Primary Text",
    primaryToolRoute: "/character-counter",
    context: "Facebook ad primary text",
    audience: "paid social teams",
    goal: "the preview shows the main message",
    limit: "125 characters for the preview",
    detail:
      "Keep the first sentence short so the ad reads cleanly without clicking more.",
    platform: "Facebook",
  },
  {
    slug: "character-count-facebook-ad-headline",
    title: "Character Count for Facebook Ad Headlines",
    description:
      "Track Facebook ad headline length to stay inside the limit.",
    h1: "Character Count for Facebook Ad Headlines",
    primaryToolRoute: "/character-counter",
    context: "Facebook ad headlines",
    audience: "paid social teams",
    goal: "the headline stays visible in the ad unit",
    limit: "40 characters",
    detail:
      "Shorter headlines help the main benefit show before truncation.",
    platform: "Facebook",
  },
  {
    slug: "character-count-tiktok-bio",
    title: "Character Count for TikTok Bios",
    description:
      "Check TikTok bio characters to keep profiles concise.",
    h1: "Character Count for TikTok Bios",
    primaryToolRoute: "/character-counter",
    context: "TikTok bios",
    audience: "creators",
    goal: "the profile bio fits cleanly",
    limit: "80 characters",
    detail:
      "A short bio keeps the brand message clear alongside the profile link.",
    platform: "TikTok",
  },
  {
    slug: "character-count-tiktok-caption",
    title: "Character Count for TikTok Captions",
    description:
      "Measure TikTok caption length before posting.",
    h1: "Character Count for TikTok Captions",
    primaryToolRoute: "/character-counter",
    context: "TikTok captions",
    audience: "creators",
    goal: "the caption stays readable without truncation",
    limit: "2200 characters",
    detail:
      "Use the character budget to keep hashtags from overwhelming the hook.",
    platform: "TikTok",
  },
  {
    slug: "character-count-pinterest-title",
    title: "Character Count for Pinterest Titles",
    description:
      "Keep Pinterest titles within display limits.",
    h1: "Character Count for Pinterest Titles",
    primaryToolRoute: "/character-counter",
    context: "Pinterest titles",
    audience: "social teams",
    goal: "titles stay visible on pins",
    limit: "100 characters",
    detail:
      "Shorter titles help the keyword appear without truncation.",
    platform: "Pinterest",
  },
  {
    slug: "character-count-pinterest-description",
    title: "Character Count for Pinterest Descriptions",
    description:
      "Measure Pinterest description length for clean previews.",
    h1: "Character Count for Pinterest Descriptions",
    primaryToolRoute: "/character-counter",
    context: "Pinterest descriptions",
    audience: "content teams",
    goal: "the preview shows the key benefit",
    limit: "500 characters",
    detail:
      "A short description keeps the call to action visible without clicking more.",
    platform: "Pinterest",
  },
  {
    slug: "character-count-app-store-title",
    title: "Character Count for App Store Titles",
    description:
      "Check App Store title length to stay inside the limit.",
    h1: "Character Count for App Store Titles",
    primaryToolRoute: "/character-counter",
    context: "App Store titles",
    audience: "product marketers",
    goal: "the title fits in store listings",
    limit: "30 characters",
    detail:
      "Short titles keep the product name readable on mobile screens.",
    platform: "App Store",
  },
  {
    slug: "character-count-app-store-subtitle",
    title: "Character Count for App Store Subtitles",
    description:
      "Keep App Store subtitles within character limits.",
    h1: "Character Count for App Store Subtitles",
    primaryToolRoute: "/character-counter",
    context: "App Store subtitles",
    audience: "product marketers",
    goal: "the subtitle appears without truncation",
    limit: "30 characters",
    detail:
      "Use the limit to focus on a single value proposition or feature.",
    platform: "App Store",
  },
  {
    slug: "character-count-play-store-short-description",
    title: "Character Count for Play Store Short Descriptions",
    description:
      "Measure Play Store short description length for compliance.",
    h1: "Character Count for Play Store Short Descriptions",
    primaryToolRoute: "/character-counter",
    context: "Play Store short descriptions",
    audience: "app marketers",
    goal: "the short description meets store limits",
    limit: "80 characters",
    detail:
      "Short descriptions act like a headline, so keep the key benefit first.",
    platform: "Google Play",
  },
  {
    slug: "character-count-play-store-full-description",
    title: "Character Count for Play Store Descriptions",
    description:
      "Track Play Store description length to keep copy structured.",
    h1: "Character Count for Play Store Descriptions",
    primaryToolRoute: "/character-counter",
    context: "Play Store descriptions",
    audience: "app marketers",
    goal: "the description fits the store guidelines",
    limit: "4000 characters",
    detail:
      "Use the limit to keep feature lists short and avoid walls of text.",
    platform: "Google Play",
  },
  {
    slug: "character-count-slack-status",
    title: "Character Count for Slack Status Updates",
    description:
      "Keep Slack status updates short and readable.",
    h1: "Character Count for Slack Status Updates",
    primaryToolRoute: "/character-counter",
    context: "Slack status updates",
    audience: "teams",
    goal: "the status fits on one line",
    limit: "100 characters",
    detail:
      "Short statuses make it easier for teammates to scan availability.",
    platform: "Slack",
  },
  {
    slug: "character-count-discord-announcement",
    title: "Character Count for Discord Announcements",
    description:
      "Measure Discord announcement length to keep updates concise.",
    h1: "Character Count for Discord Announcements",
    primaryToolRoute: "/character-counter",
    context: "Discord announcements",
    audience: "community managers",
    goal: "the announcement stays readable without truncation",
    limit: "2000 characters",
    detail:
      "Long announcements are harder to scan, so keep the key details near the top.",
    platform: "Discord",
  },
  {
    slug: "character-count-reddit-title",
    title: "Character Count for Reddit Post Titles",
    description:
      "Check Reddit title length before you post.",
    h1: "Character Count for Reddit Post Titles",
    primaryToolRoute: "/character-counter",
    context: "Reddit titles",
    audience: "community teams",
    goal: "the title fits within subreddit limits",
    limit: "300 characters",
    detail:
      "Shorter titles keep the key question visible across devices.",
    platform: "Reddit",
  },
  {
    slug: "character-count-push-notification",
    title: "Character Count for Push Notifications",
    description:
      "Measure push notification length to avoid truncation.",
    h1: "Character Count for Push Notifications",
    primaryToolRoute: "/character-counter",
    context: "push notifications",
    audience: "product teams",
    goal: "the message fits on a single lock screen line",
    limit: "40 to 60 characters",
    detail:
      "Short notifications reduce truncation and keep the CTA visible.",
    platform: "Mobile push",
  },
  {
    slug: "character-count-meta-title-tag",
    title: "Character Count for Title Tags",
    description:
      "Track title tag length to keep SEO titles visible.",
    h1: "Character Count for Title Tags",
    primaryToolRoute: "/character-counter",
    context: "title tags",
    audience: "SEO teams",
    goal: "the full title shows in search results",
    limit: "50 to 60 characters",
    detail:
      "Long titles are truncated, so keep the brand name at the end.",
    platform: "Search results",
  },
  {
    slug: "character-count-youtube-description-snippet",
    title: "Character Count for YouTube Description Snippets",
    description:
      "Measure the first line of YouTube descriptions for clarity.",
    h1: "Character Count for YouTube Description Snippets",
    primaryToolRoute: "/character-counter",
    context: "YouTube description first lines",
    audience: "video creators",
    goal: "the first line explains the video clearly",
    limit: "100 to 150 characters",
    detail:
      "Keep the first line short so the summary reads well above the fold.",
    platform: "YouTube",
  },
  {
    slug: "character-count-twitter-thread-hook",
    title: "Character Count for X Thread Hooks",
    description:
      "Check the first tweet length for thread hooks.",
    h1: "Character Count for X Thread Hooks",
    primaryToolRoute: "/character-counter",
    context: "thread hooks",
    audience: "social teams",
    goal: "the hook stays visible and easy to scan",
    limit: "280 characters",
    detail:
      "Thread hooks perform better when the first line finishes without truncation.",
    platform: "X / Twitter",
  },
  {
    slug: "character-count-newsletter-subject-line",
    title: "Character Count for Newsletter Subjects",
    description:
      "Measure newsletter subject length to avoid inbox truncation.",
    h1: "Character Count for Newsletter Subjects",
    primaryToolRoute: "/character-counter",
    context: "newsletter subject lines",
    audience: "newsletter teams",
    goal: "the subject line fits mobile previews",
    limit: "35 to 50 characters",
    detail:
      "Short subjects keep the topic visible even on small screens.",
    platform: "Email clients",
  },
  {
    slug: "character-count-sms-call-to-action",
    title: "Character Count for SMS CTAs",
    description:
      "Keep SMS call to action text within one segment.",
    h1: "Character Count for SMS CTAs",
    primaryToolRoute: "/character-counter",
    context: "SMS call to action messages",
    audience: "growth teams",
    goal: "the CTA fits in a single message",
    limit: "160 characters",
    detail:
      "Short CTAs reduce split messages and keep opt out text readable.",
    platform: "SMS",
  },
  {
    slug: "character-count-instagram-reel-caption",
    title: "Character Count for Instagram Reels Captions",
    description:
      "Measure Reels caption length to keep the hook visible.",
    h1: "Character Count for Instagram Reels Captions",
    primaryToolRoute: "/character-counter",
    context: "Reels captions",
    audience: "social teams",
    goal: "the hook shows before the truncation cut",
    limit: "2200 characters",
    detail:
      "Reels often rely on a short first sentence, so keep the hook concise.",
    platform: "Instagram",
  },
  {
    slug: "character-count-product-hero-cta",
    title: "Character Count for Hero CTAs",
    description:
      "Measure hero CTA length so buttons stay readable.",
    h1: "Character Count for Hero CTAs",
    primaryToolRoute: "/character-counter",
    context: "hero CTAs",
    audience: "design teams",
    goal: "buttons fit in a single line",
    limit: "20 to 30 characters",
    detail:
      "Short CTAs reduce line wraps on mobile layouts.",
    platform: "Web UI",
  },
];
const CASE_FORMAT_SEEDS: CaseFormatSeed[] = [
  {
    slug: "convert-to-uppercase",
    title: "Convert Text to Uppercase",
    description:
      "Convert text to uppercase for headings, labels, or emphasis.",
    h1: "Convert Text to Uppercase",
    primaryToolRoute: "/case-converter",
    context: "headings and labels",
    audience: "content teams",
    goal: "the layout looks consistent across all headings",
    format: "UPPERCASE",
    detail:
      "Uppercase is often used for UI labels, so batch conversions save time.",
  },
  {
    slug: "convert-to-lowercase",
    title: "Convert Text to Lowercase",
    description:
      "Convert text to lowercase for consistent formatting and data cleanup.",
    h1: "Convert Text to Lowercase",
    primaryToolRoute: "/case-converter",
    context: "lists and tags",
    audience: "data teams",
    goal: "strings match during comparison and dedupe",
    format: "lowercase",
    detail:
      "Lowercase formatting reduces case based mismatches in datasets.",
  },
  {
    slug: "title-case-generator",
    title: "Title Case Generator",
    description:
      "Convert headings to title case for consistent presentation.",
    h1: "Title Case Generator",
    primaryToolRoute: "/case-converter",
    context: "headlines and titles",
    audience: "editors",
    goal: "titles follow the same capitalization rules",
    format: "Title Case",
    detail:
      "Title case gives headings a polished look across multi page content.",
  },
  {
    slug: "sentence-case-converter",
    title: "Sentence Case Converter",
    description:
      "Convert paragraphs to sentence case for readable body copy.",
    h1: "Sentence Case Converter",
    primaryToolRoute: "/case-converter",
    context: "paragraphs and captions",
    audience: "writers",
    goal: "body copy reads naturally",
    format: "Sentence case",
    detail:
      "Sentence case works well for long form text and reduces visual noise.",
  },
  {
    slug: "capitalize-each-word",
    title: "Capitalize Each Word",
    description:
      "Capitalize each word for labels and formatted lists.",
    h1: "Capitalize Each Word",
    primaryToolRoute: "/case-converter",
    context: "lists and headings",
    audience: "marketing teams",
    goal: "lists look consistent across templates",
    format: "Capitalize Each Word",
    detail:
      "This format is useful for menus and product names that need quick scanning.",
  },
  {
    slug: "fix-capitalization-after-period",
    title: "Fix Capitalization After Periods",
    description:
      "Fix sentence starts without changing the rest of the casing.",
    h1: "Fix Capitalization After Periods",
    primaryToolRoute: "/case-converter",
    context: "draft paragraphs",
    audience: "writers",
    goal: "sentences start correctly without retyping",
    format: "Fix capitalization after period",
    detail:
      "This mode preserves proper nouns while fixing lowercase sentence starts.",
  },
  {
    slug: "toggle-case-text",
    title: "Toggle Case for Text",
    description:
      "Swap letter casing to create alternating case effects.",
    h1: "Toggle Case for Text",
    primaryToolRoute: "/case-converter",
    context: "short text snippets",
    audience: "designers",
    goal: "you can experiment with alternate casing styles",
    format: "Toggle Case",
    detail:
      "Toggle case is useful for playful headings or visual emphasis.",
  },
  {
    slug: "trim-extra-spaces-text",
    title: "Trim Extra Spaces in Text",
    description:
      "Remove extra spaces while keeping casing consistent.",
    h1: "Trim Extra Spaces in Text",
    primaryToolRoute: "/case-converter",
    context: "pasted drafts",
    audience: "editors",
    goal: "spacing issues are fixed quickly",
    format: "Trim extra spaces",
    detail:
      "This mode collapses multiple spaces so the text is easier to scan.",
  },
  {
    slug: "fix-email-subject-capitalization",
    title: "Fix Email Subject Capitalization",
    description:
      "Normalize email subject casing before sending.",
    h1: "Fix Email Subject Capitalization",
    primaryToolRoute: "/case-converter",
    context: "email subject lines",
    audience: "email marketers",
    goal: "subject lines look consistent across campaigns",
    format: "Title Case",
    detail:
      "Consistent casing improves scanability in crowded inboxes.",
  },
  {
    slug: "clean-product-titles-case",
    title: "Clean Product Title Casing",
    description:
      "Normalize product title casing for catalogs and marketplaces.",
    h1: "Clean Product Title Casing",
    primaryToolRoute: "/case-converter",
    context: "product titles",
    audience: "ecommerce teams",
    goal: "catalog entries stay consistent",
    format: "Title Case",
    detail:
      "Batch conversions prevent inconsistent capitalization across listings.",
  },
  {
    slug: "normalize-headings-doc",
    title: "Normalize Document Headings",
    description:
      "Standardize headings in docs and knowledge bases.",
    h1: "Normalize Document Headings",
    primaryToolRoute: "/case-converter",
    context: "documentation headings",
    audience: "technical writers",
    goal: "heading hierarchy stays consistent",
    format: "Title Case",
    detail:
      "Normalized headings make long docs easier to scan.",
  },
  {
    slug: "format-press-release-headlines",
    title: "Format Press Release Headlines",
    description:
      "Apply consistent casing to press release headlines.",
    h1: "Format Press Release Headlines",
    primaryToolRoute: "/case-converter",
    context: "press release headlines",
    audience: "PR teams",
    goal: "headlines look professional across releases",
    format: "Title Case",
    detail:
      "Standard casing helps releases feel cohesive and polished.",
  },
  {
    slug: "sentence-case-social-captions",
    title: "Sentence Case Social Captions",
    description:
      "Convert social captions to sentence case for readability.",
    h1: "Sentence Case Social Captions",
    primaryToolRoute: "/case-converter",
    context: "social captions",
    audience: "social teams",
    goal: "captions read naturally on mobile",
    format: "Sentence case",
    detail:
      "Sentence case reduces the look of shouting in all caps posts.",
  },
  {
    slug: "title-case-blog-headings",
    title: "Title Case Blog Headings",
    description:
      "Apply title case to blog headings for consistent formatting.",
    h1: "Title Case Blog Headings",
    primaryToolRoute: "/case-converter",
    context: "blog headings",
    audience: "content teams",
    goal: "headings stay uniform across posts",
    format: "Title Case",
    detail:
      "Batch conversion keeps older posts aligned with new style rules.",
  },
  {
    slug: "lowercase-tags-list",
    title: "Lowercase Tag Lists",
    description:
      "Normalize tag lists by converting them to lowercase.",
    h1: "Lowercase Tag Lists",
    primaryToolRoute: "/case-converter",
    context: "tag lists",
    audience: "content teams",
    goal: "tags remain consistent across the CMS",
    format: "lowercase",
    detail:
      "Lowercasing tags prevents duplicates like Design and design.",
  },
  {
    slug: "uppercase-call-to-action",
    title: "Uppercase Call to Action Buttons",
    description:
      "Convert CTA text to uppercase for emphasis.",
    h1: "Uppercase Call to Action Buttons",
    primaryToolRoute: "/case-converter",
    context: "call to action buttons",
    audience: "design teams",
    goal: "buttons stand out visually",
    format: "UPPERCASE",
    detail:
      "Uppercase CTAs help highlight primary actions in hero sections.",
  },
  {
    slug: "fix-bulleted-lists-casing",
    title: "Fix Bulleted List Casing",
    description:
      "Normalize bullet list casing for consistency.",
    h1: "Fix Bulleted List Casing",
    primaryToolRoute: "/case-converter",
    context: "bulleted lists",
    audience: "editors",
    goal: "lists look uniform across documents",
    format: "Sentence case",
    detail:
      "Consistent casing keeps lists from looking messy when merged.",
  },
  {
    slug: "normalize-testimonials-case",
    title: "Normalize Testimonial Casing",
    description:
      "Convert testimonials into a consistent case style.",
    h1: "Normalize Testimonial Casing",
    primaryToolRoute: "/case-converter",
    context: "testimonials",
    audience: "marketing teams",
    goal: "quotes look cohesive on landing pages",
    format: "Sentence case",
    detail:
      "Sentence case helps testimonials read naturally without all caps text.",
  },
  {
    slug: "convert-csv-columns-case",
    title: "Convert CSV Column Case",
    description:
      "Normalize column labels to consistent casing.",
    h1: "Convert CSV Column Case",
    primaryToolRoute: "/case-converter",
    context: "CSV column labels",
    audience: "data teams",
    goal: "spreadsheets are easier to scan",
    format: "Title Case",
    detail:
      "Consistent label casing reduces confusion during analysis.",
  },
  {
    slug: "standardize-faq-questions",
    title: "Standardize FAQ Question Case",
    description:
      "Apply consistent casing to FAQ questions.",
    h1: "Standardize FAQ Question Case",
    primaryToolRoute: "/case-converter",
    context: "FAQ questions",
    audience: "content teams",
    goal: "question lists look uniform",
    format: "Title Case",
    detail:
      "Standard casing improves scanning and keeps the list tidy.",
  },
  {
    slug: "case-convert-usernames",
    title: "Case Convert Usernames",
    description:
      "Normalize usernames by converting case.",
    h1: "Case Convert Usernames",
    primaryToolRoute: "/case-converter",
    context: "usernames",
    audience: "community managers",
    goal: "user lists remain consistent",
    format: "lowercase",
    detail:
      "Lowercase usernames reduce duplicates in exported member lists.",
  },
  {
    slug: "sentence-case-notes",
    title: "Sentence Case Meeting Notes",
    description:
      "Convert notes into sentence case for easier reading.",
    h1: "Sentence Case Meeting Notes",
    primaryToolRoute: "/case-converter",
    context: "meeting notes",
    audience: "team leads",
    goal: "notes are readable and professional",
    format: "Sentence case",
    detail:
      "Sentence case makes quick recaps easier to share with stakeholders.",
  },
  {
    slug: "fix-case-after-import",
    title: "Fix Casing After Data Imports",
    description:
      "Normalize text case after imports or merges.",
    h1: "Fix Casing After Data Imports",
    primaryToolRoute: "/case-converter",
    context: "imported text fields",
    audience: "operations teams",
    goal: "data looks uniform after merges",
    format: "Sentence case",
    detail:
      "Batch conversion prevents inconsistent casing from multiple systems.",
  },
  {
    slug: "format-event-agenda-headings",
    title: "Format Event Agenda Headings",
    description:
      "Standardize event agenda headings with consistent casing.",
    h1: "Format Event Agenda Headings",
    primaryToolRoute: "/case-converter",
    context: "event agenda headings",
    audience: "event teams",
    goal: "agendas look professional and consistent",
    format: "Title Case",
    detail:
      "Consistent headings keep the agenda easy to scan during events.",
  },
  {
    slug: "capitalize-form-labels",
    title: "Capitalize Form Labels",
    description:
      "Capitalize form labels for clean UI copy.",
    h1: "Capitalize Form Labels",
    primaryToolRoute: "/case-converter",
    context: "form labels",
    audience: "design teams",
    goal: "forms look consistent across pages",
    format: "Capitalize Each Word",
    detail:
      "Batch conversions reduce visual noise in large form libraries.",
  },
  {
    slug: "camelcase-to-snakecase",
    title: "Convert camelCase to snake_case",
    description:
      "Convert camelCase identifiers to snake_case for APIs and databases.",
    h1: "Convert camelCase to snake_case",
    primaryToolRoute: "/case-style-converter",
    context: "API field lists",
    audience: "developers",
    goal: "database and API naming stay consistent",
    format: "snake_case",
    detail:
      "Converting fields in bulk prevents mismatched column names across services.",
  },
  {
    slug: "snakecase-to-camelcase",
    title: "Convert snake_case to camelCase",
    description:
      "Convert snake_case identifiers to camelCase for front end code.",
    h1: "Convert snake_case to camelCase",
    primaryToolRoute: "/case-style-converter",
    context: "API responses",
    audience: "frontend teams",
    goal: "client code matches naming conventions",
    format: "camelCase",
    detail:
      "Consistent camelCase reduces the need for manual mappings in UI code.",
  },
  {
    slug: "kebab-case-from-title",
    title: "Convert Titles to kebab-case",
    description:
      "Convert headings into kebab case for clean URLs.",
    h1: "Convert Titles to kebab-case",
    primaryToolRoute: "/case-style-converter",
    context: "blog titles",
    audience: "content teams",
    goal: "URLs stay clean and readable",
    format: "kebab-case",
    detail:
      "Kebab case keeps slugs human readable and SEO friendly.",
  },
  {
    slug: "camelcase-from-kebab",
    title: "Convert kebab-case to camelCase",
    description:
      "Convert kebab case identifiers into camel case variables.",
    h1: "Convert kebab-case to camelCase",
    primaryToolRoute: "/case-style-converter",
    context: "slug lists",
    audience: "developers",
    goal: "variables align with JavaScript conventions",
    format: "camelCase",
    detail:
      "This is useful when mapping URL slugs to config keys.",
  },
  {
    slug: "snakecase-from-spaces",
    title: "Convert Spaced Text to snake_case",
    description:
      "Convert phrases with spaces into snake case identifiers.",
    h1: "Convert Spaced Text to snake_case",
    primaryToolRoute: "/case-style-converter",
    context: "spreadsheet headers",
    audience: "data teams",
    goal: "column names align with database conventions",
    format: "snake_case",
    detail:
      "Clean snake case headers make SQL queries easier to write.",
  },
  {
    slug: "code-style-normalizer",
    title: "Normalize Mixed Case Styles in Code Lists",
    description:
      "Standardize mixed identifiers into one case style.",
    h1: "Normalize Mixed Case Styles in Code Lists",
    primaryToolRoute: "/case-style-converter",
    context: "mixed identifier lists",
    audience: "engineering teams",
    goal: "naming is consistent across systems",
    format: "snake_case",
    detail:
      "A single style reduces bugs when mapping between services.",
  },
  {
    slug: "convert-api-fields-to-camel",
    title: "Convert API Fields to camelCase",
    description:
      "Convert API fields to camel case for front end use.",
    h1: "Convert API Fields to camelCase",
    primaryToolRoute: "/case-style-converter",
    context: "API field names",
    audience: "frontend teams",
    goal: "client code reads cleanly",
    format: "camelCase",
    detail:
      "Camel case is the default for most JavaScript frameworks.",
  },
  {
    slug: "convert-db-columns-to-snake",
    title: "Convert DB Columns to snake_case",
    description:
      "Convert column labels into snake case for database schemas.",
    h1: "Convert DB Columns to snake_case",
    primaryToolRoute: "/case-style-converter",
    context: "database column names",
    audience: "data engineers",
    goal: "schemas follow standard naming rules",
    format: "snake_case",
    detail:
      "Consistent columns improve readability and query performance.",
  },
  {
    slug: "kebab-case-for-css-classes",
    title: "Generate kebab-case for CSS Classes",
    description:
      "Convert UI labels into kebab case for class names.",
    h1: "Generate kebab-case for CSS Classes",
    primaryToolRoute: "/case-style-converter",
    context: "CSS class lists",
    audience: "frontend teams",
    goal: "class names stay consistent across components",
    format: "kebab-case",
    detail:
      "Kebab case is easier to scan when styling HTML templates.",
  },
  {
    slug: "camelcase-for-js-variables",
    title: "camelCase for JavaScript Variables",
    description:
      "Convert labels into camel case for JavaScript variables.",
    h1: "camelCase for JavaScript Variables",
    primaryToolRoute: "/case-style-converter",
    context: "variable names",
    audience: "developers",
    goal: "JS code follows common naming rules",
    format: "camelCase",
    detail:
      "Camel case reduces lint warnings in most JS style guides.",
  },
  {
    slug: "snakecase-for-python-variables",
    title: "snake_case for Python Variables",
    description:
      "Convert identifiers into snake case for Python code.",
    h1: "snake_case for Python Variables",
    primaryToolRoute: "/case-style-converter",
    context: "Python variable lists",
    audience: "Python developers",
    goal: "code matches PEP8 naming conventions",
    format: "snake_case",
    detail:
      "Snake case keeps scripts consistent with common Python style guides.",
  },
  {
    slug: "convert-env-vars-to-snake",
    title: "Convert Environment Variables to snake_case",
    description:
      "Normalize environment variables into snake case style.",
    h1: "Convert Environment Variables to snake_case",
    primaryToolRoute: "/case-style-converter",
    context: "environment variable lists",
    audience: "devops teams",
    goal: "config keys stay consistent",
    format: "snake_case",
    detail:
      "Consistent naming makes it easier to manage secrets across environments.",
  },
  {
    slug: "slugify-product-names-kebab",
    title: "Slugify Product Names to kebab-case",
    description:
      "Convert product names into kebab case slugs.",
    h1: "Slugify Product Names to kebab-case",
    primaryToolRoute: "/case-style-converter",
    context: "product name lists",
    audience: "ecommerce teams",
    goal: "slugs are readable and consistent",
    format: "kebab-case",
    detail:
      "Kebab case slugs make product URLs easier to share.",
  },
  {
    slug: "url-slug-from-headline",
    title: "Create URL Slugs from Headlines",
    description:
      "Convert headlines into kebab case URL slugs.",
    h1: "Create URL Slugs from Headlines",
    primaryToolRoute: "/case-style-converter",
    context: "headline lists",
    audience: "content teams",
    goal: "URLs stay readable and SEO friendly",
    format: "kebab-case",
    detail:
      "Short slugs reduce errors when linking between pages.",
  },
  {
    slug: "convert-dashboard-metrics-keys",
    title: "Convert Dashboard Metric Keys",
    description:
      "Normalize metric keys into a consistent case style.",
    h1: "Convert Dashboard Metric Keys",
    primaryToolRoute: "/case-style-converter",
    context: "dashboard metrics",
    audience: "analytics teams",
    goal: "metric labels stay consistent across charts",
    format: "snake_case",
    detail:
      "Consistent keys prevent mismatched labels in reporting pipelines.",
  },
  {
    slug: "normalize-json-keys",
    title: "Normalize JSON Keys",
    description:
      "Convert JSON keys into a consistent case style.",
    h1: "Normalize JSON Keys",
    primaryToolRoute: "/case-style-converter",
    context: "JSON key lists",
    audience: "developers",
    goal: "payloads are easier to map",
    format: "camelCase",
    detail:
      "Normalize keys before you add type definitions or schemas.",
  },
  {
    slug: "convert-feature-flags",
    title: "Convert Feature Flag Names",
    description:
      "Standardize feature flag names into one case style.",
    h1: "Convert Feature Flag Names",
    primaryToolRoute: "/case-style-converter",
    context: "feature flag names",
    audience: "platform teams",
    goal: "flags remain consistent across environments",
    format: "snake_case",
    detail:
      "Consistent flags reduce mistakes when toggling features in production.",
  },
  {
    slug: "format-graphql-fields",
    title: "Format GraphQL Fields",
    description:
      "Convert field names into camel case for GraphQL schemas.",
    h1: "Format GraphQL Fields",
    primaryToolRoute: "/case-style-converter",
    context: "GraphQL fields",
    audience: "API teams",
    goal: "schema naming stays consistent",
    format: "camelCase",
    detail:
      "Camel case is common for GraphQL fields and helps reduce mismatches.",
  },
  {
    slug: "convert-analytics-event-names",
    title: "Convert Analytics Event Names",
    description:
      "Normalize analytics event names into a consistent case style.",
    h1: "Convert Analytics Event Names",
    primaryToolRoute: "/case-style-converter",
    context: "analytics events",
    audience: "growth teams",
    goal: "events stay consistent across tools",
    format: "snake_case",
    detail:
      "Consistent event names simplify dashboards and alerting.",
  },
  {
    slug: "normalize-file-names-kebab",
    title: "Normalize File Names to kebab-case",
    description:
      "Convert file names into kebab case for consistency.",
    h1: "Normalize File Names to kebab-case",
    primaryToolRoute: "/case-style-converter",
    context: "file name lists",
    audience: "content teams",
    goal: "files stay consistent across folders",
    format: "kebab-case",
    detail:
      "Kebab case file names reduce issues with spaces and special characters.",
  },
];
const CLEAN_SEEDS: CleanSeed[] = [
  {
    slug: "remove-duplicate-lines",
    title: "Remove Duplicate Lines from Text",
    description:
      "Remove duplicate lines from lists, logs, or exports while preserving order.",
    h1: "Remove Duplicate Lines from Text",
    primaryToolRoute: "/remove-duplicates",
    context: "lists and exports",
    audience: "operations teams",
    goal: "the list stays accurate and easy to reuse",
    detail:
      "Duplicates often sneak in after merges, so a quick cleanup prevents errors.",
  },
  {
    slug: "unique-list-generator",
    title: "Unique List Generator",
    description:
      "Generate a unique list by removing duplicates from pasted text.",
    h1: "Unique List Generator",
    primaryToolRoute: "/remove-duplicates",
    context: "tag lists",
    audience: "content teams",
    goal: "only unique entries remain",
    detail:
      "A unique list is easier to import into CRMs, catalogs, or analytics tools.",
  },
  {
    slug: "remove-empty-lines-and-duplicates",
    title: "Remove Empty Lines and Duplicates",
    description:
      "Remove empty lines and duplicates in one pass.",
    h1: "Remove Empty Lines and Duplicates",
    primaryToolRoute: "/remove-duplicates",
    context: "copied lists",
    audience: "analysts",
    goal: "the output is clean and ready to paste",
    detail:
      "Blank lines can cause import errors, so remove them before sorting.",
  },
  {
    slug: "dedupe-csv-column-text",
    title: "Dedupe a CSV Column of Text",
    description:
      "Remove duplicate values from a CSV column without changing the order.",
    h1: "Dedupe a CSV Column of Text",
    primaryToolRoute: "/remove-duplicates",
    context: "CSV column exports",
    audience: "data teams",
    goal: "only unique values remain for analysis",
    detail:
      "Use trimming and case insensitive matching to catch near duplicates.",
  },
  {
    slug: "clean-copied-list-duplicates",
    title: "Clean Copied Lists and Remove Duplicates",
    description:
      "Clean pasted lists by removing duplicate lines and keeping order.",
    h1: "Clean Copied Lists and Remove Duplicates",
    primaryToolRoute: "/remove-duplicates",
    context: "copied lists",
    audience: "sales teams",
    goal: "the list is clean before outreach",
    detail:
      "Duplicates in outreach lists can lead to double sends, so clean early.",
  },
  {
    slug: "sort-lines-a-z",
    title: "Sort Lines A-Z After Cleanup",
    description:
      "Sort cleaned lines alphabetically for easier scanning.",
    h1: "Sort Lines A-Z After Cleanup",
    primaryToolRoute: "/remove-duplicates",
    context: "name lists",
    audience: "operations teams",
    goal: "the list is easier to scan and audit",
    detail:
      "Sorting after dedupe makes it easier to spot missing entries.",
  },
  {
    slug: "remove-duplicate-words",
    title: "Remove Duplicate Words",
    description:
      "Remove duplicate words from keyword or tag lists.",
    h1: "Remove Duplicate Words",
    primaryToolRoute: "/remove-duplicates",
    context: "keyword lists",
    audience: "SEO teams",
    goal: "keyword lists stay accurate",
    detail:
      "Duplicates inflate list size and make reporting unreliable.",
  },
  {
    slug: "dedupe-email-subjects",
    title: "Dedupe Email Subject Lines",
    description:
      "Remove duplicate subject lines before scheduling campaigns.",
    h1: "Dedupe Email Subject Lines",
    primaryToolRoute: "/remove-duplicates",
    context: "email subject line lists",
    audience: "email teams",
    goal: "campaigns avoid repetitive subject lines",
    detail:
      "Unique subjects reduce spam risk and keep tests cleaner.",
  },
  {
    slug: "dedupe-log-lines",
    title: "Dedupe Log Lines",
    description:
      "Remove duplicate log lines for cleaner debugging exports.",
    h1: "Dedupe Log Lines",
    primaryToolRoute: "/remove-duplicates",
    context: "log exports",
    audience: "engineering teams",
    goal: "debugging output stays readable",
    detail:
      "Deduped logs help you spot unique errors faster.",
  },
  {
    slug: "dedupe-utm-campaigns",
    title: "Dedupe UTM Campaign Lists",
    description:
      "Remove duplicate UTM campaign values before analysis.",
    h1: "Dedupe UTM Campaign Lists",
    primaryToolRoute: "/remove-duplicates",
    context: "UTM campaign lists",
    audience: "growth teams",
    goal: "campaign tracking stays clean",
    detail:
      "Deduped UTMs reduce noise in reporting dashboards.",
  },
  {
    slug: "dedupe-tags-list",
    title: "Dedupe Tag Lists",
    description:
      "Remove duplicate tags to keep taxonomy clean.",
    h1: "Dedupe Tag Lists",
    primaryToolRoute: "/remove-duplicates",
    context: "tag lists",
    audience: "content teams",
    goal: "taxonomy stays consistent",
    detail:
      "Deduped tags prevent fragmented search and filtering.",
  },
  {
    slug: "dedupe-product-skus",
    title: "Dedupe Product SKU Lists",
    description:
      "Remove duplicate SKUs before inventory imports.",
    h1: "Dedupe Product SKU Lists",
    primaryToolRoute: "/remove-duplicates",
    context: "SKU lists",
    audience: "inventory teams",
    goal: "imports avoid duplicates",
    detail:
      "SKU duplicates create inventory conflicts, so clean lists early.",
  },
  {
    slug: "dedupe-contact-names",
    title: "Dedupe Contact Names",
    description:
      "Remove duplicate contact names from exports.",
    h1: "Dedupe Contact Names",
    primaryToolRoute: "/remove-duplicates",
    context: "contact exports",
    audience: "sales teams",
    goal: "outreach lists stay accurate",
    detail:
      "Cleaning duplicates prevents double emailing and missed follow ups.",
  },
  {
    slug: "dedupe-search-queries",
    title: "Dedupe Search Queries",
    description:
      "Remove duplicate search queries for cleaner analysis.",
    h1: "Dedupe Search Queries",
    primaryToolRoute: "/remove-duplicates",
    context: "search query lists",
    audience: "SEO analysts",
    goal: "query analysis stays focused on unique intent",
    detail:
      "Deduped queries help you cluster intent more reliably.",
  },
  {
    slug: "dedupe-customer-ids",
    title: "Dedupe Customer IDs",
    description:
      "Remove duplicate customer IDs before imports.",
    h1: "Dedupe Customer IDs",
    primaryToolRoute: "/remove-duplicates",
    context: "customer ID lists",
    audience: "ops teams",
    goal: "imports avoid duplicate records",
    detail:
      "Clean IDs prevent duplicate accounts and billing issues.",
  },
  {
    slug: "dedupe-url-list",
    title: "Dedupe URL Lists",
    description:
      "Remove duplicate URLs from link lists or audits.",
    h1: "Dedupe URL Lists",
    primaryToolRoute: "/remove-duplicates",
    context: "URL lists",
    audience: "SEO teams",
    goal: "audits focus on unique pages",
    detail:
      "Unique URL lists make crawl budgets easier to plan.",
  },
  {
    slug: "dedupe-inventory-items",
    title: "Dedupe Inventory Item Lists",
    description:
      "Remove duplicate inventory items before stock checks.",
    h1: "Dedupe Inventory Item Lists",
    primaryToolRoute: "/remove-duplicates",
    context: "inventory lists",
    audience: "operations teams",
    goal: "stock checks stay accurate",
    detail:
      "Duplicate items can cause double counting in audits.",
  },
  {
    slug: "dedupe-support-tickets",
    title: "Dedupe Support Ticket Lists",
    description:
      "Remove duplicate ticket IDs before reporting.",
    h1: "Dedupe Support Ticket Lists",
    primaryToolRoute: "/remove-duplicates",
    context: "support ticket exports",
    audience: "support teams",
    goal: "reports reflect unique tickets",
    detail:
      "Deduped ticket lists improve SLA reporting accuracy.",
  },
  {
    slug: "dedupe-question-bank",
    title: "Dedupe Question Banks",
    description:
      "Remove duplicate questions from exam banks.",
    h1: "Dedupe Question Banks",
    primaryToolRoute: "/remove-duplicates",
    context: "question banks",
    audience: "educators",
    goal: "question sets stay unique",
    detail:
      "Deduped banks reduce repetition in tests and quizzes.",
  },
  {
    slug: "dedupe-job-applicants",
    title: "Dedupe Job Applicant Lists",
    description:
      "Remove duplicate applicants before review.",
    h1: "Dedupe Job Applicant Lists",
    primaryToolRoute: "/remove-duplicates",
    context: "applicant lists",
    audience: "recruiting teams",
    goal: "review pipelines stay clean",
    detail:
      "Deduped lists prevent repeated reviews and follow ups.",
  },
  {
    slug: "dedupe-analytics-events",
    title: "Dedupe Analytics Event Names",
    description:
      "Remove duplicate analytics event names for cleaner tracking.",
    h1: "Dedupe Analytics Event Names",
    primaryToolRoute: "/remove-duplicates",
    context: "analytics event lists",
    audience: "growth teams",
    goal: "tracking plans stay clean",
    detail:
      "Unique event names make dashboards easier to manage.",
  },
  {
    slug: "dedupe-order-ids",
    title: "Dedupe Order ID Lists",
    description:
      "Remove duplicate order IDs before reconciliation.",
    h1: "Dedupe Order ID Lists",
    primaryToolRoute: "/remove-duplicates",
    context: "order ID lists",
    audience: "finance teams",
    goal: "reconciliation reports stay accurate",
    detail:
      "Duplicate orders can inflate revenue reporting.",
  },
  {
    slug: "dedupe-email-addresses",
    title: "Dedupe Email Address Lists",
    description:
      "Remove duplicate emails before sending campaigns.",
    h1: "Dedupe Email Address Lists",
    primaryToolRoute: "/remove-duplicates",
    context: "email lists",
    audience: "marketing teams",
    goal: "outreach avoids duplicate sends",
    detail:
      "Deduped lists reduce spam complaints and double sends.",
  },
  {
    slug: "dedupe-csv-headers",
    title: "Dedupe CSV Header Lists",
    description:
      "Remove duplicate CSV headers during cleanup.",
    h1: "Dedupe CSV Header Lists",
    primaryToolRoute: "/remove-duplicates",
    context: "CSV header lists",
    audience: "data teams",
    goal: "files import without header errors",
    detail:
      "Duplicate headers cause import issues, so remove them before upload.",
  },
  {
    slug: "dedupe-restaurant-menu-items",
    title: "Dedupe Restaurant Menu Items",
    description:
      "Remove duplicate menu items before publishing.",
    h1: "Dedupe Restaurant Menu Items",
    primaryToolRoute: "/remove-duplicates",
    context: "menu item lists",
    audience: "restaurant teams",
    goal: "menus stay clean and consistent",
    detail:
      "Duplicate items confuse customers and complicate ordering.",
  },
  {
    slug: "clean-text-for-import",
    title: "Clean Text for Imports",
    description:
      "Prepare text for imports by removing blanks, duplicates, and extra spaces.",
    h1: "Clean Text for Imports",
    primaryToolRoute: "/text-cleaner",
    context: "import lists",
    audience: "operations teams",
    goal: "imports run without errors",
    detail:
      "Cleaning ahead of time prevents failed uploads and rework.",
  },
  {
    slug: "clean-survey-responses",
    title: "Clean Survey Responses",
    description:
      "Clean survey responses by removing blanks and duplicates.",
    h1: "Clean Survey Responses",
    primaryToolRoute: "/text-cleaner",
    context: "survey response lists",
    audience: "research teams",
    goal: "analysis stays focused on real responses",
    detail:
      "Removing blanks makes response counts more accurate.",
  },
  {
    slug: "clean-email-list",
    title: "Clean Email Lists",
    description:
      "Remove duplicates, blanks, and extra spaces from email lists.",
    h1: "Clean Email Lists",
    primaryToolRoute: "/text-cleaner",
    context: "email lists",
    audience: "email marketers",
    goal: "campaigns avoid duplicate sends",
    detail:
      "Extra spaces can cause invalid addresses, so cleaning helps deliverability.",
  },
  {
    slug: "clean-product-listings",
    title: "Clean Product Listing Text",
    description:
      "Clean product listings by removing blanks and extra spaces.",
    h1: "Clean Product Listing Text",
    primaryToolRoute: "/text-cleaner",
    context: "product listings",
    audience: "ecommerce teams",
    goal: "catalogs look consistent",
    detail:
      "Cleaning listings prevents duplicated items and messy spacing in feeds.",
  },
  {
    slug: "clean-chat-transcript",
    title: "Clean Chat Transcripts",
    description:
      "Clean chat transcripts by removing blanks and duplicates.",
    h1: "Clean Chat Transcripts",
    primaryToolRoute: "/text-cleaner",
    context: "chat transcripts",
    audience: "support teams",
    goal: "transcripts are easier to analyze",
    detail:
      "Removing blank lines keeps the timeline readable in exports.",
  },
  {
    slug: "clean-meeting-notes",
    title: "Clean Meeting Notes",
    description:
      "Clean meeting notes by removing blanks and extra spacing.",
    h1: "Clean Meeting Notes",
    primaryToolRoute: "/text-cleaner",
    context: "meeting notes",
    audience: "team leads",
    goal: "notes are easy to share",
    detail:
      "Spacing cleanup helps action items stand out in recaps.",
  },
  {
    slug: "clean-spreadsheet-export",
    title: "Clean Spreadsheet Exports",
    description:
      "Clean spreadsheet exports by removing blanks and duplicates.",
    h1: "Clean Spreadsheet Exports",
    primaryToolRoute: "/text-cleaner",
    context: "spreadsheet exports",
    audience: "analysts",
    goal: "exports are ready for analysis",
    detail:
      "Removing extra spaces prevents split rows in downstream tools.",
  },
  {
    slug: "clean-vendor-list",
    title: "Clean Vendor Lists",
    description:
      "Clean vendor lists by removing duplicates and extra spacing.",
    h1: "Clean Vendor Lists",
    primaryToolRoute: "/text-cleaner",
    context: "vendor lists",
    audience: "procurement teams",
    goal: "vendor records stay accurate",
    detail:
      "Deduped lists prevent duplicate payments and onboarding work.",
  },
  {
    slug: "clean-app-usernames",
    title: "Clean App Usernames",
    description:
      "Clean username lists by removing blanks and extra spaces.",
    h1: "Clean App Usernames",
    primaryToolRoute: "/text-cleaner",
    context: "username lists",
    audience: "community managers",
    goal: "member lists stay clean",
    detail:
      "Whitespace cleanup reduces duplicates caused by trailing spaces.",
  },
  {
    slug: "clean-address-list",
    title: "Clean Address Lists",
    description:
      "Clean address lists by removing blanks and extra spaces.",
    h1: "Clean Address Lists",
    primaryToolRoute: "/text-cleaner",
    context: "address lists",
    audience: "operations teams",
    goal: "shipping data stays accurate",
    detail:
      "Extra spaces can break imports into shipping systems.",
  },
  {
    slug: "clean-press-mentions",
    title: "Clean Press Mention Lists",
    description:
      "Clean press mention lists by removing duplicates and blanks.",
    h1: "Clean Press Mention Lists",
    primaryToolRoute: "/text-cleaner",
    context: "press mention lists",
    audience: "PR teams",
    goal: "reports stay tidy",
    detail:
      "Deduped lists make coverage tracking easier to summarize.",
  },
  {
    slug: "clean-research-notes",
    title: "Clean Research Notes",
    description:
      "Clean research notes by removing blanks and extra spaces.",
    h1: "Clean Research Notes",
    primaryToolRoute: "/text-cleaner",
    context: "research notes",
    audience: "researchers",
    goal: "notes stay readable and structured",
    detail:
      "Cleaning notes reduces the time spent formatting later.",
  },
  {
    slug: "clean-support-macros",
    title: "Clean Support Macro Lists",
    description:
      "Clean support macro lists by removing duplicates and extra spaces.",
    h1: "Clean Support Macro Lists",
    primaryToolRoute: "/text-cleaner",
    context: "support macro lists",
    audience: "support teams",
    goal: "macros stay organized",
    detail:
      "Clean lists make it easier to spot outdated responses.",
  },
  {
    slug: "clean-ebook-manuscript-notes",
    title: "Clean Ebook Manuscript Notes",
    description:
      "Clean manuscript notes by removing blanks and extra spaces.",
    h1: "Clean Ebook Manuscript Notes",
    primaryToolRoute: "/text-cleaner",
    context: "manuscript notes",
    audience: "authors",
    goal: "notes stay usable during editing",
    detail:
      "Clean notes are easier to copy into the final manuscript.",
  },
  {
    slug: "clean-social-media-bulk",
    title: "Clean Bulk Social Captions",
    description:
      "Clean bulk social captions by removing blanks and extra spaces.",
    h1: "Clean Bulk Social Captions",
    primaryToolRoute: "/text-cleaner",
    context: "bulk social captions",
    audience: "social teams",
    goal: "captions stay consistent across posts",
    detail:
      "Cleaning bulk captions prevents odd spacing in scheduled posts.",
  },
  {
    slug: "clean-link-collection",
    title: "Clean Link Collections",
    description:
      "Clean link collections by removing duplicates and blanks.",
    h1: "Clean Link Collections",
    primaryToolRoute: "/text-cleaner",
    context: "link collections",
    audience: "researchers",
    goal: "lists stay easy to browse",
    detail:
      "Deduped links keep research reports tidy.",
  },
  {
    slug: "clean-warehouse-picklist",
    title: "Clean Warehouse Picklists",
    description:
      "Clean picklists by removing blanks, duplicates, and spacing issues.",
    h1: "Clean Warehouse Picklists",
    primaryToolRoute: "/text-cleaner",
    context: "warehouse picklists",
    audience: "operations teams",
    goal: "picklists are accurate",
    detail:
      "Cleaning reduces mistakes during packing and shipping.",
  },
  {
    slug: "clean-inventory-counts",
    title: "Clean Inventory Count Lists",
    description:
      "Clean inventory count lists by removing blanks and duplicates.",
    h1: "Clean Inventory Count Lists",
    primaryToolRoute: "/text-cleaner",
    context: "inventory count lists",
    audience: "inventory teams",
    goal: "counts stay accurate",
    detail:
      "Removing duplicates prevents double counting during audits.",
  },
  {
    slug: "clean-metadata-tags",
    title: "Clean Metadata Tag Lists",
    description:
      "Clean metadata tag lists by removing blanks and extra spaces.",
    h1: "Clean Metadata Tag Lists",
    primaryToolRoute: "/text-cleaner",
    context: "metadata tag lists",
    audience: "content teams",
    goal: "tags stay consistent",
    detail:
      "Clean tags improve filtering and search across content systems.",
  },
  {
    slug: "clean-keyword-list",
    title: "Clean Keyword Lists",
    description:
      "Clean keyword lists by removing blanks and duplicates.",
    h1: "Clean Keyword Lists",
    primaryToolRoute: "/text-cleaner",
    context: "keyword lists",
    audience: "SEO teams",
    goal: "keyword research stays organized",
    detail:
      "Cleaning keywords makes clustering and analysis much easier.",
  },
];
const TEXT_TO_SPEECH_SEEDS: TextToSpeechSeed[] = [
  {
    slug: "text-to-speech-for-proofreading",
    title: "Text to Speech for Proofreading",
    description:
      "Listen to drafts to catch mistakes and awkward phrasing.",
    h1: "Text to Speech for Proofreading",
    primaryToolRoute: "/text-to-speech",
    context: "drafts and articles",
    audience: "editors",
    goal: "catch errors that silent reading misses",
    detail:
      "Hearing the text makes repeated words and missing transitions easier to spot.",
  },
  {
    slug: "text-to-speech-for-studying",
    title: "Text to Speech for Studying",
    description:
      "Listen to study notes to reinforce memory and focus.",
    h1: "Text to Speech for Studying",
    primaryToolRoute: "/text-to-speech",
    context: "study notes",
    audience: "students",
    goal: "review material while multitasking",
    detail:
      "Audio review helps you revisit notes without being tied to a screen.",
  },
  {
    slug: "text-to-speech-for-language-learning",
    title: "Text to Speech for Language Learning",
    description:
      "Hear pronunciation for vocabulary and phrases.",
    h1: "Text to Speech for Language Learning",
    primaryToolRoute: "/text-to-speech",
    context: "language practice text",
    audience: "language learners",
    goal: "practice pronunciation and rhythm",
    detail:
      "Listening helps you compare your own pronunciation to the audio.",
  },
  {
    slug: "text-to-speech-for-accessibility",
    title: "Text to Speech for Accessibility",
    description:
      "Turn text into audio for easier access and review.",
    h1: "Text to Speech for Accessibility",
    primaryToolRoute: "/text-to-speech",
    context: "long form content",
    audience: "readers",
    goal: "consume content without eye strain",
    detail:
      "Audio playback makes long documents more accessible and less tiring.",
  },
  {
    slug: "text-to-speech-for-presentations",
    title: "Text to Speech for Presentations",
    description:
      "Rehearse presentation scripts with audio playback.",
    h1: "Text to Speech for Presentations",
    primaryToolRoute: "/text-to-speech",
    context: "presentation scripts",
    audience: "speakers",
    goal: "test pacing before delivery",
    detail:
      "Playback highlights sections that sound rushed or too long.",
  },
  {
    slug: "text-to-speech-from-notes",
    title: "Text to Speech from Notes",
    description:
      "Listen to notes to prepare for meetings or exams.",
    h1: "Text to Speech from Notes",
    primaryToolRoute: "/text-to-speech",
    context: "notes",
    audience: "professionals",
    goal: "review key points quickly",
    detail:
      "Audio review helps you absorb summaries while commuting or walking.",
  },
  {
    slug: "text-to-speech-for-commutes",
    title: "Text to Speech for Commutes",
    description:
      "Turn text into audio so you can listen on the go.",
    h1: "Text to Speech for Commutes",
    primaryToolRoute: "/text-to-speech",
    context: "articles and updates",
    audience: "busy teams",
    goal: "stay informed while traveling",
    detail:
      "Listening during commutes keeps you caught up without extra screen time.",
  },
  {
    slug: "text-to-speech-for-editing-scripts",
    title: "Text to Speech for Editing Scripts",
    description:
      "Listen to scripts to improve flow and timing.",
    h1: "Text to Speech for Editing Scripts",
    primaryToolRoute: "/text-to-speech",
    context: "video scripts",
    audience: "creators",
    goal: "tighten delivery and transitions",
    detail:
      "Audio playback makes it easier to spot sections that drag.",
  },
  {
    slug: "text-to-speech-for-rehearsal",
    title: "Text to Speech for Rehearsal",
    description:
      "Use audio playback to rehearse talks and speeches.",
    h1: "Text to Speech for Rehearsal",
    primaryToolRoute: "/text-to-speech",
    context: "speech scripts",
    audience: "speakers",
    goal: "rehearse timing and emphasis",
    detail:
      "Listening to the script helps you identify spots that need emphasis.",
  },
  {
    slug: "text-to-speech-for-screen-fatigue",
    title: "Text to Speech to Reduce Screen Fatigue",
    description:
      "Listen to content to reduce screen time and eye strain.",
    h1: "Text to Speech to Reduce Screen Fatigue",
    primaryToolRoute: "/text-to-speech",
    context: "long documents",
    audience: "knowledge workers",
    goal: "reduce screen fatigue while reviewing content",
    detail:
      "Audio playback gives your eyes a break during long reading sessions.",
  },
];

const RAW_USE_CASES: UseCase[] = [
  ...WORD_LIMIT_SEEDS.map((seed, index) => buildUseCase(seed, index)),
  ...CASE_FORMAT_SEEDS.map((seed, index) => buildUseCase(seed, index)),
  ...CLEAN_SEEDS.map((seed, index) => buildUseCase(seed, index)),
  ...TEXT_TO_SPEECH_SEEDS.map((seed, index) => buildUseCase(seed, index)),
];

function attachRelatedSlugs(useCases: UseCase[]) {
  const byCategory = new Map<string, UseCase[]>();
  for (const useCase of useCases) {
    const category = getCategoryForToolRoute(useCase.primaryToolRoute);
    const list = byCategory.get(category) ?? [];
    list.push(useCase);
    byCategory.set(category, list);
  }

  return useCases.map((useCase) => {
    const category = getCategoryForToolRoute(useCase.primaryToolRoute);
    const list = byCategory.get(category) ?? [];
    const index = list.findIndex((item) => item.slug === useCase.slug);
    const relatedSlugs = [
      list[(index + 1) % list.length]?.slug,
      list[(index + 2) % list.length]?.slug,
      list[(index + 3) % list.length]?.slug,
    ].filter(Boolean) as string[];

    return {
      ...useCase,
      relatedSlugs,
    };
  });
}

export const USE_CASES = attachRelatedSlugs(RAW_USE_CASES);
