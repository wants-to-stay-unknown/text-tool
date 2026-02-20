import Link from "next/link";

import {
  getUseCasesByCategorySlug,
  getUseCasesByToolRoute,
} from "../lib/use-cases";

type ToolUseCaseGridProps = {
  categorySlug: string;
  toolRoute: string;
  title: string;
  description: string;
  categoryLabel: string;
};

export default function ToolUseCaseGrid({
  categorySlug,
  toolRoute,
  title,
  description,
  categoryLabel,
}: ToolUseCaseGridProps) {
  const categoryUseCases = getUseCasesByCategorySlug(categorySlug);
  const primaryUseCases = getUseCasesByToolRoute(toolRoute);
  const secondaryUseCases = categoryUseCases.filter(
    (useCase) => useCase.primaryToolRoute !== toolRoute,
  );
  const picks = [...primaryUseCases, ...secondaryUseCases].slice(0, 8);

  return (
    <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)]">
      <h2 className="text-lg font-semibold text-zinc-900">{title}</h2>
      <p className="mt-2 text-sm text-zinc-600">{description}</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {picks.map((useCase) => (
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
      <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-zinc-600">
        <Link className="underline" href={`/use-cases/${categorySlug}`}>
          View all {categoryLabel}
        </Link>
      </div>
    </section>
  );
}
