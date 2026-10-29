import Link from "next/link";
import { SiteFooter } from "@/components/coastlinea/site-footer";
import { SiteHeader } from "@/components/coastlinea/site-header";

export default function NotFound() {
  return <main className="subpage-shell"><SiteHeader /><section className="empty-state not-found-page"><p className="eyebrow">Page not found</p><h1>Let’s find another coast.</h1><p>That page or destination guide is not available.</p><Link className="plan-button" href="/destinations">Browse destinations</Link></section><SiteFooter /></main>;
}
