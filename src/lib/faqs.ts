export type Faq = { q: string; a: string };

/** The first FEATURED questions are shown on the home page; the full list lives on /faq. */
export const FEATURED = 8;

export const faqs: Faq[] = [
  {
    q: "What is Mellox?",
    a: "Mellox is an AI marketing platform that turns your website into a full growth workflow: it learns your brand, plans and creates on-brand content, publishes it to your channels, and works to get your brand cited by AI assistants like ChatGPT and Gemini.",
  },
  {
    q: "How does Mellox learn my brand?",
    a: "Paste a link to your website and Mellox extracts your positioning, tone, voice and audience into a living Brand DNA in seconds. Everything it creates afterwards is checked against that profile, so it keeps sounding like you.",
  },
  {
    q: "What are the four brains?",
    a: "Mellox runs four specialist brains in parallel: Brand Brain (your voice and rules), Customer Brain (audience intent), Competitor Brain (how rivals show up in AI answers) and Market Brain (shifts across your category). They weigh in on every decision before anything reaches you.",
  },
  {
    q: "How does Mellox get my brand cited by AI?",
    a: "It publishes answer-engine (AEO / GEO) articles written to be quoted, scores your site on the technical signals AI engines look at, and gives you ranked fixes such as llms.txt, schema and crawlability, so assistants have a clear reason to cite you.",
  },
  {
    q: "Which platforms can Mellox publish to?",
    a: "Mellox creates a native version of each post for LinkedIn, X, Instagram, TikTok, Facebook, YouTube, Pinterest, Reddit and Threads, then publishes instantly or on the schedule you set.",
  },
  {
    q: "Can I manage multiple clients or brands?",
    a: "Yes. Agency Mode gives you one command deck for every client: switch brands, review a unified approval queue, share roles with clients and track activity across the whole roster.",
  },
  {
    q: "Do I stay in control of what gets published?",
    a: "Always. Drafts wait for your approval, and you can edit, reschedule or reject anything. Approvals can also be shared with clients or teammates through roles.",
  },
  {
    q: "Is my data secure?",
    a: "Your brand data and content are private to your workspace and are not shared with other customers. Access is controlled through roles, and you decide which accounts Mellox connects to. You can read the details on our Security page.",
  },
  {
    q: "How quickly can I get started?",
    a: "Most teams are up and running the same day: paste your website, review the Brand DNA Mellox generates, set your goals and your first calendar is ready to review.",
  },
  {
    q: "Is there a free trial?",
    a: "You can sign up for free and no credit card is required to get started. Plans and pricing for growing teams and agencies are listed on the pricing page.",
  },
  {
    q: "What is AEO or GEO?",
    a: "Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) are the practice of making your content easy for AI assistants to understand, trust and quote, the way SEO does for search results.",
  },
  {
    q: "Can Mellox replace my marketing team?",
    a: "Mellox is built to remove the busywork, not the people. It handles research, drafting, formatting and publishing so your team can spend its time on strategy, creative direction and relationships.",
  },
  {
    q: "Does Mellox connect to the tools I already use?",
    a: "Mellox syncs analytics from Google and Meta, tracks mentions across major AI assistants and connects to your social accounts so everything lives in one workspace.",
  },
  {
    q: "Do I need technical skills to use it?",
    a: "No. You work in plain English: describe your goals, chat with the AI coach, and approve what you like. Technical fixes for AI visibility are explained in plain language and ranked by impact.",
  },
  {
    q: "How is Mellox different from a generic AI writing tool?",
    a: "A generic model drafts one good post and then forgets. Mellox keeps a shared memory of your brand, customers, competitors and market, so every new piece builds on everything before it.",
  },
  {
    q: "Can I cancel at any time?",
    a: "Yes. There is no lock-in, and you can export your Brand DNA and content whenever you like.",
  },
];
