import type { ComponentType } from "react";

export type PostSource = {
  label: string;
  href: string;
};

export type PostFact = {
  label: string;
  value: string;
};

export type PostSection = {
  id: string;
  title: string;
};

export type PostPoster = {
  src: string;
  download: string;
  width: number;
  height: number;
  alt: string;
};

export type Post = {
  slug: string;
  title: string;
  description: string;
  category: string;
  severity: "Critical" | "High" | "Medium" | "Low" | null;
  published: string;
  updated: string;
  author: string;
  summary: string;
  facts: PostFact[];
  sections: PostSection[];
  poster: PostPoster | null;
  shareImage: string;
  sources: PostSource[];
  relatedServices: string[];
  tags: string[];
  Body: ComponentType;
};
