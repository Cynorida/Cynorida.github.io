import { mailtoWithSubject } from "@/components/policy/wording";
import { company } from "@/content/company";

export const projectHref = mailtoWithSubject(company.emails.contact, "Project enquiry");
export const incidentHref = mailtoWithSubject(company.emails.security, "Active incident");
export const partnershipHref = mailtoWithSubject(company.emails.contact, "Partnership");
export const subscribeHref = mailtoWithSubject(company.emails.contact, "Subscribe to the newsletter");
