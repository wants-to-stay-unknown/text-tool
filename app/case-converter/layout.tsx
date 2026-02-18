import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Converter",
  description:
    "Convert text to uppercase, lowercase, title case, sentence case, or toggle case instantly. Free and browser-based.",
};

export default function CaseConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
