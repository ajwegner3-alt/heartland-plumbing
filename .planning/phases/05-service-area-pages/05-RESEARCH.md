# Phase 5: Service Area Pages - Research

**Researched:** 2026-04-05
**Domain:** Next.js dynamic routing, local SEO schema, service area page patterns
**Confidence:** HIGH — research is almost entirely codebase-based, not library speculation

---

## Summary

Phase 5 is structurally near-identical to Phase 4 (service pages). The same dynamic `[slug]` pattern, the same `generateStaticParams` + `generateMetadata` wiring, the same `JsonLd` + `ScrollReveal` component usage. The data source (`service-areas.ts`) already exists and is fully populated with genuinely unique content per city — nothing needs to be written.

The key differences from Phase 4 are:
1. **Different data shape.** `AreaData` has `neighborhoods[]`, `localContext[]`, and `areaFacts[]` instead of service-specific fields like `faqs`, `pricingRange`, and `commonProblems`. There is no per-area FAQ data in the current data file.
2. **Different schema type.** Service pages use `Service` schema. Area pages should use a `LocalBusiness`-derived schema with `areaServed` scoped to the specific city, not a `Service` schema.
3. **"We Also Serve" cross-links.** Service pages link to area pill tags. Area pages need to link to the other 7 area pages — different direction of cross-linking.
4. **An index page at `/service-areas`.** The breadcrumb path `Home → Service Areas → [City]` requires this index route to exist. Same pattern as `/services/page.tsx`.

The sitemap (`sitemap.ts`) already imports `areas` and generates `/service-areas/[slug]` entries — these URLs must be live or the sitemap references 404s.

**Primary recommendation:** Mirror the Phase 4 file structure exactly. Create `src/app/service-areas/[slug]/page.tsx` and `src/app/service-areas/page.tsx`. Add a new schema generator `src/lib/schema/service-area.ts` for the city-scoped `LocalBusiness` schema.

---

## Standard Stack

No new dependencies required. All tools are already installed and in use from Phase 4.

### Core (already in project)
| Tool | Purpose | Phase 4 Reference |
|------|---------|-------------------|
| Next.js App Router dynamic segments | `[slug]` route generation | `src/app/services/[slug]/page.tsx` |
| `generateStaticParams()` | Pre-render all 8 area slugs at build time | Same as services |
| `generateMetadata()` async | Per-page title/description/OG/Twitter | Same as services |
| `generatePageMetadata()` helper | Canonical, OG, Twitter wrapper | `src/lib/metadata.ts` |
| `generateBreadcrumbSchema()` | BreadcrumbList JSON-LD | `src/lib/schema/breadcrumb.ts` |
| `JsonLd` component | Injects JSON-LD into `<head>` | `src/components/JsonLd.tsx` |
| `ScrollReveal` component | Scroll-triggered fade-in | `src/components/ScrollReveal.tsx` |
| `areas` + `AreaData` from `service-areas.ts` | All area content | `src/lib/data/service-areas.ts` |
| `services` from `services.ts` | 4-card services grid | `src/lib/data/services.ts` |
| `BUSINESS` from `business.ts` | Phone, license, rating | `src/lib/data/business.ts` |

### New file to create (no new npm packages)
| File | Purpose |
|------|---------|
| `src/lib/schema/service-area.ts` | City-scoped `LocalBusiness` schema generator |
| `src/app/service-areas/[slug]/page.tsx` | Dynamic area page |
| `src/app/service-areas/page.tsx` | Index page (breadcrumb + /service-areas route) |

---

## Architecture Patterns

### Recommended File Structure
```
src/
├── app/
│   └── service-areas/
│       ├── page.tsx                  # Index: lists all 8 areas
│       └── [slug]/
│           └── page.tsx              # Dynamic area page
├── lib/
│   ├── data/
│   │   └── service-areas.ts          # Already exists, no changes needed
│   └── schema/
│       └── service-area.ts           # NEW: city-scoped LocalBusiness schema
```

### Pattern 1: Dynamic Route Wiring (mirror Phase 4 exactly)

