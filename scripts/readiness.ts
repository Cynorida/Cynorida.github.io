import { company, formatAddress } from "../content/company.ts";
import { offeredServices } from "../content/services.ts";

type Status = "pass" | "fail" | "warn" | "manual";

type Check = {
  area: string;
  label: string;
  status: Status;
  detail?: string;
};

const baseUrl = (process.argv[2] ?? "http://localhost:3100").replace(/\/$/, "");
const checks: Check[] = [];

function record(area: string, label: string, status: Status, detail?: string) {
  checks.push({ area, label, status, detail });
}

function requireFact(area: string, label: string, value: unknown, field: string) {
  const present = Array.isArray(value) ? value.length > 0 : value !== null && value !== undefined && value !== "";
  record(area, label, present ? "pass" : "fail", present ? undefined : `fill in ${field} in content/company.ts`);
}

function checkFacts() {
  const identity = "A. Prove who you are";
  requireFact(identity, "Registered legal entity name", company.legalName, "company.legalName");
  requireFact(identity, "Company registration number", company.registrationNumber, "company.registrationNumber");
  requireFact(identity, "Registration authority", company.registrationAuthority, "company.registrationAuthority");
  requireFact(identity, "Registered address", company.registeredAddress, "company.registeredAddress");
  record(
    identity,
    "Link to the public company register entry",
    company.registryUrl ? "pass" : "warn",
    company.registryUrl ?? "fill in company.registryUrl so reviewers can check the number in one click",
  );
  requireFact(identity, "Headquarters location", company.headquarters, "company.headquarters");
  requireFact(identity, "LinkedIn company page", company.profiles.linkedin, "company.profiles.linkedin");
  requireFact(identity, "GitHub organisation", company.profiles.github, "company.profiles.github");
  requireFact(identity, "Named team members", company.team, "company.team");
  const profiled = company.team.filter((person) => person.profiles.length > 0).length;
  if (company.team.length > 0) {
    record(
      identity,
      "Every team member has a verifiable profile link",
      profiled === company.team.length ? "pass" : "fail",
      `${profiled} of ${company.team.length} have profile links`,
    );
  }
  const securityContact = company.team.find((person) => person.isSecurityContact);
  record(
    identity,
    "Named security contact on the team page",
    securityContact ? "pass" : "fail",
    securityContact ? securityContact.name : "set isSecurityContact: true on one team member",
  );

  const work = "B. Describe the work honestly";
  requireFact(work, "Sectors and client types served", company.sectors, "company.sectors");
  record(
    work,
    "Services listed are ones you actually deliver",
    "manual",
    `listed: ${offeredServices.map((service) => service.name).join(", ")}. Set offered: false in content/services.ts for anything you do not deliver`,
  );

  const contacts = "C. Domain and contacts";
  const domainEmails = Object.entries(company.emails).filter(([, email]) => email.endsWith(`@${company.domain}`));
  record(
    contacts,
    `Role addresses are on ${company.domain}`,
    domainEmails.length === Object.keys(company.emails).length ? "pass" : "fail",
    Object.values(company.emails).join(", "),
  );
  record(
    contacts,
    "Website domain matches email domain",
    new URL(company.siteUrl).hostname.replace(/^www\./, "") === company.domain ? "pass" : "fail",
  );
  record(contacts, "contact@, security@ and privacy@ mailboxes exist and are monitored", "manual");
  record(
    contacts,
    `Every Claude user has a mailbox on ${company.domain} behind phishing-resistant MFA`,
    "manual",
    "no Gmail, webmail or personal accounts",
  );
  if (company.incidentPhone === null) {
    record(contacts, "Incident phone line", "warn", "optional, fill in company.incidentPhone if you run one");
  }

  const evidence = "D. Independent, checkable evidence";
  const { cves, advisories, talks, research, tools } = company.evidence;
  const evidenceTotal = cves.length + advisories.length + talks.length + research.length + tools.length;
  record(
    evidence,
    "Verifiable outputs (CVEs, advisories, talks, research, tools)",
    evidenceTotal > 0 ? "pass" : "warn",
    `${cves.length} CVEs, ${advisories.length} advisories, ${talks.length} talks, ${research.length} research, ${tools.length} tools`,
  );
  const unlinked = [...cves, ...advisories, ...talks, ...research, ...tools].filter(
    (item) => !item.href.startsWith("https://"),
  );
  if (unlinked.length > 0) {
    record(evidence, "Every evidence item links to an https source", "fail", `${unlinked.length} without an https link`);
  }
  record(
    evidence,
    "Certifications actually held",
    company.certifications.length > 0 ? "pass" : "warn",
    company.certifications.length > 0 ? `${company.certifications.length} listed` : "only list ones you hold",
  );

  const hygiene = "E. Baseline hygiene";
  requireFact(hygiene, "Hosting provider named in the privacy notice", company.hostingProvider, "company.hostingProvider");
  const newest = company.news.map((item) => Date.parse(item.date)).sort((a, b) => b - a)[0];
  const ageDays = newest ? Math.floor((Date.now() - newest) / 86_400_000) : null;
  record(
    hygiene,
    "Dated news published in the last 90 days",
    ageDays !== null && ageDays <= 90 ? "pass" : "warn",
    ageDays === null ? "no news items yet" : `newest item is ${ageDays} days old`,
  );
  record(hygiene, "GitHub organisation has cynorida.com as a verified domain", "manual");
  record(hygiene, "Same name and HQ on the website, LinkedIn, GitHub and the business registry", "manual");
  record(hygiene, "Re-read the Anthropic Help Center pages for program changes before applying", "manual");
}

