import { DestinationCarousel } from "@/components/coastlinea/destination-carousel";
import { HeroSection } from "@/components/coastlinea/hero-section";
import { HomepageSections } from "@/components/coastlinea/homepage-sections";
import { SiteHeader } from "@/components/coastlinea/site-header";
import { SiteFooter } from "@/components/coastlinea/site-footer";

export default function Home() {
  return (
    <main className="travel-page">
      <SiteHeader />
      <HeroSection />
      <DestinationCarousel />
      <HomepageSections />
      <SiteFooter />
    </main>
  );
}
