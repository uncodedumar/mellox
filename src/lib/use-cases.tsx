import { Briefcase, Rocket, Building2, type LucideIcon } from "lucide-react";
import type { FeatureSlug } from "./features";
import type { Plan } from "./pricing";

// Content for the use-case pages at /use-cases/<slug>.
// Grounded in what the site already says (about page audiences, the "problems" section, pricing and docs).

export type UseCaseSlug = "agencies" | "startups" | "in-house-teams";

/**
 * A real customer story. Only fields you fill in are shown, and the whole block stays hidden until there is
 * a `summary` or a `quote`. Never publish a quote or result that the customer has not approved.
 */
export type CaseStory = {
  company: string;
  /** public path, e.g. "/about/antrosys-ceo.webp" */
  photo?: string;
  person?: string;
  role?: string;
  summary?: string;
  quote?: string;
  results?: { value: string; label: string }[];
  href?: string;
};

export type UseCase = {
  slug: UseCaseSlug;
  name: string;
  hint: string;
  icon: LucideIcon;
  accent: string;
  headline: [string, string];
  lede: string;
  metaDescription: string;
  /** which feature illustration to show under the hero */
  visual: FeatureSlug;
  pains: { title: string; text: string }[];
  help: { feature: FeatureSlug; title: string; text: string }[];
  plans: Plan["id"][];
  planNote: string;
  faqs: { q: string; a: string }[];
  story?: CaseStory;
};

// Antrosys: shared across the use-case pages. Add `person`, `role`, `summary`, `quote` and `results`
// (with Antrosys' approval) and the case-study block appears automatically.
export const ANTROSYS: CaseStory = {
  company: "Antrosys",
  photo: "/about/antrosys-ceo.webp",
};

