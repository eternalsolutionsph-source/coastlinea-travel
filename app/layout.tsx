import type { Metadata } from "next";
import "./globals.css";

const productionUrl = process.env.NEXT_PUBLIC_SITE_URL;
let metadataBase: URL | undefined;
try {
  metadataBase = productionUrl ? new URL(productionUrl) : undefined;
} catch {
  metadataBase = undefined;
}

export const metadata: Metadata = {
  metadataBase,
  title: { default: "Coastlinea | Discover Coastal Escapes", template: "%s | Coastlinea" },
  description: "Explore destination guides and plan a coastal escape across the Philippines.",
  applicationName: "Coastlinea",
  openGraph: {
    type: "website",
    siteName: "Coastlinea",
    title: "Coastlinea | Discover Coastal Escapes",
    description: "Explore destination guides and plan a coastal escape across the Philippines.",
    ...(metadataBase ? { images: [{ url: "/images/hero-palawan.png", width: 1536, height: 1024, alt: "Illustrative coastal artwork for Coastlinea" }] } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: "Coastlinea | Discover Coastal Escapes",
    description: "Explore destination guides and plan a coastal escape across the Philippines.",
    ...(metadataBase ? { images: ["/images/hero-palawan.png"] } : {}),
  },
  robots: { index: Boolean(metadataBase), follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
