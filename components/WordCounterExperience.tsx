"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";

import WordCounterTool from "./WordCounterTool";
import { POST_ACTION_SUGGESTIONS, TOOL_BY_ROUTE } from "../lib/tools";
import { USE_CASE_BY_SLUG } from "../lib/use-cases";

type WordCounterExperienceProps = {
  afterTool?: ReactNode;
};

export default function WordCounterExperience({
  afterTool,
}: WordCounterExperienceProps) {
  const [hasUsed, setHasUsed] = useState(false);
  const suggestion = POST_ACTION_SUGGESTIONS["/word-counter"];
  const toolLinks = suggestion.tools.map((route) => TOOL_BY_ROUTE[route]);
  const useCase = USE_CASE_BY_SLUG[suggestion.useCaseSlug];

  return (
    <>
      <WordCounterTool onUse={() => setHasUsed(true)} />
      {afterTool}
      {hasUsed ? (
        <section className="rounded-3xl border border-zinc-200/80 bg-white p-5 text-sm text-zinc-600 shadow-sm">
          <p className="font-semibold text-zinc-900">
            Next, you might want to...
          </p>
          <div className="mt-3 flex flex-wrap gap-3 text-sm font-semibold text-zinc-600">
            {toolLinks.map((tool) => (
              <Link key={tool.route} className="underline" href={tool.route}>
                {tool.name}
              </Link>
            ))}
            {useCase ? (
              <Link className="underline" href={`/use-cases/${useCase.slug}`}>
                {useCase.title}
              </Link>
            ) : null}
          </div>
        </section>
      ) : null}
    </>
  );
}
