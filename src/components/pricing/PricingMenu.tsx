import { Coins } from "lucide-react";
import { CREDIT_MENU, VIDEO_MENU } from "@/lib/pricing";
import SectionHead from "./SectionHead";

export default function PricingMenu() {
  return (
    <section id="credits" className="px-section">
      <div className="px-inner">
        <SectionHead
          icon={<Coins size={32} strokeWidth={1.4} aria-hidden="true" />}
          label="Transparent by design"
          title="What a credit actually buys."
          blurb="One credit is worth $0.01 at face value. The price of every job shows before you run it."
        />
        <div className="px-menu">
          <div className="px-card" data-reveal>
            <h3>Credits (everything except video)</h3>
            {CREDIT_MENU.map(([label, cost]) => (
              <div key={label} className="px-m-row">
                <span>{label}</span>
                <b>{cost}</b>
              </div>
            ))}
          </div>
          <div className="px-card" data-reveal style={{ transitionDelay: "90ms" }}>
            <h3>Video credits (VC)</h3>
            {VIDEO_MENU.map(([label, cost]) => (
              <div key={label} className="px-m-row">
                <span>{label}</span>
                <b>{cost}</b>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
