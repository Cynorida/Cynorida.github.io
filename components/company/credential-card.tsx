import { Missing } from "@/components/page/missing";
import { externalProps } from "@/components/company/links";
import type { Certification } from "@/content/company";
import "./company.css";

type CredentialCardProps = {
  certification: Certification;
  index: number;
};

export function CredentialCard({ certification, index }: CredentialCardProps) {
  return (
    <article className="panel credential-card">
      <h3 className="credential-card__name">{certification.name}</h3>
      <dl className="credential-card__facts">
        <div className="credential-card__fact">
          <dt>Issuer</dt>
          <dd>{certification.issuer}</dd>
        </div>
        <div className="credential-card__fact">
          <dt>Held by</dt>
          <dd>{certification.heldBy}</dd>
        </div>
      </dl>
      {certification.verifyHref ? (
        <a className="text-link" href={certification.verifyHref} {...externalProps(certification.verifyHref)}>
          Verify with {certification.issuer}
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
      ) : (
        <Missing field={`company.certifications[${index}].verifyHref`} hint="issuer verification link" />
      )}
    </article>
  );
}
