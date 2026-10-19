import { Arrow } from "@/components/brand/arrow";
import { SignalField } from "@/components/hero/signal-field";
import { company } from "@/content/company";
import "./closing.css";

export function Closing() {
  return (
    <section id="walkthrough" className="closing" aria-labelledby="closing-title">
      <div className="container">
        <div className="closing__band">
          <div className="closing__field" aria-hidden="true">
            <div className="closing__field-fallback" />
            <SignalField className="closing__field-canvas" anchorX={0.8} anchorY={0.4} spread={0.5} />
            <div className="closing__scrim" />
          </div>

          <div className="closing__content">
            <h2 id="closing-title" className="closing__title">
              See a live investigation before you decide.
            </h2>
            <p className="closing__lede">
              In 30 minutes an analyst walks you through a real alert queue, the playbooks you would approve, and the
              report you would receive.
            </p>
            <div className="closing__actions">
              <a className="button button--primary" href="/contact#walkthrough">
                Book a 30-minute walkthrough
              </a>
              <a className="button button--quiet" href={`mailto:${company.emails.contact}`}>
                Email {company.emails.contact}
              </a>
            </div>
            <p className="closing__note">
              Under attack right now?{" "}
              <a className="closing__note-link" href="/contact#incident">
                Reach our incident line
                <Arrow className="closing__note-arrow" />
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
