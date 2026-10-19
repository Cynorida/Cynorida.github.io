import { RuleCode } from "./rule-code";
import { RuleTabs, type RuleTab } from "./rule-tabs";
import "./platform.css";

const ruleTabs: RuleTab[] = [
  {
    key: "sigma",
    label: "Sigma",
    file: "proc_creation_win_office_script_child.yml",
    panel: <RuleCode language="sigma" />,
  },
  {
    key: "kql",
    label: (
      <>
        <span className="rule-panel__vendor">Sentinel </span>KQL
      </>
    ),
    file: "office_script_child.kql",
    panel: <RuleCode language="kql" />,
  },
  {
    key: "spl",
    label: (
      <>
        <span className="rule-panel__vendor">Splunk </span>SPL
      </>
    ),
    file: "office_script_child.spl",
    panel: <RuleCode language="spl" />,
  },
];

const signIns = [
  { time: "09:12:04", place: "Lisbon, PT", address: "198.51.100.23" },
  { time: "09:53:17", place: "Singapore, SG", address: "203.0.113.77", flagged: true },
];

const cloudEvents = [
  { time: "03:41:08", name: "ConsoleLogin", principal: "svc-backup" },
  { time: "03:42:30", name: "CreateAccessKey", principal: "svc-backup" },
  { time: "03:44:02", name: "PutBucketPolicy", principal: "AKIA…EXAMPLE" },
  { time: "03:45:19", name: "StopLogging", principal: "AKIA…EXAMPLE", flagged: true },
];

const playbooks = [
  { id: "PB-03", name: "Isolate host", approved: true },
  { id: "PB-05", name: "Revoke sessions", approved: true },
  { id: "PB-07", name: "Disable account", approved: false },
  { id: "PB-08", name: "Block file hash", approved: true },
];

const findings = [
  "Two incidents, both closed. Neither reached a server.",
  "Most alerts came from one noisy backup job, now tuned.",
  "One admin account still signs in without MFA. Fix on page 3.",
  "Six new detection rules went live for your identity provider.",
];

const dailyAlerts = [
  18, 22, 15, 9, 7, 24, 20, 26, 64, 31, 12, 8, 21, 19, 23, 17, 28, 10, 6, 25, 22, 30, 72, 27, 14, 9, 20, 18, 24, 16, 11,
];

const incidentDays = new Set([9, 23]);

