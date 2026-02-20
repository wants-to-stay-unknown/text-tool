"use client";

import {
  type MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Link from "next/link";

import AnalyticsEvent from "../../components/AnalyticsEvent";
import Button from "../../components/Button";
import TextArea from "../../components/TextArea";
import ToolLayout from "../../components/ToolLayout";
import TrackedLink from "../../components/TrackedLink";
import {
  getTextMeta,
  trackClear,
  trackCopy,
  trackInputChange,
  trackPaste,
  trackToolRun,
  trackToolSuccess,
} from "../../lib/analytics";
import { CHARACTER_PRESETS } from "../../lib/character-counter";
import { countTextStats } from "../../lib/word-counter";
import { sanitizeText } from "../../lib/text-safety";
import { getUseCasesByToolRoute, USE_CASE_BY_SLUG } from "../../lib/use-cases";
import {
  POST_ACTION_SUGGESTIONS,
  RELATED_TOOLS_BY_TOOL,
  TOOL_BY_ROUTE,
  TOOL_TIPS,
  TRY_NEXT_BY_TOOL,
} from "../../lib/tools";

const MAX_INPUT_CHARS = 100_000;
const TOOL_URL = "https://text-tool.live/character-counter";

const TOOL_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Character Counter",
  url: TOOL_URL,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  description:
    "Count characters with platform presets for social, SEO, and messaging limits.",
};

