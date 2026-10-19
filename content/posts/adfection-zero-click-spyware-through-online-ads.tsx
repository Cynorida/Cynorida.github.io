import type { Post } from "./types";

const slug = "adfection-zero-click-spyware-through-online-ads";
const assets = `/blog/${slug}`;

const citizenLab = "https://citizenlab.ca/research/how-discover-tech-turned-targeted-ads-into-a-pipeline-for-spyware/";
const hackerNews = "https://thehackernews.com/2026/10/citizen-lab-traces-zero-click-candiru.html";
const bleepingComputer =
  "https://www.bleepingcomputer.com/news/security/zero-click-attacks-used-targeted-ads-to-deliver-candiru-spyware/";
const computing =
  "https://www.computing.co.uk/news/2026/security/zero-click-spyware-shows-security-problem-with-programmatic-advertising";
const alJazeera =
  "https://www.aljazeera.com/news/2026/10/16/how-israeli-firms-zero-click-malware-attack-poses-global-security-risk";

type SourceLinkProps = {
  href: string;
  children: React.ReactNode;
};

function SourceLink({ href, children }: SourceLinkProps) {
  return (
    <>
      (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
      )
    </>
  );
}

function Body() {
  return (
    <>
      <p>
        No click. No download. No suspicious link. Just an ad loading on a page, sometimes out of sight in the
        background.
      </p>
      <p>
        On <strong>15 October 2026</strong>, the University of Toronto&apos;s Citizen Lab confirmed that{" "}
        <strong>Candiru</strong> spyware reached devices at Al Jazeera through ordinary targeted online ads. It is the
        first public technical proof that mercenary spyware has infected real devices through the advertising system.
        Citizen Lab named the technique <strong>AdFection</strong>.
      </p>

      <h2 id="what-happened">What happened</h2>
      <p>
        Al Jazeera&apos;s own IT team caught it first. In 2024 they noticed unusual patterns on devices used by some
        journalists, and in 2025 they handed network logs to Citizen Lab for a full investigation{" "}
        <SourceLink href={alJazeera}>Al Jazeera</SourceLink>.
      </p>
      <p>
        Those logs showed the same sequence on every infected device: a Discover-Tech ad server, then a Candiru server
        that screens the device, then a command-and-control server that runs the spyware{" "}
        <SourceLink href={hackerNews}>The Hacker News</SourceLink>.
      </p>
      <p>
        Al Jazeera also pulled a Windows program file off a compromised machine. Its code matched techniques from a
        Candiru tool Citizen Lab dissected in 2021, which is the basis for attributing the attacks to Candiru with high
        confidence.
      </p>
      <p>Two limits worth stating plainly:</p>
      <ul>
        <li>
          Citizen Lab recovered the spyware, but not the exploit that broke into the browser or app. That first step is
          reconstructed from how the attack was set up.
        </li>
        <li>Citizen Lab has not said which government commissioned the attacks.</li>
      </ul>
      <p>
        This isn&apos;t Al Jazeera&apos;s first time as a target. In 2020, dozens of its journalists&apos; iPhones were
        hacked with NSO Group&apos;s Pegasus, in a separate operation.
      </p>

      <h2 id="how-it-worked">How the attack worked</h2>
      <p>
        The trick is that the ad itself was clean. Each Discover-Tech ad carried a small script that, when the ad
        rendered, sent the device&apos;s advertising ID and IP address to a Discover-Tech server Citizen Lab calls the
        NOAS server. That server decided who was a target <SourceLink href={citizenLab}>Citizen Lab</SourceLink>.
      </p>
      <ol>
        <li>
          <strong>The ad loads.</strong> A Discover-Tech ad renders in a website or app. Nobody has to click it.
        </li>
        <li>
          <strong>The ad phones home.</strong> Its script sends the advertising ID and IP address to the NOAS server.
        </li>
        <li>
          <strong>The server picks targets.</strong> Most devices get an empty response. Selected targets get code that
          leads to Candiru&apos;s servers.
        </li>
        <li>
          <strong>Candiru screens the device.</strong> A Candiru validator server checks the device before infection. The
          browser or app exploit used here was never recovered.
        </li>
        <li>
          <strong>The spyware runs.</strong> The implant talks to a command-and-control server. The Windows implant from
          this step was recovered.
        </li>
      </ol>
      <p>
        Because most devices that rendered the ad got an empty response, the ad networks only ever saw a clean ad.
      </p>

      <h2 id="the-scale">The scale</h2>
      <p>
        Al Jazeera is the confirmed victim, but the ad operation behind it was industrial. Most figures come from
        bidding records Discover-Tech left exposed on one of its own sites, so they undercount its total activity.
      </p>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th scope="col">Measure</th>
              <th scope="col">Figure</th>
              <th scope="col">Period</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ad bids placed</td>
              <td>3.77 billion</td>
              <td>Mar to Jun 2026</td>
            </tr>
            <tr>
              <td>Ad auctions won</td>
              <td>442 million</td>
              <td>Mar to Jun 2026</td>
            </tr>
            <tr>
              <td>Websites showing ads with the callback code</td>
              <td>120,768</td>
              <td>Mar to Jun 2026</td>
            </tr>
            <tr>
              <td>Mobile apps (Android and iOS) showing them</td>
              <td>75,373</td>
              <td>Mar to Jun 2026</td>
            </tr>
            <tr>
              <td>Ads served per day</td>
              <td>about 10 million</td>
              <td>Confiant estimate</td>
            </tr>
            <tr>
              <td>Users sent to the operation&apos;s domains</td>
              <td>hundreds of thousands to millions</td>
              <td>Citizen Lab estimate</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Sources: <a href={bleepingComputer}>BleepingComputer</a>, <a href={hackerNews}>The Hacker News</a>.
      </p>
      <p>
        The ads also turned up inside the networks of NATO, the United Nations, EU bodies, government offices in about
        two dozen countries, chipmakers and news organizations.
      </p>
      <p>
        An ad showing up on a network is not proof of infection. It shows reach. Confiant found the few ads it could
        tie directly to Candiru were low-volume and mostly hit home and mobile connections, not those sensitive
        networks. The point is that the pipe was already connected to them.
      </p>

      <h2 id="who-is-behind-it">Who&apos;s behind it</h2>
      <p>
        Discover-Tech is an Israeli company, registered in 2020, that presents itself as a normal digital ad firm.
        Citizen Lab calls it a bridge between mercenary spyware companies and the advertising ecosystem{" "}
        <SourceLink href={bleepingComputer}>BleepingComputer</SourceLink>. Its platform, Controlium, let customers
        profile, de-anonymize and fingerprint devices, and target specific ones with malicious code.
      </p>
      <p>
        The uncomfortable part: Google and IAB Europe both listed Discover-Tech as an approved ad vendor from 2020
        until this month <SourceLink href={hackerNews}>The Hacker News</SourceLink>. Citizen Lab calls it a troubling
        lack of due diligence within the digital advertising industry{" "}
        <SourceLink href={citizenLab}>Citizen Lab</SourceLink>.
      </p>
      <p>
        Candiru sells surveillance tools, officially only to governments. The US put it on a trade blacklist in 2021
        over spyware used against officials, journalists and activists. In 2025 its assets moved to a new company,
        reported to be Integrity Labs, that the sanctions do not cover. Its past tools were delivered through Windows
        and Chrome zero-days.
      </p>
      <p>
        Citizen Lab also ties Discover-Tech to other spyware and surveillance vendors, including Bindecy and Intelos{" "}
        <SourceLink href={citizenLab}>Citizen Lab</SourceLink>. Discover-Tech and Candiru&apos;s owners did not respond
        to requests for comment.
      </p>

      <h2 id="industry-response">How the industry responded</h2>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th scope="col">Company</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Google</td>
              <td>Removed Discover-Tech from its vendor list and cut off ad exchange access</td>
            </tr>
            <tr>
              <td>IAB Europe</td>
              <td>Suspended it after an audit found policy violations</td>
            </tr>
            <tr>
              <td>Beeswax (Comcast)</td>
              <td>Removed it</td>
            </tr>
            <tr>
              <td>Vungle (Liftoff)</td>
              <td>Paused its access pending review</td>
            </tr>
            <tr>
              <td>Eskimi</td>
              <td>Blocked its accounts</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Some platforms acted. Not all of them did, and Discover-Tech&apos;s website was still online when the report
        landed.
      </p>

      <h2 id="why-it-matters">Why this matters for every business</h2>
      <p>Ads are attack surface now, and most security programs don&apos;t treat them that way.</p>
      <p>
        <strong>Awareness training doesn&apos;t help.</strong> There is nothing to click, nothing to spot, and no
        suspicious sender. Standard awareness campaigns offer little protection when the victim takes no action at all{" "}
        <SourceLink href={computing}>Computing</SourceLink>.
      </p>
      <p>
        <strong>The ad isn&apos;t the weapon, so filters miss it.</strong> Because the ad itself carried no attack
        code, the networks delivering it had nothing harmful to detect. The server decided who got the payload.
        Everyone else got an empty response.
      </p>
      <p>
        <strong>Every ad is also a data leak.</strong> Even when nobody is targeted, the ad still sends data back to the
        operator: page cookies and the device&apos;s public IPv6 address{" "}
        <SourceLink href={citizenLab}>Citizen Lab</SourceLink>. That&apos;s reconnaissance at scale, for free.
      </p>
      <p>
        <strong>Mobile apps are the blind spot.</strong> About 77% of Discover-Tech&apos;s bids were for ads inside
        mobile apps, not browsers. Ads ran in mainstream apps including Viber, Truecaller, Yahoo Mail, Duolingo and
        weather apps. Browser ad blockers don&apos;t cover in-app ads.
      </p>
      <p>
        <strong>&ldquo;Certified&rdquo; didn&apos;t mean safe.</strong> A vendor with years of spyware-industry ties
        sat on Google&apos;s and IAB Europe&apos;s approved lists from 2020 to 2026. Citizen Lab found no good evidence
        it earned money from legitimate advertising.
      </p>
      <p>
        Citizen Lab&apos;s own conclusion is blunt: there is currently no consistently safe way to expose users and
        networks to targeted ads.
      </p>

      <h2 id="what-to-do-now">What to do now</h2>
      <p>
        Start with Citizen Lab&apos;s main recommendation: block online advertising at the network gateway and on
        work-issued devices. CISA and the NSA have both recommended ad blocking against malvertising before{" "}
        <SourceLink href={computing}>Computing</SourceLink>. Then close the gaps around it.
      </p>
      <ol>
        <li>
          <strong>Block ads at the gateway.</strong> Use DNS filtering or your secure web gateway to drop ad and
          tracking domains for every device on the corporate network, including guest and BYOD segments.
        </li>
        <li>
          <strong>Cover phones, not just laptops.</strong> Most of this campaign ran inside mobile apps, where browser
          extensions can&apos;t reach. Push DNS-level ad filtering to managed phones through your MDM.
        </li>
        <li>
          <strong>Take away the targeting key.</strong> The operator picked victims by advertising ID and IP address.
          On managed devices, turn off app tracking on iOS and delete the advertising ID on Android.
        </li>
        <li>
          <strong>Hand out hardened browsers.</strong> Give staff browsers with built-in anti-tracking protections as
          the default.
        </li>
        <li>
          <strong>Protect high-risk people harder.</strong> Executives, legal, finance, comms and anyone with sensitive
          access deserve stronger controls than the baseline. On iPhone, Lockdown Mode exists for exactly this threat
          class; on Android, turn on Advanced Protection.
        </li>
        <li>
          <strong>Patch browsers and operating systems fast.</strong> The ad only opens the door; a browser or app
          exploit does the break-in. Candiru&apos;s earlier chains used Windows and Chrome zero-days, so update cadence
          matters.
        </li>
        <li>
          <strong>Hunt for the indicators.</strong> Block the known infrastructure and search your logs for the
          attack&apos;s signature: a device hitting a Discover-Tech ad server, then a Candiru validator, then a
          command-and-control server.
        </li>
      </ol>

      <h2 id="indicators">Published indicators</h2>
      <p>Domains are defanged so they cannot be clicked by accident.</p>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th scope="col">Type</th>
              <th scope="col">Indicator</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Domain</td>
              <td>
                <code>mtrtb[.]com</code>
              </td>
              <td>Discover-Tech ad server</td>
            </tr>
            <tr>
              <td>Domain</td>
              <td>
                <code>keyadapter[.]com</code>
              </td>
              <td>Candiru validator</td>
            </tr>
            <tr>
              <td>Domain</td>
              <td>
                <code>sharethere[.]net</code>
              </td>
              <td>Candiru validator</td>
            </tr>
            <tr>
              <td>Domain</td>
              <td>
                <code>fearevolve[.]com</code>
              </td>
              <td>Candiru command and control</td>
            </tr>
            <tr>
              <td>Domain</td>
              <td>
                <code>jobmarcher[.]com</code>
              </td>
              <td>Candiru command and control</td>
            </tr>
            <tr>
              <td>SHA-256</td>
              <td>
                <code>255869de85e2a171993fc5eb8a556d873a1b8966e040f6f55926f2fa2d595cc8</code>
              </td>
              <td>Recovered Windows spyware sample</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Sources: <a href={citizenLab}>Citizen Lab</a>, <a href={hackerNews}>The Hacker News</a>. Citizen Lab&apos;s
        report and Confiant&apos;s report carry the full indicator lists, including every Discover-Tech NOAS and
        tracking domain.
      </p>

      <h2 id="bottom-line">The bottom line</h2>
      <p>
        For years, &ldquo;don&apos;t click suspicious links&rdquo; was the advice. AdFection makes it irrelevant. A
        certified ad vendor, buying through the world&apos;s biggest ad exchanges, could put a spyware selector on
        almost 200,000 apps and websites, and the victims never had to do anything.
      </p>
      <p>
        If your work devices show ads, they&apos;re attack surface. Block them at the gateway, cover the phones, and
        treat ad traffic like any other untrusted input.
      </p>
      <p>
        Cynorida can help. We map where ad and tracking traffic reaches your network, lock it down across laptops and
        mobile, and hunt for the indicators above.
      </p>

      <h2 id="poster">The poster</h2>
      <p>
        A one-page poster of the incident and the fixes, for teams to print or share. Its full text is below the image.
      </p>
      <figure className="article-poster">
        <img
          src={`${assets}/ads-spyware-poster.webp`}
          width={1000}
          height={1500}
          alt="Cynorida poster titled An Ad Is All It Took: no click, no download, no warning. It summarises the Candiru spyware attack on Al Jazeera through targeted ads and lists four fixes."
          loading="lazy"
          decoding="async"
        />
        <figcaption>
          <a href={`${assets}/ads-spyware-poster.png`} download>
            Download the full-resolution poster (PNG)
          </a>
        </figcaption>
      </figure>
      <h3>An ad is all it took</h3>
      <p>No click. No download. No warning.</p>
      <p>
        <strong>The incident.</strong> Citizen Lab confirmed that Candiru spyware reached devices at Al Jazeera through
        targeted online ads. The ad only had to load. No click needed. At least 45 devices were targeted in 2024 and
        2025. The ad network behind it ran ads on about 200,000 sites and apps, including on government and
        institutional networks.
      </p>
      <p>
        <strong>The attack.</strong>
      </p>
      <ul>
        <li>AdFection: zero-click delivery through targeted ads.</li>
        <li>Candiru spyware, now rebranded Integrity Labs.</li>
        <li>About 10 million ads a day, across about 200,000 sites and apps.</li>
      </ul>
      <p>
        <strong>Fix.</strong>
      </p>
      <ol>
        <li>
          <strong>Block at the gateway.</strong> Filter ad and tracker domains with DNS or proxy rules across the whole
          network.
        </li>
        <li>
          <strong>Lock down work devices.</strong> Enforce ad blocking on company laptops and phones through device
          management.
        </li>
        <li>
          <strong>Patch browsers fast.</strong> Keep browsers and mobile operating systems updated. The ad still needs
          an exploit to land.
        </li>
        <li>
          <strong>Protect high-risk staff.</strong> Turn on Lockdown Mode (iOS) or Advanced Protection (Android) for
          journalists, executives and admins.
        </li>
      </ol>
      <p>Stay alert. Block the ads.</p>
    </>
  );
}

