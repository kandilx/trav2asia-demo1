import Link from "next/link";
import { ExperienceImage } from "@/components/ui/ExperienceImage";
import { SearchForm } from "@/components/search/SearchForm";

const tiles = [
  {
    src: "/images/hero-2.jpg",
    alt: "Mount Batur rising above a caldera lake at sunrise, with hikers on the rim in Bali",
    label: "Indonesia",
    className: "col-span-1 row-span-2 sm:col-span-2 sm:row-span-6",
  },
  {
    src: "/images/hero-4.jpg",
    alt: "A potter spinning a clay bowl on a wheel in India",
    label: "India",
    className: "col-span-1 row-span-2 sm:col-span-4 sm:row-span-3",
  },
  {
    src: "/images/hero-1.jpg",
    alt: "A chef cooking wagyu at a lit teppan counter in a Japanese food stall at night",
    label: "Japan",
    className: "hidden sm:block sm:col-span-2 sm:row-span-3",
  },
  {
    src: "/images/hero-3.jpg",
    alt: "A vendor grilling skewers at a lit night street stall in Thailand",
    label: "Thailand",
    className: "hidden sm:block sm:col-span-2 sm:row-span-3",
  },
];

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="pt-24 pb-16 sm:pt-28 lg:pb-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-bold tracking-[0.2em] text-teal uppercase">Six countries. Eighteen experiences.</p>
            <h1
              id="hero-heading"
              className="mt-5 text-[2.9rem] leading-[0.95] font-bold tracking-tight text-balance sm:text-6xl lg:text-[4.25rem]"
            >
              Go beyond <span className="font-hand text-[1.18em] font-semibold text-orange-deep">the postcard.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
              Street food walks, pottery studios and sunrise hikes, with the price and group size shown up front.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#experiences"
                className="inline-flex min-h-12 items-center justify-center bg-ink px-6 text-base font-bold text-paper hover:bg-teal focus-visible:outline-offset-2"
              >
                Explore experiences
              </Link>
              <Link
                href="#destinations"
                className="inline-flex min-h-12 items-center justify-center border border-ink px-6 text-base font-bold text-ink hover:bg-ink hover:text-paper focus-visible:outline-offset-2"
              >
                Discover destinations
              </Link>
            </div>
          </div>

          <div className="grid h-[25rem] grid-cols-2 grid-rows-2 gap-3 sm:h-[32rem] sm:grid-cols-6 sm:grid-rows-6 lg:col-span-7 lg:h-[36rem]">
            {tiles.map((tile, index) => (
              <div key={tile.src} className={`relative ${tile.className}`}>
                <ExperienceImage
                  src={tile.src}
                  alt={tile.alt}
                  fallbackLabel={tile.label}
                  sizes="(min-width: 1024px) 40vw, (min-width: 640px) 60vw, 50vw"
                  priority={index === 0}
                  className="h-full w-full"
                />
                <span className="absolute bottom-3 left-3 bg-paper px-2.5 py-1 text-[0.7rem] font-bold tracking-[0.14em] uppercase">
                  {tile.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 lg:mt-14">
          <SearchForm />
        </div>
      </div>
    </section>
  );
}
