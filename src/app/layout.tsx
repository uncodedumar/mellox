import type { Metadata, Viewport } from "next";
import { Michroma, Google_Sans_Flex, Micro_5 } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import MotionGate from "@/components/MotionGate";
import Preloader from "@/components/Preloader";
import SkipLink from "@/components/SkipLink";
import SmoothScroll from "@/components/SmoothScroll";
import CookieBanner from "@/components/legal/CookieBanner";
import JsonLd from "@/components/JsonLd";
import { SITE_DESCRIPTION, SITE_KEYWORDS, SITE_URL, siteGraph } from "@/lib/seo";
import { cn } from "@/lib/utils";


const michroma = Michroma({
  variable: "--font-michroma",
  weight: "400",
  subsets: ["latin"],
});

const micro5 = Micro_5({
  variable: "--font-micro5",
  weight: "400",
  subsets: ["latin"],
  preload: false, // only the home page's "brains" section uses it: do not preload it on every page
});

const googleSansFlex = Google_Sans_Flex({
  variable: "--font-google-sans-flex",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Mellox AI", template: "%s | Mellox AI" },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  category: "technology",
  applicationName: "Mellox AI",
  // allow full-size image previews and unrestricted snippets in search and AI answers
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: { siteName: "Mellox AI", type: "website" },
  twitter: { card: "summary_large_image" },
  // Search Console / Bing Webmaster ownership tags. Set the env vars to the "content" value Google or Bing gives you.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = { themeColor: "#0d1114" };

// Skip the intro for returning visitors (same session) and for touch-first devices, which get a static site.
const PRELOADER_SKIP_SCRIPT =
  "try{if(sessionStorage.getItem('mx-preloaded')||matchMedia('(pointer: coarse), (hover: none)').matches)document.documentElement.setAttribute('data-preloaded','1')}catch(e){}";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", michroma.variable, googleSansFlex.variable, micro5.variable, "font-sans")}
    >
      <head>
        {/* Returning visitors (same session) skip the intro. Runs before first paint, so there is no flash. */}
        <script dangerouslySetInnerHTML={{ __html: PRELOADER_SKIP_SCRIPT }} />
        <noscript>
          <style>{".mx-pre{display:none!important}"}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col">
        <Preloader />
        <SkipLink />
        <MotionGate />
        <SmoothScroll />
        <JsonLd data={siteGraph} />
        {children}
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
