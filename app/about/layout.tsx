import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Text Tool",
  description:
    "Learn about Text Tool and the privacy-first text utilities built for writers, creators, and teams.",
  alternates: {
    canonical: "https://text-tool.live/about",
  },
  openGraph: {
    url: "https://text-tool.live/about",
    title: "About Text Tool",
    description:
      "Learn about Text Tool and the privacy-first text utilities built for writers, creators, and teams.",
    images: [
      {
        url: "https://text-tool.live/og.svg",
        width: 1200,
        height: 630,
        alt: "About Text Tool",
      },
    ],
  },
  twitter: {
    title: "About Text Tool",
    description:
      "Learn about Text Tool and the privacy-first text utilities built for writers, creators, and teams.",
    images: ["https://text-tool.live/og.svg"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
