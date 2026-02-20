# Growth Checklist

## What was changed
- Added a global navigation and footer with tools, use-case categories, and popular use cases.
- Built a use-case system with 30 long-tail pages and 4 category index pages.
- Updated tool pages with "Try next", related tools, use-case links, tips, and post-action suggestions.
- Expanded the homepage to route visitors to tools and popular use cases.
- Extended sitemap to include use-case pages, categories, and About.
- Added lightweight analytics hooks for tool and use-case events.

## How to add more use-cases
1. Open `lib/use-cases.ts`.
2. Add a new item to the `USE_CASES` array with:
   - `slug`, `title`, `description`, `h1`, `primaryToolRoute`
   - `intro` (2–3 paragraphs)
   - `steps` (3–6 items)
   - `faq` (3–5 Q/A)
   - `relatedSlugs` (3)
3. Ensure `primaryToolRoute` matches one of the core tools.
4. If it is a high-priority page, add its slug to `POPULAR_USE_CASE_SLUGS`.
5. Confirm the page appears at `/use-cases/<slug>` and in the sitemap.

## How to verify sitemap
- Visit `/sitemap.xml` locally or in production.
- Confirm it includes:
  - `/use-cases`
  - `/use-cases/<category>`
  - `/use-cases/<slug>` for each use-case
  - all tool routes and legal pages

## Internal linking rules
- Every tool page must link to:
  - "Try next" panel (3 tool links)
  - "Use cases for this tool" grid (8 pages + category link)
  - "Related tools" links
  - Post-action suggestion strip after tool use
  - Tips accordion linking to use-cases or tools
- Every use-case page must link to:
  - the primary tool CTA
  - 3 related use-cases
  - two cross-cluster tool links
  - the related use-case category page
- Homepage must link to:
  - all tools
  - top 8 use-cases
  - use-case category pages

## Analytics events
- `tool_page_view`
- `tool_used`
- `click_try_next`
- `use_case_view`
- `click_tool_from_use_case`
