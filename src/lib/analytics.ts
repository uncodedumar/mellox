import { track as vercelTrack } from "@vercel/analytics";

// Central analytics configuration and event helper.
// Nothing here loads a script: <Analytics /> (components/Analytics.tsx) does that, and only after the visitor has
// accepted the matching cookie category (see src/lib/consent.ts). Without consent, trackEvent is a safe no-op.
//
// Every provider is off until its id is set (env var in .env.local locally, and in the host's settings in production):
//   analytics category: Google Analytics 4, Plausible, Microsoft Clarity, Vercel Web Analytics, Vercel Speed Insights
//   marketing category: Meta Pixel, LinkedIn Insight Tag

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    plausible?: (event: string, options?: { props?: Record<string, string | number | boolean> }) => void;
    clarity?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    _linkedin_data_partner_ids?: string[];
  }
}

const env = (v: string | undefined) => (v ?? "").trim();

/** Google Analytics 4 measurement id, e.g. G-XXXXXXXXXX. */
export const GA_ID = env(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
/** Plausible site domain, e.g. mellox.ai. */
export const PLAUSIBLE_DOMAIN = env(process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN);
/** Microsoft Clarity project id (heatmaps and session replays). */
export const CLARITY_ID = env(process.env.NEXT_PUBLIC_CLARITY_ID);
/** Meta (Facebook / Instagram) Pixel id, for ad measurement. */
export const META_PIXEL_ID = env(process.env.NEXT_PUBLIC_META_PIXEL_ID);
/** LinkedIn Insight Tag partner id, for ad measurement. */
export const LINKEDIN_PARTNER_ID = env(process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID);

/**
 * Vercel Web Analytics and Speed Insights. They switch on by themselves when the site runs on Vercel
 * (Vercel exposes NEXT_PUBLIC_VERCEL_ENV), or when NEXT_PUBLIC_VERCEL_ANALYTICS=1. Also turn them on in the Vercel
 * dashboard (Project > Analytics, and Project > Speed Insights), or they collect nothing.
 */
export const VERCEL_ENABLED = Boolean(env(process.env.NEXT_PUBLIC_VERCEL_ENV)) || env(process.env.NEXT_PUBLIC_VERCEL_ANALYTICS) === "1";

/** True when at least one provider that needs the "analytics" cookie category is configured. */
export const analyticsEnabled = Boolean(GA_ID || PLAUSIBLE_DOMAIN || CLARITY_ID || VERCEL_ENABLED);
/** True when at least one provider that needs the "marketing" cookie category is configured. */
export const marketingEnabled = Boolean(META_PIXEL_ID || LINKEDIN_PARTNER_ID);

/** Which providers are configured (used by the README, tests and a quick sanity check in the console). */
export function configuredProviders() {
  return {
    googleAnalytics: Boolean(GA_ID),
    plausible: Boolean(PLAUSIBLE_DOMAIN),
    clarity: Boolean(CLARITY_ID),
    vercel: VERCEL_ENABLED,
    metaPixel: Boolean(META_PIXEL_ID),
    linkedIn: Boolean(LINKEDIN_PARTNER_ID),
  };
}

type EventParams = Record<string, string | number | boolean>;

// Our event names mapped onto each ad platform's standard conversion names.
const META_EVENT: Record<string, string> = { generate_lead: "Lead", signup_click: "InitiateCheckout", demo_click: "Contact" };

/** Sends a custom event to whichever providers are loaded. Safe to call anywhere on the client. */
export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", name, params);
    window.plausible?.(name, { props: params });
    window.clarity?.("event", name);
    if (VERCEL_ENABLED) vercelTrack(name, params);
    const metaName = META_EVENT[name];
    if (metaName) window.fbq?.("track", metaName);
  } catch {
    // analytics must never break the page
  }
}