```typescript
// src/app/service-areas/[slug]/page.tsx

// Static generation: pre-render all 8 area slugs at build time
export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }))
}

// Per-page metadata from service-areas.ts data
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const area = areas.find((a) => a.slug === slug)
  if (!area) return {}
  return generatePageMetadata({
    title: area.metaTitle,
    description: area.metaDescription,
    path: `/service-areas/${area.slug}`,
  })
}

// Main page component
export default async function ServiceAreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const area = areas.find((a) => a.slug === slug)
  if (!area) notFound()
  // ... render
}
```

**Source:** Direct mirror of `src/app/services/[slug]/page.tsx` — HIGH confidence.

### Pattern 2: City-Scoped LocalBusiness Schema

The existing `generateServiceSchema` produces a `Service` type. For area pages, the right schema type is `LocalBusiness` (specifically `Plumber`) with `areaServed` narrowed to the specific city.

```typescript
// src/lib/schema/service-area.ts
import type { WithContext, LocalBusiness } from 'schema-dts'
import type { AreaData } from '@/lib/data/service-areas'
import { BUSINESS } from '@/lib/data/business'

export function generateServiceAreaSchema(area: AreaData): WithContext<LocalBusiness> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Plumber',
    name: BUSINESS.name,
    url: `${BUSINESS.url}/service-areas/${area.slug}`,
    telephone: BUSINESS.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.state,
      postalCode: BUSINESS.address.zip,
      addressCountry: BUSINESS.address.country,
    },
    areaServed: {
      '@type': 'City',
      name: area.city,
      containedInPlace: {
        '@type': 'State',
        name: 'Nebraska',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(BUSINESS.rating.value),
      reviewCount: String(BUSINESS.rating.count),
      bestRating: String(BUSINESS.rating.best),
    },
  } as unknown as WithContext<LocalBusiness>
}
```

**Source:** Based on existing `generateLocalBusinessSchema()` in `src/lib/schema/local-business.ts` — adapted pattern, HIGH confidence.

### Pattern 3: Breadcrumb Schema (3-level, not 2-level)

Service pages use a 2-level breadcrumb: `Home → Services → [Service Name]`.
Area pages need 3-level: `Home → Service Areas → [City Name]`.

```typescript
<JsonLd
  data={generateBreadcrumbSchema([
    { name: 'Home', url: BUSINESS.url },
    { name: 'Service Areas', url: `${BUSINESS.url}/service-areas` },
    { name: `Plumber in ${area.city}, NE`, url: `${BUSINESS.url}/service-areas/${area.slug}` },
  ])}
/>
```

The `/service-areas` index page must exist for this breadcrumb URL to resolve. The `generateBreadcrumbSchema` function already handles variable-length item arrays — no changes needed.

### Pattern 4: Neighborhood Pills (existing pill pattern from service pages)

Service pages already render area pills at the bottom of each page:
```tsx
// From services/[slug]/page.tsx
<Link
  href={`/service-areas/${area.slug}`}
  className="inline-flex items-center gap-1.5 border border-border rounded-full px-4 py-2 text-sm font-semibold text-text-secondary hover:border-primary hover:text-primary transition-colors"
>
  {area.city}
</Link>
```

Neighborhood pills on area pages should use the same visual style — `rounded-full`, `border border-border`, `px-4 py-2`. Neighborhoods are display-only (no links), so remove the `<Link>` wrapper.

### Pattern 5: 4-Card Services Grid

The CONTEXT.md specifies a "4-card grid matching the homepage services grid style." The services page and service detail pages both already implement this grid. The homepage pattern from `services/page.tsx`:

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
  {services.map((service) => (
    <Link href={`/services/${service.slug}`} className="group flex flex-col gap-4 bg-white border border-border rounded-lg p-8 hover:border-primary hover:shadow-card transition-all">
      ...
    </Link>
  ))}
