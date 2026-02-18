import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remove Duplicate Lines",
  description:
    "Remove duplicate lines from text instantly. Keep order, trim whitespace, and export unique lines for clean lists.",
};

export default function RemoveDuplicatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
