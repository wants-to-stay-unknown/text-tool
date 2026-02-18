import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Text Tool | Fast, Privacy-First Text Utilities",
    template: "%s | Text Tool",
  },
  description:
    "Text Tool offers fast, private, browser-based utilities like word counting, case conversion, duplicate line removal, and text to speech.",
  openGraph: {
    title: "Text Tool | Fast, Privacy-First Text Utilities",
    description:
      "Text Tool offers fast, private, browser-based utilities like word counting, case conversion, duplicate line removal, and text to speech.",
    type: "website",
    siteName: "Text Tool",
  },
  twitter: {
    card: "summary",
    title: "Text Tool | Fast, Privacy-First Text Utilities",
    description:
      "Text Tool offers fast, private, browser-based utilities like word counting, case conversion, duplicate line removal, and text to speech.",
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
      </body>
    </html>
  );
}
