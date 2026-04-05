# Architecture Patterns

**Domain:** Next.js plumbing contractor website (SSG on Vercel)
**Project:** Heartland Plumbing Co. — Omaha, NE
**Researched:** 2026-04-05
**Confidence:** HIGH (Next.js App Router SSG patterns are well-established; confirmed via nextjs.org llms.txt index and project constraints)

---

## Recommended Architecture

**App Router with full static export.** Every page is pre-rendered at build time. No server-side rendering, no ISR. Zero runtime compute on Vercel's edge means lowest TTFB, best Lighthouse scores, and cheapest hosting.

The site has 15 pages total: 1 homepage, 4 service pages, 8 service area pages, 1 about, 1 contact. That is small enough for pure SSG — build time is negligible and ISR's complexity has no payoff here.

```
Next.js App Router
└── Static HTML output (all 15 pages pre-rendered at build time)
    ├── Served from Vercel CDN edge nodes
    ├── No Lambda functions except /api/contact (email handler)
    └── next/font eliminates external font network requests
```

### Rendering Boundary Rule

**Server Components everywhere, Client Components only where required.**

Client Component (`"use client"`) is justified only when the component needs:
- `useState` / `useEffect` (interactive state)
- Browser APIs (scroll position, window size)
- Event handlers that can't be server-rendered

For this site: the only Client Components are the mobile menu toggle, the contact form (controlled inputs), and any scroll-based animations. Everything else — hero, service cards, testimonials, FAQ accordions using CSS-only disclosure — renders as Server Components with zero JS shipped.

---

## File Structure

```
heartland-plumbing/
├── app/
│   ├── layout.tsx                    # Root layout: font injection, global metadata defaults
│   ├── page.tsx                      # Homepage
│   ├── about/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── services/
│   │   └── [slug]/
│   │       └── page.tsx              # Dynamic route, generateStaticParams
│   ├── service-areas/
│   │   └── [slug]/
│   │       └── page.tsx              # Dynamic route, generateStaticParams
│   └── api/
│       └── contact/
│           └── route.ts              # POST handler: validates + sends email
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx                # Server Component (static nav + phone)
│   │   ├── MobileNav.tsx             # Client Component (toggle state)
│   │   └── Footer.tsx                # Server Component
│   ├── sections/
│   │   ├── Hero.tsx                  # Server Component (adapts from existing HTML)
│   │   ├── ServicesGrid.tsx          # Server Component
│   │   ├── TrustBar.tsx              # Server Component (license, stars, years)
│   │   ├── Testimonials.tsx          # Server Component (static reviews)
│   │   ├── ServiceAreaMap.tsx        # Server Component (CSS/SVG map)
│   │   ├── FaqAccordion.tsx          # Client Component (disclosure state)
│   │   └── ContactForm.tsx           # Client Component (form state + submit)
│   └── ui/
│       ├── Button.tsx
│       ├── PhoneLink.tsx             # tel: link with 48px tap target
│       ├── ServiceCard.tsx
│       └── Breadcrumb.tsx
│
├── lib/
│   ├── data/
│   │   ├── services.ts               # Service page content (slug, title, copy, FAQ, schema)
│   │   └── service-areas.ts          # Service area content (slug, city, localized copy)
│   ├── schema/
│   │   ├── local-business.ts         # Shared LocalBusiness JSON-LD generator
│   │   ├── service.ts                # Service page JSON-LD generator
│   │   └── faq.ts                    # FAQPage JSON-LD generator
│   └── email.ts                      # Nodemailer/resend send function
│
├── public/
│   ├── images/                       # WebP optimized images
│   └── favicon.ico
│
└── next.config.ts
```

---

## Component Boundaries

| Component | Type | Responsibility | Communicates With |
|-----------|------|---------------|-------------------|
| `app/layout.tsx` | Server | Font injection, global `<head>` defaults, wraps all pages | Header, Footer, page children |
| `Header.tsx` | Server | Logo, desktop nav links, phone number (tel:) | MobileNav (passes toggle trigger) |
| `MobileNav.tsx` | Client | Hamburger toggle, slide-out drawer on mobile | None (self-contained) |
| `Footer.tsx` | Server | Service area list, hours, address, license, nav links | None |
| `Hero.tsx` | Server | Full-bleed hero section, H1, primary CTA button, trust microbar | PhoneLink, Button |
| `ServicesGrid.tsx` | Server | 4-up service card grid with icons and links | ServiceCard (x4) |
| `TrustBar.tsx` | Server | Star rating badge, review count, years, license, insurance, BBB | None |
| `Testimonials.tsx` | Server | Static review quotes with name + city | None |
| `FaqAccordion.tsx` | Client | Expand/collapse FAQ items; renders FAQ JSON-LD is injected by page | None |
| `ContactForm.tsx` | Client | Controlled form fields, validates, POSTs to /api/contact | /api/contact route |
| `Breadcrumb.tsx` | Server | Structured breadcrumb nav; data passed from page | None |
| `services/[slug]/page.tsx` | Server | Generates 4 service pages via generateStaticParams; injects Service + FAQ + BreadcrumbList schema | All section components |
| `service-areas/[slug]/page.tsx` | Server | Generates 8 area pages via generateStaticParams; injects LocalBusiness + BreadcrumbList schema | All section components |
| `/api/contact/route.ts` | Route Handler | Validates form POST, sends email notification | `lib/email.ts` |

