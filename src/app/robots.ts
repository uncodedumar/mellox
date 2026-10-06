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
  "Applebot-Extended", // Apple Intelligence
  "Bingbot", // Microsoft Bing and Copilot
  "Amazonbot", // Amazon
  "Meta-ExternalAgent", // Meta AI
  "Meta-ExternalFetcher",
  "DuckAssistBot", // DuckDuckGo AI answers
  "MistralAI-User",
  "cohere-ai",
  "Bytespider", // ByteDance (Doubao)
  "CCBot", // Common Crawl, used by many AI models
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: AI_USER_AGENTS, allow: "/", disallow: ["/api/"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
