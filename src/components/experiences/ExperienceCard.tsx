import { ExperienceImage } from "@/components/ui/ExperienceImage";
import { categoryLabel, countryName, formatDuration, formatPrice } from "@/lib/catalog";
import type { Experience } from "@/types/trip";

interface ExperienceCardProps {
  experience: Experience;
  onOpen: (id: string) => void;
}

export function ExperienceCard({ experience, onOpen }: ExperienceCardProps) {
  const headingId = `exp-${experience.id}-title`;
  return (
    <article aria-labelledby={headingId} className="group flex flex-col">
      <button
        type="button"
        onClick={() => onOpen(experience.id)}
        aria-describedby={`${headingId}-meta`}
        className="block w-full text-left focus-visible:outline-offset-4"
      >
        <ExperienceImage
          src={experience.image}
          alt={experience.imageAlt}
          fallbackLabel={countryName(experience.destinationId)}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          imageClassName="transition-transform"
        />
      </button>
      <div className="flex flex-1 flex-col pt-4">
        <p id={`${headingId}-meta`} className="text-xs font-bold tracking-[0.14em] text-teal uppercase">
          {countryName(experience.destinationId)} · {experience.city} · {categoryLabel(experience.category)}
        </p>
        <h3 id={headingId} className="mt-2 text-xl leading-snug font-bold">
          <button
            type="button"
            onClick={() => onOpen(experience.id)}
            className="text-left underline-offset-4 decoration-2 group-hover:underline focus-visible:outline-offset-2"
          >
            {experience.title}
          </button>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{experience.description}</p>
        <div className="mt-auto flex items-end justify-between gap-4 pt-5">
          <div>
            <p className="text-lg font-bold">{formatPrice(experience.priceCad)}</p>
            <p className="text-sm text-ink-soft">
              {formatDuration(experience.durationMinutes)} · Demo rating {experience.demoRating.toFixed(1)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpen(experience.id)}
            className="inline-flex min-h-11 shrink-0 items-center border border-ink px-4 text-sm font-bold hover:bg-ink hover:text-paper focus-visible:outline-offset-2"
          >
            Book now<span className="sr-only"> {experience.title}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
