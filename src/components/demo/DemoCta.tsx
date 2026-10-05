import Link from "next/link";
import "./demo.css";

/** Sales-led call to action: "Book a demo" first, "Start free" second. Used on pricing, compare and similar pages. */
export default function DemoCta({
  title = "Want to see it on your own brand?",
  text = "Book a demo and we will walk through Mellox using your website, then help you pick the right plan.",
  interest,
}: {
  title?: string;
  text?: string;
  /** preselects the demo form: scale | agency | startup | in-house */
  interest?: string;
}) {
  return (
    <section className="px-section">
      <div className="px-inner">
        <div className="px-card dm-cta" data-reveal>
          <div>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <div className="dm-cta-actions">
            <Link href={interest ? `/demo?interest=${interest}` : "/demo"} className="px-cta px-cta-lime">
              Book a demo
            </Link>
            <a href="https://app.mellox.ai" className="dm-ghost">
              Start free
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
