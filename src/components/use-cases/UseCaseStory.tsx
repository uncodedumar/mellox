import type { CaseStory } from "@/lib/use-cases";

/**
 * Customer story block. Renders only when the story has a `summary` or a `quote`, so nothing unverified is shown.
 * Fill in the fields in src/lib/use-cases.tsx (ANTROSYS) to make it appear.
 */
export default function UseCaseStory({ story }: { story?: CaseStory }) {
  if (!story || (!story.summary && !story.quote)) return null;

  return (
    <section className="px-section">
      <div className="px-inner">
        <p className="px-label">Customer story</p>
        <div className="px-rule" />
        <article className="px-card uc-story" data-reveal>
          {story.photo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="uc-photo" src={story.photo} alt={story.person ? `Portrait of ${story.person}` : `${story.company}`} loading="lazy" />
          )}
          <div className="uc-story-body">
            <p className="uc-company">{story.company}</p>
            {story.summary && <h2>{story.summary}</h2>}
            {story.quote && <blockquote>&ldquo;{story.quote}&rdquo;</blockquote>}
            {(story.person || story.role) && (
              <p className="uc-by">
                {story.person && <b>{story.person}</b>}
                {story.role && <span>{story.role}</span>}
              </p>
            )}
            {story.results && story.results.length > 0 && (
              <div className="uc-results">
                {story.results.map((r) => (
                  <div key={r.label}>
                    <b>{r.value}</b>
                    <span>{r.label}</span>
                  </div>
                ))}
              </div>
            )}
            {story.href && (
              <a className="uc-more" href={story.href}>
                Read the full story
              </a>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}
