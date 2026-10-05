import { BarChart3 } from "lucide-react";
import {
  ALL_COMPETITORS,
  FMT_SCORE,
  GROUP_META,
  MELLOX,
  scoreByGroup,
  totalScore,
  type Group,
} from "@/lib/compare";
import SectionHead from "../pricing/SectionHead";

const GROUPS: Group[] = ["create", "monitor", "scale"];
const MAX = 14;

export default function CompareCoverage() {
  const rows = [MELLOX, ...ALL_COMPETITORS]
    .map((p) => ({ p, g: scoreByGroup(p.row), total: totalScore(p.row) }))
    .sort((a, b) => b.total - a.total);

  return (
    <section id="coverage" className="px-section">
      <div className="px-inner">
        <SectionHead
          icon={<BarChart3 size={32} strokeWidth={1.4} aria-hidden="true" />}
          label="Coverage"
          title="How much of the job each tool covers."
          blurb="Share of 14 capabilities offered, split by what they do. Full counts as one, partial as half."
        />
        <div className="px-card cx-cov" data-reveal>
          <div className="cx-cov-legend">
            {GROUPS.map((g) => (
              <span key={g}>
                <i style={{ background: GROUP_META[g].color }} />
                {GROUP_META[g].label} ({GROUP_META[g].count})
              </span>
            ))}
          </div>
          <ol className="cx-bars">
            {rows.map(({ p, g, total }) => (
              <li
                key={p.name}
                className={`cx-bar-row ${p.self ? "self" : ""}`}
                aria-label={`${p.name}: ${FMT_SCORE(total)} of ${MAX}`}
              >
                <span>{p.name}</span>
                <span className="cx-bar-track" aria-hidden="true">
                  {GROUPS.map((k) => (
                    <span
                      key={k}
                      style={{ width: `${(g[k] / MAX) * 100}%`, background: GROUP_META[k].color }}
                    />
                  ))}
                </span>
                <span className="cx-bar-score">
                  {FMT_SCORE(total)}/{MAX}
                </span>
              </li>
            ))}
          </ol>
        </div>
        <p className="cx-note">
          Specialists lead on depth in their own lane. No other platform in this set scores across all three groups.
        </p>
      </div>
    </section>
  );
}
