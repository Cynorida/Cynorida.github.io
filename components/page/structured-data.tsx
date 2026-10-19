import { company } from "@/content/company";

export const organizationId = `${company.siteUrl}/#organization`;
export const websiteId = `${company.siteUrl}/#website`;

export function absoluteUrl(path: string) {
  return `${company.siteUrl}${path}`;
}

export type Crumb = {
  name: string;
  path: string;
};

export function breadcrumbData(crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...crumbs].map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

type StructuredDataProps = {
  data: Record<string, unknown>[];
};

export function StructuredData({ data }: StructuredDataProps) {
  const graph = { "@context": "https://schema.org", "@graph": data };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
