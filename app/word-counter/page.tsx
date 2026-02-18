import WordCounterTool from "../../components/WordCounterTool";
import ToolLayout from "../../components/ToolLayout";
import Link from "next/link";

const TOOL_URL = "https://text-tool.live/word-counter";

const TOOL_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Word Counter",
  url: TOOL_URL,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  description:
    "Count words, characters, and characters without spaces instantly in your browser.",
};

const FAQ_ITEMS = [
  {
    question: "Does the word counter include punctuation?",
    answer:
      "Punctuation is ignored in word counting. Words are separated by whitespace.",
  },
  {
    question: "Are spaces included in character count?",
    answer:
      "The character count includes spaces, and a separate metric shows characters without spaces.",
  },
  {
    question: "Is my text stored anywhere?",
    answer:
      "No. Everything runs locally in your browser, and nothing is saved on a server.",
  },
  {
    question: "Can I use this for essays or blog posts?",
    answer:
      "Yes. The counter is designed for long-form content and updates instantly.",
  },
];

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function WordCounterPage() {
  return (
    <ToolLayout
      title="Word Counter"
      description="Paste or type your text to see live word and character counts."
      maxWidthClassName="max-w-4xl"
    >
      <script type="application/ld+json">{JSON.stringify(TOOL_JSON_LD)}</script>
      <script type="application/ld+json">{JSON.stringify(FAQ_JSON_LD)}</script>
      <WordCounterTool />

      <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)]">
        <h2 className="text-lg font-semibold text-zinc-900">Quick tips</h2>
        <p className="mt-2 text-sm text-zinc-600">
          Use the word counter to validate content length, meta descriptions,
          and character limits before publishing.
        </p>
      </section>

      <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)]">
        <h2 className="text-lg font-semibold text-zinc-900">FAQ</h2>
        <div className="mt-4 space-y-3 text-sm text-zinc-600">
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.question}
              className="rounded-2xl border border-zinc-200/80 bg-zinc-50 px-4 py-3"
            >
              <summary className="cursor-pointer text-sm font-semibold text-zinc-900">
                {item.question}
              </summary>
              <p className="mt-2 text-sm text-zinc-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="flex flex-wrap gap-3 text-sm font-semibold text-zinc-600">
        <span>Try also:</span>
        <Link className="text-zinc-900 underline" href="/case-converter">
          Case Converter
        </Link>
        <Link className="text-zinc-900 underline" href="/remove-duplicates">
          Remove Duplicate Lines
        </Link>
        <Link className="text-zinc-900 underline" href="/text-to-speech">
          Text to Speech
        </Link>
      </section>
    </ToolLayout>
  );
}
