export type Field =
  | { name: string; label: string; type: "text" | "email" | "url"; placeholder?: string; required?: boolean; half?: boolean }
  | { name: string; label: string; type: "select"; options: string[] }
  | { name: string; label: string; type: "textarea"; placeholder?: string; required?: boolean };

export type FormKey = "support" | "press" | "partner" | "demo";
export type FormConfig = {
  key: FormKey;
  title: string;
  subjectTag: string;
  submit: string;
  fields: Field[];
  /** shown after a successful submit; falls back to a generic "message sent" */
  success?: { title: string; text: string; again: string };
};

const person: Field[] = [
  { name: "name", label: "Name", type: "text", placeholder: "Your name", required: true, half: true },
  { name: "email", label: "Email", type: "email", placeholder: "you@company.com", required: true, half: true },
];

export const SUPPORT_FORM: FormConfig = {
  key: "support",
  title: "Send us a message",
  subjectTag: "Support",
  submit: "Send message",
  fields: [
    ...person,
    { name: "topic", label: "Topic", type: "select", options: ["General question", "Billing or account", "Scale plan and volume pricing", "Agency onboarding", "Report a problem"] },
    { name: "message", label: "Message", type: "textarea", placeholder: "How can we help?", required: true },
  ],
};

export const PRESS_FORM: FormConfig = {
  key: "press",
  title: "Press and media request",
  subjectTag: "Press",
  submit: "Send request",
  fields: [
    ...person,
    { name: "outlet", label: "Publication or outlet", type: "text", placeholder: "Where will this appear?", required: true, half: true },
    { name: "role", label: "Your role", type: "text", placeholder: "Journalist, editor, host", half: true },
    { name: "type", label: "Request type", type: "select", options: ["Interview", "Article or feature", "Podcast or video", "Product demo", "Data or quote", "Other"] },
    { name: "deadline", label: "Deadline", type: "text", placeholder: "e.g. Friday 12 June", half: true },
    { name: "link", label: "Link to your outlet", type: "url", placeholder: "https://", half: true },
    { name: "message", label: "What do you need?", type: "textarea", placeholder: "Tell us about the story and the questions you have.", required: true },
  ],
};

export const PARTNER_FORM: FormConfig = {
  key: "partner",
  title: "Partnership enquiry",
  subjectTag: "Partnership",
  submit: "Start the conversation",
  fields: [
    ...person,
    { name: "company", label: "Company", type: "text", placeholder: "Company name", required: true, half: true },
    { name: "website", label: "Website", type: "url", placeholder: "https://", required: true, half: true },
    { name: "kind", label: "Partnership type", type: "select", options: ["Integration or API", "Agency or reseller", "Technology partner", "Co-marketing", "Affiliate or referral", "Other"] },
    { name: "size", label: "Team size", type: "select", options: ["1 to 10", "11 to 50", "51 to 200", "200+"] },
    { name: "message", label: "How could we work together?", type: "textarea", placeholder: "Tell us about your product, audience and what you have in mind.", required: true },
  ],
};

export const DEMO_INTERESTS = ["Agency (multiple client brands)", "Startup or growing team", "In-house marketing team", "Scale plan and volume pricing", "Not sure yet"];

export const DEMO_FORM: FormConfig = {
  key: "demo",
  title: "Book your demo",
  subjectTag: "Demo request",
  submit: "Request a demo",
  success: {
    title: "Demo request received",
    text: "Thanks, we have it. Someone from the Mellox team will reply to the email address you gave us to arrange a time.",
    again: "Send another request",
  },
  fields: [
    ...person,
    { name: "company", label: "Company", type: "text", placeholder: "Company name", required: true, half: true },
    { name: "website", label: "Website", type: "url", placeholder: "https://", required: true, half: true },
    { name: "role", label: "Your role", type: "text", placeholder: "e.g. Founder, Head of Marketing", half: true },
    { name: "size", label: "Team size", type: "select", options: ["1 to 10", "11 to 50", "51 to 200", "200+"] },
    { name: "interest", label: "What best describes you?", type: "select", options: DEMO_INTERESTS },
    { name: "brands", label: "Brands or clients you manage", type: "text", placeholder: "e.g. 1, 5, 20+", half: true },
    { name: "timing", label: "Preferred days and times", type: "text", placeholder: "e.g. weekday mornings, UK time", half: true },
    { name: "message", label: "Anything we should know?", type: "textarea", placeholder: "What are you hoping to solve? Optional." },
  ],
};

export const CONTACT_FAQS = [
  {
    q: "How do I contact the Mellox team?",
    a: "Use the message form on this page or email support@mellox.ai. For press requests use the Press and Media form, and for integrations or collaborations use the Partner and Collaboration form.",
  },
  {
    q: "How fast will I get a reply?",
    a: "It depends on your plan. Starter gets email support, Growth gets 24 hour email replies, Agency gets priority support with an onboarding call, and Scale gets a dedicated success manager.",
  },
  {
    q: "Where do I go for billing or account issues?",
    a: "Choose Billing or account in the topic menu of the message form, or email support@mellox.ai from the address on your account so we can find it quickly.",
  },
  {
    q: "I want volume pricing for a large team. Who do I talk to?",
    a: "Scale is built for networks and large teams with 30 or more brands, and pricing is quoted around your roster. Select Scale plan and volume pricing in the form and tell us about your team.",
  },
  {
    q: "Can I get help setting up Brand DNA or my first audit?",
    a: "Start with the guides on the Docs and FAQ page. If you are still stuck, send us a message and mention what you were trying to do. Agency plans include an onboarding call.",
  },
  {
    q: "How do I send a press or partnership request?",
    a: "Pick the Press and Media Inquiries or Partner and Collaboration card at the top of this page. Each has its own form, so the right person sees it with the details they need.",
  },
];

export const FORMS: Record<FormKey, FormConfig> = { support: SUPPORT_FORM, press: PRESS_FORM, partner: PARTNER_FORM, demo: DEMO_FORM };
