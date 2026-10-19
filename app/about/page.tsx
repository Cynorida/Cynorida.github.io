import type { Metadata } from "next";
import { Arrow } from "@/components/brand/arrow";
import { CredentialCard } from "@/components/company/credential-card";
import { DateStamp } from "@/components/company/dates";
import { EmptyNote } from "@/components/company/empty-note";
import { PageHeader } from "@/components/page/page-header";
import { PageShell } from "@/components/page/page-shell";
import { Missing, showMissing } from "@/components/page/missing";
import { company, formatAddress } from "@/content/company";
import "@/components/company/company.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who Cynorida is: legal entity, registration, registered office, contacts, the sectors we serve and the certifications we hold.",
};

type FactRow = {
  term: string;
  value: React.ReactNode | null;
  field: string;
  hint?: string;
};

const organisationProfiles = [
  { label: "LinkedIn", href: company.profiles.linkedin, field: "company.profiles.linkedin" },
  { label: "GitHub", href: company.profiles.github, field: "company.profiles.github" },
];

const publishedProfiles = organisationProfiles.filter(
  (profile): profile is { label: string; href: string; field: string } => Boolean(profile.href),
);

const facts: FactRow[] = [
  {
    term: "Legal entity name",
    value: company.legalName,
    field: "company.legalName",
    hint: "exact name as it appears on the company register",
  },
  {
    term: "Trading name",
    value: company.brandName,
    field: "company.brandName",
  },
  {
    term: "Company registration number",
    value: company.registrationNumber ? (
      <>
        <span className="numeric">{company.registrationNumber}</span>
        {company.registrationAuthority ? (
          <span className="fact-list__aside"> · {company.registrationAuthority}</span>
        ) : (
          <Missing field="company.registrationAuthority" hint="the registry that issued the number" />
        )}
        {company.registryUrl ? (
          <>
            {" · "}
            <a className="text-link" href={company.registryUrl} rel="noopener" target="_blank">
              View the register entry
            </a>
          </>
        ) : (
          <Missing field="company.registryUrl" hint="public link to your entry on the company register" />
        )}
      </>
    ) : null,
    field: "company.registrationNumber",
    hint: "and company.registrationAuthority, exactly as the registry shows them",
  },
  {
    term: "VAT number",
    value: company.vatNumber ? <span className="numeric">{company.vatNumber}</span> : null,
    field: "company.vatNumber",
    hint: "only if the company is VAT registered",
  },
  {
    term: "Registered office",
    value: company.registeredAddress ? (
      <address className="fact-list__address">{formatAddress(company.registeredAddress)}</address>
    ) : null,
    field: "company.registeredAddress",
    hint: "the address held by the registry",
  },
  {
    term: "Headquarters",
    value: company.headquarters,
    field: "company.headquarters",
    hint: "city and country, consistent with LinkedIn",
  },
  {
    term: "Founded",
    value: company.founded ? <DateStamp className="numeric" value={company.founded} /> : null,
    field: "company.founded",
    hint: "incorporation date from the registry",
  },
  {
    term: "Website",
    value: <a className="text-link" href={company.siteUrl}>{company.domain}</a>,
    field: "company.domain",
  },
  {
    term: "General contact",
    value: (
      <a className="text-link" href={`mailto:${company.emails.contact}`}>
        {company.emails.contact}
      </a>
    ),
    field: "company.emails.contact",
  },
  {
    term: "Security contact",
    value: (
      <span className="inline-list">
        <a className="text-link" href={`mailto:${company.emails.security}`}>
          {company.emails.security}
        </a>
        <a className="text-link" href="/security">
          Security and disclosure
          <Arrow />
        </a>
      </span>
    ),
    field: "company.emails.security",
  },
  {
    term: "Profiles",
    value:
      publishedProfiles.length > 0 ? (
        <span className="inline-list">
          {organisationProfiles.map((profile) =>
            profile.href ? (
              <a key={profile.label} className="text-link" href={profile.href} rel="me noopener" target="_blank">
                {profile.label}
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            ) : (
              <Missing key={profile.label} field={profile.field} />
            ),
          )}
        </span>
      ) : null,
    field: "company.profiles",
    hint: "LinkedIn company page and GitHub organisation URLs",
  },
];

const visibleFacts = facts.filter((fact) => fact.value !== null || showMissing);

export default function AboutPage() {
  return (
    <PageShell>
      <PageHeader eyebrow="Company" title="Who we are, on the record" lede={company.description}>
        <a className="button" href="/team">
          Meet the team
        </a>
        <a className="button button--quiet" href="/research">
          Work you can verify
          <Arrow />
        </a>
      </PageHeader>

      <section className="page-section" aria-labelledby="company-details">
        <div className="container">
          <h2 id="company-details" className="page-section__title">
            Company details
          </h2>
          <p className="page-section__lede">
            Use these details to check us against the company register and our public profiles.
          </p>
          <div className="panel">
            <dl className="fact-list">
              {visibleFacts.map((fact) => (
                <div key={fact.term} className="fact-list__row">
                  <dt className="fact-list__term">{fact.term}</dt>
                  <dd className="fact-list__value">
                    {fact.value ?? <Missing field={fact.field} hint={fact.hint} />}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="page-section" aria-labelledby="who-we-work-for">
        <div className="container">
          <h2 id="who-we-work-for" className="page-section__title">
            Who we work for
          </h2>
          {company.sectors.length > 0 ? (
            <ul className="sector-list">
              {company.sectors.map((sector) => (
                <li key={sector} className="sector-list__item">
                  {sector}
                </li>
              ))}
            </ul>
          ) : (
            <EmptyNote field="company.sectors" hint="sectors and client types you actually serve">
              The sectors we serve are being published.
            </EmptyNote>
          )}
        </div>
      </section>

      <section className="page-section" aria-labelledby="certifications">
        <div className="container">
          <h2 id="certifications" className="page-section__title">
            Certifications
          </h2>
          {company.certifications.length > 0 ? (
            <>
              <p className="page-section__lede">Each certification links to the issuer, so you can check it yourself.</p>
              <div className="card-grid card-grid--three">
                {company.certifications.map((certification, index) => (
                  <CredentialCard
                    key={`${certification.name}-${certification.heldBy}`}
                    certification={certification}
                    index={index}
                  />
                ))}
              </div>
            </>
          ) : (
            <EmptyNote field="company.certifications" hint="only certifications actually held, with verify links">
              Certifications are being published with links to each issuer.
            </EmptyNote>
          )}
        </div>
      </section>

      <section className="page-section" aria-labelledby="what-we-do">
        <div className="container">
          <h2 id="what-we-do" className="page-section__title">
            What we do
          </h2>
          <div className="prose">
            <p>
              We run managed detection and response, incident response and authorised offensive security testing, for
              organisations that want to see every step of the work.
            </p>
          </div>
          <div className="link-row">
            <a className="text-link" href="/services">
              Our services
              <Arrow />
            </a>
            <a className="text-link" href="/how-we-engage">
              How we engage
              <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section className="page-section" aria-labelledby="people">
        <div className="container">
          <h2 id="people" className="page-section__title">
            People
          </h2>
          {company.team.length > 0 ? (
            <ul className="inline-list">
              {company.team.map((person) => (
                <li key={person.name} className="fact-list__value">
                  {person.name} <span className="fact-list__aside">{person.role}</span>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyNote field="company.team" hint="named people with verifiable profiles">
              Team profiles are being published.
            </EmptyNote>
          )}
          <div className="link-row">
            <a className="text-link" href="/team">
              Meet the team
              <Arrow />
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
