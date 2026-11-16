export type CountryId =
  | "china"
  | "japan"
  | "india"
  | "malaysia"
  | "indonesia"
  | "thailand";

export type CategoryId = "food-drink" | "culture" | "adventure" | "nature" | "nightlife";

export interface Category {
  id: CategoryId;
  label: string;
}

export interface Destination {
  id: CountryId;
  country: string;
  featuredCity: string;
  tagline: string;
  image: string;
  imageAlt: string;
}

export interface Experience {
  id: string;
  title: string;
  destinationId: CountryId;
  city: string;
  category: CategoryId;
  durationMinutes: number;
  priceCad: number;
  description: string;
  /** Null when no approved photo matches the listing; the UI shows a typographic fallback. */
  image: string | null;
  imageAlt: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  groupSize: { min: number; max: number };
  meetingPoint: string;
  languages: string[];
  startTimes: string[];
  /** Fictional rating and review count, disclosed as demo data. */
  demoRating: number;
  demoReviewCount: number;
}

export interface TravelerStory {
  id: string;
  name: string;
  home: string;
  experienceId: string;
  quote: string;
}

export interface JournalEntry {
  id: string;
  kicker: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  body: string[];
  readMinutes: number;
}

export interface SearchState {
  destination: CountryId | "anywhere";
  startDate: string | null;
  endDate: string | null;
  travelers: number;
}

export type SortOrder = "recommended" | "price-asc" | "price-desc" | "duration-asc";
