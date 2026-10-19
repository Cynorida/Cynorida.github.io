import { Missing } from "@/components/page/missing";
import { externalProps } from "@/components/company/links";
import type { Person } from "@/content/company";
import "./company.css";

type PersonCardProps = {
  person: Person;
  index: number;
};

export function PersonCard({ person, index }: PersonCardProps) {
  return (
    <article className="panel person-card">
      <div className="person-card__head">
        <h3 className="person-card__name">{person.name}</h3>
        {person.isSecurityContact ? (
          <a className="tag tag--ok person-card__badge" href="/security">
            Security contact
          </a>
        ) : null}
      </div>
      <p className="person-card__role">{person.role}</p>
      <p className="person-card__bio">{person.bio}</p>
      {person.profiles.length > 0 ? (
        <ul className="person-card__links" aria-label={`${person.name} profiles`}>
          {person.profiles.map((profile) => (
            <li key={profile.href}>
              <a className="text-link" href={profile.href} {...externalProps(profile.href)}>
                {profile.label}
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <Missing field={`company.team[${index}].profiles`} hint="LinkedIn or GitHub profile a reviewer can check" />
      )}
    </article>
  );
}
