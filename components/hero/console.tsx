import { Mark } from "@/components/brand/mark";

const navigation = [
  { label: "Inbox", count: "4" },
  { label: "Incidents", count: "2", active: true },
  { label: "Detections", count: "312" },
  { label: "Assets", count: "1,284" },
  { label: "Playbooks", count: "9" },
  { label: "Reports" },
];

const coverage = [
  { label: "Endpoints", state: "ok" },
  { label: "Identity", state: "ok" },
  { label: "Cloud", state: "ok" },
  { label: "Email", state: "medium" },
];

const activity = [
  {
    time: "02:14:07",
    actor: "Detection",
    tone: "high",
    text: (
      <>
        <b>winword.exe</b> started <b>powershell.exe</b> with an encoded command
      </>
    ),
    tag: "T1059.001",
  },
  {
    time: "02:14:39",
    actor: "Analyst",
    tone: "info",
    text: <>Picked up by the tier 2 analyst on shift</>,
  },
  {
    time: "02:16:52",
    actor: "Query",
    tone: "neutral",
    text: (
      <>
        Pulled the 30-minute process tree for <b>WS-0412</b>
      </>
    ),
    tag: "View KQL",
  },
  {
    time: "02:18:10",
    actor: "Finding",
    tone: "medium",
    text: (
      <>
        Decoded script fetches stage 2 from <code>cdn-update[.]example</code>
      </>
    ),
  },
  {
    time: "02:19:31",
    actor: "Playbook",
    tone: "ok",
    text: (
      <>
        <b>PB-03</b> isolated WS-0412 from the network
      </>
    ),
    tag: "Pre-approved",
  },
  {
    time: "02:21:05",
    actor: "Notified",
    tone: "neutral",
    text: (
      <>
        Summary posted to <b>#sec-incidents</b>, on-call paged
      </>
    ),
  },
];

const properties = [
  { label: "Status", value: <span className="tag tag--ok"><span className="dot" />Contained</span> },
  { label: "Severity", value: <span className="tag tag--high">High</span> },
  { label: "Host", value: <code>WS-0412</code> },
  { label: "User", value: <code>j.doe</code> },
  { label: "First seen", value: <span className="numeric">02:14:07 UTC</span> },
  { label: "Playbook", value: <>PB-03 Isolate host</> },
];

export function Console() {
  return (
    <div className="console" aria-hidden="true">
      <div className="console__bar">
        <div className="console__crumbs">
          <span className="console__crumb">Incidents</span>
          <span className="console__crumb-sep">/</span>
          <span className="console__crumb console__crumb--current numeric">INC-2417</span>
        </div>
        <div className="console__presence">
          <span className="console__live">
            <span className="console__live-dot" />
            Live
          </span>
          <span className="console__avatars">
            <span className="console__avatar console__avatar--client">YT</span>
            <span className="console__avatar console__avatar--analyst">CY</span>
          </span>
          <span className="console__shared">Shared with your team</span>
        </div>
      </div>

      <div className="console__body">
        <aside className="console__side">
          <div className="console__workspace">
            <span className="console__workspace-mark">
              <Mark size={14} />
            </span>
            Demo workspace
          </div>
          <ul className="console__nav">
            {navigation.map((item) => (
              <li
                key={item.label}
                className={`console__nav-item${item.active ? " is-active" : ""}`}
              >
                <span>{item.label}</span>
                {item.count ? <span className="console__count numeric">{item.count}</span> : null}
              </li>
            ))}
          </ul>
          <p className="console__side-label">Watching</p>
          <ul className="console__nav">
            {coverage.map((item) => (
              <li key={item.label} className="console__nav-item">
                <span className="console__watch">
                  <span className={`console__state console__state--${item.state}`} />
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </aside>

        <div className="console__main">
          <div className="console__title-row">
            <span className="tag tag--high">High</span>
            <span className="tag">T1566.001</span>
            <span className="tag">T1059.001</span>
          </div>
          <p className="console__title">Office macro launched encoded PowerShell on WS-0412</p>
          <p className="console__subtitle numeric">
            Opened 02:14:07 UTC · Contained in 5 min 24 s · 6 events
          </p>

          <p className="console__section">Activity</p>
          <ol className="console__activity">
            {activity.map((entry) => (
              <li key={entry.time} className={`console__event console__event--${entry.tone}`}>
                <span className="console__time numeric">{entry.time}</span>
                <span className="console__node" />
                <span className="console__actor">{entry.actor}</span>
                <span className="console__text">{entry.text}</span>
                {entry.tag ? <span className="tag console__event-tag">{entry.tag}</span> : null}
              </li>
            ))}
          </ol>

          <div className="console__note">
            <span className="console__note-avatar">CY</span>
            <div className="console__note-body">
              <p className="console__note-head">
                <b>Analyst note</b>
                <span className="console__note-time numeric">02:20</span>
              </p>
              <p>
                Stage 2 URL blocked at the proxy. No other host contacted <code>203.0.113.48</code> in the last 30
                days. Reimage recommended before release.
              </p>
              <div className="console__note-actions">
                <span className="console__note-action console__note-action--primary">Approve reimage</span>
                <span className="console__note-action">Reply</span>
              </div>
            </div>
          </div>
        </div>

        <aside className="console__rail">
          <p className="console__section">Properties</p>
          <dl className="console__props">
            {properties.map((item) => (
              <div key={item.label} className="console__prop">
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>

          <p className="console__section">Process tree</p>
          <ol className="tree">
            <li className="tree__row">
              <span className="tree__name">winword.exe</span>
              <span className="tree__detail">invoice_0915.docm</span>
            </li>
            <li className="tree__row tree__row--child tree__row--flag">
              <span className="tree__name">powershell.exe</span>
              <span className="tree__detail">-nop -w hidden -enc SQBFAFgA…</span>
            </li>
            <li className="tree__row tree__row--grandchild">
              <span className="tree__name">rundll32.exe</span>
              <span className="tree__detail">%TEMP%\a.dll,Start</span>
            </li>
          </ol>
        </aside>
      </div>
    </div>
  );
}
