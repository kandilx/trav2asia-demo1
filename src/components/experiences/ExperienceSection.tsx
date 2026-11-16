"use client";

import { useId, useMemo, useState } from "react";
import { ExperienceCard } from "@/components/experiences/ExperienceCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useTrip } from "@/components/trip/TripProvider";
import { categories } from "@/data/destinations";
import { experiences } from "@/data/experiences";
import { countryName, featuredOrder, filterExperiences, sortExperiences } from "@/lib/catalog";
import type { CategoryId, SortOrder } from "@/types/trip";

const sortOptions: { value: SortOrder; label: string }[] = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "duration-asc", label: "Shortest first" },
];

export function ExperienceSection() {
  const { state, setCategory, setQuery, setSort, resetFilters, updateSearch, openExperience } = useTrip();
  const [showAll, setShowAll] = useState(false);
  const sortId = useId();
  const searchId = useId();

  const { destination, travelers } = state.search;
  const filtersActive = destination !== "anywhere" || state.category !== null || state.query.trim() !== "";

  const results = useMemo(() => {
    const filtered = filterExperiences({
      destination,
      category: state.category,
      query: state.query,
      travelers,
    });
    return sortExperiences(filtered, state.sort);
  }, [destination, state.category, state.query, state.sort, travelers]);

  const showingFeaturedOnly = !filtersActive && !showAll;
  const visible = showingFeaturedOnly
    ? sortExperiences(
        results.filter((experience) => featuredOrder.includes(experience.id)),
        "recommended",
      )
    : results;

  const destinationName = destination === "anywhere" ? null : countryName(destination);
  const categoryName = state.category ? categories.find((c) => c.id === state.category)?.label : null;

  function toggleCategory(id: CategoryId) {
    setCategory(state.category === id ? null : id);
  }

  return (
    <section id="experiences" aria-labelledby="experiences-heading" className="scroll-mt-20 bg-paper-deep py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          id="experiences-heading"
          eyebrow="Featured experiences"
          title="Small-group plans, led by locals"
          description={`Browse ${experiences.length} demo experiences across six countries. Prices are in Canadian dollars and show the lowest per-person fare.`}
          align="split"
        />

        <div className="mt-10 grid gap-4 border-y border-ink/15 py-5 md:grid-cols-[1fr_auto] md:items-end">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
              <div className="flex-1">
                <label htmlFor={searchId} className="text-sm font-bold">
                  Search experiences
                </label>
                <input
                  id={searchId}
                  type="search"
                  value={state.query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Try ‘kayak’, ‘Kyoto’ or ‘food’"
                  className="mt-1 block min-h-11 w-full border border-ink/40 bg-paper px-3 text-base placeholder:text-ink-soft/70 focus-visible:outline-offset-2"
                />
              </div>
            </div>

            <div role="group" aria-label="Filter by activity" className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const pressed = state.category === category.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    aria-pressed={pressed}
                    onClick={() => toggleCategory(category.id)}
                    className={`min-h-10 border px-3.5 text-sm font-bold focus-visible:outline-offset-2 ${
                      pressed ? "border-ink bg-ink text-paper" : "border-ink/40 bg-paper hover:border-ink"
                    }`}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>

            {destinationName || categoryName ? (
              <ul aria-label="Active filters" className="flex flex-wrap gap-2 text-sm">
                {destinationName ? (
                  <li>
                    <button
                      type="button"
                      onClick={() => updateSearch({ destination: "anywhere" })}
                      className="inline-flex min-h-9 items-center gap-2 bg-lime px-3 font-bold text-ink focus-visible:outline-offset-2"
                    >
                      {destinationName}
                      <span aria-hidden="true">×</span>
                      <span className="sr-only">Remove destination filter</span>
                    </button>
                  </li>
                ) : null}
                {categoryName ? (
                  <li>
                    <button
                      type="button"
                      onClick={() => setCategory(null)}
                      className="inline-flex min-h-9 items-center gap-2 bg-lime px-3 font-bold text-ink focus-visible:outline-offset-2"
                    >
                      {categoryName}
                      <span aria-hidden="true">×</span>
                      <span className="sr-only">Remove activity filter</span>
                    </button>
                  </li>
                ) : null}
              </ul>
            ) : null}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end md:flex-col md:items-end">
            <div>
              <label htmlFor={sortId} className="text-sm font-bold">
                Sort by
              </label>
              <select
                id={sortId}
                value={state.sort}
                onChange={(event) => setSort(event.target.value as SortOrder)}
                className="mt-1 block min-h-11 w-full border border-ink/40 bg-paper px-3 text-base sm:w-56 focus-visible:outline-offset-2"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            {filtersActive ? (
              <button
                type="button"
                onClick={resetFilters}
                className="min-h-11 px-1 text-sm font-bold text-ink underline underline-offset-4 hover:text-orange-deep focus-visible:outline-offset-2"
              >
                Reset all filters
              </button>
            ) : null}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between" aria-live="polite">
          <p>
            {showingFeaturedOnly
              ? `Showing ${visible.length} of ${experiences.length} experiences`
              : `${results.length} of ${experiences.length} experiences for ${travelers} ${travelers === 1 ? "traveler" : "travelers"}`}
          </p>
          {!filtersActive ? (
            <button
              type="button"
              onClick={() => setShowAll((value) => !value)}
              className="min-h-11 self-start font-bold text-ink underline underline-offset-4 hover:text-orange-deep focus-visible:outline-offset-2 sm:self-auto"
            >
              {showAll ? "Show featured six" : `View all ${experiences.length} experiences`}
            </button>
          ) : null}
        </div>

        {visible.length > 0 ? (
          <ul className="mt-8 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((experience) => (
              <li key={experience.id}>
                <ExperienceCard experience={experience} onOpen={openExperience} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-12 border border-dashed border-ink/40 bg-paper p-8 sm:p-12">
            <h3 className="text-2xl font-bold">No experiences match these filters.</h3>
            <p className="mt-3 max-w-xl text-ink-soft">
              Try a different activity, another country, or fewer travelers. Some experiences only run for a specific
              group size, so a larger or smaller party may remove them from the results.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 min-h-11 bg-ink px-5 font-bold text-paper hover:bg-teal focus-visible:outline-offset-2"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
