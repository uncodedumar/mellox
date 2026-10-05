// Thin, provider-agnostic analytics helpers. Nothing here loads a script: <Analytics /> does that, and only after the
// visitor has accepted analytics cookies (see src/lib/consent.ts). Without consent, trackEvent is a safe no-op.

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    plausible?: (event: string, options?: { props?: Record<string, string | number | boolean> }) => void;
  }
}

/** Google Analytics 4 measurement id, e.g. G-XXXXXXXXXX. Leave empty to disable. */
export const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";
/** Plausible site domain, e.g. mellox.ai. Leave empty to disable. */
export const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? "";

export const analyticsEnabled = Boolean(GA_ID || PLAUSIBLE_DOMAIN);

/** Sends a custom event to whichever providers are loaded. Safe to call anywhere on the client. */
export function trackEvent(name: string, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", name, params);
    window.plausible?.(name, { props: params });
  } catch {
    // analytics must never break the page
  }
}
