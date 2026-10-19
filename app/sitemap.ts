import type { MetadataRoute } from "next";
import { company } from "@/content/company";
import { offeredServices } from "@/content/services";

const pages = [
  "",
  "/services",
  "/how-we-engage",
  "/about",
  "/team",
  "/research",
  "/news",
  "/contact",
  "/security",
  "/security/disclosure",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(`${company.legalUpdated}T00:00:00Z`);
  return [
    ...pages.map((path) => ({ url: `${company.siteUrl}${path}`, lastModified })),
    ...offeredServices.map((service) => ({
      url: `${company.siteUrl}/services/${service.slug}`,
      lastModified,
    })),
  ];
}
