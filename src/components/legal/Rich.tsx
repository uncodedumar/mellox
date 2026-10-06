import type { ReactNode } from "react";

// Legal text is stored as plain strings. **double asterisks** make bold lead-ins, and web addresses and email
// addresses become links, so the data files stay simple and every document renders the same way.
const TOKEN = /(\*\*[^*]+\*\*|https?:\/\/[^\s)]+[^\s).,;:!?]|[\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g;

export default function Rich({ text }: { text: string }) {
  const out: ReactNode[] = [];
  text.split(TOKEN).forEach((part, i) => {
    if (!part) return;
    if (part.startsWith("**") && part.endsWith("**")) {
      out.push(<strong key={i}>{part.slice(2, -2)}</strong>);
    } else if (/^https?:\/\//.test(part)) {
      const own = /^https?:\/\/(www\.)?mellox\.ai(\/|$)/.test(part);
      out.push(
        <a key={i} href={part} {...(own ? {} : { target: "_blank", rel: "noopener noreferrer" })}>
          {part}
        </a>,
      );
    } else if (/^[\w.+-]+@/.test(part)) {
      out.push(
        <a key={i} href={`mailto:${part}`}>
          {part}
        </a>,
      );
    } else {
      out.push(part);
    }
  });
  return <>{out}</>;
}
