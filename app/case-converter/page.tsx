"use client";

import {
  type MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Button from "../../components/Button";
import TextArea from "../../components/TextArea";
import ToolLayout from "../../components/ToolLayout";
import AnalyticsEvent from "../../components/AnalyticsEvent";
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
import { sanitizeText } from "../../lib/text-safety";
import {
  applyCaseMode,
  MODE_HELP,
  MODE_LABEL,
  type CaseMode,
} from "../../lib/case-converter";
import Link from "next/link";
import { getUseCasesByToolRoute, USE_CASE_BY_SLUG } from "../../lib/use-cases";
import {
  POST_ACTION_SUGGESTIONS,
  RELATED_TOOLS_BY_TOOL,
  TOOL_BY_ROUTE,
  TOOL_TIPS,
  TRY_NEXT_BY_TOOL,
} from "../../lib/tools";

const MAX_INPUT_CHARS = 100_000;
const TOOL_URL = "https://text-tool.live/case-converter";

const TOOL_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Case Converter",
  url: TOOL_URL,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  description:
    "Convert text to uppercase, lowercase, title case, sentence case, or toggle case in your browser.",
};

const FAQ_ITEMS = [
  {
    question: "What is the difference between title case and sentence case?",
    answer:
      "Title case capitalizes each word, while sentence case capitalizes only the first word of each sentence.",
  },
  {
    question: "Does the converter keep line breaks?",
    answer: "Yes. The converter keeps line breaks and formatting intact.",
  },
  {
    question: "Can I convert large blocks of text?",
    answer:
      "Yes. The tool supports long text and updates the output instantly.",
  },
  {
    question: "Is this tool free to use?",
    answer: "Yes. It runs in your browser and does not require sign-up.",
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


export default function CaseConverterPage() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<CaseMode>("lowercase");
  const [toast, setToast] = useState("");
  const [hasUsed, setHasUsed] = useState(false);
  const [inputCopyLabel, setInputCopyLabel] = useState("Copy");
  const [outputCopyLabel, setOutputCopyLabel] = useState("Copy");
  const toastTimeoutRef = useRef<number | null>(null);
  const inputCopyTimeoutRef = useRef<number | null>(null);
  const outputCopyTimeoutRef = useRef<number | null>(null);
  const hasTrackedRef = useRef(false);

  const output = useMemo(() => applyCaseMode(text, mode), [text, mode]);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        window.clearTimeout(toastTimeoutRef.current);
      }
      if (inputCopyTimeoutRef.current) {
        window.clearTimeout(inputCopyTimeoutRef.current);
      }
      if (outputCopyTimeoutRef.current) {
        window.clearTimeout(outputCopyTimeoutRef.current);
      }
    };
  }, []);

  const showToast = (message: string) => {
    setToast(message);
    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = window.setTimeout(() => {
      setToast("");
    }, 2400);
  };

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

  const trackUse = () => {
    if (!hasTrackedRef.current) {
      hasTrackedRef.current = true;
      setHasUsed(true);
    }
  };

  const handleCopy = async () => {
    if (!output) {
      showCopyStatus("Empty", setOutputCopyLabel, outputCopyTimeoutRef);
      return;
    }

    try {
      await navigator.clipboard.writeText(output);
      showCopyStatus("Copied", setOutputCopyLabel, outputCopyTimeoutRef);
      trackCopy("case-converter", {
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
      trackCopy("case-converter", {
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
    showToast("Cleared input.");
    trackClear("case-converter");
  };

  const tryNextRoutes = TRY_NEXT_BY_TOOL["/case-converter"];
  const relatedToolRoutes = RELATED_TOOLS_BY_TOOL["/case-converter"];
  const popularUseCases = getUseCasesByToolRoute("/case-converter").slice(0, 6);
  const tips = TOOL_TIPS["/case-converter"];
  const postAction = POST_ACTION_SUGGESTIONS["/case-converter"];
  const postActionUseCase = USE_CASE_BY_SLUG[postAction.useCaseSlug];

  return (
    <ToolLayout
      title="Case Converter"
      description="Convert text case instantly. Choose a mode and your output updates live as you type."
    >
      <AnalyticsEvent event="tool_page_view" props={{ tool: "case-converter" }} />
      <script type="application/ld+json">{JSON.stringify(TOOL_JSON_LD)}</script>
      <script type="application/ld+json">{JSON.stringify(FAQ_JSON_LD)}</script>
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_70px_-40px_rgba(15,23,42,0.45)]">
          <TextArea
            id="case-converter-input"
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
                trackUse();
                trackInputChange("case-converter", {
                  ...getTextMeta(nextValue),
                  mode,
                });
              }
            }}
            onPaste={(event) => {
              const pasted = event.clipboardData.getData("text");
              if (pasted) {
                trackPaste("case-converter", {
                  ...getTextMeta(pasted),
                  mode,
                });
              }
            }}
            placeholder="Paste or type your text here..."
            maxLength={MAX_INPUT_CHARS}
            helperText="Line breaks are preserved across conversions."
          />
        </div>

        <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_70px_-40px_rgba(15,23,42,0.45)]">
          <TextArea
            id="case-converter-output"
            label="Output"
            labelAction={
              <>
                <span className="text-xs text-zinc-500">
                  Active:{" "}
                  <span className="font-semibold text-zinc-700">
                    {MODE_LABEL[mode]}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-600 transition hover:border-zinc-300 hover:text-zinc-900"
                >
                  {outputCopyLabel}
                </button>
              </>
            }
            value={output}
            readOnly
            placeholder="Your converted text will appear here."
            maxLength={MAX_INPUT_CHARS}
            helperText="Output updates instantly as you type."
          />
        </div>
      </section>

      <section className="flex flex-col gap-6 rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_70px_-40px_rgba(15,23,42,0.45)]">
        <div className="flex flex-wrap gap-3">
          {(Object.keys(MODE_LABEL) as CaseMode[]).map((option) => (
            <Button
              key={option}
              onClick={() => {
                setMode(option);
                if (text.trim()) {
                  trackUse();
                  const inputMeta = getTextMeta(text);
                  const outputMeta = getTextMeta(applyCaseMode(text, option));
                  trackToolRun("case-converter", inputMeta, { mode: option });
                  trackToolSuccess("case-converter", {
                    ...outputMeta,
                    mode: option,
                  });
                }
              }}
              variant={mode === option ? "primary" : "secondary"}
            >
              {MODE_LABEL[option]}
            </Button>
          ))}
          <Button onClick={handleClear} variant="secondary">
            Clear
          </Button>
          <Button onClick={handleCopy} variant="primary">
            Copy Output
          </Button>
        </div>

        <div className="grid gap-2 text-sm text-zinc-600 sm:grid-cols-2">
          {(Object.keys(MODE_HELP) as CaseMode[]).map((option) => (
            <div key={option} className="flex items-start gap-2">
              <span className="mt-0.5 inline-flex h-2 w-2 rounded-full bg-zinc-300" />
              <span>
                <span className="font-semibold text-zinc-900">
                  {MODE_LABEL[option]}:
                </span>{" "}
                {MODE_HELP[option]}
              </span>
            </div>
          ))}
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
              eventProps={{ from: "case-converter", to: route }}
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
          Use case guides to fix case fast.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-zinc-900">
          <Link className="underline" href="/use-cases/case-converter">
            View all case converter use cases
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

      {hasUsed ? (
        <section className="rounded-3xl border border-zinc-200/80 bg-white p-5 text-sm text-zinc-600 shadow-sm">
          <p className="font-semibold text-zinc-900">
            Next, you might want to...
          </p>
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

      {toast ? (
        <div className="fixed bottom-6 right-6 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 shadow-lg">
          {toast}
        </div>
      ) : null}
    </ToolLayout>
  );
}
