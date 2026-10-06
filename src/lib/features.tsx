import {
  BarChart3,
  Bot,
  Hash,
  NotebookText,
  PenTool,
  BellRing,
  Brain,
  CalendarClock,
  CheckCheck,
  Code2,
  Dna,
  Eye,
  FileText,
  Globe,
  KeyRound,
  Layers,
  LifeBuoy,
  Link2,
  Lock,
  Megaphone,
  MessagesSquare,
  Palette,
  Radar,
  Send,
  ShieldCheck,
  Swords,
  TrendingUp,
  UserRound,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { MATRIX, MATRIX_COLUMNS, type Cell } from "./pricing-matrix";

// Content for the product pages at /features/<slug>.
// Everything here is grounded in what the site already says (pricing, docs, about). Plan tables read from the pricing
// matrix, so limits stay in sync with /pricing automatically.

export type FeatureSlug = "brand-dna" | "ai-visibility" | "four-brains" | "distribution" | "agency-mode" | "autopilot" | "connections";

export type FeatureItem = { icon: LucideIcon; title: string; text: string; img?: string };

export type Feature = {
  slug: FeatureSlug;
  name: string;
  /** one line used in menus and cards */
  hint: string;
  icon: LucideIcon;
  accent: string;
  /** hero headline, split over two lines */
  headline: [string, string];
  lede: string;
  metaDescription: string;
  steps: { title: string; text: string }[];
  itemsTitle: string;
  itemsIntro?: string;
  items: FeatureItem[];
  table: { title: string; intro: string; rows: string[] };
  faqs: { q: string; a: string }[];
};

export const FEATURES: Feature[] = [
  {
    slug: "brand-dna",
    name: "Brand DNA",
    hint: "AI that sounds like you",
    icon: Dna,
    accent: "var(--brain-purple)",
    headline: ["AI that sounds like you,", "every single time."],
    lede: "Paste your website and Mellox builds a living profile of your positioning, tone and audience, then follows it in everything it creates.",
    metaDescription:
      "Brand DNA is how Mellox learns your voice, audience and hard rules from your website, so every post, image and article feels like you.",
    steps: [
      { title: "Paste a link", text: "Mellox scans your website and extracts your positioning, tone and audience into a Brand DNA." },
      { title: "Review and edit", text: "Read every line, change anything, and add hard rules that Mellox must always follow." },
      { title: "Create on brand", text: "Every post, image and article starts from your Brand DNA instead of a blank page." },
    ],
    itemsTitle: "What your Brand DNA holds",
    itemsIntro: "A short, structured profile that is never a black box. You can read it, edit it and decide when to use it.",
    items: [
      { icon: MessagesSquare, title: "Voice and tone", text: "How you talk: formal or friendly, short or detailed, and the words you use or avoid." },
      { icon: Users, title: "Audience", text: "Who you speak to, what they care about and what they already know." },
      { icon: Lock, title: "Hard rules", text: "The things you never want broken, such as tone limits, banned jargon or positioning that must stay intact." },
      { icon: Palette, title: "Brand Kit", text: "Your look and style, so visuals match your site and not a stock template. Included with every plan." },
      { icon: Brain, title: "Held by the Brand Brain", text: "One of the four brains keeps your Brand DNA in mind across everything Mellox makes." },
      { icon: ShieldCheck, title: "You stay in control", text: "Choose Brand DNA only for strictly on-brand output, or loosen it per request when you want something more experimental." },
    ],
    table: {
      title: "Included on every plan",
      intro: "The Brand DNA scan and Brand Kit come with every plan, including Free. Each brand workspace is its own brand.",
      rows: ["Brand workspaces", "Seats"],
    },
    faqs: [
      {
        q: "How does Brand DNA get built?",
        a: "You paste a link to your website. Mellox extracts your positioning, tone and audience from it and turns them into a Brand DNA you can read and edit.",
      },
      {
        q: "Can I edit my Brand DNA?",
        a: "Yes. You can change anything Mellox extracted and add hard rules it always follows.",
      },
      {
        q: "Can I use it for more than one brand?",
        a: "Yes. Plans include 1, 3, 10 or 30+ brand workspaces, and extra brand workspaces can be added on Growth, Agency and Scale.",
      },
    ],
  },
  {
    slug: "ai-visibility",
    name: "AI Visibility (GEO)",
    hint: "See how AI talks about you",
    icon: Radar,
    accent: "var(--brain-blue)",
    headline: ["See how AI talks about you,", "then fix it."],
    lede: "Track whether ChatGPT, Gemini and Perplexity mention your brand, understand why, and turn every gap into a draft you can approve.",
    metaDescription:
      "Run GEO and AEO audits, track the prompts your customers ask, see how AI assistants describe your brand, and turn each gap into a fix.",
    steps: [
      { title: "Scan your site", text: "A GEO and AEO audit gives you a score and subscores. Most audits finish in 20 to 60 seconds." },
      { title: "Track what customers ask", text: "Add the prompts that matter. Mellox checks them weekly across the AI engines and shows who gets named." },
      { title: "Fix the gaps", text: "Each finding becomes a fix proposal and a draft, from new articles to CMS and code changes." },
    ],
    itemsTitle: "Everything you need to get cited",
    items: [
      { icon: Globe, title: "GEO and AEO audits", text: "A score for how ready your site is for AI answers, with subscores that show where to look first." },
      { icon: MessagesSquare, title: "Tracked prompts", text: "The questions your customers actually ask, checked every week so you see change over time." },
      { icon: Eye, title: "ChatGPT, Gemini and Perplexity", text: "See whether each engine mentions you, how it describes you, and who it names instead." },
      { icon: Swords, title: "Competitor view", text: "The Competitor Brain shows how rivals appear in AI answers and points at the gap most worth closing." },
      { icon: Wrench, title: "Fix proposals", text: "Every gap comes with a suggested fix, which you can turn into a draft in one click and approve before it goes live." },
      { icon: Code2, title: "CMS and code fixes", text: "Push fixes to WordPress and Webflow on Growth, and open GitHub pull requests with the GEO Engineer agent on Agency." },
    ],
    table: {
      title: "How much you get on each plan",
      intro: "Limits for tracking and scanning, straight from our pricing.",
      rows: [
        "Tracked prompts, checked weekly",
        "Answer engines",
        "Site scans per month (max pages)",
        "Competitors tracked",
        "GEO fix proposals",
        "CMS fixes, WordPress and Webflow",
        "GitHub PR fixes and GEO Engineer agent",
      ],
    },
    faqs: [
      {
        q: "How long does a GEO/AEO audit take?",
        a: "Most audits complete in 20 to 60 seconds. Sites behind heavy anti-bot protection may take longer or fail to scan.",
      },
      {
        q: "My audit is stuck or failed. What do I do?",
        a: "Public sites behind heavy anti-bot protection can block the crawler. Try a specific, publicly reachable URL that does not need JavaScript rendering to load its main content.",
      },
      {
        q: "Which AI engines do you check?",
        a: "ChatGPT, Gemini and Perplexity. The Free plan covers ChatGPT and Gemini, Starter adds Perplexity, and Growth and above include all three.",
      },
    ],
  },
  {
    slug: "four-brains",
    name: "The Four Brains",
    hint: "Four specialists, one answer",
    icon: Brain,
    accent: "var(--brand-lime)",
    headline: ["Four brains behind", "every decision."],
    lede: "No single mind can hold your voice, your customer, your competitors and your market at once. So four specialist brains think in parallel and only agree before anything reaches you.",
    metaDescription:
      "Meet the Brand, Customer, Competitor and Market brains: four specialists that work in parallel so everything Mellox makes is on brand, relevant and current.",
    steps: [
      { title: "Each brain does one job", text: "Brand, Customer, Competitor and Market each hold a different part of the picture." },
      { title: "They think in parallel", text: "The brains work at the same time and argue it out, so a draft is checked from four angles." },
      { title: "You review the result", text: "Only the agreed version reaches you, and it still lands in your approval queue before anything is published." },
    ],
    itemsTitle: "Meet the brains",
    itemsIntro: "All four marketing brains are included in every plan.",
    items: [
      { icon: Palette, img: "/brains/brand.svg", title: "Brand Brain: never off-voice", text: "The keeper of who you are. It holds your voice, positioning and the rules you never want broken." },
      { icon: UserRound, img: "/brains/customer.svg", title: "Customer Brain: never generic", text: "The one listening to your audience. It reads real intent and buying signal, so drafts are written for an actual person." },
      { icon: Swords, img: "/brains/competitor.svg", title: "Competitor Brain: never blindsided", text: "The one watching the room. It tracks how rivals show up in AI answers and points at the gap to close next." },
      { icon: TrendingUp, img: "/brains/market.svg", title: "Market Brain: never stale", text: "The one looking further out. It scans the wider category for shifts and openings so your strategy keeps moving." },
    ],
    table: {
      title: "Market intelligence on each plan",
      intro: "The brains are on every plan. Paid plans add regular updates and competitor tracking.",
      rows: ["Market Brain updates", "Weekly Marketing Coach briefing", "Competitors tracked"],
    },
    faqs: [
      {
        q: "Are the four brains included on every plan?",
        a: "Yes. All four marketing brains come with every plan, including Free.",
      },
      {
        q: "Do I have to manage the brains myself?",
        a: "No. They work together in the background. You describe what you want, review what comes back, and approve it.",
      },
      {
        q: "Does anything publish without my approval?",
        a: "No. Every generated draft lands in a Needs Approval queue, and nothing schedules or publishes until you review and confirm it.",
      },
    ],
  },
  {
    slug: "distribution",
    name: "Distribution",
    hint: "Publish natively everywhere",
    icon: Send,
    accent: "var(--brain-orange)",
    headline: ["Write once. Publish", "natively everywhere."],
    lede: "Native posts for LinkedIn, X, Instagram, TikTok and more, scheduled on your calendar and published only after you approve.",
    metaDescription:
      "Plan, approve, schedule and publish content natively to LinkedIn, X, Instagram, TikTok, Facebook, YouTube, Pinterest, Reddit and Threads from one workspace.",
    steps: [
      { title: "Draft in your voice", text: "Posts, carousels and articles are created from your Brand DNA and plan." },
      { title: "Approve", text: "Every draft waits in a Needs Approval queue. Nothing goes out until you confirm it." },
      { title: "Schedule and publish", text: "Connect your accounts, pick a time on the calendar, and Mellox publishes natively to each channel." },
    ],
    itemsTitle: "From draft to published, in one place",
    items: [
      { icon: Send, title: "Native publishing", text: "Posts go out the way each platform expects, not as a link to a scheduler." },
      { icon: CheckCheck, title: "Approval queue", text: "Review, edit and approve drafts before anything is scheduled or published." },
      { icon: CalendarClock, title: "Calendar scheduling", text: "See everything planned on one calendar and move things around when plans change." },
      { icon: Megaphone, title: "Campaign plans", text: "Describe your goals once and Mellox maps weeks of content, with approval workflows on Growth and above." },
      { icon: FileText, title: "Articles that get cited", text: "GEO-grounded articles help AI engines quote your site, so distribution is not only social." },
      { icon: BellRing, title: "Clear failures", text: "If a post fails to publish you see it, and you can fix and retry it from the same place." },
    ],
    table: {
      title: "Publishing on each plan",
      intro: "How many posts you can publish each month, and the tools that help you plan them.",
      rows: ["Social posts published per month", "Campaign plans", "Approval workflows"],
    },
    faqs: [
      {
        q: "Does Mellox publish anything without my approval?",
        a: "No. Every generated draft lands in a Needs Approval queue. Nothing schedules or publishes until you review and confirm it.",
      },
      {
        q: "Which channels can I publish to?",
        a: "Facebook, Instagram, YouTube, Reddit, LinkedIn, Pinterest, TikTok, X and Threads.",
      },
      {
        q: "How do I connect my accounts?",
        a: "Connect each social account from your workspace, then schedule posts from the calendar. The docs walk through connecting accounts and scheduling.",
      },
      {
        q: "Can I edit the images before they go out?",
        a: "Yes. Every image Mellox generates can be opened and fully edited in Canva.",
      },
    ],
  },
  {
    slug: "agency-mode",
    name: "Agency Mode",
    hint: "Every client, one command deck",
    icon: Layers,
    accent: "var(--brain-red)",
    headline: ["Run every client from", "one command deck."],
    lede: "A workspace per client brand, shared credits, client portals and a white-label-ready command center, built for agencies.",
    metaDescription:
      "Mellox Agency Mode: one workspace per client brand, pooled credits, client portals and share links, and a white-label-ready agency command center.",
    steps: [
      { title: "Add your client brands", text: "Create a brand workspace for each client from the workspace switcher, each with its own Brand DNA." },
      { title: "Work across them", text: "Switch between clients in a click, with credits pooled across brands instead of split per client." },
      { title: "Share with clients", text: "Send a client portal or share link so clients see the work without needing a login per tool." },
    ],
    itemsTitle: "Built for the way agencies work",
    items: [
      { icon: Layers, title: "Brand workspaces", text: "One workspace per client brand: 3 on Growth, 10 on Agency and 30+ on Scale, with extra brands available for $39 a month each." },
      { icon: BarChart3, title: "Pooled credits", text: "Credits are pooled across your brands, so a quiet client does not leave credits unused while a busy one runs out." },
      { icon: Link2, title: "Client portal and share links", text: "Give clients a view of drafts, approvals and results without handing over your whole workspace." },
      { icon: KeyRound, title: "Command center, white label ready", text: "The Agency command center is the home for every client brand, ready to carry your branding." },
      { icon: Users, title: "Unlimited seats", text: "Add your whole team on Agency and Scale. Everyone sees drafts, approvals and live updates together." },
      { icon: LifeBuoy, title: "Priority support and onboarding", text: "Agency includes priority support and an onboarding call. Scale adds a dedicated success manager." },
    ],
    table: {
      title: "Agency features by plan",
      intro: "What you get as your roster grows.",
      rows: [
        "Brand workspaces",
        "Seats",
        "Pooled credits across brands",
        "Client portal and share links",
        "Agency command center, white label",
        "Tracked prompts, checked weekly",
        "Competitors tracked",
      ],
    },
    faqs: [
      {
        q: "How do I add a second or third client brand?",
        a: "From your workspace switcher, create a new brand workspace. Growth includes 3 and Agency includes 10. Extra brands can be added on Growth, Agency and Scale for $39 a month each.",
      },
      {
        q: "Can clients see their work?",
        a: "Yes. Client portals and share links are available on Growth, Agency and Scale.",
      },
      {
        q: "Is white label available?",
        a: "The Agency command center is white label ready on the Agency and Scale plans.",
      },
    ],
  },
  {
    slug: "autopilot",
    name: "Autopilot",
    hint: "Sit back and watch it work",
    icon: Bot,
    accent: "var(--brand-lime)",
    headline: ["Sit back and watch", "Mellox do the work."],
    lede: "Turn on Autopilot and Mellox runs your marketing workflow from planning to creating to publishing, while you sit back and see it all happen.",
    metaDescription:
      "Mellox Autopilot runs your marketing workflow for you, from planning and creating to publishing, in your brand voice, while you sit back and watch.",
    steps: [
      { title: "Turn it on", text: "Switch on Autopilot in your workspace. Mellox starts from your Brand DNA and your goals." },
      { title: "Mellox does the work", text: "It plans the content, creates it in your voice and moves it through your workflow without you driving each step." },
      { title: "You sit and see", text: "Watch it all come together in one workspace instead of juggling a strategy doc, a content tool and a scheduler." },
    ],
    itemsTitle: "What Autopilot handles",
    itemsIntro: "The same workflow you would run by hand, run for you.",
    items: [
      { icon: Bot, title: "The whole workflow", text: "From planning to creating to publishing, Autopilot carries the work forward so you do not have to push every step." },
      { icon: Dna, title: "Starts from your Brand DNA", text: "Everything Autopilot makes is built on your voice, audience and hard rules, so it sounds like you." },
      { icon: Brain, title: "Guided by the four brains", text: "Brand, Customer, Competitor and Market Brain inform what gets made, so the work is specific and not generic." },
      { icon: Send, title: "Across your channels", text: "Content is prepared for the channels you use, from LinkedIn and X to Instagram, TikTok and more." },
      { icon: Radar, title: "Built to get cited", text: "Autopilot works toward being named by ChatGPT, Gemini and Perplexity, not only toward ranking in search." },
      { icon: Eye, title: "See everything happen", text: "Follow the work in a single workspace, with results and AI answers brought back into one view." },
    ],
    table: {
      title: "Autopilot on each plan",
      intro: "Autopilot is part of the paid plans, alongside the publishing and planning tools it works with.",
      rows: ["Autopilot mode", "Social posts published per month", "Campaign plans"],
    },
    faqs: [
      {
        q: "What is Autopilot mode?",
        a: "Autopilot is a mode where Mellox does the work for you while you sit back and watch. It runs the workflow from planning to creating to publishing, instead of you driving each step.",
      },
      {
        q: "Does Autopilot follow my Brand DNA?",
        a: "Yes. Like everything Mellox creates, Autopilot starts from your Brand DNA, so the output matches your voice, audience and rules.",
      },
      {
        q: "Which plans include Autopilot?",
        a: "Autopilot is included on the paid plans: Starter, Growth, Agency and Scale. See the pricing page for the full comparison.",
      },
    ],
  },
  {
    slug: "connections",
    name: "Connections",
    hint: "Claude, ChatGPT, Slack, Notion and Canva",
    icon: Link2,
    accent: "var(--brain-blue)",
    headline: ["Work where you", "already work."],
    lede: "Connect Mellox to Claude and ChatGPT over MCP, bring it into Slack and Notion, and edit every generated image in Canva.",
    metaDescription:
      "Connect Mellox to Claude and ChatGPT through MCP, to Slack and Notion, and edit every generated image in Canva.",
    steps: [
      { title: "Connect", text: "Connect Claude, ChatGPT, Slack, Notion or Canva from your workspace. You choose what Mellox can reach." },
      { title: "Work from your tools", text: "Use Mellox from inside your assistant, and keep your team conversations and docs next to your marketing work." },
      { title: "Polish in Canva", text: "Open any generated image in Canva and edit it fully before you use it." },
    ],
    itemsTitle: "Connected to the tools you already use",
    itemsIntro: "Mellox meets you in the assistants and apps your team lives in.",
    items: [
      { icon: Bot, img: "/llms/claude.svg", title: "Claude, through MCP", text: "Connect Mellox to Claude over MCP and use your brand, content and AI visibility from inside the assistant." },
      { icon: Bot, img: "/llms/openai.svg", title: "ChatGPT, through MCP", text: "Connect Mellox to ChatGPT over MCP and work with your marketing from the assistant you already use." },
      { icon: Hash, img: "/logos/slack.webp", title: "Slack", text: "Bring Mellox into Slack so your marketing work sits alongside your team conversations." },
      { icon: NotebookText, img: "/logos/notion.webp", title: "Notion", text: "Connect Notion so your docs and your marketing workflow stay close together." },
      { icon: PenTool, img: "/logos/canva.webp", title: "Edit images in Canva", text: "Every image Mellox generates can be opened and fully edited in Canva, for the last ten percent of polish." },
      { icon: ShieldCheck, title: "You choose what is connected", text: "Connect only what you need, and disconnect any account from your workspace settings at any time." },
    ],
    table: {
      title: "Connections on each plan",
      intro: "The assistants and apps you can connect, by plan.",
      rows: ["MCP connection (Claude and ChatGPT)", "Slack and Notion", "Edit generated images in Canva"],
    },
    faqs: [
      {
        q: "What is the MCP connection with Claude and ChatGPT?",
        a: "MCP, the Model Context Protocol, lets an AI assistant use outside tools. Connect Mellox to Claude and ChatGPT over MCP and you can work with your brand, content and AI visibility from inside the assistant you already use.",
      },
      {
        q: "Does Mellox work with Slack and Notion?",
        a: "Yes. You can connect Slack and Notion so your marketing workflow sits alongside your team conversations and docs.",
      },
      {
        q: "Can I edit the images Mellox generates?",
        a: "Yes. Every generated image can be opened and fully edited in Canva, so you can adjust layout, text and style before you use it.",
      },
    ],
  },
];

export const FEATURE_BY_SLUG = Object.fromEntries(FEATURES.map((f) => [f.slug, f])) as Record<FeatureSlug, Feature>;

/** Plan names, in matrix order (Free, Starter, Growth, Agency, Scale). */
export const PLAN_COLUMNS = MATRIX_COLUMNS;

/** Looks up a row of the pricing matrix by its exact label. Throws in dev if the label drifts. */
export function matrixRow(label: string): { label: string; values: Cell[] } {
  for (const g of MATRIX) {
    const r = g.rows.find((x) => x.label === label);
    if (r) return r;
  }
  throw new Error(`Pricing matrix has no row called "${label}"`);
}
