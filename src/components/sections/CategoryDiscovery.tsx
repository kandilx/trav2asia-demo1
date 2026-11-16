"use client";

import { useTrip } from "@/components/trip/TripProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categories } from "@/data/destinations";
import { countForCategory } from "@/lib/catalog";
import type { CategoryId } from "@/types/trip";

const blurbs: Record<CategoryId, string> = {
  "food-drink": "Street stalls, market kitchens and cooking classes with a local host.",
  culture: "Workshops, old quarters and temple-side walks that explain the place.",
  adventure: "Kayaks, bikes and volcano hikes. Most suit a moderate fitness level.",
  nature: "Rice terraces, mangroves and sunrise viewpoints away from the crowds.",
  nightlife: "Evening food trails and night markets, usually ending before midnight.",
};

export function CategoryDiscovery() {
  const { setCategory } = useTrip();

  return (
    <section id="activities" aria-labelledby="activities-heading" className="scroll-mt-20 border-t border-ink/15 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          id="activities-heading"
          eyebrow="Activity categories"
          title="Pick an activity type, then a city"
          description="Each category opens the experience list already filtered, so you can compare options side by side."
        />

        <ul className="mt-12 grid gap-px border border-ink/15 bg-ink/15 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => (
            <li key={category.id} className="bg-paper">
              <a
                href="#experiences"
                onClick={() => setCategory(category.id)}
                className="flex h-full min-h-56 flex-col justify-between p-6 hover:bg-paper-deep focus-visible:outline-offset-[-4px]"
              >
                <span className="text-sm font-bold text-teal">{countForCategory(category.id)} experiences</span>
                <span className="mt-8">
                  <span className="block text-2xl leading-tight font-bold">{category.label}</span>
                  <span className="mt-3 block text-sm leading-relaxed text-ink-soft">{blurbs[category.id]}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
