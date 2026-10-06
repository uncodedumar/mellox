"use client";

import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const APP_URL = "https://app.mellox.ai";

type Child = { label: string; hint: string; href: string; group?: string };
type NavLink = { label: string; href: string; children?: Child[] };

// Five items in the pill: three menus and two plain links. Everything else lives inside the menus.
const links: NavLink[] = [
  {
    label: "Product",
    href: "/features/brand-dna",
    children: [
      { label: "Brand DNA", hint: "AI that sounds like you", href: "/features/brand-dna" },
      { label: "AI Visibility (GEO)", hint: "See how AI talks about you", href: "/features/ai-visibility" },
      { label: "The Four Brains", hint: "Four specialists, one answer", href: "/features/four-brains" },
      { label: "Distribution", hint: "Publish natively everywhere", href: "/features/distribution" },
      { label: "Agency Mode", hint: "Every client, one command deck", href: "/features/agency-mode" },
      { label: "Autopilot", hint: "Sit back and watch it work", href: "/features/autopilot" },
      { label: "Integrations", hint: "Claude, ChatGPT, Slack, Notion, Canva", href: "/integrations" },
    ],
  },
  {
    label: "Use cases",
    href: "/use-cases/agencies",
    children: [
      { label: "Agencies", hint: "Every client, one command deck", href: "/use-cases/agencies" },
      { label: "Startups", hint: "A marketing team without hiring one", href: "/use-cases/startups" },
      { label: "In-house teams", hint: "One shared workspace", href: "/use-cases/in-house-teams" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Resources",
    href: "/docs",
    children: [
      { group: "Learn", label: "Docs and FAQ", hint: "Guides and answers", href: "/docs" },
      { group: "Learn", label: "Blog", hint: "Guides and ideas", href: "/blog" },
      { group: "Learn", label: "Changelog", hint: "What's new", href: "/changelog" },
      { group: "Learn", label: "Compare", hint: "Mellox next to other tools", href: "/compare" },
      { group: "More", label: "Security and trust", hint: "How we protect your data", href: "/security" },
      { group: "More", label: "Contact", hint: "Message the team", href: "/contact" },
    ],
  },
  { label: "About", href: "/about" },
];

const linkClass =
  "glass-link block whitespace-nowrap rounded-full px-4 py-2 text-[16px] font-medium text-white/90 transition hover:bg-white/15 hover:text-white xl:px-5 xl:text-[17px]";

function Menu({ link }: { link: NavLink }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);


  return (
    <li
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!ref.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`${linkClass} flex items-center gap-1.5`}
      >
        {link.label}
        <ChevronDown
          size={16}
          strokeWidth={2}
          aria-hidden="true"
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* pt-3 keeps the hover bridge between the trigger and the panel */}
      <div
        className={`absolute left-1/2 top-full z-50 w-[19rem] -translate-x-1/2 pt-3 transition duration-200 ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <ul
          role="menu"
          className="rounded-3xl border border-white/10 bg-[#0b0e14]/95 p-2 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8)] backdrop-blur-xl"
        >
          {link.children!.map((c, i, all) => {
            // show a group heading only where the group changes from the previous item
            const heading = c.group && c.group !== all[i - 1]?.group ? c.group : null;
            return (
              <li key={c.href} role="none">
                {heading && (
                  <p className="px-4 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40 first:pt-2">
                    {heading}
                  </p>
                )}
                <Link
                  role="menuitem"
                  href={c.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-2.5 transition hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline-none"
                >
                  <span className="block text-[16px] font-medium text-white">{c.label}</span>
                  <span className="block text-[13px] text-white/50">{c.hint}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const close = () => {
    setOpen(false);
    setExpanded(null);
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="grid h-[96px] w-full grid-cols-[1fr_auto] items-center px-4 sm:px-6 min-[1180px]:grid-cols-[1fr_auto_1fr] min-[1180px]:px-8">
        <Link href="/" aria-label="Mellox AI home" className="flex items-center gap-3 justify-self-start py-2.5">
          <Image src="/brand/mark-lime.svg" alt="" width={44} height={23} priority />
          <span className="font-display text-xl tracking-wide text-white">MELLOX</span>
        </Link>

        <nav aria-label="Primary" className="glass hidden rounded-full px-2 py-3 min-[1180px]:block">
          <ul className="flex items-center">
            {links.map((l) =>
              l.children ? (
                <Menu key={l.label} link={l} />
              ) : (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-2 justify-self-end xl:gap-3">
          <a
            href={APP_URL}
            className="glass-link hidden whitespace-nowrap rounded-full px-4 py-3 text-[16px] font-medium text-white/85 transition hover:text-white min-[1180px]:inline-block xl:text-[17px]"
          >
            Log in
          </a>
          <Link
            href="/demo"
            className="glass glass-lime glass-interactive hidden whitespace-nowrap rounded-full px-6 py-3.5 text-[16px] font-semibold text-white min-[1180px]:inline-block xl:px-7 xl:text-[17px]"
          >
            Book a demo
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => (open ? close() : setOpen(true))}
            className="glass glass-interactive flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full min-[1180px]:hidden"
          >
            <span className={`h-0.5 w-5 bg-white transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-5 bg-white transition ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-5 bg-white transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Mobile" data-lenis-prevent className="glass mx-4 mt-[-24px] max-h-[calc(100vh-110px)] overflow-y-auto rounded-3xl p-4 sm:mx-6 min-[1180px]:hidden">
          <ul className="flex flex-col">
            {links.map((l) =>
              l.children ? (
                <li key={l.label}>
                  <button
                    type="button"
                    aria-expanded={expanded === l.label}
                    onClick={() => setExpanded((v) => (v === l.label ? null : l.label))}
                    className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-lg text-white/90 hover:bg-white/15"
                  >
                    {l.label}
                    <ChevronDown
                      size={18}
                      aria-hidden="true"
                      className={`transition-transform duration-300 ${expanded === l.label ? "rotate-180" : ""}`}
                    />
                  </button>
                  {expanded === l.label && (
                    <ul className="mb-1 ml-4 border-l border-white/15 pl-2">
                      {l.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            onClick={close}
                            className="block rounded-2xl px-4 py-2.5 text-base text-white/80 hover:bg-white/15"
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={l.href}>
                  <Link href={l.href} onClick={close} className="block rounded-2xl px-4 py-3 text-lg text-white/90 hover:bg-white/15">
                    {l.label}
                  </Link>
                </li>
              ),
            )}
            <li className="mt-3 grid grid-cols-2 gap-2 border-t border-white/10 pt-3">
              <a
                href={APP_URL}
                onClick={close}
                className="rounded-full border border-white/25 px-4 py-3 text-center font-semibold text-white hover:bg-white/10"
              >
                Log in
              </a>
              <Link href="/demo" onClick={close} className="glass glass-lime rounded-full px-4 py-3 text-center font-semibold text-white">
                Book a demo
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
