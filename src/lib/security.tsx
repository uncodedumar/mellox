import { CheckCheck, CreditCard, Download, KeyRound, Link2, Lock, ServerCog, ShieldCheck, Users, type LucideIcon } from "lucide-react";

// Content for /security. IMPORTANT: every statement here must already be true of the product and consistent with the
// Privacy Policy (/privacy) and the FAQ (/faq). It restates existing public commitments; it adds no certifications,
// encryption specifics or compliance claims. Do not add one until it can be backed up (a report, a policy, a contract).
//
// Where each claim comes from:
//   "private to your workspace", "roles", "you decide which accounts connect"  -> FAQ "Is my data secure?"
//   "drafts wait for your approval", "shared through roles"                    -> FAQ "Do I stay in control of what gets published?"
//   "export your Brand DNA and content", "no lock-in"                          -> FAQ "Can I cancel at any time?"
//   encryption in transit, access controls, server-side secrets, card handling,
//   AI providers, no sale of data                                              -> Privacy Policy (security, AI processing, sharing)
//   SSO, API access, SLA                                                       -> Pricing (Scale plan)

export type TrustItem = { icon: LucideIcon; title: string; text: string };

export const CONTROL: TrustItem[] = [
  {
    icon: Lock,
    title: "Private to your workspace",
    text: "Your brand data and content are private to your workspace and are not shared with other customers.",
  },
  {
    icon: Users,
    title: "Access through roles",
    text: "Access is controlled through roles, and approvals can be shared with teammates and clients using those roles.",
  },
  {
    icon: Link2,
    title: "You choose what connects",
    text: "You decide which accounts Mellox connects to, and Mellox only publishes to the accounts you linked.",
  },
  {
    icon: CheckCheck,
    title: "Approval before anything goes out",
    text: "Every draft waits in a Needs Approval queue. Nothing schedules or publishes until you review and confirm it, and you can edit, reschedule or reject anything.",
  },
  {
    icon: Download,
    title: "Your data stays yours",
    text: "Export your Brand DNA and content whenever you like. There is no lock-in, and you can cancel at any time.",
  },
];

export const PROTECT: TrustItem[] = [
  {
    icon: ShieldCheck,
    title: "Technical and organisational measures",
    text: "We protect information with encryption in transit and access controls, as described in our Privacy Policy.",
  },
  {
    icon: KeyRound,
    title: "Secrets stay on the server",
    text: "API keys and other secrets are kept on the server only, never in your browser.",
  },
  {
    icon: CreditCard,
    title: "Card details are not stored by us",
    text: "Payments are handled by our payment provider, and card details are not stored on our servers.",
  },
  {
    icon: ServerCog,
    title: "AI providers and your content",
    text: "To generate drafts and analyses we send the relevant parts of your workspace to AI providers that agree to protect the data. We do not sell your content or personal information, and we do not use your content to build a product that competes with you.",
  },
];

export const ENTERPRISE = [
  "SSO, API access and an SLA on the Scale plan",
  "A dedicated success manager on Scale",
  "Priority support and an onboarding call on Agency",
];

export const DOCS = [
  { label: "Privacy Policy", text: "What we collect, how we use it, who we share it with, retention and your rights.", href: "/privacy" },
  { label: "Terms of Service", text: "Accounts, plans and credits, your content, AI output and acceptable use.", href: "/terms" },
  { label: "Docs and FAQ", text: "Guides for approvals, publishing, roles and agency workspaces.", href: "/docs" },
];

export const FAQS = [
  {
    q: "Is my data secure?",
    a: "Your brand data and content are private to your workspace and are not shared with other customers. Access is controlled through roles, and you decide which accounts Mellox connects to. Our Privacy Policy describes the technical and organisational measures we use, including encryption in transit and access controls. No system is perfectly secure, so please use a strong, unique password and tell us straight away if you suspect a problem.",
  },
  {
    q: "Who can see my content?",
    a: "The people you invite to your workspace, according to the roles you give them. If you share a client portal or share link, those people can see what you share. Mellox does not share your content with other customers.",
  },
  {
    q: "Can Mellox post to my accounts without asking?",
    a: "No. Mellox only connects to the accounts you choose, and every draft lands in a Needs Approval queue. Nothing schedules or publishes until you review and confirm it.",
  },
  {
    q: "What happens to my data if I leave?",
    a: "You can export your Brand DNA and content at any time, and you can cancel whenever you like. When you close your account we delete or anonymise your workspace data after a reasonable period, unless we must keep some of it for legal, tax, security or dispute reasons. Backups and logs can persist for a short time before they are overwritten.",
  },
  {
    q: "Do you store my card details?",
    a: "No. Card details are handled by our payment provider and are not stored on our servers.",
  },
  {
    q: "My security team has questions. Who do I ask?",
    a: "Email support@mellox.ai and tell us what you need to know, for example hosting, subprocessors or a security questionnaire. We will reply and, where we can, point you to the right document. Scale customers also get SSO, API access and an SLA.",
  },
];