---

## Data Flow

### Static Content Flow (Build Time)

```
lib/data/services.ts ──────► services/[slug]/page.tsx
  (4 service definitions)       generateStaticParams() returns 4 slugs
                                 generateMetadata() returns per-page SEO
                                 JSON-LD injected as <script type="application/ld+json">
                                 Passes content props to section components

lib/data/service-areas.ts ──► service-areas/[slug]/page.tsx
  (8 area definitions)          generateStaticParams() returns 8 slugs
                                 generateMetadata() returns localized SEO
                                 JSON-LD injected per page
```

### Form Submission Flow (Runtime)

```
ContactForm.tsx (Client)
  → User fills form (name, phone, service, zip)
  → Client-side validation (required fields, phone format)
  → fetch POST to /api/contact
      → route.ts validates server-side
      → lib/email.ts sends notification email
      → Returns { success: true } or { error: message }
  → Shows success message or error state
```

### Font Flow (Build Time → Runtime)

```
app/layout.tsx
  → next/font/google loads Bitter + Nunito Sans at BUILD TIME
  → Self-hosted font files included in deployment bundle
  → Zero external network requests for fonts at runtime
  → CSS variables --font-bitter, --font-nunito injected on <html>
  → Tailwind config maps font families to these variables
```

### Schema/SEO Flow

```
Per-page generateMetadata() ──► <head> title, description, canonical, OG, Twitter
lib/schema/*.ts generators ──► <script type="application/ld+json"> in page body
  → LocalBusiness: on homepage, about, contact, all service area pages
  → Service: on each of 4 service pages
  → FAQPage: on each of 4 service pages (if FAQ section present)
  → BreadcrumbList: on all non-homepage pages
  → AggregateRating: on homepage + about page
```

---

## Patterns to Follow

### Pattern 1: Data-Driven Dynamic Routes

Define all page content in a single data file. Pages read from it — no content buried in components.

```typescript
// lib/data/services.ts
export const services = [
  {
    slug: 'drain-cleaning',
    title: 'Drain Cleaning',
    metaTitle: 'Drain Cleaning in Omaha | Heartland Plumbing Co.',
    metaDescription: 'Fast drain cleaning in Omaha. Same-day service, 25+ years experience. Call (402) 555-0147 for a free estimate.',
    h1: 'Professional Drain Cleaning in Omaha',
    intro: '...',
    faqs: [...],
    relatedServices: ['water-heaters', 'sewer-line-repair'],
    relatedAreas: ['omaha', 'bellevue', 'papillion'],
  },
  // ...
]

// services/[slug]/page.tsx
export function generateStaticParams() {
  return services.map(s => ({ slug: s.slug }))
}

export function generateMetadata({ params }) {
  const service = services.find(s => s.slug === params.slug)
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { ... },
  }
}
```

**Why:** All 4 service pages and 8 area pages are generated from a single source of truth. Adding a new service = add one object to the array.

### Pattern 2: JSON-LD Injected at Page Level

Schema markup lives at the page, not in components. Components receive structured data as props and render it — they don't generate schema themselves.

```typescript
// app/services/[slug]/page.tsx
export default function ServicePage({ params }) {
  const service = services.find(s => s.slug === params.slug)
  const jsonLd = generateServiceSchema(service)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection ... />
      <FaqAccordion faqs={service.faqs} />
    </>
  )
}
```

**Why:** Keeps schema logic out of UI components. Pages own SEO; components own presentation.

### Pattern 3: next/font at Root Layout

Fonts loaded once in root layout, variables applied globally. Never loaded per-page.

