---
phase: 06-about-and-contact
plan: 01
subsystem: ui
tags: [nextjs, typescript, email, html-template, server-component, schema-org]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: BUSINESS constants, design tokens, font setup
  - phase: 02-seo-infrastructure
    provides: generatePageMetadata, JsonLd, breadcrumb schema generator, local-business schema generator
  - phase: 03-homepage
    provides: ScrollReveal component, page section patterns, styling conventions
provides:
  - BUSINESS.email field (info@heartlandplumbingomaha.com) — used by Plan 02 contact route handler
  - buildLeadEmail() function in src/lib/email/lead-notification.ts — used by Plan 02 contact route handler
  - /about route with company story, owner spotlight, credentials badge grid, bottom CTA
affects:
  - 06-02 (contact form route handler imports BUSINESS.email and buildLeadEmail)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - XSS-safe HTML email template via escapeHtml() helper — replaces &, <, >, " before interpolation
    - Inline styles only in email templates — Tailwind not supported by email clients
    - yearsInBusiness computed dynamically (new Date().getFullYear() - BUSINESS.yearsFounded) — auto-updates annually
    - Initial-avatar pattern — colored circle + first-letter for owner card with no external image dependency

key-files:
  created:
    - src/lib/email/lead-notification.ts
    - src/app/about/page.tsx
  modified:
    - src/lib/data/business.ts

key-decisions:
  - "BUSINESS.email: 'info@heartlandplumbingomaha.com' added to both interface and constant — Plan 02 imports from here, never hardcodes"
  - "buildLeadEmail uses plain HTML string with inline styles — no React Email dependency needed for a single lead notification"
  - "escapeHtml() wraps ALL user-supplied fields before HTML interpolation — XSS prevention without a sanitization library"
  - "Table-layout email: conditional message block renders only when data.message is non-empty"
  - "About page is pure Server Component — no 'use client', no useState, zero client JS cost"
  - "Owner avatar: teal circle with 'M' initial — no external image load, no Unsplash dependency"

patterns-established:
  - "Email template pattern: LeadData interface + escapeHtml() helper + buildLeadEmail() returning string — reusable for future notification emails"
  - "About page section order: dark banner → story + sidebar → owner card → credential badges → dark CTA — matches service/area page banner pattern"

# Metrics
duration: 7min
completed: 2026-04-06
---

# Phase 06 Plan 01: About Page and Email Infrastructure Summary

**About page with company narrative, owner spotlight, and credential badge cards; BUSINESS.email and buildLeadEmail() ready for Plan 02 contact route handler**

## Performance

- **Duration:** ~7 min
- **Started:** 2026-04-06T02:11:49Z
- **Completed:** 2026-04-06T02:18:51Z
- **Tasks:** 2
- **Files modified:** 3 (1 modified, 2 created)

## Accomplishments
- Added `email` field to BusinessData interface and BUSINESS constant — single source of truth for contact destination
- Built `buildLeadEmail()` with XSS-safe `escapeHtml()` helper, branded teal header, table layout, conditional message section, and click-to-call phone link
- Built `/about` page as Server Component with 5 sections: dark banner + breadcrumb, company story (3 paragraphs) with quick-facts sidebar, owner spotlight card (Mike Richardson), 4 credential badge cards (license, insurance, BBB, years), bottom CTA with phone + /contact link
- All section headings use dynamic `yearsInBusiness` computation — auto-updates annually
- BreadcrumbList and LocalBusiness JSON-LD schemas included
- Build passes clean, /about route appears in Next.js output

## Task Commits

Each task was committed atomically:

1. **Task 1: Add BUSINESS.email and buildLeadEmail template** - `1350885` (feat)
2. **Task 2: Build About page** - `f68adb9` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified
- `src/lib/data/business.ts` — Added `email: string` to BusinessData interface and `email: 'info@heartlandplumbingomaha.com'` to BUSINESS constant
- `src/lib/email/lead-notification.ts` — LeadData interface, escapeHtml() helper, buildLeadEmail() returning branded HTML string
- `src/app/about/page.tsx` — Full About page: metadata, schemas, 5 sections, pure Server Component

## Decisions Made
- BUSINESS.email added to both the TypeScript interface and the constant so Plan 02 can `import { BUSINESS }` and use `BUSINESS.email` as the send-to address — keeps destination centralized
- Plain HTML string chosen for email template over React Email — single notification type doesn't justify the dependency; inline styles required for email client compatibility
- escapeHtml() wraps ALL user fields before interpolation — covers name, phone, service, zip, message; cheap 4-replace helper, no library needed
- About page is pure Server Component — all content is static, zero client JS cost appropriate for a 5-section informational page
- Owner avatar uses teal circle with initial "M" — avoids any external image dependency for the owner spotlight card

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None for this plan. Plan 02 requires Resend API key and Vercel environment variable setup (documented in 06-02-SUMMARY.md).

## Next Phase Readiness
- BUSINESS.email and buildLeadEmail() are ready for import by the Plan 02 contact route handler
- /about is live and deployed (pushed to master → triggers Vercel deploy)
- Plan 02 can proceed immediately: install resend, build ContactForm client component, build /api/contact route handler, build /contact page

---
*Phase: 06-about-and-contact*
*Completed: 2026-04-06*
