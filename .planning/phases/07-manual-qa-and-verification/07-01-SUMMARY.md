---
phase: 07-manual-qa-and-verification
plan: 01
subsystem: ui
tags: [lighthouse, wcag, accessibility, color-contrast, next.js, tailwind]

requires:
  - phase: 06-about-and-contact
    provides: completed site with all pages built and pushed to master

provides:
  - WCAG 2.1 AA color contrast compliance across all pages
  - lighthouse-results.md with full code-level audit documenting projected 95+ scores
  - All accessibility, SEO, and best-practices checks documented

affects: [07-02, final-qa-approval]

tech-stack:
  added: []
  patterns:
    - "Color contrast verification: darken colors until all foreground/background pairs pass 4.5:1 (normal text) or 3:1 (large text)"

key-files:
  created:
    - .planning/phases/07-manual-qa-and-verification/lighthouse-results.md
  modified:
    - src/app/globals.css

key-decisions:
  - "Shift copper color scale darker (base #b8733a → #8f5a2c) so white-on-copper buttons AND small copper text both pass WCAG AA"
  - "Darken text-muted (#6e847b → #596e67) — used in xs/sm label text, previously failed 4.5:1 on white (was 4.00)"
  - "copper-light repurposed as the old copper value (#b8733a) for dark-background-only use where 4.41:1 passes 3:1 large text"
  - "Lighthouse audit conducted as code-level static analysis (Lighthouse CLI unavailable, Vercel not yet connected)"

patterns-established:
  - "Pattern: WCAG contrast audit via node.js script before live Lighthouse run — catches failures without browser dependency"

duration: 14min
completed: 2026-04-06
---

# Phase 07 Plan 01: Lighthouse Audit & Accessibility Fixes Summary

**WCAG AA color contrast fixed across all 24 pages: text-muted darkened to 5.45:1, copper scale shifted to 5.73:1 — full code audit documented in lighthouse-results.md**

## Performance

- **Duration:** ~14 min
- **Started:** 2026-04-06T03:10:56Z
- **Completed:** 2026-04-06T03:25:00Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- Identified and fixed 2 WCAG AA color contrast violations (`text-muted` 4.00→5.45, `copper` 3.78→5.73 on white)
- Performed full structural accessibility audit: 45 aria-label usages verified, all SVGs aria-hidden or labelled, form labels confirmed, heading hierarchy H1→H2→H3 verified
- Documented complete SEO checklist: 24 unique titles/descriptions, canonical tags, 5 schema types, sitemap, robots, OG/Twitter meta
- Confirmed zero console.log statements, all target="_blank" have rel="noopener noreferrer", no raw img tags
- Confirmed SSG build (24/24 pages) succeeds cleanly after all fixes

## Task Commits

1. **Task 1: Audit + color contrast fix** - `3d19441` (fix)
2. **Task 2: Final status update + push** - `63dea87` (fix)

## Files Created/Modified

- `src/app/globals.css` - Copper scale darkened, text-muted darkened for WCAG AA compliance
- `.planning/phases/07-manual-qa-and-verification/lighthouse-results.md` - Full code audit with WCAG math, contrast table, accessibility checklist, SEO checklist, best practices checklist

## Decisions Made

- Used code-level static audit (node.js contrast math + code inspection) instead of live Lighthouse CLI, which was unavailable. Vercel CLI also not authenticated. Per the plan's fallback guidance, this approach was applied after one failed CLI attempt.
- Chose to shift the entire copper scale darker rather than add a separate semantic color: keeps the design system simple (3 copper tones, all accessible), avoids introducing new class names.
- Set `copper-light` to the old copper `#b8733a` value — it's only used on dark backgrounds (`primary-light` pattern in Footer) where the 4.41:1 ratio passes the 3:1 large-text WCAG threshold.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed text-muted color contrast failure (WCAG AA)**
- **Found during:** Task 1 (code audit)
- **Issue:** `--color-text-muted: #6e847b` produced 4.00:1 on white and 3.72:1 on off-white — below the 4.5:1 WCAG AA requirement for normal text. Used in xs/sm label text (optional labels, testimonial city names, trust badge subtitles, footer column headers, form micro-copy).
- **Fix:** Darkened to `#596e67` — new ratios 5.45:1 on white, 5.07:1 on off-white
- **Files modified:** src/app/globals.css
- **Verification:** node.js contrast calculator confirmed PASS
- **Committed in:** 3d19441

**2. [Rule 1 - Bug] Fixed copper color contrast failure (WCAG AA)**
- **Found during:** Task 1 (code audit)
- **Issue:** `--color-copper: #b8733a` produced 3.78:1 on white — below 4.5:1 threshold. Affected: required asterisk (*) in form labels, error messages (ContactForm + hero form), emergency callout links.
- **Fix:** Shifted copper scale: base `#b8733a → #8f5a2c`, dark `#8f5a2c → #7a4a22`, light `#d4914e → #b8733a` (old base, dark-bg use only)
- **Files modified:** src/app/globals.css
- **Verification:** New base 5.73:1 on white (PASS), white-on-copper buttons 5.73:1 (PASS), copper-dark hover 7.42:1 (PASS)
- **Committed in:** 3d19441

---

**Total deviations:** 2 auto-fixed (both Rule 1 - Bug)
**Impact on plan:** Both fixes required for WCAG compliance. No scope creep. Color shifts are visually subtle (slightly darker warm brown).

## Issues Encountered

- Vercel CLI not installed, not authenticated. Lighthouse CLI not available. Per plan fallback guidance, conducted code-level audit instead of live browser test. Live confirmation via `npx lighthouse` should be run by Andrew once Vercel is connected.
- `vercel ls` command not found — Vercel URL unknown without dashboard access. Projected scores documented as ranges with high confidence based on static analysis.

## User Setup Required

Andrew must complete these steps before live Lighthouse scores can be confirmed:

1. **Connect GitHub to Vercel** — Vercel Dashboard → Import Project → select `ajwegner3-alt/heartland-plumbing`
2. **Add env vars** in Vercel Dashboard → Project → Settings → Environment Variables:
   - `RESEND_API_KEY` — from resend.com/api-keys
   - `RESEND_FROM_EMAIL` — `onboarding@resend.dev` initially
3. **Verify domain** — heartlandplumbingomaha.com domain verification in Resend dashboard (SPF/DKIM)
4. **Run live Lighthouse:**
   ```bash
   npx lighthouse https://heartlandplumbingomaha.com --output html --output-path ./lighthouse-report.html --chrome-flags="--headless --no-sandbox"
   ```

## Next Phase Readiness

- All code-level audit criteria met: zero console.log, zero a11y structural violations, full SEO metadata, WCAG AA contrast
- Phase 07 Plan 02 (manual human verification) is the next step — Andrew visits the live URL and verifies visuals, form, mobile
- **Blocker:** Vercel must be connected (manual dashboard action) before live testing begins
- Color changes (slightly darker copper and muted text) are safe to review visually — contrast is now compliant while maintaining the brand aesthetic

---
*Phase: 07-manual-qa-and-verification*
*Completed: 2026-04-06*
