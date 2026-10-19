import { externalProps } from "@/components/company/links";
import { PageHeader } from "@/components/page/page-header";
import { pageMetadata } from "@/components/page/page-metadata";
import { PageShell } from "@/components/page/page-shell";
import { StructuredData, breadcrumbData } from "@/components/page/structured-data";
import { company } from "@/content/company";
import "@/components/company/company.css";
import "./team.css";

export const metadata = pageMetadata({
  title: "Team",
  description:
    "The testers who run Cynorida penetration testing and red teaming, with their certifications and links to verify each one.",
  path: "/team/",
});

export default function TeamPage() {
  return (
    <PageShell>
      <StructuredData data={[breadcrumbData([{ name: "Team", path: "/team/" }])]} />
      <PageHeader
        eyebrow="Team"
        title="The people who test your systems."
        lede="Every tester is named here with the certifications they hold. Each certification links to the issuer's own record, so you can check it yourself."
      />

      <section className="page-section" aria-labelledby="testers">
        <div className="container">
          <h2 id="testers" className="page-section__title">
            Testing staff
          </h2>
          {company.testers.length > 0 ? (
            <ul className="card-grid card-grid--three">
              {company.testers.map((tester) => (
                <li key={tester.name} className="panel tester">
                  <h3 className="tester__name">{tester.name}</h3>
                  <p className="tester__role">{tester.role}</p>
                  <ul className="tester__certs">
                    {tester.certifications.map((certification) => (
                      <li key={certification.name}>
                        <a
                          className="tester__cert"
                          href={certification.verifyHref}
                          {...externalProps(certification.verifyHref)}
                        >
                          {certification.name}
                          <span className="tester__verify">Verify</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                  {tester.profileHref ? (
                    <a className="text-link" href={tester.profileHref} {...externalProps(tester.profileHref)}>
                      Profile
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">
              <p>Tester profiles are being published.</p>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
