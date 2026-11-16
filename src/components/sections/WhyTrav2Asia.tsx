import { SectionHeading } from "@/components/ui/SectionHeading";

const reasons = [
  {
    title: "Hosts who run the experience",
    body: "Every listing names the person or team who leads it. Their background is in the description, not in a generic brand blurb.",
  },
  {
    title: "Small groups by default",
    body: "Each experience lists a minimum and maximum group size. If your party does not fit, the listing says so before you choose a date.",
  },
  {
    title: "Prices shown up front",
    body: "Prices are in Canadian dollars per person, with inclusions and exclusions on the same screen. Taxes and fees are called out where they apply.",
  },
];

export function WhyTrav2Asia() {
  return (
    <section id="why-trav2asia" aria-labelledby="why-heading" className="scroll-mt-20 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading
              id="why-heading"
              eyebrow="Why Trav2Asia"
              title="Hosts, group sizes and prices on one screen"
            />
            <p className="mt-6 text-base leading-relaxed text-ink-soft sm:text-lg">
              Trav2Asia is a fictional demo platform. It shows how a local-experience marketplace could present
              its listings, with the same care for price, group size and place that the best travel guides bring to a
              destination.
            </p>
          </div>
          <ol className="divide-y divide-ink/15 border-y border-ink/15 lg:col-span-7">
            {reasons.map((reason, index) => (
              <li key={reason.title} className="grid gap-3 py-7 sm:grid-cols-[4rem_1fr] sm:gap-6">
                <span className="font-hand text-4xl leading-none text-orange-deep" aria-hidden="true">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-xl font-bold">{reason.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{reason.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
