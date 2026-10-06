import { PLANS } from "./pricing";

export const PRODUCTION_URL = "https://mellox.ai";

/**
 * Public origin of the site: used for canonical urls, social cards, structured data, the sitemap and llms.txt.
 * - Set NEXT_PUBLIC_SITE_URL on the production host. If it is missing, production falls back to https://mellox.ai.
 * - A localhost value is ignored in production, so a stray local setting can never leak into the live site.
 * - In development it defaults to http://localhost:3000.
 */
export function resolveSiteUrl(env = process.env.NEXT_PUBLIC_SITE_URL, production = process.env.NODE_ENV === "production") {
  const value = env?.trim().replace(/\/$/, "");
  const isLocal = !!value && /^(https?:\/\/)?(localhost|127\.0\.0\.1|\[::1\])(:\d+)?(\/|$)/i.test(value);
  if (value && !(production && isLocal)) return value;
  return production ? PRODUCTION_URL : "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

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
