import type { Metadata } from "next";
import { Arrow } from "@/components/brand/arrow";
import { PageHeader } from "@/components/page/page-header";
import { PageShell } from "@/components/page/page-shell";
import { Missing, showMissing } from "@/components/page/missing";
import { mailtoWithSubject } from "@/components/policy/wording";
import { company, formatAddress } from "@/content/company";
import "@/components/policy/policy.css";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a walkthrough, get help with an active incident, report a vulnerability or reach Cynorida's privacy contact. Every route is a direct email address.",
};

type CompanyDetail = {
  term: string;
  value: React.ReactNode | null;
  field: string;
  hint: string;
};

const roleAddresses = [
  { term: "General enquiries", address: company.emails.contact },
  { term: "Security and vulnerability reports", address: company.emails.security },
  { term: "Privacy", address: company.emails.privacy },
];

const companyDetails: CompanyDetail[] = [
  {
    term: "Legal name",
    value: company.legalName,
    field: "company.legalName",
    hint: "exact name as it appears on the company register",
  },
  {
    term: "Registered office",
    value: company.registeredAddress ? formatAddress(company.registeredAddress) : null,
    field: "company.registeredAddress",
    hint: "registered office of the legal entity",
  },
  {
    term: "Registration number",
    value:
      company.registrationNumber && company.registrationAuthority
        ? `${company.registrationNumber}, ${company.registrationAuthority}`
        : company.registrationNumber,
    field: "company.registrationNumber",
    hint: "and registrationAuthority",
  },
];

const visibleCompanyDetails = companyDetails.filter((detail) => detail.value !== null || showMissing);

const profiles = [
  { label: "LinkedIn", href: company.profiles.linkedin },
  { label: "GitHub", href: company.profiles.github },
].filter((profile): profile is { label: string; href: string } => Boolean(profile.href));

const walkthroughHref = mailtoWithSubject(company.emails.contact, "Walkthrough request");
const incidentEmailHref = mailtoWithSubject(company.emails.security, "Active incident");

export default function ContactPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Contact"
        title="Talk to Cynorida"
        lede="Every route below is a direct email address that opens your own mail app. There is no form on this site, so your message goes from your mail app straight to our inbox."
      />

      <section id="walkthrough" className="page-section" aria-labelledby="walkthrough-title">
        <div className="container">
          <div className="panel route">
            <h2 id="walkthrough-title" className="route__title">
              Book a walkthrough
            </h2>
            <p className="route__text">
              An analyst walks you through a real alert queue, the playbooks you would approve and the report you would
              receive. To help us set it up, include:
            </p>
            <ul className="route__list">
              <li>your name, role and organisation;</li>
              <li>the services you are interested in;</li>
              <li>roughly how many endpoints, identities and cloud accounts you run;</li>
              <li>a few times that suit you, with your time zone.</li>
            </ul>
            <div className="route__actions">
              <a className="button button--primary" href={walkthroughHref}>
                Request a walkthrough
                <Arrow />
              </a>
              <a className="button button--quiet" href="/services">
                See our services
              </a>
            </div>
            <p className="route__text">
              Or write to{" "}
              <a className="route__address" href={walkthroughHref}>
                {company.emails.contact}
              </a>{" "}
              with the subject &ldquo;Walkthrough request&rdquo;.
            </p>
          </div>
        </div>
      </section>

      <section id="incident" className="page-section" aria-labelledby="incident-title">
        <div className="container">
          <div className="panel route route--alert">
            <span className="tag tag--high route__label">Active incident</span>
            <h2 id="incident-title" className="route__title">
              Under attack right now?
            </h2>
            <p className="route__text">
              If you think an attacker is in your systems, contact us straight away. Tell us who you are, a number we
              can call you back on, what you are seeing and when it started.
            </p>
            <div className="route__actions">
              {company.incidentPhone ? (
                <a className="button button--primary" href={`tel:${company.incidentPhone.replace(/[^\d+]/g, "")}`}>
                  Call {company.incidentPhone}
                </a>
              ) : null}
              <a
                className={company.incidentPhone ? "button" : "button button--primary"}
                href={incidentEmailHref}
              >
                Email {company.emails.security}
              </a>
            </div>
            {company.incidentPhone ? null : (
              <Missing field="company.incidentPhone" hint="phone line for active incidents, with its hours" />
            )}
            <p className="route__text">
              Use the subject &ldquo;Active incident&rdquo; so your email is not mistaken for a routine enquiry. Do not
              send passwords, keys or malware samples in a plain email; describe them and we will arrange a safe way to
              share them.
            </p>
          </div>
        </div>
      </section>

      <section className="page-section" aria-labelledby="addresses">
        <div className="container">
          <h2 id="addresses" className="page-section__title">
            Role addresses
          </h2>
          <p className="page-section__lede">
            Use the address that matches your message. To report a vulnerability, read the{" "}
            <a className="text-link" href="/security">
              security page
            </a>{" "}
            first.
          </p>
          <dl className="fact-list panel">
            {roleAddresses.map((role) => (
              <div key={role.address} className="fact-list__row">
                <dt className="fact-list__term">{role.term}</dt>
                <dd className="fact-list__value">
                  <a className="text-link" href={`mailto:${role.address}`}>
                    {role.address}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="page-section" aria-labelledby="company-details">
        <div className="container">
          <h2 id="company-details" className="page-section__title">
            Company details
          </h2>
          {visibleCompanyDetails.length > 0 ? (
            <dl className="fact-list panel">
              {visibleCompanyDetails.map((detail) => (
                <div key={detail.field} className="fact-list__row">
                  <dt className="fact-list__term">{detail.term}</dt>
                  <dd className="fact-list__value">
                    {detail.value ?? <Missing field={detail.field} hint={detail.hint} />}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
          <p className="more-link">
            <a className="text-link" href="/about">
              More about {company.brandName}
              <Arrow />
            </a>
          </p>
        </div>
      </section>

      {profiles.length > 0 || showMissing ? (
        <section className="page-section" aria-labelledby="profiles">
          <div className="container">
            <h2 id="profiles" className="page-section__title">
              Profiles
            </h2>
            {profiles.length > 0 ? (
              <dl className="fact-list panel">
                {profiles.map((profile) => (
                  <div key={profile.label} className="fact-list__row">
                    <dt className="fact-list__term">{profile.label}</dt>
                    <dd className="fact-list__value">
                      <a className="text-link" href={profile.href} rel="me noopener" target="_blank">
                        {profile.href}
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <Missing field="company.profiles" hint="LinkedIn and GitHub URLs" />
            )}
          </div>
        </section>
      ) : null}
    </PageShell>
  );
}
