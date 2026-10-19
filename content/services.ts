export type ServiceKind = "defensive" | "offensive";

export type ServiceSummary = {
  slug: string;
  name: string;
  kind: ServiceKind;
  summary: string;
  offered: boolean;
};

export type ServiceStep = {
  title: string;
  detail: string;
};

export type Service = ServiceSummary & {
  lede: string;
  covers: string[];
  steps: ServiceStep[];
  deliverables: string[];
};

export const serviceKindLabels: Record<ServiceKind, string> = {
  defensive: "Protect",
  offensive: "Test",
};

export const authorisationNote =
  "Offensive testing starts only after the owner of the systems in scope, or someone they have authorised in writing, has signed off on a written scope and rules of engagement. We do not test anything outside that scope.";

export const services: Service[] = [
  {
    slug: "managed-detection-and-response",
    name: "Managed detection and response",
    kind: "defensive",
    summary: "Analysts monitor your endpoints, identities and cloud environments and respond through actions you approve.",
    offered: true,
    lede: "Our analysts work from the telemetry you already collect. They triage and investigate what it raises, and they contain threats only through the playbooks you have approved.",
    covers: [
      "Alerts from the endpoint detection and response tool you already run",
      "Identity sign-ins, account changes and suspicious authentication",
      "Cloud control-plane activity and audit logs",
      "Triage and investigation of the alerts your connected sources raise",
      "Containment actions limited to the playbooks you have approved",
      "Escalation to the contacts you name for anything outside those playbooks",
    ],
    steps: [
      {
        title: "Agree the ground rules",
        detail: "We agree which sources to connect, who we contact and how, and which containment playbooks we may run without calling you first.",
      },
      {
        title: "Connect your sources",
        detail: "You grant the access needed for the telemetry in scope. We connect it to our monitoring and confirm events are arriving.",
      },
      {
        title: "Tune before relying on it",
        detail: "We review early alerts with your team and tune out known-good activity, so analysts spend their time on what matters.",
      },
      {
        title: "Monitor and respond",
        detail: "Analysts investigate and keep a case record your team can read. They act within approved playbooks, and anything outside them goes to your named contact first.",
      },
      {
        title: "Review together",
        detail: "Each month we send a written report and walk through it with you, including the recommendations that are still open.",
      },
    ],
    deliverables: [
      "A shared case record for every alert, with evidence and analyst notes",
      "A written summary for each confirmed incident",
      "A record of every containment action and the playbook that allowed it",
      "A monthly report on incidents, actions taken, detection coverage and open recommendations",
      "A review call to go through the report",
    ],
  },
  {
    slug: "incident-response",
    name: "Incident response",
    kind: "defensive",
    summary: "Scoping, containment, investigation and recovery when something has already gone wrong.",
    offered: true,
    lede: "When something has already gone wrong, we help you work out what happened, stop it spreading, remove the attacker’s access and recover. We work on the access you grant and keep a written record throughout.",
    covers: [
      "Scoping the affected systems, accounts and data",
      "Collecting and preserving evidence from endpoints, logs and cloud environments",
      "Building a timeline of the attacker’s activity from that evidence",
      "Containment and eradication through actions you approve",
      "Recovery support and hardening to make a repeat harder",
      "Working alongside your internal teams and advisers, where you ask us to",
    ],
    steps: [
      {
        title: "First call",
        detail: "We take the facts you have, agree immediate priorities, and confirm who on your side can approve actions on your systems.",
      },
      {
        title: "Agree access and authority",
        detail: "We confirm in writing which systems we may access, what we may change, and who approves containment.",
      },
      {
        title: "Investigate and contain",
        detail: "We collect evidence, establish what the attacker did, and contain it through the actions you approve.",
      },
      {
        title: "Eradicate and recover",
        detail: "We help remove the attacker’s access, restore affected systems and close the gaps they used.",
      },
      {
        title: "Report and debrief",
        detail: "We write up what happened and walk your team through it, including what to change next.",
      },
    ],
    deliverables: [
      "A written incident report with the timeline, affected assets and actions taken",
      "The root cause, where the evidence supports one",
      "Evidence handled and retained as agreed with you",
      "Prioritised recommendations to prevent a repeat",
      "A debrief call with your team",
    ],
  },
  {
    slug: "threat-hunting",
    name: "Threat hunting",
    kind: "defensive",
    summary: "Hypothesis-led searches through your telemetry for activity that no rule has caught yet.",
    offered: true,
    lede: "Each hunt starts from a hypothesis about how an attacker could be operating in your environment, then tests it against your telemetry to find activity your detection rules have not caught.",
    covers: [
      "Hypotheses drawn from threat reporting, MITRE ATT&CK techniques and your own environment",
      "Searches across endpoint, identity and cloud telemetry",
      "Investigation of anything suspicious, escalated as an incident if confirmed",
      "Logging gaps that limit what can be seen",
      "Candidate detection rules from what each hunt finds",
    ],
    steps: [
      {
        title: "Agree the focus",
        detail: "We agree with you which systems, data sources and threats matter most.",
      },
      {
        title: "Form hypotheses",
        detail: "We write down what we are looking for and why, before running a single query.",
      },
      {
        title: "Hunt",
        detail: "We search your telemetry, follow up anything unusual and rule out known-good activity.",
      },
      {
        title: "Escalate what is real",
        detail: "Anything that looks like an active intrusion goes to your named contact straight away and is handled as an incident.",
      },
      {
        title: "Report",
        detail: "We report what we looked for, what we found, and what should become a standing detection.",
      },
    ],
    deliverables: [
      "A written report for each hunt: hypotheses, data sources, queries and results",
      "The queries we ran, so your team can run them again",
      "Candidate detection rules for anything worth watching permanently",
      "A list of logging gaps that limited the hunt",
    ],
  },
  {
    slug: "detection-engineering",
    name: "Detection engineering",
    kind: "defensive",
    summary: "Detection rules written, tested and maintained as code, mapped to MITRE ATT&CK.",
    offered: true,
    lede: "We write detection rules as code, test them before they go live and maintain them afterwards, so you know what each rule is for and which ATT&CK techniques it covers.",
    covers: [
      "A review of your current detection coverage against MITRE ATT&CK",
      "Rules written in Sigma and in your SIEM’s own query language",
      "Testing against sample events and your historical data before deployment",
      "Tuning to cut false positives without losing the behaviour a rule is meant to catch",
      "Version control, peer review and documentation for every rule",
      "Retiring rules that no longer earn their place",
    ],
    steps: [
      {
        title: "Review coverage",
        detail: "We map the rules and data sources you have against ATT&CK and show where the gaps are.",
      },
      {
        title: "Prioritise",
        detail: "We agree with you which gaps to close first, based on your environment and the threats that matter to you.",
      },
      {
        title: "Write and test",
        detail: "Each rule is written as code, reviewed by a second engineer and tested before it goes live.",
      },
      {
        title: "Deploy",
        detail: "Rules go live through a change process you agree, so nothing reaches production unannounced.",
      },
      {
        title: "Maintain",
        detail: "We revisit rules as your environment changes, tune noisy ones and retire those that no longer help.",
      },
    ],
    deliverables: [
      "Rules in a version-controlled repository",
      "Documentation for each rule: purpose, data source, ATT&CK mapping, test case and triage guidance",
      "An updated coverage map",
      "A change log of every rule added, tuned or retired",
    ],
  },
  {
    slug: "penetration-testing",
    name: "Penetration testing",
    kind: "offensive",
    summary: "Authorised testing of applications, networks and cloud environments against an agreed scope.",
    offered: true,
    lede: "We test your applications, networks and cloud environments the way an attacker would, inside a written scope and rules of engagement you sign, and report every finding with its evidence and its fix.",
    covers: [
      "Web applications and their APIs",
      "Authentication, authorisation and session handling",
      "Your external network perimeter",
      "Internal networks, from a starting point we agree with you",
      "Cloud environments and their configuration",
      "A retest of the findings you fix",
    ],
    steps: [
      {
        title: "Scope",
        detail: "We agree targets, exclusions, testing windows, permitted techniques and emergency contacts, and confirm who has the authority to approve the test.",
      },
      {
        title: "Authorise",
        detail: "Testing does not start until written authorisation and signed rules of engagement are in place, along with any permission a third-party provider requires.",
      },
      {
        title: "Test",
        detail: "We test only the agreed targets within the agreed windows. Critical findings go to your named contact during testing rather than waiting for the report.",
      },
      {
        title: "Report",
        detail: "You receive a written report with every finding, its evidence and how to fix it.",
      },
      {
        title: "Debrief and retest",
        detail: "We walk your team through the findings, then retest the ones you fix within the agreed window.",
      },
    ],
    deliverables: [
      "An executive summary written for non-specialists",
      "Each finding with its severity, affected asset, evidence, steps to reproduce and remediation guidance",
      "A statement of scope and method, including what was not tested",
      "A debrief call with your team",
      "A retest of fixed findings within the agreed window, with the results in writing",
    ],
  },
  {
    slug: "red-teaming",
    name: "Red teaming",
    kind: "offensive",
    summary: "Objective-based adversary emulation under written rules of engagement, run with your control group.",
    offered: true,
    lede: "A red-team engagement pursues objectives you agree with us, such as reaching a particular system or set of data, to show how far a realistic attacker could get and how well your detection and response hold up. A named control group on your side oversees it and can halt it at any time.",
    covers: [
      "Objectives and scenarios agreed with your control group",
      "Initial access, lateral movement and privilege escalation, using only the techniques the rules of engagement allow",
      "A test of your detection and response, with only the control group told the timing",
      "Regular check-ins with the control group throughout",
      "A replay of the attack path with your defenders afterwards",
    ],
    steps: [
      {
        title: "Name the control group",
        detail: "You name a small control group who know the engagement is running, can answer our questions and can stop it at any point.",
      },
      {
        title: "Agree objectives and rules",
        detail: "We agree objectives, targets, exclusions, permitted and forbidden techniques, testing windows and emergency stop contacts, and record them in signed rules of engagement.",
      },
      {
        title: "Authorise",
        detail: "Nothing starts until written authorisation from someone with the authority to grant it is in place, along with any third-party permissions required.",
      },
      {
        title: "Run the engagement",
        detail: "We work towards the objectives within the rules, keep the control group informed, and stop whenever they ask.",
      },
      {
        title: "Report and replay",
        detail: "We report the attack path in full and replay it with your defenders against what they saw at the time.",
      },
    ],
    deliverables: [
      "A written report with the attack narrative, objectives reached and findings",
      "A timeline of our actions, so your team can match them against your logs",
      "Observations on what your detection and response caught and what it missed",
      "Prioritised recommendations",
      "A debrief with the control group and a replay session with your defenders",
    ],
  },
];

export const serviceSummaries: ServiceSummary[] = services;

export const offeredServices: Service[] = services.filter((service) => service.offered);

export function offeredServicesOfKind(kind: ServiceKind): Service[] {
  return offeredServices.filter((service) => service.kind === kind);
}

export function findOfferedService(slug: string): Service | undefined {
  return offeredServices.find((service) => service.slug === slug);
}
