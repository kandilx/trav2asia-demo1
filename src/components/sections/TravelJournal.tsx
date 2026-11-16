import { ExperienceImage } from "@/components/ui/ExperienceImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { journalEntries } from "@/data/editorial";

export function TravelJournal() {
  return (
    <section id="journal" aria-labelledby="journal-heading" className="scroll-mt-20 border-t border-ink/15 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          id="journal-heading"
          eyebrow="Travel journal"
          title="Notes on eating, buying and paddling well"
          description="Short guides from the Trav2Asia team, written for this demo."
        />

        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {journalEntries.map((entry) => (
            <article key={entry.id}>
              <ExperienceImage
                src={entry.image}
                alt={entry.imageAlt}
                fallbackLabel={entry.kicker}
                sizes="(min-width: 768px) 33vw, 100vw"
                className="aspect-[4/3] w-full"
              />
              <p className="mt-5 text-xs font-bold tracking-[0.14em] text-teal uppercase">
                {entry.kicker} · {entry.readMinutes} min read
              </p>
              <h3 className="mt-2 text-xl leading-snug font-bold">{entry.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{entry.excerpt}</p>
              <details className="group mt-4">
                <summary className="cursor-pointer text-sm font-bold underline underline-offset-4 hover:text-orange-deep focus-visible:outline-offset-2">
                  Read the note
                </summary>
                <div className="mt-3 space-y-3 text-sm leading-relaxed">
                  {entry.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </details>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
