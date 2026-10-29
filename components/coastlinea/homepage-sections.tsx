import Link from "next/link";
import Image from "next/image";
import { destinations } from "@/lib/destinations";
import { Icon } from "@/components/coastlinea/icon";

export function HomepageSections() {
  return (
    <>
      <section className="experience-section" id="experiences" aria-labelledby="experiences-title">
        <div className="section-intro"><p className="eyebrow">Find your kind of escape</p><h2 id="experiences-title">More than one way to meet the coast</h2><p>Browse ideas for slow beach days, island-hopping routes, and time outdoors.</p></div>
        <div className="experience-grid">
          <article className="experience-card"><span className="experience-number">01</span><h3>Island days</h3><p>Plan a relaxed day around beaches, coves, and time on the water.</p></article>
          <article className="experience-card"><span className="experience-number">02</span><h3>Nature escapes</h3><p>Mix coastal scenery with inland landscapes and easy day trips.</p></article>
          <article className="experience-card"><span className="experience-number">03</span><h3>Local routes</h3><p>Use each destination guide to sketch a trip that fits your pace.</p></article>
        </div>
      </section>

      <section className="package-section" id="travel-guide" aria-labelledby="package-title">
        <div className="section-heading secondary-heading">
          <div><p className="eyebrow">Planning examples · Demo content</p><h2 id="package-title">A few ways to start planning</h2></div>
          <p className="section-note">These sample itineraries are ideas only. Prices, schedules, and availability are not connected.</p>
        </div>
        <div className="package-grid">
          {destinations.slice(0, 3).map((destination) => (
            <article className="package-card" key={destination.slug}>
              <Link className="package-photo-link" href={`/destinations/${destination.slug}`} aria-label={`View ${destination.name} guide`}>
                <Image src={destination.image} alt={`Illustrative artwork for ${destination.name}`} fill sizes="(max-width: 620px) 88vw, (max-width: 980px) 45vw, 30vw" />
              </Link>
              <div className="package-copy"><p className="eyebrow">Sample itinerary · {destination.sampleDuration} plan</p><h3>{destination.name} Island Escape</h3><p>{destination.highlights.slice(0, 2).join(" · ")}</p><Link className="text-link" href={`/destinations/${destination.slug}`}>View destination guide <Icon name="arrow" /></Link></div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section" id="about" aria-labelledby="about-title">
        <div className="about-mark" aria-hidden="true">C</div>
        <div><p className="eyebrow">About Coastlinea</p><h2 id="about-title">A calmer way to explore the islands</h2><p>Coastlinea is a destination discovery frontend for planning coastal escapes. Explore the guides, save places you like, and shape an itinerary at your own pace.</p><p className="demo-note">Search and saved destinations work in this browser. Live booking, travel-provider availability, and customer support are not connected yet.</p></div>
      </section>

      <section className="faq-section" aria-labelledby="faq-title">
        <div className="section-intro"><p className="eyebrow">Good to know</p><h2 id="faq-title">Planning questions</h2></div>
        <div className="faq-list">
          <details><summary>Can I book a trip on Coastlinea?</summary><p>Not yet. This site is a frontend demo and does not send bookings or take payments.</p></details>
          <details><summary>Are dates, prices, and availability live?</summary><p>No. Search lets you explore destination guides, but live travel inventory and prices are not connected.</p></details>
          <details><summary>Can I save destinations?</summary><p>Yes. Use the heart button on a destination card. Saved places stay in this browser on this device.</p></details>
          <details><summary>Are the destination images photographs?</summary><p>No. The current destination artwork is illustrative and should be replaced with licensed location photography before launch.</p></details>
        </div>
      </section>

      <section className="closing-cta" aria-labelledby="closing-title">
        <div><p className="eyebrow">Your next escape</p><h2 id="closing-title">Your Next Adventure Starts Here</h2><p>Explore beautiful destinations and start planning your perfect escape.</p></div>
        <Link className="plan-button" href="/destinations">Explore Destinations <Icon name="arrow" /></Link>
      </section>

    </>
  );
}
