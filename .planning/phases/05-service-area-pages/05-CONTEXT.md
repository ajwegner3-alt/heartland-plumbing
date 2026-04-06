# Phase 5: Service Area Pages - Context

**Gathered:** 2025-04-05
**Status:** Ready for planning

<domain>
## Phase Boundary

Eight service area pages via dynamic [slug] route: Omaha, Bellevue, Papillion, La Vista, Ralston, Elkhorn, Gretna, Bennington. Each with genuinely unique local content (from service-areas.ts), neighborhoods display, all 4 services cross-linked, other area pages linked, and schema markup. No new content writing needed — data files already have unique localContext per city.

</domain>

<decisions>
## Implementation Decisions

### Page Structure & Layout
- Same structure as service pages: banner → content → services → CTA — consistent feel across the site
- Banner shows city name + tagline ("Plumber in Bellevue, NE" with brief area-serving tagline)
- Neighborhoods displayed as pill/tag elements in a horizontal wrap — scannable

### Content Differentiation
- Trust existing content in service-areas.ts — use localContext[] and areaFacts[] as-is, don't rewrite
- Area-specific plumbing facts displayed as a highlighted callout box (hard water, aging pipes, etc.)
- H1 format: service-focused — "Plumber in [City], NE" — targets primary search keyword

### Services Cross-Link Display
- "Our Services in [City]" as a 4-card grid matching the homepage services grid style — consistent visual language
- "We Also Serve" section linking to the other 7 area pages — yes, include cross-area links
- Both sections use the same card/pill patterns established in Phase 4 service pages

### Claude's Discretion
- Section order within area pages
- Whether to include a mini FAQ per area or skip (data file has areaFacts but no area-specific FAQs)
- Callout box styling for area facts
- /service-areas index page (like /services index created in Phase 4)

</decisions>

<specifics>
## Specific Ideas

- All area content is in src/lib/data/service-areas.ts — each area has city, slug, neighborhoods[], localContext[], areaFacts[], metaTitle, metaDescription
- The service pages (Phase 4) already link to /service-areas/[slug] via area pill links — these pages must exist to avoid 404s
- Use generatePageMetadata() for per-page metadata
- BreadcrumbList schema should include Home → Service Areas → [City]
- Consider creating /service-areas index page (like /services) to support breadcrumb navigation

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 05-service-area-pages*
*Context gathered: 2025-04-05*
