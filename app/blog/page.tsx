import { EntryList } from "@/components/company/entry-list";
import { PageHeader } from "@/components/page/page-header";
import { pageMetadata } from "@/components/page/page-metadata";
import { PageShell } from "@/components/page/page-shell";
import { StructuredData, breadcrumbData } from "@/components/page/structured-data";
import { company } from "@/content/company";
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
      <StructuredData data={[breadcrumbData([{ name: "Blog", path: "/blog/" }])]} />
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
          {company.posts.length > 0 ? (
            <EntryList linkLabel="Read" entries={company.posts.map((post) => ({ ...post, body: post.summary }))} />
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
