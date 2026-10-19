import { Arrow } from "@/components/brand/arrow";
import { Console } from "./console";
import { SignalField } from "./signal-field";
import "./hero.css";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero__intro">
          <p className="hero__eyebrow">
            <span className="hero__eyebrow-dot" aria-hidden="true" />
            Managed detection and response
          </p>
          <h1 id="hero-title" className="hero__title">
            Threat detection and response, run in the open.
          </h1>
          <div className="hero__row">
            <p className="hero__lede">
              Cynorida analysts watch your endpoints, identities and cloud accounts 24 hours a day, 365 days a year.
              Every alert, query and containment step shows up in a console your team shares with ours.
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href="#walkthrough">
                Book a 30-minute walkthrough
              </a>
              <a className="button button--quiet" href="#incident">
                Follow a sample incident
                <Arrow />
              </a>
            </div>
          </div>
        </div>

        <div className="hero__stage">
          <div className="hero__light" aria-hidden="true">
            <div className="hero__light-fallback" />
            <SignalField
              className="hero__light-canvas"
              anchorX={0.6}
              anchorY={0.46}
              spread={0.2}
              directionX={1}
              directionY={0.16}
              topFade={0.72}
            />
          </div>
          <div className="hero__window">
            <Console />
          </div>
          <p className="hero__caption">Sample incident with synthetic data</p>
        </div>
      </div>
    </section>
  );
}
