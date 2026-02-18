import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remove Duplicate Lines",
  description:
    "Remove duplicate lines from text instantly. Keep order, trim whitespace, and export unique lines for clean lists.",
  alternates: {
    canonical: "https://text-tool.live/remove-duplicates",
  },
  openGraph: {
    url: "https://text-tool.live/remove-duplicates",
    title: "Remove Duplicate Lines",
    description:
      "Remove duplicate lines from text instantly. Keep order, trim whitespace, and export unique lines for clean lists.",
    images: [
      {
        url: "https://text-tool.live/og.svg",
        width: 1200,
        height: 630,
        alt: "Remove Duplicate Lines",
      },
    ],
  },
  twitter: {
    title: "Remove Duplicate Lines",
    description:
      "Remove duplicate lines from text instantly. Keep order, trim whitespace, and export unique lines for clean lists.",
    images: ["https://text-tool.live/og.svg"],
  },
};

export default function RemoveDuplicatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
