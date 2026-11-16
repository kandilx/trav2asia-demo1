"use client";

import { useTrip } from "@/components/trip/TripProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { travelerStories } from "@/data/editorial";
import { countryName, getExperience } from "@/lib/catalog";

export function TravelerStories() {
  const { openExperience } = useTrip();

  return (
    <section id="stories" aria-labelledby="stories-heading" className="scroll-mt-20 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          id="stories-heading"
          eyebrow="Traveler stories"
          title="What a good day looks like"
          description="These are fictional demo stories written for this prototype. They are not real customer reviews."
        />

        <ul className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {travelerStories.map((story) => {
            const experience = getExperience(story.experienceId);
            return (
              <li key={story.id} className="flex flex-col border-l-2 border-orange ps-6">
                <blockquote className="flex-1">
                  <p className="text-lg leading-relaxed">“{story.quote}”</p>
                </blockquote>
                <footer className="mt-6 text-sm">
                  <p className="font-bold">{story.name}</p>
                  <p className="text-ink-soft">{story.home}</p>
                </footer>
                {experience ? (
                  <button
                    type="button"
                    onClick={() => openExperience(experience.id)}
                    className="mt-5 self-start text-sm font-bold underline underline-offset-4 hover:text-orange-deep focus-visible:outline-offset-2"
                  >
                    About this experience: {experience.title}
                    <span className="sr-only"> in {countryName(experience.destinationId)}</span>
                  </button>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
