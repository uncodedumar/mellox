import { describe, expect, it } from "vitest";
import { PRODUCTION_URL, resolveSiteUrl } from "@/lib/seo";

describe("resolveSiteUrl", () => {
  it("uses the configured production domain", () => {
    expect(resolveSiteUrl("https://mellox.ai", true)).toBe("https://mellox.ai");
    expect(resolveSiteUrl("https://mellox.ai/", true)).toBe("https://mellox.ai");
  });

  it("falls back to mellox.ai in production when nothing is set", () => {
    expect(resolveSiteUrl(undefined, true)).toBe(PRODUCTION_URL);
    expect(resolveSiteUrl("   ", true)).toBe(PRODUCTION_URL);
  });

  it("never lets a localhost address into production", () => {
    for (const local of ["http://localhost:3000", "localhost:3000", "http://127.0.0.1:3000", "http://[::1]:3000/"]) {
      expect(resolveSiteUrl(local, true), local).toBe(PRODUCTION_URL);
    }
  });

  it("keeps localhost for development", () => {
    expect(resolveSiteUrl(undefined, false)).toBe("http://localhost:3000");
    expect(resolveSiteUrl("http://localhost:3000", false)).toBe("http://localhost:3000");
  });

  it("does not mistake a real domain that starts with local for localhost", () => {
    expect(resolveSiteUrl("https://localhost-tools.com", true)).toBe("https://localhost-tools.com");
  });
});
