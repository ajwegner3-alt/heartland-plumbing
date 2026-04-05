---
phase: 04-service-pages
plan: 02
subsystem: ui
tags: [nextjs, tailwind, json-ld, schema, faq-accordion, seo, internal-linking, service-pages]

# Dependency graph
requires:
  - phase: 04-01
    provides: Dynamic [slug] route, all 4 service pages SSG, CSS-only FAQ accordion, JSON-LD schemas, related services cards, area pills, /services index page
  - phase: 02-seo-infrastructure
    provides: generatePageMetadata, JsonLd component, schema generators (service, faq-page, breadcrumb)
  - phase: 01-foundation
    provides: Next.js App Router setup, design tokens, services.ts and service-areas.ts data

provides:
  - Verified: CSS-only FAQ accordion (details/summary, zero JS) on all 4 service pages
  - Verified: Service + FAQPage + BreadcrumbList JSON-LD injected per service page
  - Verified: Related services cross-link cards (homepage card style) on all 4 pages
  - Verified: All 8 service area pill links on every service page
  - Verified: /services index page listing all 4 services with dark banner, breadcrumb JSON-LD, correct metadata
  - Verified: npm run build passes with all 5 routes pre-rendered (/, /services, 4x /services/[slug])

affects:
  - 05-service-areas (area pill links on service pages drive traffic to area pages; link pattern established)
  - 06-contact (estimate CTAs link to /contact from every service page)
  - sitemap (/services and /services/[slug] routes auto-included)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "CSS-only FAQ accordion: <details>/<summary> with Tailwind group-open:rotate-45 on + icon — zero JS, no hydration cost"
    - "Three JSON-LD schemas per service page: Service + FAQPage + BreadcrumbList injected at JSX root"
    - "RelatedServiceData resolved from string slugs via .map/.filter(Boolean) — type-safe cross-links"
    - "Area pills: Link to /service-areas/[slug] with location SVG pin icon — uniform across all service pages"

key-files:
  created: []
  modified:
    - src/app/services/[slug]/page.tsx
    - src/app/services/page.tsx

key-decisions:
  - "04-01 pre-built all 04-02 scope — Wave 2 plan was verification-only; no code changes required"
  - "FAQ uses <details>/<summary> not JS toggle state — zero client bundle cost, works without hydration"
  - "Three schema blocks injected at JSX root (before banner) — renders first in HTML, crawler-visible immediately"
  - "/services index prevents breadcrumb 404 and provides useful navigation page for users and crawlers"

patterns-established:
  - "Wave pattern: Wave 1 plans may fully complete Wave 2 scope — always read existing files before writing"
  - "Schema injection order: JsonLd blocks first in JSX return, before any visible content"

# Metrics
duration: 3min
completed: 2026-04-05
---

# Phase 4 Plan 02: Service Pages Wave 2 — FAQ, Schemas, Cross-Links Summary

**All 04-02 requirements pre-built by 04-01: CSS-only FAQ accordion, 3 JSON-LD schemas per page, related services cards, 8 area pills, and /services index — verified passing build with all 5 routes SSG**

## Performance

- **Duration:** ~3 min
- **Started:** 2026-04-05T23:54:52Z
- **Completed:** 2026-04-05T23:57:30Z
- **Tasks:** 2 (verification only — no code changes required)
- **Files modified:** 0

## Accomplishments

- Verified CSS-only FAQ accordion on all 4 service pages — `<details>`/`<summary>` with `group-open:rotate-45` on `+` icon, zero JavaScript
- Verified 3 JSON-LD schemas injected per service page: Service schema, FAQPage schema, BreadcrumbList (Home > Services > [Service])
- Verified related services render as 2-3 cards with icon, title, short description, "Learn More ->" link
- Verified all 8 service area cities render as pill links pointing to `/service-areas/[slug]`
- Verified `/services` index page with dark banner, BreadcrumbList schema, 4 service cards, correct metadata
- `npm run build` passes cleanly: 12/12 static pages including `/services` + 4 `/services/[slug]` routes

## Task Commits

No new commits required — all code was committed in 04-01:

1. **Task 1+2 (04-01): Dynamic service page route + /services index** - `13dac35` (feat)
2. **Plan 04-01 metadata** - `0fdf196` (docs)

**Plan metadata (04-02):** _(docs commit follows this summary)_

## Files Created/Modified

No files created or modified in this plan execution. All required code was present from 04-01:

- `src/app/services/[slug]/page.tsx` — Contains FAQ accordion, 3 JSON-LD schemas, related services cards, area pills (committed in 04-01)
- `src/app/services/page.tsx` — Contains services index with dark banner, breadcrumb schema, 4 service cards (committed in 04-01)

## Decisions Made

- 04-01 pre-built the complete 04-02 scope within a single execution — Wave 2 became verification-only
- No architectural changes required

## Deviations from Plan

None — plan executed exactly as intended. All required artifacts were already present and correct from 04-01. Build verified all 5 routes pre-render successfully.

## Issues Encountered

None — build passed on first attempt with all 5 routes in build output.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- All 4 service pages complete with full SEO, conversion, and schema requirements
- `/services` index URL is valid — breadcrumb schema resolves correctly
- Service area pill links are in place — Phase 5 (service area pages) has incoming traffic ready
- Emergency page: red styling, 24/7 alert strip, giant phone CTA — conversion-optimized
- Sitemap will auto-include `/services` and all 4 `/services/[slug]` routes on next build

---
*Phase: 04-service-pages*
*Completed: 2026-04-05*
