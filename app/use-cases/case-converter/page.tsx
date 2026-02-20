import type { Metadata } from "next";

import UseCaseCategoryPage from "../../../components/UseCaseCategoryPage";

export const metadata: Metadata = {
  title: "Case Converter Use Cases",
  description: "Browse case converter use cases for formatting and cleanup.",
  alternates: {
    canonical: "https://text-tool.live/use-cases/case-converter",
  },
  openGraph: {
    url: "https://text-tool.live/use-cases/case-converter",
    title: "Case Converter Use Cases",
    description: "Browse case converter use cases for formatting and cleanup.",
    images: [
      {
        url: "https://text-tool.live/og.svg",
        width: 1200,
        height: 630,
        alt: "Case Converter use cases",
      },
    ],
  },
  twitter: {
    title: "Case Converter Use Cases",
    description: "Browse case converter use cases for formatting and cleanup.",
    images: ["https://text-tool.live/og.svg"],
  },
};

export default function CaseConverterUseCasesPage() {
  return <UseCaseCategoryPage categorySlug="case-converter" />;
}
