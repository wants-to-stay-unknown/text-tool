import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { Analytics } from "@vercel/analytics/react";
import Footer from "../components/Footer";
import AnalyticsProvider from "../components/AnalyticsProvider";

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
  const gaId =
    process.env.NEXT_PUBLIC_GA_ID ?? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en">
      <head>
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}', { send_page_view: false });`}
            </Script>
          </>
        ) : null}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={null}>
          <AnalyticsProvider />
        </Suspense>
        <Navbar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
