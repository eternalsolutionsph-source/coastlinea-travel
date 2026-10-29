"use client";

import Image from "next/image";
import { useState } from "react";
import { destinations } from "@/lib/destinations";
import { Icon } from "@/components/coastlinea/icon";

export function DestinationCarousel() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [offset, setOffset] = useState(0);
  const ordered = [...destinations.slice(offset), ...destinations.slice(0, offset)];

  function shift(direction: number) {
    setOffset((current) => (current + direction + destinations.length) % destinations.length);
  }

  function toggleFavorite(name: string) {
    setFavorites((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name]);
  }

  return (
    <section className="destinations-section" id="destinations" aria-labelledby="destinations-title">
      <div className="section-heading">
        <div><p className="eyebrow">Popular Destinations</p><h2 id="destinations-title">Handpicked for Your Next Adventure</h2></div>
        <div className="carousel-controls"><button type="button" onClick={() => shift(-1)} aria-label="Previous destinations"><Icon name="arrow" /></button><button type="button" onClick={() => shift(1)} aria-label="Next destinations"><Icon name="arrow" /></button></div>
      </div>
      <div className="destination-grid">
        {ordered.map((destination) => {
          const favorite = favorites.includes(destination.name);
          return <article className="destination-card" key={destination.name}>
            <Image className="card-photo" src={destination.image} alt={`${destination.name}, Philippines`} fill sizes="(max-width: 540px) 210px, (max-width: 980px) 230px, 20vw" />
            <button type="button" className={`favorite-button ${favorite ? "is-favorite" : ""}`} onClick={() => toggleFavorite(destination.name)} aria-label={`${favorite ? "Remove" : "Add"} ${destination.name} ${favorite ? "from" : "to"} favorites`}><Icon name="heart" /></button>
            <div className="card-copy"><h3>{destination.name}</h3><p className="card-location"><Icon name="location" />{destination.region}</p><p className="card-rating"><span>★</span><strong>{destination.rating}</strong><small>({destination.reviews})</small></p></div>
            <a className="card-arrow" href="#search" aria-label={`Explore ${destination.name}`}><Icon name="arrow" /></a>
          </article>;
        })}
      </div>
      <p className="sample-disclaimer">* Images are illustrative; traveler count, ratings, and reviews are sample UI data.</p>
    </section>
  );
}
