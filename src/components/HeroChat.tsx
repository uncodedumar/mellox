"use client";

import { useEffect, useRef, useState } from "react";
import { appUrlFor } from "@/lib/app-url";

const styles = ["Brand DNA only", "Brand DNA + trends", "Free style"];
const models = ["Mellox Nebula"];

function Chevron() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function Menu({
  label,
  icon,
  options,
  value,
  onChange,
  align = "left",
}: {
  label: string;
  icon?: React.ReactNode;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  align?: "left" | "right";
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] text-white/55 transition-colors hover:bg-white/[0.07] hover:text-white/90 sm:text-[13.5px]"
      >
        {icon}
        <span className="font-medium text-white/90">{value}</span>
        <span className={`text-white/50 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <Chevron />
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          className={`absolute bottom-full z-20 mb-3 min-w-[190px] overflow-hidden rounded-2xl border border-white/10 bg-[#0d0f10]/95 p-1.5 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9)] backdrop-blur-xl ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {options.map((o) => (
            <li key={o} role="option" aria-selected={o === value}>
              <button
                type="button"
                onClick={() => {
                  onChange(o);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-4 rounded-xl px-3 py-2 text-left text-[15px] transition-colors hover:bg-white/[0.07] ${
                  o === value ? "text-lime" : "text-white/80"
                }`}
              >
                {o}
                {o === value && <span className="h-1.5 w-1.5 rounded-full bg-lime" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function HeroChat() {
  const [url, setUrl] = useState("");
  const [style, setStyle] = useState(styles[0]);
  const [model, setModel] = useState(models[0]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        window.location.assign(appUrlFor(url));
      }}
      className="hero-chat group relative w-full max-w-[760px] rounded-[30px] p-[1px] sm:rounded-full"
    >
      <div className="relative flex flex-wrap items-center gap-y-1 rounded-[29px] bg-[#0b0d0e]/90 p-2 backdrop-blur-xl sm:flex-nowrap sm:gap-1 sm:rounded-full sm:py-2 sm:pl-3 sm:pr-2">
        <div className="flex min-w-0 basis-full items-center gap-3 pl-3 pr-2 pt-1.5 sm:basis-auto sm:flex-1 sm:pt-0">
          <svg className="shrink-0 text-white/35 transition-colors group-focus-within:text-lime" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18" />
            <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z" />
          </svg>
          <input
            type="text"
            inputMode="url"
            autoComplete="url"
            spellCheck={false}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your website"
            aria-label="Enter your website"
            className="min-w-0 flex-1 bg-transparent py-2 text-[17px] font-medium text-white placeholder:text-white/35 focus:outline-none sm:text-[18px]"
          />
        </div>

        <div className="flex w-full items-center gap-0.5 sm:w-auto sm:shrink-0">
          <span className="mx-1 hidden h-5 w-px bg-white/10 sm:block" aria-hidden />
          <Menu
            label="Content style"
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--brand-lime)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M7 3h6a4 4 0 0 1 0 8H7z" />
                <path d="M7 11h8a4 4 0 0 1 0 8H7z" />
                <path d="M7 3v16" />
              </svg>
            }
            options={styles}
            value={style}
            onChange={setStyle}
          />
          <Menu label="Model" options={models} value={model} onChange={setModel} align="right" />
          <a
            href={appUrlFor(url)}
            aria-label="Continue to Mellox"
            className="ml-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lime text-black transition-all duration-200 hover:scale-105 hover:shadow-[0_0_24px_rgba(203,233,96,0.55)] sm:ml-1"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 19V5" />
              <path d="m5 12 7-7 7 7" />
            </svg>
          </a>
        </div>
      </div>
    </form>
  );
}
