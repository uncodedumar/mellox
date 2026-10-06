import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import { buildSecurityHeaders } from "./src/lib/security-headers";

const nextConfig: NextConfig = {
  // Lets a production build run into its own folder (NEXT_DIST_DIR=.next-build) without disturbing a running dev server.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // Do not advertise the framework in an "X-Powered-By: Next.js" response header.
  poweredByHeader: false,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    formats: ["image/webp"], // every optimised image is served as WebP
    minimumCacheTTL: 60 * 60 * 24 * 30, // keep optimised images for 30 days
  },
  async headers() {
    // Static images and logos rarely change: let browsers and CDNs keep them for a day, and serve stale for a week while
    // revalidating. (Rename a file when you replace it so visitors always see the new one.)
    const staticAssetCache = {
      key: "Cache-Control",
      value: "public, max-age=86400, stale-while-revalidate=604800",
    };
    return [
      { source: "/:path*", headers: buildSecurityHeaders() },
      ...["about", "Clients", "Home", "brains", "brand", "llms", "blog", "changelog"].map((dir) => ({
        source: `/${dir}/:path*`,
        headers: [staticAssetCache],
      })),
    ];
  },
};

// Blog posts are MDX files in src/content/blog (markdown + free-form JSX blocks).
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"], // tables, task lists, strikethrough, autolinks
  },
});

export default withMDX(nextConfig);
