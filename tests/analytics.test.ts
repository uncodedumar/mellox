import { afterEach, describe, expect, it, vi } from "vitest";
import { analyticsEnabled, configuredProviders, marketingEnabled, trackEvent } from "@/lib/analytics";
import { buildCsp } from "@/lib/security-headers";

describe("analytics configuration", () => {
  it("is off by default: nothing loads until an id is configured", () => {
    // (the test environment sets no analytics ids)
    expect(analyticsEnabled).toBe(false);
    expect(marketingEnabled).toBe(false);
    expect(Object.values(configuredProviders()).every((v) => v === false)).toBe(true);
  });

  it("knows all six providers", () => {
    expect(Object.keys(configuredProviders()).sort()).toEqual(
      ["clarity", "googleAnalytics", "linkedIn", "metaPixel", "plausible", "vercel"].sort(),
    );
  });
});

describe("trackEvent", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("does nothing, and does not throw, on the server", () => {
    expect(() => trackEvent("signup_click")).not.toThrow();
  });

  it("sends the event to every provider that is loaded, with ad-platform names for conversions", () => {
    const gtag = vi.fn();
    const plausible = vi.fn();
    const clarity = vi.fn();
    const fbq = vi.fn();
    vi.stubGlobal("window", { gtag, plausible, clarity, fbq });

    trackEvent("generate_lead", { form: "demo" });

    expect(gtag).toHaveBeenCalledWith("event", "generate_lead", { form: "demo" });
    expect(plausible).toHaveBeenCalledWith("generate_lead", { props: { form: "demo" } });
    expect(clarity).toHaveBeenCalledWith("event", "generate_lead");
    expect(fbq).toHaveBeenCalledWith("track", "Lead");
  });

  it("leaves events that are not conversions out of the ad platforms", () => {
    const fbq = vi.fn();
    vi.stubGlobal("window", { fbq });
    trackEvent("some_other_event");
    expect(fbq).not.toHaveBeenCalled();
  });

  it("never lets a failing provider break the page", () => {
    vi.stubGlobal("window", {
      gtag: () => {
        throw new Error("blocked by an ad blocker");
      },
    });
    expect(() => trackEvent("signup_click")).not.toThrow();
  });
});

describe("content security policy for analytics", () => {
  const csp = buildCsp(false);

  it("allows the script and data hosts of every connected tool", () => {
    for (const host of [
      "https://www.googletagmanager.com", // Google Analytics 4
      "https://plausible.io", // Plausible
      "https://www.clarity.ms", // Microsoft Clarity
      "https://connect.facebook.net", // Meta Pixel
      "https://snap.licdn.com", // LinkedIn Insight Tag
      "https://px.ads.linkedin.com",
    ]) {
      expect(csp, host).toContain(host);
    }
  });

  it("keeps the Vercel development helper out of production", () => {
    expect(csp).not.toContain("va.vercel-scripts.com");
    expect(buildCsp(true)).toContain("va.vercel-scripts.com");
  });
});
