import Link from "next/link";

const NAV_ITEMS = [
  { label: "Word Counter", href: "/word-counter" },
  { label: "Case Converter", href: "/case-converter" },
  { label: "Remove Duplicates", href: "/remove-duplicates" },
  { label: "Text to Speech", href: "/text-to-speech" },
];

export default function Navbar() {
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
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-zinc-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/word-counter"
          className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-900 transition hover:border-zinc-300 hover:bg-zinc-100"
        >
          Get started
        </Link>
      </div>
      <div className="flex flex-wrap justify-center gap-3 border-t border-white/70 bg-white/80 px-6 py-3 text-xs font-semibold text-zinc-600 lg:hidden">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full border border-zinc-200/80 bg-white px-3 py-1 transition hover:border-zinc-300 hover:text-zinc-900"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
