import { Missing } from "@/components/page/missing";
import "./company.css";

type EmptyNoteProps = {
  field: string;
  hint?: string;
  children: React.ReactNode;
};

export function EmptyNote({ field, hint, children }: EmptyNoteProps) {
  return (
    <div className="empty-state">
      <p>{children}</p>
      <Missing field={field} hint={hint} />
    </div>
  );
}
