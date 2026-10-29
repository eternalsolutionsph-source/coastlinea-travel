import type { MetadataRoute } from "next";
import { destinations } from "@/lib/destinations";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  let base: URL | undefined;
  try {
    base = siteUrl ? new URL(siteUrl) : undefined;
  } catch {
    base = undefined;
  }
  if (!base) return [];

  const routes = ["", "/destinations", ...destinations.map(({ slug }) => `/destinations/${slug}`)];
  return routes.map((route) => ({ url: new URL(route, base).toString(), changeFrequency: route === "" ? "weekly" : "monthly", priority: route === "" ? 1 : 0.7 }));
}
