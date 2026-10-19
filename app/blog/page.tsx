import { EntryList } from "@/components/company/entry-list";
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
import { postPath, posts } from "@/content/posts";
import "@/components/company/company.css";

export const metadata = pageMetadata({
  title: "Blog",
  description:
    "Research, case studies and guides written by the Cynorida team on detection, incident response and offensive security testing.",
  path: "/blog/",
});

export default function BlogPage() {
  return (
    <PageShell>
      <StructuredData
        data={[
          {
            "@type": "Blog",
            "@id": `${absoluteUrl("/blog/")}#blog`,
            name: "Cynorida blog",
            url: absoluteUrl("/blog/"),
            publisher: { "@id": organizationId },
            isPartOf: { "@id": websiteId },
            blogPost: posts.map((post) => ({
              "@type": "NewsArticle",
              "@id": `${absoluteUrl(postPath(post))}#article`,
              headline: post.title,
              url: absoluteUrl(postPath(post)),
              datePublished: post.published,
              dateModified: post.updated,
            })),
          },
          breadcrumbData([{ name: "Blog", path: "/blog/" }]),
        ]}
      />
      <PageHeader
        eyebrow="Blog"
        title="Research and writing from the team."
        lede="Investigations, case studies and practical guides from the people who run our detection and testing work."
      />

      <section className="page-section" aria-labelledby="posts">
        <div className="container">
          <h2 id="posts" className="page-section__title">
            All posts
          </h2>
          <p className="page-section__lede">Every post, most recent first.</p>
          {posts.length > 0 ? (
            <EntryList
              linkLabel="Read"
              entries={posts.map((post) => ({
                title: post.title,
                body: post.description,
                date: post.published,
                href: postPath(post),
              }))}
            />
          ) : (
            <div className="empty-state">
              <p>The first posts are being written.</p>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
