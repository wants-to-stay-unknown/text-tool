import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text to Speech",
  description:
    "Convert text to speech in your browser. Choose a voice, adjust rate, pitch, and volume, and listen instantly.",
};

export default function TextToSpeechLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
