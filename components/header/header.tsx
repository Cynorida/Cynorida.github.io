"use client";

import { useEffect, useState } from "react";
import { Wordmark } from "@/components/brand/mark";
import { incidentHref } from "@/components/page/contact-links";
import { company } from "@/content/company";
import "./header.css";

const links = [
  { href: "/services/", label: "Services" },
  { href: "/how-we-engage/", label: "How we engage" },
  { href: "/team/", label: "Team" },
  { href: "/blog/", label: "Blog" },
  { href: "/newsletter/", label: "Newsletter" },
  { href: "/partnership/", label: "Partnership" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <header className={`header${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <div className="container header__bar">
        <a href="/" className="header__home" aria-label="Cynorida home">
          <Wordmark />
        </a>

        <nav className="header__nav" aria-label="Main">
          <ul className="header__links">
            {links.map((link) => (
              <li key={link.href}>
                <a className="header__link" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <a className="header__alert" href={incidentHref}>
            <span className="header__alert-dot" aria-hidden="true" />
            Under attack?
          </a>
          <a className="header__link header__signin" href={`mailto:${company.emails.contact}`}>
            Contact
          </a>
          <a className="button button--primary header__cta" href="/#start">
            Start a project
          </a>
          <button
            type="button"
            className="header__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="visually-hidden">{open ? "Close menu" : "Open menu"}</span>
            <span className="header__toggle-line" aria-hidden="true" />
            <span className="header__toggle-line" aria-hidden="true" />
          </button>
        </div>
      </div>

      <nav id="mobile-menu" className="header__sheet" aria-label="Mobile" hidden={!open}>
        <ul className="container header__sheet-list">
          {links.map((link) => (
            <li key={link.href}>
              <a className="header__sheet-link" href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a className="header__sheet-link" href={`mailto:${company.emails.contact}`} onClick={() => setOpen(false)}>
              Contact
            </a>
          </li>
          <li>
            <a className="header__sheet-link header__sheet-link--alert" href={incidentHref}>
              Under attack? Get help now
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
