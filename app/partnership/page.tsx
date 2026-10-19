import type { Metadata } from "next";
import { Arrow } from "@/components/brand/arrow";
import { partnershipHref } from "@/components/page/contact-links";
import { PageHeader } from "@/components/page/page-header";
import { PageShell } from "@/components/page/page-shell";
import { company } from "@/content/company";

export const metadata: Metadata = {
  title: "Partnership",
  description:
    "Add Cynorida's detection, response and testing to your own portfolio, under your brand or by referral, without building a security team.",
};

const models = [
  {
    title: "Delivered under your brand",
    detail: "Our analysts and testers do the work, and your client sees your name on the engagement and the report.",
  },
  {
    title: "Referral",
    detail: "Send us clients who need security work you do not offer. We scope and deliver it, and keep you informed.",
  },
  {
    title: "Combined offering",
    detail: "Pair our services with what you already sell, such as managed IT, cloud or compliance, as one package.",
  },
];

const benefits = [
  {
    title: "Specialists on call",
    detail: "Analysts and testers to support projects your team does not cover.",
  },
  {
    title: "A wider portfolio",
    detail: "Managed detection and response, incident response and authorised testing alongside your current services.",
  },
  {
    title: "No new infrastructure",
    detail: "Offer the work without hiring a night shift or building a security operations centre.",
  },
  {
    title: "Support through the sale",
    detail: "Help with scoping, proposals and technical questions, from first call to delivery.",
  },
];

export default function PartnershipPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Partnership"
        title="Add security work to what you already offer."
        lede={`The ${company.brandName} partnership lets companies offer our detection, response and testing to their clients without building an internal security team.`}
      >
        <a className="button button--primary" href={partnershipHref}>
          Become a partner
          <Arrow />
        </a>
      </PageHeader>

      <section className="page-section" aria-labelledby="models">
        <div className="container">
          <h2 id="models" className="page-section__title">
            Ways to work together
          </h2>
          <p className="page-section__lede">You keep the relationship with the client. We do the security work.</p>
          <ul className="card-grid card-grid--three">
            {models.map((model) => (
              <li key={model.title} className="panel">
                <h3 className="page-section__title">{model.title}</h3>
                <p className="page-section__lede">{model.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="page-section" aria-labelledby="benefits">
        <div className="container">
          <h2 id="benefits" className="page-section__title">
            What partners get
          </h2>
          <ul className="card-grid">
            {benefits.map((benefit) => (
              <li key={benefit.title} className="panel">
                <h3 className="page-section__title">{benefit.title}</h3>
                <p className="page-section__lede">{benefit.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="page-section" aria-labelledby="partner-contact">
        <div className="container">
          <h2 id="partner-contact" className="page-section__title">
            Talk to us about a partnership
          </h2>
          <p className="page-section__lede">
            Tell us what you sell today and who your clients are. We will suggest the model that fits.
          </p>
          <a className="button button--primary" href={partnershipHref}>
            Email {company.emails.contact}
            <Arrow />
          </a>
        </div>
      </section>
    </PageShell>
  );
}
