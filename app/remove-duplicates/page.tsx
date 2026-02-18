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

const MAX_INPUT_CHARS = 100_000;


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

      {status ? (
        <div className="fixed bottom-6 right-6 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 shadow-lg">
          {status}
        </div>
      ) : null}
    </ToolLayout>
  );
}
