import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/coastlinea/site-footer";
import { SiteHeader } from "@/components/coastlinea/site-header";

export const metadata: Metadata = { title: "Demo Terms", robots: { index: false, follow: true } };

export default function TermsPage() {
  return <main className="subpage-shell"><SiteHeader /><article className="policy-page"><p className="eyebrow">Demo information</p><h1>Demo terms</h1><p>Coastlinea currently provides destination discovery and trip planning previews only. It does not sell travel, reserve inventory, accept payment, or confirm bookings.</p><p>Destination text and itinerary ideas are informational. Confirm current travel conditions, transport, provider schedules, prices, and local requirements directly with trusted providers before making plans.</p><p>These notes are not a complete set of service terms. Reviewed booking, cancellation, and traveler support policies must be published before the service accepts real reservations.</p><Link className="text-link" href="/">Back to Coastlinea</Link></article><SiteFooter /></main>;
}
