import { moments } from "./moments";
import { Walkthrough } from "./walkthrough";
import "./incident.css";

export function Incident() {
  return (
    <>
      <section id="incident" className="section" aria-labelledby="incident-title">
        <div className="container">
          <div className="split-head">
            <h2 id="incident-title" className="split-head__title">
              Follow one incident from first alert to closed ticket.{" "}
              <span className="split-head__title-muted">This is the view your team gets while it happens.</span>
            </h2>
            <p className="split-head__lede">
              Here is INC-2417 from the console above, one step at a time: the raw alert, the analyst’s note, the
              query and its rows, the scope check, the containment action, the message to your team and the closing
              summary. Your team watches all of it live, not in a PDF a week later.
            </p>
          </div>
          <Walkthrough moments={moments} />
        </div>
      </section>
    </>
  );
}
