export type Destination = {
  name: string;
  region: string;
  rating: string;
  reviews: string;
  image: string;
};

export const destinations: Destination[] = [
  { name: "El Nido", region: "Palawan, Philippines", rating: "4.9", reviews: "2.1K reviews", image: "/images/el-nido.png" },
  { name: "Siargao", region: "Surigao, Philippines", rating: "4.8", reviews: "1.6K reviews", image: "/images/siargao.png" },
  { name: "Bohol", region: "Philippines", rating: "4.8", reviews: "1.3K reviews", image: "/images/bohol.png" },
  { name: "Boracay", region: "Aklan, Philippines", rating: "4.7", reviews: "1.1K reviews", image: "/images/boracay.png" },
  { name: "Coron", region: "Palawan, Philippines", rating: "4.8", reviews: "980 reviews", image: "/images/coron.png" },
];
