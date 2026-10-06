// Privacy Policy content for /privacy. Source: "Mellox AI Privacy Policy" (effective 7 October 2026).
// Text uses **bold** for lead-ins; web addresses and email addresses are turned into links when rendered.
// Section 9 (cookies) is written to match the consent-gated analytics and marketing tools the website really uses,
// see components/Analytics.tsx and the Cookie Policy. Have the final text reviewed by a lawyer before launch.
import type { TermsSection } from "./terms";

export const PRIVACY_UPDATED = "7 October 2026";

/** Fill these in before launch: they appear in the first paragraph and in the contact section. */
export const LEGAL_ENTITY = "[LEGAL ENTITY NAME]";
export const LEGAL_ADDRESS = "[REGISTERED ADDRESS]";

/** Opening paragraphs, shown above the numbered sections. */
export const PRIVACY_PREFACE: string[] = [
  "This Privacy Policy explains how Mellox AI (\"Mellox\", \"we\", \"us\" or \"our\") collects, uses, stores, shares and protects information when you use the Mellox AI website at https://mellox.ai, the Mellox AI web application, the Mellox MCP server for AI assistants, and any related services (together, the \"Service\").",
  "Mellox AI is operated by " + LEGAL_ENTITY + ", " + LEGAL_ADDRESS + " (\"Mellox\"). If you have any question about this policy, contact us at **privacy@mellox.ai**.",
  "By creating an account or using the Service, you acknowledge that you have read this Privacy Policy. If you do not agree with it, please do not use the Service.",
];

