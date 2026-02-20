import Link from "next/link";

import {
  POPULAR_USE_CASE_SLUGS,
  USE_CASE_BY_SLUG,
  USE_CASE_CATEGORIES,
} from "../lib/use-cases";
import { TOOLS } from "../lib/tools";
import TrackedLink from "../components/TrackedLink";

const HOME_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Text Tool",
  url: "https://text-tool.live",
  description:
    "Fast, privacy-first text utilities including word counting, case conversion, duplicate line removal, and text to speech.",
  inLanguage: "en",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-16 sm:px-10 lg:px-12 lg:py-24">
        <script type="application/ld+json">
          {JSON.stringify(HOME_JSON_LD)}
        </script>

        <header className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/70 p-10 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.4)] backdrop-blur">
          <div className="pointer-events-none absolute -top-24 right-10 h-56 w-56 rounded-full bg-gradient-to-br from-indigo-200/70 via-sky-200/70 to-transparent blur-2xl" />
          <div className="pointer-events-none absolute -bottom-32 left-0 h-64 w-64 rounded-full bg-gradient-to-br from-rose-200/60 via-amber-200/60 to-transparent blur-2xl" />
          <div className="relative flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/80 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-zinc-600">
              Text Tool Suite
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
              Fast, free text tools
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-zinc-600">
              Convert, count, clean, and listen to text instantly. Use the tools
              together to move from draft to publish-ready content without
              friction.
            </p>
            <div className="flex flex-wrap gap-4">
              <TrackedLink
                href="/word-counter"
                eventName="select_content"
                eventProps={{
                  content_type: "tool",
                  item_id: "word-counter",
                  context: "home_hero_cta",
                }}
                className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-zinc-800"
              >
                Start using tools
              </TrackedLink>
              <Link
                href="/use-cases"
                className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300"
              >
                Browse use cases
              </Link>
            </div>
          </div>
        </header>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TOOLS.map((tool) => (
            <TrackedLink
              key={tool.route}
              href={tool.route}
              eventName="select_content"
              eventProps={{
                content_type: "tool",
                item_id: tool.slug,
                context: "home_tool_card",
              }}
              className="group rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.35)] transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_28px_70px_-35px_rgba(15,23,42,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-900 text-sm font-semibold text-white">
                {tool.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-zinc-900">
                {tool.name}
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                {tool.description}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 transition group-hover:text-zinc-700">
                {tool.ctaLabel}
                <span className="text-base leading-none">→</span>
              </span>
            </TrackedLink>
          ))}
        </section>

        <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)]">
          <h2 className="text-lg font-semibold text-zinc-900">
            Popular use cases
          </h2>
          <p className="mt-2 text-sm text-zinc-600">
            Pick a real workflow and jump into the best tool for the job.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {POPULAR_USE_CASE_SLUGS.map((slug) => {
              const useCase = USE_CASE_BY_SLUG[slug];
              if (!useCase) {
                return null;
              }
              return (
                <Link
                  key={useCase.slug}
                  href={`/use-cases/${useCase.slug}`}
                  className="rounded-2xl border border-zinc-200/80 bg-zinc-50 p-4 text-sm text-zinc-600 transition hover:border-zinc-300 hover:bg-white"
                >
                  <p className="font-semibold text-zinc-900">{useCase.title}</p>
                  <p className="mt-2">{useCase.description}</p>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)]">
          <h2 className="text-lg font-semibold text-zinc-900">Why this is fast</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Everything runs locally in your browser, so there are no uploads or
            wait times. Each tool is lightweight, focused, and designed to open
            instantly on any device.
          </p>
        </section>

        <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)]">
          <h2 className="text-lg font-semibold text-zinc-900">
            Explore by category
          </h2>
          <p className="mt-2 text-sm text-zinc-600">
            Start with a category, then pick a specific use case.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-zinc-900">
            {USE_CASE_CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                className="underline"
                href={`/use-cases/${category.slug}`}
              >
                {category.title}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
