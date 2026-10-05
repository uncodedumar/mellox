// Cookie consent store. Choice is kept in localStorage and mirrored in a first party cookie.
// Any future analytics or marketing script must call hasConsent("analytics" | "marketing") before it loads.

export type Consent = { v: 1; analytics: boolean; marketing: boolean; ts: number };
export type Category = "analytics" | "marketing";

const KEY = "mellox-consent";
const COOKIE = "mellox_consent";
const MAX_AGE_DAYS = 180; // ask again after about six months
export const OPEN_EVENT = "mellox:open-cookie-settings";
const CHANGE_EVENT = "mellox:consent-changed";

function read(): Consent | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const c = JSON.parse(raw) as Consent;
    if (c.v !== 1 || Date.now() - c.ts > MAX_AGE_DAYS * 864e5) return null;
    return c;
  } catch {
    return null;
  }
}

// useSyncExternalStore needs a stable snapshot per value, so cache the raw string.
let cacheRaw: string | null | undefined;
let cacheVal: Consent | null = null;
export function getSnapshot(): Consent | null {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {}
  if (raw !== cacheRaw) {
    cacheRaw = raw;
    cacheVal = read();
  }
  return cacheVal;
}
export const getServerSnapshot = (): Consent | null | undefined => undefined;

export function subscribe(cb: () => void) {
  window.addEventListener(CHANGE_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(CHANGE_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

export function saveConsent(choice: { analytics: boolean; marketing: boolean }) {
  const c: Consent = { v: 1, ...choice, ts: Date.now() };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(c));
  } catch {}
  document.cookie = `${COOKIE}=${choice.analytics ? "a" : ""}${choice.marketing ? "m" : ""}${
    choice.analytics || choice.marketing ? "" : "n"
  }; Max-Age=${MAX_AGE_DAYS * 86400}; Path=/; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function hasConsent(cat: Category): boolean {
  return !!read()?.[cat];
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}
