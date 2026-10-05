export const APP_URL = "https://app.mellox.ai";

/**
 * Link into the Mellox app. If the visitor typed a website in the hero box, it is passed along as `?url=` so the app
 * can start from it. Blank input goes to the plain app address.
 */
export function appUrlFor(site: string): string {
  const value = site.trim();
  if (!value) return APP_URL;
  const target = new URL(APP_URL);
  target.searchParams.set("url", value.slice(0, 2000));
  return target.toString();
}
