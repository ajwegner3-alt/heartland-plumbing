---
phase: 02-seo-infrastructure
plan: 01
subsystem: seo
tags: [schema-dts, json-ld, schema-org, structured-data, local-business, typescript]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: services.ts and service-areas.ts data with ServiceData/AreaData types consumed by schema generators
provides:
  - src/lib/data/business.ts — BUSINESS constant as single source of truth for all business metadata
  - src/lib/schema/local-business.ts — generateLocalBusinessSchema() returning typed Plumber WithContext<LocalBusiness>
  - src/lib/schema/service.ts — generateServiceSchema(service) returning typed WithContext<Service> with pricing
  - src/lib/schema/faq-page.ts — generateFAQPageSchema(faqs) accepting {q,a}[] shape from services.ts
  - src/lib/schema/breadcrumb.ts — generateBreadcrumbSchema(items) with BreadcrumbItem interface
  - src/lib/schema/aggregate-rating.ts — generateAggregateRatingSchema() standalone for review contexts
  - src/components/JsonLd.tsx — plain <script> Server Component for JSON-LD injection
affects: [03-homepage, 04-service-pages, 05-area-pages, 06-contact-about, 07-sitemap-og]

# Tech tracking
tech-stack:
  added: [schema-dts@^2.0.0]
  patterns:
    - "Typed JSON-LD generators: pure functions returning WithContext<T> from schema-dts"
    - "Single business data source: BUSINESS constant imported by all schema generators"
    - "RSC-safe JSON-LD injection: plain <script dangerouslySetInnerHTML> not next/Script"

key-files:
  created:
    - src/lib/data/business.ts
    - src/lib/schema/local-business.ts
    - src/lib/schema/service.ts
    - src/lib/schema/faq-page.ts
    - src/lib/schema/breadcrumb.ts
    - src/lib/schema/aggregate-rating.ts
    - src/components/JsonLd.tsx
  modified:
    - package.json
    - package-lock.json

key-decisions:
  - "Use plain <script dangerouslySetInnerHTML> for JSON-LD — next/Script causes RSC payload duplication"
  - "Plumber @type (not generic LocalBusiness) for more specific schema classification"
  - "as unknown as WithContext<T> casting for nested schema objects schema-dts types as strict unions"
  - "Saturday hours 14:00 (2 PM close) matching Mon-Fri 7-6, Sat 8-2 business data"

patterns-established:
  - "Schema pattern: import BUSINESS from data layer, never hardcode business metadata in generators"
  - "JsonLd pattern: <JsonLd data={generateXxxSchema(...)} /> call in page body for structured data"
  - "BreadcrumbItem interface exported from breadcrumb.ts for typed callers in Phases 3-6"

# Metrics
duration: 2min
completed: 2026-04-05
---

# Phase 2 Plan 01: Schema Generators Summary

**Typed JSON-LD schema generators for LocalBusiness (Plumber), Service, FAQPage, BreadcrumbList, and AggregateRating using schema-dts, backed by a centralized BUSINESS constants file**

## Performance

- **Duration:** 2 min
- **Started:** 2026-04-05T21:58:42Z
- **Completed:** 2026-04-05T22:00:34Z
- **Tasks:** 2
- **Files modified:** 9

## Accomplishments

- Created `src/lib/data/business.ts` as single source of truth for all Heartland Plumbing business metadata (address, phone, hours, geo, rating, license, social links, areas served)
- Built 5 typed schema generator functions in `src/lib/schema/` consuming BUSINESS and ServiceData without duplicating constants
- Created `JsonLd.tsx` Server Component using plain `<script dangerouslySetInnerHTML>` per research recommendation to avoid RSC payload duplication from next/Script

## Task Commits

Each task was committed atomically:

1. **Task 1: Create business.ts constants and install schema-dts** - `432639b` (feat)
2. **Task 2: Create schema generators and JsonLd component** - `514d388` (feat)

**Plan metadata:** (docs commit follows this summary)

## Files Created/Modified

- `src/lib/data/business.ts` — BUSINESS constant with all metadata fields, BusinessData and BusinessHours interfaces
- `src/lib/schema/local-business.ts` — generateLocalBusinessSchema() returning Plumber-typed WithContext<LocalBusiness>
- `src/lib/schema/service.ts` — generateServiceSchema(service: ServiceData) with provider, areaServed, and priceSpecification
- `src/lib/schema/faq-page.ts` — generateFAQPageSchema(faqs: {q,a}[]) mapping to Question/Answer pairs
- `src/lib/schema/breadcrumb.ts` — generateBreadcrumbSchema(items: BreadcrumbItem[]) with 1-indexed positions
- `src/lib/schema/aggregate-rating.ts` — generateAggregateRatingSchema() standalone (4.9 stars, 312 reviews)
- `src/components/JsonLd.tsx` — plain Server Component, no 'use client' directive
- `package.json` / `package-lock.json` — schema-dts added to dependencies

## Decisions Made

- Used `as unknown as WithContext<T>` casting pattern for nested schema objects (openingHoursSpecification dayOfWeek array, areaServed array, offers nesting) because schema-dts uses strict union types that don't accept plain arrays where the spec allows them — the JSON-LD output is correct for Google regardless of TypeScript narrowing
- Used `'@type': 'Plumber'` (more specific LocalBusiness subtype) rather than generic `'@type': 'LocalBusiness'` for better schema.org classification
- Saturday hours set to 14:00 (2 PM close) matching the business context "Mon-Fri 7-6, Sat 8-2"
- Address set to `4521 S 84th St` per context (plan specified this address, not the research doc's placeholder `4821 S 72nd Street`)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - TypeScript type assertions for schema-dts were anticipated by the research (Pitfall 5) and applied as documented. `npm run build` and `npx tsc --noEmit` both passed with zero errors.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All 5 schema generators ready for immediate use in Phases 3-6 content pages
- JsonLd component ready for `<JsonLd data={generateXxxSchema(...)} />` pattern in page bodies
- BUSINESS constant ready for use in layout components, header phone numbers, and footer metadata
- No blockers — build passes, types compile, all generators importable

---
*Phase: 02-seo-infrastructure*
*Completed: 2026-04-05*
