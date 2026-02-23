import { describe, expect, it } from "vitest";

import {
  GUIDE_LEXICON,
  getGuideArticleBySlug,
  getGuideArticles,
  getGuideArticlesByTag,
  getGuideBeginnerPath,
  getGuideTagLabel
} from "@/lib/guide-content";

describe("guide content", () => {
  it("provides at least five guide articles for MVP", () => {
    const articles = getGuideArticles();
    expect(articles.length).toBeGreaterThanOrEqual(5);
  });

  it("finds a guide article by slug", () => {
    const article = getGuideArticleBySlug("parcours-debutant-mtl");
    expect(article?.title).toContain("Parcours debutant");
  });

  it("returns beginner path ordered by step", () => {
    const path = getGuideBeginnerPath();
    const steps = path.map((article) => article.beginnerStep);

    expect(steps).toEqual([1, 2, 3, 4, 5]);
  });

  it("filters articles by tag", () => {
    const maintenanceArticles = getGuideArticlesByTag("entretien");

    expect(maintenanceArticles.length).toBeGreaterThan(0);
    expect(maintenanceArticles.every((article) => article.tags.includes("entretien"))).toBe(true);
  });

  it("exposes human labels for tags", () => {
    expect(getGuideTagLabel("materiel-mtl")).toBe("Materiel MTL");
    expect(getGuideTagLabel("e-liquide")).toBe("E-liquide");
  });

  it("contains lexicon entries for beginner reading", () => {
    expect(GUIDE_LEXICON.length).toBeGreaterThanOrEqual(4);
    expect(GUIDE_LEXICON.some((entry) => entry.term === "MTL")).toBe(true);
  });
});
