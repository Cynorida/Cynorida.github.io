import type { Metadata } from "next";
import { DateStamp, newestFirst } from "@/components/company/dates";
import { EmptyNote } from "@/components/company/empty-note";
import { EntryList } from "@/components/company/entry-list";
import { PageHeader } from "@/components/page/page-header";
import { PageShell } from "@/components/page/page-shell";
import { company } from "@/content/company";
import "@/components/company/company.css";

export const metadata: Metadata = {
  title: "News",
  description: "Dated updates from the Cynorida team, newest first.",
};

const latest = newestFirst(company.news)[0];

export default function NewsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="News"
        title="What we have been doing"
        lede="Dated updates from the team, newest first."
        meta={
          latest ? (
            <>
              Last updated <DateStamp value={latest.date} />
            </>
          ) : null
        }
      />

      <section className="page-section" aria-labelledby="updates">
        <div className="container">
          <h2 id="updates" className="page-section__title">
            Updates
          </h2>
          {company.news.length > 0 ? (
            <EntryList
              linkLabel="Read more"
              entries={company.news.map((item) => ({
                title: item.title,
                body: item.summary,
                date: item.date,
                href: item.href,
              }))}
            />
          ) : (
            <EmptyNote field="company.news" hint="dated items with title, summary and link; keep it current">
              Updates are being published.
            </EmptyNote>
          )}
        </div>
      </section>
    </PageShell>
  );
}
