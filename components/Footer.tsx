import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200/80 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-zinc-500 sm:flex-row sm:px-10 lg:px-12">
        <span>© {new Date().getFullYear()} TextTool</span>
        <div className="flex flex-wrap items-center gap-4">
          <Link className="hover:text-zinc-700" href="/privacy-policy">
            Privacy Policy
          </Link>
          <Link className="hover:text-zinc-700" href="/terms-and-conditions">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}
