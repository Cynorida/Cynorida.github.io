import { Fragment, type ReactNode } from "react";

export type Tone = "high" | "info" | "neutral" | "medium" | "ok";

export type Moment = {
  id: string;
  time: string;
  label: string;
  summary: string;
  tone: Tone;
  content: ReactNode;
};

type TokenKind = "plain" | "keyword" | "string" | "operator" | "function";
type Token = [TokenKind, string];

type AlertValue = string | string[];

const alertFields: [string, AlertValue][] = [
  ["alert_id", "edr-7f3a91c2"],
  ["detected_at", "2026-09-17T02:14:07Z"],
  ["severity", "high"],
  ["rule", "Office application started encoded PowerShell"],
  ["host", "WS-0412"],
  ["user", "j.doe@example.com"],
  ["parent_process", "winword.exe"],
  ["process", "powershell.exe"],
  ["command_line", "powershell.exe -nop -w hidden -enc SQBFAFgA…"],
  ["source_file", "invoice_0915.docm"],
  ["techniques", ["T1566.001", "T1059.001"]],
];

const queryLines: Token[][] = [
  [["keyword", "union"], ["plain", " DeviceProcessEvents, DeviceNetworkEvents"]],
  [["operator", "| "], ["keyword", "where"], ["plain", " DeviceName "], ["operator", "=~"], ["string", ' "ws-0412"']],
  [
    ["operator", "| "],
    ["keyword", "where"],
    ["plain", " Timestamp "],
    ["keyword", "between"],
    ["plain", " ("],
    ["function", "datetime"],
    ["plain", "(2026-09-17 01:44) .. "],
    ["function", "datetime"],
    ["plain", "(2026-09-17 02:15))"],
  ],
  [
    ["operator", "| "],
    ["keyword", "where"],
    ["plain", " InitiatingProcessFileName "],
    ["operator", "in~"],
    ["plain", " ("],
    ["string", '"winword.exe"'],
    ["plain", ", "],
    ["string", '"powershell.exe"'],
    ["plain", ")"],
  ],
  [
    ["operator", "| "],
    ["keyword", "project"],
    ["plain", " Timestamp, InitiatingProcessFileName, ActionType, Target = "],
    ["function", "coalesce"],
    ["plain", "(ProcessCommandLine, RemoteUrl)"],
  ],
  [["operator", "| "], ["keyword", "order by"], ["plain", " Timestamp "], ["keyword", "asc"]],
];

const queryResults = [
  {
    time: "02:14:06",
    parent: "winword.exe",
    action: "ProcessCreated",
    target: "powershell.exe -nop -w hidden -enc SQBFAFgA…",
    flagged: true,
  },
  {
    time: "02:14:08",
    parent: "powershell.exe",
    action: "ConnectionSuccess",
    target: "hxxps://cdn-update[.]example/s2 · 203.0.113.48",
    flagged: true,
  },
  {
    time: "02:14:09",
    parent: "powershell.exe",
    action: "ProcessCreated",
    target: "rundll32.exe %TEMP%\\a.dll,Start",
    flagged: false,
  },
];

const scopeChecks = [
  { check: "Hosts that contacted 203.0.113.48, last 30 days", result: "1 of 1,284", tone: "medium" },
  { check: "DNS lookups for cdn-update[.]example", result: "WS-0412 only", tone: "medium" },
  { check: "Mailboxes that received invoice_0915.docm", result: "3 received · 1 opened", tone: "medium" },
  { check: "New sign-in locations for j.doe", result: "None", tone: "ok" },
];

const stateChanges = [
  { field: "Network", before: "Connected", after: "Isolated, EDR channel only" },
  { field: "rundll32.exe, PID 6412", before: "Running", after: "Terminated" },
  { field: "Outbound to 203.0.113.48", before: "Allowed", after: "Blocked" },
  { field: "Status in console", before: "At risk", after: "Contained" },
];

const techniques = [
  { id: "T1566.001", name: "Phishing: Spearphishing Attachment", tactic: "Initial Access" },
  { id: "T1059.001", name: "Command and Scripting Interpreter: PowerShell", tactic: "Execution" },
  { id: "T1218.011", name: "System Binary Proxy Execution: Rundll32", tactic: "Defense Evasion" },
];

const followUps = [
  { action: "Reimage WS-0412", owner: "Your IT team", state: "Done", tone: "ok" },
  { action: "Reset j.doe’s password and sign-in sessions", owner: "Your IT team", state: "Done", tone: "ok" },
  { action: "Alert on rundll32 loading DLLs from %TEMP%", owner: "Cynorida", state: "Done", tone: "ok" },
  { action: "Block macros in Office files from the internet", owner: "Your IT team", state: "Open", tone: "medium" },
];

