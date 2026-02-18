"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import Button from "../../components/Button";
import TextArea from "../../components/TextArea";
import ToolLayout from "../../components/ToolLayout";
import { sanitizeText } from "../../lib/text-safety";
import {
  DEFAULT_OPTIONS,
  removeDuplicates,
  type RemoveOptions,
} from "../../lib/remove-duplicates";
import Link from "next/link";

const MAX_INPUT_CHARS = 100_000;
const TOOL_URL = "https://text-tool.live/remove-duplicates";

const TOOL_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Remove Duplicate Lines",
  url: TOOL_URL,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  description:
    "Remove duplicate lines from text with options for case sensitivity, trimming, and order preservation.",
};

const FAQ_ITEMS = [
  {
    question: "Does it keep the original order of lines?",
    answer:
      "Yes. When keep first is enabled, the original order is preserved.",
  },
  {
    question: "Can I remove duplicates ignoring case?",
    answer:
      "Yes. Disable case sensitivity to compare lines without case differences.",
  },
  {
    question: "What happens when trimming is enabled?",
    answer:
      "Lines are compared after trimming whitespace, while the original line is kept in the output.",
  },
  {
    question: "Will this remove empty lines?",
    answer:
      "Yes. Enable the remove empty lines option to drop blank rows.",
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


export default function RemoveDuplicatesPage() {
  const [text, setText] = useState("");
  const [options, setOptions] = useState<RemoveOptions>(DEFAULT_OPTIONS);
  const [status, setStatus] = useState("");
  const statusTimeoutRef = useRef<number | null>(null);

  const result = useMemo(() => removeDuplicates(text, options), [text, options]);

  useEffect(() => {
    return () => {
      if (statusTimeoutRef.current) {
        window.clearTimeout(statusTimeoutRef.current);
      }
    };
  }, []);

  const showStatus = (message: string) => {
    setStatus(message);
    if (statusTimeoutRef.current) {
      window.clearTimeout(statusTimeoutRef.current);
    }
    statusTimeoutRef.current = window.setTimeout(() => {
      setStatus("");
    }, 2400);
  };

  const updateOption = (key: keyof RemoveOptions) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleClear = () => {
    setText("");
    showStatus("Cleared input.");
  };

  const handleCopy = async () => {
    if (!result.output) {
      showStatus("Nothing to copy yet.");
      return;
    }

    try {
      await navigator.clipboard.writeText(result.output);
      showStatus("Copied output to clipboard.");
    } catch (error) {
      showStatus("Copy failed. Please try again.");
    }
  };

  const handleDownload = () => {
    if (!result.output) {
      showStatus("Nothing to download yet.");
      return;
    }

    const blob = new Blob([result.output], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "unique-lines.txt";
    link.click();
    window.URL.revokeObjectURL(url);
    showStatus("Downloaded output.");
  };

  const handleProcess = () => {
    showStatus("Processed.");
  };

  return (
    <ToolLayout
      title="Remove Duplicate Lines"
      description="Remove repeated lines while preserving the line break style in your text. Adjust the options to control how duplicates are detected."
    >
      <script type="application/ld+json">{JSON.stringify(TOOL_JSON_LD)}</script>
      <script type="application/ld+json">{JSON.stringify(FAQ_JSON_LD)}</script>
      <section className="grid gap-6 rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_70px_-40px_rgba(15,23,42,0.45)] sm:grid-cols-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Total lines
          </p>
          <p className="mt-2 text-3xl font-semibold text-zinc-900">
            {result.totalLines}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Unique lines
          </p>
          <p className="mt-2 text-3xl font-semibold text-zinc-900">
            {result.uniqueLines}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Removed duplicates
          </p>
          <p className="mt-2 text-3xl font-semibold text-zinc-900">
            {result.removedDuplicates}
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_70px_-40px_rgba(15,23,42,0.45)]">
          <TextArea
            id="remove-duplicates-input"
            label="Input"
            value={text}
            onChange={(event) =>
              setText(sanitizeText(event.target.value, MAX_INPUT_CHARS))
            }
            placeholder="Paste or type your lines here..."
            maxLength={MAX_INPUT_CHARS}
          />
        </div>

        <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_70px_-40px_rgba(15,23,42,0.45)]">
          <TextArea
            id="remove-duplicates-output"
            label="Output"
            readOnly
            value={result.output}
            placeholder="Your unique lines will appear here."
            maxLength={MAX_INPUT_CHARS}
            helperText="Output refreshes automatically when text or options change."
          />
        </div>
      </section>

      <section className="flex flex-col gap-6 rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_70px_-40px_rgba(15,23,42,0.45)]">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="flex items-center gap-3 text-sm font-semibold text-zinc-700">
            <input
              type="checkbox"
              checked={options.caseSensitive}
              onChange={() => updateOption("caseSensitive")}
              className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-400"
            />
            Case sensitive
          </label>
          <label className="flex items-center gap-3 text-sm font-semibold text-zinc-700">
            <input
              type="checkbox"
              checked={options.trimWhitespace}
              onChange={() => updateOption("trimWhitespace")}
              className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-400"
            />
            Trim whitespace before comparing
          </label>
          <label className="flex items-center gap-3 text-sm font-semibold text-zinc-700">
            <input
              type="checkbox"
              checked={options.keepFirst}
              onChange={() => updateOption("keepFirst")}
              className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-400"
            />
            Keep first occurrence order
          </label>
          <label className="flex items-center gap-3 text-sm font-semibold text-zinc-700">
            <input
              type="checkbox"
              checked={options.removeEmpty}
              onChange={() => updateOption("removeEmpty")}
              className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-400"
            />
            Remove empty lines
          </label>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={handleProcess} variant="secondary">
            Process
          </Button>
          <Button onClick={handleClear} variant="secondary">
            Clear
          </Button>
          <Button onClick={handleCopy} variant="secondary">
            Copy Output
          </Button>
          <Button onClick={handleDownload} variant="primary">
            Download Output
          </Button>
        </div>

        <div className="grid gap-2 text-xs text-zinc-500 sm:grid-cols-2">
          <p>Trim mode compares trimmed lines, while output keeps the original line.</p>
          <p>When keep first is disabled, the last unique occurrence is kept.</p>
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
        <Link className="text-zinc-900 underline" href="/case-converter">
          Case Converter
        </Link>
        <Link className="text-zinc-900 underline" href="/text-to-speech">
          Text to Speech
        </Link>
      </section>

      {status ? (
        <div className="fixed bottom-6 right-6 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 shadow-lg">
          {status}
        </div>
      ) : null}
    </ToolLayout>
  );
}
