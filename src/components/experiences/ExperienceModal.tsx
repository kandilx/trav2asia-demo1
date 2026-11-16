"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { TravelerStepper } from "@/components/ui/TravelerStepper";
import { ExperienceImage } from "@/components/ui/ExperienceImage";
import { useTrip, type BookingConfirmation } from "@/components/trip/TripProvider";
import {
  categoryLabel,
  countryName,
  estimateTotal,
  formatCad,
  formatDuration,
  formatPrice,
  formatTripDate,
  getExperience,
  todayIso,
} from "@/lib/catalog";
import type { Experience } from "@/types/trip";

function createReference(): string {
  return `DEMO-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export function ExperienceModal() {
  const { state, closeExperience, updateSearch, confirmBooking, clearBooking } = useTrip();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const experience = state.selectedId ? getExperience(state.selectedId) : undefined;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (experience && !dialog.open) {
      returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      dialog.showModal();
      document.documentElement.classList.add("modal-open");
    } else if (!experience && dialog.open) {
      dialog.close();
    }
  }, [experience]);

  useEffect(() => {
    if (experience) return;
    document.documentElement.classList.remove("modal-open");
    const opener = returnFocusRef.current;
    returnFocusRef.current = null;
    if (opener && opener.isConnected) {
      opener.focus();
    }
  }, [experience]);

  function handleClose() {
    closeExperience();
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={experience ? "modal-title" : undefined}
      aria-label={experience ? undefined : "Experience details"}
      onClose={handleClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current?.close();
      }}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[min(100%-2rem,56rem)] overflow-y-auto bg-paper p-0 text-ink shadow-2xl backdrop:bg-ink/70"
    >
      {experience ? (
        <ModalBody
          key={experience.id}
          experience={experience}
          travelers={state.search.travelers}
          startDate={state.search.startDate}
          confirmation={state.confirmation}
          onClose={() => dialogRef.current?.close()}
          onDateChange={(date) => {
            clearBooking();
            updateSearch({ startDate: date || null, endDate: date || null });
          }}
          onTravelersChange={(travelers) => {
            clearBooking();
            updateSearch({ travelers });
          }}
          onConfirm={confirmBooking}
        />
      ) : null}
    </dialog>
  );
}

interface ModalBodyProps {
  experience: Experience;
  travelers: number;
  startDate: string | null;
  confirmation: BookingConfirmation | null;
  onClose: () => void;
  onDateChange: (date: string) => void;
  onTravelersChange: (travelers: number) => void;
  onConfirm: (confirmation: BookingConfirmation) => void;
}

function ModalBody({
  experience,
  travelers,
  startDate,
  confirmation,
  onClose,
  onDateChange,
  onTravelersChange,
  onConfirm,
}: ModalBodyProps) {
  const [startTime, setStartTime] = useState(experience.startTimes[0] ?? "");
  const [formError, setFormError] = useState<string | null>(null);
  const today = todayIso();
  const fitsGroup = travelers >= experience.groupSize.min && travelers <= experience.groupSize.max;
  const total = estimateTotal(experience.priceCad, travelers);
  const confirmed = confirmation?.experienceId === experience.id ? confirmation : null;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!startDate) {
      setFormError("Choose a date for your demo booking.");
      return;
    }
    if (startDate < today) {
      setFormError("Choose today or a later date.");
      return;
    }
    if (!fitsGroup) {
      setFormError(
        `This experience runs for ${experience.groupSize.min} to ${experience.groupSize.max} travelers. Adjust the traveler count to continue.`,
      );
      return;
    }
    setFormError(null);
    onConfirm({
      experienceId: experience.id,
      reference: createReference(),
      date: startDate,
      startTime,
      travelers,
      totalCad: total,
    });
  }

  const inputClass = "mt-1 block min-h-11 w-full border border-ink/40 bg-paper px-3 text-base focus-visible:outline-offset-2";

  return (
    <div className="grid lg:grid-cols-[1.05fr_1fr]">
      <div className="relative min-h-64 lg:min-h-full">
        <ExperienceImage
          src={experience.image}
          alt={experience.imageAlt}
          fallbackLabel={countryName(experience.destinationId)}
          sizes="(min-width: 1024px) 480px, 100vw"
          className="aspect-[4/3] w-full lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
        />
      </div>

      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <p className="text-xs font-bold tracking-[0.14em] text-teal uppercase">
            {countryName(experience.destinationId)} · {experience.city} · {categoryLabel(experience.category)}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="-mt-2 -mr-2 inline-flex size-11 shrink-0 items-center justify-center text-2xl hover:text-orange-deep focus-visible:outline-offset-2"
          >
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close experience details</span>
          </button>
        </div>

        <h2 id="modal-title" className="mt-3 text-3xl leading-tight font-bold text-balance">
          {experience.title}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-ink-soft">{experience.description}</p>

        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-ink/15 py-5 text-sm">
          <div>
            <dt className="font-bold">Duration</dt>
            <dd className="text-ink-soft">{formatDuration(experience.durationMinutes)}</dd>
          </div>
          <div>
            <dt className="font-bold">Group size</dt>
            <dd className="text-ink-soft">
              {experience.groupSize.min} to {experience.groupSize.max} travelers
            </dd>
          </div>
          <div>
            <dt className="font-bold">Meeting point</dt>
            <dd className="text-ink-soft">{experience.meetingPoint}</dd>
          </div>
          <div>
            <dt className="font-bold">Languages</dt>
            <dd className="text-ink-soft">{experience.languages.join(", ")}</dd>
          </div>
        </dl>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-bold">Included</h3>
            <ul className="mt-2 list-disc space-y-1 ps-5 text-sm text-ink-soft">
              {experience.inclusions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold">Not included</h3>
            <ul className="mt-2 list-disc space-y-1 ps-5 text-sm text-ink-soft">
              {experience.exclusions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-8 border-t border-ink/15 pt-6">
          <p className="text-sm font-bold">Demo booking</p>
          <p className="mt-1 text-sm text-ink-soft">
            This is a frontend demo. Availability is not checked and no payment is taken.
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="modal-date" className="text-sm font-bold">
                Date
              </label>
              <input
                id="modal-date"
                type="date"
                min={today}
                value={startDate ?? ""}
                onChange={(event) => onDateChange(event.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="modal-time" className="text-sm font-bold">
                Start time
              </label>
              <select
                id="modal-time"
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
                className={inputClass}
              >
                {experience.startTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <span id="modal-travelers-label" className="text-sm font-bold">
              Travelers
            </span>
            <div className="mt-1">
              <TravelerStepper
                value={travelers}
                onChange={onTravelersChange}
                labelId="modal-travelers-label"
                idPrefix="modal"
              />
            </div>
            {!fitsGroup ? (
              <p className="mt-2 text-sm text-orange-deep">
                This experience needs {experience.groupSize.min} to {experience.groupSize.max} travelers.
              </p>
            ) : null}
          </div>

          <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-ink/15 pt-5">
            <div>
              <p className="text-sm text-ink-soft">{formatPrice(experience.priceCad)}</p>
              <p className="text-2xl font-bold">
                Demo estimate: {formatCad(total)}
              </p>
              <p className="text-xs text-ink-soft">
                {travelers} × {formatCad(experience.priceCad)}, before taxes and fees. Not a quote.
              </p>
            </div>
            <button
              type="submit"
              className="min-h-12 bg-ink px-6 font-bold text-paper hover:bg-teal focus-visible:outline-offset-2"
            >
              Confirm demo booking
            </button>
          </div>

          {formError ? (
            <p role="alert" className="mt-4 text-sm font-bold text-orange-deep">
              {formError}
            </p>
          ) : null}
        </form>

        {confirmed ? (
          <div role="status" className="mt-6 border-l-4 border-lime bg-paper-deep p-4">
            <p className="font-bold">Demo confirmation. No booking was made and no payment was taken.</p>
            <p className="mt-1 text-sm text-ink-soft">
              Reference {confirmed.reference} for {confirmed.travelers}{" "}
              {confirmed.travelers === 1 ? "traveler" : "travelers"} on {formatTripDate(confirmed.date)} at{" "}
              {confirmed.startTime}. Total estimate {formatCad(confirmed.totalCad)}.
            </p>
          </div>
        ) : null}

        <p className="mt-6 text-xs text-ink-soft">
          Demo rating {experience.demoRating.toFixed(1)} from {experience.demoReviewCount} fictional reviews.
        </p>
      </div>
    </div>
  );
}
