import CookieSettingsButton from "./legal/CookieSettingsButton";
import "./footer.css";

const APP_URL = "https://app.mellox.ai";

const columns: { title: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    title: "Navigation",
    links: [
      { label: "Home", href: "/" },
      { label: "Pricing", href: "/pricing" },
      { label: "Compare", href: "/compare" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Use cases",
    links: [
      { label: "Agencies", href: "/use-cases/agencies" },
      { label: "Startups", href: "/use-cases/startups" },
      { label: "In-house teams", href: "/use-cases/in-house-teams" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Docs and FAQ", href: "/docs" },
      { label: "Blog", href: "/blog" },
      { label: "Changelog", href: "/changelog" },
      { label: "Security and trust", href: "/security" },
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
  {
    title: "Product",
    links: [
      { label: "Brand DNA", href: "/features/brand-dna" },
      { label: "AI Visibility (GEO)", href: "/features/ai-visibility" },
      { label: "The Four Brains", href: "/features/four-brains" },
      { label: "Distribution", href: "/features/distribution" },
      { label: "Agency Mode", href: "/features/agency-mode" },
      { label: "Integrations", href: "/integrations" },
      { label: "Book a demo", href: "/demo" },
      { label: "Mellox App", href: APP_URL },
      { label: "Sign up for free", href: APP_URL },
    ],
  },
  {
    title: "Social Connect",
    links: [
      { label: "Instagram", href: "https://www.instagram.com/mellox.ai/", external: true },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/mellox/", external: true },
      { label: "Facebook", href: "https://www.facebook.com/melloxai", external: true },
      { label: "YouTube", href: "https://www.youtube.com/channel/UCUc41UqAxB9j4JZRqpqrETQ", external: true },
      { label: "TikTok", href: "https://www.tiktok.com/@mellox.ai", external: true },
      { label: "X / Twitter", href: "https://x.com/mellox_ai", external: true },
    ],
  },
];

/** "Get started" call-to-action followed by the Mellox footer. */
export default function Footer() {
  return (
    <footer id="get-started" className="mx-footer">
      <div className="mx-visual">
        <div className="mx-aurora" aria-hidden />

        <div className="mx-cta">
          <h2 className="mx-cta-title">
            Step Into Mellox, The
            <br />
            Future of AI Marketing
          </h2>
          <p className="mx-cta-sub">
            Everything your marketing needs, in one simple workspace. Stay focused, stay in sync.
          </p>
          <a href={APP_URL} className="hero-cta mx-cta-btn">
            Get Started
          </a>
        </div>

        <div className="mx-stage">
          <div className="mx-word" aria-hidden>
            <span className="mx-w mx-w-side">MELLOX</span>
            <span className="mx-w mx-w-main">MELLOX</span>
            <span className="mx-w mx-w-side mx-w-right">MELLOX</span>
          </div>
          <div className="mx-arc" aria-hidden />
        </div>

        <div className="mx-grain" aria-hidden />
      </div>

      <nav aria-label="Footer" className="mx-links">
        {columns.map((col) => (
          <div key={col.title}>
            <h3>{col.title}</h3>
            <ul>
              {col.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="mx-bottom">
        <div className="mx-bottom-row">
          <p className="mx-copy">&copy; {new Date().getFullYear()} mellox.ai. All rights reserved.</p>
          <CookieSettingsButton className="mx-cookie-btn">Cookie Settings</CookieSettingsButton>
          <p className="mx-credit">
            Website designed and engineered by{" "}
            <a href="https://www.antrosys.com" target="_blank" rel="noopener noreferrer">
              Antrosys<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
