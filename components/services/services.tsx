import { Arrow } from "@/components/brand/arrow";
import { offeredServicesOfKind, serviceKindLabels, type ServiceKind } from "@/content/services";
import "./services.css";

type ServiceColumn = {
  kind: ServiceKind;
  detail: string;
};

const columns: ServiceColumn[] = [
  { kind: "defensive", detail: "Day-to-day monitoring, response and detection." },
  { kind: "offensive", detail: "Testing on systems you own, with your written authorisation." },
];

export function Services() {
  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="container">
        <div className="split-head">
          <h2 id="services-title" className="split-head__title">
            Watch for attacks, and test for them.{" "}
            <span className="split-head__title-muted">
              Only ever on systems you have authorised us to test.
            </span>
          </h2>
          <div>
            <p className="split-head__lede">
              Every engagement starts with an agreed scope and is written down as it happens, from the playbooks we may
              run to the targets we may test.
            </p>
            <a className="split-head__link" href="/services/">
              All services
              <Arrow />
            </a>
          </div>
        </div>

        <div className="offerings">
          {columns.map((column) => {
            const columnServices = offeredServicesOfKind(column.kind);
            if (columnServices.length === 0) return null;
            const titleId = `offerings-${column.kind}-title`;
            return (
              <div key={column.kind} className="offerings__column">
                <div className="offerings__head">
                  <h3 id={titleId} className="offerings__title">
                    {serviceKindLabels[column.kind]}
                  </h3>
                  <p className="offerings__detail">{column.detail}</p>
                </div>
                <ul className="offerings__list" aria-labelledby={titleId}>
                  {columnServices.map((service) => (
                    <li key={service.slug} className="offerings__item">
                      <a className="offerings__link" href={`/services/${service.slug}/`}>
                        <span className="offerings__name">
                          {service.name}
                          <Arrow className="offerings__arrow" />
                        </span>
                        <span className="offerings__summary">{service.summary}</span>
                      </a>
                    </li>
                  ))}
                </ul>
                {column.kind === "offensive" ? (
                  <p className="offerings__note">
                    Offensive testing starts only after written authorisation and a signed scope.{" "}
                    <a className="offerings__note-link" href="/how-we-engage/">
                      How we engage
                    </a>
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
