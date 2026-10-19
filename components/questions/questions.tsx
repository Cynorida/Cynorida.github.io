import type { ReactNode } from "react";
import { Arrow } from "@/components/brand/arrow";
import { incidentHref, projectHref } from "@/components/page/contact-links";
import { company } from "@/content/company";
import "./questions.css";

type Question = {
  question: string;
  answer: ReactNode;
};

const questions: Question[] = [
  {
    question: "Do we have to buy software, licences or cloud accounts from you?",
    answer: (
      <p>
        No. We sell security work, not products. We protect and test the systems, tools and accounts you already run,
        and you keep ownership and admin access to all of them.
      </p>
    ),
  },
  {
    question: "Will you ever test something we have not authorised?",
    answer: (
      <p>
        No. Penetration testing and red teaming start only after written authorisation from someone with the
        authority to give it, and a scope and rules of engagement both sides have signed. Anything outside that scope
        is not touched.
      </p>
    ),
  },
  {
    question: "What happens if you find something critical during a test?",
    answer: (
      <p>
        We tell your named contact straight away rather than waiting for the report, so you can fix or contain it
        while the rest of the work continues.
      </p>
    ),
  },
  {
    question: "What do we get at the end?",
    answer: (
      <>
        <p>A written report and a walkthrough with your team. The report covers:</p>
        <ol className="faq__steps">
          <li>An executive summary written for non-specialists.</li>
          <li>Each finding with its severity, evidence, steps to reproduce and how to fix it.</li>
          <li>The scope and method, including anything we could not test.</li>
          <li>A retest of the findings you fix, with the results in writing.</li>
        </ol>
      </>
    ),
  },
  {
    question: "What happens to our data?",
    answer: (
      <p>
        We access only what the engagement needs, share findings only with the people you name, use your data only for
        that engagement, and remove or return it at the end as agreed in the contract.
      </p>
    ),
  },
  {
    question: "Can you help if we are already under attack?",
    answer: (
      <p>
        Yes. Incident response covers scoping, containment, investigation and recovery. Email{" "}
        <a href={incidentHref}>{company.emails.security}</a> with what you know so far and how to reach you.
      </p>
    ),
  },
  {
    question: "How is the price worked out?",
    answer: (
      <p>
        From the scope: the number and size of the systems involved, the depth of testing or monitoring, and the
        timeline. We send a proposal with the scope, method and price before any work starts.
      </p>
    ),
  },
];

export function Questions() {
  return (
    <>
      <section id="questions" className="section" aria-labelledby="questions-title">
        <div className="container faq">
          <div className="faq__head">
            <h2 id="questions-title" className="split-head__title faq__title">
              Questions clients ask <span className="split-head__title-muted">before they sign.</span>
            </h2>
            <p className="faq__lede">
              Something else on your list? Ask the engineers who would do the work.
            </p>
            <a className="split-head__link faq__link" href={projectHref}>
              Talk to the team
              <Arrow />
            </a>
          </div>

          <div className="faq__list">
            {questions.map(({ question, answer }, index) => (
              <details key={question} className="faq__item" open={index === 0}>
                <summary className="faq__question">
                  <span className="faq__question-text">{question}</span>
                  <span className="faq__icon" aria-hidden="true" />
                </summary>
                <div className="faq__answer">{answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
