import type { Metadata } from "next";

import UseCaseCategoryPage from "../../../components/UseCaseCategoryPage";

export const metadata: Metadata = {
  title: "Word & Limits Use Cases",
  description:
    "Browse use cases for word counts, character limits, and timing estimates.",
  alternates: {
    canonical: "https://text-tool.live/use-cases/word-limits",
  },
  openGraph: {
    url: "https://text-tool.live/use-cases/word-limits",
    title: "Word & Limits Use Cases",
    description:
      "Browse use cases for word counts, character limits, and timing estimates.",
    images: [
      {
        url: "https://text-tool.live/og.svg",
        width: 1200,
        height: 630,
        alt: "Word & Limits use cases",
      },
    ],
  },
  twitter: {
    title: "Word & Limits Use Cases",
    description:
      "Browse use cases for word counts, character limits, and timing estimates.",
    images: ["https://text-tool.live/og.svg"],
  },
};

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function WordLimitsUseCasesPage({ searchParams }: PageProps) {
  return (
    <UseCaseCategoryPage
      categorySlug="word-limits"
      searchParams={searchParams}
    />
  );
}
