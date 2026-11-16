"use client";

import { useTrip } from "@/components/trip/TripProvider";
import { ExperienceImage } from "@/components/ui/ExperienceImage";
import { countryName, formatCad, formatDuration, getExperience } from "@/lib/catalog";

const spotlightId = "bali-sunrise-volcano-hike";

export function SignatureSpotlight() {
  const { openExperience } = useTrip();
  const experience = getExperience(spotlightId);
  if (!experience) return null;

  return (
    <section aria-labelledby="spotlight-heading" className="bg-ink py-20 text-paper lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-14 lg:px-10">
        <div className="lg:col-span-7">
          <ExperienceImage
            src={experience.image}
            alt={experience.imageAlt}
            fallbackLabel={countryName(experience.destinationId)}
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="aspect-[4/3] w-full"
          />
        </div>
        <div className="lg:col-span-5">
          <p className="text-xs font-bold tracking-[0.18em] text-lime uppercase">Signature experience</p>
          <h2 id="spotlight-heading" className="mt-3 text-4xl leading-[1.02] font-bold tracking-tight text-balance sm:text-5xl">
            Start before the sun, on the rim of Mount Batur.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-paper/80 sm:text-lg">{experience.description}</p>

          <ul className="mt-6 space-y-2 text-sm text-paper/80">
            {experience.highlights.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="mt-2 inline-block h-px w-4 shrink-0 bg-lime" />
                {item}
              </li>
            ))}
          </ul>

          <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-paper/20 py-5">
            <div>
              <dt className="text-xs text-paper/70">From</dt>
              <dd className="text-xl font-bold">{formatCad(experience.priceCad)}</dd>
            </div>
            <div>
              <dt className="text-xs text-paper/70">Duration</dt>
              <dd className="text-xl font-bold">{formatDuration(experience.durationMinutes)}</dd>
            </div>
            <div>
              <dt className="text-xs text-paper/70">Group</dt>
              <dd className="text-xl font-bold">
                Up to {experience.groupSize.max}
              </dd>
            </div>
          </dl>

          <button
            type="button"
            onClick={() => openExperience(spotlightId)}
            className="mt-8 min-h-12 bg-orange px-6 font-bold text-ink hover:bg-paper focus-visible:outline-paper focus-visible:outline-offset-2"
          >
            View details and demo booking
          </button>
        </div>
      </div>
    </section>
  );
}
