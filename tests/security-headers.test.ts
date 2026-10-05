import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { buildCsp, buildSecurityHeaders } from "@/lib/security-headers";

const header = (headers: { key: string; value: string }[], key: string) => headers.find((h) => h.key === key)?.value;

describe("security headers", () => {
  const prod = buildSecurityHeaders(false);

  it("sets every expected header", () => {
    for (const key of [
      "Content-Security-Policy",
      "Strict-Transport-Security",
      "X-Frame-Options",
      "X-Content-Type-Options",
      "Referrer-Policy",
      "Permissions-Policy",
    ]) {
      expect(header(prod, key), key).toBeTruthy();
    }
    expect(header(prod, "X-Content-Type-Options")).toBe("nosniff");
    expect(header(prod, "X-Frame-Options")).toBe("DENY");
    expect(header(prod, "Strict-Transport-Security")).toMatch(/max-age=\d{7,}/);
  });

  it("production CSP is locked down", () => {
    const csp = buildCsp(false);
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("base-uri 'self'");
    expect(csp).toContain("upgrade-insecure-requests");
    expect(csp).not.toContain("'unsafe-eval'");
    expect(csp).not.toMatch(/ws:/);
  });

  it("development CSP allows what the dev server needs", () => {
    const csp = buildCsp(true);
    expect(csp).toContain("'unsafe-eval'");
    expect(csp).toContain("ws:");
    expect(csp).not.toContain("upgrade-insecure-requests");
  });

  it("only allows the analytics and image hosts the site actually uses", () => {
    const csp = buildCsp(false);
    expect(csp).toContain("https://www.googletagmanager.com");
    expect(csp).toContain("https://plausible.io");
    expect(csp).toContain("https://images.unsplash.com");
  });

  it("next.config hides the X-Powered-By header and applies the headers", () => {
    const cfg = readFileSync(path.join(process.cwd(), "next.config.ts"), "utf8");
    expect(cfg).toMatch(/poweredByHeader:\s*false/);
    expect(cfg).toContain("buildSecurityHeaders");
  });
});
