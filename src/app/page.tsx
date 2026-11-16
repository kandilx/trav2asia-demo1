import { CategoryDiscovery } from "@/components/sections/CategoryDiscovery";
import { ExploreAsia } from "@/components/sections/ExploreAsia";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { SignatureSpotlight } from "@/components/sections/SignatureSpotlight";
import { TravelJournal } from "@/components/sections/TravelJournal";
import { TravelerStories } from "@/components/sections/TravelerStories";
import { WhyTrav2Asia } from "@/components/sections/WhyTrav2Asia";
import { ExperienceModal } from "@/components/experiences/ExperienceModal";
import { ExperienceSection } from "@/components/experiences/ExperienceSection";
import { TripProvider } from "@/components/trip/TripProvider";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { FinalCta, SiteFooter } from "@/components/layout/SiteFooter";

export default function Home() {
  return (
    <TripProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-paper focus:px-4 focus:py-2 focus:font-bold"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <ExploreAsia />
        <ExperienceSection />
        <CategoryDiscovery />
        <SignatureSpotlight />
        <WhyTrav2Asia />
        <HowItWorks />
        <TravelerStories />
        <TravelJournal />
        <FinalCta />
      </main>
      <SiteFooter />
      <ExperienceModal />
    </TripProvider>
  );
}
