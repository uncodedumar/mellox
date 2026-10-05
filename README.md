# Mellox AI website

Marketing site for [Mellox AI](https://mellox.ai), the AI marketing assistant for agencies and startups. Built with
Next.js (App Router), React, TypeScript and Tailwind CSS.

> This project uses a recent Next.js with changes from older versions. Before changing framework behaviour, read the
> matching guide in `node_modules/next/dist/docs/` (see `AGENTS.md`).

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in the values (see "Environment variables")
npm run dev                  # http://localhost:3000
```

| Script              | What it does                                        |
| ------------------- | --------------------------------------------------- |
| `npm run dev`       | Start the dev server                                |
| `npm run build`     | Production build                                    |
| `npm start`         | Serve the production build                          |
| `npm run typecheck` | TypeScript check (`tsc --noEmit`)                   |
| `npm test`          | Run the unit tests once (Vitest)                    |
| `npm run test:watch`| Run the tests in watch mode                         |
| `npm run lint`      | ESLint                                              |

## Environment variables

Copy `.env.example` to `.env.local`. Nothing is required to browse the site; the forms and analytics need these:

| Variable                         | Used for                                                                                  |
| -------------------------------- | ----------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`                 | Sends the contact, demo, press and partner forms ([Resend](https://resend.com))            |
| `CONTACT_TO_EMAIL`               | Inbox that receives those form submissions                                                |
| `CONTACT_FROM_EMAIL`             | Optional sender (a domain verified in Resend)                                             |
| `NEXT_PUBLIC_SITE_URL`           | Public origin, used for structured data, social cards, canonical urls and the sitemap     |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`  | Optional Google Analytics 4 id (`G-XXXXXXXXXX`)                                           |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`   | Optional Plausible domain (`mellox.ai`)                                                   |
| `NEXT_PUBLIC_BOOKING_URL`        | Optional Calendly / Cal.com link; adds a "Pick a time now" button on `/demo`              |

## Project map

```
src/
  app/                  Routes (one folder per page) and API route handlers
    api/contact         Form endpoint: validation, honeypot, throttling, email via Resend
    blog, changelog     Blog index + posts, and the changelog
    features/[slug]     Product pages (Brand DNA, AI Visibility, Four Brains, Distribution, Agency Mode)
    use-cases/[slug]    Agencies, Startups, In-house teams
    pricing, compare, demo, integrations, security, docs, faq, about, contact, legal pages
    sitemap.ts, robots.ts, opengraph-image.tsx / twitter-image.tsx (social cards per route)
  components/           UI, grouped by page (hero, pricing, blog, features, ...) with a CSS file next to each
  content/blog/         Blog posts as MDX files
  lib/                  Content and data (pricing, features, use cases, FAQs, SEO helpers, consent, analytics)
tests/                  Vitest unit tests
public/                 Static assets (brand, logos, images)
```

## Editing content

Most copy lives in `src/lib/`, not in components:

- **Pricing**: `pricing.ts` (plans, FAQs) and `pricing-matrix.ts` (the comparison table). Feature, use-case and
  structured-data pages read from these, so numbers stay in sync.
- **Product pages**: `features.tsx`. **Use cases**: `use-cases.tsx`. **Integrations**: `integrations.tsx`.
  **Security and trust**: `security.tsx` (only state what is true; each claim notes its source).
- **FAQs**: `faqs.ts`. **Changelog**: `changelog.ts` (add an entry at the top).
- **Legal**: `terms.ts`, `privacy.ts`, `cookies-policy.ts` (drafts: have a lawyer review before launch).

### Blog posts

Each `.mdx` file in `src/content/blog/` is one post and the file name is the url (`my-post.mdx` -> `/blog/my-post`).
Copy `src/content/blog/_template.mdx`, edit the `meta` block, and write below it: headings, text, images, links,
columns, galleries, callouts, videos and buttons can go anywhere, in any order. Put images in
`public/blog/<post>/`. See `src/content/blog/README.md` for the full list of blocks.

### Customer stories

`USE_CASES` pages include a customer-story block that stays hidden until a story has a `summary` or `quote`. Fill in
the `ANTROSYS` entry in `use-cases.tsx` only with details the customer has approved.

## SEO, social and structured data

- Every page sets its own `title`/`description`; the root layout supplies the defaults and the title template.
- Social preview cards are generated per route (`opengraph-image.tsx` / `twitter-image.tsx`) from one helper,
  `src/lib/og.tsx`. Add the two files to a new route folder to give it a card.
- JSON-LD: `Organization`, `WebSite` and `SoftwareApplication` (with the real plan prices) are rendered on every page
  from `src/lib/seo.ts`; `FAQPage` is added on the home page and `/faq` (and on pages that show their own FAQs).
- `sitemap.ts` and `robots.ts` are generated; set `NEXT_PUBLIC_SITE_URL` in production.

## Analytics and cookies

Analytics scripts (GA4 and/or Plausible) load only when an id is set **and** the visitor accepts analytics cookies
(consent store in `src/lib/consent.ts`, banner in `components/legal/CookieBanner.tsx`). Funnel clicks (`signup_click`,
`demo_click`) and form leads (`generate_lead`) are reported through `trackEvent()` in `src/lib/analytics.ts`.
If you turn analytics on, update the Cookie Policy text, which currently says no analytics cookies are loaded.

## Security headers

`next.config.ts` sets `poweredByHeader: false` and applies the headers from `src/lib/security-headers.ts` to every
route: Content-Security-Policy, Strict-Transport-Security, X-Frame-Options, X-Content-Type-Options, Referrer-Policy,
Permissions-Policy and Cross-Origin-Opener-Policy.

- The CSP allows only what the site uses: its own origin, Google Analytics/Tag Manager and Plausible (loaded only after
  cookie consent), Unsplash images, and https iframes for blog embeds.
- **When you add a third-party service** (chat widget, video host, CDN, new analytics), add its origin to the matching
  directive in `security-headers.ts`, or the browser will block it. Open the browser console: blocked requests show as
  "Refused to ..." CSP errors.
- `script-src` keeps `'unsafe-inline'` because Next.js inlines small bootstrap scripts; a nonce-based policy would force
  every page to render dynamically. HSTS is sent without `preload` on purpose.

## Accessibility

- A "Skip to main content" link is the first focus stop on every page (`components/SkipLink.tsx`); each page has a
  `<main>`.
- The long scroll-driven intro section has its own "Skip this animated section" link, and for visitors who prefer
  reduced motion it renders as a normal, static section (no pinned or horizontal scrolling).
- Keep new interactive elements keyboard-reachable with a visible focus style, and give images meaningful `alt` text
  (empty `alt=""` for decorative images).

## Tests

`npm test` runs fast unit tests with Vitest (no browser needed):

- `data-integrity`: pricing matrix shape, feature and use-case pages reference real plans, features and rows.
- `seo`: structured data shape, plan prices, safe serialisation.
- `contact-api`: form endpoint validation, honeypot, throttling and the Resend call (mocked).
- `content-and-links`: blog post metadata, and every internal navbar and footer link points at a real page.
- `security-headers`: the CSP and the other security headers, and that `X-Powered-By` stays off.
- `app-url`: the hero website box passes the typed site on to the app.

There are no end-to-end browser tests yet. Visual and keyboard checks are done by hand in the browser.

## Deploying

Any Node host that supports Next.js works (for example Vercel). Set the environment variables above, run
`npm run build`, then `npm start`. Make sure `NEXT_PUBLIC_SITE_URL` is your real domain before you go live.
