"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { destinations } from "@/lib/destinations";
import { FavoriteButton } from "@/components/coastlinea/favorite-button";
import { Icon } from "@/components/coastlinea/icon";

export function DestinationCarousel() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const ordered = [...destinations.slice(offset), ...destinations.slice(0, offset)];

  function shift(direction: number) {
    setOffset((current) => (current + direction + destinations.length) % destinations.length);
    gridRef.current?.scrollBy({ left: direction * 280, behavior: "smooth" });
  }

  return (
    <section className="destinations-section" id="destinations" aria-labelledby="destinations-title">
      <div className="section-heading">
        <div><p className="eyebrow">Popular Destinations</p><h2 id="destinations-title">Handpicked for Your Next Adventure</h2></div>
        <div className="carousel-controls" aria-label="Destination carousel controls">
          <button type="button" onClick={() => shift(-1)} aria-label="Previous destinations"><Icon name="arrow" /></button>
          <button type="button" onClick={() => shift(1)} aria-label="Next destinations"><Icon name="arrow" /></button>
        </div>
      </div>
      <div className="destination-grid" ref={gridRef}>
        {ordered.map((destination) => (
          <article className="destination-card" key={destination.slug}>
            <Image className="card-photo" src={destination.image} alt={`Illustrative coastal artwork for ${destination.name}`} fill sizes="(max-width: 620px) 82vw, (max-width: 1200px) 280px, 20vw" />
            <Link className="destination-card-link" href={`/destinations/${destination.slug}`} aria-label={`Explore ${destination.name}`} />
            <FavoriteButton name={destination.name} />
            <div className="card-copy"><h3>{destination.name}</h3><p className="card-location"><Icon name="location" />{destination.region}</p><span className="card-guide-label">Explore guide</span></div>
            <Link className="card-arrow" href={`/destinations/${destination.slug}`} aria-label={`View ${destination.name} guide`}><Icon name="arrow" /></Link>
          </article>
        ))}
      </div>
      <p className="sample-disclaimer">Images are illustrative guides to these destinations. No ratings or reviews are displayed without verified data.</p>
    </section>
  );
}
