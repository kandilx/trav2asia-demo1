import { categories, destinations } from "@/data/destinations";
import { experiences } from "@/data/experiences";
import type { CategoryId, CountryId, Experience, SortOrder } from "@/types/trip";

export const MIN_TRAVELERS = 1;
export const MAX_TRAVELERS = 10;

/** Six experiences that span six countries and five activity types for the default view. */
export const featuredOrder: string[] = [
  "kyoto-hidden-lanes-street-food",
  "shanghai-old-streets-food-walk",
  "jaipur-heritage-artisan-walk",
  "penang-street-art-food-walk",
  "ubud-rice-terraces-village-walk",
  "krabi-island-kayak-adventure",
];

export interface CatalogFilters {
  destination: CountryId | "anywhere";
  category: CategoryId | null;
  query: string;
  travelers: number;
}

export function getExperience(id: string): Experience | undefined {
  return experiences.find((experience) => experience.id === id);
}

export function countryName(id: CountryId): string {
  return destinations.find((destination) => destination.id === id)?.country ?? id;
}

export function categoryLabel(id: CategoryId): string {
  return categories.find((category) => category.id === id)?.label ?? id;
}

export function formatPrice(priceCad: number): string {
  return `From CA$${priceCad} / person`;
}

export function formatCad(amount: number): string {
  return `CA$${amount.toLocaleString("en-CA")}`;
}

export function formatDuration(minutes: number): string {
  const hours = minutes / 60;
  if (Number.isInteger(hours)) {
    return hours === 1 ? "1 hour" : `${hours} hours`;
  }
  return `${hours.toFixed(1)} hours`;
}

export function formatTripDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-CA", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function todayIso(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

export function estimateTotal(priceCad: number, travelers: number): number {
  return priceCad * travelers;
}

export function priceRange(): { min: number; max: number } {
  const prices = experiences.map((experience) => experience.priceCad);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

export function countForDestination(id: CountryId): number {
  return experiences.filter((experience) => experience.destinationId === id).length;
}

export function countForCategory(id: CategoryId): number {
  return experiences.filter((experience) => experience.category === id).length;
}

function matchesQuery(experience: Experience, query: string): boolean {
  const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return true;
  const haystack = [
    experience.title,
    experience.city,
    experience.description,
    countryName(experience.destinationId),
    categoryLabel(experience.category),
  ]
    .join(" ")
    .toLowerCase();
  return tokens.every((token) => haystack.includes(token));
}

export function filterExperiences(filters: CatalogFilters): Experience[] {
  return experiences.filter((experience) => {
    if (filters.destination !== "anywhere" && experience.destinationId !== filters.destination) return false;
    if (filters.category && experience.category !== filters.category) return false;
    if (filters.travelers < experience.groupSize.min || filters.travelers > experience.groupSize.max) return false;
    return matchesQuery(experience, filters.query);
  });
}

export function sortExperiences(list: Experience[], sort: SortOrder): Experience[] {
  const copy = [...list];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.priceCad - b.priceCad);
    case "price-desc":
      return copy.sort((a, b) => b.priceCad - a.priceCad);
    case "duration-asc":
      return copy.sort((a, b) => a.durationMinutes - b.durationMinutes);
    case "recommended":
    default: {
      const rank = (id: string) => {
        const index = featuredOrder.indexOf(id);
        return index === -1 ? Number.MAX_SAFE_INTEGER : index;
      };
      return copy.sort((a, b) => rank(a.id) - rank(b.id));
    }
  }
}
