import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coastlinea | Discover Coastal Escapes",
  description: "Find unforgettable islands, hidden beaches, and coastal adventures across the Philippines.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
