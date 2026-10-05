"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { appUrlFor } from "@/lib/app-url";

const pixelIcons = ["Asterisk", "At", "Hash", "Percent"];

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
  prefix,
  icon,
  options,
  value,
  onChange,
  align = "left",
}: {
  label: string;
  prefix?: string;
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
        className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-2.5 py-2 text-[14px] text-white/60 sm:px-3 sm:text-[15px] transition-colors hover:bg-white/[0.06] hover:text-white/90"
      >
        {icon}
        {prefix && <span className="hidden sm:inline">{prefix}</span>}
        <span className="font-semibold text-white/95">{value}</span>
        <span className={`text-white/50 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <Chevron />
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          className={`absolute bottom-full z-20 mb-2 min-w-[190px] overflow-hidden rounded-2xl border border-white/10 bg-[#0d0f10]/95 p-1.5 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9)] backdrop-blur-xl ${
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
      className="hero-chat group relative w-full max-w-[820px] rounded-[32px] p-[1px]"
    >
      <div className="relative rounded-[31px] bg-[#0c0e0f]/90 px-5 pb-5 pt-7 backdrop-blur-xl sm:px-7 sm:pt-8">
        <div className="flex items-center gap-3">
          <input
            type="text"
            inputMode="url"
            autoComplete="url"
            spellCheck={false}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your website"
            aria-label="Enter your website"
            className="min-w-0 flex-1 bg-transparent text-[20px] font-medium text-white placeholder:text-white/40 focus:outline-none sm:text-[24px]"
          />
          <div className="flex shrink-0 items-center gap-2" aria-hidden>
            {pixelIcons.map((n) => (
              <Image key={n} src={`/brand/micro/${n}.svg`} alt="" width={18} height={18} className="h-4 w-4 opacity-90 sm:h-[18px] sm:w-[18px]" />
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-2 gap-y-3 sm:mt-8">
          <Menu
            label="Content style"
            prefix="Style"
            icon={
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--brand-lime)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M7 3h6a4 4 0 0 1 0 8H7z" />
                <path d="M7 11h8a4 4 0 0 1 0 8H7z" />
                <path d="M7 3v16" />
              </svg>
            }
            options={styles}
            value={style}
            onChange={setStyle}
          />

          <div className="ml-auto flex items-center gap-2">
            <Menu label="Model" options={models} value={model} onChange={setModel} align="right" />
            <a
              href={appUrlFor(url)}
              aria-label="Continue to Mellox"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-lime text-black transition-all duration-200 hover:scale-105 hover:shadow-[0_0_28px_rgba(203,233,96,0.6)]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 19V5" />
                <path d="m5 12 7-7 7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </form>
  );
}
