"use client";

import { useMemo, useState } from "react";

import TextArea from "../../components/TextArea";
import ToolLayout from "../../components/ToolLayout";
import { sanitizeText } from "../../lib/text-safety";
import { countTextStats } from "../../lib/word-counter";

const MAX_INPUT_CHARS = 100_000;

export default function WordCounterPage() {
  const [text, setText] = useState("");

  const stats = useMemo(() => countTextStats(text), [text]);

  return (
    <ToolLayout
      title="Word Counter"
      description="Paste or type your text to see live word and character counts."
      maxWidthClassName="max-w-4xl"
    >
      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-35px_rgba(15,23,42,0.45)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Word count
          </p>
          <p className="mt-3 text-3xl font-semibold text-zinc-900">
            {stats.words}
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-35px_rgba(15,23,42,0.45)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Character count
          </p>
          <p className="mt-3 text-3xl font-semibold text-zinc-900">
            {stats.characters}
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-35px_rgba(15,23,42,0.45)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Characters (no spaces)
          </p>
          <p className="mt-3 text-3xl font-semibold text-zinc-900">
            {stats.charactersNoSpaces}
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_70px_-40px_rgba(15,23,42,0.45)]">
        <TextArea
          id="word-counter-text"
          label="Text input"
          value={text}
          onChange={(event) =>
            setText(sanitizeText(event.target.value, MAX_INPUT_CHARS))
          }
          placeholder="Start typing or paste your text here..."
          maxLength={MAX_INPUT_CHARS}
          helperText="Live updates as you type. Whitespace is ignored for the no-spaces count."
        />
      </section>
    </ToolLayout>
  );
}
