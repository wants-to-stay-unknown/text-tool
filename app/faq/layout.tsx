import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about TextTool and its word counter, case converter, duplicate line remover, and text-to-speech tools.",
  alternates: {
    canonical: "https://text-tool.live/faq",
  },
  openGraph: {
    url: "https://text-tool.live/faq",
    title: "FAQ",
    description:
      "Frequently asked questions about TextTool and its word counter, case converter, duplicate line remover, and text-to-speech tools.",
    images: [
      {
        url: "https://text-tool.live/og.svg",
        width: 1200,
        height: 630,
        alt: "TextTool FAQ",
      },
    ],
  },
  twitter: {
    title: "FAQ",
    description:
      "Frequently asked questions about TextTool and its word counter, case converter, duplicate line remover, and text-to-speech tools.",
    images: ["https://text-tool.live/og.svg"],
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
