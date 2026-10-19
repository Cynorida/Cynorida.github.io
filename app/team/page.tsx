import type { Metadata } from "next";
import { Arrow } from "@/components/brand/arrow";
import { EmptyNote } from "@/components/company/empty-note";
import { PersonCard } from "@/components/company/person-card";
import { PageHeader } from "@/components/page/page-header";
import { PageShell } from "@/components/page/page-shell";
import { Missing } from "@/components/page/missing";
import { company } from "@/content/company";
import "@/components/company/company.css";

export const metadata: Metadata = {
  title: "Team",
  description: "The people behind Cynorida, with links to the professional profiles you can check them against.",
};

const securityContact = company.team.find((person) => person.isSecurityContact);

export default function TeamPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Team"
        title="The people doing the work"
        lede="Every person here is named, with links to profiles you can check. The security contact is the person who receives vulnerability reports."
      >
        <a className="button" href="/about">
          Company details
        </a>
        <a className="button button--quiet" href="/security">
          Security contact
          <Arrow />
        </a>
      </PageHeader>

      <section className="page-section" aria-labelledby="people">
        <div className="container">
          <h2 id="people" className="page-section__title">
            People
          </h2>
          {company.team.length > 0 ? (
            <div className="card-grid card-grid--three">
              {company.team.map((person, index) => (
                <PersonCard key={person.name} person={person} index={index} />
              ))}
            </div>
          ) : (
            <EmptyNote field="company.team" hint="named people with role, bio and verifiable profiles; mark one isSecurityContact">
              Team profiles are being published.
            </EmptyNote>
          )}
        </div>
      </section>

      <section className="page-section" aria-labelledby="reach-us">
        <div className="container">
          <h2 id="reach-us" className="page-section__title">
            Reaching the right person
          </h2>
          <div className="panel">
            <dl className="fact-list">
              <div className="fact-list__row">
                <dt className="fact-list__term">Security contact</dt>
                <dd className="fact-list__value">
                  <span className="inline-list">
                    {securityContact ? (
                      <span>{securityContact.name}</span>
                    ) : (
                      <Missing field="company.team[].isSecurityContact" hint="mark the named security contact" />
                    )}
                    <a className="text-link" href={`mailto:${company.emails.security}`}>
                      {company.emails.security}
                    </a>
                  </span>
                </dd>
              </div>
              <div className="fact-list__row">
                <dt className="fact-list__term">Everything else</dt>
                <dd className="fact-list__value">
                  <a className="text-link" href={`mailto:${company.emails.contact}`}>
                    {company.emails.contact}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
