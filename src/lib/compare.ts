// Content for /compare. Sources: "Mellox AI_ Compare.html", the platform research matrix, and the battle plan notes.
// Each platform row is a string of 14 letters, one per capability in CAPS order:
// f = full / native, p = partial / add-on / limited, n = not offered or not listed.

export type Level = "f" | "p" | "n";
export type Group = "create" | "monitor" | "scale";

export const CAPS: { label: string; short: string; group: Group }[] = [
  { label: "Brand DNA and memory", short: "Brand DNA / Memory", group: "create" },
  { label: "AI chat assistant", short: "AI Chat Assistant", group: "create" },
  { label: "Content and copy generation", short: "Content / Copy Gen", group: "create" },
  { label: "Image generation", short: "Image Generation", group: "create" },
  { label: "Auto captions (multi platform)", short: "Auto Captions", group: "create" },
  { label: "Scheduling and publishing", short: "Scheduling / Publishing", group: "create" },
  { label: "GEO / AEO monitoring", short: "GEO / AEO Monitoring", group: "monitor" },
  { label: "Competitor watch", short: "Competitor Watch", group: "monitor" },
  { label: "Multi client / agency mode", short: "Multi-Client / Agency", group: "scale" },
  { label: "White label", short: "White-Label", group: "scale" },
  { label: "Analytics dashboard", short: "Analytics Dashboard", group: "scale" },
  { label: "Command palette and bulk actions", short: "Command Palette / Bulk", group: "scale" },
  { label: "Client portal and share links", short: "Client Portal / Share", group: "scale" },
  { label: "Public API", short: "Public API", group: "scale" },
];

export const GROUP_META: Record<Group, { label: string; color: string; count: number }> = {
  create: { label: "Create and publish", color: "var(--brand-lime)", count: 6 },
  monitor: { label: "Monitor AI visibility", color: "var(--brain-blue)", count: 2 },
  scale: { label: "Scale across clients", color: "var(--brain-purple)", count: 6 },
};

export type Platform = { name: string; note: string; row: string; self?: boolean };
export type Category = {
  id: string;
  title: string;
  blurb: string;
  gap: string;
  platforms: Platform[];
};

export const MELLOX: Platform = {
  name: "Mellox AI",
  note: "mellox.ai",
  // Public API is limited to the Scale plan, so it counts as partial.
  row: "fffffffffffffp",
  self: true,
};

export const CATEGORIES: Category[] = [
  {
    id: "generators",
    title: "All-in-one brand and content generators",
    blurb:
      "Generate on-brand posts, images and captions quickly. Most stop once the draft exists, with no view of how AI engines describe the brand and little agency tooling.",
    gap: "Nothing tells you what to make.",
    platforms: [
      { name: "Google Pomelli", note: "Google Labs / DeepMind", row: "fpffpnnnnnnnnn" },
      { name: "Canva (Magic Studio)", note: "Design platform + AI", row: "ppffpfnnpnpnpf" },
      { name: "Adobe Express", note: "Firefly-powered", row: "pnffppnnpnnnpp" },
      { name: "Klaviyo K:AI", note: "Marketing agent", row: "pffnnfnnnnfnnf" },
    ],
  },
  {
    id: "suites",
    title: "AI marketing employee suites",
    blurb:
      "Broad assistants that write, plan and automate. Strong on brand voice and workflows, thin on AI visibility. Only one of the four tracks GEO at all.",
    gap: "Great at doing the work, blind to where you stand in AI answers.",
    platforms: [
      { name: "Jasper", note: "Brand Voice + Canvas", row: "fffpnnnnpnpnnf" },
      { name: "Copy.ai", note: "Workflows", row: "pffnnnnnpnpnnf" },
      { name: "Sintra AI", note: "12 AI helpers", row: "fffpffnnnnpnnn" },
      { name: "Okara (AI CMO)", note: "Agentic marketing", row: "fpfpfpfnpnpnnn" },
    ],
  },
  {
    id: "visibility",
    title: "AEO / GEO visibility platforms",
    blurb:
      "Show how ChatGPT, Gemini and Perplexity see your brand and where competitors win. They report the problem and leave the fix to another tool.",
    gap: "You see the gap, then leave to close it somewhere else.",
    platforms: [
      { name: "Profound", note: "Category leader", row: "nppnnnfffnfnnf" },
      { name: "AthenaHQ", note: "YC-backed", row: "nnfnnnffpnfnnn" },
      { name: "Scrunch AI", note: "Agent Experience Platform", row: "nnpnnnfpfnfnnf" },
      { name: "Peec AI", note: "Berlin, EU-hosted", row: "nnnnnnfffnfnnp" },
      { name: "Otterly.ai", note: "Budget entry point", row: "nnnnnnfppnpnnn" },
    ],
  },
  {
    id: "agency-os",
    title: "Multi-location and agency marketing OS",
    blurb:
      "Run many locations or clients at franchise scale. Pricing is sales-led, which leaves small agencies priced out, and GEO coverage is largely absent.",
    gap: "Built for franchises, not for a studio with five clients.",
    platforms: [
      { name: "SOCi", note: "Multi-location", row: "npfnfnnnfpfnnf" },
      { name: "Birdeye", note: "Reputation + marketing", row: "nffnfnnnfpfnnf" },
    ],
  },
];

