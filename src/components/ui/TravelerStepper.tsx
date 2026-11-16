import { Minus, Plus } from "lucide-react";
import { MAX_TRAVELERS, MIN_TRAVELERS } from "@/lib/catalog";

interface TravelerStepperProps {
  value: number;
  onChange: (value: number) => void;
  labelId: string;
  idPrefix: string;
}

export function TravelerStepper({ value, onChange, labelId, idPrefix }: TravelerStepperProps) {
  const atMin = value <= MIN_TRAVELERS;
  const atMax = value >= MAX_TRAVELERS;
  const buttonClass =
    "flex h-11 w-11 items-center justify-center border border-ink text-ink transition-colors duration-(--duration-ui) hover:bg-ink hover:text-paper focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:border-ink/30 disabled:text-ink/35 disabled:hover:bg-transparent disabled:hover:text-ink/35";

  return (
    <div className="flex items-center gap-3" role="group" aria-labelledby={labelId}>
      <button
        type="button"
        className={buttonClass}
        onClick={() => onChange(Math.max(MIN_TRAVELERS, value - 1))}
        disabled={atMin}
        aria-label="Remove one traveler"
        aria-controls={`${idPrefix}-count`}
      >
        <Minus aria-hidden="true" className="h-4 w-4" />
      </button>
      <output
        id={`${idPrefix}-count`}
        aria-live="polite"
        className="min-w-[4.5rem] text-center text-base font-semibold tabular-nums"
      >
        {value} {value === 1 ? "traveler" : "travelers"}
      </output>
      <button
        type="button"
        className={buttonClass}
        onClick={() => onChange(Math.min(MAX_TRAVELERS, value + 1))}
        disabled={atMax}
        aria-label="Add one traveler"
        aria-controls={`${idPrefix}-count`}
      >
        <Plus aria-hidden="true" className="h-4 w-4" />
      </button>
    </div>
  );
}
