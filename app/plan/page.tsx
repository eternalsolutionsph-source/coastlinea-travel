import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingWizard } from "@/components/coastlinea/booking-wizard";
import { SiteFooter } from "@/components/coastlinea/site-footer";
import { SiteHeader } from "@/components/coastlinea/site-header";
import { getDestination } from "@/lib/destinations";

export const metadata: Metadata = {
  title: "Plan a Trip",
  description: "Create a local trip planning preview with Coastlinea. Live booking and payment services are not connected.",
  robots: { index: false, follow: true },
};

type PlanProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

async function PlanContent({ searchParams }: PlanProps) {
  const query = await searchParams;
  const requestedSlug = typeof query.destination === "string" ? query.destination : "";
  const initialDestination = getDestination(requestedSlug)?.slug ?? "";

  return (
    <main className="subpage-shell">
      <SiteHeader />
      <section className="plan-page" aria-labelledby="plan-title">
        <p className="eyebrow">Trip planning · Frontend demo</p>
        <h1 id="plan-title">Shape your coastal escape</h1>
        <p className="page-lede">Build a trip preview in a few steps. This form does not submit bookings or collect payment.</p>
        <BookingWizard initialDestination={initialDestination} />
      </section>
      <SiteFooter />
    </main>
  );
}

export default function PlanPage({ searchParams }: PlanProps) {
  return <Suspense fallback={<main className="subpage-shell"><section className="plan-page"><p className="eyebrow">Trip planning</p><h1>Shape your coastal escape</h1><p className="page-lede">Loading your planning preview…</p></section></main>}><PlanContent searchParams={searchParams} /></Suspense>;
}
