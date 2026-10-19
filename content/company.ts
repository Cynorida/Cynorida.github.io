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
  posts: Post[];
  editions: Post[];
  testers: Tester[];
  legalUpdated: string;
};

export const company: Company = {
  brandName: "Cynorida",
  domain: "cynorida.com",
  siteUrl: "https://cynorida.com",
  description:
    "Cynorida is a cybersecurity company. We run managed detection and response, incident response and authorised offensive security testing for organisations that want to see every step of the work.",
  emails: {
    contact: "contact@cynorida.com",
    security: "security@cynorida.com",
    privacy: "privacy@cynorida.com",
  },
  posts: [],
  editions: [],
  testers: [],
  legalUpdated: "2026-10-19",
};
