import Image from "next/image";

export function BrandMark() {
  return (
    <Image
      className="brand-logo"
      src="/coastlinea-logo-transparent.png"
      alt="Coastlinea"
      width={280}
      height={93}
      loading="eager"
      fetchPriority="high"
    />
  );
}
