export type Address = {
  street: string;
  locality: string;
  region?: string;
  postalCode: string;
  country: string;
};

export type ProfileLink = {
  label: string;
  href: string;
};

export type Person = {
  name: string;
  role: string;
  bio: string;
  profiles: ProfileLink[];
  isSecurityContact?: boolean;
};

export type Certification = {
  name: string;
  issuer: string;
  heldBy: string;
  verifyHref?: string;
};

export type EvidenceItem = {
  title: string;
  detail: string;
  href: string;
  date: string;
};

export type NewsItem = {
  date: string;
  title: string;
  summary: string;
  href: string;
};

export type Company = {
  brandName: string;
  domain: string;
  siteUrl: string;
  description: string;
  legalName: string | null;
  registrationNumber: string | null;
  registrationAuthority: string | null;
  registryUrl: string | null;
  vatNumber: string | null;
  registeredAddress: Address | null;
  headquarters: string | null;
  founded: string | null;
  emails: {
    contact: string;
    security: string;
    privacy: string;
  };
  incidentPhone: string | null;
  profiles: {
    linkedin: string | null;
    github: string | null;
  };
  sectors: string[];
  team: Person[];
  certifications: Certification[];
  evidence: {
    cves: EvidenceItem[];
    advisories: EvidenceItem[];
    talks: EvidenceItem[];
    research: EvidenceItem[];
    tools: EvidenceItem[];
  };
  news: NewsItem[];
  disclosure: {
    acknowledgeBusinessDays: number;
    triageBusinessDays: number;
    preferredLanguages: string[];
    pgpKeyUrl: string | null;
    reviewedOn: string;
  };
  hostingProvider: string | null;
  legalUpdated: string;
};

export const company: Company = {
  brandName: "Cynorida",
  domain: "cynorida.com",
  siteUrl: "https://cynorida.com",
  description:
    "Cynorida is a cybersecurity company. We run managed detection and response, incident response and authorised offensive security testing for organisations that want to see every step of the work.",
  legalName: null,
  registrationNumber: null,
  registrationAuthority: null,
  registryUrl: null,
  vatNumber: null,
  registeredAddress: null,
  headquarters: null,
  founded: null,
  emails: {
    contact: "contact@cynorida.com",
    security: "security@cynorida.com",
    privacy: "privacy@cynorida.com",
  },
  incidentPhone: null,
  profiles: {
    linkedin: null,
    github: null,
  },
  sectors: [],
  team: [],
  certifications: [],
  evidence: {
    cves: [],
    advisories: [],
    talks: [],
    research: [],
    tools: [],
  },
  news: [],
  disclosure: {
    acknowledgeBusinessDays: 3,
    triageBusinessDays: 10,
    preferredLanguages: ["en"],
    pgpKeyUrl: null,
    reviewedOn: "2026-10-17",
  },
  hostingProvider: null,
  legalUpdated: "2026-10-17",
};

export function formatAddress(address: Address) {
  return [address.street, address.locality, address.region, address.postalCode, address.country]
    .filter(Boolean)
    .join(", ");
}

export function legalEntityName() {
  return company.legalName ?? company.brandName;
}

export function evidenceCount() {
  const { cves, advisories, talks, research, tools } = company.evidence;
  return cves.length + advisories.length + talks.length + research.length + tools.length;
}

export function securityTxtExpiry() {
  const reviewed = new Date(`${company.disclosure.reviewedOn}T00:00:00Z`);
  reviewed.setUTCDate(reviewed.getUTCDate() + 364);
  return reviewed;
}
