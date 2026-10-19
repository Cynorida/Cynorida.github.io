const datePattern = /^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?/;

const precisionFormats: Record<number, Intl.DateTimeFormatOptions> = {
  1: { year: "numeric" },
  2: { year: "numeric", month: "long" },
  3: { year: "numeric", month: "short", day: "numeric" },
};

export function formatDate(value: string) {
  const match = datePattern.exec(value);
  if (!match) return value;
  const parts = match.slice(1).filter(Boolean).map(Number);
  const [year, month = 1, day = 1] = parts;
  const date = new Date(Date.UTC(year, month - 1, day));
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-GB", { ...precisionFormats[parts.length], timeZone: "UTC" }).format(date);
}

export function newestFirst<T extends { date: string }>(items: T[]) {
  return [...items].sort((a, b) => b.date.localeCompare(a.date));
}

type DateStampProps = {
  value: string;
  className?: string;
};

export function DateStamp({ value, className }: DateStampProps) {
  return (
    <time className={className} dateTime={value}>
      {formatDate(value)}
    </time>
  );
}
