import { company } from "@/content/company";
import { formatLegalDate } from "./wording";

export function LastUpdated() {
  return (
    <>
      Last updated <time dateTime={company.legalUpdated}>{formatLegalDate(company.legalUpdated)}</time>
    </>
  );
}
