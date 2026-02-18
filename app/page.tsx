import Link from "next/link";

const HOME_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Text Tool",
  url: "https://text-tool.live",
  description:
    "Fast, privacy-first text utilities including word counting, case conversion, duplicate line removal, and text to speech.",
  inLanguage: "en",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-16 sm:px-10 lg:px-12 lg:py-24">
        <header className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/70 p-10 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.4)] backdrop-blur">
          <div className="pointer-events-none absolute -top-24 right-10 h-56 w-56 rounded-full bg-gradient-to-br from-indigo-200/70 via-sky-200/70 to-transparent blur-2xl" />
          <div className="pointer-events-none absolute -bottom-32 left-0 h-64 w-64 rounded-full bg-gradient-to-br from-rose-200/60 via-amber-200/60 to-transparent blur-2xl" />
          <div className="relative flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/80 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-zinc-600">
              Text Tool Suite
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
              Clean, fast, and focused text utilities for everyday work.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-zinc-600">
              A modern toolkit for writers, developers, and teams. Convert, count,
              clean, and listen to your text in seconds.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/word-counter"
                className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-zinc-800"
              >
                Start using tools
              </Link>
            </div>
          </div>
        </header>

        <script type="application/ld+json">
          {JSON.stringify(HOME_JSON_LD)}
        </script>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Word Counter",
              description:
                "Instantly count words, characters, sentences, and paragraphs.",
              href: "/word-counter",
            },
            {
              title: "Case Converter",
              description:
                "Switch between uppercase, lowercase, title case, and more.",
              href: "/case-converter",
            },
            {
              title: "Remove Duplicate Lines",
              description:
                "Clean lists and logs by removing repeated lines with one click.",
              href: "/remove-duplicates",
            },
            {
              title: "Text to Speech",
              description:
                "Listen to your text with natural voices and adjustable speed.",
              href: "/text-to-speech",
            },
          ].map((tool) => (
            <Link
              key={tool.title}
              href={tool.href}
              className="group rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.35)] transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_28px_70px_-35px_rgba(15,23,42,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-900 text-sm font-semibold text-white">
                {tool.title
                  .split(" ")
                  .map((word) => word[0])
                  .join("")}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-zinc-900">
                {tool.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                {tool.description}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 transition group-hover:text-zinc-700">
                Open tool
                <span className="text-base leading-none">→</span>
              </span>
            </Link>
          ))}
        </section>

        <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)]">
          <h2 className="text-lg font-semibold text-zinc-900">Explore the tools</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Jump straight into a tool or use them together to clean, format, and
            review text before publishing.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-zinc-900">
            <Link className="underline" href="/word-counter">
              Word Counter
            </Link>
            <Link className="underline" href="/case-converter">
              Case Converter
            </Link>
            <Link className="underline" href="/remove-duplicates">
              Remove Duplicate Lines
            </Link>
            <Link className="underline" href="/text-to-speech">
              Text to Speech
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
