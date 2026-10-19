import { PageHeader } from "@/components/page/page-header";
import { pageMetadata } from "@/components/page/page-metadata";
import { PageShell } from "@/components/page/page-shell";
import { StructuredData, breadcrumbData } from "@/components/page/structured-data";
import { LastUpdated } from "@/components/policy/last-updated";
import { PolicyLayout, type PolicySection } from "@/components/policy/policy-layout";
import { company } from "@/content/company";

export const metadata = pageMetadata({
  title: "Privacy policy",
  description:
    "What personal data the Cynorida website and our email addresses process, why, for how long, and the rights you have over it. The site sets no cookies and runs no analytics.",
  path: "/privacy-policy/",
});

const sections: PolicySection[] = [
  { id: "who-is-responsible", title: "Who is responsible" },
  { id: "what-this-covers", title: "What this notice covers" },
  { id: "website", title: "What the website collects" },
  { id: "hosting-logs", title: "Hosting and server logs" },
  { id: "emails", title: "Emails you send us" },
  { id: "cookies", title: "Cookies and analytics" },
  { id: "legal-bases", title: "Legal bases" },
  { id: "retention", title: "How long we keep data" },
  { id: "sharing", title: "Who we share data with" },
  { id: "your-rights", title: "Your rights" },
  { id: "contact", title: "Contact" },
  { id: "changes", title: "Changes to this notice" },
];

export default function PrivacyPage() {
  const privacyEmail = company.emails.privacy;
  return (
    <PageShell>
      <StructuredData data={[breadcrumbData([{ name: "Privacy policy", path: "/privacy-policy/" }])]} />
      <PageHeader
        eyebrow="Legal"
        title="Privacy policy"
        lede={`How the ${company.brandName} website and our email addresses handle personal data. The short version: the site sets no cookies, runs no analytics and has no forms.`}
        meta={<LastUpdated />}
      />

      <PolicyLayout sections={sections}>
        <h2 id="who-is-responsible">Who is responsible</h2>
        <p>
          {company.brandName} is responsible for the personal data described in this notice.
        </p>
        <p>
          You can reach us about anything in this notice at <a href={`mailto:${privacyEmail}`}>{privacyEmail}</a>.
        </p>

        <h2 id="what-this-covers">What this notice covers</h2>
        <p>
          This notice covers the website at <a href={company.siteUrl}>{company.domain}</a> and the emails you send to
          our addresses on that domain.
        </p>
        <p>
          It does not cover data we process while delivering services to clients. That is governed by the contract
          for each engagement.
        </p>

        <h2 id="website">What the website collects</h2>
        <p>
          The website is a set of information pages. It has no accounts, no sign-up and no forms, and it does not ask
          you for any personal data. To contact us, you use email links that open your own mail app, so nothing you
          write passes through the website.
        </p>
        <p>
          The fonts and images the site uses are served from our own domain, so loading a page does not send your
          browser to a font service, a content network or any other third party.
        </p>

        <h2 id="hosting-logs">Hosting and server logs</h2>
        <p>
          Like any website, every request your browser makes reaches the servers that host it. Those servers
          automatically record technical details of each request, such as:
        </p>
        <ul>
          <li>your IP address;</li>
          <li>your browser&apos;s user agent string;</li>
          <li>the URL you requested;</li>
          <li>the date and time of the request.</li>
        </ul>
        <p>
          These logs are processed by our hosting provider, GitHub Pages, so that the website can be delivered, kept
          secure and protected against abuse. We do not use them to identify or profile visitors.
        </p>

        <h2 id="emails">Emails you send us</h2>
        <p>When you email one of our addresses, we receive:</p>
        <ul>
          <li>your email address and name, as your mail app sends them;</li>
          <li>the content of your message and any attachments;</li>
          <li>the technical headers that come with every email.</li>
        </ul>
        <p>We use this only to:</p>
        <ul>
          <li>read and reply to your message;</li>
          <li>handle a vulnerability report or a request for incident help;</li>
          <li>arrange a walkthrough or a conversation you asked for;</li>
          <li>keep a record of our correspondence where we need one.</li>
        </ul>
        <p>
          Please do not send us more personal data than your message needs. If you report a vulnerability, describe any
          personal data you came across rather than sending it to us.
        </p>

        <h2 id="cookies">Cookies and analytics</h2>
        <p>This website:</p>
        <ul>
          <li>sets no cookies;</li>
          <li>stores nothing in your browser&apos;s local or session storage;</li>
          <li>uses no analytics, tracking pixels, advertising tags or session recording;</li>
          <li>loads no third-party scripts.</li>
        </ul>
        <p>Because of this, there is no cookie banner to accept or decline.</p>

        <h2 id="legal-bases">Legal bases</h2>
        <p>
          Where the law requires a legal basis for processing personal data, we rely on our legitimate interests in
          running a secure website and in responding to you when you contact us. Where we must keep a record to meet
          a legal obligation, we rely on that obligation.
        </p>

        <h2 id="retention">How long we keep data</h2>
        <p>
          We keep personal data only as long as we need it for the purpose we collected it for, unless the law
          requires us to keep it longer. When we no longer need it, we delete it.
        </p>

        <h2 id="sharing">Who we share data with</h2>
        <p>
          We do not sell personal data, and we do not share it for advertising. We share it only with service
          providers that help us run the website or our email, to the extent they need it to provide that service, or
          when the law requires us to disclose it.
        </p>

        <h2 id="your-rights">Your rights</h2>
        <p>Depending on the law that applies to you, you may have the right to:</p>
        <ul>
          <li>ask for access to the personal data we hold about you;</li>
          <li>ask us to correct data that is wrong or incomplete;</li>
          <li>ask us to delete your data;</li>
          <li>object to how we process your data, or ask us to restrict it;</li>
          <li>complain to your data protection authority.</li>
        </ul>
        <p>
          To use any of these rights, email <a href={`mailto:${privacyEmail}`}>{privacyEmail}</a>. We may need to
          confirm who you are before we act on a request.
        </p>

        <h2 id="contact">Contact</h2>
        <p>
          For any question about privacy, email <a href={`mailto:${privacyEmail}`}>{privacyEmail}</a>. For anything
          else, email <a href={`mailto:${company.emails.contact}`}>{company.emails.contact}</a>.
        </p>

        <h2 id="changes">Changes to this notice</h2>
        <p>
          If the website or the way we handle data changes, we will update this notice. The date at the top of the
          page shows when it last changed.
        </p>
      </PolicyLayout>
    </PageShell>
  );
}
