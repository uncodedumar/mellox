"use client";

import Script from "next/script";
import { useEffect, useSyncExternalStore } from "react";
import { GA_ID, PLAUSIBLE_DOMAIN, analyticsEnabled, trackEvent } from "@/lib/analytics";
import { getServerSnapshot, getSnapshot, subscribe } from "@/lib/consent";

/**
 * Loads analytics scripts only when (a) an id/domain is configured in the environment and (b) the visitor has
 * accepted analytics cookies. Also reports the key sales-funnel clicks: sign-up links and "Book a demo" links.
 */
export default function Analytics() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const allowed = analyticsEnabled && !!consent?.analytics;

  useEffect(() => {
    if (!allowed) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      const href = a?.getAttribute("href") ?? "";
      if (!a || !href) return;
      const where = a.closest("header, nav, footer, section, main")?.tagName.toLowerCase() ?? "page";
      if (href.startsWith("https://app.mellox.ai")) {
        trackEvent("signup_click", { location: where, page: window.location.pathname });
      } else if (href.startsWith("/demo")) {
        trackEvent("demo_click", { location: where, page: window.location.pathname });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [allowed]);

  if (!allowed) return null;

  return (
    <>
      {GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {PLAUSIBLE_DOMAIN && (
        <Script
          defer
          data-domain={PLAUSIBLE_DOMAIN}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      )}
    </>
  );
}
