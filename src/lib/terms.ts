// Terms of Service content for /terms. Billing and credit rules mirror the pricing page.
// This is a plain-language draft and should be reviewed by a lawyer before launch.

export const TERMS_UPDATED = "5 October 2026";

export type TermsSection = { id: string; title: string; paras?: string[]; list?: string[]; after?: string };

export const TERMS: TermsSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of these terms",
    paras: [
      "These Terms of Service (the Terms) are an agreement between you and Mellox AI (Mellox, we, us). They apply when you visit mellox.ai, create an account, or use the Mellox platform, including the app at app.mellox.ai.",
      "By using Mellox you confirm that you have read and accept these Terms. If you use Mellox for a company, client or agency, you confirm you are allowed to accept these Terms on its behalf. If you do not agree, please do not use Mellox.",
    ],
  },
  {
    id: "service",
    title: "What Mellox does",
    paras: [
      "Mellox is an AI marketing platform. It learns your brand from your website, helps you plan and create on-brand content, publishes to the channels you connect, and monitors how AI assistants such as ChatGPT, Gemini and Perplexity describe your brand.",
      "We keep improving the product. Features, limits and supported channels can change over time, and some features may be offered in beta.",
    ],
  },
  {
    id: "accounts",
    title: "Accounts and teams",
    list: [
      "You must give accurate information when you sign up and keep your login details secure. You are responsible for activity on your account.",
      "You must be at least 18, or the age of majority where you live, to use Mellox.",
      "Workspaces, brands and seats are limited by your plan. You are responsible for the people you invite and for what they do in your workspace.",
      "Tell us promptly at support@mellox.ai if you think your account has been accessed without permission.",
    ],
  },
  {
    id: "plans",
    title: "Plans, credits and billing",
    paras: ["Mellox is offered on a free plan, a 14 day Growth trial and paid plans (Starter, Growth, Agency and Scale). Current prices and allowances are shown on our pricing page, in US dollars."],
    list: [
      "Credits pay for AI work such as posts, images, articles, research and audits. One credit is worth $0.01 at face value, and the cost of each job is shown before you run it.",
      "Video has its own allowance of video credits, separate from regular credits.",
      "Monthly plan allowances do not roll over. On annual Growth, Agency and Scale plans, up to one month of your allowance carries over.",
      "Credit packs and video packs you buy once never expire. Monthly add-ons renew each month until cancelled.",
      "Annual billing is 10 months for the price of 12 and is charged up front. Monthly plans renew each month until cancelled.",
      "The Growth trial needs a card to start and converts to a paid plan unless you cancel before the 14 days end.",
      "Scale plans are quoted individually and governed by the order you sign with us.",
      "Taxes may be added where required. You authorise us, through our payment provider, to charge the payment method you give us for the fees that apply.",
    ],
    after: "We may change prices or plan features. We will give you notice before a change affects your next renewal, and you can cancel before it takes effect.",
  },
  {
    id: "cancel",
    title: "Cancelling, pausing and refunds",
    list: [
      "You can cancel a paid plan at any time. Your plan stays active until the end of the period you have paid for.",
      "You can pause any paid plan for $9 a month. Pausing keeps your data, your brands and 10 weekly tracked prompts.",
      "Except where the law requires otherwise, fees already paid are not refundable, including for partly used periods and unused credits.",
      "If we make a billing mistake, contact us at support@mellox.ai and we will correct it.",
    ],
  },
  {
    id: "content",
    title: "Your content and Brand DNA",
    paras: [
      "You keep ownership of the material you give us, such as your website content, brand information, uploads and instructions (Your Content). You give Mellox a limited licence to host, process and display Your Content only as needed to run the service for you.",
      "Brand DNA, drafts, approval history and other data in your workspace belong to your workspace. We do not sell Your Content, and we do not publish anything on your behalf without your approval.",
    ],
    list: [
      "You promise that you have the rights to Your Content and that it does not break the law or anyone else's rights.",
      "You are responsible for the claims, offers and statements in anything you approve and publish.",
    ],
  },
  {
    id: "ai",
    title: "AI generated output",
    paras: [
      "Mellox uses AI models to create drafts, images, articles and recommendations. AI output can be inaccurate, incomplete or similar to other output. You should review it before you rely on it or publish it.",
      "As between you and Mellox, you own the output generated for your workspace to the extent the law allows. We cannot promise that any particular result will be produced, that a brand will be cited by an AI assistant, or that rankings, traffic or sales will improve.",
    ],
  },
  {
    id: "publishing",
    title: "Connected accounts and publishing",
    list: [
      "When you connect a social, CMS or analytics account, you authorise Mellox to act on it as you direct, for example to schedule and publish approved posts.",
      "Every generated draft goes to a Needs Approval queue. Nothing is scheduled or published until you review and confirm it.",
      "You must follow the rules of each connected platform. Platforms can change or limit access, and a post can fail to publish for reasons outside our control.",
      "The same applies to assistants and apps you connect, such as Claude and ChatGPT through MCP, Slack, Notion and Canva. You choose what to connect, and their own terms apply to your use of them.",
      "You can disconnect an account at any time from your workspace settings.",
    ],
  },
  {
    id: "use",
    title: "Acceptable use",
    paras: ["You agree not to use Mellox to:"],
    list: [
      "break the law or infringe someone's rights, or publish content that is unlawful, hateful, deceptive, or abusive;",
      "send spam, run fake reviews or impersonate a person or brand you do not represent;",
      "try to access other customers' data, probe or disrupt the service, or bypass limits, security or rate controls;",
      "scrape, copy or resell the service, or reverse engineer it except where the law allows;",
      "use output to train a competing AI product, or use the service to build one;",
      "upload malware or content that you are not allowed to share.",
    ],
    after: "We may suspend or remove content or access that breaks these rules or puts others at risk.",
  },
  {
    id: "third-party",
    title: "Third party services",
    paras: [
      "Mellox works with third party services such as AI model providers, payment processors, email providers and the platforms you connect. Their own terms and privacy policies apply to your use of them, and we are not responsible for their services.",
    ],
  },
  {
    id: "ip",
    title: "Our intellectual property",
    paras: [
      "Mellox, including its software, design, brand, the four marketing brains and the documentation, belongs to us and our licensors. These Terms give you a limited, non-exclusive, non-transferable right to use the service while your account is active. They do not transfer any ownership to you.",
      "If you send us feedback or ideas, you let us use them freely to improve Mellox without owing you anything.",
    ],
  },
  {
    id: "disclaimer",
    title: "Disclaimers",
    paras: [
      "Mellox is provided as is and as available. To the fullest extent the law allows, we do not give any warranty that the service will be uninterrupted, error free or secure, or that it will meet your needs, and we disclaim implied warranties such as merchantability, fitness for a particular purpose and non-infringement.",
      "Information about competitors, AI assistants and search results is gathered from public sources and can change quickly. It is for guidance and is not legal, financial or professional advice.",
    ],
  },
  {
    id: "liability",
    title: "Limits on liability",
    paras: [
      "To the fullest extent the law allows, Mellox and its team will not be liable for indirect, incidental, special or consequential losses, or for lost profits, revenue, data or goodwill, arising from your use of the service.",
      "Our total liability for any claim relating to the service is limited to the amount you paid us in the 12 months before the event that caused the claim. Nothing in these Terms limits liability that cannot be limited by law.",
    ],
  },
  {
    id: "termination",
    title: "Suspension and termination",
    paras: [
      "You may stop using Mellox at any time. We may suspend or end your access if you break these Terms, if payment fails, if required by law, or if your use puts the service or others at risk. Where it is reasonable, we will tell you first.",
      "After termination you lose access to your workspace. You can ask us to export your data before then, and we will delete or anonymise it after a reasonable period unless we must keep it by law. Sections that by their nature should survive, such as ownership, disclaimers and liability, continue to apply.",
    ],
  },
  {
    id: "changes",
    title: "Changes to these terms",
    paras: [
      "We may update these Terms from time to time. When we make a material change we will tell you, for example by email or in the app, before it takes effect. If you keep using Mellox after the change takes effect, you accept the updated Terms.",
    ],
  },
  {
    id: "law",
    title: "Governing law and disputes",
    paras: [
      "These Terms are governed by the laws of the place where Mellox is established, without regard to conflict of law rules. We encourage you to contact us first so we can try to resolve any concern informally. Any dispute we cannot resolve that way will be handled by the courts with jurisdiction in that place, unless the law where you live gives you the right to bring a claim elsewhere.",
    ],
  },
  {
    id: "contact",
    title: "Contact us",
    paras: ["Questions about these Terms? Email support@mellox.ai or use our contact page and we will get back to you."],
  },
];
