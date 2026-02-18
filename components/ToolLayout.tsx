import type { ReactNode } from "react";

type ToolLayoutProps = {
  title: string;
  description?: string;
  children: ReactNode;
  maxWidthClassName?: string;
  badgeText?: string;
};

export default function ToolLayout({
  title,
  description,
  children,
  maxWidthClassName = "max-w-6xl",
  badgeText = "Text Tool",
}: ToolLayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-12 text-zinc-900 sm:px-10 lg:px-12">
      <div className={`mx-auto flex w-full flex-col gap-10 ${maxWidthClassName}`}>
        <header className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/70 p-8 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.35)] backdrop-blur">
          <div className="pointer-events-none absolute -top-24 right-0 h-48 w-48 rounded-full bg-gradient-to-br from-indigo-200/70 via-sky-200/70 to-transparent blur-2xl" />
          <div className="pointer-events-none absolute -bottom-32 left-0 h-56 w-56 rounded-full bg-gradient-to-br from-rose-200/60 via-amber-200/60 to-transparent blur-2xl" />
          <div className="relative flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              {badgeText}
            </p>
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {title}
              </h1>
              {description ? (
                <p className="max-w-2xl text-base leading-7 text-zinc-600">
                  {description}
                </p>
              ) : null}
            </div>
          </div>
        </header>

        {children}
      </div>
    </div>
  );
}
