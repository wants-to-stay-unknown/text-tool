import Link from "next/link";

import ToolLayout from "../../components/ToolLayout";

const FAQ_ITEMS = [
  {
    question: "Is TextTool free to use?",
    answer:
      "Yes. All tools are free and available without creating an account.",
  },
  {
    question: "Do you store the text I paste?",
    answer:
      "No. Text is processed in your browser and is not stored on our servers.",
  },
  {
    question: "How accurate are the word and character counts?",
    answer:
      "Counts are calculated from the text you provide and update in real time.",
  },
  {
    question: "Can I remove duplicates without changing order?",
    answer:
      "Yes. The remove duplicates tool preserves the first occurrence order by default.",
  },
  {
    question: "Does text-to-speech work on all browsers?",
    answer:
      "Chrome and Edge provide the most reliable support for speech synthesis.",
  },
  {
    question: "Do you use analytics or ads?",
    answer:
      "We may use analytics or ads in the future. See the Privacy Policy for details.",
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

const PAGE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "TextTool FAQ",
  description:
    "Frequently asked questions about TextTool and its word counter, case converter, duplicate line remover, and text-to-speech tools.",
  url: "https://text-tool.live/faq",
};

export default function FaqPage() {
  return (
    <ToolLayout
      title="Frequently Asked Questions"
      description="Quick answers about how TextTool works, data privacy, and each tool."
      maxWidthClassName="max-w-4xl"
    >
      <script type="application/ld+json">{JSON.stringify(PAGE_JSON_LD)}</script>
      <script type="application/ld+json">{JSON.stringify(FAQ_JSON_LD)}</script>

      <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm">
        <div className="space-y-3 text-sm text-zinc-600">
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

      <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-zinc-900">Explore the tools</h2>
        <div className="mt-3 flex flex-wrap gap-3 text-sm font-semibold text-zinc-900">
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
    </ToolLayout>
  );
}
