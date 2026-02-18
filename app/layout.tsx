import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://text-tool.live"),
  title: {
    default: "Text Tool | Fast, Privacy-First Text Utilities",
    template: "%s | Text Tool",
  },
  description:
    "Text Tool offers fast, private, browser-based utilities like word counting, case conversion, duplicate line removal, and text to speech.",
  keywords: [
    "word counter",
    "case converter",
    "remove duplicate lines",
    "text to speech",
    "text utilities",
  ],
  alternates: {
    canonical: "https://text-tool.live",
  },
  openGraph: {
    title: "Text Tool | Fast, Privacy-First Text Utilities",
    description:
      "Text Tool offers fast, private, browser-based utilities like word counting, case conversion, duplicate line removal, and text to speech.",
    type: "website",
    siteName: "Text Tool",
    url: "https://text-tool.live",
    images: [
      {
        url: "https://text-tool.live/og.svg",
        width: 1200,
        height: 630,
        alt: "Text Tool",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Text Tool | Fast, Privacy-First Text Utilities",
    description:
      "Text Tool offers fast, private, browser-based utilities like word counting, case conversion, duplicate line removal, and text to speech.",
    images: ["https://text-tool.live/og.svg"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
