---
phase: 06-about-and-contact
plan: 02
subsystem: ui
tags: [nextjs, typescript, resend, email, contact-form, route-handler, client-component, honeypot]

# Dependency graph
requires:
  - phase: 06-01
    provides: BUSINESS.email, buildLeadEmail() — imported directly by /api/contact route handler
  - phase: 01-foundation
    provides: BUSINESS constants, design tokens, font setup
  - phase: 02-seo-infrastructure
    provides: generatePageMetadata, JsonLd, breadcrumb schema generator
provides:
  - /contact page with two-column layout, ContactForm client component, contact info card, trust badges
  - ContactForm.tsx client component with useState validation, honeypot, inline success panel
  - /api/contact POST route handler with Resend integration, honeypot check, server-side validation
  - sitemap.ts updated: /contact priority raised to 0.8
affects:
  - 07-final-qa (contact form live testing — Resend API key must be in Vercel env vars before testing)

# Tech tracking
tech-stack:
  added:
    - resend (npm) — transactional email delivery
  patterns:
    - Lazy Resend initialization inside POST handler — defers constructor to runtime so build succeeds without API key
    - Honeypot pattern: hidden _gotcha input (position absolute, left -9999px, opacity 0, tabIndex -1) — silent 200 return on fill
    - Inline success panel replacing form on success — no page redirect, no router.push
    - Client-side validation before fetch (fieldErrors state per field) + server-side mirror validation — defense in depth
    - FormData → individual trim() extractions before JSON.stringify — handles undefined safely

key-files:
  created:
    - src/components/ContactForm.tsx
    - src/app/api/contact/route.ts
    - src/app/contact/page.tsx
  modified:
    - src/app/sitemap.ts
    - package.json

key-decisions:
  - "Lazy Resend init inside POST handler body — module-scope constructor throws during build-time page collection when API key missing"
  - "ContactForm is 'use client' with FormStatus union type — controls button state, error banner, and success panel replacement"
  - "Honeypot returns 200 { success: true } silently — prevents bots from detecting the protection exists"
  - "Server-side validation mirrors client-side rules — ensures correctness even if JS disabled or request forged"
  - "Contact page right column shows hours from BUSINESS constant — single source of truth, not hardcoded strings"

patterns-established:
  - "Route handler guard pattern: check process.env.KEY before initializing SDK, return 500 early if missing"
  - "Form status union ('idle' | 'submitting' | 'success' | 'error') with separate fieldErrors object — standard React form pattern"

# Metrics
duration: 9min
completed: 2026-04-06
---

# Phase 06 Plan 02: Contact Form, Route Handler, and Resend Integration Summary

**ContactForm client component with inline validation + success panel, /api/contact POST handler with lazy Resend init and honeypot, and /contact two-column page with trust badges**

## Performance

- **Duration:** ~9 min
- **Started:** 2026-04-06T02:16:29Z
- **Completed:** 2026-04-06T02:25:30Z
- **Tasks:** 1 of 2 complete (Task 2 is a human-verify checkpoint — awaiting user)
- **Files modified:** 5 (3 created, 2 modified)

## Accomplishments
- Installed `resend` npm package
- Built `ContactForm.tsx` as `'use client'` component: name + phone required validation with per-field errors, honeypot `_gotcha` input, inline green success panel replacing the form on success, error banner on failure, "Sending..." disabled state during submission
- Built `/api/contact` route handler: lazy Resend client init inside POST body (build-safe), honeypot check with silent 200, server-side validation mirroring client rules, `buildLeadEmail()` call, error logging
- Built `/contact` page: dark banner with breadcrumb, two-column desktop layout (form left, contact info right), emergency callout card, 4 trust badge tiles
- Updated sitemap `/contact` priority from 0.6 to 0.8
- `npm run build` clean — all 24 pages plus `/api/contact` dynamic route in output
- `npx tsc --noEmit` passes — zero type errors
- Pushed to `origin master` — Vercel deploy triggered

## Task Commits

1. **Task 1: Install Resend, ContactForm, route handler, contact page** - `1a0e38a` (feat)

**Plan metadata:** (docs commit follows after checkpoint approval)

## Files Created/Modified
- `src/components/ContactForm.tsx` — 'use client' form component, ~280 lines, all field states and success/error UI
- `src/app/api/contact/route.ts` — POST route handler, Resend integration, honeypot + validation guards
- `src/app/contact/page.tsx` — Server Component page shell, two-column layout, contact info card, trust badges
- `src/app/sitemap.ts` — /contact priority updated to 0.8
- `package.json` — resend dependency added

## Decisions Made
- **Lazy Resend init:** `new Resend(process.env.RESEND_API_KEY)` moved inside the POST handler body — Next.js 16 Turbopack evaluates route modules during `Collecting page data` build step, which throws if the constructor receives undefined. Initializing inside the handler defers to request time where the env var is populated.
- **Honeypot silent 200:** Returns `{ success: true }` (not an error) — bots can't detect that the honeypot triggered, reducing adaptive bot attacks.
- **ContactForm imports services inline:** Used hardcoded option strings (Drain Cleaning, Water Heaters, Sewer Line Repair, Emergency Plumbing, Other) rather than importing `services` data array — avoids pulling the full services data module into the client bundle for a simple select dropdown.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Lazy Resend client initialization**
- **Found during:** Task 1 (build verification)
- **Issue:** `const resend = new Resend(process.env.RESEND_API_KEY)` at module scope caused Next.js build to fail with "Missing API key" error during `Collecting page data` step — Resend throws if the key is undefined, and Next.js evaluates route modules at build time
- **Fix:** Moved `new Resend(...)` call inside the POST handler body, after the early return guard that checks `process.env.RESEND_API_KEY`
- **Files modified:** `src/app/api/contact/route.ts`
- **Verification:** `npm run build` succeeds — `/api/contact` appears as `ƒ (Dynamic)` route in output
- **Committed in:** `1a0e38a` (part of Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Required fix — build would not complete without it. No scope change.

## Issues Encountered

None beyond the blocking deviation documented above.

## User Setup Required

Before the contact form can deliver emails in production, Andrew must:

1. **Create a Resend account** at resend.com and generate an API key
2. **Add environment variables** to Vercel project settings:
   - `RESEND_API_KEY` = your Resend API key (starts with `re_`)
   - `RESEND_FROM_EMAIL` = `onboarding@resend.dev` initially; change to `Heartland Plumbing <noreply@heartlandplumbingomaha.com>` after domain verification
3. **Verify domain** in Resend Dashboard → Domains → add heartlandplumbingomaha.com → copy SPF/DKIM DNS records to Namecheap
4. **Redeploy** on Vercel after adding env vars (or trigger a new deploy)

Until RESEND_API_KEY is set, the /api/contact route returns a 500 "Email not configured" error — the form will show an error banner but no email is sent.

## Next Phase Readiness
- Contact form and route handler are code-complete and deployed
- Resend API key and Vercel env var setup required before live email testing
- Phase 07 (Manual QA & Verification) should test: /about page, /contact form validation, form submission success panel, /sitemap.xml for both pages, BreadcrumbList schema on both pages

---
*Phase: 06-about-and-contact*
*Completed: 2026-04-06*
