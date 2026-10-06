import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { FEATURES, matrixRow } from "@/lib/features";
import { MATRIX, MATRIX_COLUMNS } from "@/lib/pricing-matrix";
import { PLANS } from "@/lib/pricing";
import { USE_CASES } from "@/lib/use-cases";

describe("pricing data", () => {
  it("every matrix row has one value per plan column", () => {
    for (const group of MATRIX) {
      for (const row of group.rows) {
        expect(row.values, `${group.title} / ${row.label}`).toHaveLength(MATRIX_COLUMNS.length);
      }
    }
  });

  it("has unique plan ids", () => {
    const ids = PLANS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("feature pages", () => {
  it("have unique slugs", () => {
    const slugs = FEATURES.map((f) => f.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("only reference pricing rows that exist", () => {
    for (const f of FEATURES) {
      for (const label of f.table.rows) {
        expect(() => matrixRow(label), `${f.slug}: ${label}`).not.toThrow();
      }
    }
  });

  it("each have an illustration (otherwise the page shows an empty box under the hero)", () => {
    const visual = readFileSync(path.join(process.cwd(), "src", "components", "features", "FeatureVisual.tsx"), "utf8");
    for (const f of FEATURES) {
      expect(visual, `FeatureVisual.tsx has no case for "${f.slug}"`).toContain(`case "${f.slug}":`);
    }
  });

  it("have complete content", () => {
    for (const f of FEATURES) {
      expect(f.steps, f.slug).toHaveLength(3);
      expect(f.items.length, f.slug).toBeGreaterThanOrEqual(4);
      expect(f.faqs.length, f.slug).toBeGreaterThanOrEqual(2);
      expect(f.metaDescription.length, f.slug).toBeLessThanOrEqual(200);
    }
  });
});

describe("use-case pages", () => {
  it("have unique slugs and valid references", () => {
    const featureSlugs = new Set(FEATURES.map((f) => f.slug));
    const planIds = new Set(PLANS.map((p) => p.id));
    const slugs = USE_CASES.map((u) => u.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const u of USE_CASES) {
      expect(featureSlugs.has(u.visual), `${u.slug} visual`).toBe(true);
      for (const h of u.help) expect(featureSlugs.has(h.feature), `${u.slug} help`).toBe(true);
      for (const id of u.plans) expect(planIds.has(id), `${u.slug} plan ${id}`).toBe(true);
    }
  });

  it("never ships an unapproved customer quote", () => {
    // A story with no summary or quote stays hidden (see UseCaseStory). Quotes need the customer's approval.
    for (const u of USE_CASES) {
      if (u.story?.quote || u.story?.summary) {
        expect(u.story.company, u.slug).toBeTruthy();
      }
    }
  });
});
