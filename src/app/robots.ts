import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// AI crawlers and assistants that fetch pages to train, search or answer questions. We want them to read the site, so
// they are allowed explicitly (this also documents the intent; "*" already allows them).
export const AI_USER_AGENTS = [
  "GPTBot", // OpenAI: training crawler
  "OAI-SearchBot", // OpenAI: ChatGPT search
  "ChatGPT-User", // OpenAI: fetches pages when a user asks ChatGPT
  "ClaudeBot", // Anthropic
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  "PerplexityBot", // Perplexity
  "Perplexity-User",
  "Google-Extended", // Google: Gemini and AI Overviews
  "GoogleOther", // Google research and AI product crawls
  "Applebot", // Apple search and Siri
  "Applebot-Extended", // Apple Intelligence
  "Bingbot", // Microsoft Bing and Copilot
  "Amazonbot", // Amazon (Alexa)
  "Meta-ExternalAgent", // Meta AI
  "Meta-ExternalFetcher",
  "DuckAssistBot", // DuckDuckGo AI answers
  "YouBot", // You.com
  "MistralAI-User",
  "cohere-ai",
  "Bytespider", // ByteDance (Doubao)
  "CCBot", // Common Crawl, used by many AI models
];

// Private or low-value paths no crawler needs: the API, and the thank-you/preview style routes if they are ever added.
const PRIVATE_PATHS = ["/api/"];

/**
 * Production allows everything public and points crawlers at the sitemap. Vercel preview deployments (and anything that
 * is not the real production site) are closed to crawlers so they can never be indexed as duplicates of mellox.ai.
 */
export function buildRobots(isProduction: boolean): MetadataRoute.Robots {
  if (!isProduction) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE_PATHS },
      { userAgent: AI_USER_AGENTS, allow: "/", disallow: PRIVATE_PATHS },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : true;
  return buildRobots(isProduction);
}
