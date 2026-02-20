import type { Metadata } from "next";

import UseCaseCategoryPage from "../../../components/UseCaseCategoryPage";

export const metadata: Metadata = {
  title: "Word Counter Use Cases",
  description:
    "Browse word counter use cases for essays, posts, scripts, and more.",
  alternates: {
    canonical: "https://text-tool.live/use-cases/word-counter",
  },
  openGraph: {
    url: "https://text-tool.live/use-cases/word-counter",
    title: "Word Counter Use Cases",
    description:
      "Browse word counter use cases for essays, posts, scripts, and more.",
    images: [
      {
        url: "https://text-tool.live/og.svg",
        width: 1200,
        height: 630,
        alt: "Word Counter use cases",
      },
    ],
  },
  twitter: {
    title: "Word Counter Use Cases",
    description:
      "Browse word counter use cases for essays, posts, scripts, and more.",
    images: ["https://text-tool.live/og.svg"],
  },
};

export default function WordCounterUseCasesPage() {
  return <UseCaseCategoryPage categorySlug="word-counter" />;
}
