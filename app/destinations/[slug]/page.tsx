import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FavoriteButton } from "@/components/coastlinea/favorite-button";
import { Icon } from "@/components/coastlinea/icon";
import { SiteFooter } from "@/components/coastlinea/site-footer";
import { SiteHeader } from "@/components/coastlinea/site-header";
import { destinations, getDestination } from "@/lib/destinations";

type RouteProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return destinations.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) return { title: "Destination guide not found" };
  return {
    title: `${destination.name} Travel Guide`,
    description: destination.description,
    openGraph: { title: `${destination.name} Travel Guide | Coastlinea`, description: destination.description },
  };
}

export default async function DestinationPage({ params }: RouteProps) {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) notFound();

  const related = destinations.filter((item) => item.slug !== destination.slug).slice(0, 3);

  return (
    <main className="subpage-shell">
      <SiteHeader />
      <article className="destination-detail">
        <Link className="back-link" href="/destinations">← All destination guides</Link>
        <div className="detail-hero">
          <Image className="detail-hero-image" src={destination.image} alt={`Illustrative artwork representing ${destination.name}`} fill sizes="(max-width: 900px) 100vw, 70vw" />
          <div className="detail-hero-shade" />
          <div className="detail-hero-copy"><p className="eyebrow">{destination.region}</p><h1>{destination.name}</h1><p>Coastal destination guide</p></div>
          <div className="detail-favorite"><FavoriteButton name={destination.name} /></div>
        </div>
        <p className="image-disclaimer">Illustrative destination artwork, not a documentary photograph.</p>
        <section className="detail-content-grid">
          <div><p className="eyebrow">A place to explore</p><h2>Plan a {destination.sampleDuration} island escape</h2><p className="detail-description">{destination.description}</p><p className="demo-note">This is a planning guide. It does not include live provider schedules, prices, or availability.</p><Link className="plan-button detail-cta" href={`/plan?destination=${destination.slug}`}>Start planning <Icon name="arrow" /></Link></div>
          <aside className="highlight-panel" aria-labelledby="highlights-title"><h2 id="highlights-title">Ideas for your trip</h2><ul>{destination.highlights.map((highlight) => <li key={highlight}><span aria-hidden="true">✓</span>{highlight}</li>)}</ul><p>Confirm current conditions, transport, and local guidance before travel.</p></aside>
        </section>
        <section className="related-section" aria-labelledby="related-title"><div className="section-heading"><div><p className="eyebrow">Keep exploring</p><h2 id="related-title">Related guides</h2></div><Link className="text-link" href="/destinations">All destinations <Icon name="arrow" /></Link></div><div className="related-grid">{related.map((item) => <Link className="related-card" href={`/destinations/${item.slug}`} key={item.slug}><Image src={item.image} alt={`Illustrative artwork for ${item.name}`} fill sizes="(max-width: 620px) 80vw, 30vw" /><span>{item.name}</span></Link>)}</div></section>
      </article>
      <SiteFooter />
    </main>
  );
}
