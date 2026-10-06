import { PLANS } from "./pricing";
import {
  ALL_COMPETITORS,
  CAPS,
  CATEGORIES,
  GROUP_META,
  MELLOX,
  totalScore,
  FMT_SCORE,
  type Category,
  type Level,
  type Platform,
} from "./compare";

// One comparison page per rival (/compare/<slug>), generated from the same matrix as /compare so the numbers can never
// drift from the main table. Only facts already in that data are used: nothing about a rival is invented here.

export const slugify = (name: string) =>
  name
    .toLowerCase()
    .replace(/\s*\(.*?\)\s*/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Entry prices that are already published in the /compare head-to-head and stack tables. */
const RIVAL_PRICE: Record<string, string> = {
  "Google Pomelli": "free ($0)",
  Profound: "from $99 a month",
  Jasper: "from $69 a month",
  "Otterly.ai": "from $29 a month",
  "Copy.ai": "about $49 a month",
};

/** The short, honest "when the rival is the better pick" notes the main page already states. */
const RIVAL_EDGE: Record<string, string> = {
  "Google Pomelli": "you only need free on-brand assets and have no need to track how AI engines describe your brand",
  Profound: "you need agent-level conversation data across many AI engines at enterprise depth",
};

export type Rival = {
  slug: string;
  platform: Platform;
  category: Category;
  price: string | null;
  mxScore: number;
  rivalScore: number;
  /** capabilities by outcome from Mellox's point of view */
  ahead: number[];
  level: number[];
  behind: number[];
  rows: { label: string; group: string; mellox: Level; rival: Level }[];
};

const cmp = (l: string) => (l === "f" ? 2 : l === "p" ? 1 : 0);

export const RIVALS: Rival[] = CATEGORIES.flatMap((category) =>
  category.platforms.map((platform): Rival => {
    const ahead: number[] = [];
    const level: number[] = [];
    const behind: number[] = [];
    CAPS.forEach((_, i) => {
      const d = cmp(MELLOX.row[i]) - cmp(platform.row[i]);
      (d > 0 ? ahead : d < 0 ? behind : level).push(i);
    });
    return {
      slug: slugify(platform.name),
      platform,
      category,
      price: RIVAL_PRICE[platform.name] ?? null,
      mxScore: totalScore(MELLOX.row),
      rivalScore: totalScore(platform.row),
      ahead,
      level,
      behind,
      rows: CAPS.map((c, i) => ({
        label: c.label,
        group: GROUP_META[c.group].label,
        mellox: MELLOX.row[i] as Level,
        rival: platform.row[i] as Level,
      })),
    };
  }),
);

export const RIVAL_BY_SLUG: Record<string, Rival> = Object.fromEntries(RIVALS.map((r) => [r.slug, r]));

export const starterPrice = () => PLANS.find((p) => p.monthly !== null)?.monthly ?? 49;

const list = (xs: string[]) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);
const labels = (idx: number[], n = 4) => idx.slice(0, n).map((i) => CAPS[i].short);

export function rivalFaqs(r: Rival) {
  const name = r.platform.name;
  const free = r.rivalScore;
  const mx = r.mxScore;
  const faqs = [
    {
      q: `Is Mellox AI a good ${name} alternative?`,
      a:
        r.ahead.length > 0
          ? `Mellox AI is built for teams that want more than ${name} covers on its own. Across the 14 capabilities we compare, Mellox is ahead on ${r.ahead.length}, including ${list(labels(r.ahead))}. It scores ${FMT_SCORE(mx)} out of 14 to ${name}'s ${FMT_SCORE(free)}.`
          : `Mellox AI and ${name} overlap heavily. Mellox scores ${FMT_SCORE(mx)} out of 14 to ${name}'s ${FMT_SCORE(free)} on our table, so the choice comes down to price, workflow and the integrations you need.`,
    },
    {
      q: `How does Mellox AI compare with ${name} on price?`,
      a: r.price
        ? `${name} is ${r.price}. Mellox AI has a free plan and its Starter plan is $${starterPrice()} a month, with Growth, Agency and Scale plans above it. Check both pricing pages before you buy, because vendors change prices often.`
        : `Mellox AI has a free plan and its Starter plan is $${starterPrice()} a month, with Growth, Agency and Scale plans above it. We have not listed a price for ${name} here, so check its pricing page for the current figure.`,
    },
    {
      q: `Does ${name} track how ChatGPT, Gemini and Perplexity describe a brand?`,
      a:
        r.platform.row[6] === "f"
          ? `Yes, GEO and AEO monitoring is a native capability of ${name} in our table. Mellox AI also includes it, and pairs it with content creation and publishing so a finding can become a drafted fix.`
          : r.platform.row[6] === "p"
            ? `Only partly. We mark GEO and AEO monitoring as partial, add-on or limited for ${name}. Mellox AI includes it natively, with a content workflow that turns each finding into a drafted fix.`
            : `We could not find GEO or AEO monitoring listed for ${name}. Mellox AI includes it natively and connects it to content creation and publishing.`,
    },
    {
      q: `Who should choose ${name} instead of Mellox AI?`,
      a: RIVAL_EDGE[name]
        ? `Choose ${name} if ${RIVAL_EDGE[name]}. Choose Mellox AI if you want brand memory, content, publishing and AI-visibility tracking in one workspace.`
        : r.behind.length > 0
          ? `${name} is as strong or stronger on ${list(labels(r.behind))}. If those matter most to you, it deserves a close look. Choose Mellox AI if you want brand memory, content, publishing and AI-visibility tracking in one workspace.`
          : `${name} is a reasonable pick if you already use it and its current feature set covers your needs. Choose Mellox AI if you want brand memory, content, publishing and AI-visibility tracking in one workspace.`,
    },
  ];
  return faqs;
}

export const RIVAL_COUNT = ALL_COMPETITORS.length;
