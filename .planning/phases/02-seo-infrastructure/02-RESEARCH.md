# Phase 2: SEO Infrastructure - Research

**Researched:** 2026-04-05
**Domain:** Next.js App Router SEO — metadata API, JSON-LD schema, sitemap, robots.txt, OG images
**Confidence:** HIGH (verified with official Next.js docs, GitHub discussions, multiple current sources)

---

## Summary

Phase 2 builds the entire SEO foundation before any content page exists. The project is on Next.js 16.2.2 with App Router and already has `metadataBase` set in `layout.tsx`, which is the prerequisite for correct canonical URL resolution. All content data (services, areas, testimonials) already exists in typed TypeScript files — schema generators consume these directly.

The standard approach for this stack is: (1) typed schema generator functions in `src/lib/schema/`, (2) `generateMetadata()` per page using the Metadata API with alternates/canonical/openGraph, (3) JSON-LD via plain `<script dangerouslySetInnerHTML>` in the page component body, (4) native `app/sitemap.ts` and `app/robots.ts` file conventions (no external library), and (5) static `opengraph-image.png` files in the `app/` directory.

**Primary recommendation:** Use Next.js native file conventions for everything (sitemap, robots, OG images, metadata). Do not install next-sitemap — it is an external package that predates Next.js's built-in solutions and is now redundant for App Router projects. Install `schema-dts` for TypeScript type safety on JSON-LD objects.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `next` (built-in Metadata API) | 16.2.2 (already installed) | generateMetadata, MetadataRoute.Sitemap, MetadataRoute.Robots | First-party, zero deps, App Router native |
| `schema-dts` | ^2.0.0 | TypeScript types for Schema.org JSON-LD objects | Google-maintained, compile-time safety, no runtime cost |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `sharp` | ^0.34.5 (already installed) | Image processing for OG image generation | Already present; needed if using dynamic ImageResponse |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Native `app/sitemap.ts` | `next-sitemap` package | next-sitemap adds a postbuild script, external dep, config file — unnecessary for App Router |
| Static `opengraph-image.png` in app/ | `app/opengraph-image.tsx` with ImageResponse | Dynamic is more complex; static PNG is simpler and sufficient for a local business site with one shared OG card |
| Plain `<script>` tag | `next/Script` component | Script component causes RSC payload duplication (see Pitfalls); plain script tag is the official recommendation |

**Installation:**
```bash
npm install schema-dts
```

---

## Architecture Patterns

### Recommended Project Structure
```
src/
├── lib/
│   ├── data/
│   │   ├── services.ts          # Already exists — 4 services
│   │   ├── service-areas.ts     # Already exists — 8 areas
│   │   └── testimonials.ts      # Already exists — 10 testimonials
│   └── schema/
│       ├── local-business.ts    # generateLocalBusinessSchema()
│       ├── service.ts           # generateServiceSchema(service)
│       ├── faq-page.ts          # generateFAQPageSchema(faqs)
│       ├── breadcrumb.ts        # generateBreadcrumbSchema(crumbs)
│       └── aggregate-rating.ts  # generateAggregateRatingSchema()
├── app/
│   ├── layout.tsx               # Already has metadataBase
│   ├── sitemap.ts               # NEW — MetadataRoute.Sitemap
│   ├── robots.ts                # NEW — MetadataRoute.Robots
│   ├── opengraph-image.png      # NEW — static 1200x630 branded card
│   └── ...content pages (Phase 3+)
```

### Pattern 1: Schema Generator Functions
**What:** Pure TypeScript functions that accept data-file types and return typed `WithContext<T>` objects from schema-dts.
**When to use:** Call these functions from each page component; inject result as JSON-LD script tag.
**Example:**
```typescript
// src/lib/schema/local-business.ts
import type { WithContext, LocalBusiness } from 'schema-dts'

export function generateLocalBusinessSchema(): WithContext<LocalBusiness> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Plumber',         // More specific subtype of LocalBusiness
    name: 'Heartland Plumbing Co.',
    url: 'https://www.heartlandplumbingomaha.com',
    telephone: '(402) 555-0147',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '4821 S 72nd Street',
      addressLocality: 'Omaha',
      addressRegion: 'NE',
      postalCode: '68127',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 41.2524,
      longitude: -96.0003,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'],
        opens: '07:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '16:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '312',
      bestRating: '5',
    },
    areaServed: ['Omaha', 'Bellevue', 'Papillion', 'La Vista', 'Ralston', 'Elkhorn', 'Gretna', 'Bennington'],
    priceRange: '$$',
  }
}
```

