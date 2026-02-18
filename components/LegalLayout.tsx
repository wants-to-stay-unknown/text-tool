import Link from "next/link";
import type { ReactNode } from "react";

type LegalLayoutProps = {
  title: string;
  description?: string;
  lastUpdated: string;
  children: ReactNode;
};

export default function LegalLayout({
  title,
  description,
  lastUpdated,
  children,
}: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-900 sm:px-10 lg:px-12">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <header className="rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              TextTool Legal
            </p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {title}
            </h1>
            {description ? (
              <p className="max-w-2xl text-sm leading-7 text-zinc-600">
                {description}
              </p>
            ) : null}
            <p className="text-xs font-semibold text-zinc-500">
              Last updated: {lastUpdated}
            </p>
          </div>
        </header>

        <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm">
          {children}
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-500">
          <span>© {new Date().getFullYear()} TextTool</span>
          <div className="flex flex-wrap gap-4">
            <Link className="hover:text-zinc-700" href="/privacy-policy">
              Privacy Policy
            </Link>
            <Link className="hover:text-zinc-700" href="/terms-and-conditions">
              Terms & Conditions
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
