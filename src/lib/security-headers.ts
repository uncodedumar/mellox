// HTTP security headers for every response. Wired into next.config.ts.
//
// CSP notes:
// - Next.js inlines small bootstrap scripts, so script-src needs 'unsafe-inline'. A stricter nonce-based CSP would
//   require rendering every page dynamically (no static pages), which is not worth it for a marketing site.
// - 'unsafe-eval' is only added in development (React's dev tooling needs it).
// - Third parties allowed: Google Analytics / Tag Manager and Plausible (loaded only after cookie consent),
//   marketing tools, Unsplash images (blog covers), and https iframes for blog embeds (YouTube, Loom, Figma...).
//   If you add another service (chat widget, video host, fonts CDN), add its origin here.

const isDev = process.env.NODE_ENV !== "production";

// Third parties, grouped by what they are for. Each is only loaded after the visitor accepts the matching cookie
// category, and only when its id is set (see components/Analytics.tsx). Vercel Web Analytics and Speed Insights are
// served from this site's own /_vercel/ path in production, so they need nothing here (the dev script is the exception).
const SCRIPT_HOSTS = [
  "https://www.googletagmanager.com", // Google Analytics 4
  "https://plausible.io", // Plausible
  "https://www.clarity.ms", // Microsoft Clarity
  "https://scripts.clarity.ms",
  "https://connect.facebook.net", // Meta Pixel
  "https://snap.licdn.com", // LinkedIn Insight Tag
];
const CONNECT_HOSTS = [
  "https://www.google-analytics.com",
  "https://*.google-analytics.com",
  "https://*.analytics.google.com",
  "https://www.googletagmanager.com",
  "https://plausible.io",
  "https://*.clarity.ms",
  "https://www.facebook.com",
  "https://px.ads.linkedin.com",
];
const IMG_HOSTS = [
  "https://www.google-analytics.com",
  "https://www.googletagmanager.com",
  "https://*.clarity.ms",
  "https://c.bing.com",
  "https://www.facebook.com",
  "https://px.ads.linkedin.com",
];
const VERCEL_DEV = ["https://va.vercel-scripts.com"]; // Vercel analytics helper script, development only

export function buildCsp(dev = isDev): string {
  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    "script-src": ["'self'", "'unsafe-inline'", ...(dev ? ["'unsafe-eval'", ...VERCEL_DEV] : []), ...SCRIPT_HOSTS],
    "style-src": ["'self'", "'unsafe-inline'"],
    "img-src": ["'self'", "data:", "blob:", "https://images.unsplash.com", ...IMG_HOSTS],
    "font-src": ["'self'", "data:"],
    "connect-src": ["'self'", ...CONNECT_HOSTS, ...(dev ? ["ws:", "wss:", ...VERCEL_DEV] : [])],
    "media-src": ["'self'"],
    "frame-src": ["'self'", "https:"], // blog embeds (YouTube, Loom, Figma...)
    "frame-ancestors": ["'none'"], // nobody may embed Mellox pages in an iframe (clickjacking)
    "form-action": ["'self'"],
    "base-uri": ["'self'"],
    "object-src": ["'none'"],
    "manifest-src": ["'self'"],
    "worker-src": ["'self'", "blob:"],
  };
  const csp = Object.entries(directives)
    .map(([name, values]) => `${name} ${values.join(" ")}`)
    .join("; ");
  return dev ? csp : `${csp}; upgrade-insecure-requests`;
}

export function buildSecurityHeaders(dev = isDev): { key: string; value: string }[] {
  return [
    { key: "Content-Security-Policy", value: buildCsp(dev) },
    // Tell browsers to use https for two years, including subdomains. (No "preload" on purpose: it is hard to undo.)
    { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), accelerometer=(), gyroscope=(), magnetometer=(), interest-cohort=()",
    },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
    { key: "X-DNS-Prefetch-Control", value: "on" },
  ];
}