</div>
```

The SERVICE_ICONS map is duplicated across `services/page.tsx` and `services/[slug]/page.tsx`. Consider extracting it — but that's optional refactoring. For now, duplicate the icon map in the area page as Phase 4 did.

### Pattern 6: "We Also Serve" Cross-Links

The other 7 areas (filtering out current) rendered as pill links to `/service-areas/[slug]`:

```tsx
const otherAreas = areas.filter((a) => a.slug !== area.slug)
// Render as pill links identical to neighborhood pills but with <Link>
```

### Anti-Patterns to Avoid

- **Do not use `export const metadata`** (static export) — area pages need `async generateMetadata()` because slug is dynamic, same as service pages.
- **Do not skip `generateStaticParams`** — without it, Next.js won't pre-render the routes at build time. The sitemap already lists these URLs; they must exist as static pages.
- **Do not put area content inline** — all content comes from `service-areas.ts`. No hardcoded city-specific strings.
- **Do not create a new schema type** for area pages — reuse the `Plumber` type from `schema-dts`, same as the existing `generateLocalBusinessSchema`.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| JSON-LD injection | Custom script tags | `<JsonLd>` component | Already exists, handles hydration correctly |
| Canonical/OG/Twitter meta | Manual `<Head>` tags | `generatePageMetadata()` | Already abstracts all three, consistent across site |
| Scroll animations | Custom IntersectionObserver | `<ScrollReveal>` | Already exists, consistent with service pages |
| Breadcrumb schema | Inline schema object | `generateBreadcrumbSchema()` | Already exists in `src/lib/schema/breadcrumb.ts` |

---

## Common Pitfalls

### Pitfall 1: Missing /service-areas Index Route
**What goes wrong:** Breadcrumb link `Home → Service Areas` points to `/service-areas` which returns 404 if the index page doesn't exist. The sitemap also doesn't currently include `/service-areas` as a standalone URL (it only lists individual area slugs).
**Why it happens:** Phase 4 created `/services/page.tsx` (the index) alongside `/services/[slug]/page.tsx`. Phase 5 must do the same.
**How to avoid:** Create `src/app/service-areas/page.tsx` as part of this phase. It should list all 8 areas in a card grid, similar to `services/page.tsx`.
**Warning signs:** Breadcrumb second level is a dead link; Google Search Console reports `/service-areas` as a 404.

### Pitfall 2: Slugs with Hyphens (La Vista = "la-vista")
**What goes wrong:** `areas.find(a => a.slug === slug)` fails or routes don't match for hyphenated slugs.
**Why it happens:** Next.js handles hyphens in dynamic segments correctly — the slug `la-vista` is passed as-is. But any hardcoded string comparisons must match exactly.
**How to avoid:** Always use `area.slug` from the data array as the source of truth. Never construct slugs manually by transforming `area.city`.
**Warning signs:** La Vista page returns 404 while Omaha and Bellevue work fine.

### Pitfall 3: SERVICE_ICONS Map Duplication
**What goes wrong:** Icon map is copy-pasted into the area page but not maintained alongside `services/page.tsx` and `services/[slug]/page.tsx` when new services are added.
**Why it happens:** Phase 4 already duplicated the map. It's a known shortcut.
**How to avoid:** Accept the duplication for now (it's noted in the design). If desired, extract to `src/lib/data/service-icons.tsx` — but this is optional refactoring outside the phase scope.
**Warning signs:** Adding a new service causes icon rendering to break on area pages.

### Pitfall 4: localContext[] Paragraphs vs areaFacts[] Bullets
**What goes wrong:** Treating `localContext[]` and `areaFacts[]` as interchangeable content.
**Why it happens:** Both are string arrays, but they serve different purposes.
**How to avoid:**
- `localContext[]` = multi-sentence paragraphs (3 items per area) — render as `<p>` tags in the main description section
- `areaFacts[]` = short factual bullets (5 items per area) — render in the highlighted callout box
**Warning signs:** Content reads as bullet points of run-on paragraphs or vice versa.

### Pitfall 5: Sitemap Already Expects These Routes
**What goes wrong:** The sitemap is already listing `/service-areas/[slug]` URLs. Until Phase 5 ships, these are 404s in production. This is pre-existing — not a Phase 5 mistake — but it means Phase 5 has urgency: it closes existing 404s.
**How to avoid:** No special handling needed. Completing Phase 5 resolves the issue. Just don't delay.

---

## Code Examples

### Complete generateStaticParams + generateMetadata wiring
```typescript
// Source: mirror of src/app/services/[slug]/page.tsx
export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const area = areas.find((a) => a.slug === slug)
  if (!area) return {}
  return generatePageMetadata({
    title: area.metaTitle,
    description: area.metaDescription,
    path: `/service-areas/${area.slug}`,
  })
}
```

### AreaData interface (already defined in service-areas.ts)
```typescript
export interface AreaData {
  city: string           // "La Vista"
  slug: string           // "la-vista"
  neighborhoods: string[] // ["Harrison Hills", "Central Park Plaza", ...]
  localContext: string[] // 3 multi-sentence paragraphs
  areaFacts: string[]   // 5 short factual bullet points
  metaTitle: string      // "Plumber in La Vista, NE | Heartland Plumbing Co."
  metaDescription: string // 150-char description
}
```

### Neighborhood Pills (display only, no link)
```tsx
<div className="flex flex-wrap gap-2.5">
  {area.neighborhoods.map((hood) => (
    <span
      key={hood}
      className="inline-flex items-center border border-border rounded-full px-4 py-2 text-sm font-semibold text-text-secondary"
    >
      {hood}
    </span>
  ))}
