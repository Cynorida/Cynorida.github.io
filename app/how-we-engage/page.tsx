import { pageMetadata } from "@/components/page/page-metadata";
import { PageShell } from "@/components/page/page-shell";
import { StructuredData, breadcrumbData } from "@/components/page/structured-data";
import { PageHeader } from "@/components/page/page-header";
import { Arrow } from "@/components/brand/arrow";
import { company } from "@/content/company";
import "./engage-page.css";

export const metadata = pageMetadata({
  title: "How we engage: authorisation, scope and rules of engagement",
  description:
    "Offensive testing happens only with prior written authorisation from the system owner, a signed scope and rules of engagement. How we handle scope, third parties, data, reporting and defensive work.",
  path: "/how-we-engage/",
});

const contents = [
  { id: "authorisation", label: "Written authorisation" },
  { id: "scope", label: "A signed scope" },
  { id: "rules-of-engagement", label: "Rules of engagement" },
  { id: "third-parties", label: "Third-party permission" },
  { id: "staying-in-scope", label: "Staying in scope" },
  { id: "control-group", label: "Red-team control group" },
  { id: "data", label: "Findings and client data" },
  { id: "reporting", label: "Reporting, debrief and retest" },
  { id: "declined-work", label: "Work we decline" },
  { id: "defensive", label: "Defensive engagements" },
];

export default function HowWeEngagePage() {
  return (
    <PageShell>
      <StructuredData data={[breadcrumbData([{ name: "How we engage", path: "/how-we-engage/" }])]} />
      <PageHeader
        eyebrow="Authorisation and scope"
        title="How we engage"
        lede="We test systems only with written authorisation from the people who own them, inside a scope and rules of engagement both sides have signed. These are the rules every engagement runs on."
      />

      <section className="page-section" aria-label="Engagement policy">
        <div className="container engage">
          <nav className="engage__contents" aria-labelledby="contents-title">
            <p id="contents-title" className="engage__contents-title">
              On this page
            </p>
            <ol className="engage__contents-list">
              {contents.map((entry) => (
                <li key={entry.id}>
                  <a className="engage__contents-link" href={`#${entry.id}`}>
                    {entry.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="prose engage__body">
            <h2 id="authorisation">Written authorisation comes first</h2>
            <p>
              We carry out penetration testing and red teaming only with <strong>prior written authorisation</strong>{" "}
              from a person who has the authority to grant it for every system in scope. Before any work starts we
              confirm who that person is and that the authority is theirs to give.
            </p>
            <p>
              A verbal go-ahead is not authorisation. Nor is an email from someone who does not control the systems,
              or a request to test systems the requester does not own.
            </p>

            <h2 id="scope">A signed scope</h2>
            <p>Every offensive engagement has a written scope, signed before testing begins. It sets out:</p>
            <ul>
              <li>
                <strong>Targets:</strong> the named applications, hosts, address ranges, accounts or environments we
                may test.
              </li>
              <li>
                <strong>Exclusions:</strong> anything we must not touch, even if it is reachable from a target.
              </li>
              <li>
                <strong>Testing windows:</strong> the dates and times when testing may take place.
              </li>
            </ul>
            <p>
              If the scope needs to change during an engagement, the change is agreed and signed in the same way
              before we act on it.
            </p>

            <h2 id="rules-of-engagement">Rules of engagement</h2>
            <p>Alongside the scope, signed rules of engagement set out how the testing is done:</p>
            <ul>
              <li>The techniques that are allowed, and the techniques that are forbidden.</li>
              <li>How we handle any data we can see or reach during testing.</li>
              <li>Emergency stop contacts on both sides, available throughout the testing windows.</li>
              <li>How we report a critical finding while testing is still under way.</li>
              <li>Any conditions that apply to testing production systems.</li>
            </ul>
            <p>Either side can stop testing at any time through the emergency contacts. If the client asks us to stop, we stop.</p>

            <h2 id="third-parties">Third-party permission</h2>
            <p>
              Many systems run on infrastructure someone else owns, such as cloud providers, hosting companies and
              SaaS vendors. Where their terms require notice or permission before testing, we confirm it is in place
              before we start and we stay within those terms. If a provider does not allow something to be tested, it
              is out of scope.
            </p>

            <h2 id="staying-in-scope">Staying in scope</h2>
            <p>
              We do not test anything outside the agreed scope, and we do not use access gained during an engagement to
              reach systems that are not in it.
            </p>
            <p>
              If we find we have touched an out-of-scope or third-party system by accident, we{" "}
              <strong>stop that activity and notify the client’s contact</strong>, then record what happened in the
              report.
            </p>

            <h2 id="control-group">Red-team control group</h2>
            <p>
              Every red-team engagement runs with a named control group on the client’s side, often called the white
              cell. Its members know the engagement is running, approve its objectives and rules of engagement, are
              kept informed throughout, and <strong>can halt activity at any time</strong>.
            </p>
            <p>
              The control group is also our point of contact if we come across signs of a real intrusion, or if our
              activity is mistaken for one, so the two can be told apart quickly.
            </p>

            <h2 id="data">Findings and client data</h2>
            <ul>
              <li>We access only what the engagement needs.</li>
              <li>Findings, evidence and client data are available only to the people working on the engagement.</li>
              <li>We use client data only for the engagement it was collected for.</li>
              <li>We share findings only with the people the client names.</li>
              <li>At the end of the engagement, we remove or return client data as agreed in the contract.</li>
            </ul>

            <h2 id="reporting">Reporting, debrief and retest</h2>
            <p>
              Each engagement ends with a written report covering the scope, the method, every finding with its
              evidence and remediation guidance, and anything we could not test. We walk the client’s team through it
              on a debrief call. Fixed findings are retested within the window agreed in the contract, and the results
              are recorded in writing.
            </p>

            <h2 id="declined-work">Work we decline</h2>
            <p>
              <strong>We decline work we cannot verify is authorised.</strong> We test systems only for their owner, or
              for someone acting with the owner’s written permission. We do not test systems on anyone else’s behalf,
              and we do not take on work whose aim is to get into systems without their owner’s consent.
            </p>

            <h2 id="defensive">Defensive engagements</h2>
            <p>
              Managed detection and response, incident response, threat hunting and detection engineering run on the
              access the client grants us, and only that access.
            </p>
            <p>
              Containment actions, such as isolating a host or disabling an account, follow the playbooks the client
              has approved. Anything outside an approved playbook goes to the client’s named contact for a decision
              first.
            </p>

            <h2 id="questions">Questions about an engagement</h2>
            <p>
              If you want to know how we would run a particular engagement, or check whether a request is something we
              would take on, get in touch before anything else.
            </p>
            <p>
              <a className="text-link engage__contact" href={`mailto:${company.emails.contact}`}>
                Contact us
                <Arrow />
              </a>
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
