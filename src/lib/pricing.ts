// Pricing content for /pricing. Source of truth: "Mellox AI Pricing.html".
import type { Faq } from "./faqs";

export type Plan = {
  id: "starter" | "growth" | "agency" | "scale";
  name: string;
  badge?: string;
  tagline: string;
  /** Monthly price in USD; null = custom pricing */
  monthly: number | null;
  credits: string;
  imagePosts: string;
  articles: string;
  video: string;
  chips: string[];
  cta: string;
  ctaNote?: string;
  featuresIntro?: string;
  features: string[];
  featured?: boolean;
};

export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For one brand getting started",
    monthly: 49,
    credits: "2,000 credits/mo",
    imagePosts: "~ 66 image posts",
    articles: "~ 20 premium articles",
    video: "+ 4 video credits (about 4 Standard videos)",
    chips: ["1 brand", "2 seats"],
    cta: "Get Starter",
    features: [
      "Brand DNA scan and Brand Kit included",
      "30 Mellox Pro chat messages, 800 Flash chat",
      "25 tracked AI prompts, checked weekly",
      "4 site scans a month, up to 50 pages",
      "Track 3 competitors",
      "Weekly Market Brain update and Coach briefing",
      "Publish up to 100 posts a month",
      "Email support",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    badge: "Most popular",
    tagline: "For teams publishing every week",
    monthly: 149,
    credits: "6,000 credits/mo",
    imagePosts: "~ 200 image posts",
    articles: "~ 60 premium articles",
    video: "+ 12 video credits (about 12 Standard videos)",
    chips: ["3 brands", "5 seats"],
    cta: "Get Growth",
    featuresIntro: "Everything in Starter, plus:",
    features: [
      "Pooled credits across brands",
      "100 tracked prompts across 3 AI engines",
      "Campaign plans and approval workflows",
      "Client portal and share links",
      "CMS fixes for WordPress and Webflow",
      "1080p, premium and long take video",
      "Credit rollover on annual plans",
      "Email support with 24 hour replies",
    ],
    featured: true,
  },
  {
    id: "agency",
    name: "Agency",
    badge: "Best for agencies",
    tagline: "For agencies running client brands",
    monthly: 449,
    credits: "18,000 credits/mo",
    imagePosts: "~ 600 image posts",
    articles: "~ 180 premium articles",
    video: "+ 40 video credits, pooled across brands",
    chips: ["10 brands", "Unlimited seats"],
    cta: "Get Agency",
    featuresIntro: "Everything in Growth, plus:",
    features: [
      "Agency command center, white label ready",
      "300 pooled tracked prompts",
      "GitHub PR fixes and GEO Engineer agent",
      "Cinematic video, 4 renders at once",
      "Track 30 competitors",
      "Publish up to 3,000 posts a month",
      "Priority support and an onboarding call",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    badge: "Custom",
    tagline: "For networks and large teams",
    monthly: null,
    credits: "50,000 credits/mo",
    imagePosts: "~ 1,600 image posts",
    articles: "~ 500 premium articles",
    video: "+ 100 video credits, pooled across brands",
    chips: ["30+ brands", "Unlimited seats"],
    cta: "Book a demo",
    ctaNote: "Talk to us about your roster",
    featuresIntro: "Everything in Agency, plus:",
    features: [
      "1,000 tracked prompts, 90 competitors",
      "8 video renders at once",
      "SSO, API access and an SLA",
      "A dedicated success manager",
      "Volume pricing built around your roster",
    ],
  },
];

export const TRY_FIRST = [
  {
    id: "free",
    kicker: "No card needed",
    name: "Free plan",
    blurb: "Scan your brand, see your first AI visibility findings, and try the assistant.",
    features: [
      "100 credits to spend, one time",
      "1 brand with a Brand DNA scan",
      "5 tracked AI prompts, checked weekly",
      "1 site scan, up to 25 pages",
      "30 Mellox Flash chat messages",
    ],
    cta: "Start free",
  },
  {
    id: "trial",
    kicker: "14 days of Growth",
    name: "Growth trial",
    blurb: "Run a real workflow across several brands before you commit to a plan.",
    features: [
      "500 credits and 2 video credits",
      "3 brand workspaces",
      "20 Mellox Pro chat messages",
      "Card required to start",
    ],
    cta: "Start 14 day trial",
  },
];

