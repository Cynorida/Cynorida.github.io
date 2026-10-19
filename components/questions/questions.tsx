import type { ReactNode } from "react";
import { Arrow } from "@/components/brand/arrow";
import "./questions.css";

type Question = {
  question: string;
  answer: ReactNode;
};

const questions: Question[] = [
  {
    question: "Do we have to replace our EDR?",
    answer: (
      <p>
        No. We connect to the tools you already run: your endpoint agent, such as Microsoft Defender for Endpoint,
        CrowdStrike Falcon or SentinelOne; your identity provider, such as Microsoft Entra ID, Okta or Google
        Workspace; your cloud audit logs; and your email platform. You keep your licences and your own admin access
        to every one of them.
      </p>
    ),
  },
  {
    question: "What can your analysts do without asking us?",
    answer: (
      <>
        <p>
          Only the actions written into playbooks you approve, such as isolating a laptop or revoking a session for a
          specific type of alert. Anything outside those playbooks waits for a named approver on your side.
        </p>
        <p>
          Every action, pre-approved or not, is logged in the shared console with the analyst who took it and the
          time it happened.
        </p>
      </>
    ),
  },
  {
    question: "Where is our data stored and who can see it?",
    answer: (
      <p>
        Your data stays in the region you choose at onboarding. Only the analysts assigned to your account can open
        it, and each time one of them does, the access is logged where your team can review it.
      </p>
    ),
  },
  {
    question: "What happens at 3 a.m. on a Sunday?",
    answer: (
      <p>
        The same as at 3 p.m. on a Tuesday. Analysts are on shift around the clock and work from the same playbooks.
        If an alert needs a decision from you, they page the people in your escalation tree, in the order you set.
      </p>
    ),
  },
  {
    question: "How long does onboarding take?",
    answer: (
      <>
        <p>
          It depends on how many sources you connect and how quickly your team agrees the playbooks, so we plan the
          dates with you instead of quoting a number up front. The steps are always the same:
        </p>
        <ol className="faq__steps">
          <li>Connect your EDR, identity provider and cloud accounts.</li>
          <li>Agree the playbooks our analysts may run without asking.</li>
          <li>Tune detections against what normal looks like in your environment.</li>
          <li>Go live, with your team watching in the shared console.</li>
        </ol>
      </>
    ),
  },
  {
    question: "Can we leave and take our data with us?",
    answer: (
      <p>
        Yes. Incidents, timelines and reports export as CSV, PDF or JSON whenever you want them, not only when you
        leave. Because we work on your own EDR and identity provider, there is no agent of ours to remove on the way
        out.
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
              Questions security teams ask <span className="split-head__title-muted">before they sign.</span>
            </h2>
            <p className="faq__lede">
              Something else on your list? Ask the people who would be watching your alerts.
            </p>
            <a className="split-head__link faq__link" href="#walkthrough">
              Talk to an analyst
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
