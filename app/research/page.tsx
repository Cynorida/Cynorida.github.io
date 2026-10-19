import type { Metadata } from "next";
import { Arrow } from "@/components/brand/arrow";
import { EmptyNote } from "@/components/company/empty-note";
import { EntryList } from "@/components/company/entry-list";
import { PageHeader } from "@/components/page/page-header";
import { PageShell } from "@/components/page/page-shell";
import { Missing } from "@/components/page/missing";
import { company, type EvidenceItem } from "@/content/company";
import "@/components/company/company.css";

export const metadata: Metadata = {
  title: "Research",
  description:
    "CVEs, advisories, talks, research and open-source tools credited to the Cynorida team, each linked to an independent source.",
};

type EvidenceSection = {
  id: string;
  title: string;
  lede: string;
  linkLabel: string;
  items: EvidenceItem[];
  field: string;
  hint: string;
  emptyText: string;
};

const sections: EvidenceSection[] = [
  {
    id: "cves",
    title: "CVEs",
    lede: "Each CVE links to its record in the NIST National Vulnerability Database, where the credit can be checked.",
    linkLabel: "NVD record",
    items: company.evidence.cves,
    field: "company.evidence.cves",
    hint: "CVE IDs credited to the team, each linked to nvd.nist.gov",
    emptyText: "CVE credits are being published.",
  },
  {
    id: "advisories",
    title: "Advisories and acknowledgements",
    lede: "Vendor advisories and security acknowledgements that name our researchers, linked to the vendor's own page.",
    linkLabel: "Vendor page",
    items: company.evidence.advisories,
    field: "company.evidence.advisories",
    hint: "vendor advisories or hall-of-fame pages naming the team",
    emptyText: "Advisories and acknowledgements are being published.",
  },
  {
    id: "talks",
    title: "Talks",
    lede: "Conference and community talks, linked to the event listing or recording.",
    linkLabel: "Event page",
    items: company.evidence.talks,
    field: "company.evidence.talks",
    hint: "talks given, linked to the event programme or recording",
    emptyText: "Talks are being published.",
  },
  {
    id: "publications",
    title: "Research",
    lede: "Write-ups and papers published by the team.",
    linkLabel: "Read",
    items: company.evidence.research,
    field: "company.evidence.research",
    hint: "published write-ups or papers",
    emptyText: "Research write-ups are being published.",
  },
  {
    id: "tools",
    title: "Open-source tools",
    lede: "Tools we maintain in public, linked to their repositories.",
    linkLabel: "Repository",
    items: company.evidence.tools,
    field: "company.evidence.tools",
    hint: "public repositories the team maintains",
    emptyText: "Open-source tools are being published.",
  },
];

export default function ResearchPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Research"
        title="Work you can verify"
        lede="Each item links to the place it can be checked: a CVE record, a vendor advisory, an event listing or a public repository."
      >
        {company.profiles.github ? (
          <a className="button" href={company.profiles.github} rel="me noopener" target="_blank">
            GitHub organisation
            <span className="visually-hidden"> (opens in a new tab)</span>
            <Arrow />
          </a>
        ) : (
          <Missing field="company.profiles.github" hint="GitHub organisation URL" />
        )}
      </PageHeader>

      <nav className="container" aria-label="Research sections">
        <ul className="jump-nav">
          {sections.map((section) => (
            <li key={section.id}>
              <a className="jump-nav__link" href={`#${section.id}`}>
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {sections.map((section) => (
        <section key={section.id} className="page-section" aria-labelledby={section.id}>
          <div className="container">
            <h2 id={section.id} className="page-section__title">
              {section.title}
            </h2>
            <p className="page-section__lede">{section.lede}</p>
            {section.items.length > 0 ? (
              <EntryList
                linkLabel={section.linkLabel}
                entries={section.items.map((item) => ({
                  title: item.title,
                  body: item.detail,
                  date: item.date,
                  href: item.href,
                }))}
              />
            ) : (
              <EmptyNote field={section.field} hint={section.hint}>
                {section.emptyText}
              </EmptyNote>
            )}
          </div>
        </section>
      ))}
    </PageShell>
  );
}
