# Phase 2: SEO Infrastructure - Context

**Gathered:** 2025-04-05
**Status:** Ready for planning

<domain>
## Phase Boundary

Centralized TypeScript schema generators (LocalBusiness, Service, FAQPage, BreadcrumbList, AggregateRating), metadata API patterns via generateMetadata(), sitemap.xml generation, robots.txt, OG image assets, and internal linking data structures. All built before any content pages exist so pages in Phases 3-6 can consume them.

</domain>

<decisions>
## Implementation Decisions

### OG Image Strategy
- Logo + brand colors: clean branded card with teal background, logo, company name, phone number
- Number of images and format (static vs dynamic): Claude's discretion — pick the best ROI approach for a portfolio demo

### Schema Detail Level
- LocalBusiness: full detail — all fields from the hero HTML (address, phone, hours, rating, area served, price range, social links, geo coords)
- AggregateRating: aggregate only — just ratingValue (4.9) and reviewCount (312), no individual Review objects
- Service schema: full with pricing — service name, description, area served, provider, price range per service

### Internal Linking Pattern
- Service → Area: every service page lists all 8 area pages in a dedicated section ("We Serve These Areas" grid)
- Area → Service: every area page lists all 4 services in a dedicated section ("Our Services" grid)
- Link placement: dedicated cross-link sections at bottom of content pages, not inline-only
- Maximum internal linking strategy — every content page connects to all related pages

### Sitemap & Indexing
- All 15 content pages indexed (index, follow on all)
- noindex only on utility pages (thank-you page after form submission)
- Priority weighting: homepage 1.0, service pages 0.8, area pages 0.7, about/contact 0.6
- changefreq: monthly for most pages, weekly for homepage
- robots.txt: allow all crawlers, reference sitemap.xml

### Claude's Discretion
- OG image count: one shared vs per-page-type vs per-page unique — Claude picks best ROI
- OG image format: static PNG vs Next.js ImageResponse API — Claude picks simplest approach
- Schema generator architecture: how to organize lib/schema/ files
- BreadcrumbList depth and naming conventions

</decisions>

<specifics>
## Specific Ideas

- The hero HTML already has complete LocalBusiness and FAQPage schema as JSON-LD — port the data structure faithfully to TypeScript generators
- Business data is already in the data files (services.ts, service-areas.ts) — schema generators should consume these, not duplicate content
- Internal link arrays can reference the data files' slug arrays rather than hardcoding paths

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-seo-infrastructure*
*Context gathered: 2025-04-05*
