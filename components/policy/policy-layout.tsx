import "./policy.css";

export type PolicySection = {
  id: string;
  title: string;
};

type PolicyLayoutProps = {
  sections: PolicySection[];
  children: React.ReactNode;
};

export function PolicyLayout({ sections, children }: PolicyLayoutProps) {
  return (
    <div className="container policy">
      <nav className="policy__contents" aria-labelledby="policy-contents-title">
        <h2 id="policy-contents-title" className="policy__contents-title">
          On this page
        </h2>
        <ol className="policy__contents-list">
          {sections.map((section) => (
            <li key={section.id}>
              <a className="policy__contents-link" href={`#${section.id}`}>
                {section.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <article className="prose policy__body">{children}</article>
    </div>
  );
}
