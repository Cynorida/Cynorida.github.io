import { Arrow } from "@/components/brand/arrow";
import "./method.css";

const phases = [
  {
    label: "Understand",
    title: "Learn the system and the question",
    detail: "We study the systems, workflows and risks involved, and agree what your team needs to find out, decide or fix.",
  },
  {
    label: "Scope",
    title: "Agree the outcome in writing",
    detail: "Targets, exclusions, windows, contacts and deliverables go into a written scope. Testing also needs signed authorisation.",
  },
  {
    label: "Work",
    title: "Protect, test or investigate",
    detail: "We do the work inside the agreed scope and keep your contact updated. Critical issues are raised as soon as we find them.",
  },
  {
    label: "Report",
    title: "Findings you can act on",
    detail: "A written report with an executive summary, each finding with its evidence and fix, and what was not covered.",
  },
  {
    label: "Hand over",
    title: "Debrief, retest and handover",
    detail: "We walk your team through the results, retest the fixes and hand over everything your engineers need to carry on.",
  },
];

export function Method() {
  return (
    <section id="method" className="section" aria-labelledby="method-title">
      <div className="container">
        <div className="split-head">
          <h2 id="method-title" className="split-head__title">
            How an engagement runs.{" "}
            <span className="split-head__title-muted">The same five phases, whatever the work.</span>
          </h2>
          <div>
            <p className="split-head__lede">
              Protection, testing and incident work all follow one shape, so you always know what happens next and who
              decides.
            </p>
            <a className="split-head__link" href="/how-we-engage/">
              Authorisation and rules of engagement
              <Arrow />
            </a>
          </div>
        </div>
        <ol className="method">
          {phases.map((phase, index) => (
            <li key={phase.label} className="method__phase">
              <p className="method__label">
                <span className="numeric">{String(index + 1).padStart(2, "0")}</span> {phase.label}
              </p>
              <h3 className="method__title">{phase.title}</h3>
              <p className="method__detail">{phase.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
