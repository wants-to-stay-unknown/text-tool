This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## How to run tests

```bash
# Unit tests
npm run test:unit

# UI/component tests
npm run test:ui

# Full test suite
npm test

# End-to-end tests (Playwright)
npm run test:e2e
```

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Analytics (GA4 + Vercel)

### Environment variable
- `NEXT_PUBLIC_GA_ID` (preferred) or `NEXT_PUBLIC_GA_MEASUREMENT_ID`

### Event names and key params
- `page_view`: `page_location`, `page_path`, `page_title`, `session_id`, `visitor_id`
- `select_content`: `content_type`, `item_id`, `context`, `session_id`, `visitor_id`
- `tool_page_view`: `tool`, `session_id`, `visitor_id`
- `tool_run`: `tool_name`, input meta, options meta, `session_id`, `visitor_id`
- `tool_success`: `tool_name`, output meta, `session_id`, `visitor_id`
- `tool_error`: `tool_name`, `error_type`, `session_id`, `visitor_id`
- `tool_used`: `tool_name`, `action`, meta, `session_id`, `visitor_id`
- `copy`: `tool_name`, `target`, meta, `session_id`, `visitor_id`
- `paste`: `tool_name`, meta, `session_id`, `visitor_id`
- `clear`: `tool_name`, `session_id`, `visitor_id`
- `tts`: `action`, `tool_name`, `session_id`, `visitor_id`
- `use_case_view`: `slug`, `category`, `session_id`, `visitor_id`
- `click_try_next`: `from_tool`, `to_tool`, `session_id`, `visitor_id`
- `click_tool_from_use_case`: `slug`, `tool`, `session_id`, `visitor_id`
- `client_error`: `error_type`, `error_name`, `session_id`, `visitor_id`

Input/output meta includes only safe counts: `char_count`, `word_count`, `line_count`, and their bucketed variants.

### Where to view
- GA4: Realtime and DebugView
- Vercel Analytics: Analytics tab in Vercel dashboard
