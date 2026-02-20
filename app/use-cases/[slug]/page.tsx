import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import AnalyticsEvent from "../../../components/AnalyticsEvent";
import TrackedLink from "../../../components/TrackedLink";
import ToolLayout from "../../../components/ToolLayout";
import {
  USE_CASES,
  USE_CASE_BY_SLUG,
  getAlternateToolRoute,
} from "../../../lib/use-cases";
import { TOOL_BY_ROUTE } from "../../../lib/tools";

const BASE_URL = "https://text-tool.live";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = true;
export const revalidate = 86400;

export function generateStaticParams() {
  return USE_CASES.map((useCase) => ({ slug: useCase.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const useCase = USE_CASE_BY_SLUG[slug];

  if (!useCase) {
    return {
      title: "Use case not found",
    };
  }

  const url = `${BASE_URL}/use-cases/${useCase.slug}`;

  return {
    title: useCase.title,
    description: useCase.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      url,
      title: useCase.title,
      description: useCase.description,
      images: [
        {
          url: `${BASE_URL}/og.svg`,
          width: 1200,
          height: 630,
          alt: useCase.title,
        },
      ],
    },
    twitter: {
      title: useCase.title,
      description: useCase.description,
      images: [`${BASE_URL}/og.svg`],
    },
    keywords: useCase.keywords,
  };
}

function getFaqJsonLd(useCaseSlug: string) {
  const useCase = USE_CASE_BY_SLUG[useCaseSlug];
  if (!useCase) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: useCase.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export default async function UseCasePage({ params }: PageProps) {
  const { slug } = await params;
  const useCase = USE_CASE_BY_SLUG[slug];

  if (!useCase) {
    return notFound();
  }

  const primaryTool = TOOL_BY_ROUTE[useCase.primaryToolRoute];
  const alternateToolRoute = getAlternateToolRoute(useCase.primaryToolRoute);
  const alternateTool = TOOL_BY_ROUTE[alternateToolRoute];
  const relatedUseCases = useCase.relatedSlugs
    .map((slug) => USE_CASE_BY_SLUG[slug])
    .filter(Boolean);

  const faqJsonLd = getFaqJsonLd(useCase.slug);

  return (
    <ToolLayout
      title={useCase.h1}
      description={useCase.description}
      maxWidthClassName="max-w-5xl"
    >
      <AnalyticsEvent event="use_case_page_view" props={{ slug: useCase.slug }} />
      {faqJsonLd ? (
        <script type="application/ld+json">
          {JSON.stringify(faqJsonLd)}
        </script>
      ) : null}

      <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Primary tool
            </p>
            <p className="mt-2 text-lg font-semibold text-zinc-900">
              {primaryTool?.name}
            </p>
            <p className="mt-2 text-sm text-zinc-600">
              {primaryTool?.description}
            </p>
          </div>
          <TrackedLink
            href={useCase.primaryToolRoute}
            eventName="click_tool_from_use_case"
            eventProps={{ slug: useCase.slug, tool: useCase.primaryToolRoute }}
            className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
          >
            Open {primaryTool?.name}
          </TrackedLink>
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 text-sm text-zinc-600 shadow-sm">
        <div className="space-y-4">
          {useCase.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-zinc-900">How to use</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-zinc-600">
          {useCase.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-zinc-900">
          Related use cases
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {relatedUseCases.map((related) => (
            <Link
              key={related.slug}
              href={`/use-cases/${related.slug}`}
              className="rounded-2xl border border-zinc-200/80 bg-zinc-50 p-4 text-sm text-zinc-600 transition hover:border-zinc-300 hover:bg-white"
            >
              <p className="font-semibold text-zinc-900">{related.title}</p>
              <p className="mt-2">{related.description}</p>
            </Link>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-zinc-600">
          <span>Also try:</span>
          <TrackedLink
            className="text-zinc-900 underline"
            href={alternateToolRoute}
            eventName="click_tool_from_use_case"
            eventProps={{ slug: useCase.slug, tool: alternateToolRoute }}
          >
            {alternateTool?.name}
          </TrackedLink>
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-zinc-900">FAQ</h2>
        <div className="mt-4 space-y-3 text-sm text-zinc-600">
          {useCase.faq.map((item) => (
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
        <span>Go to tool:</span>
        <TrackedLink
          className="text-zinc-900 underline"
          href={useCase.primaryToolRoute}
          eventName="click_tool_from_use_case"
          eventProps={{ slug: useCase.slug, tool: useCase.primaryToolRoute }}
        >
          {primaryTool?.name}
        </TrackedLink>
        <span>or explore</span>
        <Link
          className="text-zinc-900 underline"
          href={primaryTool?.useCaseCategoryRoute ?? "/use-cases"}
        >
          {primaryTool?.name} use cases
        </Link>
      </section>
    </ToolLayout>
  );
}
