import { Mark } from "@/components/brand/mark";

type Tactic = {
  name: string;
  counts: number[];
};

const tactics: Tactic[] = [
  { name: "Reconnaissance", counts: [0, 0, 1, 0] },
  { name: "Resource Development", counts: [0, 0, 0] },
  { name: "Initial Access", counts: [4, 12, 2, 0, 6] },
  { name: "Execution", counts: [14, 9, 3, 1, 0, 7] },
  { name: "Persistence", counts: [3, 5, 0, 2, 1, 0, 4] },
  { name: "Privilege Escalation", counts: [2, 0, 1, 3, 0] },
  { name: "Defense Evasion", counts: [8, 3, 11, 0, 2, 1, 0, 5] },
  { name: "Credential Access", counts: [6, 2, 0, 1, 4] },
  { name: "Discovery", counts: [9, 4, 2, 6, 0, 1] },
  { name: "Lateral Movement", counts: [1, 0, 3, 0] },
  { name: "Collection", counts: [0, 2, 0, 1] },
  { name: "Command and Control", counts: [5, 1, 0, 3, 2] },
  { name: "Exfiltration", counts: [0, 1, 0] },
  { name: "Impact", counts: [2, 0, 0, 1] },
];

const legend = [
  { level: 0, label: "None" },
  { level: 1, label: "1–2" },
  { level: 2, label: "3–5" },
  { level: 3, label: "6–10" },
  { level: 4, label: "11+" },
];

const dailyAlerts = [
  48, 62, 55, 40, 31, 70, 66, 58, 52, 61, 44, 36, 74, 69, 63, 57, 92, 60, 49, 38, 33, 65, 71, 54, 59, 47, 35, 30, 67,
  62,
];

const incidentDay = 16;

const kpis = [
  { label: "Alerts reviewed", value: "4,912" },
  { label: "Incidents", value: "2" },
  { label: "Hosts isolated", value: "1" },
  { label: "Open recommendations", value: "3" },
];

const incidents = [
  {
    id: "INC-2417",
    severity: "High",
    state: "Contained",
    title: "Office macro launched encoded PowerShell on WS-0412",
    rows: [
      ["02:14:07", "EDR alert on winword.exe starting PowerShell"],
      ["02:16:52", "Process and network events queried"],
      ["02:19:31", "PB-03 isolated WS-0412"],
      ["09:47:12", "Closed after reimage"],
    ],
  },
  {
    id: "INC-2422",
    severity: "Medium",
    state: "Resolved",
    title: "Sign-in from a new country for a.lee",
    rows: [["11:02:40", "Confirmed as travel with the user"]],
  },
];

function heatLevel(count: number) {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 10) return 3;
  return 4;
}

const silentTechniques = tactics.reduce(
  (total, tactic) => total + tactic.counts.filter((count) => count === 0).length,
  0,
);

const silentTactics = tactics.filter((tactic) => tactic.counts.every((count) => count === 0)).map((tactic) => tactic.name);

function PageHeader({ section }: { section: string }) {
  return (
    <div className="report-page__header">
      <span className="report-page__brand">
        <Mark size={12} />
        Monthly security report
      </span>
      <span className="report-page__section">{section}</span>
    </div>
  );
}

function PageFooter({ page }: { page: string }) {
  return (
    <div className="report-page__footer">
      <span>Demo workspace · September 2026</span>
      <span className="numeric">{page}</span>
    </div>
  );
}

export function SummaryPage() {
  return (
    <div className="report-page report-page--summary">
      <PageHeader section="Sample" />
      <p className="report-page__title">Executive summary</p>
      <ul className="report-summary">
        <li>Analysts reviewed 4,912 alerts. Two became incidents and both were closed.</li>
        <li>
          One workstation ran a malicious Office macro. It was isolated 5 minutes 24 seconds after the first alert, and
          no other host was affected.
        </li>
        <li>Three recommendations are open. The most important is blocking macros in files from the internet.</li>
      </ul>
      <dl className="report-kpis">
        {kpis.map((item) => (
          <div key={item.label} className="report-kpis__item">
            <dt>{item.label}</dt>
            <dd className="numeric">{item.value}</dd>
          </div>
        ))}
      </dl>
      <div className="report-bars">
        <p className="report-bars__label">
          <span>Alerts per day</span>
          <span className="numeric">17 Sep · INC-2417</span>
        </p>
        <div className="report-bars__chart">
          {dailyAlerts.map((value, index) => (
            <span
              key={index}
              className={`report-bars__bar${index === incidentDay ? " is-marked" : ""}`}
              style={{ blockSize: `${value}%` }}
            />
          ))}
        </div>
      </div>
      <PageFooter page="1 / 8" />
    </div>
  );
}

export function CoveragePage() {
  return (
    <div className="report-page report-page--coverage">
      <PageHeader section="MITRE ATT&CK Enterprise" />
      <p className="report-page__title">Detection coverage</p>
      <div className="coverage-grid">
        {tactics.map((tactic) => (
          <div key={tactic.name} className="coverage-grid__tactic">
            <span className="coverage-grid__name">{tactic.name}</span>
            <span className="coverage-grid__cells">
              {tactic.counts.map((count, index) => (
                <span key={index} className={`coverage-grid__cell coverage-grid__cell--${heatLevel(count)}`} />
              ))}
            </span>
          </div>
        ))}
      </div>
      <div className="coverage-legend">
        <span className="coverage-legend__title">Detections per technique, sample values</span>
        <span className="coverage-legend__scale">
          {legend.map((item) => (
            <span key={item.level} className="coverage-legend__item">
              <span className={`coverage-grid__cell coverage-grid__cell--${item.level}`} />
              {item.label}
            </span>
          ))}
        </span>
      </div>
      <p className="coverage-note">
        {silentTechniques} techniques had no detections. Not yet covered: {silentTactics.join(", ")}.
      </p>
      <PageFooter page="6 / 8" />
    </div>
  );
}

export function IncidentPage() {
  return (
    <div className="report-page report-page--incidents">
      <PageHeader section="Incidents" />
      <p className="report-page__title">Incidents this month</p>
      <ol className="report-incidents">
        {incidents.map((incident) => (
          <li key={incident.id} className="report-incidents__item">
            <p className="report-incidents__head">
              <span className="numeric">{incident.id}</span>
              <span>{incident.severity}</span>
              <span>{incident.state}</span>
            </p>
            <p className="report-incidents__title">{incident.title}</p>
            <ul className="report-incidents__rows">
              {incident.rows.map(([time, text]) => (
                <li key={time}>
                  <span className="numeric">{time}</span>
                  {text}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <PageFooter page="2 / 8" />
    </div>
  );
}
