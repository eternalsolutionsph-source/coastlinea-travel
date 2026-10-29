export type Destination = {
  slug: string;
  name: string;
  region: string;
  image: string;
  description: string;
  highlights: string[];
  sampleDuration: string;
};

export const destinations: Destination[] = [
  {
    slug: "el-nido",
    name: "El Nido",
    region: "Palawan, Philippines",
    image: "/images/el-nido.png",
    description: "Discover limestone islands, clear lagoons, and quiet coves around northern Palawan. This guide is a starting point for planning an island escape.",
    highlights: ["Limestone island scenery", "Lagoons and sheltered coves", "Island-hopping routes"],
    sampleDuration: "4-day",
  },
  {
    slug: "siargao",
    name: "Siargao",
    region: "Surigao del Norte, Philippines",
    image: "/images/siargao.png",
    description: "A laid-back island known for surf breaks, palm-lined roads, and a network of smaller islands and lagoons to explore.",
    highlights: ["Surfing and coastal views", "Palm-lined island routes", "Nearby lagoons and islets"],
    sampleDuration: "4-day",
  },
  {
    slug: "bohol",
    name: "Bohol",
    region: "Central Visayas, Philippines",
    image: "/images/bohol.png",
    description: "Pair Bohol’s distinctive inland landscapes with relaxed days along its coast and nearby islands.",
    highlights: ["Chocolate Hills landscape", "River and countryside routes", "Panglao beaches and reefs"],
    sampleDuration: "3-day",
  },
  {
    slug: "boracay",
    name: "Boracay",
    region: "Aklan, Philippines",
    image: "/images/boracay.png",
    description: "Plan a beach escape with long shoreline walks, calm-water activities, and sunset views along White Beach.",
    highlights: ["White Beach shoreline", "Calm-water activities", "Sunset walks"],
    sampleDuration: "3-day",
  },
  {
    slug: "coron",
    name: "Coron",
    region: "Palawan, Philippines",
    image: "/images/coron.png",
    description: "Explore island scenery and clear water around Coron, with time for coves, viewpoints, and marine life.",
    highlights: ["Limestone islands", "Lakes and coastal coves", "Snorkeling and reef scenery"],
    sampleDuration: "4-day",
  },
];

export function getDestination(slug: string) {
  return destinations.find((destination) => destination.slug === slug);
}
