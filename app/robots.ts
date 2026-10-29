import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  let validUrl: URL | undefined;
  try {
    validUrl = siteUrl ? new URL(siteUrl) : undefined;
  } catch {
    validUrl = undefined;
  }

  if (!validUrl) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/", disallow: ["/search", "/plan", "/privacy", "/terms"] }, sitemap: new URL("/sitemap.xml", validUrl).toString() };
}
