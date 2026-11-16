"use client";

import { useId, useState, useSyncExternalStore, type FormEvent } from "react";
import { destinations } from "@/data/destinations";
import { TravelerStepper } from "@/components/ui/TravelerStepper";
import { todayIso, formatTripDate } from "@/lib/catalog";
import { useTrip } from "@/components/trip/TripProvider";
import type { CountryId } from "@/types/trip";

const fieldClass =
  "mt-2 w-full border border-ink bg-paper px-3 py-3 text-base text-ink focus-visible:outline-offset-2 disabled:opacity-60";
const labelClass = "block text-xs font-bold tracking-[0.14em] uppercase";

export function SearchForm() {
  const { state, updateSearch } = useTrip();
  const { search } = state;
  const ids = {
    destination: useId(),
    start: useId(),
    end: useId(),
    travelers: useId(),
    error: useId(),
  };
  const [error, setError] = useState<string | null>(null);
  const today = useSyncExternalStore(
    () => () => {},
    todayIso,
    () => "",
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (search.startDate && search.startDate < todayIso()) {
      setError("Choose today or a later date.");
      return;
    }
    if (search.startDate && search.endDate && search.endDate < search.startDate) {
      setError("The end date must be on or after the start date.");
      return;
    }
    setError(null);
    const results = document.getElementById("experiences");
    results?.scrollIntoView({ behavior: "smooth", block: "start" });
    document.getElementById("experiences-heading")?.focus({ preventScroll: true });
  }

  const destinationName =
    search.destination === "anywhere"
      ? "Anywhere in Asia"
      : (destinations.find((d) => d.id === search.destination)?.country ?? "Anywhere in Asia");

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Search experiences"
      className="border border-ink bg-paper p-5 shadow-[6px_6px_0_0_var(--ink)] sm:p-6"
    >
      <div className="grid gap-5 md:grid-cols-[1.25fr_1fr_1fr]">
        <div>
          <label htmlFor={ids.destination} className={labelClass}>
            Destination
          </label>
          <select
            id={ids.destination}
            className={fieldClass}
            value={search.destination}
            onChange={(event) => updateSearch({ destination: event.target.value as CountryId | "anywhere" })}
          >
            <option value="anywhere">Anywhere in Asia</option>
            {destinations.map((destination) => (
              <option key={destination.id} value={destination.id}>
                {destination.country}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={ids.start} className={labelClass}>
            Start date
          </label>
          <input
            id={ids.start}
            type="date"
            min={today}
            className={fieldClass}
            value={search.startDate ?? ""}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? ids.error : undefined}
            onChange={(event) => updateSearch({ startDate: event.target.value || null })}
          />
        </div>

        <div>
          <label htmlFor={ids.end} className={labelClass}>
            End date <span className="font-normal normal-case tracking-normal text-ink-soft">(optional)</span>
          </label>
          <input
            id={ids.end}
            type="date"
            min={search.startDate ?? today}
            className={fieldClass}
            value={search.endDate ?? ""}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? ids.error : undefined}
            onChange={(event) => updateSearch({ endDate: event.target.value || null })}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-5 border-t border-ink/15 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p id={ids.travelers} className={labelClass}>
            Travelers
          </p>
          <div className="mt-2">
            <TravelerStepper
              value={search.travelers}
              onChange={(travelers) => updateSearch({ travelers })}
              labelId={ids.travelers}
              idPrefix="search-travelers"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:items-end">
          <p className="text-sm text-ink-soft" aria-live="polite">
            {destinationName}
            {search.startDate ? `, from ${formatTripDate(search.startDate)}` : ""}
            {search.startDate && search.endDate ? ` to ${formatTripDate(search.endDate)}` : ""}
          </p>
          <button
            type="submit"
            className="inline-flex min-h-12 items-center justify-center bg-orange px-7 py-3 text-base font-bold text-ink transition-colors duration-(--duration-ui) hover:bg-orange-deep hover:text-paper focus-visible:outline-offset-2"
          >
            Search experiences
          </button>
        </div>
      </div>

      {error ? (
        <p id={ids.error} role="alert" className="mt-4 border-l-4 border-orange-deep pl-3 text-sm font-semibold text-orange-deep">
          {error}
        </p>
      ) : null}
    </form>
  );
}
