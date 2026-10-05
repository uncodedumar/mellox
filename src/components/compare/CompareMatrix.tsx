import { Grid3x3 } from "lucide-react";
import { CAPS, CATEGORIES, GROUP_META, MELLOX, type Group, type Level, type Platform } from "@/lib/compare";
import SectionHead from "../pricing/SectionHead";

const LEVEL_LABEL: Record<Level, string> = {
  f: "Full / native",
  p: "Partial / add-on / limited",
  n: "Not offered / not listed",
};

export function Dot({ level }: { level: Level }) {
  return <span className={`cx-dot ${level}`} role="img" aria-label={LEVEL_LABEL[level]} />;
}

function PlatformRow({ p }: { p: Platform }) {
  return (
    <tr className={p.self ? "self" : undefined}>
      <td className="name">
        <b>{p.name}</b>
        <small>{p.note}</small>
      </td>
      {CAPS.map((c, i) => (
        <td key={c.short}>
          <Dot level={p.row[i] as Level} />
        </td>
      ))}
    </tr>
  );
}

export default function CompareMatrix() {
  const groups = (Object.keys(GROUP_META) as Group[]).map((g) => ({
    g,
    n: CAPS.filter((c) => c.group === g).length,
  }));

  return (
    <section id="matrix" className="px-section">
      <div className="px-inner">
        <SectionHead
          icon={<Grid3x3 size={32} strokeWidth={1.4} aria-hidden="true" />}
          label="Comparison"
          title="Every platform, every capability."
          blurb="Sixteen platforms across fourteen capabilities. Scroll sideways on smaller screens."
          wide
        />
        <div className="px-mx-scroll" data-reveal tabIndex={0} aria-label="Platform comparison table, scrollable">
          <table className="cx-mx">
            <thead>
              <tr className="cx-groups">
                <th aria-hidden="true" />
                {groups.map(({ g, n }) => (
                  <th key={g} colSpan={n} className={`cx-g-${g}`}>
                    {GROUP_META[g].label}
                  </th>
                ))}
              </tr>
              <tr>
                <th scope="col">Platform</th>
                {CAPS.map((c) => (
                  <th key={c.short} scope="col" title={c.label}>
                    {c.short}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <PlatformRow p={MELLOX} />
              {CATEGORIES.map((cat) => (
                <CategoryRows key={cat.id} title={cat.title} platforms={cat.platforms} />
              ))}
            </tbody>
          </table>
        </div>

        <div className="cx-legend" data-reveal>
          <span>
            <Dot level="f" /> Full / native
          </span>
          <span>
            <Dot level="p" /> Partial / add-on / limited
          </span>
          <span>
            <Dot level="n" /> Not offered / not listed
          </span>
        </div>
        <p className="cx-note" data-reveal>
          Based on public product pages and pricing. Public API on Mellox is limited to the Scale plan, so it is
          marked partial. Vendors ship quickly, so confirm what matters to you before you buy.
        </p>
      </div>
    </section>
  );
}

function CategoryRows({ title, platforms }: { title: string; platforms: Platform[] }) {
  return (
    <>
      <tr className="cat">
        <td colSpan={CAPS.length + 1}>{title}</td>
      </tr>
      {platforms.map((p) => (
        <PlatformRow key={p.name} p={p} />
      ))}
    </>
  );
}
