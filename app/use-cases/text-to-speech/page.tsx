import type { Metadata } from "next";

import UseCaseCategoryPage from "../../../components/UseCaseCategoryPage";

export const metadata: Metadata = {
  title: "Text to Speech Use Cases",
  description: "Browse use cases for listening to text and reviewing drafts.",
  alternates: {
    canonical: "https://text-tool.live/use-cases/text-to-speech",
  },
  openGraph: {
    url: "https://text-tool.live/use-cases/text-to-speech",
    title: "Text to Speech Use Cases",
    description: "Browse use cases for listening to text and reviewing drafts.",
    images: [
      {
        url: "https://text-tool.live/og.svg",
        width: 1200,
        height: 630,
        alt: "Text to speech use cases",
      },
    ],
  },
  twitter: {
    title: "Text to Speech Use Cases",
    description: "Browse use cases for listening to text and reviewing drafts.",
    images: ["https://text-tool.live/og.svg"],
  },
};

export default function TextToSpeechUseCasesPage() {
  return <UseCaseCategoryPage categorySlug="text-to-speech" />;
}
