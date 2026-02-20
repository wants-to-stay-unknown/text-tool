import type { Metadata } from "next";

import UseCaseCategoryPage from "../../../components/UseCaseCategoryPage";

export const metadata: Metadata = {
  title: "Case & Format Use Cases",
  description:
    "Browse use cases for capitalization, sentence casing, and code-friendly formats.",
  alternates: {
    canonical: "https://text-tool.live/use-cases/case-format",
  },
  openGraph: {
    url: "https://text-tool.live/use-cases/case-format",
    title: "Case & Format Use Cases",
    description:
      "Browse use cases for capitalization, sentence casing, and code-friendly formats.",
    images: [
      {
        url: "https://text-tool.live/og.svg",
        width: 1200,
        height: 630,
        alt: "Case & Format use cases",
      },
    ],
  },
  twitter: {
    title: "Case & Format Use Cases",
    description:
      "Browse use cases for capitalization, sentence casing, and code-friendly formats.",
    images: ["https://text-tool.live/og.svg"],
  },
};

export default function CaseFormatUseCasesPage() {
  return <UseCaseCategoryPage categorySlug="case-format" />;
}
