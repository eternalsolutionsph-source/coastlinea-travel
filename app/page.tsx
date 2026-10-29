import { DestinationCarousel } from "@/components/coastlinea/destination-carousel";
import { HeroSection } from "@/components/coastlinea/hero-section";
import { SiteHeader } from "@/components/coastlinea/site-header";

export default function Home() {
  return (
    <main className="travel-page">
      <SiteHeader />
      <HeroSection />
      <DestinationCarousel />
    </main>
  );
}
