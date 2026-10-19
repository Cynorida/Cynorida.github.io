import { company } from "@/content/company";

export function businessDays(count: number) {
  return `${count} business ${count === 1 ? "day" : "days"}`;
}

export function preferredLanguageNames() {
  const names = new Intl.DisplayNames(["en"], { type: "language" });
  const list = new Intl.ListFormat("en", { style: "long", type: "disjunction" });
  return list.format(company.disclosure.preferredLanguages.map((code) => names.of(code) ?? code));
}

export function mailtoWithSubject(address: string, subject: string) {
  return `mailto:${address}?subject=${encodeURIComponent(subject)}`;
}

export function formatLegalDate(isoDate: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}
