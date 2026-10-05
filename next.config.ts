import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import { buildSecurityHeaders } from "./src/lib/security-headers";

const nextConfig: NextConfig = {
  // Do not advertise the framework in an "X-Powered-By: Next.js" response header.
  poweredByHeader: false,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  async headers() {
    return [{ source: "/:path*", headers: buildSecurityHeaders() }];
  },
};

// Blog posts are MDX files in src/content/blog (markdown + free-form JSX blocks).
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"], // tables, task lists, strikethrough, autolinks
  },
});

export default withMDX(nextConfig);
