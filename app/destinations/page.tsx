import type { Metadata } from "next";
import Link from "next/link";
import { DestinationGrid } from "@/components/coastlinea/destination-grid";
import { SiteFooter } from "@/components/coastlinea/site-footer";
import { SiteHeader } from "@/components/coastlinea/site-header";
import { destinations } from "@/lib/destinations";

export const metadata: Metadata = {
  title: "Destination Guides",
  description: "Browse illustrative destination guides for coastal escapes around the Philippines.",
};

export default function DestinationsPage() {
  return (
    <main className="subpage-shell">
      <SiteHeader />
      <section className="directory-page" aria-labelledby="directory-title">
        <Link className="back-link" href="/">← Back to Coastlinea</Link>
        <p className="eyebrow">Explore the Philippines</p>
        <h1 id="directory-title">Destination guides</h1>
        <p className="page-lede">Start with a place that speaks to you. Images are illustrative, and trip details should be confirmed with local providers.</p>
        <DestinationGrid items={destinations} />
      </section>
      <SiteFooter />
    </main>
  );
}
