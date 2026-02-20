import Link from "next/link";

import AnalyticsEvent from "../../components/AnalyticsEvent";
import ToolLayout from "../../components/ToolLayout";
import TrackedLink from "../../components/TrackedLink";
import WordCounterExperience from "../../components/WordCounterExperience";
import { getUseCasesByToolRoute } from "../../lib/use-cases";
import {
  RELATED_TOOLS_BY_TOOL,
  TOOL_BY_ROUTE,
  TOOL_TIPS,
  TRY_NEXT_BY_TOOL,
} from "../../lib/tools";

const TOOL_URL = "https://text-tool.live/word-counter";

const TOOL_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Word Counter",
  url: TOOL_URL,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  description:
    "Count words, characters, and characters without spaces instantly in your browser.",
};

const FAQ_ITEMS = [
  {
    question: "Does the word counter include punctuation?",
    answer:
      "Punctuation is ignored in word counting. Words are separated by whitespace.",
  },
  {
    question: "Are spaces included in character count?",
    answer:
      "The character count includes spaces, and a separate metric shows characters without spaces.",
  },
  {
    question: "Is my text stored anywhere?",
    answer:
      "No. Everything runs locally in your browser, and nothing is saved on a server.",
  },
  {
    question: "Can I use this for essays or blog posts?",
    answer:
      "Yes. The counter is designed for long-form content and updates instantly.",
  },
];

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function WordCounterPage() {
  const tryNextRoutes = TRY_NEXT_BY_TOOL["/word-counter"];
  const relatedToolRoutes = RELATED_TOOLS_BY_TOOL["/word-counter"];
  const popularUseCases = getUseCasesByToolRoute("/word-counter").slice(0, 6);
  const tips = TOOL_TIPS["/word-counter"];

  return (
    <ToolLayout
      title="Word Counter"
      description="Paste or type your text to see live word and character counts."
      maxWidthClassName="max-w-4xl"
    >
      <AnalyticsEvent event="tool_page_view" props={{ tool: "word-counter" }} />
      <script type="application/ld+json">{JSON.stringify(TOOL_JSON_LD)}</script>
      <script type="application/ld+json">{JSON.stringify(FAQ_JSON_LD)}</script>
      <WordCounterExperience
        afterTool={
          <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)]">
            <h2 className="text-lg font-semibold text-zinc-900">Try next</h2>
            <p className="mt-2 text-sm text-zinc-600">
              Keep your workflow moving with another quick tool.
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-zinc-900">
              {tryNextRoutes.map((route) => (
                <TrackedLink
                  key={route}
                  href={route}
                  eventName="click_try_next"
                  eventProps={{ from: "word-counter", to: route }}
                  className="underline"
                >
                  {TOOL_BY_ROUTE[route]?.name}
                </TrackedLink>
              ))}
            </div>
          </section>
        }
      />

      <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)]">
        <h2 className="text-lg font-semibold text-zinc-900">
          Popular use cases for this tool
        </h2>
        <p className="mt-2 text-sm text-zinc-600">
          Jump into a real workflow and use the word counter in context.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-zinc-900">
          <Link className="underline" href="/use-cases/word-counter">
            View all word counter use cases
          </Link>
          {popularUseCases.map((useCase) => (
            <Link
              key={useCase.slug}
              className="underline"
              href={`/use-cases/${useCase.slug}`}
            >
              {useCase.title}
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)]">
        <h2 className="text-lg font-semibold text-zinc-900">Tips</h2>
        <div className="mt-4 space-y-3 text-sm text-zinc-600">
          {tips.map((tip) => (
            <details
              key={tip.title}
              className="rounded-2xl border border-zinc-200/80 bg-zinc-50 px-4 py-3"
            >
              <summary className="cursor-pointer text-sm font-semibold text-zinc-900">
                {tip.title}
              </summary>
              <p className="mt-2 text-sm text-zinc-600">{tip.text}</p>
              <Link className="mt-2 inline-flex text-sm font-semibold text-zinc-900 underline" href={tip.linkHref}>
                {tip.linkLabel}
              </Link>
            </details>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)]">
        <h2 className="text-lg font-semibold text-zinc-900">Quick tips</h2>
        <p className="mt-2 text-sm text-zinc-600">
          Use the word counter to validate content length, meta descriptions,
          and character limits before publishing.
        </p>
      </section>

      <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)]">
        <h2 className="text-lg font-semibold text-zinc-900">FAQ</h2>
        <div className="mt-4 space-y-3 text-sm text-zinc-600">
          {FAQ_ITEMS.map((item) => (
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
        <span>Try also:</span>
        {relatedToolRoutes.map((route) => (
          <Link key={route} className="text-zinc-900 underline" href={route}>
            {TOOL_BY_ROUTE[route]?.name}
          </Link>
        ))}
      </section>
    </ToolLayout>
  );
}