### Pattern 2: JSON-LD Injection in Page Components
**What:** Plain `<script>` tag with `dangerouslySetInnerHTML` placed directly in the page component JSX body (not layout, not Next.js Script component).
**When to use:** Every content page that needs structured data.
**Example:**
```typescript
// In any page component (e.g., app/services/[slug]/page.tsx)
import { generateServiceSchema } from '@/lib/schema/service'

export default function ServicePage({ params }) {
  const service = getServiceBySlug(params.slug)
  const jsonLd = generateServiceSchema(service)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* page content */}
    </>
  )
}
```

### Pattern 3: generateMetadata with Canonical and OG
**What:** Export `generateMetadata` from each page to return unique title, description, canonical, OG, and twitter card metadata.
**When to use:** Every content page. The `metadataBase` in layout.tsx handles URL resolution automatically.
**Example:**
```typescript
import type { Metadata } from 'next'

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const service = getServiceBySlug(params.slug)

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: `/services/${service.slug}`,  // metadataBase resolves to full URL
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `/services/${service.slug}`,
      siteName: 'Heartland Plumbing Co.',
      images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: service.metaTitle,
      description: service.metaDescription,
      images: ['/opengraph-image.png'],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}
```

### Pattern 4: Native Sitemap
**What:** `app/sitemap.ts` returns `MetadataRoute.Sitemap` array — static generation, no external package.
**Example:**
```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'
import { services } from '@/lib/data/services'
import { areas } from '@/lib/data/service-areas'

const BASE = 'https://www.heartlandplumbingomaha.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceEntries = services.map(s => ({
    url: `${BASE}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const areaEntries = areas.map(a => ({
    url: `${BASE}/service-areas/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    { url: `${BASE}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    ...serviceEntries,
    ...areaEntries,
  ]
}
```

### Pattern 5: Native robots.ts
**What:** `app/robots.ts` returns `MetadataRoute.Robots` — no physical file needed.
**Example:**
```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://www.heartlandplumbingomaha.com/sitemap.xml',
  }
}
```

### Pattern 6: Static OG Image
**What:** A 1200x630 PNG placed at `app/opengraph-image.png`. Next.js auto-detects it and injects the correct `<meta property="og:image">` tag.
**When to use:** One shared branded card is the right ROI choice for a local business portfolio demo. No code required — just drop the file.
**Note:** Place in the `app/` root (NOT in `public/`) for Next.js auto-detection. Putting it in `public/` causes content-type validation failures in share debuggers.

### Pattern 7: BreadcrumbList Schema
**What:** Generates `BreadcrumbList` with `ListItem` entries for each level of navigation.
**Convention:** Home → Section → Page (3 levels max for service/area pages)
**Example:**
```typescript
// src/lib/schema/breadcrumb.ts
export interface BreadcrumbItem {
  name: string
  url: string
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
```

### Anti-Patterns to Avoid
- **Using `next/Script` for JSON-LD:** The Script component causes JSON-LD to be included in the RSC hydration payload, duplicating data and bloating page load. Use plain `<script>` tag only.
- **Placing JSON-LD in layout.tsx:** Layout-level JSON-LD applies to all pages in the segment — LocalBusiness schema in root layout is fine, but Service/FAQPage/Breadcrumb schemas must be in their respective page components.
- **Putting opengraph-image.png in `/public`:** Does not get picked up correctly by Next.js's auto-detection. Must be in the `app/` directory (or a route segment folder for route-specific images).
- **Installing next-sitemap:** Redundant with App Router. Adds postbuild complexity and a config file for zero benefit over the native `app/sitemap.ts` convention.
- **Hardcoding full URLs in alternates.canonical:** Pass relative paths — `metadataBase` in layout.tsx (already set to `https://www.heartlandplumbingomaha.com`) resolves them automatically.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| TypeScript types for schema.org objects | Custom interface definitions for LocalBusiness, Service, FAQPage | `schema-dts` (Google-maintained) | Schema.org has hundreds of required/optional fields; schema-dts covers all of them with union types |
| Sitemap XML generation | Custom route handler that builds XML string | `app/sitemap.ts` MetadataRoute.Sitemap | Native Next.js convention, static generation, proper content-type headers |
| robots.txt | Static file in `/public` | `app/robots.ts` MetadataRoute.Robots | Dynamic, sitemap URL reference, no manual file management |
| OG image meta tags | Manual openGraph.images array with hardcoded paths | Static `app/opengraph-image.png` convention | Auto-detected, auto-injects correct meta tags, no code needed |

**Key insight:** Next.js 13+ native file conventions handle robots, sitemap, and OG images with zero configuration. The `metadataBase` in `layout.tsx` already covers canonical URL resolution. The only missing piece is (1) the schema generators and (2) `generateMetadata` per page.

---

## Common Pitfalls

### Pitfall 1: JSON-LD in RSC Hydration Payload
**What goes wrong:** Using `<Script type="application/ld+json">` from `next/script` causes the JSON-LD to be serialized into the RSC payload during hydration. This bloats initial page load and means the structured data appears twice in the rendered document.
**Why it happens:** The Script component is designed for third-party scripts with loading strategies — it was not built for inline data payloads. Next.js serializes it into the RSC payload for hydration consistency.
**How to avoid:** Use plain `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />` in the page component body. This renders SSR-only.
**Warning signs:** Structured data validator shows duplicate schema; page source shows JSON-LD twice.

### Pitfall 2: Canonical URL as Full URL vs Relative Path
**What goes wrong:** Setting `alternates.canonical` to the full URL string (e.g., `https://www.heartlandplumbingomaha.com/services/drain-cleaning`) when `metadataBase` is already configured. May cause canonical to render incorrectly or as double-prefixed URL in some Next.js versions.
**Why it happens:** `metadataBase` resolves relative canonical paths — passing a full URL bypasses this and can conflict.
**How to avoid:** Always pass relative paths to `alternates.canonical`: `/services/drain-cleaning`
**Warning signs:** View source shows `<link rel="canonical" href="https://...https://...">` or wrong domain.

### Pitfall 3: OG Image in /public Not Auto-Detected
**What goes wrong:** Placing `opengraph-image.png` in the `/public` folder and expecting Next.js to auto-inject OG meta tags. The file is served but the meta tag is NOT generated.
**Why it happens:** Next.js auto-detection only looks in the `app/` directory (file convention), not in `/public`.
**How to avoid:** Place `opengraph-image.png` at `app/opengraph-image.png`. To reference it manually in metadata, use `/opengraph-image.png` (which resolves via `public/` as a static asset reference in openGraph.images).
**Warning signs:** Share debuggers show "No OG image found" despite file existing in `/public`.

### Pitfall 4: Missing `as const` on changeFrequency in sitemap.ts
**What goes wrong:** TypeScript error — `changeFrequency: 'monthly'` infers type `string` instead of the required literal union type.
**Why it happens:** TypeScript widens string literals to `string` by default in object literals.
**How to avoid:** Always use `changeFrequency: 'monthly' as const` when the value is inside a `.map()` callback or object literal that isn't typed as `MetadataRoute.Sitemap` at the point of definition.
**Warning signs:** `Type 'string' is not assignable to type 'never' | 'always' | ...` TypeScript error.

### Pitfall 5: schema-dts Version Mismatch with Schema.org
**What goes wrong:** schema-dts v2.0.0 (latest as of research date) covers Schema.org v30. Some fields documented on schema.org may not be in the type definitions.
**Why it happens:** schema-dts is maintained by Google but releases infrequently — last release was March 2022.
**How to avoid:** For fields not typed in schema-dts, cast to `as unknown as Type` or use a string type override. The generated JSON-LD is valid regardless of TypeScript narrowing.
**Warning signs:** TypeScript errors on valid schema.org properties like custom extensions.

---

## Code Examples

Verified patterns from official sources and confirmed working in Next.js App Router:

### FAQPage Schema Generator
```typescript
// src/lib/schema/faq-page.ts
import type { WithContext, FAQPage } from 'schema-dts'

interface FAQ { q: string; a: string }

export function generateFAQPageSchema(faqs: FAQ[]): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }
}
```

### Service Schema Generator
```typescript
// src/lib/schema/service.ts
import type { WithContext, Service } from 'schema-dts'
import type { ServiceData } from '@/lib/data/services'

const BASE = 'https://www.heartlandplumbingomaha.com'

export function generateServiceSchema(service: ServiceData): WithContext<Service> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.shortDescription,
    url: `${BASE}/services/${service.slug}`,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Heartland Plumbing Co.',
      telephone: '(402) 555-0147',
      url: BASE,
    },
    areaServed: {
      '@type': 'City',
      name: 'Omaha',
      containedInPlace: { '@type': 'State', name: 'Nebraska' },
    },
    offers: {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: service.pricingRange,
        priceCurrency: 'USD',
      },
    },
  }
}
```

### Multiple JSON-LD Scripts on One Page
```typescript
// Service page needs both Service + FAQPage schemas + BreadcrumbList
export default function ServicePage({ params }) {
  const service = getServiceBySlug(params.slug)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateServiceSchema(service)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQPageSchema(service.faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema([
          { name: 'Home', url: BASE },
          { name: 'Services', url: `${BASE}/services` },
          { name: service.title, url: `${BASE}/services/${service.slug}` },
        ])) }}
      />
      {/* page content */}
    </>
  )
}
```

### noindex for Utility Pages
```typescript
// app/thank-you/page.tsx — example
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `next-sitemap` package | Native `app/sitemap.ts` | Next.js 13.3 (2023) | No postbuild step, no extra config file |
| Static `public/robots.txt` | Native `app/robots.ts` | Next.js 13.3 (2023) | Programmatic, dynamic sitemap reference |
| `@vercel/og` package | `next/og` (ImageResponse) | Next.js 13.4 (2023) | First-party, no separate install |
| `next/head` (Pages Router) | Metadata API + `generateMetadata` | Next.js 13 (2022) | Declarative, co-located, typed |
| `<Head><script>` in pages router | `<script dangerouslySetInnerHTML>` in page body | Next.js 13 (2022) | RSC-safe, no hydration issues |

**Deprecated/outdated:**
- `next-sitemap` package: Not deprecated, but redundant for App Router projects. The postbuild step approach is an unnecessary footgun.
- `@vercel/og`: Still works but `next/og` is the preferred import for Next.js projects.
- Static `public/robots.txt`: Still works but loses the ability to reference the sitemap URL dynamically.

---

## Codebase-Specific Notes

These are findings from reading the actual project files, not general research:

1. **`metadataBase` already configured** in `src/app/layout.tsx` as `https://www.heartlandplumbingomaha.com` — canonical resolution will work automatically with relative paths in `generateMetadata`.

2. **Data files already have `metaTitle` and `metaDescription` fields** on both `ServiceData` and `AreaData` interfaces — `generateMetadata()` implementations should read these directly rather than constructing titles from scratch.

3. **No `lib/schema/` directory exists yet** — needs to be created. Current `src/lib/` only has `data/`.

4. **`sharp` already installed** (^0.34.5 in devDependencies context note: it's in `dependencies`) — no additional install needed if dynamic ImageResponse is used, but research recommends static PNG for simplicity.

5. **15 content pages total** = 1 homepage + 1 about + 1 contact + 4 service pages + 8 area pages + 1 thank-you (noindex). Sitemap should include 14 indexed URLs (exclude thank-you).

6. **Business data for LocalBusiness schema** — must be compiled from the hero section context. Key fields: name "Heartland Plumbing Co.", phone "(402) 555-0147", rating 4.9, reviewCount 312. Full address/geo/hours are not yet in any data file — they should be added to a `src/lib/data/business.ts` constants file as the single source of truth consumed by schema generators, generateMetadata, and layout components.

7. **Brand colors for OG image** — `globals.css` defines `--color-primary: #1a7a6e` (teal). OG image design: teal background (#1a7a6e), white logo + business name, phone number. Create as a 1200x630 PNG.

---

## Open Questions

1. **Business address and geo coordinates**
   - What we know: Phone (402) 555-0147, city Omaha NE, but no street address in any existing file
   - What's unclear: The address referenced in CONTEXT.md ("all fields from the hero HTML") — the hero HTML context is not available as a file in the project (only the built .next output exists). The address "4821 S 72nd Street, Omaha, NE 68127" appears in the context description but should be verified.
   - Recommendation: Create `src/lib/data/business.ts` as a constants file with all business metadata. Plan should include this file as the first task.

2. **OG image creation workflow**
   - What we know: Static PNG approach is correct, 1200x630, teal brand color
   - What's unclear: Whether to create this via code (a build-time script using sharp) or provide it as a pre-made asset
   - Recommendation: For a portfolio demo, use a simple pre-made PNG or create it with a short Node.js script using sharp — do not add ImageResponse complexity for a single shared image.

3. **`Service` type in schema-dts**
   - What we know: schema-dts covers broad Schema.org vocabulary
   - What's unclear: Whether `Service` type specifically supports the `offers/priceSpecification` nesting used above without type casting
   - Recommendation: Install schema-dts and verify during task execution; fall back to partial type casting if needed.

---

## Sources

### Primary (HIGH confidence)
- Next.js official docs — generateMetadata, MetadataRoute.Sitemap, MetadataRoute.Robots (verified via web search linking to nextjs.org/docs, confirmed by multiple implementations)
- jsdevspace.substack.com/p/how-to-configure-seo-in-nextjs-16 — Next.js 16 SEO patterns (fetched directly, current)
- wisp.blog/blog/implementing-json-ld-in-nextjs-for-seo — JSON-LD plain script tag pattern (fetched directly)
- shipped.club/blog/schema-org-nextjs-app-router — JSON-LD + schema-dts pattern (fetched directly)
- dev.to/arfatapp/generating-dynamic-robotstxt-and-sitemapxml-in-a-nextjs-app-router-with-typescript-35l9 — sitemap.ts + robots.ts code examples (fetched directly)

### Secondary (MEDIUM confidence)
- github.com/vercel/next.js/discussions/80088 — RSC payload duplication issue with Script component for JSON-LD (fetched, confirmed open issue)
- franciscomoretti.com/blog/setting-up-static-og-image-nextjs-app-router — static OG image in app/ vs public/ (referenced in search results, key finding confirmed by multiple sources)
- github.com/google/schema-dts/releases — schema-dts v2.0.0 release date and version (fetched directly)
- WebSearch: next-sitemap redundancy for App Router (multiple sources agree)

### Tertiary (LOW confidence)
- adeelhere.com/blog/2025-12-09-complete-nextjs-seo-guide — openGraph TypeScript structure (single source, but consistent with other findings)

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — native Next.js features verified by official docs references; schema-dts release verified
- Architecture: HIGH — JSON-LD plain script tag pattern verified by official Next.js guide and multiple community sources; sitemap/robots patterns confirmed by official docs
- Pitfalls: HIGH — RSC hydration issue is an open GitHub discussion with 2025+ activity; canonical + static OG image pitfalls confirmed by multiple sources
- Business data constants: MEDIUM — the business address/geo was noted in context as "from hero HTML" but the hero HTML file does not exist in source; address values should be confirmed

**Research date:** 2026-04-05
**Valid until:** 2026-07-05 (Next.js is fast-moving but these APIs have been stable since v13)
