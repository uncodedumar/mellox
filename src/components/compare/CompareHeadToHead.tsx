import { Swords } from "lucide-react";
import { HEAD_TO_HEAD, HONESTY, type Level } from "@/lib/compare";
import { Dot } from "./CompareMatrix";
import SectionHead from "../pricing/SectionHead";

export default function CompareHeadToHead() {
  const { columns, rows, rowsBy } = HEAD_TO_HEAD;

  return (
    <section id="head-to-head" className="px-section">
      <div className="px-inner">
        <SectionHead
          icon={<Swords size={32} strokeWidth={1.4} aria-hidden="true" />}
          label="Head to head"
          title="Mellox AI vs Pomelli, Profound and Jasper."
          blurb="The three names buyers ask about most, on the points that decide the choice."
          wide
        />
        <div className="px-mx-scroll" data-reveal tabIndex={0} aria-label="Head to head table, scrollable">
          <table className="px-mx cx-h2h">
            <thead>
              <tr>
                <th scope="col">
                  <span className="sr-only">Feature</span>
                </th>
                {columns.map((c, i) => (
                  <th key={c} scope="col" className={i === 0 ? "hl" : undefined}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label}>
                  <td>{r.label}</td>
                  {columns.map((c, i) => {
                    const cls = i === 0 ? "hl" : undefined;
                    if ("text" in r && r.text) {
                      return (
                        <td key={c} className={`${cls ?? ""} price`}>
                          {r.text[i]}
                        </td>
                      );
                    }
                    const level =
                      "levels" in r && r.levels ? r.levels[i] : (rowsBy[i][r.cap as number] as Level);
                    return (
                      <td key={c} className={cls}>
                        <Dot level={level} />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <article className="px-card cx-honest" data-reveal>
          <h3>Where we genuinely do not win head on</h3>
          <ul>
            {HONESTY.map((h) => (
              <li key={h.title}>
                <b>{h.title}</b>
                <span>{h.body}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
