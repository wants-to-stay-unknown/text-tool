"use client";

export default function GlobalError() {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-20 text-zinc-900">
      <div className="mx-auto max-w-2xl rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-[0_24px_60px_-30px_rgba(15,23,42,0.35)]">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="mt-3 text-sm text-zinc-600">
          Please refresh the page. If the problem persists, try again later.
        </p>
      </div>
    </div>
  );
}
