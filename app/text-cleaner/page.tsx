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
import {
  cleanText,
  DEFAULT_TEXT_CLEANER_OPTIONS,
  type TextCleanerOptions,
} from "../../lib/text-cleaner";
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
const TOOL_URL = "https://text-tool.live/text-cleaner";

const TOOL_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Text Cleaner",
  url: TOOL_URL,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  description:
    "Clean text with toggles for duplicates, empty lines, extra spaces, and sorting.",
};

const FAQ_ITEMS = [
  {
    question: "Does the cleaner keep line breaks?",
    answer:
      "Yes. Line breaks are preserved unless you remove empty lines or sort output.",
  },
  {
    question: "What does unique list mode do?",
    answer:
      "Unique list mode removes duplicates and sorts the list A–Z in one step.",
  },
  {
    question: "Is the output updated automatically?",
    answer:
      "Yes, the output refreshes when you change the text or toggle options.",
  },
  {
    question: "Is my data stored anywhere?",
    answer:
      "No. All processing happens in your browser and nothing is saved.",
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

export default function TextCleanerPage() {
  const [text, setText] = useState("");
  const [options, setOptions] = useState<TextCleanerOptions>(
    DEFAULT_TEXT_CLEANER_OPTIONS,
  );
  const [hasUsed, setHasUsed] = useState(false);
  const [outputCopyLabel, setOutputCopyLabel] = useState("Copy output");
  const [inputCopyLabel, setInputCopyLabel] = useState("Copy input");
  const outputCopyTimeoutRef = useRef<number | null>(null);
  const inputCopyTimeoutRef = useRef<number | null>(null);
  const hasTrackedRef = useRef(false);

  const result = useMemo(() => cleanText(text, options), [text, options]);

  useEffect(() => {
    return () => {
      if (outputCopyTimeoutRef.current) {
        window.clearTimeout(outputCopyTimeoutRef.current);
      }
      if (inputCopyTimeoutRef.current) {
        window.clearTimeout(inputCopyTimeoutRef.current);
      }
    };
  }, []);

  const showCopyStatus = (
    label: string,
    setLabel: (value: string) => void,
    timeoutRef: MutableRefObject<number | null>,
  ) => {
    setLabel(label);
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      setLabel(label.includes("output") ? "Copy output" : "Copy input");
    }, 1600);
  };

  const handleCopy = async (value: string, target: "input" | "output") => {
    if (!value.trim()) {
      showCopyStatus(
        target === "input" ? "Empty input" : "Empty output",
        target === "input" ? setInputCopyLabel : setOutputCopyLabel,
        target === "input" ? inputCopyTimeoutRef : outputCopyTimeoutRef,
      );
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      showCopyStatus(
        target === "input" ? "Copied input" : "Copied output",
        target === "input" ? setInputCopyLabel : setOutputCopyLabel,
        target === "input" ? inputCopyTimeoutRef : outputCopyTimeoutRef,
      );
      trackCopy("text-cleaner", {
        ...getTextMeta(value),
        target,
      });
    } catch (error) {
      showCopyStatus(
        target === "input" ? "Failed input" : "Failed output",
        target === "input" ? setInputCopyLabel : setOutputCopyLabel,
        target === "input" ? inputCopyTimeoutRef : outputCopyTimeoutRef,
      );
    }
  };

  const updateOption = (key: keyof TextCleanerOptions) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const applyUniqueListPreset = () => {
    setOptions({
      removeDuplicateLines: true,
      removeEmptyLines: true,
      removeExtraSpaces: true,
      sortLines: true,
      uniqueList: true,
    });
  };

  const handleClear = () => {
    setText("");
    trackClear("text-cleaner");
  };

  const tryNextRoutes = TRY_NEXT_BY_TOOL["/text-cleaner"];
  const relatedToolRoutes = RELATED_TOOLS_BY_TOOL["/text-cleaner"];
  const popularUseCases = getUseCasesByToolRoute("/text-cleaner").slice(0, 6);
  const tips = TOOL_TIPS["/text-cleaner"];
  const postAction = POST_ACTION_SUGGESTIONS["/text-cleaner"];
  const postActionUseCase = USE_CASE_BY_SLUG[postAction.useCaseSlug];

  return (
    <ToolLayout
      title="Text Cleaner"
      description="Clean text with one set of toggles for duplicates, blanks, spaces, and sorting."
    >
      <AnalyticsEvent event="tool_page_view" props={{ tool: "text-cleaner" }} />
      <script type="application/ld+json">{JSON.stringify(TOOL_JSON_LD)}</script>
      <script type="application/ld+json">{JSON.stringify(FAQ_JSON_LD)}</script>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.35)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Total lines
          </p>
          <p className="mt-3 text-3xl font-semibold text-zinc-900">
            {result.totalLines}
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.35)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Output lines
          </p>
          <p className="mt-3 text-3xl font-semibold text-zinc-900">
            {result.outputLines}
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.35)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Duplicates removed
          </p>
          <p className="mt-3 text-3xl font-semibold text-zinc-900">
            {result.removedDuplicates}
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)]">
          <TextArea
            id="text-cleaner-input"
            label="Input"
            labelAction={
              <button
                type="button"
                onClick={() => handleCopy(text, "input")}
                className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-600 transition hover:border-zinc-300 hover:text-zinc-900"
              >
                {inputCopyLabel}
              </button>
            }
            value={text}
            onChange={(event) => {
              const nextValue = sanitizeText(
                event.target.value,
                MAX_INPUT_CHARS,
              );
              setText(nextValue);
              if (nextValue.trim()) {
                if (!hasTrackedRef.current) {
                  hasTrackedRef.current = true;
                  setHasUsed(true);
                  trackToolRun("text-cleaner", getTextMeta(nextValue));
                  trackToolSuccess("text-cleaner", getTextMeta(nextValue));
                }
                trackInputChange("text-cleaner", getTextMeta(nextValue));
              }
            }}
            onPaste={(event) => {
              const pasted = event.clipboardData.getData("text");
              if (pasted) {
                trackPaste("text-cleaner", getTextMeta(pasted));
              }
            }}
            placeholder="Paste your text here..."
            maxLength={MAX_INPUT_CHARS}
            helperText="Cleaning updates automatically when text or toggles change."
          />
        </div>

        <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)]">
          <TextArea
            id="text-cleaner-output"
            label="Output"
            labelAction={
              <button
                type="button"
                onClick={() => handleCopy(result.output, "output")}
                className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-600 transition hover:border-zinc-300 hover:text-zinc-900"
              >
                {outputCopyLabel}
              </button>
            }
            value={result.output}
            readOnly
            placeholder="Your cleaned text appears here."
            maxLength={MAX_INPUT_CHARS}
          />
        </div>
      </section>

      <section className="flex flex-col gap-6 rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)]">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <label className="flex items-center gap-3 text-sm font-semibold text-zinc-700">
            <input
              type="checkbox"
              checked={options.removeDuplicateLines}
              onChange={() => updateOption("removeDuplicateLines")}
              className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-400"
            />
            Remove duplicate lines
          </label>
          <label className="flex items-center gap-3 text-sm font-semibold text-zinc-700">
            <input
              type="checkbox"
              checked={options.removeEmptyLines}
              onChange={() => updateOption("removeEmptyLines")}
              className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-400"
            />
            Remove empty lines
          </label>
          <label className="flex items-center gap-3 text-sm font-semibold text-zinc-700">
            <input
              type="checkbox"
              checked={options.removeExtraSpaces}
              onChange={() => updateOption("removeExtraSpaces")}
              className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-400"
            />
            Remove extra spaces
          </label>
          <label className="flex items-center gap-3 text-sm font-semibold text-zinc-700">
            <input
              type="checkbox"
              checked={options.sortLines}
              onChange={() => updateOption("sortLines")}
              className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-400"
            />
            Sort lines A–Z
          </label>
          <label className="flex items-center gap-3 text-sm font-semibold text-zinc-700">
            <input
              type="checkbox"
              checked={options.uniqueList}
              onChange={() => updateOption("uniqueList")}
              className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-400"
            />
            Unique list mode
          </label>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={applyUniqueListPreset} variant="secondary">
            Unique list preset
          </Button>
          <Button onClick={handleClear} variant="secondary">
            Clear
          </Button>
          <Button onClick={() => handleCopy(result.output, "output")} variant="primary">
            Copy Output
          </Button>
        </div>

        <div className="grid gap-2 text-xs text-zinc-500 sm:grid-cols-2">
          <p>Unique list mode removes duplicates and sorts output A–Z.</p>
          <p>Extra space removal collapses multiple spaces inside each line.</p>
          <p>Remove empty lines keeps only the lines with text.</p>
          <p>Sorting happens after cleanup to keep the list consistent.</p>
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)]">
        <h2 className="text-lg font-semibold text-zinc-900">Try next</h2>
        <p className="mt-2 text-sm text-zinc-600">
          Keep your cleanup workflow moving with another tool.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-zinc-900">
          {tryNextRoutes.map((route) => (
            <TrackedLink
              key={route}
              href={route}
              eventName="click_try_next"
              eventProps={{ from: "text-cleaner", to: route }}
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
          Clean lists and prep text for imports fast.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-zinc-900">
          <Link className="underline" href="/use-cases/clean-dedupe">
            View all clean & dedupe use cases
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
