import { Arrow } from "@/components/brand/arrow";
import { DateStamp, newestFirst } from "@/components/company/dates";
import { externalProps, hostOf, isExternal } from "@/components/company/links";
import "./company.css";

export type Entry = {
  title: string;
  body: string;
  date: string;
  href: string;
};

type EntryListProps = {
  entries: Entry[];
  linkLabel: string;
};

export function EntryList({ entries, linkLabel }: EntryListProps) {
  return (
    <ol className="entry-list">
      {newestFirst(entries).map((entry) => {
        const host = isExternal(entry.href) ? hostOf(entry.href) : null;
        return (
          <li key={`${entry.date}-${entry.href}`} className="entry">
            <DateStamp className="entry__date numeric" value={entry.date} />
            <div className="entry__main">
              <h3 className="entry__title">
                <a className="entry__title-link" href={entry.href} {...externalProps(entry.href)}>
                  {entry.title}
                  {isExternal(entry.href) ? <span className="visually-hidden"> (opens in a new tab)</span> : null}
                </a>
              </h3>
              <p className="entry__body">{entry.body}</p>
              <p className="entry__source">
                <a className="text-link" href={entry.href} tabIndex={-1} aria-hidden="true" {...externalProps(entry.href)}>
                  {linkLabel}
                  {host ? <span className="entry__host">{host}</span> : null}
                  <Arrow />
                </a>
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
