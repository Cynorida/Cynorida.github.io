import type { Post } from "./types";

const slug = "beyondtrust-remote-support-zero-day-cve-2026-102764";
const assets = `/blog/${slug}`;

function Body() {
  return (
    <>
      <h2 id="what-happened">What happened</h2>
      <p>
        On <strong>15 October 2026</strong> BeyondTrust published advisory <strong>BT26-05</strong> for{" "}
        <strong>CVE-2026-102764</strong>, a flaw in internal messaging components of Remote Support. The components
        did not check where incoming messages came from. An unauthenticated attacker on the network can use that to
        perform file operations on the appliance, and Mandiant reports that in practice it means uploading arbitrary
        files.
      </p>
      <p>
        It was a zero-day. BeyondTrust says the attacker first used it on <strong>29 August 2026</strong>, against one
        BeyondTrust-hosted Remote Support instance and one self-hosted appliance. BeyondTrust found the hosted case
        during a hunt on 28 September and contained it 27 minutes after detection. Mandiant investigated the
        self-hosted case.
      </p>
      <p>
        Google Threat Intelligence Group and Mandiant attribute the activity to <strong>ARMORY CASTLE</strong>, a
        suspected PRC-nexus espionage group formerly tracked as UNC5221. CrowdStrike tracks the same cluster as WARP
        PANDA. The same group was behind earlier zero-days in Citrix NetScaler and Ivanti Connect Secure.
      </p>

      <h2 id="who-is-affected">Who is affected</h2>
      <ul>
        <li>
          <strong>Self-hosted Remote Support, all versions up to and including 26.2.3.</strong> This is the group that
          has to act.
        </li>
        <li>
          <strong>Remote Support SaaS:</strong> BeyondTrust patched every SaaS instance by 9 October 2026. No action is
          needed for the vulnerability itself.
        </li>
        <li>
          <strong>Privileged Remote Access (PRA):</strong> BeyondTrust says it found no way to exploit PRA, but PRA
          shares the affected code, so it released the patch for PRA as well and recommends self-hosted PRA customers
          apply it.
        </li>
      </ul>
      <p>
        No credentials and no user interaction are needed. Any appliance reachable from the internet on an affected
        version is in scope.
      </p>

      <h2 id="what-is-confirmed">What is confirmed</h2>
      <p>
        <strong>Score.</strong> BeyondTrust rates it CVSS 4.0 <strong>9.3, Critical</strong>{" "}
        (AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H). The weakness is CWE-290, authentication bypass by spoofing.
      </p>
      <p>
        <strong>Fix.</strong> Patch <strong>BT26-05-RS</strong> covers versions 24.3.1 to 26.2.3. Appliances older than
        24.3.1 must be upgraded before the patch can be applied. Appliances subscribed to automatic updates in the
        /appliance interface receive it automatically; everyone else applies it by hand.
      </p>
      <p>
        <strong>Exploited in the wild.</strong> CISA added the CVE to the Known Exploited Vulnerabilities catalog on{" "}
        <strong>16 October 2026</strong>, with a due date of 19 October 2026 for US federal agencies and a forensic
        triage requirement.
      </p>
      <p>
        <strong>What the attacker did after getting in.</strong> Mandiant&apos;s write-up of the self-hosted case
        describes a hands-on operator who knew the appliance well:
      </p>
      <ul>
        <li>
          planted the <strong>SAWFLY</strong> PHP web shell (<code>mangoapi.php</code>) in the appliance&apos;s web
          root;
        </li>
        <li>
          copied <code>/bin/sh</code> to <code>/usr/bin/dbus-authd</code>, made it owned by root and set the SUID bit,
          giving a root shell on demand;
        </li>
        <li>
          tried to dump the appliance&apos;s credential vault with the built-in <code>/ns/sbin/bt-secrets</code>{" "}
          utility, then deleted its log;
        </li>
        <li>
          added a boot script that grants the web service account passwordless sudo through the appliance&apos;s
          sudoers template, so the access survives reboots and configuration resets;
        </li>
        <li>
          raised a compromised admin account&apos;s Jump Item and Team permissions from <em>No Access</em> to{" "}
          <em>Administrator</em>, then used Remote Support sessions to reach internal machines and copy files;
        </li>
        <li>
          ran the <strong>BARECLAW</strong> SOCKS5-over-WebSocket tunneler and edited HAProxy so it was reachable from
          the internet;
        </li>
        <li>deleted host, web server and application logs along the way.</li>
      </ul>

      <h2 id="what-is-not-known">What is not known</h2>
      <ul>
        <li>
          <strong>The technical details of the bug.</strong> BeyondTrust is withholding them while self-hosted
          appliances are patched.
        </li>
        <li>
          <strong>How many appliances are compromised.</strong> As of 16 October BeyondTrust knew of two affected
          customers and no attacker activity after August. That will change if mass exploitation starts.
        </li>
        <li>
          <strong>Whether other groups will join.</strong> Mandiant warns that ARMORY CASTLE and others have
          historically exploited broadly once a bug becomes public. Plan as if they will.
        </li>
      </ul>

      <h2 id="what-to-do-now">What to do now</h2>
      <ol>
        <li>
          <strong>Patch today.</strong> Apply BT26-05-RS to every self-hosted Remote Support and PRA appliance. If you
          are below 24.3.1, upgrade first. Confirm the patch is installed rather than assuming automatic updates ran.
        </li>
        <li>
          <strong>Hunt, because the patch will not evict anyone.</strong> The patch closes the way in. It does not
          remove a web shell, a SUID shell, a boot script or a changed permission that is already there. Work through
          the checklist below on every appliance that was reachable from the internet on a vulnerable version.
        </li>
        <li>
          <strong>Get logs off the box.</strong> Forward appliance syslog and session events to your SIEM. This actor
          deletes local logs, so the off-box copy may be the only record you have. Start with what was forwarded before
          today.
        </li>
        <li>
          <strong>Shrink the exposure.</strong> Expose only the parts of the appliance your users and customers need,
          keep the admin interface on trusted networks, and allow outbound traffic only to destinations it needs.
        </li>
        <li>
          <strong>If you find anything, treat it as a breach.</strong> Image the appliance before rebuilding it. Rotate
          every credential it stored or injected. Watch those accounts for logins outside a managed session or from new
          places, and review new MFA registrations on privileged accounts.
        </li>
      </ol>

      <h2 id="hunt-checklist">Hunt checklist</h2>
      <p>
        These are the artifacts Mandiant recovered from the self-hosted case. ARMORY CASTLE changes tooling and
        infrastructure between victims, so a clean result here is not proof you are clean. Pair it with the behaviour
        checks after the table.
      </p>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th scope="col">Where to look</th>
              <th scope="col">What would be suspicious</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>/usr/bin/dbus-authd</code>
              </td>
              <td>Exists, owned by root with the SUID bit set. It is a copy of /bin/sh.</td>
            </tr>
            <tr>
              <td>
                <code>/home/bomgar/sbin/post_boot.d/</code>
              </td>
              <td>
                Any script you did not put there, especially <code>zz-root-persist</code>.
              </td>
            </tr>
            <tr>
              <td>
                <code>/ns/config/sudoers.template</code>
              </td>
              <td>A line granting the site service account <code>ALL=(ALL) NOPASSWD: ALL</code>.</td>
            </tr>
            <tr>
              <td>
                <code>/ns/config/haproxy.conf</code>
              </td>
              <td>
                An ACL or backend you did not add, such as an ACL on <code>/uidchanarge</code> or a backend pointing at
                127.0.0.1:19800.
              </td>
            </tr>
            <tr>
              <td>Web root under the site service account</td>
              <td>
                Unknown PHP files, such as <code>mangoapi.php</code>, and POST requests to unfamiliar <code>.php</code>{" "}
                paths in access logs.
              </td>
            </tr>
            <tr>
              <td>
                <code>/tmp/</code>
              </td>
              <td>
                Unknown binaries, such as <code>ingredi_ws</code>, or a process listening on a local port such as
                19800.
              </td>
            </tr>
            <tr>
              <td>
                <code>/home/bomgar/log/bt-secrets.log</code>
              </td>
              <td>Missing or emptied, or entries showing <code>bt-secrets get … vault</code>.</td>
            </tr>
            <tr>
              <td>Remote Support syslog in your SIEM</td>
              <td>
                <code>user_changed</code> events that move Jump Item or Team roles from No Access to Administrator.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>Behaviour to hunt for, as BeyondTrust recommends:</p>
      <ul>
        <li>
          admin or privileged sessions from residential broadband or commercial VPN addresses that you cannot tie to a
          known administrator or ticket;
        </li>
        <li>new script files in web directories, and the web service account starting shells;</li>
        <li>account, permission or session-policy changes nobody asked for;</li>
        <li>gaps in log forwarding that start and end inside a single session.</li>
      </ul>
      <p>
        Mandiant&apos;s post lists file hashes and YARA rules for SAWFLY and BARECLAW. BeyondTrust customers can also
        request its threat hunting package for this actor through the trust portal.
      </p>

      <h2 id="poster">The poster</h2>
      <p>
        We made a one-page poster of the response steps for teams to print or share. Its full text is below the image.
      </p>
      <figure className="article-poster">
        <img
          src={`${assets}/remote-support-backdoor-poster.webp`}
          width={1000}
          height={1500}
          alt="Cynorida poster titled Remote Support Turned Backdoor: CVE-2026-102764, CVSS 9.3, Remote Support 26.2.3 and earlier, with four steps: patch, hunt, restrict and harden."
          loading="lazy"
          decoding="async"
        />
        <figcaption>
          <a href={`${assets}/remote-support-backdoor-poster.png`} download>
            Download the full-resolution poster (PNG)
          </a>
        </figcaption>
      </figure>
      <h3>Remote Support turned backdoor</h3>
      <p>CVE-2026-102764 · CVSS 9.3 · Remote Support 26.2.3 and earlier.</p>
      <ol>
        <li>
          <strong>Patch.</strong> Self-hosted 24.3.1 to 26.2.3: apply BT26-05-RS. Older than 24.3.1: upgrade first.
        </li>
        <li>
          <strong>Hunt.</strong> Treat remote support exposure as high risk. Scan for vulnerable versions and active
          sessions.
        </li>
        <li>
          <strong>Restrict.</strong> Limit access to trusted networks only. Disable internet access and remove unused
          accounts.
        </li>
        <li>
          <strong>Harden.</strong> Enable MFA, enforce strong credentials, and monitor for suspicious activity.
        </li>
      </ol>
      <p>
        <strong>The context.</strong> Remote support tools are built to help, not for attackers. This vulnerability
        turns trusted access into a direct path in. Once exposed, attackers can bypass security controls, move
        laterally and gain persistent access to your network.
      </p>
    </>
  );
}

