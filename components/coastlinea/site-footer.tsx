import Link from "next/link";
import { BrandMark } from "@/components/coastlinea/brand-mark";

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-brand"><Link className="footer-logo-link" href="/" aria-label="Coastlinea home"><BrandMark /></Link><p>Destination inspiration for coastal escapes across the Philippines.</p><p className="footer-contact-note">Business contact details will be added when configured.</p></div>
      <div className="footer-links">
        <div><strong>Explore</strong><Link href="/destinations">Destinations</Link><Link href="/#experiences">Experiences</Link><Link href="/#travel-guide">Travel Guide</Link></div>
        <div><strong>Coastlinea</strong><Link href="/#about">About</Link><Link href="/plan">Plan a trip</Link><Link href="/#contact">Contact</Link></div>
        <div><strong>Information</strong><Link href="/privacy">Privacy note</Link><Link href="/terms">Demo terms</Link></div>
      </div>
      <div className="footer-bottom"><span>© 2026 Coastlinea</span><span>Frontend demo · No live bookings or provider connections</span></div>
    </footer>
  );
}