export const PRIVACY: TermsSection[] = [
  {
    id: "summary",
    title: "Summary",
    blocks: [
      {
        ul: [
          "Mellox is a marketing platform for brands and agencies. We collect the information you give us, the information your connected accounts share with us when you authorize them, and basic technical information needed to run and secure the Service.",
          "We use your information to provide the Service. We do not sell your personal information, and we do not use it for advertising.",
          "We do not use your content, or any data we receive from Google, Meta, LinkedIn, X, TikTok, YouTube, GitHub or any other connected platform, to train Mellox's own AI models or any generalized AI model.",
          "Data from connected platforms is read only with your permission, used only for the features you turn on, and you can disconnect it at any time.",
          "Every brand you create in Mellox lives in its own isolated workspace. Only members of that workspace can see its data.",
          "You can ask us to access, export, correct or delete your data at any time by writing to privacy@mellox.ai.",
        ],
      },
    ],
  },
  {
    id: "who-this-policy-applies-to",
    title: "Who this policy applies to",
    blocks: [
      { p: "This policy applies to:" },
      {
        ul: [
          "**Account holders:** people who sign up for Mellox, including owners, admins, editors and viewers of a workspace.",
          "**Invited team members and clients:** people invited to a workspace or given access to a client portal link.",
          "**Website visitors:** people who visit mellox.ai without signing in.",
        ],
      },
      { p: "When a business (for example, an agency or a brand) uses Mellox, the business decides what content and accounts to bring into its workspace. For personal data that a business uploads about its own customers or contacts, that business is the \"controller\" and Mellox acts as its \"processor\" or \"service provider\". In those cases we process that data only on the business's instructions and under this policy and our Terms of Service." },
    ],
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    blocks: [
      { h: "3.1 Information you give us" },
      {
        ul: [
          "**Account information:** your name, email address, password (stored only as a secure hash by our authentication provider), profile photo if you add one, and your workspace role.",
          "**Workspace and brand information:** brand names, website addresses, Brand DNA (brand facts, voice, colors, fonts, logos, audience notes, products), competitor lists, marketing strategy, memory items (\"things Mellox should remember\"), and settings.",
          "**Content you create or upload:** chat messages, prompts, briefs, drafts, captions, articles, images, videos, carousels, stories, product references, comments, approvals and scheduled posts.",
          "**Team and client information:** email addresses of people you invite, and comments left in a client portal.",
          "**Billing information:** your plan, credit balance, purchase history and billing contact details. Card payments are processed by Stripe. Mellox never receives or stores your full card number.",
          "**Support communications:** anything you send us when you contact support, including attachments.",
        ],
      },
      { h: "3.2 Information from accounts you connect" },
      { p: "Mellox only receives data from a third-party platform after you, or an admin of your workspace, choose to connect it and approve the platform's own consent screen. What we receive depends on the platform and the permissions you grant." },
      { p: "**Sign in with Google.** If you sign in with Google, we receive your name, email address and profile picture (the openid, email and profile scopes). We use these only to create and sign in to your account." },
      { p: "**Google Analytics and Google Search Console.** If you connect these in Analytics, we request **read-only** access:" },
      {
        ul: [
          "https://www.googleapis.com/auth/analytics.readonly (Google Analytics)",
          "https://www.googleapis.com/auth/webmasters.readonly (Google Search Console)",
        ],
      },
      { p: "With this access we read the list of properties and sites you can access, and performance data for the property or site you select, such as sessions, users, page views, traffic sources, search queries, clicks, impressions, click-through rate and average position. We cannot change anything in your Google Analytics or Search Console accounts. This connection is separate from Sign in with Google, so these permissions are never requested during sign-in." },
      { p: "**Social media accounts** (LinkedIn, X, Instagram, Facebook, Threads, TikTok and YouTube, depending on availability). When you connect an account to publish, we receive the account's ID, display name, username, profile picture, and the permissions needed to publish posts you approve and to read the performance of those posts (for example likes, comments, shares, views and reach). Publishing is handled through our distribution partner, Post for Me. We do not read your private messages." },
      { p: "**YouTube.** If you connect a YouTube channel, Mellox uses YouTube API Services. By connecting YouTube you also agree to the YouTube Terms of Service (https://www.youtube.com/t/terms), and Google's Privacy Policy (https://policies.google.com/privacy) applies to Google's handling of your data. You can revoke Mellox's access at any time through Google's security settings at https://myaccount.google.com/permissions." },
      { p: "**GitHub.** If you install the Mellox GitHub App to fix website issues, we read repository metadata and the files needed to propose a fix, and we create branches and pull requests for changes you approve. Mellox never merges a pull request or pushes to your main branch." },
      { p: "**Canva.** If you connect Canva, we upload images you choose into your Canva account, create designs from them and export your edited designs back to Mellox. We request asset and design read and write permissions only." },
      { p: "**Notion.** If you connect Notion, we read and write only the pages or databases you share with the Mellox integration, to export or import your content calendar." },
      { p: "**Other connectors.** Slack, Webflow and WordPress connections, where available, work the same way: we receive only what you authorize, only to provide the feature you turned on." },
      { h: "3.3 Information collected automatically" },
      {
        ul: [
          "**Usage and log data:** pages and features used, actions taken, timestamps, errors, IP address, browser type, device type and operating system. We use this to run, secure and improve the Service.",
          "**AI usage records:** which feature was used, which AI model handled it, token counts, estimated cost and outcome. These records support billing, spend limits and abuse prevention.",
          "**Cookies and local storage:** see Section 9.",
        ],
      },
      { h: "3.4 Information from public sources" },
      { p: "To build Brand DNA, track competitors, analyze your market and check AI visibility, Mellox reads publicly available web pages, such as your website, competitor websites, news articles and search results. Mellox may also ask AI assistants public questions about your brand to measure how they describe it. This information is about businesses and public topics, not about individual people. If a public page happens to contain personal information, we use it only as part of the business analysis you requested." },
    ],
  },
  {
    id: "how-we-use-information",
    title: "How we use information",
    blocks: [
      { p: "We use information only for the following purposes:" },
      {
        ol: [
          "**To provide the Service:** creating your account, running your workspaces, generating content, publishing approved posts, running scans, showing analytics and powering the features you use.",
          "**To personalize results for your brand:** using your Brand DNA, memory, strategy and connected data so that generated content and recommendations match your brand.",
          "**To process payments and manage plans:** tracking credits, enforcing plan limits and handling purchases and refunds.",
          "**To keep the Service secure:** authenticating users, preventing fraud and abuse, enforcing rate limits and investigating incidents.",
          "**To communicate with you:** service emails such as approval reminders, billing notices, security alerts and replies to support requests. We do not send marketing emails without your consent, and every marketing email has an unsubscribe link.",
          "**To improve the Service:** understanding which features are used and fixing problems, using aggregated or de-identified usage data where possible.",
          "**To meet legal obligations:** complying with laws, responding to lawful requests and enforcing our Terms of Service.",
        ],
      },
      { p: "**We do not:**" },
      {
        ul: [
          "sell or rent personal information to anyone;",
          "use personal information or connected-platform data for advertising, retargeting or building ad profiles;",
          "use your content or connected-platform data to train Mellox's own AI models or any generalized AI or machine learning model;",
          "allow people to read your connected-platform data except as described in Section 7.3.",
        ],
      },
    ],
  },
  {
    id: "google-api-services-limited-use-disclosu",
    title: "Google API Services: Limited Use disclosure",
    blocks: [
      { p: "Mellox AI's use and transfer to any other app of information received from Google APIs will adhere to the [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy), including the Limited Use requirements." },
      { p: "Specifically, for data received through Google Analytics, Google Search Console, YouTube and Sign in with Google:" },
      {
        ul: [
          "We use Google user data only to provide and improve user-facing features that are visible and prominent in Mellox, namely sign-in, the Analytics dashboard, website and search performance insights, AI visibility reporting, and recommendations based on that data.",
          "We do not transfer Google user data to others except as needed to provide or improve those features, to comply with applicable law, for security purposes, or as part of a merger, acquisition or sale of assets with notice to users.",
          "We do not use or transfer Google user data for serving advertisements, including retargeting, personalized or interest-based advertising.",
          "We do not sell Google user data.",
          "We do not use Google user data to develop, improve or train generalized or non-personalized AI or machine learning models.",
          "Mellox personnel do not read Google user data unless you give us explicit permission for specific data (for example, to resolve a support request), it is necessary for security purposes such as investigating abuse, it is necessary to comply with applicable law, or the data has been aggregated and anonymized for internal operations.",
        ],
      },
      { p: "When Google user data is sent to an AI model to produce an insight you asked for (for example, a summary of your search performance), it is sent only to produce that result for you, and it is not used by Mellox to train any model." },
      { p: "You can disconnect Google Analytics and Search Console at any time in Mellox. When you disconnect, we delete the stored access and refresh tokens. You can also revoke access directly at https://myaccount.google.com/permissions." },
    ],
  },
  {
    id: "how-ai-is-used-in-mellox",
    title: "How AI is used in Mellox",
    blocks: [
      { p: "Mellox uses third-party AI models to generate text, images and videos, and to analyze information for you." },
      {
        ul: [
          "When you use an AI feature, the relevant content (your prompt, the necessary parts of your Brand DNA, memory and workspace context, and any data the feature needs) is sent to the AI provider to generate the result.",
          "Mellox routes most AI requests through OpenRouter, which forwards them to model providers such as Anthropic, Google and others. Video generation may use KIE or OpenRouter.",
          "AI providers process this content to return a result under their own terms and data processing commitments. Where a provider offers a setting that prevents training on API data, we use it.",
          "AI output can be inaccurate. Mellox is designed so that people review and approve content before it is published, unless you turn on a fully automatic mode for simple posts.",
          "Generated images may include embedded attribution information (your workspace's name and website as creator or publisher). We remove location, GPS and device data from generated images before storing them.",
        ],
      },
    ],
  },
  {
    id: "how-we-share-information",
    title: "How we share information",
    blocks: [
      { p: "We share information only in the following situations." },
      { h: "7.1 With people you choose" },
      {
        ul: [
          "**Your workspace team:** members of a workspace can see that workspace's data, according to their role (owner, admin, editor or viewer).",
          "**Your clients:** if you create a client portal link, anyone with the link (and the password, if you set one) can see the content you chose to share. You can rotate or disable the link at any time.",
          "**Social platforms:** when you approve a post, we send it to the platform you selected so it can be published publicly or as you configured.",
          "**AI assistants you connect:** if a workspace admin turns on AI assistant access (the Mellox MCP server) and you connect an assistant such as Claude or ChatGPT, that assistant can read and, if allowed, change workspace data on your behalf. Your use of that assistant is also governed by its provider's privacy policy.",
        ],
      },
      { h: "7.2 With service providers" },
      { p: "We use trusted service providers to run Mellox. They may process personal information only on our instructions and only to provide their service to us. Our main providers are:" },
      {
        ul: [
          "**Supabase:** Database, authentication and file storage",
          "**Railway and other cloud hosting providers:** Application hosting and infrastructure",
          "**OpenRouter and the model providers it routes to (for example Anthropic and Google):** AI text, image and analysis",
          "**KIE:** AI video generation",
          "**Post for Me:** Publishing to social media platforms and reading post performance",
          "**Tavily and Firecrawl:** Searching and reading public web pages",
          "**Stripe:** Payment processing",
          "**Resend:** Sending service emails",
          "**Rixot:** Fulfilling backlink placements you purchase",
          "**Sentry (or a compatible service):** Error monitoring",
          "**Google, GitHub, Canva, Notion, Slack, Webflow, WordPress:** Only when you connect them, to provide the connected feature",
        ],
      },
      { p: "We may update this list as our services change. You can request the current list of providers at privacy@mellox.ai." },
      { h: "7.3 Inside Mellox (our team and developers)" },
      { p: "Mellox is built by a small team, including employees and contracted developers. To protect your data:" },
      {
        ul: [
          "Access to production systems and customer data is limited to team members who need it to operate, secure or support the Service, and is granted on a least-privilege basis.",
          "Everyone with access is bound by written confidentiality obligations.",
          "Developers build and test using test accounts and test data, not real customer data.",
          "Secrets such as access tokens and API keys are kept on the server, encrypted where stored, and never shown in the app or shared in documents or chat.",
          "Team members do not view the content of a workspace or connected-platform data unless you ask us to (for example, in a support request), it is needed to investigate a security issue or abuse, or the law requires it.",
          "Sensitive actions are recorded in audit logs.",
        ],
      },
      { h: "7.4 For legal reasons" },
      { p: "We may disclose information if we believe in good faith that it is required by law, regulation, court order or other legal process, or to protect the rights, property or safety of Mellox, our users or the public. Where legally permitted, we will notify you first." },
      { h: "7.5 Business transfers" },
      { p: "If Mellox is involved in a merger, acquisition, financing or sale of assets, information may be transferred as part of that transaction. We will notify you before your information becomes subject to a different privacy policy." },
    ],
  },
  {
    id: "data-security",
    title: "Data security",
    blocks: [
      { p: "We protect your information with technical and organizational measures, including:" },
      {
        ul: [
          "encryption of data in transit (HTTPS/TLS) and encryption at rest by our infrastructure providers;",
          "AES-256-GCM encryption of stored third-party access and refresh tokens;",
          "strict workspace isolation, enforced in our servers and through database row-level security;",
          "role-based permissions for every action that changes data or spends credits;",
          "server-side handling of all credentials, so they never reach your browser;",
          "signature verification on incoming webhooks and protection against unsafe web requests;",
          "rate limits, spend limits and audit logs.",
        ],
      },
      { p: "No system is perfectly secure. If we become aware of a security breach that affects your personal information, we will notify you and the relevant authorities as required by law." },
    ],
  },
  {
    id: "cookies-and-similar-technologies",
    title: "Cookies and similar technologies",
    blocks: [
      { p: "Mellox uses cookies and browser storage in two ways. Essential cookies are always on, because the Service cannot work without them:" },
      {
        ul: [
          "Authentication cookies and tokens to keep you signed in.",
          "Security cookies that protect sign-in and account-connection flows (short-lived and HttpOnly).",
          "Local storage for preferences such as light or dark mode, which items you have already seen, and your cookie choice.",
        ],
      },
      { p: "On our public website (mellox.ai) we also use optional analytics and marketing tools, such as Google Analytics, Microsoft Clarity, Meta Pixel and the LinkedIn Insight Tag. They load only after you accept them in our cookie banner. If you reject them, or have not answered yet, none of them run and none of their cookies are set. They are used to measure our own website and advertising, not to build profiles inside the Mellox app." },
      { p: "You can change your choice at any time with the Cookie Settings link in our footer, and you can also control cookies through your browser settings. Our Cookie Policy (https://mellox.ai/cookies) lists the cookies each tool sets and how long they last. If we add a new type of cookie, we will update this policy and ask for your choice again." },
    ],
  },
  {
    id: "data-retention",
    title: "Data retention",
    blocks: [
      { p: "We keep personal information only as long as needed for the purposes in this policy:" },
      {
        ul: [
          "**Account information:** While your account is active",
          "**Workspace content and Brand DNA:** Until you delete it, delete the workspace, or close your account",
          "**Connected-platform tokens:** Until you disconnect the account or close your Mellox account. Tokens are deleted when you disconnect.",
          "**Data synced from Google Analytics, Search Console and social platforms:** While the connection is active. Deleted within 30 days after you disconnect or delete the workspace.",
          "**Temporary memory items:** Until the expiry date you set",
          "**Usage, security and audit logs:** Up to 12 months, unless needed longer to investigate abuse or meet legal requirements",
          "**Billing and transaction records:** As long as tax and accounting laws require",
          "**Backups:** Overwritten on a rolling basis, within 90 days",
        ],
      },
      { p: "When you delete your account, we delete or anonymize your personal information within 30 days, except where we must keep it to comply with the law, resolve disputes or enforce our agreements. Some records, such as the append-only credit ledger and audit history, are anonymized rather than deleted so that financial records stay accurate." },
    ],
  },
  {
    id: "your-rights-and-choices",
    title: "Your rights and choices",
    blocks: [
      { p: "Depending on where you live, you may have the right to:" },
      {
        ul: [
          "**Access** the personal information we hold about you;",
          "**Correct** inaccurate information;",
          "**Delete** your information;",
          "**Export** your information in a portable format;",
          "**Object to** or **restrict** certain processing;",
          "**Withdraw consent** where we rely on consent;",
          "**Opt out** of any sale or sharing of personal information for targeted advertising (we do neither);",
          "**Not be discriminated against** for exercising these rights.",
        ],
      },
      { p: "**How to exercise your rights:**" },
      {
        ul: [
          "Many controls are in the app: you can edit your profile, edit or delete content and Brand DNA, remove memory items, disconnect any connected account, remove team members and delete a workspace (owner only).",
          "For anything else, email **privacy@mellox.ai** from the email address on your account. We will respond within 30 days. We may need to verify your identity before acting on a request.",
          "If you are a team member or client of a business that uses Mellox, please contact that business first, because it controls its workspace data. We will help them respond.",
        ],
      },
      { p: "**Deleting data from social platforms (including Meta).** To delete data Mellox received from Facebook, Instagram, Threads or any other social platform: disconnect the account in Mellox under Connections, then email privacy@mellox.ai with the subject \"Data deletion request\" and the account you want removed. We will confirm deletion within 30 days. You can also remove Mellox from your Facebook or Instagram settings under \"Apps and Websites\"." },
    ],
  },
  {
    id: "legal-bases-for-processing-eea-uk-and-sw",
    title: "Legal bases for processing (EEA, UK and Switzerland)",
    blocks: [
      { p: "If you are in the European Economic Area, the United Kingdom or Switzerland, we process personal information on these legal bases:" },
      {
        ul: [
          "**Contract:** to provide the Service you signed up for.",
          "**Legitimate interests:** to secure, maintain and improve the Service, prevent abuse and communicate with you about it, where these interests are not overridden by your rights.",
          "**Consent:** to connect third-party accounts and send marketing emails. You can withdraw consent at any time.",
          "**Legal obligation:** to keep billing records and respond to lawful requests.",
        ],
      },
      { p: "You have the right to lodge a complaint with your local data protection authority." },
    ],
  },
  {
    id: "california-and-other-us-state-privacy-ri",
    title: "California and other US state privacy rights",
    blocks: [
      { p: "If you are a resident of California or another US state with a consumer privacy law:" },
      {
        ul: [
          "In the past 12 months we have collected the categories of information described in Section 3: identifiers, commercial information (plan and purchase history), internet activity (usage data), and professional information (workspace and brand data).",
          "We use and disclose this information only for the business purposes in Sections 4 and 7.",
          "We do not sell personal information and do not share it for cross-context behavioral advertising.",
          "We do not use or disclose sensitive personal information for purposes other than those allowed by law.",
        ],
      },
      { p: "You can exercise your rights by emailing privacy@mellox.ai. You may use an authorized agent, and we will need to verify the request." },
    ],
  },
  {
    id: "international-data-transfers",
    title: "International data transfers",
    blocks: [
      { p: "Mellox is operated from Pakistan and uses service providers in the United States, the European Union and other countries. Your information may be processed in countries other than your own. When we transfer personal information from the EEA, UK or Switzerland, we use appropriate safeguards such as the European Commission's Standard Contractual Clauses or equivalent mechanisms offered by our providers." },
    ],
  },
  {
    id: "children-s-privacy",
    title: "Children's privacy",
    blocks: [
      { p: "Mellox is a business tool and is not directed at children. You must be at least 18 years old, or the age of majority where you live, to create an account. We do not knowingly collect personal information from children. If you believe a child has given us personal information, contact privacy@mellox.ai and we will delete it." },
    ],
  },
  {
    id: "third-party-links-and-services",
    title: "Third-party links and services",
    blocks: [
      { p: "The Service links to and connects with third-party services such as Google, Meta, LinkedIn, X, TikTok, YouTube, GitHub, Canva and Notion. Their own privacy policies govern how they handle your information. We encourage you to read them." },
    ],
  },
  {
    id: "changes-to-this-policy",
    title: "Changes to this policy",
    blocks: [
      { p: "We may update this Privacy Policy from time to time. When we make material changes, we will update the \"Last updated\" date and notify you by email or in the app before the changes take effect. If a change affects how we use data from a connected platform, we will ask for your consent again where required." },
    ],
  },
  {
    id: "contact-us",
    title: "Contact us",
    blocks: [
      {
        ul: [
          "**Privacy questions and requests:** privacy@mellox.ai",
          "**General support:** support@mellox.ai",
          "**Postal address:** " + LEGAL_ENTITY + ", " + LEGAL_ADDRESS,
        ],
      },
      { p: "If you are in the EEA or UK and want to contact a representative, write to privacy@mellox.ai and we will provide the details." },
    ],
  },
];
