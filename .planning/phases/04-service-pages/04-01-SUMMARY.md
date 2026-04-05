---
phase: 04-service-pages
plan: 01
subsystem: ui
tags: [nextjs, tailwind, ssr, ssg, schema-dts, json-ld, service-pages, emergency-styling]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: Next.js App Router setup, design tokens, font stack, BUSINESS/services data
  - phase: 02-seo-infrastructure
    provides: generatePageMetadata, JsonLd component, schema generators (service, faq-page, breadcrumb)
  - phase: 03-homepage
    provides: ScrollReveal component, page section patterns, homepage service card style

provides:
  - Dynamic [slug] route at src/app/services/[slug]/page.tsx with generateStaticParams for SSG
  - All 4 service pages pre-rendered: drain-cleaning, water-heaters, sewer-line-repair, emergency-plumbing
  - Emergency plumbing page with red-900 banner, 24/7 alert strip, giant tappable phone number
  - Standard service pages with dark banner and teal primary CTAs
  - CSS-only FAQ accordion (details/summary, zero JS) on all 4 pages
  - Service + FAQPage + BreadcrumbList JSON-LD injected per page
  - Related services cross-link cards (homepage card style)
  - Service area pill links to all 8 areas
  - /services index page (prevents 404 on breadcrumb mid-link)
affects:
  - 04-02 (adds FAQ schema, service areas, related links — all already present; 04-02 can build on this)
  - 05-service-areas (area pill links on service pages drive traffic to area pages)
  - 06-contact (estimate CTAs link to /contact from every service page)
  - sitemap (new /services and /services/[slug] routes auto-included by Next.js sitemap)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Next.js 16 async params — always await params in both generateMetadata and page component"
    - "isEmergency = service.slug === 'emergency-plumbing' conditional for one-file emergency styling"
    - "CSS-only FAQ accordion using <details>/<summary> with Tailwind group-open: variant"
    - "Sticky sidebar layout (lg:sticky lg:top-6) for pricing callout on description section"
    - "ServiceData[] relatedServiceData resolved via .map/.filter(Boolean) for type-safe cross-links"

key-files:
  created:
    - src/app/services/[slug]/page.tsx
    - src/app/services/page.tsx
  modified: []

key-decisions:
  - "Emergency styling via isEmergency boolean in single file — no separate component needed"
  - "24/7 alert strip added above banner for emergency page — immediate above-fold urgency"
  - "Giant phone number in red callout box inside banner — can't miss it on burst pipe emergency"
  - "/services index page created (Rule 2) — breadcrumb schema + nav link both reference this URL"
  - "Sticky sidebar at lg breakpoint for pricing callout — desktop users see CTA while reading"
  - "CSS-only <details>/<summary> accordion — zero JS, group-open:rotate-45 on + creates visual X"

patterns-established:
  - "Service page sections order: banner → common problems → description+sidebar → FAQ → related → areas → bottom CTA"
  - "Emergency overrides: bannerBg, ctaBg, accentText, checkColor, bottomStripBg all derived from isEmergency"
  - "Bottom CTA: emergency = giant red phone block; standard = dual button row"

# Metrics
duration: 4min
completed: 2026-04-05
---

# Phase 4 Plan 01: Service Pages — Dynamic Route Summary

**4 SSG service pages from services.ts data with conditional emergency red-900 styling, CSS-only FAQ accordion, JSON-LD schema injection, and related services + area cross-links**

## Performance

- **Duration:** ~4 min
- **Started:** 2026-04-05T23:48:26Z
- **Completed:** 2026-04-05T23:51:48Z
- **Tasks:** 1 (+ 1 auto-fix deviation)
- **Files created:** 2

## Accomplishments

- Dynamic `[slug]` route pre-renders all 4 services at build time via `generateStaticParams`
- Emergency Plumbing page: red-900 banner, above-fold 24/7 alert strip, giant tappable `text-5xl` phone number in dedicated callout box — burst pipe homeowner sees the phone number before anything else
- Standard service pages: dark banner, teal primary CTAs, pricing callout sidebar, 6-section flow
- CSS-only FAQ accordion using `<details>`/`<summary>` — zero JavaScript, `group-open:rotate-45` on `+` icon for visual open/close indicator
- Service schema + FAQPage schema + BreadcrumbList injected on each page via existing `JsonLd` component
- Related services resolved from `relatedServices[]` slugs to full `ServiceData` objects, rendered as homepage-style cards
- `/services` index page prevents breadcrumb URL from 404ing

## Task Commits

1. **Task 1: Dynamic service page route + /services index** - `13dac35` (feat)

**Plan metadata:** _(docs commit follows this summary)_

## Files Created/Modified

- `src/app/services/[slug]/page.tsx` — Dynamic SSG route for all 4 services (exports generateStaticParams, generateMetadata, ServicePage)
- `src/app/services/page.tsx` — Services index page listing all 4 service cards (breadcrumb URL fix)

## Decisions Made

- Emergency styling uses a single `isEmergency` boolean — no separate component. Conditional classes on banner background, CTA colors, accent text, check icons, and bottom strip all derived from this one flag.
- Added an above-banner 24/7 alert strip for emergency page — ensures urgency message is above the fold even on short screens before the banner renders.
- Giant phone number placed in a standalone red callout box inside the banner (not just a button) — homeowner with burst pipe must not miss it.
- Sticky sidebar on the description section (`lg:sticky lg:top-6`) for desktop users — pricing context and CTA stay visible while reading paragraphs.
- Emergency page bottom CTA strip shows giant red phone number at `text-2xl lg:text-3xl` — redundant but critical for emergency conversion.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Created /services index page**

- **Found during:** Task 1 (service page creation)
- **Issue:** Both the breadcrumb schema (`${BUSINESS.url}/services`) and the breadcrumb nav link both reference `/services`. Without a page there, any SEO crawler following breadcrumb links hits a 404, and Google may devalue the breadcrumb structured data.
- **Fix:** Created `src/app/services/page.tsx` — minimal index listing all 4 service cards with a dark banner, breadcrumb nav, and breadcrumb JSON-LD schema.
- **Files modified:** `src/app/services/page.tsx` (new)
- **Verification:** Build output shows `○ /services` as a static route alongside the 4 `[slug]` routes
- **Committed in:** `13dac35` (part of Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 missing critical)
**Impact on plan:** Required for breadcrumb SEO correctness. Minimal scope addition — a simple index listing existing service data.

## Issues Encountered

None — build passed on first attempt, all 4 service routes and the index in build output at `12/12 static pages`.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- All 4 service pages are live and pre-rendered — ready for 04-02 additions (FAQ schema was already added here; 04-02 can confirm or extend)
- `/services` index URL no longer 404s — breadcrumb schema is valid
- Emergency page: phone number is immediately above-fold, tappable, `tel:` href — conversion goal met
- Sitemap will auto-include `/services` and all 4 `/services/[slug]` routes in the next build

---
*Phase: 04-service-pages*
*Completed: 2026-04-05*