const FAQ_ITEMS = [
  {
    question: "Does the character count include spaces?",
    answer:
      "Yes. The main count includes spaces, and a separate metric shows characters without spaces.",
  },
  {
    question: "Are emojis counted as characters?",
    answer:
      "Yes, emojis count as characters and should be included in your limit.",
  },
  {
    question: "Can I track multiple platforms?",
    answer:
      "Yes, switch presets to see how the same text fits different limits.",
  },
  {
    question: "Is my text stored anywhere?",
    answer:
      "No. Everything runs in your browser, and nothing is stored on a server.",
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

export default function CharacterCounterPage() {
  const [text, setText] = useState("");
  const [presetId, setPresetId] = useState(CHARACTER_PRESETS[0]?.id ?? "");
  const [copyLabel, setCopyLabel] = useState("Copy");
  const [hasUsed, setHasUsed] = useState(false);
  const copyTimeoutRef = useRef<number | null>(null);
  const hasTrackedRef = useRef(false);

  const stats = useMemo(() => countTextStats(text), [text]);
  const preset = CHARACTER_PRESETS.find((item) => item.id === presetId);
  const remaining = preset ? preset.limit - stats.characters : 0;

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        window.clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const showCopyStatus = (label: string) => {
    setCopyLabel(label);
    if (copyTimeoutRef.current) {
      window.clearTimeout(copyTimeoutRef.current);
    }
    copyTimeoutRef.current = window.setTimeout(() => {
      setCopyLabel("Copy");
    }, 1600);
  };

  const handleCopy = async () => {
    if (!text.trim()) {
      showCopyStatus("Empty");
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      showCopyStatus("Copied");
      trackCopy("character-counter", {
        ...getTextMeta(text),
        target: "input",
        preset: preset?.id,
      });
    } catch (error) {
      showCopyStatus("Failed");
    }
  };

  const handleClear = () => {
    setText("");
    trackClear("character-counter");
  };

  const tryNextRoutes = TRY_NEXT_BY_TOOL["/character-counter"];
  const relatedToolRoutes = RELATED_TOOLS_BY_TOOL["/character-counter"];
  const popularUseCases = getUseCasesByToolRoute("/character-counter").slice(0, 6);
  const tips = TOOL_TIPS["/character-counter"];
  const postAction = POST_ACTION_SUGGESTIONS["/character-counter"];
  const postActionUseCase = USE_CASE_BY_SLUG[postAction.useCaseSlug];

  return (
    <ToolLayout
      title="Character Counter"
      description="Track character limits for social posts, meta descriptions, and SMS before you publish."
    >
      <AnalyticsEvent event="tool_page_view" props={{ tool: "character-counter" }} />
      <script type="application/ld+json">{JSON.stringify(TOOL_JSON_LD)}</script>
      <script type="application/ld+json">{JSON.stringify(FAQ_JSON_LD)}</script>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.35)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Characters
          </p>
          <p className="mt-3 text-3xl font-semibold text-zinc-900">
            {stats.characters}
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.35)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Characters (no spaces)
          </p>
          <p className="mt-3 text-3xl font-semibold text-zinc-900">
            {stats.charactersNoSpaces}
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.35)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Words
          </p>
          <p className="mt-3 text-3xl font-semibold text-zinc-900">
            {stats.words}
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.35)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Remaining
          </p>
          <p
            className={`mt-3 text-3xl font-semibold ${
              remaining >= 0 ? "text-zinc-900" : "text-rose-600"
            }`}
          >
            {remaining}
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            {preset ? `${preset.label} limit ${preset.limit}` : "Select a preset"}
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)]">
        <TextArea
          id="character-counter-input"
          label="Text input"
          labelAction={
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-600 transition hover:border-zinc-300 hover:text-zinc-900"
            >
              {copyLabel}
            </button>
          }
          value={text}
          onChange={(event) => {
            const nextValue = sanitizeText(event.target.value, MAX_INPUT_CHARS);
            setText(nextValue);
            if (!hasTrackedRef.current && nextValue.trim()) {
              hasTrackedRef.current = true;
              const meta = getTextMeta(nextValue);
              trackToolRun("character-counter", meta, { preset: preset?.id });
              trackToolSuccess("character-counter", meta);
              setHasUsed(true);
            }
            if (nextValue.trim()) {
              trackInputChange("character-counter", getTextMeta(nextValue));
            }
          }}
          onPaste={(event) => {
            const pasted = event.clipboardData.getData("text");
            if (pasted) {
              trackPaste("character-counter", getTextMeta(pasted));
            }
          }}
          placeholder="Paste or type your text here..."
          maxLength={MAX_INPUT_CHARS}
          helperText="Counts update instantly for each preset."
        />
      </section>

      <section className="flex flex-col gap-4 rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)]">
        <div>
          <p className="text-sm font-semibold text-zinc-900">Platform presets</p>
          <p className="mt-2 text-sm text-zinc-600">
            Pick a preset to see the remaining character budget.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {CHARACTER_PRESETS.map((option) => (
            <Button
              key={option.id}
              onClick={() => setPresetId(option.id)}
              variant={option.id === presetId ? "primary" : "secondary"}
            >
              {option.label}
            </Button>
          ))}
          <Button onClick={handleClear} variant="secondary">
            Clear
          </Button>
        </div>
        {preset ? (
          <p className="text-sm text-zinc-600">{preset.helper}</p>
        ) : null}
      </section>

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
              eventProps={{ from: "character-counter", to: route }}
              className="underline"
            >
              {TOOL_BY_ROUTE[route]?.name}
            </TrackedLink>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)]">
        <h2 className="text-lg font-semibold text-zinc-900">
          Popular use cases for this tool
        </h2>
        <p className="mt-2 text-sm text-zinc-600">
          Use character limits confidently across platforms.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-zinc-900">
          <Link className="underline" href="/use-cases/word-limits">
            View all word & limits use cases
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
              <Link
                className="mt-2 inline-flex text-sm font-semibold text-zinc-900 underline"
                href={tip.linkHref}
              >
                {tip.linkLabel}
              </Link>
            </details>
          ))}
        </div>
      </section>

      {hasUsed ? (
        <section className="rounded-3xl border border-zinc-200/80 bg-white p-5 text-sm text-zinc-600 shadow-sm">
          <p className="font-semibold text-zinc-900">Next, you might want to...</p>
          <div className="mt-3 flex flex-wrap gap-3 text-sm font-semibold text-zinc-600">
            {postAction.tools.map((route) => (
              <Link key={route} className="underline" href={route}>
                {TOOL_BY_ROUTE[route]?.name}
              </Link>
            ))}
            {postActionUseCase ? (
              <Link className="underline" href={`/use-cases/${postActionUseCase.slug}`}>
                {postActionUseCase.title}
              </Link>
            ) : null}
          </div>
        </section>
      ) : null}

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
