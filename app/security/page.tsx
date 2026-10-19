import type { Metadata } from "next";
import { Arrow } from "@/components/brand/arrow";
import { PageHeader } from "@/components/page/page-header";
import { PageShell } from "@/components/page/page-shell";
import { Missing } from "@/components/page/missing";
import { businessDays, mailtoWithSubject } from "@/components/policy/wording";
import { company } from "@/content/company";
import "@/components/policy/policy.css";

export const metadata: Metadata = {
  title: "Security",
  description:
    "How to report a security vulnerability to Cynorida, who handles it, how quickly we respond, and where to go if you are dealing with an active incident.",
};

export default function SecurityPage() {
  const securityEmail = company.emails.security;
  const { acknowledgeBusinessDays, triageBusinessDays, pgpKeyUrl } = company.disclosure;
  const securityContact = company.team.find((person) => person.isSecurityContact);
  const reportHref = mailtoWithSubject(securityEmail, "Vulnerability report");

  return (
    <PageShell>
      <PageHeader
        eyebrow="Security"
        title="Report a security issue"
        lede={`Found a vulnerability in the ${company.brandName} website or a service we run? Tell us privately so we can fix it before anyone else finds it.`}
      >
        <a className="button button--primary" href={reportHref}>
          Email {securityEmail}
        </a>
        <a className="button button--quiet" href="/security/disclosure">
          Read the disclosure policy
          <Arrow />
        </a>
      </PageHeader>

      <section id="report" className="page-section" aria-labelledby="report-title">
        <div className="container">
          <h2 id="report-title" className="page-section__title">
            How to report a vulnerability
          </h2>
          <p className="page-section__lede">
            Send a description of the issue, the affected URL or service and the steps to reproduce it. The{" "}
            <a className="text-link" href="/security/disclosure#what-to-include">
              disclosure policy
            </a>{" "}
            lists everything a useful report contains.
          </p>
          <dl className="fact-list panel">
            <div className="fact-list__row">
              <dt className="fact-list__term">Email</dt>
              <dd className="fact-list__value">
                <a className="text-link" href={reportHref}>
                  {securityEmail}
                </a>
              </dd>
            </div>
            {pgpKeyUrl ? (
              <div className="fact-list__row">
                <dt className="fact-list__term">Encryption</dt>
                <dd className="fact-list__value">
                  <a className="text-link" href={pgpKeyUrl}>
                    Download our PGP key
                  </a>
                </dd>
              </div>
            ) : null}
            <div className="fact-list__row">
              <dt className="fact-list__term">Policy</dt>
              <dd className="fact-list__value">
                <a className="text-link" href="/security/disclosure">
                  Vulnerability disclosure policy
                </a>
              </dd>
            </div>
            <div className="fact-list__row">
              <dt className="fact-list__term">Machine-readable contact</dt>
              <dd className="fact-list__value">
                <a className="text-link" href="/.well-known/security.txt">
                  /.well-known/security.txt
                </a>
              </dd>
            </div>
          </dl>
          {pgpKeyUrl ? null : (
            <p className="more-link">
              <Missing field="company.disclosure.pgpKeyUrl" hint="URL of the public PGP key for encrypted reports" />
            </p>
          )}
        </div>
      </section>

      <section id="what-happens" className="page-section" aria-labelledby="what-happens-title">
        <div className="container">
          <h2 id="what-happens-title" className="page-section__title">
            What happens after you report
          </h2>
          <p className="page-section__lede">
            These are the commitments in our disclosure policy. Good-faith research within that policy is authorised.
          </p>
          <ol className="card-grid card-grid--three">
            <li className="panel route">
              <span className="tag route__label">Within {businessDays(acknowledgeBusinessDays)}</span>
              <h3 className="route__title">We acknowledge your report</h3>
              <p className="route__text">We reply to confirm that we have your report and are looking at it.</p>
            </li>
            <li className="panel route">
              <span className="tag route__label">Within {businessDays(triageBusinessDays)}</span>
              <h3 className="route__title">We send an initial assessment</h3>
              <p className="route__text">
                We triage the issue, tell you whether we can reproduce it, and keep you updated while we fix it.
              </p>
            </li>
            <li className="panel route">
              <span className="tag route__label">Agreed with you</span>
              <h3 className="route__title">We disclose together</h3>
              <p className="route__text">
                We agree the timing of any public disclosure with you, and credit you if you would like us to.
              </p>
            </li>
          </ol>
          <p className="more-link">
            <a className="text-link" href="/security/disclosure#safe-harbour">
              Safe harbour and rules for researchers
              <Arrow />
            </a>
          </p>
        </div>
      </section>

      <section id="security-contact" className="page-section" aria-labelledby="security-contact-title">
        <div className="container">
          <h2 id="security-contact-title" className="page-section__title">
            Security contact
          </h2>
          <p className="page-section__lede">
            Security reports to {company.brandName} go to {securityEmail} and are handled under our disclosure policy.
          </p>
          <dl className="fact-list panel">
            <div className="fact-list__row">
              <dt className="fact-list__term">Named contact</dt>
              <dd className="fact-list__value">
                {securityContact ? (
                  <>
                    {securityContact.name}, {securityContact.role}
                  </>
                ) : (
                  <>
                    <a className="text-link" href={reportHref}>
                      {securityEmail}
                    </a>{" "}
                    <Missing
                      field="company.team[].isSecurityContact"
                      hint="mark the person who owns security reports"
                    />
                  </>
                )}
              </dd>
            </div>
            {securityContact
              ? securityContact.profiles.map((profile) => (
                  <div key={profile.href} className="fact-list__row">
                    <dt className="fact-list__term">{profile.label}</dt>
                    <dd className="fact-list__value">
                      <a className="text-link" href={profile.href} rel="noopener" target="_blank">
                        {profile.href}
                      </a>
                    </dd>
                  </div>
                ))
              : null}
          </dl>
        </div>
      </section>

      <section id="active-incident" className="page-section" aria-labelledby="active-incident-title">
        <div className="container">
          <div className="panel route route--alert">
            <span className="tag tag--high route__label">Active incident</span>
            <h2 id="active-incident-title" className="route__title">
              Report an active incident
            </h2>
            <p className="route__text">
              If an attacker is in your systems right now, do not use the vulnerability route. Our contact page has the
              fastest way to reach our incident responders.
            </p>
            <div className="route__actions">
              <a className="button button--primary" href="/contact#incident">
                Get incident help
                <Arrow />
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
