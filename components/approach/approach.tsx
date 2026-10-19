import "./approach.css";

const principles = [
  {
    title: "Scope agreed before anything starts",
    detail: "Every engagement begins with a written scope. Offensive work also needs signed authorisation from the owner of the systems.",
  },
  {
    title: "Evidence behind every finding",
    detail: "Each finding comes with its evidence, the steps to reproduce it and how to fix it, so your engineers can act without guessing.",
  },
  {
    title: "Done where your team can see it",
    detail: "You get regular updates while the work runs, and critical issues reach your named contact straight away, not at the end.",
  },
  {
    title: "Your team stronger afterwards",
    detail: "We walk your team through the results, retest what you fix, and leave the detections and reports with you.",
  },
];

export function Approach() {
  return (
    <section id="approach" className="section" aria-labelledby="approach-title">
      <div className="container">
        <div className="split-head">
          <h2 id="approach-title" className="split-head__title">
            A security partner, not a product.{" "}
            <span className="split-head__title-muted">The method follows the problem in front of us.</span>
          </h2>
          <p className="split-head__lede">
            We work closely with each client and shape the scope, the method and the deliverables around the system in
            question. You keep ownership of your tools and accounts; we bring the people who protect and test them.
          </p>
        </div>
        <ul className="approach">
          {principles.map((principle) => (
            <li key={principle.title} className="approach__item">
              <h3 className="approach__title">{principle.title}</h3>
              <p className="approach__detail">{principle.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
