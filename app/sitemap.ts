import type { MetadataRoute } from "next";
import { company } from "@/content/company";
import { postPath, posts } from "@/content/posts";
import { offeredServices } from "@/content/services";

export const dynamic = "force-static";

const contentPages = [
  "/",
  "/services/",
  ...offeredServices.map((service) => `/services/${service.slug}/`),
  "/how-we-engage/",
  "/team/",
  "/blog/",
  "/newsletter/",
  "/partnership/",
  "/press/",
];

const legalPages = ["/privacy-policy/", "/terms-of-use/"];

function asDate(isoDate: string) {
  return new Date(`${isoDate}T00:00:00Z`);
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...contentPages.map((path) => ({ url: `${company.siteUrl}${path}`, lastModified: asDate(company.contentUpdated) })),
    ...posts.map((post) => ({ url: `${company.siteUrl}${postPath(post)}`, lastModified: asDate(post.updated) })),
    ...legalPages.map((path) => ({ url: `${company.siteUrl}${path}`, lastModified: asDate(company.legalUpdated) })),
  ];
}