const pages = [
  "/",
  "/services",
  "/how-we-engage",
  "/about",
  "/team",
  "/research",
  "/news",
  "/contact",
  "/security",
  "/security/disclosure",
  "/privacy",
  "/terms",
  ...offeredServices.map((service) => `/services/${service.slug}`),
];

async function checkSite() {
  const area = "Live site";
  try {
    await fetch(baseUrl, { method: "HEAD" });
  } catch {
    record(area, `Site reachable at ${baseUrl}`, "fail", "start it with npm run start, or pass a URL");
    return;
  }

  let markerPages = 0;
  for (const path of pages) {
    const response = await fetch(`${baseUrl}${path}`);
    const html = await response.text();
    if (html.includes("Fill in before applying")) markerPages += 1;
    record(area, `${path} responds`, response.ok ? "pass" : "fail", String(response.status));
  }
  record(
    area,
    "Production build (no fill-in markers rendered)",
    markerPages === 0 ? "pass" : "warn",
    markerPages === 0 ? undefined : `${markerPages} pages show markers, which means this is a dev server or facts are missing`,
  );

  const securityTxt = await fetch(`${baseUrl}/.well-known/security.txt`);
  const body = await securityTxt.text();
  record(
    area,
    "security.txt served as text/plain; charset=utf-8",
    securityTxt.ok && (securityTxt.headers.get("content-type") ?? "").includes("text/plain") ? "pass" : "fail",
  );
  record(area, "security.txt has a Contact field", /^Contact: /m.test(body) ? "pass" : "fail");
  const expires = body.match(/^Expires: (.+)$/m)?.[1];
  const expiresAt = expires ? Date.parse(expires) : Number.NaN;
  const daysLeft = Math.floor((expiresAt - Date.now()) / 86_400_000);
  record(
    area,
    "security.txt Expires is in the future and under a year away",
    Number.isNaN(expiresAt) ? "fail" : daysLeft < 0 ? "fail" : daysLeft < 30 || daysLeft > 365 ? "warn" : "pass",
    Number.isNaN(expiresAt) ? "missing" : `${daysLeft} days left, bump company.disclosure.reviewedOn to renew`,
  );
  const legacy = await fetch(`${baseUrl}/security.txt`, { redirect: "manual" });
  record(area, "/security.txt redirects to /.well-known/security.txt", [301, 308].includes(legacy.status) ? "pass" : "warn");

  const home = await fetch(`${baseUrl}/`);
  const headers = home.headers;
  const csp = headers.get("content-security-policy") ?? "";
  const scriptSrc = csp.split(";").find((part) => part.trim().startsWith("script-src")) ?? "";
  record(area, "Content-Security-Policy without unsafe-inline scripts", csp && !scriptSrc.includes("'unsafe-inline'") ? "pass" : "fail");
  record(area, "X-Content-Type-Options: nosniff", headers.get("x-content-type-options") === "nosniff" ? "pass" : "fail");
  record(area, "Clickjacking protection", csp.includes("frame-ancestors 'none'") || headers.get("x-frame-options") ? "pass" : "fail");
  record(area, "Referrer-Policy", headers.get("referrer-policy") ? "pass" : "fail");
  record(area, "Strict-Transport-Security", headers.get("strict-transport-security") ? "pass" : "fail");
  record(
    area,
    "Served over HTTPS with a valid certificate",
    baseUrl.startsWith("https://") ? "pass" : "manual",
    baseUrl.startsWith("https://") ? undefined : `run again against ${company.siteUrl} once deployed`,
  );
}

function printSubmission() {
  const address = company.registeredAddress ? formatAddress(company.registeredAddress) : "(missing)";
  console.log("\nSubmit exactly these values in the application:\n");
  console.log(`  Legal name           ${company.legalName ?? "(missing)"}`);
  console.log(`  Registration number  ${company.registrationNumber ?? "(missing)"}`);
  console.log(`  Registered address   ${address}`);
  console.log(`  Website              ${company.siteUrl}`);
  console.log(`  Security contact     ${company.emails.security}`);
  console.log(`  Description          ${company.description}`);
}

const symbols: Record<Status, string> = { pass: "PASS  ", fail: "FAIL  ", warn: "WARN  ", manual: "CHECK " };

checkFacts();
await checkSite();

let currentArea = "";
for (const check of checks) {
  if (check.area !== currentArea) {
    currentArea = check.area;
    console.log(`\n${currentArea}`);
  }
  console.log(`  ${symbols[check.status]}${check.label}${check.detail ? `  (${check.detail})` : ""}`);
}

printSubmission();

const failed = checks.filter((check) => check.status === "fail").length;
const warned = checks.filter((check) => check.status === "warn").length;
const manual = checks.filter((check) => check.status === "manual").length;
console.log(`\n${failed} to fix, ${warned} worth doing, ${manual} to confirm by hand.`);
process.exitCode = failed > 0 ? 1 : 0;
