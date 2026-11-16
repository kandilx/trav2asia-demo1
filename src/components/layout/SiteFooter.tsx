import Link from "next/link";
import { Wordmark } from "@/components/ui/Wordmark";

export function FinalCta() {
  return (
    <section id="plan" aria-labelledby="cta-heading" className="bg-orange py-20 lg:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-bold tracking-[0.18em] text-ink uppercase">Ready when you are</p>
          <h2 id="cta-heading" className="mt-3 text-4xl leading-[1.02] font-bold tracking-tight text-balance sm:text-6xl">
            Pick a city. Bring your appetite.
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink">
            Browse the demo catalogue of 18 experiences. Nothing here is a real booking.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="#experiences"
            className="inline-flex min-h-12 items-center justify-center bg-ink px-6 font-bold text-paper hover:bg-teal focus-visible:outline-ink focus-visible:outline-offset-2"
          >
            Browse experiences
          </Link>
          <Link
            href="#top"
            className="inline-flex min-h-12 items-center justify-center border border-ink px-6 font-bold text-ink hover:bg-ink hover:text-paper focus-visible:outline-ink focus-visible:outline-offset-2"
          >
            Back to top
          </Link>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr] lg:px-10">
        <div>
          <Wordmark className="text-paper" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/75">
            Trav2Asia is a fictional platform built as a frontend demo. It does not sell tickets, take payments or hold
            live inventory.
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="text-xs font-bold tracking-[0.14em] text-lime uppercase">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href="#destinations" className="hover:text-lime focus-visible:outline-paper">
                Destinations
              </a>
            </li>
            <li>
              <a href="#experiences" className="hover:text-lime focus-visible:outline-paper">
                Experiences
              </a>
            </li>
            <li>
              <a href="#journal" className="hover:text-lime focus-visible:outline-paper">
                Travel journal
              </a>
            </li>
          </ul>
        </nav>
        <div>
          <p className="text-xs font-bold tracking-[0.14em] text-lime uppercase">Demo notes</p>
          <ul className="mt-4 space-y-2 text-sm text-paper/75">
            <li>Traveler stories are fictional.</li>
            <li>Photos are licensed under the Pexels License.</li>
            <li>See the README for asset and licence details.</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-paper/15">
        <p className="mx-auto max-w-7xl px-5 py-5 text-xs text-paper/70 sm:px-8 lg:px-10">
          Trav2Asia demo. All prices are in Canadian dollars and are not real offers.
        </p>
      </div>
    </footer>
  );
}
