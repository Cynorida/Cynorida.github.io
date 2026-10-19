import type { Metadata } from "next";
import { PageHeader } from "@/components/page/page-header";
import { PageShell } from "@/components/page/page-shell";
import { LastUpdated } from "@/components/policy/last-updated";
import { PolicyLayout, type PolicySection } from "@/components/policy/policy-layout";
import { company } from "@/content/company";

export const metadata: Metadata = {
  title: "Terms of use",
  description:
    "The terms that apply when you use the Cynorida website, including the rule against unauthorised security testing.",
};

const sections: PolicySection[] = [
  { id: "who-we-are", title: "Who we are" },
  { id: "using-the-site", title: "Using the site" },
  { id: "security-testing", title: "Security testing" },
  { id: "intellectual-property", title: "Intellectual property" },
  { id: "links", title: "Links to other sites" },
  { id: "warranties", title: "No warranties" },
  { id: "liability", title: "Limitation of liability" },
  { id: "changes", title: "Changes to these terms" },
  { id: "contact", title: "Contact" },
];

export default function TermsPage() {
  const owner = company.brandName;

  return (
    <PageShell>
      <PageHeader
        eyebrow="Legal"
        title="Terms of use"
        lede={`These terms apply when you visit or use the ${company.brandName} website at ${company.domain}. By using the site, you accept them.`}
        meta={<LastUpdated />}
      />

      <PolicyLayout sections={sections}>
        <h2 id="who-we-are">Who we are</h2>
        <p>
          This website is operated by {owner}. In these terms, &ldquo;we&rdquo;, &ldquo;us&rdquo; and
          &ldquo;our&rdquo; mean {owner}.
        </p>

        <h2 id="using-the-site">Using the site</h2>
        <p>
          You may use this website to learn about {company.brandName} and our services. You must not use it in a way
          that breaks the law, infringes anyone&apos;s rights, or interferes with the site or with other people&apos;s
          use of it.
        </p>
        <p>
          The content on this site is general information. It is not professional, legal or security advice, and it
          is not an offer to provide services. Any work we do for you is governed by a separate written agreement, and
          you should not rely on the website alone when making decisions about your own security.
        </p>

        <h2 id="security-testing">Security testing</h2>
        <p>
          You must not probe, scan, test or attempt to break the security of this website or any service we operate,
          unless we have authorised it in writing. Denial-of-service testing and accessing data that is not yours are
          never authorised.
        </p>
        <p>
          If you think you have found a vulnerability, report it to{" "}
          <a href={`mailto:${company.emails.security}`}>{company.emails.security}</a>.
        </p>

        <h2 id="intellectual-property">Intellectual property</h2>
        <p>
          Unless stated otherwise, the text, design, graphics and code of this website belong to {owner} or are used
          with permission. You may view and print pages, link to them, and share them for your own reference. You
          must not copy, republish or sell the content, or use our name or logo in a way that suggests we endorse you,
          without our written permission.
        </p>

        <h2 id="links">Links to other sites</h2>
        <p>
          The site may link to websites run by other people. We do not control those sites and are not responsible
          for their content, their availability or how they handle your data. A link is not an endorsement.
        </p>

        <h2 id="warranties">No warranties</h2>
        <p>
          We work to keep the website accurate and available, but we provide it &ldquo;as is&rdquo; and &ldquo;as
          available&rdquo;. To the extent the law allows, we give no warranties, express or implied, that the site or
          its content is complete, accurate, up to date, uninterrupted or free of errors.
        </p>

        <h2 id="liability">Limitation of liability</h2>
        <p>
          To the extent the law allows, we are not liable for any loss or damage that arises from your use of this
          website, or from your inability to use it, or from relying on its content. This includes indirect or
          consequential loss, and loss of data, profit or business.
        </p>
        <p>
          Nothing in these terms limits or excludes any liability that cannot be limited or excluded by law.
        </p>

        <h2 id="changes">Changes to these terms</h2>
        <p>
          We may change these terms from time to time. The version on this page is the one that applies, and the date
          at the top shows when it last changed.
        </p>

        <h2 id="contact">Contact</h2>
        <p>
          For questions about these terms, email <a href={`mailto:${company.emails.contact}`}>{company.emails.contact}</a>
          .
        </p>
      </PolicyLayout>
    </PageShell>
  );
}
