import Link from "next/link";
import type { Metadata } from "next";

import ToolLayout from "../../components/ToolLayout";
import {
  POPULAR_USE_CASE_SLUGS,
  USE_CASE_BY_SLUG,
  USE_CASE_CATEGORIES,
} from "../../lib/use-cases";
import { TOOLS } from "../../lib/tools";

export default function UseCasesIndexPage() {
  const popularUseCases = POPULAR_USE_CASE_SLUGS.map(
    (slug) => USE_CASE_BY_SLUG[slug],
  ).filter(Boolean);

  return (
    <ToolLayout
      title="Use cases"
      description="Find a practical use case, then jump into the right tool to get it done."
      maxWidthClassName="max-w-6xl"
    >
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TOOLS.map((tool) => (
          <Link
            key={tool.route}
            href={tool.useCaseCategoryRoute}
            className="rounded-3xl border border-zinc-200/80 bg-white p-5 text-sm text-zinc-600 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              {tool.name}
            </p>
            <p className="mt-3 text-base font-semibold text-zinc-900">
              {tool.benefit}
            </p>
            <p className="mt-2">{tool.description}</p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-zinc-900">
              View use cases →
            </span>
          </Link>
        ))}
      </section>

      <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-zinc-900">Popular use cases</h2>
        <p className="mt-2 text-sm text-zinc-600">
          Start with these high-intent workflows and jump straight into the tool.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popularUseCases.map((useCase) => (
            <Link
              key={useCase.slug}
              href={`/use-cases/${useCase.slug}`}
              className="rounded-2xl border border-zinc-200/80 bg-zinc-50 p-4 text-sm text-zinc-600 transition hover:border-zinc-300 hover:bg-white"
            >
              <p className="font-semibold text-zinc-900">{useCase.title}</p>
              <p className="mt-2">{useCase.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {USE_CASE_CATEGORIES.map((category) => (
          <Link
            key={category.slug}
            href={`/use-cases/${category.slug}`}
            className="rounded-3xl border border-zinc-200/80 bg-white p-6 text-sm text-zinc-600 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
          >
            <p className="text-base font-semibold text-zinc-900">
              {category.title}
            </p>
            <p className="mt-2">{category.description}</p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-zinc-900">
              Explore {category.title.toLowerCase()} →
            </span>
          </Link>
        ))}
      </section>
    </ToolLayout>
  );
}

export const metadata: Metadata = {
  title: "Use Cases",
  description:
    "Browse practical use cases for word counting, case conversion, duplicate removal, and text to speech.",
  alternates: {
    canonical: "https://text-tool.live/use-cases",
  },
  openGraph: {
    url: "https://text-tool.live/use-cases",
    title: "Use Cases",
    description:
      "Browse practical use cases for word counting, case conversion, duplicate removal, and text to speech.",
    images: [
      {
        url: "https://text-tool.live/og.svg",
        width: 1200,
        height: 630,
        alt: "Text Tool use cases",
      },
    ],
  },
  twitter: {
    title: "Use Cases",
    description:
      "Browse practical use cases for word counting, case conversion, duplicate removal, and text to speech.",
    images: ["https://text-tool.live/og.svg"],
  },
};
