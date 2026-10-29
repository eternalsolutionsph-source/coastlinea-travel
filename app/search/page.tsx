import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { DestinationGrid } from "@/components/coastlinea/destination-grid";
import { SiteFooter } from "@/components/coastlinea/site-footer";
import { SiteHeader } from "@/components/coastlinea/site-header";
import { destinations } from "@/lib/destinations";

export const metadata: Metadata = {
  title: "Search Destination Guides",
  description: "Search Coastlinea destination guides and start planning a coastal escape.",
  robots: { index: false, follow: true },
};

type SearchProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

async function SearchContent({ searchParams }: SearchProps) {
  const values = await searchParams;
  const destination = typeof values.destination === "string" ? values.destination.trim() : "";
  const date = typeof values.date === "string" ? values.date : "";
  const requestedGuests = Number(typeof values.guests === "string" ? values.guests : 2);
  const guests = Number.isFinite(requestedGuests) ? Math.min(12, Math.max(1, Math.floor(requestedGuests))) : 2;
  const matches = destinations.filter((item) => !destination || `${item.name} ${item.region}`.toLowerCase().includes(destination.toLowerCase()));

  return (
    <main className="subpage-shell">
      <SiteHeader />
      <section className="search-results-page" aria-labelledby="results-title">
        <Link className="back-link" href="/#search">← Edit search</Link>
        <p className="eyebrow">Destination search · Guide results</p>
        <h1 id="results-title">{destination ? `Explore ${destination}` : "Explore coastal escapes"}</h1>
        <p className="page-lede">{matches.length ? `${matches.length} destination ${matches.length === 1 ? "guide" : "guides"} to explore.` : "No destination guides match that search yet."} {date && `Planned date: ${date}. `}{guests} {guests === 1 ? "traveler" : "travelers"} selected.</p>
        <p className="demo-note">These are destination guides, not live trip availability. No booking has been made.</p>
        {matches.length ? <DestinationGrid items={matches} /> : <div className="empty-state"><h2>Try another destination</h2><p>Search El Nido, Siargao, Bohol, Boracay, or Coron.</p><Link className="plan-button" href="/#search">Back to search</Link></div>}
      </section>
      <SiteFooter />
    </main>
  );
}

export default function SearchPage({ searchParams }: SearchProps) {
  return <Suspense fallback={<main className="subpage-shell"><section className="search-results-page"><p className="eyebrow">Destination search</p><h1>Explore coastal escapes</h1><p className="page-lede">Loading destination guides…</p></section></main>}><SearchContent searchParams={searchParams} /></Suspense>;
}
