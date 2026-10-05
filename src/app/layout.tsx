import type { Metadata, Viewport } from "next";
import { Michroma, Google_Sans_Flex, Micro_5 } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import SkipLink from "@/components/SkipLink";
import CookieBanner from "@/components/legal/CookieBanner";
import JsonLd from "@/components/JsonLd";
import { siteGraph } from "@/lib/seo";
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
});

const googleSansFlex = Google_Sans_Flex({
  variable: "--font-google-sans-flex",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "Mellox AI", template: "%s | Mellox AI" },
  description:
    "Mellox is the AI marketing assistant for agencies and startups: Brand DNA, AI search visibility and native publishing in one workspace.",
  applicationName: "Mellox AI",
  openGraph: { siteName: "Mellox AI", type: "website" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#0d1114" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", michroma.variable, googleSansFlex.variable, micro5.variable, "font-sans")}
    >
      <body className="min-h-full flex flex-col">
        <SkipLink />
        <JsonLd data={siteGraph} />
        {children}
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
