# Phase 4: Service Pages - Context

**Gathered:** 2025-04-05
**Status:** Ready for planning

<domain>
## Phase Boundary

Four dedicated service pages generated from the services.ts data file via a dynamic [slug] route: Drain Cleaning, Water Heaters, Sewer Line Repair, Emergency Plumbing. Each with unique content, CSS-only FAQ accordion, Service + FAQPage schema, and cross-links to related services and all area pages. The Emergency Plumbing page has distinct urgency treatment.

</domain>

<decisions>
## Implementation Decisions

### Page Layout Structure
- Full-width stacked sections (not sidebar layout) — matches homepage pattern
- Pricing ranges displayed inline in content paragraphs, not as a separate callout box
- Page hero/banner style and section order: Claude's discretion

### Emergency Page Differentiation
- Red/urgent accent color for the Emergency Plumbing page banner and CTA — signals urgency
- Giant phone number at top of page — can't miss it, this is the #1 action
- "24/7 Emergency Service" as a prominent badge/banner callout at the top — not just in content

### Cross-Link Section Design
- "We Serve These Areas": pill/tag-shaped links for all 8 cities in a horizontal wrap — compact, scannable
- "Related Services": 2-3 service cards matching the homepage services grid style
- Section placement order: Claude's discretion

### FAQ Accordion Styling
- Clean bordered rows — each question as a bordered row with toggle icon, professional and minimal
- Plus/minus icon as the expand/collapse indicator (+ collapsed, - expanded)
- All FAQs collapsed by default — user clicks to expand
- CSS-only using details/summary elements (zero JavaScript) — per requirements CONV-08

### Claude's Discretion
- Service page hero/banner style (compact banner vs mini hero)
- Section order within each service page
- Cross-link section placement in the page flow
- Whether emergency page uses a completely different banner component or conditional styling on the shared template

</decisions>

<specifics>
## Specific Ideas

- All service content is already in src/lib/data/services.ts — each service has description[], commonProblems[], pricingRange, faqs[], relatedServices[], metaTitle, metaDescription
- Schema generators for Service and FAQPage already exist in src/lib/schema/
- Use generatePageMetadata() from src/lib/metadata.ts for per-page metadata
- The emergency page should feel genuinely different — a homeowner with a burst pipe needs to see the phone number instantly, not read about the service first

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-service-pages*
*Context gathered: 2025-04-05*
