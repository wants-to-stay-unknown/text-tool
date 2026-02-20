import { TOOLS } from "./tools";

export type UseCaseFaq = {
  question: string;
  answer: string;
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
  keywords?: string[];
};

export const USE_CASES: UseCase[] = [
  {
    slug: "word-count-essay-500-1000-words",
    title: "Word Count for 500 to 1000 Word Essays",
    description:
      "Count words for 500 to 1000 word essays, estimate pages, and align your draft with academic limits.",
    h1: "Word Count for 500 to 1000 Word Essays",
    primaryToolRoute: "/word-counter",
    intro: [
      "Essay assignments often land in the 500 to 1000 word range because it is long enough to build an argument but short enough to grade quickly. The fastest way to stay within the limit is to track word count as you draft. This page helps you measure length in seconds so you do not have to wait until the end to discover you are 200 words over.",
      "Use the word counter to check total words, characters, and spacing. You can also estimate page length and speaking time if you plan to present the essay aloud. By checking length early, you can decide whether to expand a key paragraph or trim redundant sentences before polishing the final version.",
    ],
    steps: [
      "Paste your draft into the word counter.",
      "Review the total word count and characters.",
      "Compare your total to the assignment target.",
      "Trim repeated ideas or add evidence to close the gap.",
      "Recheck after revisions to confirm the final length.",
    ],
    faq: [
      {
        question: "Is 500 words double spaced about two pages?",
        answer:
          "Yes, double spaced pages are often around 250 words each, so 500 words is roughly two pages.",
      },
      {
        question: "Should the title page count toward the word limit?",
        answer:
          "Most instructors exclude the title page. Check the assignment guidelines to be sure.",
      },
      {
        question: "How accurate is the count if I paste from Google Docs?",
        answer:
          "It is accurate. The counter looks at the text you paste and ignores formatting.",
      },
    ],
    relatedSlugs: [
      "word-count-college-application",
      "word-count-blog-post",
      "word-count-speech-time-estimator",
    ],
    keywords: ["500 word essay", "1000 word essay", "essay word count"],
  },
  {
    slug: "word-count-college-application",
    title: "College Application Word Count Helper",
    description:
      "Track college application essay word count and stay within common limits for admissions prompts.",
    h1: "College Application Word Count Helper",
    primaryToolRoute: "/word-counter",
    intro: [
      "College application essays usually have strict word limits, and going over can weaken your chances. The easiest way to stay compliant is to count words as you draft, not after you are finished. This page helps you measure your response quickly so you can keep the focus on the story you are telling.",
      "Paste your draft into the counter to see word and character totals immediately. If you are close to the limit, use the count to decide what to cut without losing key details. For short prompts, the character count can be just as helpful as the word count.",
    ],
    steps: [
      "Paste your essay draft into the word counter.",
      "Check the word total against the application limit.",
      "Scan for sentences that repeat the same idea.",
      "Tighten language and remove filler words.",
      "Recount to confirm you are within the limit.",
    ],
    faq: [
      {
        question: "Do the Common App word limits allow a few extra words?",
        answer:
          "Most portals enforce the limit strictly, so it is safest to stay under it.",
      },
      {
        question: "Should I track character count too?",
        answer:
          "Yes, some applications use character limits or display your text in a limited field.",
      },
      {
        question: "How often should I recheck the count?",
        answer:
          "Recheck after each editing pass to make sure changes did not push you over.",
      },
    ],
    relatedSlugs: [
      "word-count-essay-500-1000-words",
      "word-count-resume-summary",
      "word-count-blog-post",
    ],
  },
  {
    slug: "word-count-blog-post",
    title: "Word Count for Blog Posts",
    description:
      "Measure blog post word count to hit your target length and keep readability on track.",
    h1: "Word Count for Blog Posts",
    primaryToolRoute: "/word-counter",
    intro: [
      "Blog posts perform best when they match the intent of the reader. Some topics need 600 words, while others require 1500 or more. Tracking word count while you draft helps you align with your content plan and avoids last minute rewrites that can hurt clarity.",
      "Use the word counter to monitor total words, characters, and paragraphs as you write. If your post feels thin, check the word count and add supporting examples. If it is too long, cut repetitive sections and keep the strongest points.",
    ],
    steps: [
      "Paste your post or outline into the word counter.",
      "Compare the total to your content brief.",
      "Expand thin sections with examples or data.",
      "Trim repeated ideas to improve flow.",
      "Do a final count before publishing.",
    ],
    faq: [
      {
        question: "What is a good word count for SEO?",
        answer:
          "There is no single number, but most strong posts are 800 to 2000 words depending on intent.",
      },
      {
        question: "Should I count headlines and captions?",
        answer:
          "Yes, include everything that will be published on the page.",
      },
      {
        question: "Can I use this for newsletter drafts too?",
        answer:
          "Yes, paste any draft to track length consistently.",
      },
    ],
    relatedSlugs: [
      "word-count-book-chapter",
      "word-count-youtube-script",
      "word-count-google-docs-paste",
    ],
  },
  {
    slug: "word-count-youtube-script",
    title: "Word Count for YouTube Scripts",
    description:
      "Estimate YouTube script length and speaking time with a fast word counter.",
    h1: "Word Count for YouTube Scripts",
    primaryToolRoute: "/word-counter",
    intro: [
      "YouTube scripts are usually timed in minutes, not pages, so word count is the fastest way to estimate length. A typical speaking pace is 130 to 160 words per minute, which means a 1200 word script often lands around eight to nine minutes.",
      "Paste your script to see the total word count and then compare it with your target video length. If the script is too long, tighten intros and remove redundant lines. If it is short, add examples or a clearer call to action.",
    ],
    steps: [
      "Paste your script into the word counter.",
      "Check the total words and estimate speaking time.",
      "Compare the timing with your video plan.",
      "Trim or expand sections to hit the target.",
      "Recount after edits to confirm the final length.",
    ],
    faq: [
      {
        question: "How many words per minute should I use?",
        answer:
          "Most narrations land between 130 and 160 words per minute, depending on pacing.",
      },
      {
        question: "Should I count on-screen text?",
        answer:
          "Count only the spoken script for time estimates.",
      },
      {
        question: "Can I count multiple speakers?",
        answer:
          "Yes, paste the full script to measure total spoken words.",
      },
    ],
    relatedSlugs: [
      "word-count-speech-time-estimator",
      "word-count-blog-post",
      "word-count-book-chapter",
    ],
  },
  {
    slug: "word-count-instagram-caption",
    title: "Word Count for Instagram Captions",
    description:
      "Check Instagram caption length and keep posts concise and readable.",
    h1: "Word Count for Instagram Captions",
    primaryToolRoute: "/word-counter",
    intro: [
      "Instagram captions often perform best when they are short and scannable. Counting words helps you keep the main message near the top so it shows in the preview. This is especially useful when you are testing hooks or calls to action.",
      "Paste your caption to see the word and character totals immediately. If the count is high, tighten the first sentence and move secondary details into a comment or carousel.",
    ],
    steps: [
      "Paste your caption draft into the counter.",
      "Review the word count and characters.",
      "Shorten the opening line for the preview.",
      "Remove filler and keep the call to action clear.",
      "Recheck the count before posting.",
    ],
    faq: [
      {
        question: "Does Instagram limit caption length?",
        answer:
          "Yes, but the more important limit is how much shows before the cut in the preview.",
      },
      {
        question: "Should hashtags count?",
        answer:
          "Yes, hashtags add words and characters, so include them in the count.",
      },
      {
        question: "Can I measure carousel captions too?",
        answer:
          "Yes, paste the caption text for any post type.",
      },
    ],
    relatedSlugs: [
      "word-count-twitter-x-character-limit",
      "word-count-resume-summary",
      "word-count-google-docs-paste",
    ],
  },
  {
    slug: "word-count-twitter-x-character-limit",
    title: "Word Count for Twitter/X Character Limits",
    description:
      "Measure word and character count for Twitter/X posts to avoid truncation.",
    h1: "Word Count for Twitter/X Character Limits",
    primaryToolRoute: "/word-counter",
    intro: [
      "Twitter/X limits posts by characters, but word count helps you keep the message tight. Measuring both makes it easier to fit links, mentions, and hashtags without surprise truncation.",
      "Paste your draft to see character counts with and without spaces. If you are close to the limit, shorten a clause, remove extra punctuation, or swap a long word for a shorter alternative.",
    ],
    steps: [
      "Paste your post into the counter.",
      "Check the character count with spaces.",
      "Trim the message if you are near the limit.",
      "Recount after edits to confirm it fits.",
      "Save a shorter backup version for quick posting.",
    ],
    faq: [
      {
        question: "Should I include the URL in the count?",
        answer:
          "Yes, include the full text to capture the final character count.",
      },
      {
        question: "Why check word count if X uses characters?",
        answer:
          "Word count helps you judge brevity and readability while you optimize characters.",
      },
      {
        question: "Do emojis count as characters?",
        answer:
          "Yes, emojis count toward the limit and should be included.",
      },
    ],
    relatedSlugs: [
      "word-count-instagram-caption",
      "word-count-resume-summary",
      "word-count-google-docs-paste",
    ],
  },
  {
    slug: "word-count-resume-summary",
    title: "Word Count for Resume Summaries",
    description:
      "Keep resume summaries concise by checking word count as you edit.",
    h1: "Word Count for Resume Summaries",
    primaryToolRoute: "/word-counter",
    intro: [
      "A resume summary should be short, clear, and easy to scan. Word count is a quick way to keep the section concise so recruiters can digest your value in seconds.",
      "Paste your summary to see the total words and characters. If you are above your target length, remove repetition and focus on the most measurable outcomes. If it is too short, add a specific result or key specialization.",
    ],
    steps: [
      "Paste your summary into the word counter.",
      "Aim for a compact range, such as 50 to 80 words.",
      "Remove redundant adjectives and filler phrases.",
      "Add one measurable outcome if it feels thin.",
      "Recount to confirm the final length.",
    ],
    faq: [
      {
        question: "How long should a resume summary be?",
        answer:
          "Most summaries perform well at 3 to 5 short sentences or roughly 50 to 80 words.",
      },
      {
        question: "Should I count bullet points in the summary?",
        answer:
          "Yes, include the full summary section in the count.",
      },
      {
        question: "Can I use the same tool for cover letters?",
        answer:
          "Yes, paste any text to measure length quickly.",
      },
    ],
    relatedSlugs: [
      "word-count-college-application",
      "word-count-essay-500-1000-words",
      "word-count-blog-post",
    ],
  },
  {
    slug: "word-count-book-chapter",
    title: "Word Count for Book Chapters",
    description:
      "Measure book chapter length and track progress against your writing goals.",
    h1: "Word Count for Book Chapters",
    primaryToolRoute: "/word-counter",
    intro: [
      "Book chapters can vary widely in length, but most authors still want consistency across the manuscript. Word count helps you set a target per chapter so the pacing stays even and the total book length remains predictable.",
      "Paste a draft chapter to see the word and character totals. If a chapter is running long, identify a section that can be moved or trimmed. If it is short, add a scene, example, or detail that improves flow.",
    ],
    steps: [
      "Paste the chapter draft into the counter.",
      "Compare the total to your target range.",
      "Trim or expand sections to balance pacing.",
      "Recount after edits for accuracy.",
      "Repeat for each chapter to track progress.",
    ],
    faq: [
      {
        question: "How long is a typical chapter?",
        answer:
          "Many chapters fall between 2000 and 5000 words, but genres vary widely.",
      },
      {
        question: "Should I include chapter titles in the count?",
        answer:
          "Yes, include all text that will appear in the final manuscript.",
      },
      {
        question: "Can I use this for nonfiction sections too?",
        answer:
          "Yes, it works for any type of chapter or section.",
      },
    ],
    relatedSlugs: [
      "word-count-blog-post",
      "word-count-youtube-script",
      "word-count-speech-time-estimator",
    ],
  },
  {
    slug: "word-count-speech-time-estimator",
    title: "Word Count for Speech Time Estimates",
    description:
      "Estimate speech length by counting words and converting to speaking time.",
    h1: "Word Count for Speech Time Estimates",
    primaryToolRoute: "/word-counter",
    intro: [
      "Speech timing depends on word count and speaking pace. Counting words gives you a fast estimate of how long a speech will take, which is essential for meetings, presentations, and ceremonies.",
      "Paste your speech to see the total words and then calculate a rough duration using average speaking rates. If the timing is off, you can tighten the intro or add transitions until the speech fits the slot.",
    ],
    steps: [
      "Paste your speech script into the counter.",
      "Use the word total to estimate speaking time.",
      "Adjust for a slower or faster speaking pace.",
      "Trim or expand sections to fit the time limit.",
      "Recount to validate the final timing.",
    ],
    faq: [
      {
        question: "What is a common speaking rate?",
        answer:
          "A typical pace is around 130 to 160 words per minute for clear delivery.",
      },
      {
        question: "Should I include pauses in the estimate?",
        answer:
          "Yes, add a buffer for pauses, emphasis, and audience reactions.",
      },
      {
        question: "Can I use this for podcast scripts?",
        answer:
          "Yes, word count is a helpful timing estimator for audio scripts too.",
      },
    ],
    relatedSlugs: [
      "word-count-youtube-script",
      "word-count-essay-500-1000-words",
      "word-count-book-chapter",
    ],
  },
  {
    slug: "word-count-google-docs-paste",
    title: "Word Count for Google Docs Text",
    description:
      "Paste text from Google Docs to get quick word and character counts.",
    h1: "Word Count for Google Docs Text",
    primaryToolRoute: "/word-counter",
    intro: [
      "Google Docs has built-in counts, but sometimes you need a quick check without digging through menus or sharing access. Pasting your text into a fast counter gives you an instant view of words, characters, and spacing.",
      "Copy the section you are working on and paste it below. The counter ignores formatting, so it works for essays, reports, or notes. This is especially helpful when you are revising a small section and want to verify the length quickly.",
    ],
    steps: [
      "Copy the text from Google Docs.",
      "Paste it into the word counter.",
      "Check the word and character totals.",
      "Edit your Doc based on the results.",
      "Paste again to confirm changes.",
    ],
    faq: [
      {
        question: "Does formatting change the count?",
        answer:
          "No, the counter uses plain text, so formatting does not affect the total.",
      },
      {
        question: "Can I paste a full document?",
        answer:
          "Yes, large documents are supported within the input limit.",
      },
      {
        question: "Will this store my text?",
        answer:
          "No, the text stays in your browser and is not saved.",
      },
    ],
    relatedSlugs: [
      "word-count-blog-post",
      "word-count-instagram-caption",
      "word-count-twitter-x-character-limit",
    ],
  },
  {
    slug: "convert-to-uppercase",
    title: "Convert Text to Uppercase",
    description:
      "Convert any text to uppercase for headings, labels, or emphasis instantly.",
    h1: "Convert Text to Uppercase",
    primaryToolRoute: "/case-converter",
    intro: [
      "Uppercase text is useful for headings, labels, and short phrases that need extra emphasis. Converting manually can introduce mistakes, especially if you are handling a lot of text or multiple lines. This page lets you transform a block of text to uppercase in seconds.",
      "Paste your text and choose the uppercase option to standardize the output. The conversion keeps line breaks intact, so it works for lists, tables, and UI labels. Use it when you need consistent formatting without manual retyping.",
    ],
    steps: [
      "Paste or type your text into the converter.",
      "Select the uppercase mode.",
      "Review the output for consistency.",
      "Copy the converted text.",
      "Paste it into your document or design.",
    ],
    faq: [
      {
        question: "Will uppercase change numbers or symbols?",
        answer:
          "No, numbers and symbols remain the same. Only letters are converted.",
      },
      {
        question: "Does it keep line breaks?",
        answer:
          "Yes, line breaks and spacing are preserved.",
      },
      {
        question: "Can I convert multiple lines at once?",
        answer:
          "Yes, the tool supports long multi-line text blocks.",
      },
    ],
    relatedSlugs: [
      "convert-to-lowercase",
      "title-case-generator",
      "capitalize-each-word",
    ],
  },
  {
    slug: "convert-to-lowercase",
    title: "Convert Text to Lowercase",
    description:
      "Convert text to lowercase for consistent formatting and clean data.",
    h1: "Convert Text to Lowercase",
    primaryToolRoute: "/case-converter",
    intro: [
      "Lowercase text is often required for usernames, file names, tags, and normalizing datasets. Manually changing case is slow and easy to mess up when you have large blocks of text.",
      "Use the lowercase converter to standardize your text with one click. It keeps line breaks intact and is ideal for cleaning pasted lists, preparing data for comparison, or formatting copy to match a style guide.",
    ],
    steps: [
      "Paste the text you want to normalize.",
      "Select the lowercase option.",
      "Verify the output formatting.",
      "Copy the result into your destination.",
      "Repeat for additional text blocks.",
    ],
    faq: [
      {
        question: "Is lowercase useful for data cleanup?",
        answer:
          "Yes, it helps you compare strings consistently and remove case-related duplicates.",
      },
      {
        question: "Does it change punctuation?",
        answer:
          "No, punctuation and symbols remain unchanged.",
      },
      {
        question: "Can I convert CSV columns?",
        answer:
          "Yes, paste the column values and convert them together.",
      },
    ],
    relatedSlugs: [
      "convert-to-uppercase",
      "sentence-case-converter",
      "remove-extra-spaces-and-fix-case",
    ],
  },
  {
    slug: "title-case-generator",
    title: "Title Case Generator",
    description:
      "Convert titles and headings to consistent title case formatting.",
    h1: "Title Case Generator",
    primaryToolRoute: "/case-converter",
    intro: [
      "Title case is common for headlines, product names, and article titles, but it is easy to apply inconsistently. A title case generator helps you standardize capitalization across every word in a heading without manual edits.",
      "Paste your headline or list of titles, select title case, and review the result. This is especially helpful when you are prepping blog posts, presentation slides, or product listings where consistent headings improve readability.",
    ],
    steps: [
      "Paste a headline or list of titles.",
      "Choose the title case option.",
      "Review the output for accuracy.",
      "Copy and paste into your document.",
      "Save the formatting rules for future use.",
    ],
    faq: [
      {
        question: "Does title case capitalize every word?",
        answer:
          "The tool capitalizes each word uniformly, which matches many modern style guides.",
      },
      {
        question: "Can I use it for multiple titles?",
        answer:
          "Yes, paste multiple lines to convert them together.",
      },
      {
        question: "Will it keep existing punctuation?",
        answer:
          "Yes, punctuation and line breaks stay the same.",
      },
    ],
    relatedSlugs: [
      "capitalize-each-word",
      "sentence-case-converter",
      "convert-to-uppercase",
    ],
  },
  {
    slug: "sentence-case-converter",
    title: "Sentence Case Converter",
    description:
      "Convert text to sentence case for readable paragraphs and captions.",
    h1: "Sentence Case Converter",
    primaryToolRoute: "/case-converter",
    intro: [
      "Sentence case is the most readable format for paragraphs, emails, and captions. It capitalizes the first word of each sentence and keeps the rest lower case for a natural flow.",
      "Paste your text and apply sentence case to quickly fix content that was typed in all caps or inconsistent casing. This is a quick way to clean notes, drafts, or imported content before publishing.",
    ],
    steps: [
      "Paste the paragraph or caption you want to fix.",
      "Select the sentence case option.",
      "Review the output for readability.",
      "Copy and use the cleaned text.",
      "Re-run if you update the draft.",
    ],
    faq: [
      {
        question: "Does it handle multiple sentences?",
        answer:
          "Yes, the converter applies sentence case across the full text.",
      },
      {
        question: "Will it change acronyms?",
        answer:
          "Acronyms may be lowercased, so review and fix any that should stay uppercase.",
      },
      {
        question: "Can I use it on bullet lists?",
        answer:
          "Yes, it will convert each line in the list.",
      },
    ],
    relatedSlugs: [
      "title-case-generator",
      "convert-to-lowercase",
      "remove-extra-spaces-and-fix-case",
    ],
  },
  {
    slug: "camelcase-to-snakecase",
    title: "Convert camelCase to snake_case",
    description:
      "Convert camelCase identifiers to snake_case for APIs and databases.",
    h1: "Convert camelCase to snake_case",
    primaryToolRoute: "/case-converter",
    intro: [
      "Developers often need to translate camelCase variable names to snake_case for database columns or legacy APIs. Doing this manually for long lists is slow and error-prone, especially when acronyms or numbers are involved.",
      "Paste your identifiers and convert them in one pass. The output keeps line breaks, so you can paste in a list of field names and get a clean snake_case version to use in SQL or configuration files.",
    ],
    steps: [
      "Paste your camelCase list into the converter.",
      "Choose the snake_case option if available, or convert to lowercase first.",
      "Review the output for underscores.",
      "Copy the snake_case list into your system.",
      "Re-run if you add new identifiers.",
    ],
    faq: [
      {
        question: "Does it handle numbers in names?",
        answer:
          "Yes, numbers remain in place and the casing changes around them.",
      },
      {
        question: "Will it add underscores between words?",
        answer:
          "Yes, the conversion inserts underscores between word boundaries.",
      },
      {
        question: "Can I convert multiple lines at once?",
        answer:
          "Yes, paste a multi-line list for batch conversion.",
      },
    ],
    relatedSlugs: [
      "snakecase-to-camelcase",
      "convert-to-lowercase",
      "remove-extra-spaces-and-fix-case",
    ],
  },
  {
    slug: "snakecase-to-camelcase",
    title: "Convert snake_case to camelCase",
    description:
      "Convert snake_case identifiers to camelCase for front-end code.",
    h1: "Convert snake_case to camelCase",
    primaryToolRoute: "/case-converter",
    intro: [
      "If you are consuming an API or CSV data that uses snake_case, you may need camelCase identifiers for front-end code. Converting each field manually takes time and makes typos more likely.",
      "Paste your snake_case list and convert it to camelCase in seconds. The output keeps line breaks, so you can process a long list of field names and paste it directly into your codebase or mapping file.",
    ],
    steps: [
      "Paste snake_case field names into the converter.",
      "Select the camelCase option if available.",
      "Review the output for consistency.",
      "Copy and paste into your code.",
      "Repeat when new fields are added.",
    ],
    faq: [
      {
        question: "Does it keep underscores that are meaningful?",
        answer:
          "The conversion removes underscores, so review fields that should keep them.",
      },
      {
        question: "Will the first letter be lowercased?",
        answer:
          "Yes, camelCase typically starts with a lowercase letter.",
      },
      {
        question: "Can I convert CSV headers too?",
        answer:
          "Yes, paste your header row and convert it.",
      },
    ],
    relatedSlugs: [
      "camelcase-to-snakecase",
      "convert-to-lowercase",
      "capitalize-each-word",
    ],
  },
  {
    slug: "remove-extra-spaces-and-fix-case",
    title: "Remove Extra Spaces and Fix Case",
    description:
      "Clean pasted text by removing extra spaces and normalizing case.",
    h1: "Remove Extra Spaces and Fix Case",
    primaryToolRoute: "/case-converter",
    intro: [
      "Pasted text from documents or spreadsheets often contains extra spaces and inconsistent casing. Fixing this manually is tedious and can introduce mistakes.",
      "Use the case converter to normalize casing first, then tighten spacing to clean the final output. This makes your text easier to read and ready for publishing or data cleanup.",
    ],
    steps: [
      "Paste the text that includes extra spaces.",
      "Convert it to the desired case style.",
      "Remove double spaces manually or in your editor.",
      "Review the output for consistency.",
      "Copy the cleaned text into your destination.",
    ],
    faq: [
      {
        question: "Does the converter remove extra spaces automatically?",
        answer:
          "The converter focuses on casing. You can delete extra spaces afterward for a clean result.",
      },
      {
        question: "Which case style works best for cleanup?",
        answer:
          "Sentence case is usually the most readable for paragraphs.",
      },
      {
        question: "Can I clean multi-line text?",
        answer:
          "Yes, line breaks are preserved during conversion.",
      },
    ],
    relatedSlugs: [
      "sentence-case-converter",
      "convert-to-lowercase",
      "capitalize-each-word",
    ],
  },
  {
    slug: "capitalize-each-word",
    title: "Capitalize Each Word",
    description:
      "Capitalize each word for headings, lists, and formatted labels.",
    h1: "Capitalize Each Word",
    primaryToolRoute: "/case-converter",
    intro: [
      "Capitalizing each word can make headings and labels easier to scan. It is a common request for marketing copy, lists, or product names, but doing it manually can be inconsistent.",
      "Paste your text and use the case converter to apply a consistent capitalization format. The output preserves line breaks so you can apply this to long lists or multi-line content at once.",
    ],
    steps: [
      "Paste the text or list into the converter.",
      "Choose the title case or capitalize option.",
      "Review the output for any exceptions.",
      "Copy and paste into your document.",
      "Repeat for additional lists or headings.",
    ],
    faq: [
      {
        question: "Is this the same as title case?",
        answer:
          "It is similar, but title case rules can vary by style guide.",
      },
      {
        question: "Will it preserve line breaks?",
        answer:
          "Yes, the converter keeps line breaks intact.",
      },
      {
        question: "Can I use it for names or addresses?",
        answer:
          "Yes, but review proper nouns for accuracy.",
      },
    ],
    relatedSlugs: [
      "title-case-generator",
      "convert-to-uppercase",
      "sentence-case-converter",
    ],
  },
  {
    slug: "remove-duplicate-lines",
    title: "Remove Duplicate Lines from Text",
    description:
      "Remove duplicate lines from lists, logs, or exports while preserving order.",
    h1: "Remove Duplicate Lines from Text",
    primaryToolRoute: "/remove-duplicates",
    intro: [
      "When you copy data from logs, exports, or spreadsheets, duplicates often appear. Removing them manually takes time and makes it easy to miss a repeated line.",
      "Paste your list into the duplicate remover and keep the first occurrence while deleting the rest. This keeps your output clean and ready for sharing, importing, or analysis without changing the original order.",
    ],
    steps: [
      "Paste the list or log into the tool.",
      "Choose whether to keep first or last occurrences.",
      "Enable trimming or case sensitivity as needed.",
      "Click process to remove duplicates.",
      "Copy the cleaned list for reuse.",
    ],
    faq: [
      {
        question: "Will it keep the original order?",
        answer:
          "Yes, when keep first is enabled the original order stays intact.",
      },
      {
        question: "Does it remove duplicates across lines only?",
        answer:
          "Yes, the tool compares full lines, not individual words.",
      },
      {
        question: "Can I remove duplicates ignoring case?",
        answer:
          "Yes, disable case sensitivity to treat lines as equal regardless of case.",
      },
    ],
    relatedSlugs: [
      "clean-copied-list-duplicates",
      "unique-list-generator",
      "remove-empty-lines-and-duplicates",
    ],
  },
  {
    slug: "remove-duplicate-words",
    title: "Remove Duplicate Words",
    description:
      "Remove duplicate words from text to clean up lists and notes.",
    h1: "Remove Duplicate Words",
    primaryToolRoute: "/remove-duplicates",
    intro: [
      "If you are working with tag lists or keyword sets, duplicate words can inflate counts and make analysis messy. Cleaning duplicates keeps the list consistent and ready for reporting or reuse.",
      "Paste a list with one word per line into the duplicate remover to remove repeated entries. You can also trim whitespace or ignore case to catch near-identical words.",
    ],
    steps: [
      "Paste one word per line into the input.",
      "Enable trimming and case-insensitive matching.",
      "Process the list to remove duplicates.",
      "Copy the unique word list.",
      "Use the cleaned list in your tool or report.",
    ],
    faq: [
      {
        question: "Should each word be on its own line?",
        answer:
          "Yes, the tool compares lines, so one word per line works best.",
      },
      {
        question: "Can I keep the last occurrence instead?",
        answer:
          "Yes, disable keep first to retain the last occurrence.",
      },
      {
        question: "Will it remove empty lines too?",
        answer:
          "Yes, enable remove empty lines to drop blank rows.",
      },
    ],
    relatedSlugs: [
      "unique-list-generator",
      "remove-duplicate-lines",
      "remove-empty-lines-and-duplicates",
    ],
  },
  {
    slug: "clean-copied-list-duplicates",
    title: "Clean Copied Lists and Remove Duplicates",
    description:
      "Clean pasted lists by removing duplicate lines and keeping the list organized.",
    h1: "Clean Copied Lists and Remove Duplicates",
    primaryToolRoute: "/remove-duplicates",
    intro: [
      "Copied lists from emails, CRMs, or spreadsheets often include repeated entries. Cleaning the list quickly helps you avoid sending duplicate messages or importing messy data.",
      "Use the duplicate line remover to clean the list in seconds. It keeps the first occurrence of each line, preserves order, and can ignore case if the same name appears in different formats.",
    ],
    steps: [
      "Paste the copied list into the tool.",
      "Enable trimming and case-insensitive matching.",
      "Process the list to remove duplicates.",
      "Review the output for missing entries.",
      "Copy the cleaned list into your destination.",
    ],
    faq: [
      {
        question: "Will it keep my list order?",
        answer:
          "Yes, it preserves the original order when keep first is enabled.",
      },
      {
        question: "Can it handle lists with commas?",
        answer:
          "Yes, commas remain part of the line text.",
      },
      {
        question: "Is the data stored anywhere?",
        answer:
          "No, the text stays in your browser.",
      },
    ],
    relatedSlugs: [
      "remove-duplicate-lines",
      "unique-list-generator",
      "dedupe-csv-column-text",
    ],
  },
  {
    slug: "unique-list-generator",
    title: "Unique List Generator",
    description:
      "Generate a unique list by removing duplicates from pasted text.",
    h1: "Unique List Generator",
    primaryToolRoute: "/remove-duplicates",
    intro: [
      "When you need a clean list for imports, tags, or data analysis, duplicates create extra work. A unique list generator quickly removes repeated lines so you can move forward with confidence.",
      "Paste your list into the tool to generate a unique set of lines. You can keep the first occurrence, trim whitespace, or remove empty lines for a polished output.",
    ],
    steps: [
      "Paste your list into the duplicate remover.",
      "Enable trimming and remove empty lines.",
      "Process the list to keep unique entries.",
      "Copy the unique output.",
      "Use it in your spreadsheet or app.",
    ],
    faq: [
      {
        question: "Does it sort the list?",
        answer:
          "No, it keeps the original order unless you choose otherwise.",
      },
      {
        question: "Can I dedupe case-insensitively?",
        answer:
          "Yes, disable case sensitivity to catch variations.",
      },
      {
        question: "Is it safe for large lists?",
        answer:
          "Yes, the tool is designed for long lists.",
      },
    ],
    relatedSlugs: [
      "remove-duplicate-lines",
      "remove-duplicate-words",
      "remove-empty-lines-and-duplicates",
    ],
  },
  {
    slug: "remove-empty-lines-and-duplicates",
    title: "Remove Empty Lines and Duplicates",
    description:
      "Clean lists by removing empty lines and duplicate entries in one pass.",
    h1: "Remove Empty Lines and Duplicates",
    primaryToolRoute: "/remove-duplicates",
    intro: [
      "Lists copied from chat tools or spreadsheets often include blank rows, which makes it harder to sort, import, or compare data. Removing empty lines and duplicates at the same time keeps the output tidy and reliable.",
      "Paste your list and enable the remove empty lines option. The tool will trim whitespace, remove blank rows, and keep only unique entries so you can reuse the list without extra cleanup.",
    ],
    steps: [
      "Paste the list with blank lines into the tool.",
      "Enable remove empty lines and trim whitespace.",
      "Process the list to remove duplicates.",
      "Scan the output for correctness.",
      "Copy the cleaned list for reuse.",
    ],
    faq: [
      {
        question: "Will it keep the original order?",
        answer:
          "Yes, it keeps the first occurrence and preserves order.",
      },
      {
        question: "Does trimming remove spaces inside lines?",
        answer:
          "Trimming removes leading and trailing spaces only.",
      },
      {
        question: "Can I undo the changes?",
        answer:
          "You can always paste the original list again if needed.",
      },
    ],
    relatedSlugs: [
      "remove-duplicate-lines",
      "unique-list-generator",
      "clean-copied-list-duplicates",
    ],
  },
  {
    slug: "dedupe-csv-column-text",
    title: "Dedupe a CSV Column of Text",
    description:
      "Remove duplicate text values from a CSV column without altering the data.",
    h1: "Dedupe a CSV Column of Text",
    primaryToolRoute: "/remove-duplicates",
    intro: [
      "CSV exports often include duplicate values in a column, which can skew analysis or cause import issues. A quick dedupe helps you isolate the unique values for reporting or cleanup.",
      "Copy the column values and paste them line by line into the duplicate remover. The tool keeps unique entries in order, which makes it easy to paste the clean list back into a spreadsheet or use it for lookup tables.",
    ],
    steps: [
      "Copy the CSV column values.",
      "Paste them into the duplicate remover.",
      "Enable trimming and case-insensitive matching if needed.",
      "Process the list to keep unique values.",
      "Paste the output into your spreadsheet.",
    ],
    faq: [
      {
        question: "Do I need to keep commas?",
        answer:
          "No, copy just the column values so each entry is on its own line.",
      },
      {
        question: "Will it change the order of values?",
        answer:
          "No, it preserves the first occurrence order.",
      },
      {
        question: "Can I use this for IDs too?",
        answer:
          "Yes, it works for text, numbers, and mixed values.",
      },
    ],
    relatedSlugs: [
      "unique-list-generator",
      "remove-duplicate-lines",
      "clean-copied-list-duplicates",
    ],
  },
  {
    slug: "text-to-speech-for-studying",
    title: "Text to Speech for Studying",
    description:
      "Turn study notes into audio for faster review and retention.",
    h1: "Text to Speech for Studying",
    primaryToolRoute: "/text-to-speech",
    intro: [
      "Listening to your notes can help you review material while commuting, exercising, or cleaning. Text to speech turns written study notes into audio so you can reinforce concepts without staring at a screen.",
      "Paste your notes into the tool and pick a comfortable voice and speed. You can slow down for complex topics or speed up for quick review. This approach is great for quizzes, exams, and memorizing definitions.",
    ],
    steps: [
      "Paste your study notes into the text to speech tool.",
      "Choose a voice and adjust the reading speed.",
      "Listen once to catch missing sections.",
      "Pause and replay key concepts.",
      "Save the text to reuse for the next session.",
    ],
    faq: [
      {
        question: "What speed is best for studying?",
        answer:
          "Start near 1.0x and increase gradually until you find a comfortable pace.",
      },
      {
        question: "Can I use this on mobile?",
        answer:
          "Yes, most mobile browsers support speech synthesis.",
      },
      {
        question: "Does the tool store my notes?",
        answer:
          "No, the text stays in your browser.",
      },
    ],
    relatedSlugs: [
      "text-to-speech-from-notes",
      "text-to-speech-for-language-learning",
      "text-to-speech-for-proofreading",
    ],
  },
  {
    slug: "text-to-speech-for-proofreading",
    title: "Text to Speech for Proofreading",
    description:
      "Listen to your writing to catch errors and awkward phrasing.",
    h1: "Text to Speech for Proofreading",
    primaryToolRoute: "/text-to-speech",
    intro: [
      "Listening to your writing is one of the fastest ways to spot errors and awkward phrasing. When you hear the text aloud, missing words and repeated phrases stand out more clearly than when you read silently.",
      "Paste your draft into the text to speech tool and play it at a natural pace. Pause when you hear an issue, fix the text, and replay the sentence until it reads smoothly.",
    ],
    steps: [
      "Paste your draft into the text to speech tool.",
      "Play the audio at a steady pace.",
      "Pause when something sounds off.",
      "Edit the draft and replay the section.",
      "Repeat until the flow feels natural.",
    ],
    faq: [
      {
        question: "Should I listen faster to save time?",
        answer:
          "Start at normal speed to catch nuance, then speed up once the text is clean.",
      },
      {
        question: "Does this replace a human editor?",
        answer:
          "It is a helpful pass, but it does not replace full editorial review.",
      },
      {
        question: "Can I proofread long articles?",
        answer:
          "Yes, you can paste sections one at a time for long drafts.",
      },
    ],
    relatedSlugs: [
      "text-to-speech-for-presentations",
      "text-to-speech-from-notes",
      "text-to-speech-for-studying",
    ],
  },
  {
    slug: "text-to-speech-for-language-learning",
    title: "Text to Speech for Language Learning",
    description:
      "Use text to speech to practice pronunciation and listening skills.",
    h1: "Text to Speech for Language Learning",
    primaryToolRoute: "/text-to-speech",
    intro: [
      "Text to speech helps language learners hear words and phrases with consistent pronunciation. It is a quick way to practice listening comprehension and shadowing without searching for audio files.",
      "Paste vocabulary lists or sample sentences into the tool and choose a voice that matches your target language. Slow the playback to hear each syllable, then speed up as you get comfortable.",
    ],
    steps: [
      "Paste vocabulary or sentences into the tool.",
      "Select a voice and adjust the speed.",
      "Listen and repeat each sentence aloud.",
      "Increase the speed to build fluency.",
      "Save phrases you want to practice again.",
    ],
    faq: [
      {
        question: "Can I use it for multiple languages?",
        answer:
          "Yes, available voices depend on your browser and OS language support.",
      },
      {
        question: "Is this good for pronunciation practice?",
        answer:
          "It is helpful for consistent exposure, but native audio is still recommended.",
      },
      {
        question: "Will it handle accents?",
        answer:
          "The voice options often include different regional accents.",
      },
    ],
    relatedSlugs: [
      "text-to-speech-for-studying",
      "text-to-speech-for-accessibility",
      "text-to-speech-from-notes",
    ],
  },
  {
    slug: "text-to-speech-for-accessibility",
    title: "Text to Speech for Accessibility",
    description:
      "Make text easier to consume with audio playback for accessibility needs.",
    h1: "Text to Speech for Accessibility",
    primaryToolRoute: "/text-to-speech",
    intro: [
      "Text to speech can make content more accessible for people who prefer audio or who have visual or reading challenges. It allows users to listen to content and control the speed, pitch, and volume based on their needs.",
      "Paste any text into the tool and play it using a clear voice. This is useful for reading emails, instructions, or articles without relying on small text or heavy formatting.",
    ],
    steps: [
      "Paste the content into the text to speech tool.",
      "Pick a clear voice and comfortable speed.",
      "Adjust volume and pitch for clarity.",
      "Play and pause as needed.",
      "Use the tool whenever you want audio access.",
    ],
    faq: [
      {
        question: "Is this a full screen reader?",
        answer:
          "No, it is a simple text to speech tool for pasted content.",
      },
      {
        question: "Can I control the speed?",
        answer:
          "Yes, you can adjust the rate slider to speed up or slow down playback.",
      },
      {
        question: "Does it work offline?",
        answer:
          "Some voices require internet access, depending on your browser.",
      },
    ],
    relatedSlugs: [
      "text-to-speech-for-studying",
      "text-to-speech-from-notes",
      "text-to-speech-for-proofreading",
    ],
  },
  {
    slug: "text-to-speech-for-presentations",
    title: "Text to Speech for Presentations",
    description:
      "Listen to your presentation script and refine timing and delivery.",
    h1: "Text to Speech for Presentations",
    primaryToolRoute: "/text-to-speech",
    intro: [
      "Presentation scripts can feel different when spoken aloud. Using text to speech helps you hear pacing, awkward transitions, and sections that are too long before you rehearse.",
      "Paste your script, listen at a natural speed, and adjust the timing by trimming or expanding sections. This is a quick way to test whether your talk fits the allotted time.",
    ],
    steps: [
      "Paste your presentation script into the tool.",
      "Select a voice and speed close to your delivery.",
      "Listen and note any sections that drag.",
      "Edit the script and replay the key sections.",
      "Finalize timing before rehearsal.",
    ],
    faq: [
      {
        question: "Can I estimate total duration?",
        answer:
          "Yes, listen through once to gauge total time and adjust as needed.",
      },
      {
        question: "Should I use a faster playback speed?",
        answer:
          "Use a speed close to your own delivery to judge timing accurately.",
      },
      {
        question: "Can I use this for webinar scripts?",
        answer:
          "Yes, any spoken script works well here.",
      },
    ],
    relatedSlugs: [
      "text-to-speech-for-proofreading",
      "text-to-speech-from-notes",
      "text-to-speech-for-studying",
    ],
  },
  {
    slug: "text-to-speech-from-notes",
    title: "Text to Speech from Notes",
    description:
      "Turn meeting notes or research notes into audio summaries.",
    h1: "Text to Speech from Notes",
    primaryToolRoute: "/text-to-speech",
    intro: [
      "Meeting notes and research notes are easy to collect but hard to revisit. Text to speech gives you a simple way to turn those notes into audio so you can review them during commutes or quick breaks.",
      "Paste your notes, choose a clear voice, and adjust the speed to match your listening preferences. You can pause and replay sections to reinforce key points without reopening the document.",
    ],
    steps: [
      "Paste your notes into the text to speech tool.",
      "Choose a voice that is easy to understand.",
      "Adjust the speed for comfortable listening.",
      "Play and pause as needed for review.",
      "Update the notes and replay when needed.",
    ],
    faq: [
      {
        question: "Does it work with bullet points?",
        answer:
          "Yes, bullet points will be read in the order they appear.",
      },
      {
        question: "Can I use this for meeting recaps?",
        answer:
          "Yes, it is a fast way to review meeting summaries.",
      },
      {
        question: "Will my notes be stored?",
        answer:
          "No, everything stays in your browser.",
      },
    ],
    relatedSlugs: [
      "text-to-speech-for-studying",
      "text-to-speech-for-proofreading",
      "text-to-speech-for-accessibility",
    ],
  },
];

