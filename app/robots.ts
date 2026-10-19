import type { MetadataRoute } from "next";
import { company } from "@/content/company";

export const dynamic = "force-static";

const searchAndAnswerBots = [
  "Googlebot",
  "Bingbot",
  "Applebot",
  "DuckDuckBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: searchAndAnswerBots, allow: "/" },
      { userAgent: "Bytespider", disallow: "/" },
    ],
    sitemap: `${company.siteUrl}/sitemap.xml`,
    host: company.siteUrl,
  };
}
