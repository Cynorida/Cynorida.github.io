import type { Metadata } from "next";
import { company } from "@/content/company";

export const shareImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Cynorida: cybersecurity protection, testing and incident response",
};

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: typeof shareImage;
  article?: {
    publishedTime: string;
    modifiedTime: string;
    authors: string[];
    tags: string[];
  };
};

export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  image = shareImage,
  article,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: company.brandName,
      locale: "en_US",
      url: path,
      title,
      description,
      images: [image],
      ...article,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
