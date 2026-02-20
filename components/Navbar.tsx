"use client";

import Link from "next/link";
import { useState } from "react";

import TrackedLink from "./TrackedLink";
import { TOOLS } from "../lib/tools";


export default function Navbar() {
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 border-b border-white/70 bg-white/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-10 lg:px-12">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-900"
        >
          Text Tool
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-zinc-600 lg:flex">
          <Link href="/" className="transition hover:text-zinc-900">
            Home
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setIsToolsOpen(true)}
            onMouseLeave={() => setIsToolsOpen(false)}
          >
            <button
              type="button"
              className="cursor-pointer transition hover:text-zinc-900"
              aria-haspopup="true"
              aria-expanded={isToolsOpen}
              onClick={() => setIsToolsOpen((prev) => !prev)}
            >
              Tools
            </button>
            <div
              className={`absolute left-0 top-full z-20 w-56 transition ${
                isToolsOpen
                  ? "visible opacity-100"
                  : "invisible opacity-0 pointer-events-none"
              }`}
            >
              <div className="pt-3">
                <div className="rounded-2xl border border-zinc-200 bg-white p-3 text-sm text-zinc-700 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.45)]">
                  <div className="flex flex-col gap-2">
                {TOOLS.map((tool) => (
                  <TrackedLink
                    key={tool.route}
                    href={tool.route}
                    eventName="select_content"
                    eventProps={{
                      content_type: "tool",
                      item_id: tool.slug,
                      context: "nav_tools",
                    }}
                    className="rounded-xl px-3 py-2 transition hover:bg-zinc-50 hover:text-zinc-900"
                    onClick={() => setIsToolsOpen(false)}
                  >
                    {tool.name}
                  </TrackedLink>
                ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link href="/use-cases" className="transition hover:text-zinc-900">
            Use Cases
          </Link>
          <Link href="/about" className="transition hover:text-zinc-900">
            About
          </Link>
          <Link href="/privacy-policy" className="transition hover:text-zinc-900">
            Privacy
          </Link>
          <Link
            href="/terms-and-conditions"
            className="transition hover:text-zinc-900"
          >
            Terms
          </Link>
        </nav>
        <TrackedLink
          href="/word-counter"
          eventName="select_content"
          eventProps={{
            content_type: "tool",
            item_id: "word-counter",
            context: "nav_cta",
          }}
          className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-900 transition hover:border-zinc-300 hover:bg-zinc-100"
        >
          Get started
        </TrackedLink>
      </div>
      <div className="flex flex-wrap justify-center gap-3 border-t border-white/70 bg-white/80 px-6 py-3 text-xs font-semibold text-zinc-600 lg:hidden">
        <Link
          href="/"
          className="rounded-full border border-zinc-200/80 bg-white px-3 py-1 transition hover:border-zinc-300 hover:text-zinc-900"
        >
          Home
        </Link>
        {TOOLS.map((tool) => (
          <TrackedLink
            key={tool.route}
            href={tool.route}
            eventName="select_content"
            eventProps={{
              content_type: "tool",
              item_id: tool.slug,
              context: "nav_mobile",
            }}
            className="rounded-full border border-zinc-200/80 bg-white px-3 py-1 transition hover:border-zinc-300 hover:text-zinc-900"
          >
            {tool.name}
          </TrackedLink>
        ))}
        <Link
          href="/use-cases"
          className="rounded-full border border-zinc-200/80 bg-white px-3 py-1 transition hover:border-zinc-300 hover:text-zinc-900"
        >
          Use Cases
        </Link>
        <Link
          href="/about"
          className="rounded-full border border-zinc-200/80 bg-white px-3 py-1 transition hover:border-zinc-300 hover:text-zinc-900"
        >
          About
        </Link>
        <Link
          href="/privacy-policy"
          className="rounded-full border border-zinc-200/80 bg-white px-3 py-1 transition hover:border-zinc-300 hover:text-zinc-900"
        >
          Privacy
        </Link>
        <Link
          href="/terms-and-conditions"
          className="rounded-full border border-zinc-200/80 bg-white px-3 py-1 transition hover:border-zinc-300 hover:text-zinc-900"
        >
          Terms
        </Link>
      </div>
    </div>
  );
}