export const beyondtrustRemoteSupportZeroDay: Post = {
  slug,
  title: "BeyondTrust Remote Support zero-day CVE-2026-102764: patch, then hunt",
  description:
    "A China-nexus group exploited CVE-2026-102764 (CVSS 9.3) in BeyondTrust Remote Support from 29 August. SaaS is patched; self-hosted appliances need BT26-05-RS and a hunt.",
  category: "Vulnerability",
  severity: "Critical",
  published: "2026-10-19",
  updated: "2026-10-19",
  author: "Cynorida Research",
  summary:
    "BeyondTrust Remote Support had a zero-day, CVE-2026-102764 (CVSS 9.3), exploited since 29 August 2026. Mandiant ties it to ARMORY CASTLE, a suspected China-nexus group that tends to go wide once a bug is public. SaaS is already patched. Self-hosted appliances up to 26.2.3 need patch BT26-05-RS today, and then a hunt, because the patch will not remove an attacker who is already in.",
  facts: [
    { label: "CVE", value: "CVE-2026-102764" },
    { label: "CVSS 4.0", value: "9.3 Critical" },
    { label: "Affected", value: "Remote Support ≤ 26.2.3 (self-hosted)" },
    { label: "Fix", value: "BT26-05-RS (24.3.1 to 26.2.3)" },
    { label: "Exploited", value: "Yes, since 29 Aug 2026" },
    { label: "CISA KEV", value: "Added 16 Oct 2026" },
  ],
  sections: [
    { id: "what-happened", title: "What happened" },
    { id: "who-is-affected", title: "Who is affected" },
    { id: "what-is-confirmed", title: "What is confirmed" },
    { id: "what-is-not-known", title: "What is not known" },
    { id: "what-to-do-now", title: "What to do now" },
    { id: "hunt-checklist", title: "Hunt checklist" },
    { id: "poster", title: "The poster" },
    { id: "sources", title: "Sources" },
  ],
  poster: {
    src: `${assets}/remote-support-backdoor-poster.webp`,
    download: `${assets}/remote-support-backdoor-poster.png`,
    width: 1000,
    height: 1500,
    alt: "Remote Support Turned Backdoor poster for CVE-2026-102764",
  },
  shareImage: `${assets}/share.jpg`,
  sources: [
    {
      label: "BeyondTrust security advisory BT26-05",
      href: "https://www.beyondtrust.com/trust-center/security-advisories/bt26-05",
    },
    {
      label: "BeyondTrust: ARMORY CASTLE and BT26-05, what security teams need to know",
      href: "https://www.beyondtrust.com/blog/entry/bt26-05",
    },
    {
      label: "Google Threat Intelligence Group and Mandiant: ARMORY CASTLE exploits BeyondTrust",
      href: "https://cloud.google.com/blog/topics/threat-intelligence/armory-castle-exploits-beyondtrust",
    },
    { label: "CVE.org record CVE-2026-102764", href: "https://www.cve.org/CVERecord?id=CVE-2026-102764" },
    { label: "NVD CVE-2026-102764", href: "https://nvd.nist.gov/vuln/detail/CVE-2026-102764" },
    {
      label: "CISA Known Exploited Vulnerabilities catalog entry",
      href: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog?field_cve=CVE-2026-102764",
    },
  ],
  relatedServices: ["incident-response", "threat-hunting", "penetration-testing"],
  tags: ["BeyondTrust", "Remote Support", "zero-day", "CVE-2026-102764", "ARMORY CASTLE", "CISA KEV"],
  Body,
};
