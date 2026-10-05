"use client";

import { PackageOpen } from "lucide-react";
import { useState, type CSSProperties } from "react";
import { ADDONS, CREDIT_PACKS, VIDEO_PACKS } from "@/lib/pricing";
import SectionHead from "./SectionHead";

const APP_URL = "https://app.mellox.ai";
const fmt = (n: number) => n.toLocaleString("en-US");

export default function PricingTopups() {
  const [k, setK] = useState(1);
  const d = CREDIT_PACKS[k];
  const pct = (k / (CREDIT_PACKS.length - 1)) * 100;

  return (
    <section id="topups" className="px-section">
      <div className="px-inner">
        <SectionHead
          icon={<PackageOpen size={32} strokeWidth={1.4} aria-hidden="true" />}
          label="Top ups and add-ons"
          title="Need more? Buy it once, keep it forever."
          blurb="Credit packs and video packs never expire. Add-ons bill monthly and scale one thing at a time."
          wide
        />

        <div className="px-packs">
          <article className="px-card" data-reveal>
            <div className="px-pack-kicker">Credit packs</div>
            <h3 className="px-h3">Slide to pick your pack</h3>
            <p className="px-sub">Bigger packs carry a bonus. Credits work on everything except video.</p>

            <div className="px-pack-top">
              <div>
                <div className="px-pack-credits">
                  {fmt(d.credits)}
                  <small>credits</small>
                </div>
                <span className={`px-bonus ${d.bonus ? "" : "none"}`}>
                  {d.bonus ? `+${d.bonus}% BONUS` : "NO BONUS"}
                </span>
              </div>
              <div className="px-pack-price">
                <div className="p">${d.price}</div>
                <div className="r">${((d.price / d.credits) * 1000).toFixed(2)} per 1,000 credits</div>
              </div>
            </div>

            <input
              type="range"
              className="px-range"
              min={0}
              max={CREDIT_PACKS.length - 1}
              step={1}
              value={k}
              onChange={(e) => setK(Number(e.target.value))}
              style={{ "--pct": `${pct}%` } as CSSProperties}
              aria-label="Credit pack size"
              aria-valuetext={`$${d.price}, ${fmt(d.credits)} credits`}
            />
            <div className="px-stops" aria-hidden="true">
              {CREDIT_PACKS.map((p, i) => (
                <span key={p.price} className={i === k ? "on" : ""}>
                  ${p.price}
                </span>
              ))}
            </div>

            <div className="px-eq">
              <div>
                <b>{fmt(Math.floor(d.credits / 30))}</b>image posts
              </div>
              <div>
                <b>{fmt(Math.floor(d.credits / 100))}</b>premium articles
              </div>
            </div>
            <a href={APP_URL} className="px-cta px-cta-lime" style={{ marginTop: 0 }}>
              Buy credits
            </a>
            <p className="px-foot">One time purchase. Never expires.</p>
          </article>

          <article className="px-card" data-reveal style={{ transitionDelay: "90ms" }}>
            <div className="px-pack-kicker">Video packs</div>
            <h3 className="px-h3">Video packs</h3>
            <p className="px-sub">
              Video credits are separate so renders never drain your posting credits. One video credit is one 8
              second Standard video.
            </p>
            {VIDEO_PACKS.map((v) => (
              <div key={v.credits} className="px-vp">
                <div>
                  <b>{v.credits} video credits</b>
                  <span>{v.rate} per video credit</span>
                </div>
                <a href={APP_URL} className="px-buy">
                  {v.price}
                </a>
              </div>
            ))}
          </article>
        </div>

        <h3 className="px-addons-title" data-reveal>
          Monthly add-ons
        </h3>
        <div className="px-ad-grid">
          {ADDONS.map((a, i) => (
            <div key={a.name} className="px-ad" data-reveal style={{ transitionDelay: `${(i % 2) * 80}ms` }}>
              <div>
                <b>{a.name}</b>
                <span>{a.desc}</span>
              </div>
              <em>
                {a.price}
                <small>/mo</small>
              </em>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