export const USE_CASES: UseCase[] = [
  {
    slug: "agencies",
    name: "Agencies",
    hint: "Every client, one command deck",
    icon: Briefcase,
    accent: "var(--brain-red)",
    headline: ["Run every client brand", "from one command deck."],
    lede: "Stop keeping a login per client, per tool. Mellox gives each client brand its own workspace, Brand DNA and approval queue under one roof.",
    metaDescription:
      "Mellox for marketing agencies: one workspace per client brand, pooled credits, client portals and a white-label-ready command center.",
    visual: "agency-mode",
    pains: [
      {
        title: "Ten tools, zero strategy",
        text: "A scheduler, an SEO tool, a doc, a chatbot and a spreadsheet for every client, and work still ships late.",
      },
      {
        title: "Nine logins, one burnout",
        text: "Posting separately to every platform means tracking and calendaring every platform separately, for every client.",
      },
      {
        title: "AI that writes, but forgets",
        text: "A generic model has no memory of each client's brand, so every new prompt starts from zero again.",
      },
    ],
    help: [
      { feature: "agency-mode", title: "A workspace per client", text: "Add client brands from the workspace switcher, with credits pooled across all of them and client portals to share the work." },
      { feature: "brand-dna", title: "Each client's voice, remembered", text: "Every brand has its own Brand DNA, so drafts sound like the client and not like your agency." },
      { feature: "distribution", title: "Approve once, publish natively", text: "Drafts wait in a Needs Approval queue, then go out natively to each client's channels." },
      { feature: "ai-visibility", title: "A new service to sell", text: "Show each client how ChatGPT, Gemini and Perplexity describe them, and turn every gap into a fix." },
    ],
    plans: ["agency"],
    planNote: "Growth works for smaller rosters. Scale is for networks with 30+ brands.",
    faqs: [
      {
        q: "How do I add a second or third client brand?",
        a: "From your workspace switcher, create a new brand workspace. Growth includes 3 and Agency includes 10. Extra brands can be added on Growth, Agency and Scale for $39 a month each.",
      },
      { q: "Can clients see their work?", a: "Yes. Client portals and share links are available on Growth, Agency and Scale." },
      { q: "Is white label available?", a: "The Agency command center is white label ready on the Agency and Scale plans." },
      {
        q: "Does anything publish without my approval?",
        a: "No. Every generated draft lands in a Needs Approval queue. Nothing schedules or publishes until you review and confirm it.",
      },
    ],
    story: ANTROSYS,
  },
  {
    slug: "startups",
    name: "Startups",
    hint: "A marketing team without hiring one",
    icon: Rocket,
    accent: "var(--brand-lime)",
    headline: ["A full marketing function", "without hiring one."],
    lede: "Strategy, content and distribution from day one. Paste your website and Mellox learns your brand, plans your content and gets you cited by AI.",
    metaDescription:
      "Mellox for startups and founders: Brand DNA from a single link, content planning, native publishing and AI search visibility in one workspace.",
    visual: "brand-dna",
    pains: [
      {
        title: "Ten tools, zero strategy",
        text: "You need a content tool, a scheduler, an SEO checker and an analytics dashboard, before you have even found your voice.",
      },
      {
        title: "Invisible to ChatGPT and Gemini",
        text: "Buyers now ask AI first. If it does not cite you, you do not exist, and a small brand has the most to gain from being named.",
      },
      {
        title: "AI that writes, but forgets",
        text: "A generic model can draft one good post, but it does not remember your brand, so the next prompt starts from zero.",
      },
    ],
    help: [
      { feature: "brand-dna", title: "Start from a link", text: "Paste your website and get a Brand DNA of your positioning, tone and audience in minutes, not weeks." },
      { feature: "four-brains", title: "Four specialists on call", text: "Brand, Customer, Competitor and Market brains give you the thinking of a full team." },
      { feature: "distribution", title: "Plan, approve, publish", text: "Map weeks of content, then publish natively to LinkedIn, X, Instagram, TikTok and more." },
      { feature: "ai-visibility", title: "Get recommended early", text: "Track the questions your customers ask AI and fix what stops you being named." },
    ],
    plans: ["starter", "growth"],
    planNote: "Start on the Free plan with no card, then upgrade when you are publishing every week.",
    faqs: [
      {
        q: "Is there a free plan?",
        a: "Yes. The Free plan gives you 100 credits to spend (one time), 1 brand with a Brand DNA scan, 5 tracked AI prompts, 1 site scan of up to 25 pages and 30 Mellox Flash chat messages. No card needed.",
      },
      { q: "Can I invite my co-founder or a teammate?", a: "Yes, on any plan. Team members see drafts, approvals and live updates together in the same workspace." },
      {
        q: "Will it sound like us?",
        a: "Mellox builds a Brand DNA from your website, and you can edit it and add hard rules it always follows.",
      },
      {
        q: "Does anything publish without my approval?",
        a: "No. Every generated draft lands in a Needs Approval queue. Nothing schedules or publishes until you review and confirm it.",
      },
    ],
    story: ANTROSYS,
  },
  {
    slug: "in-house-teams",
    name: "In-house teams",
    hint: "One shared workspace for marketing",
    icon: Building2,
    accent: "var(--brain-blue)",
    headline: ["One shared workspace for", "the whole marketing team."],
    lede: "Keep strategy, drafts and approvals in one place, so everyone works from the same brand, the same plan and the same live picture.",
    metaDescription:
      "Mellox for in-house marketing teams: a shared workspace for strategy, drafts and approvals, with Brand DNA that keeps everyone on-brand.",
    visual: "distribution",
    pains: [
      {
        title: "Nine logins, one burnout",
        text: "Separate tools for every platform mean separate tracking and calendars. The busywork eats the hours meant for strategy.",
      },
      {
        title: "AI that writes, but forgets",
        text: "Each person prompts a generic model differently, so output drifts off-brand and nobody shares the context.",
      },
      {
        title: "Invisible to ChatGPT and Gemini",
        text: "Buyers ask AI first. Without a way to see and fix how assistants describe you, it is hard to know what to prioritise.",
      },
    ],
    help: [
      { feature: "brand-dna", title: "Everyone on-brand", text: "One Brand DNA that the whole team shares, including the hard rules you never want broken." },
      { feature: "distribution", title: "Approvals in one place", text: "Drafts, comments and approvals live together, with campaign plans and approval workflows on Growth and above." },
      { feature: "four-brains", title: "A weekly briefing", text: "Market Brain updates and a weekly Marketing Coach briefing keep the plan current." },
      { feature: "ai-visibility", title: "Know what to fix first", text: "Audits and tracked prompts show how AI describes your brand, with a fix attached to every gap." },
    ],
    plans: ["growth"],
    planNote: "Agency adds unlimited seats if your team grows past five.",
    faqs: [
      { q: "Can the whole team work in Mellox?", a: "Yes. Team members see drafts, approvals and live updates together in the same workspace. Starter has 2 seats, Growth has 5, and Agency and Scale have unlimited seats." },
      {
        q: "How do approvals work?",
        a: "Every generated draft lands in a Needs Approval queue. Nothing schedules or publishes until someone reviews and confirms it. Approval workflows are included from Growth.",
      },
      {
        q: "Can we see how our site performs?",
        a: "Yes. Alongside AI visibility audits, paid plans include GA4 and Search Console insights so strategy and results sit in one place.",
      },
      { q: "Where do we get help?", a: "Email support@mellox.ai. Growth gets 24 hour email replies, and Agency gets priority support with an onboarding call." },
    ],
    story: ANTROSYS,
  },
];

export const USE_CASE_BY_SLUG = Object.fromEntries(USE_CASES.map((u) => [u.slug, u])) as Record<UseCaseSlug, UseCase>;
