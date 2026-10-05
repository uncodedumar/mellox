import { Check, SlidersHorizontal, X } from "lucide-react";
import { MATRIX, MATRIX_COLUMNS, type Cell, type MatrixGroup } from "@/lib/pricing-matrix";
import SectionHead from "./SectionHead";

const isHl = (i: number) => "highlight" in MATRIX_COLUMNS[i];

function Value({ v }: { v: Cell }) {
  if (v === true)
    return (
      <span className="px-yes" role="img" aria-label="Included">
        <Check strokeWidth={2.6} aria-hidden="true" />
      </span>
    );
  if (v === false)
    return (
      <span className="px-no" role="img" aria-label="Not included">
        <X strokeWidth={2.4} aria-hidden="true" />
      </span>
    );
  return <>{v}</>;
}

function GroupRows({ group }: { group: MatrixGroup }) {
  return (
    <>
      <tr className="grp">
        <td>{group.title}</td>
        {MATRIX_COLUMNS.map((c, i) => (
          <td key={c.name} className={isHl(i) ? "hl" : undefined} />
        ))}
      </tr>
      {group.rows.map((r) => (
        <tr key={r.label}>
          <td>{r.label}</td>
          {r.values.map((v, i) => (
            <td key={i} className={isHl(i) ? "hl" : undefined}>
              <Value v={v} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export default function PricingMatrix() {
  return (
    <section id="compare-plans" className="px-section">
      <div className="px-inner">
        <SectionHead
          icon={<SlidersHorizontal size={32} strokeWidth={1.4} aria-hidden="true" />}
          label="Comparison"
          title="Compare plans in detail."
          blurb="Every plan, side by side. See what each one includes and find the right fit."
        />
        <div className="px-mx-scroll" data-reveal tabIndex={0} aria-label="Plan comparison table, scrollable">
          <table className="px-mx">
            <thead>
              <tr>
                <th scope="col">
                  <span className="sr-only">Feature</span>
                </th>
                {MATRIX_COLUMNS.map((c, i) => (
                  <th key={c.name} scope="col" className={isHl(i) ? "hl" : undefined}>
                    {c.name}
                    <small>{c.price}</small>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MATRIX.map((g) => (
                <GroupRows key={g.title} group={g} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
