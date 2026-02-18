import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word Counter",
  description:
    "Count words, characters, and characters without spaces instantly. Free, fast, and privacy-friendly word counter.",
  alternates: {
    canonical: "https://text-tool.live/word-counter",
  },
  openGraph: {
    url: "https://text-tool.live/word-counter",
    title: "Word Counter",
    description:
      "Count words, characters, and characters without spaces instantly. Free, fast, and privacy-friendly word counter.",
    images: [
      {
        url: "https://text-tool.live/og.svg",
        width: 1200,
        height: 630,
        alt: "Word Counter",
      },
    ],
  },
  twitter: {
    title: "Word Counter",
    description:
      "Count words, characters, and characters without spaces instantly. Free, fast, and privacy-friendly word counter.",
    images: ["https://text-tool.live/og.svg"],
  },
};

export default function WordCounterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
