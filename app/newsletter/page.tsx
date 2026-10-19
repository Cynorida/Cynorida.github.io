import { Arrow } from "@/components/brand/arrow";
import { EntryList } from "@/components/company/entry-list";
import { subscribeHref } from "@/components/page/contact-links";
import { PageHeader } from "@/components/page/page-header";
import { pageMetadata } from "@/components/page/page-metadata";
import { PageShell } from "@/components/page/page-shell";
import { StructuredData, breadcrumbData } from "@/components/page/structured-data";
import { company } from "@/content/company";
import "@/components/company/company.css";

export const metadata = pageMetadata({
  title: "Newsletter",
  description:
    "The Cynorida Bulletin: research, tools and security news from the team, published here and sent to subscribers.",
  path: "/newsletter/",
});

export default function NewsletterPage() {
  return (
    <PageShell>
      <StructuredData data={[breadcrumbData([{ name: "Newsletter", path: "/newsletter/" }])]} />
      <PageHeader
        eyebrow="Newsletter"
        title="The Cynorida Bulletin."
        lede="Research, tools and security news, written by the team. Every edition is published here and sent to subscribers."
      >
        <a className="button button--primary" href={subscribeHref}>
          Subscribe
          <Arrow />
        </a>
      </PageHeader>

      <section className="page-section" aria-labelledby="editions">
        <div className="container">
          <h2 id="editions" className="page-section__title">
            All editions
          </h2>
          <p className="page-section__lede">Every bulletin since the first one, most recent first.</p>
          {company.editions.length > 0 ? (
            <EntryList
              linkLabel="Read"
              entries={company.editions.map((edition) => ({ ...edition, body: edition.summary }))}
            />
          ) : (
            <div className="empty-state">
              <p>The first edition has not been sent yet. Subscribe to receive it.</p>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
