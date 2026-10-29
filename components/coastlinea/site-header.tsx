import { BrandMark } from "@/components/coastlinea/brand-mark";
import { Icon } from "@/components/coastlinea/icon";

const links = ["Destinations", "Experiences", "Travel Guide", "About", "Contact"];

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Coastlinea home">
        <BrandMark />
      </a>
      <nav className="main-nav" aria-label="Main navigation">
        {links.map((link, index) => <a className={index === 0 ? "active" : ""} href="#destinations" key={link}>{link}</a>)}
      </nav>
      <a className="plan-button" href="#search">Plan Your Trip <Icon name="arrow" /></a>
    </header>
  );
}
