import { PageHeader } from "@/components/page/page-header";
import { pageMetadata } from "@/components/page/page-metadata";
import { PageShell } from "@/components/page/page-shell";
import { StructuredData, breadcrumbData } from "@/components/page/structured-data";
import { company } from "@/content/company";
import "./press.css";

export const metadata = pageMetadata({
  title: "Press kit",
  description:
    "Official Cynorida logo and symbol files for media, partners, events and publications, with logo usage rules.",
  path: "/press/",
});

const assets = [
  { name: "Logo", variant: "For dark backgrounds · SVG", file: "/brand/logo.svg", surface: "dark" },
  { name: "Logo", variant: "For light backgrounds · SVG", file: "/brand/logo-on-light.svg", surface: "light" },
  { name: "Symbol", variant: "SVG", file: "/brand/logo-mark.svg", surface: "dark" },
];

const rules = [
  "Do not change the logo colours.",
  "Do not stretch, distort or redraw the logo.",
  "Leave clear space around the logo.",
  "Use the dark-background version on dark backgrounds and the light-background version on light ones.",
];

export default function PressPage() {
  return (
    <PageShell>
      <StructuredData data={[breadcrumbData([{ name: "Press kit", path: "/press/" }])]} />
      <PageHeader
        eyebrow="Press kit"
        title="The Cynorida brand, ready to use."
        lede="Official brand assets for articles, event pages, sponsorship announcements, presentations and partner material."
      />

      <section className="page-section" aria-labelledby="assets">
        <div className="container">
          <h2 id="assets" className="page-section__title">
            Brand assets
          </h2>
          <ul className="card-grid card-grid--three">
            {assets.map((asset) => (
              <li key={asset.file} className="panel press-asset">
                <div className={`press-asset__preview press-asset__preview--${asset.surface}`}>
                  <img src={asset.file} alt={`${company.brandName} ${asset.name.toLowerCase()}`} />
                </div>
                <div className="press-asset__meta">
                  <div>
                    <h3 className="press-asset__name">{asset.name}</h3>
                    <p className="press-asset__variant">{asset.variant}</p>
                  </div>
                  <a className="button button--quiet" href={asset.file} download>
                    Download
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="page-section" aria-labelledby="usage">
        <div className="container">
          <div className="prose">
          <h2 id="usage">Logo usage</h2>
          <ul>
            {rules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
          <h2>Press, sponsorship or partnership enquiries</h2>
          <p>
            For interviews, speakers, event material or the logo in another format, email{" "}
            <a href={`mailto:${company.emails.contact}`}>{company.emails.contact}</a>.
          </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
