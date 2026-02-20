import type { Metadata } from "next";

import UseCaseCategoryPage from "../../../components/UseCaseCategoryPage";

export const metadata: Metadata = {
  title: "Clean & Dedupe Use Cases",
  description:
    "Browse use cases for cleaning lists, removing duplicates, and sorting text.",
  alternates: {
    canonical: "https://text-tool.live/use-cases/clean-dedupe",
  },
  openGraph: {
    url: "https://text-tool.live/use-cases/clean-dedupe",
    title: "Clean & Dedupe Use Cases",
    description:
      "Browse use cases for cleaning lists, removing duplicates, and sorting text.",
    images: [
      {
        url: "https://text-tool.live/og.svg",
        width: 1200,
        height: 630,
        alt: "Clean & Dedupe use cases",
      },
    ],
  },
  twitter: {
    title: "Clean & Dedupe Use Cases",
    description:
      "Browse use cases for cleaning lists, removing duplicates, and sorting text.",
    images: ["https://text-tool.live/og.svg"],
  },
};

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function CleanDedupeUseCasesPage({ searchParams }: PageProps) {
  return (
    <UseCaseCategoryPage categorySlug="clean-dedupe" searchParams={searchParams} />
  );
}
