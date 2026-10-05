import { describe, expect, it } from "vitest";
import { APP_URL, appUrlFor } from "@/lib/app-url";

describe("appUrlFor", () => {
  it("goes to the plain app address when nothing was typed", () => {
    expect(appUrlFor("")).toBe(APP_URL);
    expect(appUrlFor("   ")).toBe(APP_URL);
  });

  it("passes the typed website along as ?url=", () => {
    const u = new URL(appUrlFor("example.com"));
    expect(u.origin).toBe(APP_URL);
    expect(u.searchParams.get("url")).toBe("example.com");
  });

  it("encodes characters that would break the query string", () => {
    const typed = "https://example.com/a b?x=1&y=2";
    const link = appUrlFor(typed);
    expect(link).not.toContain(" ");
    expect(new URL(link).searchParams.get("url")).toBe(typed);
  });

  it("trims and caps very long input", () => {
    expect(new URL(appUrlFor("  site.io  ")).searchParams.get("url")).toBe("site.io");
    expect(new URL(appUrlFor("a".repeat(5000))).searchParams.get("url")).toHaveLength(2000);
  });
});