export function Platform() {
  return (
    <>
      <section id="platform" className="section" aria-labelledby="platform-title">
        <div className="container">
          <div className="split-head">
            <h2 id="platform-title" className="split-head__title">
              One console for the whole investigation.{" "}
              <span className="split-head__title-muted">
                Your team and ours see the same alerts, evidence and notes as they happen.
              </span>
            </h2>
            <p className="split-head__lede">
              Rules, sign-ins, cloud activity, playbooks and reports live in the same workspace our analysts use. You
              can read every rule we run against your data and decide which actions we may take without calling you
              first.
            </p>
          </div>

          <div className="bento">
            <article className="bento__tile bento__tile--rules">
              <div className="bento__copy">
                <h3 className="bento__title">Detections you can read</h3>
                <p className="bento__text">
                  Every rule we run is in your console as Sigma, with the KQL and SPL versions next to it so your
                  team can run the same search in its own tools.
                </p>
              </div>
              <div className="bento__visual rule-panel">
                <RuleTabs label="Rule format" tabs={ruleTabs} />
                <div className="rule-panel__foot">
                  <span className="rule-panel__tags">
                    <span className="tag tag--high">level: high</span>
                    <span className="tag">T1059.001</span>
                    <span className="tag">T1204.002</span>
                  </span>
                  <span className="rule-panel__credit">
                    Maintained by Cynorida detection engineering · Mapped to MITRE ATT&amp;CK
                  </span>
                </div>
              </div>
            </article>

            <article className="bento__tile bento__tile--identity">
              <div className="bento__copy">
                <h3 className="bento__title">Identity</h3>
                <p className="bento__text">
                  Each sign-in is compared with the one before it, so a login from Singapore 41 minutes after
                  Lisbon gets a person looking at it.
                </p>
              </div>
              <div className="bento__visual bento-pane sign-in-trail">
                <div className="bento-pane__head">
                  <span className="bento-pane__title sign-in-trail__user">j.doe@example.com</span>
                  <span className="tag tag--high">
                    <span className="dot" />
                    Impossible travel
                  </span>
                </div>
                <div className="sign-in-trail__map" aria-hidden="true">
                  <svg className="sign-in-trail__arc" viewBox="0 0 280 64" fill="none">
                    <path
                      className="sign-in-trail__path"
                      d="M14 52 Q140 -12 266 52"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeDasharray="3 4"
                      strokeLinecap="round"
                    />
                    <circle className="sign-in-trail__origin" cx="14" cy="52" r="4" fill="currentColor" />
                    <circle className="sign-in-trail__halo" cx="266" cy="52" r="9" fill="currentColor" />
                    <circle className="sign-in-trail__target" cx="266" cy="52" r="4" fill="currentColor" />
                  </svg>
                  <div className="sign-in-trail__places">
                    <span>LIS</span>
                    <span className="sign-in-trail__span numeric">11,900 km in 41 min</span>
                    <span>SIN</span>
                  </div>
                </div>
                <ol className="sign-in-trail__list">
                  {signIns.map((entry) => (
                    <li
                      key={entry.time}
                      className={`sign-in-trail__row${entry.flagged ? " sign-in-trail__row--flag" : ""}`}
                    >
                      <span className="sign-in-trail__time numeric">{entry.time}</span>
                      <span className="sign-in-trail__place">{entry.place}</span>
                      <span className="sign-in-trail__address numeric">{entry.address}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </article>

            <article className="bento__tile bento__tile--cloud">
              <div className="bento__copy">
                <h3 className="bento__title">Cloud</h3>
                <p className="bento__text">
                  CloudTrail is watched for the API calls attackers make to cover their tracks, such as turning
                  logging off.
                </p>
              </div>
              <div className="bento__visual bento-pane event-feed">
                <div className="bento-pane__head">
                  <span className="bento-pane__title">CloudTrail</span>
                  <span className="bento-pane__meta numeric">eu-west-1 · 111122223333</span>
                </div>
                <ol className="event-feed__list">
                  {cloudEvents.map((event) => (
                    <li
                      key={event.time}
                      className={`event-feed__row${event.flagged ? " event-feed__row--flag" : ""}`}
                    >
                      <span className="event-feed__time numeric">{event.time}</span>
                      <span className="event-feed__name">{event.name}</span>
                      <span className="event-feed__principal">{event.principal}</span>
                      {event.flagged ? <span className="visually-hidden">Flagged</span> : null}
                    </li>
                  ))}
                </ol>
                <div className="bento-pane__foot">
                  <span className="tag tag--high">T1562.008</span>
                  <span className="bento-pane__note">Trail org-audit stopped from 203.0.113.91</span>
                </div>
              </div>
            </article>

            <article className="bento__tile bento__tile--response">
              <div className="bento__copy">
                <h3 className="bento__title">Response</h3>
                <p className="bento__text">
                  Analysts act only through playbooks you have approved in advance. Anything else waits for a yes
                  from your team.
                </p>
              </div>
              <div className="bento__visual bento-pane playbook-list">
                <div className="bento-pane__head">
                  <span className="bento-pane__title">Playbooks</span>
                  <span className="bento-pane__meta">Set by your team</span>
                </div>
                <ul className="playbook-list__rows">
                  {playbooks.map((playbook) => (
                    <li key={playbook.id} className="playbook-list__row">
                      <span
                        className={`toggle${playbook.approved ? " toggle--on" : ""}`}
                        aria-hidden="true"
                      />
                      <span className="playbook-list__name">
                        {playbook.name}
                        <span className="playbook-list__id numeric">{playbook.id}</span>
                      </span>
                      <span className={`playbook-list__state tag ${playbook.approved ? "tag--ok" : "tag--medium"}`}>
                        {playbook.approved ? "Pre-approved" : "Ask first"}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="bento-pane__foot">
                  <span className="bento-pane__note">Last changed by it-admin@example.com · 2 Oct</span>
                </div>
              </div>
            </article>

            <article className="bento__tile bento__tile--report">
              <div className="bento__copy">
                <h3 className="bento__title">Reporting</h3>
                <p className="bento__text">
                  Each month you get a short report written for the people who were not in the incident channel.
                </p>
              </div>
              <div className="bento__visual bento-pane month-card">
                <div className="bento-pane__head">
                  <span className="bento-pane__title">October summary</span>
                  <span className="bento-pane__meta numeric">Sent 1 Nov · 4 pages</span>
                </div>
                <div className="month-card__body">
                  <ul className="month-card__list">
                    {findings.map((finding) => (
                      <li key={finding} className="month-card__item">
                        {finding}
                      </li>
                    ))}
                  </ul>
                  <figure className="month-card__chart">
                    <div
                      className="day-bars"
                      role="img"
                      aria-label="Alerts per day in October, with spikes on the 9th and 23rd when the two incidents opened"
                    >
                      {dailyAlerts.map((value, index) => (
                        <span
                          key={index}
                          className={`day-bars__bar${incidentDays.has(index + 1) ? " day-bars__bar--incident" : ""}`}
                          style={{ blockSize: `${Math.round((value / 72) * 100)}%` }}
                        />
                      ))}
                    </div>
                    <figcaption className="day-bars__axis">
                      <span className="numeric">1 Oct</span>
                      <span className="day-bars__legend">
                        <span className="dot" />
                        Incident opened
                      </span>
                      <span className="numeric">31 Oct</span>
                    </figcaption>
                  </figure>
                </div>
              </div>
            </article>
          </div>

          <p className="bento__caption">Interface examples use synthetic data.</p>
        </div>
      </section>
    </>
  );
}
