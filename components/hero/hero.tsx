import { Arrow } from "@/components/brand/arrow";
import { projectHref } from "@/components/page/contact-links";
import { SignalField } from "./signal-field";
import { WorkBoard } from "./work-board";
import "./hero.css";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero__intro">
          <p className="hero__eyebrow">
            <span className="hero__eyebrow-dot" aria-hidden="true" />
            Protection, testing and incident response
          </p>
          <h1 id="hero-title" className="hero__title">
            Security work shaped around the systems you run.
          </h1>
          <div className="hero__row">
            <p className="hero__lede">
              Cynorida is a security team that protects, tests and investigates your systems. We agree the scope with
              you, do the work where your team can see it, and leave you with findings you can act on.
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href={projectHref}>
                Start a project
              </a>
              <a className="button button--quiet" href="#method">
                See how an engagement runs
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
          <WorkBoard />
          <p className="hero__caption">Illustrative engagement records</p>
        </div>
      </div>
    </section>
  );
}
