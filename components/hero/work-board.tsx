type WorkRecord = {
  kind: string;
  reference: string;
  title: string;
  detail: string;
  status: string;
  tone: "high" | "medium" | "ok";
  meta: string;
};

const records: WorkRecord[] = [
  {
    kind: "Test",
    reference: "PT-0112",
    title: "Customer portal and its API",
    detail: "Authorisation bypass on invoice export, reproduced with evidence",
    status: "Critical",
    tone: "high",
    meta: "Fix due in 2 days",
  },
  {
    kind: "Respond",
    reference: "IR-0031",
    title: "Unexpected admin sign-ins",
    detail: "Entry point traced to a reused credential, access removed",
    status: "Contained",
    tone: "ok",
    meta: "Timeline open",
  },
  {
    kind: "Protect",
    reference: "DET-0208",
    title: "Office macro launching PowerShell",
    detail: "Detection rule written, tested and reviewed by a second engineer",
    status: "Live",
    tone: "medium",
    meta: "Mapped to T1059.001",
  },
];

export function WorkBoard() {
  return (
    <ul className="work-board" aria-label="Example engagement records">
      {records.map((record) => (
        <li key={record.reference} className="work-board__card">
          <p className="work-board__kind">
            {record.kind} · <span className="numeric">{record.reference}</span>
          </p>
          <p className="work-board__title">{record.title}</p>
          <p className="work-board__detail">{record.detail}</p>
          <p className="work-board__foot">
            <span className={`work-board__status work-board__status--${record.tone}`}>{record.status}</span>
            <span className="work-board__meta">{record.meta}</span>
          </p>
        </li>
      ))}
    </ul>
  );
}
