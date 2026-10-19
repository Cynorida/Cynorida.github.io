import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Arrow } from "@/components/brand/arrow";
import { ArticleFacts } from "@/components/article/article-facts";
import { ArticleSources } from "@/components/article/article-sources";
import { DateStamp } from "@/components/company/dates";
import { incidentHref } from "@/components/page/contact-links";
import { PageHeader } from "@/components/page/page-header";
import { pageMetadata } from "@/components/page/page-metadata";
import { PageShell } from "@/components/page/page-shell";
import {
  StructuredData,
  absoluteUrl,
  breadcrumbData,
  organizationId,
  websiteId,
} from "@/components/page/structured-data";
import { PolicyLayout } from "@/components/policy/policy-layout";
import { company } from "@/content/company";
import { findPost, postPath, posts } from "@/content/posts";
import { findOfferedService } from "@/content/services";
import "@/components/article/article.css";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: postPath(post),
    type: "article",
    image: { url: post.shareImage.src, width: post.shareImage.width, height: post.shareImage.height, alt: post.poster?.alt ?? post.title },
    article: {
      publishedTime: post.published,
      modifiedTime: post.updated,
      authors: [post.author],
      tags: post.tags,
    },
  });
}

const severityTags: Record<string, string> = {
  Critical: "tag tag--high",
  High: "tag tag--high",
  Medium: "tag tag--medium",
  Low: "tag tag--info",
};

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) notFound();

  const path = postPath(post);
  const url = absoluteUrl(path);
  const relatedServices = post.relatedServices.flatMap((serviceSlug) => findOfferedService(serviceSlug) ?? []);
  const { Body } = post;

  return (
    <PageShell>
      <StructuredData
        data={[
          {
            "@type": "NewsArticle",
            "@id": `${url}#article`,
            headline: post.title,
            description: post.description,
            abstract: post.summary,
            url,
            mainEntityOfPage: url,
            datePublished: post.published,
            dateModified: post.updated,
            articleSection: post.category,
            keywords: post.tags,
            inLanguage: "en",
            image: [absoluteUrl(post.shareImage.src), ...(post.poster ? [absoluteUrl(post.poster.download)] : [])],
            author: {
              "@type": "Organization",
              name: post.author,
              url: absoluteUrl("/blog/"),
              parentOrganization: { "@id": organizationId },
            },
            publisher: { "@id": organizationId },
            isPartOf: { "@id": websiteId },
            citation: post.sources.map((source) => source.href),
          },
          ...(post.poster
            ? [
                {
                  "@type": "ImageObject",
                  "@id": `${url}#poster`,
                  contentUrl: absoluteUrl(post.poster.download),
                  thumbnailUrl: absoluteUrl(post.poster.src),
                  caption: post.poster.alt,
                  creator: { "@id": organizationId },
                  copyrightNotice: company.brandName,
                },
              ]
            : []),
          breadcrumbData([
            { name: "Blog", path: "/blog/" },
            { name: post.title, path },
          ]),
        ]}
      />
      <PageHeader
        eyebrow={`Blog · ${post.category}`}
        title={post.title}
        lede={post.description}
        meta={
          <span className="article-byline">
            {post.severity ? <span className={severityTags[post.severity]}>{post.severity}</span> : null}
            <span>By {post.author}</span>
            <span>
              Published <DateStamp value={post.published} />
            </span>
            {post.updated !== post.published ? (
              <span>
                Updated <DateStamp value={post.updated} />
              </span>
            ) : null}
          </span>
        }
      />

      <ArticleFacts facts={post.facts} />

      <PolicyLayout sections={[{ id: "summary", title: "In short" }, ...post.sections]}>
        <aside className="article-summary" aria-labelledby="summary">
          <h2 id="summary" className="article-summary__title">
            In short
          </h2>
          <p>{post.summary}</p>
        </aside>
        <Body />
        <ArticleSources sources={post.sources} />
        {relatedServices.length > 0 ? (
          <aside className="article-related" aria-labelledby="related-title">
            <h2 id="related-title" className="article-related__title">
              Need help with this?
            </h2>
            <p>
              If this touches your organisation and you want a second pair of hands, these are the services that fit. Active
              incident? Email <a href={incidentHref}>{company.emails.security}</a>.
            </p>
            <ul className="article-related__list">
              {relatedServices.map((service) => (
                <li key={service.slug}>
                  <a className="text-link" href={`/services/${service.slug}/`}>
                    {service.name}
                    <Arrow />
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
        <ul className="article-tags" aria-label="Tags">
          {post.tags.map((tag) => (
            <li key={tag} className="tag">
              {tag}
            </li>
          ))}
        </ul>
      </PolicyLayout>
    </PageShell>
  );
}
