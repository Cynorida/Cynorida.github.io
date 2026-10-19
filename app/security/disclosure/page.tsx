import type { Metadata } from "next";
import { PageHeader } from "@/components/page/page-header";
import { PageShell } from "@/components/page/page-shell";
import { Missing } from "@/components/page/missing";
import { LastUpdated } from "@/components/policy/last-updated";
import { PolicyLayout, type PolicySection } from "@/components/policy/policy-layout";
import { businessDays, preferredLanguageNames } from "@/components/policy/wording";
import { company } from "@/content/company";

export const metadata: Metadata = {
  title: "Vulnerability disclosure policy",
  description:
    "How to report a security vulnerability in the Cynorida website or services, what is in scope, the response times we commit to, and the safe harbour we give good-faith researchers.",
  alternates: { canonical: "/security/disclosure" },
};

const sections: PolicySection[] = [
  { id: "scope", title: "Scope" },
  { id: "out-of-scope", title: "Out of scope" },
  { id: "how-to-report", title: "How to report" },
  { id: "what-to-include", title: "What to include" },
  { id: "our-commitments", title: "What we commit to" },
  { id: "safe-harbour", title: "Safe harbour" },
  { id: "rules", title: "Rules for researchers" },
  { id: "no-bounty", title: "No bug bounty" },
  { id: "languages", title: "Preferred languages" },
  { id: "changes", title: "Changes to this policy" },
];

export default function DisclosurePolicyPage() {
  const { acknowledgeBusinessDays, triageBusinessDays, pgpKeyUrl } = company.disclosure;
  const securityEmail = company.emails.security;

  return (
    <PageShell>
      <PageHeader
        eyebrow="Security"
        title="Vulnerability disclosure policy"
        lede={`If you believe you have found a security vulnerability in a ${company.brandName} website or service, we want to hear about it. This policy explains what you may test, how to report it, and what you can expect from us in return.`}
        meta={<LastUpdated />}
      />

      <PolicyLayout sections={sections}>
        <h2 id="scope">Scope</h2>
        <p>This policy covers:</p>
        <ul>
          <li>
            the website at <a href={company.siteUrl}>{company.domain}</a>, including every page and file it serves;
          </li>
          <li>
            any other service {company.brandName} operates under the <code>{company.domain}</code> domain or its
            subdomains.
          </li>
        </ul>
        <p>
          If you are not sure whether a system belongs to us or falls within this policy, email{" "}
          <a href={`mailto:${securityEmail}`}>{securityEmail}</a> and ask before you test it.
        </p>

        <h2 id="out-of-scope">Out of scope</h2>
        <p>The following are not covered by this policy and are not authorised:</p>
        <ul>
          <li>
            third-party services, including the providers we use and systems that belong to our clients, even when
            they link to or from our domain. Report those to their owners;
          </li>
          <li>denial-of-service testing, or anything that degrades the availability of a service;</li>
          <li>social engineering of anyone who works for us or with us, or of our clients, including phishing and phone pretexting;</li>
          <li>physical attacks against our premises, people or equipment;</li>
          <li>sending spam or unsolicited messages through any of our channels;</li>
          <li>volumetric or automated scanning that generates a high volume of requests;</li>
          <li>findings that require an already compromised device, account or browser to exploit.</li>
        </ul>

        <h2 id="how-to-report">How to report</h2>
        <p>
          Email your report to <a href={`mailto:${securityEmail}`}>{securityEmail}</a>. Please report each
          vulnerability separately, unless several issues have to be chained together to have an impact.
        </p>
        {pgpKeyUrl ? (
          <p>
            If your report contains sensitive detail, encrypt it with our <a href={pgpKeyUrl}>PGP key</a>.
          </p>
        ) : (
          <Missing field="company.disclosure.pgpKeyUrl" hint="URL of the public PGP key for encrypted reports" />
        )}
        <p>
          Our contact details are also published in machine-readable form at{" "}
          <a href="/.well-known/security.txt">
            <code>/.well-known/security.txt</code>
          </a>
          .
        </p>

        <h2 id="what-to-include">What to include</h2>
        <p>A good report lets us reproduce the issue without coming back to you with questions. Please include:</p>
        <ul>
          <li>the affected URL, service or component;</li>
          <li>the type of vulnerability and what an attacker could do with it;</li>
          <li>step-by-step instructions to reproduce it, with any proof-of-concept code, requests or screenshots;</li>
          <li>the date and time of your testing, and the IP addresses you tested from;</li>
          <li>how you would like to be credited, if at all, and how we can reach you.</li>
        </ul>
        <p>
          Do not include personal data, credentials or other sensitive information you came across. Describe it
          instead.
        </p>

        <h2 id="our-commitments">What we commit to</h2>
        <p>When you report a vulnerability to us in line with this policy, we will:</p>
        <ul>
          <li>
            acknowledge your report within <strong>{businessDays(acknowledgeBusinessDays)}</strong>;
          </li>
          <li>
            triage it and send you an initial assessment within{" "}
            <strong>{businessDays(triageBusinessDays)}</strong> of receiving it;
          </li>
          <li>keep you updated as we investigate and fix the issue;</li>
          <li>
            agree the timing of any public disclosure with you, so that it happens once a fix is available or at a
            date we have both accepted;
          </li>
          <li>
            credit you, under the name or handle you choose, in any public acknowledgement of the issue, if you want
            to be credited.
          </li>
        </ul>

        <h2 id="safe-harbour">Safe harbour</h2>
        <p>
          If you make a good-faith effort to follow this policy, we consider your research authorised. We will not
          pursue legal action against you for that research, and we will not ask anyone else to.
        </p>
        <p>
          This authorisation covers only systems within the scope of this policy. We cannot authorise testing of
          systems that belong to someone else.
        </p>
        <p>
          If you are unsure whether something you plan to do is consistent with this policy, ask us first at{" "}
          <a href={`mailto:${securityEmail}`}>{securityEmail}</a>.
        </p>

        <h2 id="rules">Rules for researchers</h2>
        <p>To stay within this policy, you must:</p>
        <ul>
          <li>
            not access, change or delete data beyond the minimum needed to show that the vulnerability exists;
          </li>
          <li>
            stop testing and report to us straight away if you access personal data or data that belongs to someone
            else, and not keep, copy or share it;
          </li>
          <li>avoid any action that could harm our services, our clients or other users;</li>
          <li>give us reasonable time to fix the issue before you disclose anything publicly;</li>
          <li>
            never demand payment or any other benefit in exchange for not disclosing, or for handing over, a
            vulnerability. We treat that as extortion, and it falls outside this policy.
          </li>
        </ul>

        <h2 id="no-bounty">No bug bounty</h2>
        <p>
          {company.brandName} does not run a bug bounty programme and does not pay for vulnerability reports. We are
          grateful for every report, and we will credit you if you would like us to.
        </p>

        <h2 id="languages">Preferred languages</h2>
        <p>Please write your report in {preferredLanguageNames()}.</p>

        <h2 id="changes">Changes to this policy</h2>
        <p>
          We may update this policy from time to time. The version on this page is the one that applies, and the date
          at the top shows when it last changed. Its permanent address is{" "}
          <a href={`${company.siteUrl}/security/disclosure`}>{`${company.siteUrl}/security/disclosure`}</a>.
        </p>
      </PolicyLayout>
    </PageShell>
  );
}