export const CREDIT_PACKS = [
  { price: 25, credits: 2500, bonus: 0 },
  { price: 100, credits: 10500, bonus: 5 },
  { price: 250, credits: 27500, bonus: 10 },
  { price: 500, credits: 57500, bonus: 15 },
];

export const VIDEO_PACKS = [
  { credits: 10, rate: "$2.90", price: "$29" },
  { credits: 30, rate: "$2.63", price: "$79" },
  { credits: 100, rate: "$2.49", price: "$249" },
];

export const ADDONS = [
  { name: "Extra brand", price: "$39", desc: "One more workspace with its own tracked prompts, credits and weekly Market Brain. Growth, Agency, Scale." },
  { name: "+100 tracked prompts", price: "$39", desc: "One hundred more prompts, checked weekly on your plan's engines." },
  { name: "Daily tracking", price: "$149", desc: "Moves 100 prompts from weekly checks to daily checks." },
  { name: "Google AI Overviews engine", price: "$15", desc: "Adds real AI Overview capture, per 100 prompts." },
  { name: "Daily Market Brain", price: "$29", desc: "Refreshes market intelligence every day instead of weekly, per brand." },
  { name: "+200 Mellox Pro messages", price: "$29", desc: "Extra Pro chat for strategy heavy months." },
  { name: "Extra seat", price: "$15", desc: "One more teammate. Starter and Growth." },
  { name: "White label domain", price: "$49", desc: "Serve the client portal on your agency's own domain. Agency and Scale." },
];

export const CREDIT_MENU: [string, string][] = [
  ["Social post set, up to 3 platforms", "12"],
  ["Standard image", "15"],
  ["Image post, copy and image", "30"],
  ["Carousel", "30"],
  ["Premium image", "40"],
  ["Campaign plan", "55"],
  ["Premium article, about 1,200 words", "100"],
  ["Long form article, about 2,500 words", "140"],
  ["Marketing Coach briefing, on demand", "100"],
  ["Competitor intelligence report", "30"],
  ["Brand DNA re-scan, first scan free", "125"],
  ["GEO fix proposal, per finding", "150"],
  ["GEO CMS fix, WordPress or Webflow", "55"],
  ["Extra site scan, per 100 pages", "35"],
];

export const VIDEO_MENU: [string, string][] = [
  ["Draft video", "0.5 to 0.75 VC"],
  ["Standard video", "1 to 1.25 VC"],
  ["Premium video", "1.5 to 2 VC"],
  ["Long take video", "1 to 2 VC"],
  ["Cinematic video", "2 VC"],
];

export const PRICING_FAQS: Faq[] = [
  {
    q: "What is a credit?",
    a: "Credits pay for AI work: posts, images, articles, research and audits. One credit is worth $0.01 at face value. A social post set costs 12 credits, an image post 30 and a premium article 100. The full list is on this page.",
  },
  {
    q: "Why does video have its own allowance?",
    a: "So a few renders can never drain the credits you need for posts and articles. One video credit buys one 8 second Standard video. Draft quality costs less, Premium and Cinematic cost more, and the price shows on the Generate button before you spend.",
  },
  {
    q: "Do unused credits roll over?",
    a: "Not on monthly plans. On annual Growth, Agency and Scale plans, up to one month of your allowance carries over. Credit packs and video packs you buy never expire.",
  },
  {
    q: "What happens when I run out?",
    a: "You get a nudge at 80% of your credits, video credits or Pro messages, with one click packs or an upgrade. Flash chat is fair use, then 2 credits a message. Pro chat is 25 credits a message after your plan's allowance.",
  },
  {
    q: "How does annual billing work?",
    a: "You pay for 10 months and get 12. Starter is $490 a year, Growth $1,490 and Agency $4,490, which works out to the per month prices shown above.",
  },
  {
    q: "Can I pause instead of cancelling?",
    a: "Yes, on any paid plan. Pausing costs $9 a month and keeps your data, your brands and 10 weekly tracked prompts.",
  },
  {
    q: "Can I add more brands or seats?",
    a: "Extra brands are $39 a month on Growth, Agency and Scale. Extra seats are $15 a month on Starter and Growth. Agency already has unlimited seats.",
  },
  {
    q: "What does Contact us include?",
    a: "Scale is built for networks and large teams: 30 or more brands, 50,000 credits, 100 video credits, SSO, API access, an SLA and a dedicated success manager. Pricing is built around your roster, so we quote it.",
  },
];
