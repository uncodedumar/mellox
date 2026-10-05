"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

type Greeting = { text: string; lang: string; rtl?: boolean };

const GREETINGS: Greeting[] = [
  { text: "Hello", lang: "en" },
  { text: "مرحبا", lang: "ar", rtl: true },
  { text: "ہیلو", lang: "ur", rtl: true },
  { text: "Bonjour", lang: "fr" },
  { text: "Hola", lang: "es" },
  { text: "Hallo", lang: "de" },
  { text: "こんにちは", lang: "ja" },
  { text: "नमस्ते", lang: "hi" },
  { text: "Ciao", lang: "it" },
  { text: "Olá", lang: "pt" },
  { text: "안녕하세요", lang: "ko" },
  { text: "你好", lang: "zh" },
  { text: "Привет", lang: "ru" },
  { text: "Merhaba", lang: "tr" },
  { text: "Salam", lang: "id" },
  { text: "Γειά σου", lang: "el" },
  { text: "שלום", lang: "he", rtl: true },
  { text: "হ্যালো", lang: "bn" },
  { text: "Hej", lang: "sv" },
  { text: "Sawubona", lang: "zu" },
];

// split into user-perceived characters so Hindi, Bengali and Arabic never get cut mid-glyph
const segmenter = typeof Intl !== "undefined" && "Segmenter" in Intl ? new Intl.Segmenter() : null;
const chars = (s: string) => (segmenter ? Array.from(segmenter.segment(s), (x) => x.segment) : Array.from(s));

const QUERY = "(prefers-reduced-motion: reduce)";
function useReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(QUERY);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}

const TYPE_MS = 120;
const ERASE_MS = 60;
const HOLD_MS = 1300;
const GAP_MS = 250;

export default function HelloTypewriter() {
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(GREETINGS[0].text.length);
  const [phase, setPhase] = useState<"typing" | "holding" | "erasing">("holding");
  const reduced = useReducedMotion();

  const g = GREETINGS[index];
  const parts = chars(g.text);

  useEffect(() => {
    if (reduced) return;
    let t: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      t =
        count < parts.length
          ? setTimeout(() => setCount((c) => c + 1), TYPE_MS)
          : setTimeout(() => setPhase("holding"), 0);
    } else if (phase === "holding") {
      t = setTimeout(() => setPhase("erasing"), HOLD_MS);
    } else {
      t =
        count > 0
          ? setTimeout(() => setCount((c) => c - 1), ERASE_MS)
          : setTimeout(() => {
              setIndex((i) => (i + 1) % GREETINGS.length);
              setPhase("typing");
            }, GAP_MS);
    }
    return () => clearTimeout(t);
  }, [phase, count, parts.length, reduced]);

  if (reduced) {
    // no motion: rotate slowly without typing
    return <StaticRotator />;
  }

  return (
    <span className="ct-type" lang={g.lang} dir={g.rtl ? "rtl" : "ltr"}>
      <span className="sr-only">Hello in many languages</span>
      <span aria-hidden="true">{parts.slice(0, count).join("")}</span>
      <span className="ct-caret" aria-hidden="true" />
    </span>
  );
}

function StaticRotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % GREETINGS.length), 2500);
    return () => clearInterval(t);
  }, []);
  const g = GREETINGS[i];
  return (
    <span className="ct-type" lang={g.lang} dir={g.rtl ? "rtl" : "ltr"}>
      {g.text}
    </span>
  );
}
