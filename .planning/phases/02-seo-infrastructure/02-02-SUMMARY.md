---
phase: 02-seo-infrastructure
plan: "02"
subsystem: seo
tags: [next.js, sitemap, robots.txt, open-graph, metadata, typescript, sharp]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: services.ts and service-areas.ts data files with slug arrays consumed by sitemap.ts
  - phase: 02-seo-infrastructure
    plan: "01"
    provides: schema generators in lib/schema/ that pair with this plan's metadata helper
provides:
  - Native sitemap.xml with 15 URLs at weighted priorities (1.0/0.8/0.7/0.6)
  - Native robots.txt allowing all crawlers with sitemap reference
  - Branded 1200x630 OG image auto-detected by Next.js in app/ directory
  - generatePageMetadata() helper for consistent canonical, OG, twitter, and robots metadata
affects:
  - 03-homepage
  - 04-service-pages
  - 05-area-pages
  - 06-contact-form

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Native MetadataRoute.Sitemap / MetadataRoute.Robots — no next-sitemap package
    - 'as const' on changeFrequency in .map() callbacks to avoid TS literal widening
    - Static opengraph-image.png in app/ (not public/) for Next.js auto-detection
    - generatePageMetadata() centralizes all per-page SEO boilerplate into one function call
    - sharp used via inline node -e script to generate OG PNG at build time (not a build step)

key-files:
  created:
    - src/app/sitemap.ts
    - src/app/robots.ts
    - src/app/opengraph-image.png
    - src/app/opengraph-image.alt.txt
    - src/lib/metadata.ts
  modified: []

key-decisions:
  - "Native MetadataRoute.Sitemap used — no next-sitemap package (redundant for App Router)"
  - "OG image placed in app/ not public/ — Next.js auto-detection requires app/ placement"
  - "generatePageMetadata() accepts relative path; metadataBase in layout.tsx resolves to full URL"
  - "sharp used to generate branded PNG programmatically via node -e inline script"

patterns-established:
  - "Pattern: Every content page calls generatePageMetadata({ title, description, path }) in its generateMetadata export"
  - "Pattern: changeFrequency values use 'as const' in .map() callbacks to prevent TypeScript literal widening"
  - "Pattern: OG image referenced as '/opengraph-image.png' in openGraph.images — resolves via metadataBase"

# Metrics
duration: 2min
completed: 2026-04-05
---

# Phase 2 Plan 02: SEO Infrastructure — Sitemap, Robots, OG Image, Metadata Helper Summary

**Native sitemap.xml (15 URLs, priority-weighted), robots.txt, branded 1200x630 OG image auto-detected by Next.js, and generatePageMetadata() helper for zero-boilerplate per-page SEO**

## Performance

- **Duration:** ~2 min
- **Started:** 2026-04-05T21:58:57Z
- **Completed:** 2026-04-05T22:00:41Z
- **Tasks:** 2
- **Files modified:** 5 created

## Accomplishments

- sitemap.ts generates 15 URLs at correct priorities using data files' slug arrays — homepage 1.0, 4 services 0.8, 8 areas 0.7, about/contact 0.6
- robots.ts allows all crawlers and references the live sitemap.xml URL
- opengraph-image.png: 1200x630 branded teal card (83KB) with company name, phone, rating, and service area — generated via sharp and placed in app/ for Next.js auto-detection
- generatePageMetadata() consolidates canonical, OG, twitter, and robots into one function call — pages in Phases 3-6 pass title/description/path only

## Task Commits

Each task was committed atomically:

1. **Task 1: Create sitemap.ts and robots.ts** - `9de5d78` (feat)
2. **Task 2: Create OG image and metadata helper** - `fe1af64` (feat)

## Files Created/Modified

- `src/app/sitemap.ts` — MetadataRoute.Sitemap with all 15 indexed pages, imports services and areas data files
- `src/app/robots.ts` — MetadataRoute.Robots, allows all, references sitemap.xml
- `src/app/opengraph-image.png` — 1200x630 branded PNG, teal background, auto-detected by Next.js
- `src/app/opengraph-image.alt.txt` — Accessibility alt text for OG image
- `src/lib/metadata.ts` — generatePageMetadata() helper exporting complete Metadata objects

## Decisions Made

- **Native sitemap/robots only:** No next-sitemap package installed. MetadataRoute types are first-party, zero deps, and confirmed working via build output showing `/sitemap.xml` and `/robots.txt` as static routes.
- **OG image in app/ not public/:** Following Pitfall 3 from research — public/ placement is served but not auto-detected for meta tag injection. Build confirmed `/opengraph-image.png` as a static route (meaning Next.js picked it up).
- **Relative paths in generatePageMetadata:** `alternates.canonical` takes the relative path like `/services/drain-cleaning`; `metadataBase` in layout.tsx resolves to the full URL automatically.
- **'as const' on changeFrequency:** Applied in all .map() callbacks to prevent TypeScript widening string literals to `string` type (Pitfall 4 from research).

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

- Stale `.next` build lock after first successful build required clearing before second build. Resolved with `rm -f .next/build-manifest.json .next/BUILD_ID` before rerunning.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- Sitemap, robots, and OG image are live infrastructure ready for search engines on first deploy
- `generatePageMetadata()` is the single function all content pages (Phases 3-6) will call in their `generateMetadata` exports — no metadata boilerplate duplication
- Phase 3 (homepage) and Phases 4-5 (service/area pages) should import `generatePageMetadata` from `@/lib/metadata` and pass the page's metaTitle, metaDescription, and canonical path
- No blockers for Phase 3

---

*Phase: 02-seo-infrastructure*
*Completed: 2026-04-05*
