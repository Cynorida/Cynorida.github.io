import { Wordmark } from "@/components/brand/mark";
import { Missing } from "@/components/page/missing";
import { company, formatAddress, legalEntityName } from "@/content/company";
import { offeredServices } from "@/content/services";
import "./footer.css";

type FooterColumn = {
  id: string;
  title: string;
  links: { label: string; href: string }[];
};

const columns: FooterColumn[] = [
  {
    id: "footer-services",
    title: "Services",
    links: [
      ...offeredServices.map((service) => ({ label: service.name, href: `/services/${service.slug}` })),
    ],
  },
  {
    id: "footer-company",
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Team", href: "/team" },
      { label: "Research", href: "/research" },
      { label: "News", href: "/news" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    id: "footer-trust",
    title: "Trust",
    links: [
      { label: "How we engage", href: "/how-we-engage" },
      { label: "Security", href: "/security" },
      { label: "Vulnerability disclosure", href: "/security/disclosure" },
      { label: "security.txt", href: "/.well-known/security.txt" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

const profiles = [
  { label: "LinkedIn", href: company.profiles.linkedin },
  { label: "GitHub", href: company.profiles.github },
].filter((profile): profile is { label: string; href: string } => Boolean(profile.href));

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a className="footer__home" href="/" aria-label="Cynorida home">
            <Wordmark />
          </a>
          <p className="footer__about">{company.description}</p>
          {profiles.length > 0 ? (
            <ul className="footer__profiles">
              {profiles.map((profile) => (
                <li key={profile.label}>
                  <a className="footer__profile" href={profile.href} rel="me noopener" target="_blank">
                    {profile.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <Missing field="company.profiles" hint="LinkedIn and GitHub URLs" />
          )}
        </div>

        <div className="footer__columns">
          {columns.map((column) => (
            <nav key={column.id} className="footer__column" aria-labelledby={column.id}>
              <h2 id={column.id} className="footer__heading">
                {column.title}
              </h2>
              <ul className="footer__links">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <a className="footer__link" href={link.href}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="footer__bottom">
          <div className="footer__identity">
            <p className="footer__legal">
              © {year} {legalEntityName()}
              {company.legalName === null ? <Missing field="company.legalName" /> : null}
            </p>
            <p className="footer__legal">
              {company.registrationNumber && company.registrationAuthority ? (
                <>
                  Registered with {company.registrationAuthority}, number {company.registrationNumber}.{" "}
                </>
              ) : (
                <Missing field="company.registrationNumber" hint="and registrationAuthority" />
              )}
              {company.registeredAddress ? (
                <>Registered office: {formatAddress(company.registeredAddress)}.</>
              ) : (
                <Missing field="company.registeredAddress" />
              )}
            </p>
          </div>
          <div className="footer__contacts">
            <a className="footer__link footer__email" href={`mailto:${company.emails.contact}`}>
              {company.emails.contact}
            </a>
            <a className="footer__link footer__email" href={`mailto:${company.emails.security}`}>
              {company.emails.security}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
