type PageHeaderProps = {
  eyebrow: string;
  title: string;
  lede?: React.ReactNode;
  meta?: React.ReactNode;
  children?: React.ReactNode;
};

export function PageHeader({ eyebrow, title, lede, meta, children }: PageHeaderProps) {
  return (
    <header className="page-header">
      <div className="container">
        <p className="page-header__eyebrow">{eyebrow}</p>
        <h1 className="page-header__title">{title}</h1>
        {lede ? <p className="page-header__lede">{lede}</p> : null}
        {meta ? <p className="page-header__meta">{meta}</p> : null}
        {children ? <div className="page-header__actions">{children}</div> : null}
      </div>
    </header>
  );
}
