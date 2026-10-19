import type { Metadata } from "next";
import { PageShell } from "@/components/page/page-shell";
import { PageHeader } from "@/components/page/page-header";
import { Arrow } from "@/components/brand/arrow";
import { authorisationNote, offeredServicesOfKind, serviceKindLabels, type ServiceKind } from "@/content/services";
import "./services-page.css";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Managed detection and response, incident response, threat hunting and detection engineering, plus penetration testing and red teaming run only with written authorisation and an agreed scope.",
};

type ServiceGroup = {
  kind: ServiceKind;
  id: string;
  lede: string;
};

const groups: ServiceGroup[] = [
  {
    kind: "defensive",
    id: "defend",
    lede: "Watching your environment, responding when something goes wrong, and improving what you can detect.",
  },
  {
    kind: "offensive",
    id: "test",
    lede: "Finding the weaknesses an attacker would use, on systems you own, before someone else does.",
  },
];

export default function ServicesPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Services"
        title="Defend your environment, and test it with your permission."
        lede="Our defensive services run on the access you grant and the playbooks you approve. Our offensive services run only on systems you have authorised us to test, within a scope you have signed."
      />

      {groups.map((group) => {
        const groupServices = offeredServicesOfKind(group.kind);
        if (groupServices.length === 0) return null;
        const titleId = `${group.id}-title`;
        return (
          <section key={group.id} id={group.id} className="page-section" aria-labelledby={titleId}>
            <div className="container">
              <h2 id={titleId} className="page-section__title">
                {serviceKindLabels[group.kind]}
              </h2>
              <p className="page-section__lede">{group.lede}</p>
              <ul className="card-grid service-cards">
                {groupServices.map((service) => (
                  <li key={service.slug} className="panel service-card">
                    <h3 className="service-card__name">
                      <a className="service-card__link" href={`/services/${service.slug}`}>
                        {service.name}
                      </a>
                    </h3>
                    <p className="service-card__summary">{service.summary}</p>
                    <span className="service-card__more" aria-hidden="true">
                      Read more
                      <Arrow className="service-card__arrow" />
                    </span>
                  </li>
                ))}
              </ul>
              {group.kind === "offensive" ? (
                <div className="consent-note">
                  <p className="consent-note__text">{authorisationNote}</p>
                  <a className="text-link" href="/how-we-engage">
                    How we engage
                    <Arrow />
                  </a>
                </div>
              ) : null}
            </div>
          </section>
        );
      })}
    </PageShell>
  );
}
