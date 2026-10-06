import { BRAINS, FOUNDERS, PRINCIPLES, STACK_REPLACED, STATS, STEPS } from "./about";
import type { PostIndexEntry } from "./blog-index";
import { FAQS as INTEGRATION_FAQS, GROUPS } from "./integrations";
import { DOC_FAQS } from "./docs";
import { faqs } from "./faqs";
import { FEATURES } from "./features";
import { PLANS, PRICING_FAQS } from "./pricing";
import { CONTROL, FAQS as SECURITY_FAQS, PROTECT } from "./security";
import { SITE_NAME, SITE_URL } from "./seo";
import { USE_CASES } from "./use-cases";

// Generates /llms.txt (a short, curated map of the site for AI assistants) and /llms-full.txt (the same, with the
// substance of every key page in plain Markdown). Everything is built from the same data that renders the site, so
// it cannot drift from what visitors see. Spec: https://llmstxt.org

const abs = (p: string) => `${SITE_URL}${p}`;

export const SUMMARY =
  "Mellox AI is an AI marketing platform for agencies and startups. It learns a brand from its website (Brand DNA), plans and creates on-brand content, publishes it natively to social channels after human approval, and tracks and improves how AI assistants such as ChatGPT, Gemini and Perplexity describe the brand (GEO and AEO).";

const priceLine = (p: (typeof PLANS)[number]) => (p.monthly === null ? "custom pricing" : `$${p.monthly} per month`);

export function buildLlmsTxt(posts: PostIndexEntry[]): string {
  const lines: string[] = [];
  const add = (s = "") => lines.push(s);

  add(`# ${SITE_NAME}`);
  add();
  add(`> ${SUMMARY}`);
  add();
  add(`Official name: Mellox AI. Website: ${SITE_URL}. App: https://app.mellox.ai. Support: support@mellox.ai.`);
  add(
    `Plans: Free, ${PLANS.map((p) => `${p.name} (${priceLine(p)})`).join(", ")}. Nothing publishes without the customer's approval. Prices are in US dollars and are listed on the pricing page.`,
  );
  add();

  add("## Product");
  for (const f of FEATURES) add(`- [${f.name}](${abs(`/features/${f.slug}`)}): ${f.metaDescription}`);
  add(`- [Integrations](${abs("/integrations")}): Connect Google Analytics and Search Console, Meta, LinkedIn, X, TikTok, YouTube, Pinterest, Reddit, WordPress, Webflow and GitHub.`);
  add();

  add("## Who it is for");
  for (const u of USE_CASES) add(`- [Mellox for ${u.name.toLowerCase()}](${abs(`/use-cases/${u.slug}`)}): ${u.metaDescription}`);
  add();

  add("## Pricing and comparison");
  add(`- [Pricing](${abs("/pricing")}): Plans, credits, limits and a full feature matrix for Free, Starter, Growth, Agency and Scale.`);
  add(`- [Compare](${abs("/compare")}): An honest comparison of Mellox with other AI marketing and AI visibility platforms, including where it does not win.`);
  add(`- [Book a demo](${abs("/demo")}): Talk to the team and see Mellox on your own brand.`);
  add();

  add("## Learn");
  add(`- [Docs and FAQ](${abs("/docs")}): Guides on Brand DNA, GEO and AEO audits, publishing, agency workspaces and billing.`);
  add(`- [FAQ](${abs("/faq")}): Common questions about what Mellox is and how it works.`);
  add(`- [Blog](${abs("/blog")}): Guides and ideas on AI search, GEO and marketing.`);
  for (const p of posts) add(`  - [${p.title}](${abs(`/blog/${p.slug}`)}): ${p.description}`);
  add(`- [Changelog](${abs("/changelog")}): Product updates, newest first.`);
  add();

  add("## Company");
  add(`- [About](${abs("/about")}): Who builds Mellox, what it believes and who it is for.`);
  add(`- [Security and trust](${abs("/security")}): What stays private, what customers control and who to ask.`);
  add(`- [Contact](${abs("/contact")}): Support, press and partnership enquiries.`);
  add();

  add("## Optional");
  add(`- [Full text of this site for AI assistants](${abs("/llms-full.txt")}): The substance of every key page in one Markdown file.`);
  add(`- [Privacy Policy](${abs("/privacy")})`);
  add(`- [Terms of Service](${abs("/terms")})`);
  add(`- [Cookie Policy](${abs("/cookies")})`);
  add(`- [Sitemap](${abs("/sitemap.xml")})`);
  add();
  return lines.join("\n");
}