function MomentHead({
  time,
  elapsed,
  title,
  children,
}: {
  time: string;
  elapsed: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="moment__head">
      <p className="moment__time numeric">
        <span>{time} UTC</span>
        <span className="moment__elapsed">{elapsed}</span>
      </p>
      <h3 className="moment__title">{title}</h3>
      <p className="moment__text">{children}</p>
    </div>
  );
}

function AlertJson() {
  return (
    <div className="code-block">
      <div className="code-block__head">
        <span className="code-block__name">alert.json</span>
        <span className="code-block__meta">Raw from EDR · unedited</span>
      </div>
      <pre className="code-block__body">
        <code>
          <span className="code-block__line code-block__operator">{"{"}</span>
          {alertFields.map(([key, value], index) => (
            <span key={key} className="code-block__line">
              {"  "}
              <span className="code-block__key">&quot;{key}&quot;</span>
              <span className="code-block__operator">: </span>
              {Array.isArray(value) ? (
                <>
                  <span className="code-block__operator">[</span>
                  {value.map((item, itemIndex) => (
                    <Fragment key={item}>
                      <span className="code-block__string">&quot;{item}&quot;</span>
                      {itemIndex < value.length - 1 ? <span className="code-block__operator">, </span> : null}
                    </Fragment>
                  ))}
                  <span className="code-block__operator">]</span>
                </>
              ) : (
                <span className={key === "severity" ? "code-block__string code-block__string--high" : "code-block__string"}>
                  &quot;{value}&quot;
                </span>
              )}
              {index < alertFields.length - 1 ? <span className="code-block__operator">,</span> : null}
            </span>
          ))}
          <span className="code-block__line code-block__operator">{"}"}</span>
        </code>
      </pre>
    </div>
  );
}

