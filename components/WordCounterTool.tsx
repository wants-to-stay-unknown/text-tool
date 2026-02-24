"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import TextArea from "./TextArea";
import {
  getTextMeta,
  trackCopy,
  trackInputChange,
  trackPaste,
  trackToolRun,
  trackToolSuccess,
  trackToolUsed,
} from "../lib/analytics";
import { sanitizeText } from "../lib/text-safety";
import { countTextStats } from "../lib/word-counter";

const MAX_INPUT_CHARS = 100_000;

type WordCounterToolProps = {
  onUse?: () => void;
};

export default function WordCounterTool({ onUse }: WordCounterToolProps) {
  const [text, setText] = useState("");
  const stats = useMemo(() => countTextStats(text), [text]);
  const hasTrackedRef = useRef(false);
  const [copyLabel, setCopyLabel] = useState("Copy");
  const copyTimeoutRef = useRef<number | null>(null);

  const showCopyStatus = (label: string) => {
    setCopyLabel(label);
    if (copyTimeoutRef.current) {
      window.clearTimeout(copyTimeoutRef.current);
    }
    copyTimeoutRef.current = window.setTimeout(() => {
      setCopyLabel("Copy");
    }, 1600);
  };

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        window.clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const handleCopyInput = async () => {
    if (!text.trim()) {
      showCopyStatus("Empty");
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      showCopyStatus("Copied");
      trackCopy("word-counter", {
        ...getTextMeta(text),
        target: "input",
      });
    } catch (error) {
      showCopyStatus("Failed");
    }
  };

  return (
    <>
      <section className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-3 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-35px_rgba(15,23,42,0.45)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Word count
          </p>
          <p className="mt-3 text-3xl font-semibold text-zinc-900">
            {stats.words}
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-3 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-35px_rgba(15,23,42,0.45)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Character count
          </p>
          <p className="mt-3 text-3xl font-semibold text-zinc-900">
            {stats.characters}
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-3 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-35px_rgba(15,23,42,0.45)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Characters (no spaces)
          </p>
          <p className="mt-3 text-3xl font-semibold text-zinc-900">
            {stats.charactersNoSpaces}
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-3 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-35px_rgba(15,23,42,0.45)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Sentences
          </p>
          <p className="mt-3 text-3xl font-semibold text-zinc-900">
            {stats.sentences}
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-3 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-35px_rgba(15,23,42,0.45)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Paragraphs
          </p>
          <p className="mt-3 text-3xl font-semibold text-zinc-900">
            {stats.paragraphs}
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-3 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-35px_rgba(15,23,42,0.45)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Reading time (min)
          </p>
          <p className="mt-3 text-3xl font-semibold text-zinc-900">
            {stats.readingTimeMinutes}
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-3 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-35px_rgba(15,23,42,0.45)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Speaking time (min)
          </p>
          <p className="mt-3 text-3xl font-semibold text-zinc-900">
            {stats.speakingTimeMinutes}
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_70px_-40px_rgba(15,23,42,0.45)]">
        <TextArea
          id="word-counter-text"
          label="Text input"
          labelAction={
            <button
              type="button"
              onClick={handleCopyInput}
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
              trackToolRun("word-counter", meta);
              trackToolSuccess("word-counter", meta);
              trackToolUsed("word-counter", "input");
              onUse?.();
            }
            if (nextValue.trim()) {
              trackInputChange("word-counter", getTextMeta(nextValue));
            }
          }}
          onPaste={(event) => {
            const pasted = event.clipboardData.getData("text");
            if (pasted) {
              trackPaste("word-counter", getTextMeta(pasted));
            }
          }}
          placeholder="Start typing or paste your text here..."
          maxLength={MAX_INPUT_CHARS}
          helperText="Live updates as you type. Whitespace is ignored for the no-spaces count."
        />
      </section>
    </>
  );
}
