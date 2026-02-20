import type { Metadata } from "next";

import UseCaseCategoryPage from "../../../components/UseCaseCategoryPage";

export const metadata: Metadata = {
  title: "Remove Duplicate Lines Use Cases",
  description: "Browse use cases for cleaning lists, logs, and exports.",
  alternates: {
    canonical: "https://text-tool.live/use-cases/remove-duplicates",
  },
  openGraph: {
    url: "https://text-tool.live/use-cases/remove-duplicates",
    title: "Remove Duplicate Lines Use Cases",
    description: "Browse use cases for cleaning lists, logs, and exports.",
    images: [
      {
        url: "https://text-tool.live/og.svg",
        width: 1200,
        height: 630,
        alt: "Remove duplicate lines use cases",
      },
    ],
  },
  twitter: {
    title: "Remove Duplicate Lines Use Cases",
    description: "Browse use cases for cleaning lists, logs, and exports.",
    images: ["https://text-tool.live/og.svg"],
  },
};

export default function RemoveDuplicatesUseCasesPage() {
  return (
    <UseCaseCategoryPage
      toolRoute="/remove-duplicates"
      title="Remove Duplicate Lines Use Cases"
      description="Clean lists, logs, and exports."
    />
  );
}
