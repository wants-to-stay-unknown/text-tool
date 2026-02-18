import Link from "next/link";
import type { Metadata } from "next";

import ToolLayout from "../../components/ToolLayout";
import WordCounterTool from "../../components/WordCounterTool";
import { WORD_COUNTS } from "../../lib/word-counts";
import { getWordMetrics } from "../../lib/word-metrics";

const BASE_URL = "https://text-tool.live";

const INTRO_TEMPLATES = [
  "If you are targeting {count} words, this page shows how many pages that is and how long it usually takes to read or speak the text.",
  "Need a quick estimate for {count} words? Use these page counts, reading times, and speaking times to plan your content.",
  "{count} words can feel long or short depending on format. Here is a quick breakdown of pages, reading time, and speaking time.",
  "Planning a {count}-word draft? Use the estimates below for pages, reading time, and spoken delivery.",
];

const FAQ_ITEMS = (count: number) => [
  {
    question: `How long is ${count} words?`,
    answer:
      "It depends on formatting, but the estimates below show typical pages and reading time.",
  },
  {
    question: `How many pages is ${count} words single spaced?`,
    answer:
      "Single-spaced pages are usually around 500 words per page, so this page shows the approximate total.",
  },
  {
    question: `How many pages is ${count} words double spaced?`,
    answer:
      "Double-spaced pages are usually around 250 words per page, so the estimate is higher.",
  },
  {
    question: `How long does it take to read ${count} words?`,
    answer:
      "Average reading speed is about 200 words per minute. Use the estimate provided on this page.",
  },
  {
    question: `Can I verify the exact count?`,
    answer:
      "Yes. Paste your text into the word counter below for a precise count.",
  },
];

function getIntro(count: number) {
  const index = WORD_COUNTS.findIndex((value) => value === count);
  const safeIndex = index >= 0 ? index : 0;
  const template = INTRO_TEMPLATES[safeIndex % INTRO_TEMPLATES.length];
  return template.replace("{count}", String(count));
}

function getFaqJsonLd(count: number) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS(count).map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function getWebPageJsonLd(count: number, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${count} Words – Pages, Reading Time, Speaking Time`,
    description,
    url: `${BASE_URL}/${count}-words`,
  };
}

function getBreadcrumbJsonLd(count: number) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${BASE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Word Counter",
        item: `${BASE_URL}/word-counter`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${count} Words`,
        item: `${BASE_URL}/${count}-words`,
      },
    ],
  };
}

export function generateStaticParams() {
  return WORD_COUNTS.map((count) => ({ count: String(count) }));
}

export function generateMetadata({
  params,
}: {
  params: { count: string };
}): Metadata {
  const count = Number(params.count);
  const metrics = getWordMetrics(count);
  const description = `${count} words is about ${metrics.pagesSingleSpaced} single-spaced pages or ${metrics.pagesDoubleSpaced} double-spaced pages. Reading time is ~${metrics.readingTimeMinutes} minutes. Free online word counter.`;

  return {
    title: `${count} Words: Pages, Reading & Speaking Time | Text Tool`,
    description,
    alternates: {
      canonical: `${BASE_URL}/${count}-words`,
    },
    openGraph: {
      title: `${count} Words: Pages, Reading & Speaking Time | Text Tool`,
      description,
      url: `${BASE_URL}/${count}-words`,
      images: [
        {
          url: `${BASE_URL}/og.svg`,
          width: 1200,
          height: 630,
          alt: `${count} words`,
        },
      ],
    },
    twitter: {
      title: `${count} Words: Pages, Reading & Speaking Time | Text Tool`,
      description,
      images: [`${BASE_URL}/og.svg`],
    },
  };
}

export default function WordCountLandingPage({
  params,
}: {
  params: { count: string };
}) {
  const count = Number(params.count);
  const metrics = getWordMetrics(count);
  const intro = getIntro(count);
  const faqItems = FAQ_ITEMS(count);

  const index = WORD_COUNTS.findIndex((value) => value === count);
  const prev = index > 0 ? WORD_COUNTS[index - 1] : null;
  const next = index < WORD_COUNTS.length - 1 ? WORD_COUNTS[index + 1] : null;

  return (
    <ToolLayout
      title={`${count} Words – Pages, Reading Time, Speaking Time`}
      description={intro}
      maxWidthClassName="max-w-5xl"
    >
      <script type="application/ld+json">
        {JSON.stringify(getWebPageJsonLd(count, intro))}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(getFaqJsonLd(count))}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(getBreadcrumbJsonLd(count))}
      </script>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Reading time
          </p>
          <p className="mt-3 text-3xl font-semibold text-zinc-900">
            ~{metrics.readingTimeMinutes} min
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Speaking time
          </p>
          <p className="mt-3 text-3xl font-semibold text-zinc-900">
            ~{metrics.speakingTimeMinutes} min
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Pages (single spaced)
          </p>
          <p className="mt-3 text-3xl font-semibold text-zinc-900">
            {metrics.pagesSingleSpaced}
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Pages (double spaced)
          </p>
          <p className="mt-3 text-3xl font-semibold text-zinc-900">
            {metrics.pagesDoubleSpaced}
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Sentences (estimate)
          </p>
          <p className="mt-3 text-3xl font-semibold text-zinc-900">
            {metrics.sentencesEstimate}
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Paragraphs (estimate)
          </p>
          <p className="mt-3 text-3xl font-semibold text-zinc-900">
            {metrics.paragraphsEstimate}
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-zinc-900">
          Check your exact word count
        </h2>
        <p className="mt-2 text-sm text-zinc-600">
          Paste your text to measure the exact length. The counter updates in
          real time and keeps your text in the browser.
        </p>
        <div className="mt-6">
          <WordCounterTool />
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-zinc-900">How to use</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-zinc-600">
          <li>Paste or type your text into the word counter.</li>
          <li>Review the word, character, and spacing metrics.</li>
          <li>Compare your text with the estimates above.</li>
          <li>Adjust your draft to match the target word count.</li>
        </ol>
      </section>

      <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-zinc-900">FAQ</h2>
        <div className="mt-4 space-y-3 text-sm text-zinc-600">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="rounded-2xl border border-zinc-200/80 bg-zinc-50 px-4 py-3"
            >
              <summary className="cursor-pointer text-sm font-semibold text-zinc-900">
                {item.question}
              </summary>
              <p className="mt-2 text-sm text-zinc-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="flex flex-wrap gap-3 text-sm font-semibold text-zinc-600">
        <span>Try another tool:</span>
        <Link className="text-zinc-900 underline" href="/word-counter">
          Word Counter
        </Link>
        <Link className="text-zinc-900 underline" href="/case-converter">
          Case Converter
        </Link>
        <Link className="text-zinc-900 underline" href="/remove-duplicates">
          Remove Duplicate Lines
        </Link>
        <Link className="text-zinc-900 underline" href="/text-to-speech">
          Text to Speech
        </Link>
      </section>

      <section className="flex items-center justify-between text-sm font-semibold text-zinc-600">
        <div>
          {prev ? (
            <Link className="underline" href={`/${prev}-words`}>
              ← {prev} words
            </Link>
          ) : null}
        </div>
        <div>
          {next ? (
            <Link className="underline" href={`/${next}-words`}>
              {next} words →
            </Link>
          ) : null}
        </div>
      </section>
    </ToolLayout>
  );
}
