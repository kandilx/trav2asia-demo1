import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    title: "Choose a country or activity",
    body: "Start from a destination on the map of six countries, or from one of five activity types.",
  },
  {
    title: "Set your dates and group",
    body: "Pick a date and the number of travelers. Experiences that cannot take your group size are hidden from the results.",
  },
  {
    title: "Review the details",
    body: "Open an experience to see the duration, meeting point, inclusions, exclusions and a total estimate.",
  },
  {
    title: "Confirm the demo booking",
    body: "The demo records a reference number on screen. No booking is made and no payment is taken.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="scroll-mt-20 bg-paper-deep py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading id="how-heading" eyebrow="How it works" title="Four steps from search to demo confirmation" />
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, index) => (
            <li key={step.title} className="border-t-2 border-ink pt-5">
              <span className="text-sm font-bold text-teal">Step {index + 1}</span>
              <h3 className="mt-3 text-xl leading-snug font-bold">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
