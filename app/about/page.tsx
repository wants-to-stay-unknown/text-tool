import Link from "next/link";

import ToolLayout from "../../components/ToolLayout";
import { TOOLS } from "../../lib/tools";

export default function AboutPage() {
  return (
    <ToolLayout
      title="About Text Tool"
      description="Text Tool is a fast, privacy-first suite of text utilities for writers, creators, and teams."
      maxWidthClassName="max-w-5xl"
    >
      <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 text-sm text-zinc-600 shadow-sm">
        <div className="space-y-4">
          <p>
            Text Tool was built to make common text tasks feel instant: counting,
            formatting, cleaning, and listening to text without sending your data
            to a server. Everything runs in the browser so you can move quickly
            while keeping your content private.
          </p>
          <p>
            Whether you are editing a blog post, cleaning a list, preparing a
            presentation, or studying from notes, the goal is the same: faster
            workflows and fewer clicks. The tools are intentionally lightweight
            so they load quickly on any device.
          </p>
          <p>
            Looking for ideas on how to use the tools? Start with the{" "}
            <Link className="font-semibold text-zinc-900 underline" href="/use-cases">
              use-case library
            </Link>{" "}
            or jump into the tools below.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-zinc-900">Core tools</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {TOOLS.map((tool) => (
            <Link
              key={tool.route}
              href={tool.route}
              className="rounded-2xl border border-zinc-200/80 bg-zinc-50 p-4 text-sm text-zinc-600 transition hover:border-zinc-300 hover:bg-white"
            >
              <p className="font-semibold text-zinc-900">{tool.name}</p>
              <p className="mt-2">{tool.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </ToolLayout>
  );
}
