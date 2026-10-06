"use client";

import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { useEffect, useSyncExternalStore } from "react";
import {
  CLARITY_ID,
  GA_ID,
  LINKEDIN_PARTNER_ID,
  META_PIXEL_ID,
  PLAUSIBLE_DOMAIN,
  VERCEL_ENABLED,
  analyticsEnabled,
  marketingEnabled,
  trackEvent,
} from "@/lib/analytics";
import { getServerSnapshot, getSnapshot, subscribe } from "@/lib/consent";

/**
 * Loads the analytics and marketing tools, each only when (a) its id is configured in the environment and (b) the
 * visitor has accepted that cookie category:
 *   "analytics": Google Analytics 4, Plausible, Microsoft Clarity, Vercel Web Analytics, Vercel Speed Insights
 *   "marketing": Meta Pixel, LinkedIn Insight Tag
 * It also reports the key sales-funnel clicks: sign-up links and "Book a demo" links.
 */
export default function Analytics() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const analyticsOn = analyticsEnabled && !!consent?.analytics;
  const marketingOn = marketingEnabled && !!consent?.marketing;

  useEffect(() => {
    if (!analyticsOn && !marketingOn) return;
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
  }, [analyticsOn, marketingOn]);

  return (
    <>
      {analyticsOn && (
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
            <Script defer data-domain={PLAUSIBLE_DOMAIN} src="https://plausible.io/js/script.js" strategy="afterInteractive" />
          )}

          {CLARITY_ID && (
            <Script id="clarity-init" strategy="afterInteractive">
              {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`}
            </Script>
          )}

          {VERCEL_ENABLED && (
            <>
              <VercelAnalytics />
              <SpeedInsights />
            </>
          )}
        </>
      )}

      {marketingOn && (
        <>
          {META_PIXEL_ID && (
            <Script id="meta-pixel" strategy="afterInteractive">
              {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
            </Script>
          )}

          {LINKEDIN_PARTNER_ID && (
            <Script id="linkedin-insight" strategy="afterInteractive">
              {`_linkedin_partner_id="${LINKEDIN_PARTNER_ID}";window._linkedin_data_partner_ids=window._linkedin_data_partner_ids||[];window._linkedin_data_partner_ids.push(_linkedin_partner_id);(function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[]}var s=document.getElementsByTagName("script")[0];var b=document.createElement("script");b.type="text/javascript";b.async=true;b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";s.parentNode.insertBefore(b,s);})(window.lintrk);`}
            </Script>
          )}
        </>
      )}
    </>
  );
}
