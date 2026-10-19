import "./sources.css";

const sources = [
  "Microsoft Defender for Endpoint",
  "CrowdStrike Falcon",
  "SentinelOne",
  "Microsoft Entra ID",
  "Okta",
  "Google Workspace",
  "AWS CloudTrail",
  "Microsoft 365",
];

export function Sources() {
  return (
    <section className="sources" aria-label="Supported telemetry sources">
      <div className="container">
        <div className="sources__band">
          <p id="sources-label" className="sources__label">
            Reads the telemetry you already collect
          </p>
          <ul className="sources__list" aria-labelledby="sources-label">
            {sources.map((name) => (
              <li key={name} className="sources__name">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
