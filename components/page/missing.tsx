type MissingProps = {
  field: string;
  hint?: string;
};

export const showMissing = process.env.NODE_ENV !== "production";

export function Missing({ field, hint }: MissingProps) {
  if (!showMissing) return null;
  return (
    <span className="missing-fact" role="note">
      <span className="missing-fact__label">Fill in before applying</span>
      <code className="missing-fact__field">{field}</code>
      {hint ? <span className="missing-fact__hint">{hint}</span> : null}
    </span>
  );
}