export const ALL_COMPETITORS: Platform[] = CATEGORIES.flatMap((c) => c.platforms);

export function levelAt(row: string, i: number): Level {
  return row[i] as Level;
}

/** Points per capability group: full = 1, partial = 0.5. */
export function scoreByGroup(row: string) {
  const out: Record<Group, number> = { create: 0, monitor: 0, scale: 0 };
  CAPS.forEach((c, i) => {
    const l = row[i];
    out[c.group] += l === "f" ? 1 : l === "p" ? 0.5 : 0;
  });
  return out;
}

export function totalScore(row: string) {
  const g = scoreByGroup(row);
  return g.create + g.monitor + g.scale;
}

export const FMT_SCORE = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1));

/** Head to head with the three tools buyers ask about most. Rows 'from matrix' read straight from the grid above. */
export const HEAD_TO_HEAD = {
  columns: ["Mellox AI", "Pomelli", "Profound", "Jasper"],
  rows: [
    { label: "Brand DNA memory", cap: 0 },
    { label: "Content generation", cap: 2 },
    { label: "AEO / GEO monitoring", cap: 6 },
    { label: "Audit to drafted fix, one loop", levels: ["f", "n", "n", "n"] as Level[] },
    { label: "Agency / multi client mode", cap: 8 },
    { label: "Enterprise depth GEO analytics", levels: ["p", "n", "f", "n"] as Level[] },
    { label: "Permanently free plan", levels: ["n", "f", "n", "n"] as Level[] },
    { label: "Entry price per month", text: ["$49", "$0", "$99", "$69"] },
  ],
  rowsBy: ["fffffffffffffp", "fpffpnnnnnnnnn", "nppnnnfffnfnnf", "fffpnnnnpnpnnf"],
};

export const HONESTY = [
  {
    title: "Free brand generation vs. Google Pomelli",
    body: "Pomelli is free and backed by DeepMind. If all you need is on-brand assets with no visibility layer, it is a legitimate free option.",
  },
  {
    title: "Enterprise GEO depth vs. Profound",
    body: "Profound tracks agent level conversation data across 9+ engines as its entire product. The GEO panel in Mellox is part of a broader workspace, not a standalone analytics suite at that depth.",
  },
  {
    title: "We are early",
    body: "A small team doing four jobs well beats a big one doing all of them badly, so Mellox competes hardest in the gap between a free generator and a $99+ a month visibility tool.",
  },
];

