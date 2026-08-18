import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.hibishotelsandresorts.com";
  const routes = [
    "",
    "/morjim",
    "/ashwem",
    "/katra",
    "/faridabad",
    "/rooms",
    "/experiences",
    "/wellness",
    "/dining",
    "/offers",
    "/gallery",
    "/about",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
