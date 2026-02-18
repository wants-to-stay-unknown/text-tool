import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word Counter",
  description:
    "Count words, characters, and characters without spaces instantly. Free, fast, and privacy-friendly word counter.",
};

export default function WordCounterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
