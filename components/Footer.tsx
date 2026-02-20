import Link from "next/link";

import {
  POPULAR_USE_CASE_SLUGS,
  USE_CASE_BY_SLUG,
  USE_CASE_CATEGORIES,
} from "../lib/use-cases";
import { TOOLS } from "../lib/tools";

export default function Footer() {
  const popularUseCases = POPULAR_USE_CASE_SLUGS.map(
    (slug) => USE_CASE_BY_SLUG[slug],
  ).filter(Boolean);

  return (
    <footer className="border-t border-zinc-200/80 bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-10 text-xs text-zinc-600 sm:px-10 lg:px-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <span className="text-sm font-semibold text-zinc-900">
              Text Tool
            </span>
            <p>
              Fast, privacy-first utilities for counting, formatting, cleaning,
              and listening to text.
            </p>
            <Link className="font-semibold text-zinc-900" href="/use-cases">
              Browse use cases →
            </Link>
          </div>

          <div className="space-y-3">
            <span className="text-sm font-semibold text-zinc-900">Tools</span>
            <div className="flex flex-col gap-2">
              {TOOLS.map((tool) => (
                <Link key={tool.route} className="hover:text-zinc-900" href={tool.route}>
                  {tool.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-sm font-semibold text-zinc-900">
              Use case categories
            </span>
            <div className="flex flex-col gap-2">
              {USE_CASE_CATEGORIES.map((category) => (
                <Link
                  key={category.slug}
                  className="hover:text-zinc-900"
                  href={`/use-cases/${category.slug}`}
                >
                  {category.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-sm font-semibold text-zinc-900">
              Popular use cases
            </span>
            <div className="flex flex-col gap-2">
              {popularUseCases.map((useCase) => (
                <Link
                  key={useCase.slug}
                  className="hover:text-zinc-900"
                  href={`/use-cases/${useCase.slug}`}
                >
                  {useCase.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-zinc-200/80 pt-6 text-xs text-zinc-500 sm:flex-row">
          <span>© {new Date().getFullYear()} TextTool</span>
          <div className="flex flex-wrap items-center gap-4">
            <Link className="hover:text-zinc-700" href="/about">
              About
            </Link>
            <Link className="hover:text-zinc-700" href="/privacy-policy">
              Privacy Policy
            </Link>
            <Link className="hover:text-zinc-700" href="/terms-and-conditions">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
