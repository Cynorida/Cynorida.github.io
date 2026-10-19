import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/components/page/page-metadata";
import { PageShell } from "@/components/page/page-shell";
import { StructuredData, absoluteUrl, breadcrumbData, organizationId } from "@/components/page/structured-data";
import { PageHeader } from "@/components/page/page-header";
import { Arrow } from "@/components/brand/arrow";
import { walkthroughHref } from "@/components/page/contact-links";
import { authorisationNote, findOfferedService, offeredServices, serviceKindLabels } from "@/content/services";
import "../services-page.css";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return offeredServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = findOfferedService(slug);
  if (!service) return {};
  return pageMetadata({
    title: `${service.name} services`,
    description: service.summary,
    path: `/services/${service.slug}/`,
  });
}

function CheckMark() {
  return (
    <svg className="check-list__mark" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = findOfferedService(slug);
  if (!service) notFound();

  const servicePath = `/services/${service.slug}/`;
  const isOffensive = service.kind === "offensive";
  const serviceTopic = service.name.toLowerCase();

  return (
    <PageShell>
      <StructuredData
        data={[
          {
            "@type": "Service",
            "@id": `${absoluteUrl(servicePath)}#service`,
            name: service.name,
            serviceType: service.name,
            description: service.lede,
            url: absoluteUrl(servicePath),
            provider: { "@id": organizationId },
          },
          breadcrumbData([
            { name: "Services", path: "/services/" },
            { name: service.name, path: servicePath },
          ]),
        ]}
      />
      <PageHeader eyebrow={`Services · ${serviceKindLabels[service.kind]}`} title={service.name} lede={service.lede} />

      {isOffensive ? (
        <section className="service-detail__consent" aria-labelledby="authorisation-title">
          <div className="container">
            <div className="consent-note">
              <h2 id="authorisation-title" className="consent-note__title">
                Written authorisation required
              </h2>
              <p className="consent-note__text">{authorisationNote}</p>
              <a className="text-link" href="/how-we-engage/">
                Read how we engage
                <Arrow />
              </a>
            </div>
          </div>
        </section>
      ) : null}

      <section className="page-section" aria-labelledby="covers-title">
        <div className="container">
          <h2 id="covers-title" className="page-section__title">
            What it covers
          </h2>
          <ul className="check-list">
            {service.covers.map((item) => (
              <li key={item} className="check-list__item">
                <CheckMark />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="page-section" aria-labelledby="steps-title">
        <div className="container">
          <h2 id="steps-title" className="page-section__title">
            How an engagement runs
          </h2>
          <ol className="steps">
            {service.steps.map((step) => (
              <li key={step.title} className="steps__item">
                <div>
                  <h3 className="steps__title">{step.title}</h3>
                  <p className="steps__detail">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="page-section" aria-labelledby="deliverables-title">
        <div className="container">
          <h2 id="deliverables-title" className="page-section__title">
            What you receive
          </h2>
          <ul className="check-list">
            {service.deliverables.map((item) => (
              <li key={item} className="check-list__item">
                <CheckMark />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="page-section" aria-labelledby="cta-title">
        <div className="container">
          <div className="panel service-cta">
            <h2 id="cta-title" className="service-cta__title">
              Talk to us about {serviceTopic}.
            </h2>
            <p className="service-cta__lede">
              {isOffensive
                ? "Tell us what you want tested and who owns it. We will start with scope and authorisation before anything else."
                : "Tell us about your environment and what you need covered, and we will talk you through how it would work for you."}
            </p>
            <div className="service-cta__actions">
              <a className="button button--primary" href={walkthroughHref}>
                Talk to us about {serviceTopic}
              </a>
              <a className="button button--quiet" href="/how-we-engage/">
                How we engage
                <Arrow />
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