export function buildLlmsFullTxt(posts: PostIndexEntry[]): string {
  const out: string[] = [];
  const add = (s = "") => out.push(s);
  const faq = (items: { q: string; a: string }[]) => {
    for (const f of items) {
      add(`**${f.q}**`);
      add(f.a);
      add();
    }
  };

  add(`# ${SITE_NAME}: full site content`);
  add();
  add(`> ${SUMMARY}`);
  add();
  add(`Source: ${SITE_URL}. This file mirrors the public pages in plain Markdown for AI assistants. Short index: ${abs("/llms.txt")}.`);
  add();

  add("## About Mellox");
  add();
  add(`${STATS.map((s) => `${s.value} ${s.label}`).join("; ")}.`);
  add();
  add(`**Founders:** ${FOUNDERS.map((f) => `${f.name} (${f.role})`).join("; ")}.`);
  add();
  add("**How it works:**");
  STEPS.forEach((s, i) => add(`${i + 1}. ${s.title}: ${s.text}`));
  add();
  add(`**Replaces a stack of separate tools:** ${STACK_REPLACED.join(", ")}.`);
  add();
  add("**The four marketing brains (included in every plan):**");
  for (const b of BRAINS) add(`- ${b.name} (${b.tag}): ${b.text}`);
  add();
  add("**Principles:**");
  for (const p of PRINCIPLES) add(`- ${p.title}: ${p.body}`);
  add();

  add("## Plans and pricing");
  add();
  for (const p of PLANS) {
    add(`### ${p.name}: ${priceLine(p)}`);
    add(`${p.tagline}. ${p.credits}; ${p.chips.join(", ")}. ${p.imagePosts}; ${p.articles}; ${p.video}.`);
    if (p.featuresIntro) add(p.featuresIntro);
    for (const f of p.features) add(`- ${f}`);
    add();
  }
  add("### Pricing questions");
  add();
  faq(PRICING_FAQS);

  add("## Product pages");
  add();
  for (const f of FEATURES) {
    add(`### ${f.name} (${abs(`/features/${f.slug}`)})`);
    add(`${f.headline[0]} ${f.headline[1]} ${f.lede}`);
    add();
    add("How it works:");
    f.steps.forEach((s, i) => add(`${i + 1}. ${s.title}: ${s.text}`));
    add();
    add(`${f.itemsTitle}:`);
    for (const it of f.items) add(`- ${it.title}: ${it.text}`);
    add();
    faq(f.faqs);
  }

  add("## Use cases");
  add();
  for (const u of USE_CASES) {
    add(`### Mellox for ${u.name.toLowerCase()} (${abs(`/use-cases/${u.slug}`)})`);
    add(`${u.headline[0]} ${u.headline[1]} ${u.lede}`);
    add();
    add("Common problems:");
    for (const p of u.pains) add(`- ${p.title}: ${p.text}`);
    add();
    add("How Mellox helps:");
    for (const h of u.help) add(`- ${h.title}: ${h.text}`);
    add();
    faq(u.faqs);
  }

  add("## Integrations");
  add();
  for (const g of GROUPS) {
    add(`### ${g.title}`);
    add(g.intro);
    for (const it of g.items) add(`- ${it.name} (${it.plan}): ${it.text}`);
    add();
  }
  faq(INTEGRATION_FAQS);

  add("## Security and trust");
  add();
  for (const it of [...CONTROL, ...PROTECT]) add(`- ${it.title}: ${it.text}`);
  add();
  faq(SECURITY_FAQS);

  add("## Frequently asked questions");
  add();
  faq(faqs);
  add("### Docs and FAQ");
  add();
  faq(DOC_FAQS);

  if (posts.length) {
    add("## Blog");
    add();
    for (const p of posts) add(`- [${p.title}](${abs(`/blog/${p.slug}`)}) (${p.date}): ${p.description}`);
    add();
  }

  return out.join("\n");
}
