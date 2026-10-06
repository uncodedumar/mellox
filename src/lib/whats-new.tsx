import { Bot, Hash, PenTool, type LucideIcon } from "lucide-react";

// The four newest capabilities: Autopilot, MCP (Claude and ChatGPT), Slack and Notion, and Canva editing.
// One source of truth, reused by the home page, pricing, compare, about, docs and the feature pages.

export type NewItem = {
  id: "autopilot" | "mcp" | "workapps" | "canva";
  title: string;
  /** short line for compact cards */
  short: string;
  /** one or two sentences for full cards */
  text: string;
  accent: string;
  icon: LucideIcon;
  /** brand logos shown instead of the icon, files in /public/llms */
  logos?: { src: string; alt: string; /** full-bleed app icon: no tile around it */ bare?: boolean }[];
  /** extra icons shown in a row (apps without a logo file) */
  apps?: { icon: LucideIcon; label: string }[];
  href: string;
  cta: string;
};

export const WHATS_NEW: NewItem[] = [
  {
    id: "autopilot",
    title: "Autopilot mode",
    short: "Sit back and watch Mellox do the work.",
    text: "Turn on Autopilot and Mellox runs the workflow for you, from planning to creating to publishing, while you sit back and watch it happen.",
    accent: "var(--brand-lime)",
    icon: Bot,
    href: "/features/autopilot",
    cta: "See Autopilot",
  },
  {
    id: "mcp",
    title: "Claude and ChatGPT, through MCP",
    short: "Use Mellox from inside Claude and ChatGPT.",
    text: "Connect Mellox to Claude and ChatGPT over MCP and use your brand, content and AI visibility from the assistant you already work in.",
    accent: "#d97757",
    icon: Bot,
    logos: [
      { src: "/llms/claude.svg", alt: "Claude" },
      { src: "/llms/openai.svg", alt: "ChatGPT" },
    ],
    href: "/features/connections",
    cta: "See MCP",
  },
  {
    id: "workapps",
    title: "Slack and Notion",
    short: "Mellox where your team already works.",
    text: "Connect Slack and Notion so your marketing work and your team's conversations and docs live side by side.",
    accent: "var(--brain-purple)",
    icon: Hash,
    logos: [
      { src: "/logos/slack.webp", alt: "Slack", bare: true },
      { src: "/logos/notion.webp", alt: "Notion", bare: true },
    ],
    href: "/integrations",
    cta: "See integrations",
  },
  {
    id: "canva",
    title: "Edit every image in Canva",
    short: "Generated images, fully editable in Canva.",
    text: "Every image Mellox generates can be opened and fully edited in Canva, so the last ten percent is yours to polish.",
    accent: "var(--brain-blue)",
    icon: PenTool,
    logos: [{ src: "/logos/canva.webp", alt: "Canva", bare: true }],
    href: "/features/connections",
    cta: "See Canva editing",
  },
];

/** Matrix rows added to the pricing comparison table. */
export const NEW_MATRIX_ROWS = {
  autopilot: "Autopilot mode",
  mcp: "MCP connection (Claude and ChatGPT)",
  workapps: "Slack and Notion",
  canva: "Edit generated images in Canva",
} as const;

export const NEW_FAQS = [
  {
    q: "What is Autopilot mode?",
    a: "Autopilot is a mode where Mellox does the work for you while you sit back and watch. It runs the workflow from planning to creating to publishing, instead of you driving each step.",
  },
  {
    q: "What is the MCP connection with Claude and ChatGPT?",
    a: "MCP, the Model Context Protocol, lets an AI assistant use outside tools. Connect Mellox to Claude and ChatGPT over MCP and you can work with your brand, content and AI visibility from inside the assistant you already use.",
  },
  {
    q: "Does Mellox work with Slack and Notion?",
    a: "Yes. You can connect Slack and Notion so your marketing workflow sits alongside your team's conversations and docs.",
  },
  {
    q: "Can I edit the images Mellox generates?",
    a: "Yes. Every generated image can be opened and fully edited in Canva, so you can adjust layout, text and style before you use it.",
  },
];