```typescript
// app/layout.tsx
import { Bitter } from 'next/font/google'
import { Nunito_Sans } from 'next/font/google'

const bitter = Bitter({ subsets: ['latin'], variable: '--font-bitter', display: 'swap' })
const nunitoSans = Nunito_Sans({ subsets: ['latin'], variable: '--font-nunito', display: 'swap' })

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bitter.variable} ${nunitoSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

**Why:** next/font self-hosts fonts in the deployment bundle. Zero Google Fonts CDN requests at runtime, eliminating a render-blocking resource that kills LCP. Critical for 95+ Performance score.

### Pattern 4: Image Component with Explicit Sizes

Every `<Image>` must declare `sizes` prop matching actual rendered width. Prevents Lighthouse flagging oversized images.

```typescript
// Hero image (full width on all breakpoints)
<Image
  src="/images/plumber-omaha.webp"
  alt="Heartland Plumbing Co. technician servicing drain in Omaha"
  fill
  priority                // LCP image — preloads
  sizes="100vw"
  className="object-cover"
/>

// Service card thumbnail (grid item)
<Image
  src={service.image}
  alt={service.imageAlt}
  width={400}
  height={300}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
  loading="lazy"          // below fold — lazy load
/>
```

**Why:** `priority` on the LCP image triggers a `<link rel="preload">` in `<head>`. `sizes` tells the browser which source to use from the srcset. Both are required for LCP under 2.5s.

### Pattern 5: Internal Link Matrix

Both service data and service area data carry cross-reference arrays. Pages render these as `<Link>` elements automatically.

```typescript
// A service page renders:
// "We serve these areas:" → links to /service-areas/[each-area]
// "Related services:" → links to /services/[each-service]

// A service area page renders:
// "Services in [City]:" → links to /services/[each-service]
```

**Why:** This creates the internal link matrix the project requires without manually maintaining link lists per page. Single source of truth in data files.

### Pattern 6: Route Handler for Contact Form

The contact form POSTs to `/api/contact` — a Next.js Route Handler in the App Router. This runs as a Vercel serverless function only when invoked.

```typescript
// app/api/contact/route.ts
export async function POST(request: Request) {
  const body = await request.json()
  // validate: name, phone required; service + zip optional
  // send email via nodemailer or Resend
  return Response.json({ success: true })
}
```

**Why:** Keeps email logic server-side (API key never exposed to client). No third-party form services needed for a portfolio demo.

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Client Components Wrapping Static Sections

**What:** Wrapping Hero, ServicesGrid, or Testimonials in `"use client"` because it seemed easier.
**Why bad:** Ships unnecessary JS to the browser. Every Client Component adds to the JS bundle that must parse before interactivity. A 4-section homepage with all Client Components could add 30-50KB of JS with no functional benefit.
**Instead:** Default to Server Components. Add `"use client"` only when the component needs browser state or events.

### Anti-Pattern 2: Importing `next/font` Inside Components

**What:** Loading Bitter inside `HeroSection.tsx` instead of root layout.
**Why bad:** Font is re-requested per-component render path, defeating next/font's self-hosting optimization. May cause FOUT (flash of unstyled text).
**Instead:** Always load fonts once in `app/layout.tsx`, inject as CSS variables on `<html>`.

### Anti-Pattern 3: Hardcoding Metadata in Page JSX

**What:** Putting `<title>` and `<meta>` tags directly in page return as HTML.
**Why bad:** App Router ignores these — metadata must be exported via `generateMetadata()` or the `metadata` object. Hardcoded tags in JSX don't get hoisted to `<head>`.
**Instead:** Export `metadata` const or `generateMetadata` function from every `page.tsx`.

### Anti-Pattern 4: Using `<img>` Instead of `<Image>`

**What:** Raw HTML `<img>` tags for any image.
**Why bad:** Loses automatic WebP conversion, responsive srcset generation, lazy loading, blur placeholder, and CLS prevention. Will fail Lighthouse image optimization audit.
**Instead:** Always use `next/image`. Only exception: SVG icons inlined in JSX.

### Anti-Pattern 5: Putting Schema in `<head>` via Metadata API

**What:** Trying to inject JSON-LD via `generateMetadata()`.
**Why bad:** The Next.js Metadata API does not support arbitrary script tags in `<head>`. JSON-LD must be a `<script>` tag in the page `<body>`.
**Instead:** Inject JSON-LD as a `<script type="application/ld+json">` directly in the page's JSX return, before the first visible element.

### Anti-Pattern 6: One Giant Page Component

**What:** Putting all 8 service area pages as if-else conditionals inside a single large page component.
**Why bad:** Code is hard to maintain; conditionals inflate component size; testing is harder.
**Instead:** Use `[slug]/page.tsx` with `generateStaticParams()`. Each page gets identical structure, different data injected from the data file.

---

## Build Order (Phase Dependencies)

The recommended build sequence based on dependencies:

```
Phase 1: Foundation (no dependencies)
  ├── next.config.ts (output config, image domains)
  ├── tailwind.config.ts (brand colors, font variables)
  ├── app/layout.tsx (font loading, root HTML structure)
  ├── lib/data/services.ts (service content — referenced everywhere)
  └── lib/data/service-areas.ts (area content — referenced everywhere)

