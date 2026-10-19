import type { Metadata, Viewport } from "next";
import { Mona_Sans, JetBrains_Mono } from "next/font/google";
import { company } from "@/content/company";
import "./globals.css";
import "@/components/brand/brand.css";

const mona = Mona_Sans({
  subsets: ["latin"],
  variable: "--font-mona",
  display: "swap",
  axes: ["wdth"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cynorida.com"),
  title: {
    default: "Cynorida: managed detection and response, run in the open",
    template: "%s · Cynorida",
  },
  description:
    "Cynorida analysts watch your endpoints, identities and cloud accounts 24/7/365, and every step they take appears in a console your team shares with ours.",
  openGraph: {
    title: "Cynorida: managed detection and response, run in the open",
    description:
      "24/7/365 analysts, containment only through playbooks you approve, and a shared console that shows every step.",
    url: "https://cynorida.com",
    siteName: "Cynorida",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0d10",
  colorScheme: "dark",
};

function organizationData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.brandName,
    url: company.siteUrl,
    logo: `${company.siteUrl}/brand/logo-on-light.svg`,
    description: company.description,
    email: company.emails.contact,
    contactPoint: [
      { "@type": "ContactPoint", contactType: "customer support", email: company.emails.contact },
      { "@type": "ContactPoint", contactType: "security", email: company.emails.security },
    ],
  };
}

const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${mona.variable} ${jetbrains.variable}`}>
      <head>
        <meta httpEquiv="Content-Security-Policy" content={contentSecurityPolicy} />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData()).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
