import { CLUSTERS } from "../src/content/clusters";
import {
  USE_CASES,
  type UseCase,
  type UseCaseCrossLink,
  type UseCaseFaq,
} from "../src/content/useCases";
import { TOOLS } from "./tools";

export type { UseCase, UseCaseCrossLink, UseCaseFaq };
export { USE_CASES };

export const USE_CASE_BY_SLUG = Object.fromEntries(
  USE_CASES.map((useCase) => [useCase.slug, useCase]),
) as Record<string, UseCase>;

export const USE_CASE_CATEGORIES = [
  ...CLUSTERS.map((cluster) => ({
    slug: cluster.slug,
    title: cluster.useCaseCategoryTitle,
    description: cluster.useCaseCategoryDescription,
    toolRoutes: cluster.tools.map((tool) => tool.route),
  })),
  {
    slug: "text-to-speech",
    title: "Text to Speech Use Cases",
    description: "Listen to text for study, accessibility, and review.",
    toolRoutes: ["/text-to-speech"],
  },
];

export const POPULAR_USE_CASE_SLUGS = [
  "word-count-essay-500-1000-words",
  "word-count-blog-post",
  "character-count-twitter-x",
  "title-case-generator",
  "camelcase-to-snakecase",
  "remove-duplicate-lines",
  "clean-text-for-import",
  "text-to-speech-for-proofreading",
];

export function getUseCasesByToolRoute(route: string) {
  return USE_CASES.filter((useCase) => useCase.primaryToolRoute === route);
}

export function getUseCasesByCategorySlug(categorySlug: string) {
  const category = USE_CASE_CATEGORIES.find(
    (item) => item.slug === categorySlug,
  );
  if (!category) {
    return [];
  }

  return USE_CASES.filter((useCase) =>
    category.toolRoutes.includes(useCase.primaryToolRoute),
  );
}

export function getAlternateToolRoute(primaryToolRoute: string) {
  const alternate = TOOLS.find((tool) => tool.route !== primaryToolRoute);
  return alternate?.route ?? "/word-counter";
}
