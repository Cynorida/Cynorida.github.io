# Applying for Red Team Access: website readiness

This site has a page or file for every item in the CVP website guide. Real facts are only shown once you add them, because reviewers check them against registries and profiles, and the guide forbids invented details.

## 1. Fill in the facts (one file)

Everything a reviewer checks lives in `content/company.ts`. Each `null` or empty list is something only you can supply.

| Field | What to put | Where it shows |
| --- | --- | --- |
| `legalName` | Registered entity name, exactly as on the registry (e.g. "Cynorida Ltd") | footer, About, Contact, Privacy, Terms, structured data |
| `registrationNumber`, `registrationAuthority` | Company number and the registry that issued it | footer, About, Contact |
| `registryUrl` | Public link to your entry on the company register | About |
| `vatNumber` | Only if you have one | About |
| `registeredAddress` | Street, locality, region, postal code, country, exactly as registered | footer, About, Contact, Privacy, Terms (governing law uses the country) |
| `headquarters` | City and country. Use the same wording on LinkedIn and GitHub | About |
| `founded` | Year of incorporation | About |
| `profiles.linkedin`, `profiles.github` | Company page URLs | footer, About, Contact, structured data `sameAs` |
| `team` | Real people with role, short bio and profile links. Set `isSecurityContact: true` on the security contact | Team, Security |
| `sectors` | The sectors and client types you actually serve | About |
| `certifications` | Only ones held, with a verification link where one exists | About |
| `evidence` | CVEs (NVD links), advisories and acknowledgements, talks, research, open-source tools | Research |
| `news` | Dated posts or announcements. Keep adding them so the site never looks dormant | News |
| `incidentPhone` | Only if you run an incident line | Contact |
| `hostingProvider` | Who hosts the site (named in the privacy notice) | Privacy |
| `disclosure.*` | Acknowledgement and triage days you can actually meet, plus a PGP key URL if you have one | Disclosure policy, security.txt |
| `disclosure.reviewedOn` | Date you last reviewed security.txt. Its `Expires` is set 364 days later, so bump this once a year | security.txt |
| `description` | One or two sentences. Paste the same text into the application's "description of your security work" | footer, About, structured data |

Services live in `content/services.ts`. Set `offered: false` on anything you do not deliver: the page, the homepage card and the footer link all disappear. The guide says to list only services you actually deliver.

While you run `npm run dev`, every missing fact appears on the page as an amber **Fill in before applying** marker naming the field. Production builds never show these markers.

## 2. Check readiness

```bash
npm run build && npm run start
npm run readiness
npm run readiness -- https://cynorida.com
```

The checker reports PASS, FAIL, WARN or CHECK for each guide item, tests every page, `security.txt` and the security headers, and prints the exact legal name, number and address to paste into the application so the two match character for character. It exits non-zero while anything is failing.

## 3. Map from the guide to the site

| Guide item | On the site |
| --- | --- |
| A. Legal name, registered address, registration number | Footer on every page, `/about`, `/contact` |
| A. One consistent name and HQ | `content/company.ts` is the only source; Organization structured data in every page head |
| A. Team with verifiable profiles | `/team` |
| B. Services that match your description | `/services`, `/services/<service>`, homepage Services section |
| B. Authorisation and scope statement | `/how-we-engage` |
| B. Sectors and client types | `/about` |
| C. contact@ and security@ on your domain | `/contact`, footer, `/security` |
| C. security.txt (RFC 9116) | `/.well-known/security.txt` (and `/security.txt` redirects to it) |
| C. Vulnerability disclosure policy | `/security/disclosure` (named in security.txt `Policy`) |
| D. CVEs, advisories, talks, research, tools | `/research` |
| D. Certifications | `/about` |
| E. Privacy policy and terms in the footer | `/privacy`, `/terms` |
| E. HTTPS and security headers | `proxy.ts` (nonce-based Content-Security-Policy), `next.config.ts` (HSTS, nosniff, frame and referrer policy, permissions policy) |
| E. Current, dated content | `/news` |

## 4. Off-site steps the site cannot do for you

- Every person who will use Claude needs a mailbox on `cynorida.com`, run by your identity provider with phishing-resistant MFA. No Gmail, webmail or personal accounts.
- Create and monitor `contact@`, `security@` and `privacy@cynorida.com`.
- Verify `cynorida.com` on your GitHub organisation, and use the same name and HQ on LinkedIn, GitHub and the business registry.
- Deploy behind HTTPS, then run `npm run readiness -- https://cynorida.com`.
- If you will use Claude on client code or systems, say so in the application. Help Center says that needs the separate productization application, and your service pages should match what you tell Anthropic.
- Before applying, re-read the Help Center pages: the program was restructured on 6 October 2026.

## 5. What was deliberately left out

Customer logos, testimonials, certifications, CVEs, team members, sectors and legal details were not written for you. The guide says inventing any of them breaches the attestation you sign, so each one only appears once it is real and in `content/company.ts`.

## 6. Wording to confirm before you go live

These are promises the pages make about how you work. Edit any that are not true for Cynorida.

- **Services** (`content/services.ts`): detection rules are reviewed by a second engineer; MDR includes a monthly report and review call; threat-hunt findings that look like an intrusion go to your named contact straight away; red teaming includes a replay session with your defenders; penetration testing covers web apps and APIs, external and internal networks, and cloud accounts (mobile, wireless, physical and social engineering are deliberately not listed).
- **How we engage**: you confirm third-party permission (cloud, hosting, SaaS) is in place before testing; retest windows and data removal are "as agreed in the contract", so your contracts need those terms.
- **Disclosure policy**: acknowledgement within 3 business days and initial assessment within 10 (set in `company.disclosure`); coordinated disclosure; credit if wanted; no bug bounty; safe harbour for good-faith research.
- **Privacy**: no cookies, analytics, forms or third-party scripts (verified in the code); server logs are not used to identify or profile visitors; personal data is not sold or shared for advertising.
- **Contact**: active incidents by email go to security@, so that inbox must be watched for incidents.
- **Homepage**: the existing claims (24/7/365 analysts, pre-approved playbooks, the integration list) still need confirming, as listed in `DESIGN.md`.
