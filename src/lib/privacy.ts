// Privacy Policy content for /privacy. Describes how Mellox handles data, based on how the product works.
// This is a plain-language draft and should be reviewed by a lawyer before launch.
import type { TermsSection } from "./terms";

export const PRIVACY_UPDATED = "5 October 2026";

export const PRIVACY: TermsSection[] = [
  {
    id: "overview",
    title: "Who we are and what this covers",
    paras: [
      "This Privacy Policy explains how Mellox AI (Mellox, we, us) collects, uses and shares personal information when you visit mellox.ai, use the Mellox platform at app.mellox.ai, or contact us. It should be read with our Terms of Service.",
      "For the personal information of people who use our website and platform, we are the controller. For personal information that appears inside content you bring into your workspace, such as a client's name in a draft, you decide why and how it is used and we act on your instructions as a processor.",
    ],
  },
  {
    id: "collect",
    title: "Information we collect",
    paras: ["We collect the following kinds of information."],
    list: [
      "Account details: your name, work email, password or sign in credentials, workspace and team member details.",
      "Brand and workspace content: website addresses you give us, the content we read from those sites to build your Brand DNA, drafts, images, approvals, tracked prompts, competitor lists and other material you create or upload.",
      "Connected accounts: when you connect a social, CMS or analytics account, we receive the access tokens and the profile and performance information needed to publish and report for you.",
      "Billing information: plan, credit balance and purchase history. Card details are handled by our payment provider and are not stored on our servers.",
      "Messages you send us: what you write in our contact, press and partnership forms, and your emails to support.",
      "Usage and device information: pages viewed, features used, jobs run, approximate location from your IP address, browser and device type, and error logs.",
    ],
  },
  {
    id: "use",
    title: "How we use information",
    list: [
      "To provide the service: learn your brand, generate and publish content, run audits and show results.",
      "To process payments, manage credits and send receipts and billing notices.",
      "To support you, answer messages and send service updates such as security and policy notices.",
      "To keep Mellox safe: prevent abuse, spam and fraud, enforce our Terms and fix bugs.",
      "To improve the product by understanding which features are used and how they perform.",
      "To send product news or offers where the law allows. You can opt out at any time.",
      "To meet legal obligations.",
    ],
  },
  {
    id: "ai",
    title: "AI processing",
    paras: [
      "Mellox uses AI models, some provided by third parties, to generate drafts and analyses and to check how AI assistants describe your brand. To do this we send the relevant parts of your workspace content and your instructions to those providers.",
      "We choose providers that agree to protect the data we send. We do not sell your content, and we do not use it to build a product that competes with you.",
    ],
  },
  {
    id: "sharing",
    title: "Who we share information with",
    paras: ["We do not sell your personal information. We share it only in these cases:"],
    list: [
      "Service providers that help us run Mellox, such as hosting, AI model providers, payment processing, email delivery, analytics and customer support tools. They may use the data only to provide their service to us.",
      "Platforms and assistants you connect, for example a social account you linked, Claude or ChatGPT through MCP, Slack, Notion or Canva, only when you choose to connect them.",
      "Your team and clients, where you invite them to a workspace, client portal or share link.",
      "Professional advisers, regulators or authorities when required by law or to protect rights and safety.",
      "A buyer or successor if Mellox is involved in a merger, acquisition or sale of assets. We will tell you if your information is affected.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and similar technologies",
    paras: [
      "We use cookies and similar technologies that are needed to keep you signed in, remember your preferences and keep the site secure. We may also use analytics tools to understand how the site and product are used.",
      "Optional cookies are off until you accept them. You can change your choice at any time with the Cookie Settings link in our footer, and you can also control cookies through your browser settings. See our Cookie Policy for the full list. Blocking some cookies can stop parts of the service from working.",
    ],
  },
  {
    id: "retention",
    title: "How long we keep information",
    paras: [
      "We keep information for as long as your account is active and as needed to provide the service. When you close your account we delete or anonymise your workspace data after a reasonable period, unless we must keep some of it for legal, tax, security or dispute reasons.",
      "Backups and logs can persist for a short time after deletion before they are overwritten. Messages you send through our forms are kept as long as needed to answer you and keep a record of the conversation.",
    ],
  },
  {
    id: "rights",
    title: "Your choices and rights",
    paras: ["Depending on where you live, you may have the right to:"],
    list: [
      "access the personal information we hold about you and get a copy;",
      "correct information that is wrong or incomplete;",
      "delete your information or close your account;",
      "object to or restrict certain uses, and withdraw consent where we rely on it;",
      "receive your information in a portable format;",
      "opt out of marketing emails using the link in any message;",
      "complain to your local data protection authority.",
    ],
    after: "To use any of these rights, email support@mellox.ai from the address on your account. We may need to confirm who you are first, and we will reply within the time the law requires.",
  },
  {
    id: "transfers",
    title: "International transfers",
    paras: [
      "Mellox and its service providers may process information in countries other than the one where you live, including countries whose data protection laws differ from yours. Where the law requires it, we use safeguards such as standard contractual clauses to protect information that is transferred.",
    ],
  },
  {
    id: "security",
    title: "Security",
    paras: [
      "We use technical and organisational measures to protect information, including encryption in transit, access controls, and keeping secrets such as API keys on the server only. No system is perfectly secure, so we cannot guarantee absolute security. Please use a strong, unique password and tell us straight away if you suspect a problem.",
    ],
  },
  {
    id: "children",
    title: "Children",
    paras: [
      "Mellox is not intended for anyone under 18, and we do not knowingly collect personal information from children. If you believe a child has given us information, contact us and we will delete it.",
    ],
  },
  {
    id: "links",
    title: "Third party links",
    paras: [
      "Our site and product may link to other websites and services. We are not responsible for their privacy practices, so please read their policies before sharing information with them.",
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    paras: [
      "We may update this Privacy Policy as our product or the law changes. When we make a material change we will tell you, for example by email or in the app, before it takes effect. The date at the top shows when it was last updated.",
    ],
  },
  {
    id: "contact",
    title: "Contact us",
    paras: ["Questions or requests about your privacy? Email support@mellox.ai or use our contact page and we will get back to you."],
  },
];
