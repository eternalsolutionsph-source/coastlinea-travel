import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/coastlinea/site-footer";
import { SiteHeader } from "@/components/coastlinea/site-header";

export const metadata: Metadata = { title: "Privacy Note", robots: { index: false, follow: true } };

export default function PrivacyPage() {
  return <main className="subpage-shell"><SiteHeader /><article className="policy-page"><p className="eyebrow">Demo information</p><h1>Privacy note</h1><p>This Coastlinea frontend demo does not send trip searches or traveler details to a booking service. The trip planning preview keeps information only in page state and clears it when you leave.</p><p>Saved destinations are stored in local browser storage on this device. You can remove a saved place with its heart button or clear this site’s storage in your browser settings.</p><p>This note is not a complete legal privacy policy. A reviewed policy, data retention rules, and contact details are required before collecting information from real travelers.</p><Link className="text-link" href="/">Back to Coastlinea</Link></article><SiteFooter /></main>;
}
