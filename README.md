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
- **Product pages**: `features.tsx`. A new feature also needs an illustration: add a `case` for its slug in
  `components/features/FeatureVisual.tsx` (a test fails if you forget; the animated ones use `visual-motion.css`). **Use cases**: `use-cases.tsx`. **Integrations**: `integrations.tsx`.
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
- **AI assistants:** `/llms.txt` (a short map of the site) and `/llms-full.txt` (the substance of every key page in
  Markdown) are generated from the same data that renders the pages, so they stay in sync. `robots.txt` explicitly
  allows the major AI crawlers (GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, Bingbot and others;
  edit `AI_USER_AGENTS` in `src/app/robots.ts`). Nothing guarantees an assistant will cite a site: it also depends on
  clear pages, consistent facts and third-party mentions.

## Analytics and cookies

Every tool is **off until its id is set**, and loads only after a visitor accepts the matching cookie category
(consent store in `src/lib/consent.ts`, banner in `components/legal/CookieBanner.tsx`). Set the ids in `.env.local`
locally and in your host's environment variables in production (see `.env.example`).

| Tool | What it gives you | Cookie category | Env variable |
| --- | --- | --- | --- |
| Google Analytics 4 | Traffic, sources, conversions | Analytics | `NEXT_PUBLIC_GA_MEASUREMENT_ID` |
| Plausible | Simple, privacy-friendly traffic stats | Analytics | `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` |
| Microsoft Clarity | Heatmaps and session replays | Analytics | `NEXT_PUBLIC_CLARITY_ID` |
| Vercel Web Analytics | Visitors and page views, custom events | Analytics | automatic on Vercel (or `NEXT_PUBLIC_VERCEL_ANALYTICS=1`) |
| Vercel Speed Insights | Real-user Core Web Vitals | Analytics | automatic on Vercel (or `NEXT_PUBLIC_VERCEL_ANALYTICS=1`) |
| Meta Pixel | Ad conversions (Facebook, Instagram) | Marketing | `NEXT_PUBLIC_META_PIXEL_ID` |
| LinkedIn Insight Tag | Ad conversions (LinkedIn) | Marketing | `NEXT_PUBLIC_LINKEDIN_PARTNER_ID` |
| Search Console / Bing | Ownership verification, search data | none | `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_BING_SITE_VERIFICATION` |

On Vercel, also switch on **Analytics** and **Speed Insights** for the project in the Vercel dashboard, or they collect
nothing. Vercel's logs and observability need no code.

Funnel events (`signup_click`, `demo_click`, `generate_lead`) are sent to every loaded tool through `trackEvent()` in
`src/lib/analytics.ts` (and mapped to Lead / Contact on Meta). The security policy (`src/lib/security-headers.ts`)
already allows each tool's hosts; if you add another tool, add its hosts there too.
**If you turn any of these on, update the Cookie Policy text**, which currently says no analytics cookies are loaded.

## Smooth scrolling

The whole site uses [Lenis](https://lenis.darkroom.engineering) (`components/SmoothScroll.tsx`, mounted once in
`app/layout.tsx`). It keeps the browser's real scroll position, so all the scroll-driven sections (pinned intro, brains,
workflow, dashboard tilt) work unchanged, just with smoother input.

- **Feel:** tune `lerp` in `SmoothScroll.tsx` (lower = silkier and slower to catch up, higher = snappier; now `0.09`).
  `wheelMultiplier` changes how far one wheel notch travels.
- **Touch devices** keep native scrolling (`syncTouch: false`); **reduced motion** turns it off completely; it pauses
  while the intro preloader holds the page (`html.mx-lock`).
- **Scrolling to a position from code:** use `scrollToY(y)` from `lib/smooth-scroll.ts`, not
  `window.scrollTo({ behavior: "smooth" })` (a test checks this). In-page `#links` already glide on their own.
- **A new scrollable panel** (a dropdown, modal or sidebar with its own `overflow: auto`) needs the attribute
  `data-lenis-prevent` on it, or the mouse wheel will scroll the page behind it instead.

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

## Performance

- **Images are WebP.** All photos, screenshots and logos in `public/` are `.webp` (the 2 MB founder photo is now about
  45 KB). Only the PWA/app icons (`icon-*.png`, `apple-icon.png`) and the social cards stay PNG, because browsers and
  social networks require that. When you add an image, convert it first (for example with
  [Squoosh](https://squoosh.app) or `cwebp -q 80 in.jpg -o out.webp`), keep photos under about 1200px wide, and keep the
  original out of `public/`. The `source-images/` folder holds the pre-conversion originals (local backup, git-ignored).
- `next/image` is set to serve WebP only, cache optimised images for 30 days, and `public/` image folders send
  `Cache-Control` headers. Rename a file when you replace it so visitors never see a stale copy.
- Blog covers from Unsplash are requested at four widths (`srcset`), so a small card never downloads the full photo.
- CSS that only the home page uses lives in the home components' own stylesheets, not in `globals.css`.
- Fonts: Micro 5 is only used by the home "brains" section, so it is not preloaded on other pages.
- **Measure a production build** without disturbing the dev server:
  `NEXT_DIST_DIR=.next-build npm run build` (output goes to `.next-build/`, git-ignored). Next may add `.next-build`
  paths to `tsconfig.json`; remove them again.

## Site url (`NEXT_PUBLIC_SITE_URL`)

Canonical links, social cards, structured data, the sitemap and `llms.txt` all use one value from `src/lib/seo.ts`.
Set `NEXT_PUBLIC_SITE_URL=https://mellox.ai` on the production host. If it is missing, production falls back to
`https://mellox.ai`, and a `localhost` value is ignored in production, so it cannot leak into the live site.
In development it is `http://localhost:3000`.

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
- `llms`: `llms.txt` / `llms-full.txt` structure and content, and the AI-crawler rules in `robots.txt`.
- `smooth-scroll`: Lenis wiring (reduced motion, touch, preloader lock, scrollable panels, section buttons).

There are no end-to-end browser tests yet. Visual and keyboard checks are done by hand in the browser.

## Deploying

Any Node host that supports Next.js works (for example Vercel). Set the environment variables above, run
`npm run build`, then `npm start`. Make sure `NEXT_PUBLIC_SITE_URL` is your real domain before you go live.
