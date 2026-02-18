import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Converter",
  description:
    "Convert text to uppercase, lowercase, title case, sentence case, or toggle case instantly. Free and browser-based.",
  alternates: {
    canonical: "https://text-tool.live/case-converter",
  },
  openGraph: {
    url: "https://text-tool.live/case-converter",
    title: "Case Converter",
    description:
      "Convert text to uppercase, lowercase, title case, sentence case, or toggle case instantly. Free and browser-based.",
    images: [
      {
        url: "https://text-tool.live/og.svg",
        width: 1200,
        height: 630,
        alt: "Case Converter",
      },
    ],
  },
  twitter: {
    title: "Case Converter",
    description:
      "Convert text to uppercase, lowercase, title case, sentence case, or toggle case instantly. Free and browser-based.",
    images: ["https://text-tool.live/og.svg"],
  },
};

export default function CaseConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
