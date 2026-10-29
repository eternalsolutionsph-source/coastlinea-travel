import Image from "next/image";
import Link from "next/link";
import type { Destination } from "@/lib/destinations";
import { FavoriteButton } from "@/components/coastlinea/favorite-button";
import { Icon } from "@/components/coastlinea/icon";

export function DestinationGrid({ items }: { items: Destination[] }) {
  return (
    <div className="destination-directory-grid">
      {items.map((destination) => (
        <article className="directory-card" key={destination.slug}>
          <Link className="directory-image" href={`/destinations/${destination.slug}`}>
            <Image src={destination.image} alt={`Illustrative artwork for ${destination.name}`} fill sizes="(max-width: 620px) 88vw, (max-width: 980px) 45vw, 30vw" />
          </Link>
          <FavoriteButton name={destination.name} />
          <div className="directory-copy"><p className="eyebrow">{destination.region}</p><h2><Link href={`/destinations/${destination.slug}`}>{destination.name}</Link></h2><p>{destination.description}</p><Link className="text-link" href={`/destinations/${destination.slug}`}>Explore guide <Icon name="arrow" /></Link></div>
        </article>
      ))}
    </div>
  );
}
