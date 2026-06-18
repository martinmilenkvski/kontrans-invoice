import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kontrans.mk";

  const routes = [
    { url: `${baseUrl}`, priority: 1.0 },
    { url: `${baseUrl}/about`, priority: 0.8 },
    { url: `${baseUrl}/contact`, priority: 0.8 },
    { url: `${baseUrl}/services/sea`, priority: 0.9 },
    { url: `${baseUrl}/services/air`, priority: 0.9 },
    { url: `${baseUrl}/services/road`, priority: 0.9 },
  ];

  return routes.map((route) => ({
    url: route.url,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: route.priority,
  }));
}
