import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text to Speech",
  description:
    "Convert text to speech in your browser. Choose a voice, adjust rate, pitch, and volume, and listen instantly.",
  alternates: {
    canonical: "https://text-tool.live/text-to-speech",
  },
  openGraph: {
    url: "https://text-tool.live/text-to-speech",
    title: "Text to Speech",
    description:
      "Convert text to speech in your browser. Choose a voice, adjust rate, pitch, and volume, and listen instantly.",
    images: [
      {
        url: "https://text-tool.live/og.svg",
        width: 1200,
        height: 630,
        alt: "Text to Speech",
      },
    ],
  },
  twitter: {
    title: "Text to Speech",
    description:
      "Convert text to speech in your browser. Choose a voice, adjust rate, pitch, and volume, and listen instantly.",
    images: ["https://text-tool.live/og.svg"],
  },
};

export default function TextToSpeechLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
