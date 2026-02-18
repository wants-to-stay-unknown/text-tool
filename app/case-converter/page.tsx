"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import Button from "../../components/Button";
import TextArea from "../../components/TextArea";
import ToolLayout from "../../components/ToolLayout";
import { sanitizeText } from "../../lib/text-safety";
import {
  applyCaseMode,
  MODE_HELP,
  MODE_LABEL,
  type CaseMode,
} from "../../lib/case-converter";
import Link from "next/link";

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
  const toastTimeoutRef = useRef<number | null>(null);

  const output = useMemo(() => applyCaseMode(text, mode), [text, mode]);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        window.clearTimeout(toastTimeoutRef.current);
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

  const handleCopy = async () => {
    if (!output) {
      showToast("Nothing to copy yet.");
      return;
    }

    try {
      await navigator.clipboard.writeText(output);
      showToast("Copied output to clipboard.");
    } catch (error) {
      showToast("Copy failed. Please try again.");
    }
  };

  const handleClear = () => {
    setText("");
    showToast("Cleared input.");
  };

  return (
    <ToolLayout
      title="Case Converter"
      description="Convert text case instantly. Choose a mode and your output updates live as you type."
    >
      <script type="application/ld+json">{JSON.stringify(TOOL_JSON_LD)}</script>
      <script type="application/ld+json">{JSON.stringify(FAQ_JSON_LD)}</script>
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_70px_-40px_rgba(15,23,42,0.45)]">
          <TextArea
            id="case-converter-input"
            label="Input"
            value={text}
            onChange={(event) =>
              setText(sanitizeText(event.target.value, MAX_INPUT_CHARS))
            }
            placeholder="Paste or type your text here..."
            maxLength={MAX_INPUT_CHARS}
            helperText="Line breaks are preserved across conversions."
          />
        </div>

        <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_70px_-40px_rgba(15,23,42,0.45)]">
          <TextArea
            id="case-converter-output"
            label="Output"
            value={output}
            readOnly
            placeholder="Your converted text will appear here."
            maxLength={MAX_INPUT_CHARS}
            helperText={
              <>
                Active mode:{" "}
                <span className="font-semibold">{MODE_LABEL[mode]}</span>.
              </>
            }
          />
        </div>
      </section>

      <section className="flex flex-col gap-6 rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_70px_-40px_rgba(15,23,42,0.45)]">
        <div className="flex flex-wrap gap-3">
          {(Object.keys(MODE_LABEL) as CaseMode[]).map((option) => (
            <Button
              key={option}
              onClick={() => setMode(option)}
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
        <Link className="text-zinc-900 underline" href="/word-counter">
          Word Counter
        </Link>
        <Link className="text-zinc-900 underline" href="/remove-duplicates">
          Remove Duplicate Lines
        </Link>
        <Link className="text-zinc-900 underline" href="/text-to-speech">
          Text to Speech
        </Link>
      </section>

      {toast ? (
        <div className="fixed bottom-6 right-6 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 shadow-lg">
          {toast}
        </div>
      ) : null}
    </ToolLayout>
  );
}
