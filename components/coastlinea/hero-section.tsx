import Image from "next/image";
import { Icon } from "@/components/coastlinea/icon";
import { SearchBar } from "@/components/coastlinea/search-bar";

export function HeroSection() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">Explore <span>•</span> Discover <span>•</span> Belong</p>
        <h1 id="hero-title">Discover<span className="headline-second"><span className="coral-word">Coastal</span> Escapes</span></h1>
        <p className="hero-description">Unforgettable islands, hidden beaches, and amazing<br className="desktop-break" /> experiences across the Philippines and beyond.</p>
      </div>
      <div className="hero-visual">
        <svg className="clip-defs" aria-hidden="true" focusable="false"><defs><clipPath id="hero-image-shape" clipPathUnits="objectBoundingBox"><path d="M .27 0 H .945 C .98 0 1 .04 1 .095 V .725 C 1 .78 .97 .805 .93 .805 H .71 C .655 .805 .63 .84 .63 .91 C .63 .97 .60 1 .55 1 H .08 C .03 1 0 .96 0 .90 V .355 C 0 .29 .04 .245 .10 .245 H .12 C .18 .245 .19 .20 .19 .14 V .105 C .19 .04 .22 0 .27 0 Z" /></clipPath></defs></svg>
        <Image className="hero-photo" src="/images/hero-palawan.png" alt="Lush limestone islands and boats in the turquoise water of El Nido, Palawan" fill sizes="(max-width: 980px) 100vw, 55vw" loading="eager" fetchPriority="high" />
        <div className="traveler-pill">
          <div className="avatar-stack" aria-hidden="true"><span /><span /><span /></div>
          <span><strong>50K+</strong><small>Happy Travelers*</small></span>
        </div>
        <a className="location-pill" href="#destinations"><span className="pin"><Icon name="location" /></span><span><strong>El Nido, Palawan</strong><small>Philippines</small></span><span className="round-arrow"><Icon name="arrow" /></span></a>
      </div>
      <SearchBar />
      <span className="sparkle sparkle-one">✦</span><span className="sparkle sparkle-two">✦</span><span className="sparkle-strokes" aria-hidden="true" />
    </section>
  );
}
