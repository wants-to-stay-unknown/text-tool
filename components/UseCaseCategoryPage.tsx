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
  searchParams?: Record<string, string | string[] | undefined>;
};

type SortOption = "title_asc" | "title_desc";

function getSearchParam(
  searchParams: UseCaseCategoryPageProps["searchParams"],
  key: string,
) {
  const value = searchParams?.[key];
  return typeof value === "string" ? value : "";
}

export default function UseCaseCategoryPage({
  categorySlug,
  toolRoute,
  title,
  description,
  searchParams,
}: UseCaseCategoryPageProps) {
  const category = categorySlug
    ? USE_CASE_CATEGORIES.find((item) => item.slug === categorySlug)
    : null;

  const resolvedToolRoute = toolRoute ?? category?.toolRoutes[0];
  const tool = resolvedToolRoute ? TOOL_BY_ROUTE[resolvedToolRoute] : null;
  const baseUseCases = categorySlug
    ? getUseCasesByCategorySlug(categorySlug)
    : resolvedToolRoute
      ? getUseCasesByToolRoute(resolvedToolRoute)
      : [];
  const popularUseCases = POPULAR_USE_CASE_SLUGS.map(
    (slug) => USE_CASE_BY_SLUG[slug],
  ).filter(Boolean);

  const rawQuery = getSearchParam(searchParams, "q").trim();
  const query = rawQuery.toLowerCase();
  const sort = (getSearchParam(searchParams, "sort") || "title_asc") as SortOption;
  const toolFilter = getSearchParam(searchParams, "tool");

  const filteredByTool =
    toolFilter && toolFilter !== "all"
      ? baseUseCases.filter((useCase) => useCase.primaryToolRoute === toolFilter)
      : baseUseCases;

  const filteredUseCases = query
    ? filteredByTool.filter((useCase) => {
        const haystack = `${useCase.title} ${useCase.description} ${useCase.h1}`.toLowerCase();
        return haystack.includes(query);
      })
    : filteredByTool;

  const sortedUseCases = [...filteredUseCases].sort((a, b) => {
    if (sort === "title_desc") {
      return b.title.localeCompare(a.title);
    }
    return a.title.localeCompare(b.title);
  });

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

      <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm">
        <form className="grid gap-4 sm:grid-cols-3" method="get">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Search
            </label>
            <input
              type="search"
              name="q"
              defaultValue={rawQuery}
              placeholder="Search use cases"
              className="rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 shadow-sm"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Tool filter
            </label>
            <select
              name="tool"
              defaultValue={toolFilter || "all"}
              className="rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 shadow-sm"
            >
              <option value="all">All tools</option>
              {(category?.toolRoutes ?? (resolvedToolRoute ? [resolvedToolRoute] : [])).map(
                (route) => (
                  <option key={route} value={route}>
                    {TOOL_BY_ROUTE[route]?.name ?? route}
                  </option>
                ),
              )}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Sort
            </label>
            <select
              name="sort"
              defaultValue={sort}
              className="rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 shadow-sm"
            >
              <option value="title_asc">Title A–Z</option>
              <option value="title_desc">Title Z–A</option>
            </select>
          </div>
          <div className="sm:col-span-3 flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              Apply filters
            </button>
            {(query || toolFilter || sort !== "title_asc") && (
              <Link
                href={categorySlug ? `/use-cases/${categorySlug}` : "/use-cases"}
                className="rounded-full border border-zinc-200 bg-white px-5 py-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-300 hover:text-zinc-900"
              >
                Clear filters
              </Link>
            )}
          </div>
        </form>
        <p className="mt-4 text-sm text-zinc-600">
          Showing {sortedUseCases.length} use cases.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedUseCases.map((useCase) => (
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
