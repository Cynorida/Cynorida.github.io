import { Arrow } from "@/components/brand/arrow";
import { CoveragePage, IncidentPage, SummaryPage } from "./report-pages";
import "./report.css";

const contents = [
  { text: "A plain-language summary for leadership, on one page.", where: "Page 1" },
  { text: "Every incident, with its full timeline and root cause.", where: "Pages 2–5" },
  { text: "ATT&CK coverage, including the tactics with no detections yet.", where: "Page 6" },
  { text: "Open recommendations, each with an owner and a due date.", where: "Page 7" },
  { text: "Export to PDF for the board and CSV for the auditor.", where: "PDF · CSV" },
];

export function Report() {
  return (
    <>
      <section id="report" className="section" aria-labelledby="report-title">
        <div className="container">
          <div className="split-head">
            <h2 id="report-title" className="split-head__title">
              A monthly report your auditor and your board can both read.{" "}
              <span className="split-head__title-muted">Built from the record your team watched live.</span>
            </h2>
            <p className="split-head__lede">
              Each month the console record becomes one report: what happened, what was done about it, which ATT&amp;CK
              techniques you can detect and what is still open. INC-2417 from the walkthrough above appears in it as
              written.
            </p>
          </div>

          <div className="report">
            <figure className="report__visual">
              <div className="report-stack" aria-hidden="true">
                <div className="report-stack__scene">
                  <IncidentPage />
                  <SummaryPage />
                  <CoveragePage />
                </div>
              </div>
              <figcaption className="report__caption">Sample report pages for a demo month, synthetic data</figcaption>
            </figure>

            <div className="report__contents">
              <h3 className="report__contents-title">What each report contains</h3>
              <ul className="report__list">
                {contents.map((item) => (
                  <li key={item.text} className="report__item">
                    <span className="report__item-text">{item.text}</span>
                    <span className="report__item-where">{item.where}</span>
                  </li>
                ))}
              </ul>
              <a className="button button--quiet report__link" href="/contact#walkthrough">
                Ask for a sample report
                <Arrow />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
