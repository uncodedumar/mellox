import { BarChart3, Code2, Globe, Search, Wrench, type LucideIcon } from "lucide-react";
import { NEW_FAQS } from "./whats-new";

// Content for /integrations. Grounded in what the site already states: the channels Mellox publishes to,
// the AI engines it tracks, GA4 and Search Console insights, CMS fixes (WordPress, Webflow) and GitHub PR fixes.
// Plan availability mirrors the pricing matrix.

export type Integration = {
  name: string;
  /** file name (without .svg) in /public/llms, if there is a logo */
  logo?: string;
  /** full colour logo path (in /public), shown as is instead of the white mono treatment */
  image?: string;
  /** lucide icon used when there is no logo file */
  icon?: LucideIcon;
  text: string;
  /** short availability label shown on the card */
  plan: string;
};

export type IntegrationGroup = {
  id: string;
  title: string;
  intro: string;
  accent: string;
  items: Integration[];
};

export const GROUPS: IntegrationGroup[] = [
  {
    id: "assistants",
    title: "Claude and ChatGPT (MCP)",
    intro: "Use Mellox from the AI assistants you already work in, through MCP.",
    accent: "#d97757",
    items: [
      {
        name: "Claude",
        logo: "claude",
        text: "Connect Mellox to Claude over MCP and work with your brand, content and AI visibility from inside the assistant.",
        plan: "Paid plans",
      },
      {
        name: "ChatGPT",
        logo: "openai",
        text: "Connect Mellox to ChatGPT over MCP and use your marketing workflow from the assistant you already use.",
        plan: "Paid plans",
      },
    ],
  },
  {
    id: "workapps",
    title: "Slack, Notion and Canva",
    intro: "Bring Mellox into the apps your team already works in, and finish your images in Canva.",
    accent: "var(--brain-purple)",
    items: [
      {
        name: "Slack",
        image: "/logos/slack.webp",
        text: "Bring Mellox into Slack so your marketing work sits alongside your team conversations.",
        plan: "Paid plans",
      },
      {
        name: "Notion",
        image: "/logos/notion.webp",
        text: "Connect Notion so your docs and your marketing workflow stay close together.",
        plan: "Paid plans",
      },
      {
        name: "Canva",
        image: "/logos/canva.webp",
        text: "Open any image Mellox generates and edit it fully in Canva before you use it.",
        plan: "Paid plans",
      },
    ],
  },
  {
    id: "google",
    title: "Google",
    intro: "See what is working in Google's own tools, and track how Gemini describes your brand.",
    accent: "#4f8bff",
    items: [
      {
        name: "Google Analytics 4",
        icon: BarChart3,
        text: "Bring traffic and engagement insights into the same workspace as your strategy and drafts.",
        plan: "Starter and above",
      },
      {
        name: "Search Console",
        icon: Search,
        text: "Pull search performance insights alongside your AI visibility audits.",
        plan: "Starter and above",
      },
      {
        name: "Gemini",
        logo: "gemini",
        text: "Check whether Gemini mentions your brand for the prompts your customers ask, every week.",
        plan: "Every plan",
      },
    ],
  },
  {
    id: "meta",
    title: "Meta",
    intro: "Publish natively to Meta's apps from one calendar, after you approve.",
    accent: "var(--brain-purple)",
    items: [
      {
        name: "Facebook",
        logo: "facebook",
        text: "Schedule and publish posts natively to your Facebook presence.",
        plan: "Paid plans",
      },
      {
        name: "Instagram",
        logo: "instagram",
        text: "Plan and publish Instagram content from the same queue as every other channel.",
        plan: "Paid plans",
      },
      {
        name: "Threads",
        logo: "threads",
        text: "Keep your Threads posts on the same calendar and in the same voice.",
        plan: "Paid plans",
      },
    ],
  },
  {
    id: "social",
    title: "Social platforms",
    intro: "One workspace instead of a separate login, calendar and tracker for every platform.",
    accent: "var(--brain-orange)",
    items: [
      { name: "LinkedIn", logo: "linkedin", text: "Native posts for your company page and your own profile voice.", plan: "Paid plans" },
      { name: "X", logo: "x", text: "Posts and threads scheduled and published natively.", plan: "Paid plans" },
      { name: "TikTok", logo: "tiktok", text: "Plan and publish short-form content from the same queue.", plan: "Paid plans" },
      { name: "YouTube", logo: "youtube", text: "Keep video publishing on the same calendar as everything else.", plan: "Paid plans" },
      { name: "Pinterest", logo: "pinterest", text: "Publish pins as part of the same campaign plan.", plan: "Paid plans" },
      { name: "Reddit", logo: "reddit", text: "Draft and schedule posts for the communities your audience reads.", plan: "Paid plans" },
    ],
  },
  {
    id: "ai",
    title: "AI assistants we track",
    intro: "Weekly checks on how the assistants your buyers use describe your brand.",
    accent: "var(--brand-lime)",
    items: [
      { name: "ChatGPT", logo: "openai", text: "See whether ChatGPT names you for your tracked prompts, and who it names instead.", plan: "Every plan" },
      { name: "Gemini", logo: "gemini", text: "Track how Gemini answers the questions your customers ask.", plan: "Every plan" },
      { name: "Perplexity", logo: "perplexity", text: "Watch the answers and sources Perplexity gives for your category.", plan: "Starter and above" },
    ],
  },
  {
    id: "web",
    title: "Websites and code",
    intro: "Turn an AI visibility finding into a real fix on your site.",
    accent: "var(--brain-red)",
    items: [
      { name: "WordPress", icon: Globe, text: "Apply GEO fixes to your WordPress site from the fix proposal.", plan: "Growth and above" },
      { name: "Webflow", icon: Wrench, text: "Push GEO fixes to your Webflow site once you approve them.", plan: "Growth and above" },
      { name: "GitHub", icon: Code2, text: "The GEO Engineer agent opens pull requests with technical fixes for your team to review.", plan: "Agency and above" },
    ],
  },
];

export const STEPS = [
  { title: "Connect", text: "Connect your accounts and tools from your workspace. You choose what Mellox can see and post to." },
  { title: "Approve", text: "Every draft lands in a Needs Approval queue. Nothing schedules or publishes until you confirm it." },
  { title: "Publish and learn", text: "Mellox publishes natively, then brings analytics and AI answers back into one view." },
];

export const FAQS = [
  ...NEW_FAQS.slice(1),
  {
    q: "Does Mellox publish anything without my approval?",
    a: "No. Every generated draft lands in a Needs Approval queue. Nothing schedules or publishes until you review and confirm it.",
  },
  {
    q: "Which social platforms can I publish to?",
    a: "Facebook, Instagram, Threads, LinkedIn, X, TikTok, YouTube, Pinterest and Reddit.",
  },
  {
    q: "Which AI assistants do you track?",
    a: "ChatGPT, Gemini and Perplexity. The Free plan covers ChatGPT and Gemini, Starter adds Perplexity, and Growth and above include all three.",
  },
  {
    q: "Which plans include publishing?",
    a: "Publishing is on paid plans: up to 100 posts a month on Starter, 500 on Growth, 3,000 on Agency and 10,000 on Scale. The Free plan is for scanning and trying the assistant.",
  },
  {
    q: "Do you connect to my website?",
    a: "Yes. Growth and above can apply GEO fixes to WordPress and Webflow, and Agency adds GitHub pull request fixes with the GEO Engineer agent.",
  },
];