function QueryBlock() {
  return (
    <div className="code-block">
      <div className="code-block__head">
        <span className="code-block__name">Query · KQL</span>
        <span className="code-block__meta numeric">Ran 02:16:52 by CY · 3 rows</span>
      </div>
      <pre className="code-block__body">
        <code>
          {queryLines.map((line, lineIndex) => (
            <span key={lineIndex} className="code-block__line">
              {line.map(([kind, text], tokenIndex) => (
                <span key={tokenIndex} className={`code-block__${kind}`}>
                  {text}
                </span>
              ))}
            </span>
          ))}
        </code>
      </pre>
      <div className="result-table">
        <table>
          <caption className="visually-hidden">Query results</caption>
          <thead>
            <tr>
              <th scope="col">Timestamp</th>
              <th scope="col">Initiating process</th>
              <th scope="col">Action</th>
              <th scope="col">Target</th>
            </tr>
          </thead>
          <tbody>
            {queryResults.map((row) => (
              <tr key={row.time} className={row.flagged ? "is-flagged" : undefined}>
                <td className="numeric">{row.time}</td>
                <td>{row.parent}</td>
                <td>{row.action}</td>
                <td>{row.target}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ScopeCheck() {
  return (
    <div className="scope">
      <div className="scope__summary">
        <p className="scope__headline">
          <span className="scope__count numeric">1</span> of <span className="numeric">1,284</span> hosts contacted{" "}
          <code>203.0.113.48</code>
        </p>
        <p className="scope__meta">All managed endpoints · last 30 days · the one hit is WS-0412</p>
        <div className="scope__field" aria-hidden="true">
          <span className="scope__hit" />
        </div>
      </div>
      <table className="check-table">
        <caption className="visually-hidden">Scope checks</caption>
        <thead>
          <tr>
            <th scope="col">Check</th>
            <th scope="col">Result</th>
          </tr>
        </thead>
        <tbody>
          {scopeChecks.map((row) => (
            <tr key={row.check}>
              <td>{row.check}</td>
              <td>
                <span className={`tag tag--${row.tone}`}>{row.result}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ContainmentAction() {
  return (
    <div className="action-card">
      <div className="action-card__head">
        <span className="action-card__id">PB-03</span>
        <span className="action-card__name">Isolate host</span>
        <span className="action-card__tags">
          <span className="tag tag--ok">
            <span className="dot" />
            Pre-approved
          </span>
          <span className="tag">Executed via EDR API</span>
        </span>
      </div>
      <dl className="action-card__meta">
        <div>
          <dt>Target</dt>
          <dd>
            <code>WS-0412</code>
          </dd>
        </div>
        <div>
          <dt>Run by</dt>
          <dd>Analyst on shift, CY</dd>
        </div>
        <div>
          <dt>Approval</dt>
          <dd>Standing approval from your IT lead, 4 Aug 2026, for high-severity alerts on workstations</dd>
        </div>
      </dl>
      <p className="action-card__call">
        <code>POST https://edr.example/api/v1/hosts/WS-0412/isolate</code>
        <span className="tag tag--ok numeric">202 Accepted · 02:19:31</span>
      </p>
      <table className="state-table">
        <caption className="visually-hidden">State before and after isolation</caption>
        <thead>
          <tr>
            <th scope="col">Field</th>
            <th scope="col">Before</th>
            <th scope="col">After</th>
          </tr>
        </thead>
        <tbody>
          {stateChanges.map((row) => (
            <tr key={row.field}>
              <td>{row.field}</td>
              <td className="state-table__before">{row.before}</td>
              <td className="state-table__after">{row.after}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ChatNotice() {
  return (
    <div className="chat">
      <div className="chat__channel">
        <span className="chat__hash" aria-hidden="true">
          #
        </span>
        sec-incidents
        <span className="chat__members">Your chat workspace</span>
      </div>
      <div className="chat__message">
        <span className="chat__avatar chat__avatar--analyst" aria-hidden="true">
          CY
        </span>
        <div className="chat__content">
          <p className="chat__meta">
            <span className="chat__author">Cynorida</span>
            <span className="tag">App</span>
            <span className="chat__time numeric">02:21</span>
          </p>
          <p className="chat__text">
            <b>INC-2417 · High · Contained.</b> An Office macro on WS-0412 (j.doe) ran encoded PowerShell and reached{" "}
            <code>203.0.113.48</code>. PB-03 isolated the host at 02:19:31 UTC. No other host contacted the address.
          </p>
          <dl className="chat__fields">
            <div>
              <dt>Needs from you</dt>
              <dd>Reimage WS-0412, reset j.doe’s password</dd>
            </div>
            <div>
              <dt>Paged</dt>
              <dd>IT on-call, by phone</dd>
            </div>
          </dl>
          <p className="chat__link">Open INC-2417 in the console</p>
        </div>
      </div>
      <div className="chat__message">
        <span className="chat__avatar chat__avatar--client" aria-hidden="true">
          YT
        </span>
        <div className="chat__content">
          <p className="chat__meta">
            <span className="chat__author">IT on-call</span>
            <span className="chat__time numeric">02:23</span>
          </p>
          <p className="chat__text">Acknowledged. Collecting the laptop from j.doe at 08:00 for a reimage.</p>
        </div>
      </div>
    </div>
  );
}

function ClosureSummary() {
  return (
    <div className="closure">
      <dl className="closure__stats numeric">
        <div>
          <dt>Opened</dt>
          <dd>02:14:07</dd>
        </div>
        <div>
          <dt>Contained</dt>
          <dd>02:19:31</dd>
        </div>
        <div>
          <dt>Closed</dt>
          <dd>09:47:12</dd>
        </div>
        <div>
          <dt>Hosts affected</dt>
          <dd>1</dd>
        </div>
      </dl>
      <div className="closure__row">
        <p className="closure__label">Root cause</p>
        <p className="closure__text">
          A macro-enabled attachment, <code>invoice_0915.docm</code>, arrived from the look-alike domain{" "}
          <code>supplier-invoices.example</code> and was opened with macros enabled.
        </p>
      </div>
      <div className="closure__row">
        <p className="closure__label">ATT&amp;CK techniques</p>
        <ul className="technique-list">
          {techniques.map((item) => (
            <li key={item.id}>
              <span className="tag">{item.id}</span>
              <span className="technique-list__name">{item.name}</span>
              <span className="technique-list__tactic">{item.tactic}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="closure__row">
        <p className="closure__label">Follow-ups</p>
        <table className="follow-table">
          <caption className="visually-hidden">Follow-up actions</caption>
          <thead>
            <tr>
              <th scope="col">Action</th>
              <th scope="col">Owner</th>
              <th scope="col">State</th>
            </tr>
          </thead>
          <tbody>
            {followUps.map((row) => (
              <tr key={row.action}>
                <td>{row.action}</td>
                <td className="follow-table__owner">{row.owner}</td>
                <td>
                  <span className={`tag tag--${row.tone}`}>{row.state}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TriageNote() {
  return (
    <div className="triage">
      <ol className="status-list">
        <li>
          <span className="status-list__time numeric">02:14:07</span>
          <span className="status-list__text">Alert opened as INC-2417</span>
          <span className="tag tag--high">New</span>
        </li>
        <li>
          <span className="status-list__time numeric">02:14:39</span>
          <span className="status-list__text">Assigned to the tier 2 analyst on shift</span>
          <span className="tag tag--info">Triage</span>
        </li>
        <li>
          <span className="status-list__time numeric">02:14:41</span>
          <span className="status-list__text">Viewed by your on-call engineer</span>
          <span className="tag">Shared</span>
        </li>
      </ol>
      <div className="note">
        <div className="note__head">
          <span className="chat__avatar chat__avatar--analyst" aria-hidden="true">
            CY
          </span>
          <span className="note__author">Analyst note</span>
          <span className="note__meta numeric">02:15:20 · visible to your team</span>
        </div>
        <p className="note__body">
          winword.exe has not started PowerShell on this host in the last 90 days. The command is base64-encoded and
          runs with a hidden window. Treating this as macro-based initial access until shown otherwise. Next: pull the
          process tree and network events for WS-0412 around 02:14.
        </p>
        <p className="note__reply">Reply in thread</p>
      </div>
    </div>
  );
}

export const moments: Moment[] = [
  {
    id: "detection",
    time: "02:14:07",
    label: "Detection",
    summary: "EDR flags winword.exe starting encoded PowerShell",
    tone: "high",
    content: (
      <div className="moment">
        <MomentHead time="02:14:07" elapsed="T+00:00" title="The alert arrives exactly as the EDR sent it">
          The EDR on WS-0412 sees winword.exe start PowerShell with an encoded command. The raw alert lands in the
          shared console untouched, so your team sees the same fields the analyst does.
        </MomentHead>
        <AlertJson />
      </div>
    ),
  },
  {
    id: "triage",
    time: "02:14:39",
    label: "Triage",
    summary: "Analyst on shift picks it up and writes a first note",
    tone: "info",
    content: (
      <div className="moment">
        <MomentHead time="02:14:39" elapsed="T+00:32" title="An analyst picks it up in view of your team">
          The analyst on shift takes the alert and writes down what they think is happening and what they will check
          next. Your team sees the note as it is written and can reply in the same thread.
        </MomentHead>
        <TriageNote />
      </div>
    ),
  },
  {
    id: "investigation",
    time: "02:16:52",
    label: "Investigation",
    summary: "KQL query pulls the 30-minute process tree",
    tone: "neutral",
    content: (
      <div className="moment">
        <MomentHead time="02:16:52" elapsed="T+02:45" title="Every query is shown with the rows it returned">
          The analyst queries 30 minutes of process and network events for WS-0412. The decoded script reaches out to
          cdn-update[.]example and then loads a DLL through rundll32.
        </MomentHead>
        <QueryBlock />
      </div>
    ),
  },
  {
    id: "scoping",
    time: "02:18:10",
    label: "Scoping",
    summary: "Indicator checked against every host and mailbox",
    tone: "medium",
    content: (
      <div className="moment">
        <MomentHead time="02:18:10" elapsed="T+04:03" title="Check whether anything else is affected">
          Before containing anything, the analyst runs the address, the domain and the attachment against every host
          and mailbox. Here the answer is one workstation.
        </MomentHead>
        <ScopeCheck />
      </div>
    ),
  },
  {
    id: "containment",
    time: "02:19:31",
    label: "Containment",
    summary: "PB-03 isolates WS-0412 through the EDR API",
    tone: "ok",
    content: (
      <div className="moment">
        <MomentHead time="02:19:31" elapsed="T+05:24" title="Isolate the host with a playbook you approved">
          PB-03 is on your pre-approved list for high-severity alerts on workstations, so the analyst runs it without
          waiting for a call. The EDR API confirms the change, and either team can release the host from the console.
        </MomentHead>
        <ContainmentAction />
      </div>
    ),
  },
  {
    id: "notification",
    time: "02:21:05",
    label: "Notification",
    summary: "Summary posted to #sec-incidents, on-call paged",
    tone: "neutral",
    content: (
      <div className="moment">
        <MomentHead time="02:21:05" elapsed="T+06:58" title="Tell your team where they already talk">
          A summary goes to #sec-incidents with what happened, what was done and what is needed from you. Your on-call
          is paged because the laptop is now offline.
        </MomentHead>
        <ChatNotice />
      </div>
    ),
  },
  {
    id: "closure",
    time: "09:47:12",
    label: "Closure and lessons",
    summary: "Root cause, lessons and follow-ups recorded",
    tone: "ok",
    content: (
      <div className="moment">
        <MomentHead time="09:47:12" elapsed="T+7h 33m" title="Close with a root cause and owned follow-ups">
          The incident closes once WS-0412 is reimaged and the credentials are reset. The root cause, techniques and the
          one open follow-up carry into the monthly report.
        </MomentHead>
        <ClosureSummary />
      </div>
    ),
  },
];
