import type { MetadataRoute } from "next";
import { company } from "@/content/company";
import { offeredServices } from "@/content/services";

const pages = [
  "/",
  "/services/",
  ...offeredServices.map((service) => `/services/${service.slug}/`),
  "/how-we-engage/",
  "/team/",
  "/blog/", "/newsletter/", "/partnership/", "/press/", "/privacy-policy/", "/terms-of-use/",
];

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(`${company.legalUpdated}T00:00:00Z`);
  return pages.map((path) => ({ url: `${company.siteUrl}${path}`, lastModified }));
}
