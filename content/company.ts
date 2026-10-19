export type Post = {
  date: string;
  title: string;
  summary: string;
  href: string;
};

export type Certification = {
  name: string;
  verifyHref: string;
};

export type Tester = {
  name: string;
  role: string;
  certifications: Certification[];
  profileHref: string | null;
};

export type Company = {
  brandName: string;
  domain: string;
  siteUrl: string;
  description: string;
  emails: {
    contact: string;
    security: string;
    privacy: string;
  };
  editions: Post[];
  testers: Tester[];
  contentUpdated: string;
  legalUpdated: string;
};

export const company: Company = {
  brandName: "Cynorida",
  domain: "cynorida.com",
  siteUrl: "https://cynorida.com",
  description:
    "Cynorida is a cybersecurity company. We protect, test and investigate the systems our clients run, through managed detection and response, incident response, threat hunting, penetration testing and red teaming.",
  emails: {
    contact: "contact@cynorida.com",
    security: "security@cynorida.com",
    privacy: "privacy@cynorida.com",
  },
  editions: [],
  testers: [],
  contentUpdated: "2026-10-19",
  legalUpdated: "2026-10-19",
};
