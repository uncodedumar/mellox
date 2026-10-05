import { PLANS } from "./pricing";

/** Public origin of the site, used for absolute urls in structured data. Set NEXT_PUBLIC_SITE_URL in production. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://mellox.ai").replace(/\/$/, "");

export const SITE_NAME = "Mellox AI";

export const SOCIAL_PROFILES = [
  "https://www.instagram.com/mellox.ai/",
  "https://www.linkedin.com/company/mellox/",
  "https://www.facebook.com/melloxai",
  "https://www.youtube.com/channel/UCUc41UqAxB9j4JZRqpqrETQ",
  "https://www.tiktok.com/@mellox.ai",
  "https://x.com/mellox_ai",
];

export const organizationJsonLd = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon-512.png`,
  sameAs: SOCIAL_PROFILES,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@mellox.ai",
      url: `${SITE_URL}/contact`,
    },
  ],
};

export const webSiteJsonLd = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  publisher: { "@id": `${SITE_URL}/#organization` },
};

/** SoftwareApplication with one Offer per priced plan (Scale is quoted, so it is left out). Prices come from /pricing data. */
export const softwareApplicationJsonLd = {
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#software`,
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "Mellox is an AI marketing platform that learns your brand from your website, plans and creates on-brand content, publishes it natively, and works to get your brand cited by AI assistants.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  publisher: { "@id": `${SITE_URL}/#organization` },
  offers: [
    { "@type": "Offer", name: "Free", price: "0", priceCurrency: "USD", url: "https://app.mellox.ai" },
    ...PLANS.filter((p) => p.monthly !== null).map((p) => ({
      "@type": "Offer",
      name: p.name,
      price: String(p.monthly),
      priceCurrency: "USD",
      url: `${SITE_URL}/pricing`,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: String(p.monthly),
        priceCurrency: "USD",
        billingDuration: "P1M",
      },
    })),
  ],
};

/** Sitewide graph rendered once in the root layout. */
export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [organizationJsonLd, webSiteJsonLd, softwareApplicationJsonLd],
};

/** FAQPage for questions that are visible on the page. */
export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Serialises JSON-LD safely for a <script> tag (escapes "<" so content cannot close the tag). */
export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
