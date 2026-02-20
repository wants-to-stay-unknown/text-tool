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
  CASE_STYLE_LABEL,
  type CaseStyle,
  convertCaseStyle,
} from "../../lib/case-style-converter";
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
const TOOL_URL = "https://text-tool.live/case-style-converter";

const TOOL_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Case Style Converter",
  url: TOOL_URL,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  description:
    "Convert identifiers to camelCase, snake_case, or kebab-case instantly.",
};

const FAQ_ITEMS = [
  {
    question: "Does it handle existing separators?",
    answer:
      "Yes. Underscores, dashes, and spaces are normalized into the target style.",
  },
  {
    question: "Will it preserve numbers?",
    answer:
      "Yes, numbers are kept in place while words are re-cased.",
  },
  {
    question: "Can I convert multiple lines at once?",
    answer:
      "Yes, paste multi-line lists and each line converts independently.",
  },
  {
    question: "Is the conversion done locally?",
    answer: "Yes. The conversion runs entirely in your browser.",
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

export default function CaseStyleConverterPage() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<CaseStyle>("camel");
  const [hasUsed, setHasUsed] = useState(false);
  const [inputCopyLabel, setInputCopyLabel] = useState("Copy");
  const [outputCopyLabel, setOutputCopyLabel] = useState("Copy");
  const inputCopyTimeoutRef = useRef<number | null>(null);
  const outputCopyTimeoutRef = useRef<number | null>(null);
  const hasTrackedRef = useRef(false);

  const output = useMemo(() => convertCaseStyle(text, mode), [text, mode]);

  useEffect(() => {
    return () => {
      if (inputCopyTimeoutRef.current) {
        window.clearTimeout(inputCopyTimeoutRef.current);
      }
      if (outputCopyTimeoutRef.current) {
        window.clearTimeout(outputCopyTimeoutRef.current);
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
      setLabel("Copy");
    }, 1600);
  };

  const handleCopyOutput = async () => {
    if (!output) {
      showCopyStatus("Empty", setOutputCopyLabel, outputCopyTimeoutRef);
      return;
    }

    try {
      await navigator.clipboard.writeText(output);
      showCopyStatus("Copied", setOutputCopyLabel, outputCopyTimeoutRef);
      trackCopy("case-style-converter", {
        ...getTextMeta(output),
        target: "output",
        mode,
      });
    } catch (error) {
      showCopyStatus("Failed", setOutputCopyLabel, outputCopyTimeoutRef);
    }
  };

  const handleCopyInput = async () => {
    if (!text.trim()) {
      showCopyStatus("Empty", setInputCopyLabel, inputCopyTimeoutRef);
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      showCopyStatus("Copied", setInputCopyLabel, inputCopyTimeoutRef);
      trackCopy("case-style-converter", {
        ...getTextMeta(text),
        target: "input",
        mode,
      });
    } catch (error) {
      showCopyStatus("Failed", setInputCopyLabel, inputCopyTimeoutRef);
    }
  };

  const handleClear = () => {
    setText("");
    trackClear("case-style-converter");
  };

  const tryNextRoutes = TRY_NEXT_BY_TOOL["/case-style-converter"];
  const relatedToolRoutes = RELATED_TOOLS_BY_TOOL["/case-style-converter"];
  const popularUseCases = getUseCasesByToolRoute("/case-style-converter").slice(
    0,
    6,
  );
  const tips = TOOL_TIPS["/case-style-converter"];
  const postAction = POST_ACTION_SUGGESTIONS["/case-style-converter"];
  const postActionUseCase = USE_CASE_BY_SLUG[postAction.useCaseSlug];

  return (
    <ToolLayout
      title="Case Style Converter"
      description="Convert identifiers to camelCase, snake_case, or kebab-case with code-friendly output."
    >
      <AnalyticsEvent event="tool_page_view" props={{ tool: "case-style-converter" }} />
      <script type="application/ld+json">{JSON.stringify(TOOL_JSON_LD)}</script>
      <script type="application/ld+json">{JSON.stringify(FAQ_JSON_LD)}</script>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)]">
          <TextArea
            id="case-style-input"
            label="Input"
            labelAction={
              <button
                type="button"
                onClick={handleCopyInput}
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
                  trackToolRun("case-style-converter", getTextMeta(nextValue), {
                    mode,
                  });
                  trackToolSuccess("case-style-converter", {
                    ...getTextMeta(nextValue),
                    mode,
                  });
                }
                trackInputChange("case-style-converter", {
                  ...getTextMeta(nextValue),
                  mode,
                });
              }
            }}
            onPaste={(event) => {
              const pasted = event.clipboardData.getData("text");
              if (pasted) {
                trackPaste("case-style-converter", {
                  ...getTextMeta(pasted),
                  mode,
                });
              }
            }}
            placeholder="Paste your identifiers or headings here..."
            maxLength={MAX_INPUT_CHARS}
            helperText="Line breaks are preserved across conversions."
          />
        </div>

        <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)]">
          <TextArea
            id="case-style-output"
            label="Output"
            labelAction={
              <>
                <span className="text-xs text-zinc-500">
                  Active:{" "}
                  <span className="font-semibold text-zinc-700">
                    {CASE_STYLE_LABEL[mode]}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={handleCopyOutput}
                  className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-600 transition hover:border-zinc-300 hover:text-zinc-900"
                >
                  {outputCopyLabel}
                </button>
              </>
            }
            value={output}
            readOnly
            placeholder="Converted identifiers appear here."
            maxLength={MAX_INPUT_CHARS}
            helperText="Output updates instantly as you type."
          />
        </div>
      </section>

      <section className="flex flex-col gap-6 rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)]">
        <div className="flex flex-wrap gap-3">
          {(Object.keys(CASE_STYLE_LABEL) as CaseStyle[]).map((option) => (
            <Button
              key={option}
              onClick={() => setMode(option)}
              variant={mode === option ? "primary" : "secondary"}
            >
              {CASE_STYLE_LABEL[option]}
            </Button>
          ))}
          <Button onClick={handleClear} variant="secondary">
            Clear
          </Button>
          <Button onClick={handleCopyOutput} variant="primary">
            Copy Output
          </Button>
        </div>

        <div className="grid gap-2 text-sm text-zinc-600 sm:grid-cols-2">
          <p>Use camelCase for JavaScript and TypeScript variables.</p>
          <p>snake_case works well for database columns and CSV headers.</p>
          <p>kebab-case is common for URLs, slugs, and CSS classes.</p>
          <p>Paste multi-line lists to convert identifiers in bulk.</p>
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)]">
        <h2 className="text-lg font-semibold text-zinc-900">Try next</h2>
        <p className="mt-2 text-sm text-zinc-600">
          Keep formatting flowing with another tool.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-zinc-900">
          {tryNextRoutes.map((route) => (
            <TrackedLink
              key={route}
              href={route}
              eventName="click_try_next"
              eventProps={{ from: "case-style-converter", to: route }}
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
          Standardize identifiers quickly across your stack.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-zinc-900">
          <Link className="underline" href="/use-cases/case-format">
            View all case & format use cases
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
