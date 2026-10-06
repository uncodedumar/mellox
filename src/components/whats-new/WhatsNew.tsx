import { Sparkles } from "lucide-react";
import Link from "next/link";
import SectionHead from "@/components/pricing/SectionHead";
import { WHATS_NEW } from "@/lib/whats-new";
import "./whats-new.css";

/**
 * "New in Mellox" strip: Autopilot, MCP with Claude and ChatGPT, Slack and Notion, Canva editing.
 * Needs the `.px` page wrapper (pricing.css) for its tokens, so wrap it in <div className="px"> outside px pages.
 */
export default function WhatsNew({
  id = "new",
  title = "New in Mellox",
  blurb = "Autopilot, assistants over MCP, Slack and Notion, and Canva editing.",
}: {
  id?: string;
  title?: string;
  blurb?: string;
}) {
  return (
    <section id={id} className="px-section">
      <div className="px-inner">
        <SectionHead
          icon={<Sparkles size={32} strokeWidth={1.4} aria-hidden="true" />}
          label="What's new"
          title={title}
          blurb={blurb}
          wide
        />
        <div className="wn-grid">
          {WHATS_NEW.map((n, i) => {
            const Icon = n.icon;
            return (
              <article
                key={n.id}
                className={`px-card wn-card wn-${n.id}`}
                data-reveal
                style={{ "--accent": n.accent, transitionDelay: `${i * 80}ms` } as React.CSSProperties}
              >
                <div className="wn-top">
                  <div className="wn-visual">
                    {n.logos ? (
                      n.logos.map((l) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img key={l.alt} src={l.src} alt={l.alt} width={60} height={60} className={l.bare ? "wn-bare" : undefined} />
                      ))
                    ) : n.apps ? (
                      n.apps.map((a) => (
                        <span key={a.label} className="wn-app" title={a.label}>
                          <a.icon size={22} strokeWidth={1.7} aria-hidden="true" />
                          <span className="sr-only">{a.label}</span>
                        </span>
                      ))
                    ) : (
                      <Icon size={26} strokeWidth={1.6} aria-hidden="true" />
                    )}
                  </div>
                  <span className="wn-badge">New</span>
                </div>
                <h3>{n.title}</h3>
                <p>{n.text}</p>
                <Link href={n.href} className="wn-link">
                  {n.cta} <span aria-hidden="true">→</span>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
