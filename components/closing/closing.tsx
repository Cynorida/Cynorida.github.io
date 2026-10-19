import { Arrow } from "@/components/brand/arrow";
import { SignalField } from "@/components/hero/signal-field";
import { incidentHref, projectHref } from "@/components/page/contact-links";
import { company } from "@/content/company";
import "./closing.css";

export function Closing() {
  return (
    <section id="start" className="closing" aria-labelledby="closing-title">
      <div className="container">
        <div className="closing__band">
          <div className="closing__field" aria-hidden="true">
            <div className="closing__field-fallback" />
            <SignalField className="closing__field-canvas" anchorX={0.8} anchorY={0.4} spread={0.5} />
            <div className="closing__scrim" />
          </div>

          <div className="closing__content">
            <h2 id="closing-title" className="closing__title">
              Tell us what you need protected or tested.
            </h2>
            <p className="closing__lede">
              Describe the system and what worries you about it. We reply with a proposed scope, method and timeline.
            </p>
            <div className="closing__actions">
              <a className="button button--primary" href={projectHref}>
                Start a project
              </a>
              <a className="button button--quiet" href={`mailto:${company.emails.contact}`}>
                Email {company.emails.contact}
              </a>
            </div>
            <p className="closing__note">
              Under attack right now?{" "}
              <a className="closing__note-link" href={incidentHref}>
                Email {company.emails.security}
                <Arrow className="closing__note-arrow" />
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