export const USE_CASE_BY_SLUG = Object.fromEntries(
  USE_CASES.map((useCase) => [useCase.slug, useCase]),
) as Record<string, UseCase>;

export const USE_CASE_CATEGORIES = [
  {
    slug: "word-counter",
    title: "Word Counter Use Cases",
    description:
      "Popular scenarios where word count helps you hit length targets.",
    toolRoute: "/word-counter",
  },
  {
    slug: "case-converter",
    title: "Case Converter Use Cases",
    description: "Fix capitalization and formatting quickly.",
    toolRoute: "/case-converter",
  },
  {
    slug: "remove-duplicates",
    title: "Remove Duplicate Lines Use Cases",
    description: "Clean lists, logs, and exports.",
    toolRoute: "/remove-duplicates",
  },
  {
    slug: "text-to-speech",
    title: "Text to Speech Use Cases",
    description: "Listen to text for study, accessibility, and review.",
    toolRoute: "/text-to-speech",
  },
];

export const POPULAR_USE_CASE_SLUGS = [
  "word-count-essay-500-1000-words",
  "word-count-blog-post",
  "word-count-twitter-x-character-limit",
  "title-case-generator",
  "remove-duplicate-lines",
  "unique-list-generator",
  "text-to-speech-for-proofreading",
  "text-to-speech-for-studying",
];

export function getUseCasesByToolRoute(route: string) {
  return USE_CASES.filter((useCase) => useCase.primaryToolRoute === route);
}

export function getAlternateToolRoute(primaryToolRoute: string) {
  const alternate = TOOLS.find((tool) => tool.route !== primaryToolRoute);
  return alternate?.route ?? "/word-counter";
}