</div>
```

### "We Also Serve" cross-links
```tsx
const otherAreas = areas.filter((a) => a.slug !== area.slug)

<div className="flex flex-wrap gap-2.5">
  {otherAreas.map((other) => (
    <Link
      key={other.slug}
      href={`/service-areas/${other.slug}`}
      className="inline-flex items-center gap-1.5 border border-border rounded-full px-4 py-2 text-sm font-semibold text-text-secondary hover:border-primary hover:text-primary transition-colors"
    >
      {other.city}
    </Link>
  ))}
</div>
```

---

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|------------------|--------|
| `getStaticPaths` + `getStaticProps` | `generateStaticParams` + async page component | Already using current Next.js App Router approach |
| `export const metadata` (static) | `async generateMetadata()` (dynamic) | Dynamic per slug — must use async form |

---

## Open Questions

1. **Mini FAQ per area — include or skip?**
   - What we know: `AreaData` has no `faqs` field. `areaFacts[]` has 5 bullet points per area but they are not in Q&A format.
   - What's unclear: Could convert areaFacts to implied Q&A, but this would be fabricated content.
   - Recommendation: Skip FAQ accordion on area pages. Use `areaFacts[]` as a callout box instead. No FAQPage schema needed for area pages.

2. **/service-areas index page — what content?**
   - What we know: Needs to exist for breadcrumb. Should list all 8 areas.
   - Recommendation: Create a simple grid of 8 area cards (city name, 1-sentence teaser from localContext[0] truncated, link to detail page). Mirror the `/services` index structure. No new data needed.

3. **Should `/service-areas` be added to the sitemap?**
   - Current sitemap includes individual area slugs but not the index itself.
   - Recommendation: Add `${BASE}/service-areas` to sitemap in `sitemap.ts` with priority 0.6, same as `/services`. This is a one-line addition.

---

## Sources

### Primary (HIGH confidence)
- `src/app/services/[slug]/page.tsx` — Direct implementation reference, inspected in full
- `src/lib/data/service-areas.ts` — Complete AreaData schema and all 8 city entries, inspected in full
- `src/lib/schema/local-business.ts` — LocalBusiness schema pattern to adapt for area pages
- `src/lib/schema/breadcrumb.ts` — BreadcrumbList generator, inspected in full
- `src/lib/metadata.ts` — generatePageMetadata helper, inspected in full
- `src/app/sitemap.ts` — Confirmed area URLs already in sitemap (closing pre-existing 404s)
- `src/app/services/page.tsx` — Index page pattern to mirror for /service-areas

### Secondary (MEDIUM confidence)
- CONTEXT.md decisions — user-confirmed choices from discuss-phase session

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — everything is already in the codebase, inspected directly
- Architecture: HIGH — direct mirror of Phase 4 with documented differences
- Pitfalls: HIGH — identified from actual code analysis (sitemap 404s, slug format, data shape)
- Schema approach: MEDIUM — following existing local-business.ts pattern; not verified against schema.org spec directly

**Research date:** 2026-04-05
**Valid until:** Stable until service-areas.ts data or schema files change