Phase 2: Layout Components (depends on Phase 1)
  ├── Header.tsx + MobileNav.tsx (present on all pages)
  └── Footer.tsx (present on all pages)

Phase 3: Shared UI Components (depends on Phase 1)
  ├── TrustBar.tsx
  ├── Breadcrumb.tsx
  ├── PhoneLink.tsx
  └── Button.tsx

Phase 4: Section Components (depends on Phase 1 + Phase 3)
  ├── Hero.tsx (adapts from existing HTML prototype)
  ├── ServicesGrid.tsx + ServiceCard.tsx
  ├── Testimonials.tsx
  ├── FaqAccordion.tsx (Client Component)
  └── ContactForm.tsx (Client Component)

Phase 5: Schema Generators (depends on Phase 1)
  ├── lib/schema/local-business.ts
  ├── lib/schema/service.ts
  └── lib/schema/faq.ts

Phase 6: Pages (depends on all above)
  ├── app/page.tsx (homepage — assembles all sections)
  ├── app/services/[slug]/page.tsx (depends on services.ts + service schema)
  ├── app/service-areas/[slug]/page.tsx (depends on service-areas.ts + local-business schema)
  ├── app/about/page.tsx
  └── app/contact/page.tsx + app/api/contact/route.ts

Phase 7: SEO Infrastructure (can partially parallel Phase 6)
  ├── app/sitemap.ts (auto-generates sitemap.xml from all routes)
  ├── app/robots.ts
  └── public/favicon.ico + apple-touch-icon
```

**Critical path:** `lib/data/*.ts` files must exist before any page can be built, because both `generateStaticParams()` and `generateMetadata()` import from them.

---

## Scalability Considerations

| Concern | At 15 pages (now) | At 50+ pages (real client) |
|---------|------------------|---------------------------|
| Build time | < 10 seconds | Still negligible for SSG |
| Data management | Single `.ts` files | Migrate to JSON or headless CMS (Sanity, Contentful) |
| Form handling | Route Handler + Nodemailer | Add rate limiting, CAPTCHA |
| Images | Public folder | Cloudinary or similar CDN with upload pipeline |
| Schema maintenance | Manual in data files | CMS-driven schema generation |

---

## Lighthouse Score Targets and Technical Requirements

| Category | Target | Key Lever |
|----------|--------|-----------|
| Performance | 95+ | `priority` on LCP image, next/font self-hosting, Server Components, minimal JS |
| Accessibility | 95+ | Semantic HTML, alt text on every image, 48px tap targets, color contrast 4.5:1+ |
| Best Practices | 95+ | HTTPS (Vercel default), no deprecated APIs, valid HTML |
| SEO | 95+ | Unique title/meta per page, canonical tags, robots meta, JSON-LD, crawlable links |

**The single highest-impact action for Performance:** Use `next/font` (eliminates render-blocking Google Fonts request) + `priority` prop on above-the-fold hero image (triggers preload, fixes LCP).

**The single highest-impact action for SEO Lighthouse:** Export `generateMetadata()` on every `page.tsx` — not just homepage. Lighthouse's SEO audit checks title, meta description, canonical, and robots on the specific page being audited.

---

## Sources

- Next.js App Router documentation index (nextjs.org/docs/llms.txt) — confirmed available APIs: `generateStaticParams`, `generateMetadata`, `next/font/google`, Route Handlers, JSON-LD guide — HIGH confidence
- Project constraints from `.planning/PROJECT.md` — SSG on Vercel, Tailwind, Bitter + Nunito Sans, 15-page site scope — HIGH confidence
- Core Web Vitals targets (LCP < 2.5s, CLS < 0.1, INP < 200ms) — well-established Google standards — HIGH confidence
- Next.js `next/image` component behavior (priority prop triggers preload, sizes drives srcset) — established Next.js behavior — HIGH confidence
- JSON-LD must be in body `<script>` tag, not metadata API — confirmed Next.js limitation — HIGH confidence
