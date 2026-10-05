import { describe, expect, it } from "vitest";
import { PLANS } from "@/lib/pricing";
import { faqJsonLd, organizationJsonLd, serializeJsonLd, siteGraph, softwareApplicationJsonLd } from "@/lib/seo";

describe("structured data", () => {
  it("site graph contains Organization, WebSite and SoftwareApplication", () => {
    const types = siteGraph["@graph"].map((n) => n["@type"]);
    expect(types).toEqual(["Organization", "WebSite", "SoftwareApplication"]);
  });

  it("Organization lists social profiles and a support contact", () => {
    expect(organizationJsonLd.sameAs.length).toBeGreaterThanOrEqual(6);
    expect(organizationJsonLd.contactPoint[0].email).toBe("support@mellox.ai");
  });

  it("SoftwareApplication offers match the priced plans and never invent ratings", () => {
    const priced = PLANS.filter((p) => p.monthly !== null).map((p) => p.name);
    const names = softwareApplicationJsonLd.offers.map((o) => o.name);
    expect(names).toEqual(["Free", ...priced]);
    expect(softwareApplicationJsonLd).not.toHaveProperty("aggregateRating");
  });

  it("FAQPage mirrors the given questions", () => {
    const ld = faqJsonLd([{ q: "Q1?", a: "A1" }, { q: "Q2?", a: "A2" }]);
    expect(ld["@type"]).toBe("FAQPage");
    expect(ld.mainEntity).toHaveLength(2);
    expect(ld.mainEntity[0].acceptedAnswer.text).toBe("A1");
  });

  it("serialises safely for a script tag", () => {
    expect(serializeJsonLd({ a: "</script><b>" })).not.toContain("</script>");
  });
});
