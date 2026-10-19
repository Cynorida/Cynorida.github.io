---
name: Cynorida
visual_target: Linear (base, light, type) with Stripe (signature gradient, product UI, bento density)
colors:
  ink-0: oklch(0.135 0.008 255)
  ink-1: oklch(0.158 0.009 255)
  ink-2: oklch(0.188 0.010 255)
  ink-3: oklch(0.222 0.011 255)
  ink-4: oklch(0.268 0.012 255)
  text-1: oklch(0.970 0.004 255)
  text-2: oklch(0.790 0.010 255)
  text-3: oklch(0.660 0.012 255)
  ember: oklch(0.760 0.165 55)
  gold: oklch(0.870 0.135 88)
  rose: oklch(0.680 0.195 20)
  tide: oklch(0.560 0.100 215)
  ok: oklch(0.790 0.140 158)
  high: oklch(0.720 0.180 32)
  medium: oklch(0.850 0.130 88)
  info: oklch(0.770 0.090 235)
type:
  display: Mona Sans (variable, OFL) 500, tracking -0.032em
  text: Mona Sans 400/500
  mono: JetBrains Mono 400/500
  scale_px: [12, 13, 14, 16, 18, 20, 24, 32, 44, 52, 68]
radius: { control: 8px, panel: 10px, window: 14px }
container: 1240px content, gutter clamp(20px, 4vw, 64px)
motion: { ease-out: cubic-bezier(0.23, 1, 0.32, 1), fast: 140ms, base: 220ms, slow: 280ms, entrance: 900ms one-time }
---

# Cynorida design decisions

## Brief (website_anti_ai_look.txt §4)

- **Audience:** heads of IT and security leads at companies of roughly 200 to 5,000 people who have an EDR and an identity provider but no 24/7 team. They worry about paying for a black box: alerts disappear into a vendor SOC and come back as a PDF.
- **We replace / compete with:** traditional MDR and MSSP vendors, and the option of hiring an in-house night shift.
- **Differentiator (one sentence):** every step a Cynorida analyst takes is visible to the client, live, in a console both teams share.
- **Adjectives:** exact, calm, open.
- **References outside the category:** Linear (restraint, lit product UI), Stripe (engineered gradient, dense real product surfaces), Vercel (hairline grid discipline).
- **Aesthetic direction:** technical-IDE, dark.
- **Real assets available:** the Cynorida logo (shield, keyhole, orbit, wordmark), supplied by the client and traced to SVG in `public/brand/` (source raster in `docs/brand/logo-source.webp`). Every product visual is built in HTML/CSS with synthetic data, labelled as illustrative. No logos, testimonials or metrics are used.

## Visual target decisions (deliberate, reason "visual target")

| Element | Decision | Reason |
| --- | --- | --- |
| Dark tinted base (C6) | `ink-1` blue-tinted near-black, never #000; body text `text-2` at about 9:1 | visual target: Linear; security buyers expect a console-like surface |
| One signature gradient (C3) | WebGL "signal field": slow domain-warped bands of ember, gold, rose and tide, behind the hero console and in the closing band only | visual target: Stripe; engineered asset, not a CSS one-liner |
| Product UI (I3) | One flat, straight-on console window, full container width, with the process tree and analyst note inside it. No tilt, no floating cards: the client asked for a calmer hero | visual target: Linear |
| Soft directional glow (C4) | One ember light under the hero console and one top light per window; no blobs elsewhere | visual target: Linear product lighting |
| Two-tone headings | Bright first clause, muted continuation in the same size | visual target: Stripe |
| Bento (L4) | One dominant tile, four supporting tiles, each a real UI fragment | visual target: Stripe; hierarchy kept |

## Typography

- First instincts rejected: Inter (Linear uses it; T1 default tell), Geist (K4), Space Grotesk (T2).
- Chosen: **Mona Sans** variable (GitHub, OFL) for display and text. It has the crisp, slightly squared grotesk feel of Söhne/Inter Display and a width axis. **JetBrains Mono** for console data, timestamps, rules.
- Display 68px / 0.98 line-height / weight 500 / -0.032em. Section heads 44-52px. Body 16-18px / 1.55. Display to body ratio > 4x.
- Tabular numerals in every timestamp and count.

## Color

- Dominant hue: ink (cool, hue 255). Action color: **ember** (`oklch(0.76 0.165 55)`) used only for the primary button, focus ring, and the hero console's live indicator. Text on ember is `ink-0` (contrast about 9:1).
- Severity colors (`high`, `medium`, `ok`, `info`) are data colors only, never buttons.
- No purple/indigo anywhere (C1), no gradient text (C2), no cyan neon (C7).

## Shape and depth

- Radius: 8px controls, 10px panels, 14px windows.
- Elevation language: **hairline borders plus light**. Depth scale: `depth-1` (inset top highlight + 1px border), `depth-2` (panel lift), `depth-3` (window shadow for the hero console), plus the signal-field glow sitting behind the top edge of the hero console like a horizon.

## Layout

- Signature primitive: **split head** (two-line heading left, lede right on the same baseline) followed by a product surface that runs the full container width.
- No page rails, seams or section divider lines: sections are separated by space alone (client request).
- Header 64px, sticky, opaque `ink-1` at 92% with a hairline; `scroll-padding-top` set.

## Motion

- One orchestrated moment: hero entrance (headline, copy, then console panels settle into place over 900ms, ease-out).
- Signal field animates slowly, starts after first paint, pauses offscreen and on hidden tabs, freezes on `prefers-reduced-motion`.
- UI transitions 140-280ms, `cubic-bezier(0.23, 1, 0.32, 1)`, transform and opacity only, `scale(0.97)` on press.

## Voice

- Plain, specific, calm. No W1 vocabulary. Numbers and named things over adjectives.
- Hero concrete facts: analysts on shift 24/7/365; containment only through actions the client pre-approves; telemetry from the EDR and identity provider the client already runs.

## Homepage section plan

| Visitor question | Section | Proof used | Visual anchor |
| --- | --- | --- | --- |
| What is this, for whom, why, what next? | Hero | service facts (to confirm) | layered incident console |
| Will it work with what we run? | Telemetry strip | integration names (to confirm) | mono wordmark row |
| What do I actually get? | Platform bento | none needed | Sigma/KQL rule tabs, sign-in trail, CloudTrail feed, playbook toggles, report card |
| How does an incident play out? | Incident walkthrough | synthetic incident, labelled | interactive timeline + evidence panel |
| What do I show my board and auditor? | Monthly report | ATT&CK tactic list (public) | stacked report pages with coverage grid |
| What are the catches? | Questions | none | accordion |
| Next step | Closing band | none | signal field |

## Deviations log

- Dark-only theme. website_design.txt §7 suggests offering dark as an option; the visual target and the console-like product justify dark as the single theme. Contrast verified in that theme.
- Customer proof (logos, testimonials, case studies) is omitted rather than invented (website_anti_ai_look.txt W5).

## TODO(proof)

- Confirm the service facts used in copy: 24/7/365 analyst coverage, pre-approved containment playbooks, supported telemetry sources, contact address `hello@cynorida.com`, emergency line.
- Customer logos, quotes and case studies with consent.
- Certifications actually held (SOC 2, ISO 27001) for a trust strip.
- Real product screenshots, if a console exists, to replace the HTML recreations.
