---
phase: 05-service-area-pages
plan: 01
subsystem: ui
tags: [nextjs, seo, schema-dts, local-seo, service-area-pages, static-generation]

# Dependency graph
requires:
  - phase: 04-service-pages
    provides: dynamic [slug] route pattern, JsonLd/ScrollReveal components, service data, areas data
  - phase: 02-seo-infrastructure
    provides: generatePageMetadata, generateBreadcrumbSchema, JsonLd component
provides:
  - All 8 service area pages pre-rendered at build time via generateStaticParams
  - /service-areas index page listing all 8 cities with card grid
  - City-scoped Plumber LocalBusiness schema generator (generateServiceAreaSchema)
  - BreadcrumbList schema on each area page (3-level) and index (2-level)
  - /service-areas index URL added to sitemap
  - /services index URL added to sitemap (was missing)
affects: [06-contact-form, 07-final-qa]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - generateStaticParams for pre-rendering all 8 area slugs
    - City-scoped LocalBusiness schema with areaServed narrowed to specific city
    - 3-level breadcrumb schema for nested route (Home > Service Areas > City)
    - neighborhoods as display-only pills; otherAreas as pill links
    - areaFacts[] as highlighted callout box inside description section

key-files:
  created:
    - src/lib/schema/service-area.ts
    - src/app/service-areas/[slug]/page.tsx
    - src/app/service-areas/page.tsx
  modified:
    - src/app/sitemap.ts

key-decisions:
  - "Service icon map duplicated in area page (known shortcut, accepted — same pattern as service pages)"
  - "localContext[] rendered as <p> paragraphs; areaFacts[] rendered as checkmark bullet callout box"
  - "No FAQ section on area pages (no FAQ data in AreaData interface)"
  - "No emergency variant on area pages (all use standard primary/teal styling)"
  - "/services and /service-areas index URLs both added to sitemap (services was also missing)"
  - "otherAreas computed with areas.filter(a => a.slug !== area.slug) — simple, correct for all 8"

patterns-established:
  - "Area page structure: banner → neighborhoods → localContext+facts → services grid → We Also Serve → bottom CTA"
  - "Neighborhood pills: border border-border rounded-full, display only (no link)"
  - "We Also Serve links: same pill style with MapPinIcon and hover:border-primary"
  - "Area facts callout: bg-primary/5 border border-primary/20 rounded-lg p-6 with check icons"

# Metrics
duration: ~3min
completed: 2026-04-06
---

# Phase 5 Plan 01: Service Area Pages Summary

**8 city-specific plumber pages with local content, neighborhood pills, area facts callout, 4-service grid, cross-area links, and city-scoped Plumber schema — all pre-rendered via generateStaticParams**

## Performance

- **Duration:** ~3 min
- **Started:** 2026-04-06T00:34:00Z
- **Completed:** 2026-04-06T00:36:31Z
- **Tasks:** 2
- **Files created/modified:** 4

## Accomplishments

- All 8 area pages pre-render at build time with unique H1, title tag, and meta description per city
- City-scoped Plumber LocalBusiness schema on each area page with `areaServed` narrowed to the specific city
- `/service-areas` index page with 3-column card grid linking to all 8 areas
- Sitemap updated with both `/services` and `/service-areas` index entries (closes pre-existing 404s)
- `la-vista` hyphenated slug verified to generate correctly at build time

## Task Commits

1. **Task 1: Schema generator and dynamic area page** - `bb8ad3f` (feat)
2. **Task 2: Index page and sitemap update** - `cf90ea0` (feat)

## Files Created/Modified

- `src/lib/schema/service-area.ts` - generateServiceAreaSchema() returning city-scoped Plumber LocalBusiness schema
- `src/app/service-areas/[slug]/page.tsx` - Dynamic area page with all 8 sections, generateStaticParams, generateMetadata
- `src/app/service-areas/page.tsx` - /service-areas index with card grid and breadcrumb schema
- `src/app/sitemap.ts` - Added /services and /service-areas index URL entries

## Decisions Made

- `SERVICE_ICONS` map duplicated in area page (same shortcut as Phase 4 — no extraction to shared file, acceptable for now)
- `/services` index was also missing from sitemap — added it alongside `/service-areas` as a one-line fix
- No FAQ accordion on area pages: `AreaData` has no `faqs` field; `areaFacts[]` used as a callout box instead
- All area pages use standard `bg-dark` / `bg-primary` styling — no emergency variant needed
- `otherAreas = areas.filter(a => a.slug !== area.slug)` — computed inline, no separate data structure needed

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Added /services to sitemap**
- **Found during:** Task 2 (sitemap update)
- **Issue:** Plan specified adding `/service-areas` index to sitemap, but `/services` index was also missing — both were 404 sitemap references
- **Fix:** Added both `/services` and `/service-areas` entries at priority 0.6 in sitemap.ts
- **Files modified:** src/app/sitemap.ts
- **Verification:** Build succeeded; sitemap.xml route in build output
- **Committed in:** cf90ea0 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 missing critical)
**Impact on plan:** Minor additive fix. Corrects pre-existing sitemap omission for /services index.

## Issues Encountered

None — plan executed cleanly. All build outputs verified.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All 8 service area pages live at /service-areas/[slug] — no more sitemap 404s
- /service-areas index resolves breadcrumb navigation Home > Service Areas correctly
- Cross-links from service pages to area pages and area pages to each other are all live
- Phase 6 (contact form) can proceed immediately — no blockers from this phase

---
*Phase: 05-service-area-pages*
*Completed: 2026-04-06*
