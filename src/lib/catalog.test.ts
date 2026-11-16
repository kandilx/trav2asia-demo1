import { describe, expect, it } from "vitest";
import { experiences } from "@/data/experiences";
import { featuredOrder, filterExperiences, sortExperiences } from "@/lib/catalog";
import type { CatalogFilters } from "@/lib/catalog";

const allTravelers: CatalogFilters = { destination: "anywhere", category: null, query: "", travelers: 2 };

describe("filterExperiences", () => {
  it("only returns experiences whose group size range includes the traveler count", () => {
    const results = filterExperiences({ ...allTravelers, travelers: 6 });
    expect(results.length).toBeGreaterThan(0);
    for (const experience of results) {
      expect(experience.groupSize.min).toBeLessThanOrEqual(6);
      expect(experience.groupSize.max).toBeGreaterThanOrEqual(6);
    }
  });

  it("combines destination and category filters", () => {
    const results = filterExperiences({ ...allTravelers, destination: "japan", category: "food-drink" });
    expect(results.length).toBeGreaterThan(0);
    for (const experience of results) {
      expect(experience.destinationId).toBe("japan");
      expect(experience.category).toBe("food-drink");
    }
  });

  it("requires every search token to match, ignoring case", () => {
    const results = filterExperiences({ ...allTravelers, query: "BALI volcano" });
    expect(results.map((experience) => experience.id)).toEqual(["bali-sunrise-volcano-hike"]);
    expect(filterExperiences({ ...allTravelers, query: "bali zzz-no-match" })).toHaveLength(0);
  });
});

describe("sortExperiences", () => {
  it("sorts by price ascending without mutating the input", () => {
    const input = [...experiences];
    const sorted = sortExperiences(input, "price-asc");
    const prices = sorted.map((experience) => experience.priceCad);
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
    expect(input).toEqual(experiences);
  });

  it("puts the featured six first in recommended order", () => {
    const sorted = sortExperiences(experiences, "recommended");
    expect(sorted.slice(0, featuredOrder.length).map((experience) => experience.id)).toEqual(featuredOrder);
  });
});
