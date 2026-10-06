// Content for /docs. Source: "Mellox AI_ Docs & FAQ.html".
import { PRICING_FAQS } from "./pricing";
import { NEW_FAQS } from "./whats-new";

export type DocTopic = {
  id: string;
  n: number;
  title: string;
  blurb: string;
  color: string;
  /** extra words that should match in search */
  keywords: string;
};

export const TOPICS: DocTopic[] = [
  {
    id: "start",
    n: 1,
    title: "Getting started",
    blurb: "Connect your site, complete Brand DNA, and run your first AI visibility audit.",
    color: "#a9cc3c",
    keywords: "setup onboarding first audit connect website team invite",
  },
  {
    id: "brand-dna",
    n: 2,
    title: "Brand DNA",
    blurb: "How extraction works, what to edit, and how to add hard rules Mellox always follows.",
    color: "var(--brain-purple)",
    keywords: "brand voice tone rules extraction kit memory",
  },
  {
    id: "audits",
    n: 3,
    title: "GEO / AEO audits",
    blurb: "Reading your score, understanding subscores, and turning a fix into a draft.",
    color: "var(--brain-blue)",
    keywords: "geo aeo score ai visibility scan stuck failed fix draft",
  },
  {
    id: "publishing",
    n: 4,
    title: "Publishing",
    blurb: "Connecting accounts, scheduling, and what happens when a post fails to publish.",
    color: "var(--brain-orange)",
    keywords: "schedule a post approval queue social accounts failed publish calendar",
  },
  {
    id: "agency",
    n: 5,
    title: "Agency OS",
    blurb: "Adding clients, switching workspaces, and setting up client portals and share links.",
    color: "var(--brain-red)",
    keywords: "clients workspace brands portal share links white label multi client",
  },
  {
    id: "autopilot",
    n: 6,
    title: "Autopilot",
    blurb: "Turn on Autopilot and let Mellox run the workflow while you sit back and watch.",
    color: "#cbe960",
    keywords: "autopilot automatic hands off run for me automation workflow",
  },
  {
    id: "connections",
    n: 7,
    title: "Connections",
    blurb: "Connect Claude and ChatGPT over MCP, Slack and Notion, and edit generated images in Canva.",
    color: "#4f8bff",
    keywords: "mcp claude chatgpt slack notion canva connect integration edit image",
  },
  {
    id: "billing",
    n: 8,
    title: "Billing and credits",
    blurb: "What consumes credits, upgrading mid-cycle, and adding extra brand workspaces.",
    color: "#6b7a82",
    keywords: "credits plan upgrade invoice payment extra brand support",
  },
];

export type DocFaq = { q: string; a: string; topic: string };

const pricingFaq = (q: string) => PRICING_FAQS.find((f) => f.q === q)!;

export const DOC_FAQS: DocFaq[] = [
  {
    q: "How long does a GEO/AEO audit take?",
    a: "Most audits complete in 20 to 60 seconds. Sites behind heavy anti-bot protection may take longer or fail to scan. If that happens, see the next question.",
    topic: "audits",
  },
  {
    q: "My audit is stuck or failed. What do I do?",
    a: "Public sites behind heavy anti-bot protection can block the crawler. Try a specific, publicly reachable URL that does not require JavaScript rendering to load its main content.",
    topic: "audits",
  },
  {
    q: "Does Mellox publish anything without my approval?",
    a: "No. Every generated draft lands in a Needs Approval queue. Nothing schedules or publishes until you review and confirm it.",
    topic: "publishing",
  },
  {
    q: "Can I invite teammates?",
    a: "Yes, on any plan. Team members see drafts, approvals, and live updates together in the same workspace.",
    topic: "start",
  },
  {
    q: "How do I add a second or third client brand?",
    a: "From your workspace switcher, create a new brand workspace. Growth includes 3 and Agency includes 10. Extra brands can be added on Growth, Agency and Scale for $39 a month each.",
    topic: "agency",
  },
  ...NEW_FAQS.map((f, i) => ({ ...f, topic: i === 0 ? "autopilot" : "connections" })),
  { ...pricingFaq("What is a credit?"), topic: "billing" },
  { ...pricingFaq("Do unused credits roll over?"), topic: "billing" },
  {
    q: "Where do I go for billing or account issues?",
    a: "Email support@mellox.ai or use the contact form on our Contact / Support page. Starter gets email support, Growth gets 24 hour email replies, Agency gets priority support with an onboarding call, and Scale gets a dedicated manager.",
    topic: "billing",
  },
];
