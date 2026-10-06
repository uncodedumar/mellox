import Image from "next/image";
import "./clients.css";

// Greyscale versions live in /public/Clients/grey (generated from the originals).
const logos: { src: string; alt: string; w: number; h: number; height: number }[] = [
  { src: "/Clients/grey/44-1-150x150.webp", alt: "Client logo", w: 200, h: 200, height: 44 },
  { src: "/Clients/grey/cinqo.webp", alt: "Cinqo", w: 202, h: 200, height: 46 },
  { src: "/Clients/grey/logo1.svg", alt: "Client logo", w: 400, h: 400, height: 52 },
  { src: "/Clients/grey/snap.webp", alt: "Snapchat", w: 200, h: 200, height: 40 },
  { src: "/Clients/grey/soul.webp", alt: "Client logo", w: 118, h: 200, height: 52 },
  { src: "/Clients/grey/channels4_profile.webp", alt: "Client logo", w: 200, h: 200, height: 42 },
  { src: "/Clients/grey/whale-ink.webp", alt: "Whale Ink", w: 212, h: 200, height: 46 },
  { src: "/Clients/grey/rado-logo.webp", alt: "Rado", w: 200, h: 200, height: 44 },
  { src: "/Clients/grey/logo.webp", alt: "Client logo", w: 203, h: 200, height: 42 },
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="logo-row" aria-hidden={hidden || undefined}>
      {logos.map((l) => (
        <li key={l.src} className="logo-item">
          <Image
            src={l.src}
            alt={hidden ? "" : l.alt}
            width={l.w}
            height={l.h}
            style={{ height: l.height, width: "auto" }}
            loading="eager"
            unoptimized={l.src.endsWith(".svg")}
          />
        </li>
      ))}
    </ul>
  );
}

/** Slow, endless grey logo strip with faded edges. */
export default function Clients() {
  return (
    <section aria-label="Trusted by" className="relative z-20 pb-24 pt-16 sm:pb-32 sm:pt-24">
      <div className="logo-marquee">
        <div className="logo-track">
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}
