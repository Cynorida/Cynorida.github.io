import { Wordmark } from "@/components/brand/mark";
import { company } from "@/content/company";
import "./footer.css";

type FooterColumn = {
  id: string;
  title: string;
  links: { label: string; href: string }[];
};

const columns: FooterColumn[] = [
  {
    id: "footer-navigation",
    title: "Navigation",
    links: [
      { label: "Services", href: "/services/" },
      { label: "How we engage", href: "/how-we-engage/" },
      { label: "Platform", href: "/#platform" },
      { label: "Blog", href: "/blog/" },
      { label: "Newsletter", href: "/newsletter/" },
      { label: "Privacy policy", href: "/privacy-policy/" },
      { label: "Terms of use", href: "/terms-of-use/" },
    ],
  },
  {
    id: "footer-company",
    title: "Company",
    links: [
      { label: "Team", href: "/team/" },
      { label: "Partnership", href: "/partnership/" },
      { label: "Press kit", href: "/press/" },
    ],
  },
  {
    id: "footer-contact",
    title: "Contact",
    links: [
      { label: company.emails.contact, href: `mailto:${company.emails.contact}` },
      { label: company.emails.security, href: `mailto:${company.emails.security}` },
      { label: company.emails.privacy, href: `mailto:${company.emails.privacy}` },
    ],
  },
];

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
          <p className="footer__legal">
            © {year} {company.brandName}
          </p>
        </div>
      </div>
    </footer>
  );
}