export const WINS = [
  {
    n: "01",
    title: "Own the gap between free generators and visibility-only tools",
    body: "GEO tools run from Otterly at $29 a month to Profound from $99, and all of them assume you already have a content engine somewhere else. Free and cheap generators like Pomelli and Canva have no idea how AI engines describe you. Mellox Starter at $49 a month is the one plan under $100 that does both in a single loop: see the gap, generate the fix, publish it.",
    move: "Compare Mellox Starter with a monitor plus a writing tool bought separately, not with an enterprise suite. That is the honest comparison.",
  },
  {
    n: "02",
    title: "A detect, fix and publish loop competitors are not built for",
    body: "Several 2026 buyer guides flag the same gap: GEO tools tell you what is wrong but do not fix it, and generators have no idea what is wrong. Scrunch AI is the only rival even attempting content delivery to AI crawlers, and it is priced for enterprise.",
    move: "In Mellox, an audit finding opens Studio with a pre-filled brief. \"You are invisible for X\" becomes a drafted post or page that closes it.",
  },
  {
    n: "03",
    title: "Agency mode that grows with the customer",
    body: "SOCi, Birdeye and the agency tier of Profound are sales-led, which prices out or ignores agencies with two to ten clients. Agencies rarely start there anyway. They arrive after a founder starts managing a second or third brand.",
    move: "Starter, Growth and Agency are built around one step: add your second client. Agency adds white label ready tooling, a client portal and pooled credits.",
  },
  {
    n: "04",
    title: "Brand DNA that gets harder to leave",
    body: "Pomelli, Jasper, Sintra and Okara all offer some form of brand memory now, so memory alone is no longer a differentiator. What compounds is history: chats, past drafts and approval patterns that make every new draft closer to done.",
    move: "Mellox shows what it has learned about your brand, so the value of staying is something you can see, not just something stored in a database.",
    example: "Example: Mellox has learned 40 things about your brand from 90 days of edits.",
  },
];

export const STACK = {
  rows: [
    { tool: "Otterly.ai", job: "AI visibility monitoring", price: "from $29" },
    { tool: "Copy.ai", job: "Writing workflows", price: "about $49" },
  ],
  total: "about $78",
  mellox: "$49",
};

export const COMPARE_FAQS = [
  {
    q: "Does Mellox work with Claude, ChatGPT, Slack, Notion and Canva?",
    a: "Yes. Mellox connects to Claude and ChatGPT over MCP, to Slack and Notion, and every generated image can be edited in Canva. It also has an Autopilot mode that runs the workflow for you while you watch. These are newer than the 14 capabilities scored in the table.",
  },
  {
    q: "Which tools did you compare?",
    a: "Fifteen competitors in four groups: brand and content generators (Google Pomelli, Canva, Adobe Express, Klaviyo K:AI), AI marketing employee suites (Jasper, Copy.ai, Sintra AI, Okara), AEO and GEO visibility platforms (Profound, AthenaHQ, Scrunch AI, Peec AI, Otterly.ai) and agency or multi-location platforms (SOCi, Birdeye), compared with Mellox AI across the same 14 capabilities.",
  },
  {
    q: "How are the dots scored?",
    a: "Full means the capability is native to the product. Partial means it is an add-on, limited or in beta. Not offered means we could not find it listed publicly. The coverage chart counts a full capability as one point and a partial one as half a point, across 14 capabilities.",
  },
  {
    q: "Is Mellox a replacement for Profound?",
    a: "Not for every team. If you need agent level conversation data across many engines at enterprise depth, Profound goes further on analytics. If you want monitoring and the fix in one place at a lower price, Mellox covers both jobs in a single loop.",
  },
  {
    q: "Is Pomelli enough if it is free?",
    a: "For on-brand assets with no visibility layer, it can be. Pomelli does not monitor how AI engines mention your brand, schedule across platforms or offer an agency mode, so teams that need those usually add Mellox or another tool.",
  },
  {
    q: "Can an agency run client brands in Mellox?",
    a: "Yes. The Agency plan adds the agency command center, white label ready tooling, pooled credits across brands and a client portal with share links. See the pricing page for the full list.",
  },
  {
    q: "Does Mellox have a public API?",
    a: "API access is included on the Scale plan, so it is marked partial in the table. Lower plans do not include it.",
  },
  {
    q: "How current is this comparison?",
    a: "It is a snapshot built from public product pages and pricing. Vendors ship quickly and change prices often, so confirm the details that matter to you before you buy.",
  },
];
