interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  id: string;
  description?: string;
  align?: "left" | "split";
}

export function SectionHeading({ eyebrow, title, id, description, align = "left" }: SectionHeadingProps) {
  return (
    <div className={align === "split" ? "grid gap-6 md:grid-cols-[1fr_minmax(0,28rem)] md:items-end" : "max-w-2xl"}>
      <div>
        <p className="text-xs font-bold tracking-[0.18em] text-teal uppercase">{eyebrow}</p>
        <h2 id={id} tabIndex={-1} className="mt-3 text-4xl leading-[1.02] font-bold tracking-tight text-balance sm:text-5xl">
          {title}
        </h2>
      </div>
      {description ? <p className="text-base leading-relaxed text-ink-soft sm:text-lg">{description}</p> : null}
    </div>
  );
}
