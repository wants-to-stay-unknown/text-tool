import Link from "next/link";

import ToolLayout from "./ToolLayout";
import {
  POPULAR_USE_CASE_SLUGS,
  USE_CASE_BY_SLUG,
  USE_CASE_CATEGORIES,
  getUseCasesByCategorySlug,
  getUseCasesByToolRoute,
} from "../lib/use-cases";
import { TOOL_BY_ROUTE } from "../lib/tools";

type UseCaseCategoryPageProps = {
  categorySlug?: string;
  toolRoute?: string;
  title?: string;
  description?: string;
};

export default function UseCaseCategoryPage({
  categorySlug,
  toolRoute,
  title,
  description,
}: UseCaseCategoryPageProps) {
  const category = categorySlug
    ? USE_CASE_CATEGORIES.find((item) => item.slug === categorySlug)
    : null;

  const resolvedToolRoute = toolRoute ?? category?.toolRoutes[0];
  const tool = resolvedToolRoute ? TOOL_BY_ROUTE[resolvedToolRoute] : null;
  const useCases = categorySlug
    ? getUseCasesByCategorySlug(categorySlug)
    : resolvedToolRoute
      ? getUseCasesByToolRoute(resolvedToolRoute)
      : [];
  const popularUseCases = POPULAR_USE_CASE_SLUGS.map(
    (slug) => USE_CASE_BY_SLUG[slug],
  ).filter(Boolean);

  return (
    <ToolLayout
      title={title ?? category?.title ?? "Use cases"}
      description={description ?? category?.description ?? ""}
      maxWidthClassName="max-w-6xl"
    >
      <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              {categorySlug ? "Tools in this category" : "Primary tool"}
            </p>
            {categorySlug ? (
              <div className="mt-3 flex flex-wrap gap-3 text-sm font-semibold text-zinc-900">
                {category?.toolRoutes.map((route) => (
                  <Link key={route} className="underline" href={route}>
                    {TOOL_BY_ROUTE[route]?.name}
                  </Link>
                ))}
              </div>
            ) : (
              <>
                <p className="mt-2 text-lg font-semibold text-zinc-900">
                  {tool?.name}
                </p>
                <p className="mt-2 text-sm text-zinc-600">{tool?.description}</p>
              </>
            )}
          </div>
          {resolvedToolRoute ? (
            <Link
              href={resolvedToolRoute}
              className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              Open {tool?.name}
            </Link>
          ) : null}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {useCases.map((useCase) => (
          <Link
            key={useCase.slug}
            href={`/use-cases/${useCase.slug}`}
            className="rounded-3xl border border-zinc-200/80 bg-white p-5 text-sm text-zinc-600 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
          >
            <p className="font-semibold text-zinc-900">{useCase.title}</p>
            <p className="mt-2">{useCase.description}</p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-zinc-900">
              View use case →
            </span>
          </Link>
        ))}
      </section>

      <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-zinc-900">
          Popular use cases across tools
        </h2>
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
    </ToolLayout>
  );
}
