"use client";

import type { ReactNode } from "react";
import { openCookieSettings } from "@/lib/consent";

/** Button or link that reopens the cookie preferences panel. */
export default function CookieSettingsButton({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      {children}
    </button>
  );
}
