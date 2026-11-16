"use client";

import { useTrip } from "@/components/trip/TripProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExperienceImage } from "@/components/ui/ExperienceImage";
import { destinations } from "@/data/destinations";
import { countForDestination } from "@/lib/catalog";
import type { CountryId } from "@/types/trip";

const layout: Record<CountryId, string> = {
  japan: "sm:col-span-2 sm:row-span-2 aspect-[4/3] sm:aspect-auto",
  china: "aspect-[4/5]",
  india: "aspect-[4/5] sm:mt-16",
  indonesia: "aspect-[4/3] sm:col-span-2",
  malaysia: "aspect-[4/5]",
  thailand: "aspect-[4/3] sm:col-span-2 sm:mt-8",
};

export function ExploreAsia() {
  const { updateSearch } = useTrip();

  return (
    <section id="destinations" aria-labelledby="destinations-heading" className="scroll-mt-20 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          id="destinations-heading"
          eyebrow="Explore Asia"
          title="Six countries, one local guide each"
          description="Pick a country to see its demo experiences. Each one is listed with the same clear price and duration."
          align="split"
        />

        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4 sm:gap-x-5 sm:gap-y-8">
          {destinations.map((destination) => (
            <li key={destination.id} className={`${layout[destination.id]} min-w-0`}>
              <a
                href="#experiences"
                onClick={() => updateSearch({ destination: destination.id })}
                aria-label={`${destination.country}: see ${countForDestination(destination.id)} experiences`}
                className="group relative flex h-full flex-col focus-visible:outline-offset-4"
              >
                <ExperienceImage
                  src={destination.image}
                  alt={destination.imageAlt}
                  fallbackLabel={destination.country}
                  sizes="(min-width: 640px) 25vw, 50vw"
                  className="min-h-56 w-full flex-1 transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <span className="mt-3 flex flex-wrap items-baseline justify-between gap-x-2">
                  <span className="text-2xl font-bold">{destination.country}</span>
                  <span className="text-sm text-ink-soft">{countForDestination(destination.id)} experiences</span>
                </span>
                <span className="mt-1 text-sm leading-snug text-ink-soft">{destination.tagline}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