export const adfectionZeroClickSpyware: Post = {
  slug,
  title: "No click required: how online ads delivered Candiru spyware",
  description:
    "Citizen Lab confirmed Candiru spyware reached Al Jazeera devices through targeted ads with no click. How AdFection worked, its scale, the indicators, and how to block it.",
  category: "Threat research",
  severity: "High",
  published: "2026-10-19",
  updated: "2026-10-19",
  author: "Cynorida Research",
  summary:
    "At least 45 Al Jazeera devices were targeted in 2024 and 2025 by Candiru spyware delivered through ordinary targeted ads, bought by Israeli ad-tech firm Discover-Tech through mainstream exchanges including Google's. The ad carried no exploit: a server chose who got attack code, so ad networks had nothing to catch. The same operation reached about 75,000 apps and 120,000 websites. Citizen Lab's main advice: block ads at the network gateway and on work devices.",
  facts: [
    { label: "Technique", value: "AdFection (zero-click)" },
    { label: "Spyware", value: "Candiru (Integrity Labs)" },
    { label: "Ad vendor", value: "Discover-Tech" },
    { label: "Targeted", value: "45+ Al Jazeera devices" },
    { label: "Reach", value: "120,768 sites, 75,373 apps" },
    { label: "Disclosed", value: "15 Oct 2026, Citizen Lab" },
  ],
  sections: [
    { id: "what-happened", title: "What happened" },
    { id: "how-it-worked", title: "How the attack worked" },
    { id: "the-scale", title: "The scale" },
    { id: "who-is-behind-it", title: "Who's behind it" },
    { id: "industry-response", title: "How the industry responded" },
    { id: "why-it-matters", title: "Why this matters" },
    { id: "what-to-do-now", title: "What to do now" },
    { id: "indicators", title: "Published indicators" },
    { id: "bottom-line", title: "The bottom line" },
    { id: "poster", title: "The poster" },
    { id: "sources", title: "Sources" },
  ],
  poster: {
    src: `${assets}/ads-spyware-poster.webp`,
    download: `${assets}/ads-spyware-poster.png`,
    width: 1000,
    height: 1500,
    alt: "An Ad Is All It Took poster on the Candiru spyware delivered through targeted ads",
  },
  shareImage: { src: `${assets}/share.jpg`, width: 1200, height: 1800 },
  sources: [
    { label: "Citizen Lab: Exposing AdFection (full report), 15 Oct 2026", href: citizenLab },
    {
      label: "The Hacker News: Citizen Lab traces zero-click Candiru spyware infections at Al Jazeera to targeted ads",
      href: hackerNews,
    },
    { label: "BleepingComputer: Targeted ads installed Candiru spyware in zero-click attacks", href: bleepingComputer },
    { label: "Computing: Zero-click spyware shows scale of adtech's security problem", href: computing },
    { label: "Al Jazeera: How Israeli firm's zero-click malware attack poses global security risk", href: alJazeera },
  ],
  relatedServices: ["threat-hunting", "managed-detection-and-response", "incident-response"],
  tags: ["AdFection", "Candiru", "spyware", "zero-click", "malvertising", "Discover-Tech", "Citizen Lab"],
  Body,
};
