# Project Research Summary

**Project:** Heartland Plumbing Co. — Portfolio Demo Website
**Domain:** Local service contractor website (plumbing, Omaha NE)
**Researched:** 2026-04-05
**Confidence:** HIGH

## Executive Summary

This is a static marketing website for a local plumbing contractor, built to serve as an NSI portfolio demo that demonstrates professional web design, local SEO, and performance optimization. The domain is well-understood: plumbing contractor websites follow established patterns with high consensus across all four research dimensions. The recommended approach is Next.js 15 App Router with full static generation (SSG) — every one of the 15 pages pre-renders at build time, is served from Vercel's edge CDN, and requires zero runtime compute except for a single contact form API route. This architecture directly achieves the Lighthouse 95+ target while keeping hosting costs at zero.

The core strategic insight from research is that this site lives or dies on three overlapping outcomes: emergency call conversion, local SEO ranking, and portfolio credibility for NSI. All three goals point to the same execution: fast SSG pages (LCP under 2.5s), schema markup on every page, genuinely differentiated content on all 8 service area pages, and a prominent click-to-call pattern that prioritizes the phone number over forms. The recommended stack is lean — Next.js, Tailwind CSS, Resend, React Hook Form + Zod — with no component libraries, no analytics SDKs, and no third-party widgets that would add bundle weight or CLS.

The primary risks are technical rather than strategic. Six pitfalls can each independently cause Lighthouse score collapse or SEO failure: naive Google Fonts loading (kills LCP), Next.js Image misuse (causes CLS), thin service area page content (duplicate content penalty), schema syntax errors (kills rich results), Tailwind dynamic class purging (breaks styles in production), and Vercel form email failure (lost leads). All six are preventable with specific patterns established during Phase 1 setup. The build order from ARCHITECTURE.md — data files first, layout second, components third, pages last — directly reflects these dependencies.

---

## Key Findings

### Recommended Stack

The stack is constrained by NSI's established preferences and the project's Next.js + Vercel mandate, leaving fewer decisions than a greenfield project. Within those constraints, research confirms the following as the correct choices. Next.js 15 App Router with TypeScript is the core. Tailwind CSS v4 handles styling (with a v3 fallback if ecosystem friction appears). Fonts load exclusively via `next/font/google` — never via `<link>` tags. Forms go through React Hook Form + Zod on the client and a Route Handler + Resend on the server. SEO uses the Next.js Metadata API and inline JSON-LD — the legacy `next-seo` package is redundant. Sitemap generation uses `next-sitemap`. The full client-side JS budget stays under 30KB by defaulting to Server Components and avoiding framer-motion, shadcn/ui, and all analytics SDKs.

**Core technologies:**
- **Next.js 15 (App Router):** Full framework — SSG, routing, Image optimization, metadata API — confirmed by project constraints
- **TypeScript 5.x:** Type safety across schema generators and form validation — catches bugs before Vercel deploy
- **Tailwind CSS v4:** Utility-first styling; v4 config-in-CSS reduces bundle size; brand tokens map to custom properties
- **`next/font/google`:** Self-hosted font loading at build time; the single highest-impact LCP optimization available
- **`next/image` + Sharp:** Automatic WebP/AVIF, responsive srcset, CLS prevention; Sharp must be installed explicitly
- **React Hook Form + Zod:** Minimal-JS form state with shared client/server schema validation
- **Resend:** Serverless-compatible transactional email; 3,000 emails/month free tier; avoids Gmail SMTP restrictions on Vercel
- **`next-sitemap`:** Auto-discovers all 15 routes at build time; sitemap.xml is non-negotiable for indexing speed
- **Vercel + GitHub:** Project constraints; push-to-deploy, automatic HTTPS, global CDN, free tier sufficient

**What NOT to install:** framer-motion, shadcn/ui, react-query/SWR, redux/zustand, next-auth, prisma/Supabase client, styled-components, next-seo, react-helmet, any analytics SDK.

### Expected Features

The full table stakes list must ship — this is a portfolio demo, not an MVP product, so all required features are launch-blocking. From the 17 table stakes items, the highest-risk gaps are the 4 dedicated service pages, 8 dedicated service area pages, and complete schema coverage (LocalBusiness, Service, FAQPage, BreadcrumbList, AggregateRating). These are not "nice to have" — they are the entire local SEO argument for the demo.

**Must have (table stakes):**
- Prominent phone number with `tel:` link — sticky header, hero, mobile footer bar
- Click-to-call on mobile (48x48px minimum tap target)
- Hero with single primary CTA above the fold
- 4 dedicated service pages (Drain Cleaning, Water Heaters, Sewer Line Repair, Emergency Plumbing)
- 8 dedicated service area pages (Omaha, Bellevue, Papillion, La Vista, Ralston, Elkhorn, Gretna, Bennington)
- Contact form (name, phone, service needed, zip — 4 fields max)
- Trust signals: License #PL-28541, 4.9 stars / 312 reviews, 25+ years, fully insured
- Mobile-first responsive design (375px baseline)
- LCP under 2.5s, CLS under 0.1, INP under 200ms
- Schema markup on every page (LocalBusiness, Service, FAQPage, BreadcrumbList, AggregateRating)
- Unique title tag + meta description per page
- Internal linking matrix (service pages ↔ service area pages ↔ homepage)
- About page with owner story and credentials
- FAQ sections on all service pages

**Should have (differentiators, high signal for demo):**
- Before/after photo section on homepage and service pages
- Sticky mobile "Call Now" bar (bottom fixed, mobile-only)
- Localized content on each service area page — at least one unique paragraph per city
- Testimonial block with name and neighborhood ("— Mike T., Papillion")
- Open Graph + Twitter card meta per page
- Breadcrumb navigation with BreadcrumbList schema

**Defer (explicitly out of scope):**
- Blog / content pages — out of scope per PROJECT.md
- Online booking / scheduling integration — requires live availability data
- Google Maps iframe embed — adds page weight and CLS with no demo payoff
- Cookie consent banner — not legally required for US-only demo with no tracking pixels
- Print stylesheet — minor, adds clutter for minimal demo value
- Real pricing tables — plumbing pricing varies too widely; "call for estimate" is the correct approach

### Architecture Approach

The architecture is App Router SSG — 15 pages pre-rendered at build time, served from Vercel's edge CDN with a single serverless API route for the contact form. The rendering boundary rule is firm: Server Components everywhere by default, Client Components only for the mobile menu toggle, contact form (controlled inputs), and FAQ accordion (disclosure state). All other sections — hero, services grid, testimonials, trust bar, footer — are Server Components with zero JS shipped to the browser.

Content is data-driven: all 4 service pages and 8 service area pages generate from TypeScript data files in `lib/data/`. `generateStaticParams()` creates the routes; `generateMetadata()` produces per-page SEO; JSON-LD schema is injected as `<script type="application/ld+json">` at the page level, not inside components. This single-source-of-truth pattern means adding a new service or city = one object added to a data array.

**Major components:**
1. `lib/data/services.ts` + `lib/data/service-areas.ts` — single source of truth for all page content, metadata, FAQ, schema, and internal link relationships; must exist before any page can be built
2. `lib/schema/*.ts` — typed TypeScript schema generators (LocalBusiness, Service, FAQPage, BreadcrumbList, AggregateRating); centralized to prevent JSON-LD syntax errors
3. `Header.tsx` (Server) + `MobileNav.tsx` (Client) — layout shell present on all 15 pages; contains the sticky phone number that drives mobile conversions
4. `ContactForm.tsx` (Client) + `app/api/contact/route.ts` — form validation (React Hook Form + Zod) with server-side email dispatch (Resend); only runtime serverless function
5. Service page template (`services/[slug]/page.tsx`) + Area page template (`service-areas/[slug]/page.tsx`) — dynamic routes that generate 12 of the 15 pages from data files

### Critical Pitfalls

1. **Google Fonts via `<link>` tag instead of `next/font`** — kills LCP by 10-20 Lighthouse points; render-blocking external font request. Prevention: use `next/font/google` in `app/layout.tsx` with `display: 'swap'` and `adjustFontFallback: true`. Address in Phase 1.

2. **Service area pages with duplicate content** — 8 pages sharing only a city-name swap triggers Google's thin content penalty; pages fail to rank. Prevention: each page needs at minimum one unique neighborhood paragraph, area-specific H1, and at least one unique FAQ. Address in Phase 3 content writing before any pages are built.

3. **Next.js Image misuse causing CLS** — missing `width`/`height` props or `fill` without a sized parent causes hero section to jump on load; CLS above 0.1 drops Performance score. Prevention: always use `fill` with explicit parent height for hero, `width`/`height` for card images, `priority` on the LCP hero image. Address in Phase 1 component scaffolding.

4. **JSON-LD schema syntax errors** — wrong property names (e.g., `ratingCount` vs `reviewCount`), missing required fields, or malformed nesting silently breaks rich results. Prevention: centralize schema in `lib/schema/*.ts` typed functions; validate every type with Google's Rich Results Test before launch. Address in Phase 2.

5. **Tailwind dynamic class purging** — interpolated class strings (e.g., `text-${color}-500`) are invisible to Tailwind's JIT scanner; production build strips the styles. Prevention: never construct class names dynamically; use complete string literals or a `colorMap` lookup object. Address in Phase 1 before any reusable components are built.

6. **Vercel form email failure** — `.env.local` variables don't auto-deploy; Gmail SMTP is blocked by Vercel's serverless environment. Prevention: use Resend, add all env vars to Vercel dashboard on first deploy, test the live form before building success state UI. Address in Phase 4.

---

## Implications for Roadmap

Based on the build order dependency graph in ARCHITECTURE.md and the phase-specific pitfall warnings in PITFALLS.md, the roadmap should follow seven phases. The critical insight is that data files and layout must precede all pages, and SEO infrastructure must precede all content pages (not added at the end).

### Phase 1: Foundation and Layout

**Rationale:** Data files (`lib/data/services.ts`, `lib/data/service-areas.ts`) are imported by `generateStaticParams()` and `generateMetadata()` on every dynamic page — nothing builds without them. Next.js config, Tailwind brand tokens, `next/font` setup, and sticky header patterns must also be established before components are built on top of them. Four critical pitfalls (fonts, image patterns, Tailwind class conventions, trailing slash config, scroll-margin-top) must be prevented here, not fixed later.

**Delivers:** Working Next.js project scaffold, root layout with Bitter + Nunito Sans via next/font, Header + Footer + MobileNav, brand token configuration, TypeScript data files with all service and area content defined, `next.config.ts` with `trailingSlash: false` and image domain config.

**Addresses:** Click-to-call header (table stakes), mobile-first layout baseline, sticky header pattern.

**Avoids:** Pitfall 1 (Google Fonts/LCP), Pitfall 3 (Image CLS), Pitfall 5 (Tailwind purging), Pitfall 11 (anchor scroll offset), Pitfall 12 (trailing slash 404s).

### Phase 2: SEO Infrastructure

**Rationale:** Schema generators, canonical tags, OG images, sitemap, and robots.txt must exist before content pages are built — retrofitting them afterward causes rework and risks launch without them. The internal link matrix data structure (cross-references between services and areas in the data files) must also be finalized here, before page templates consume it.

**Delivers:** `lib/schema/*.ts` typed generators (LocalBusiness, Service, FAQPage, BreadcrumbList, AggregateRating), `next-sitemap` config, `public/robots.txt`, OG image assets (1200x630px), canonical URL pattern in `generateMetadata()`, internal link cross-reference arrays in data files.

**Addresses:** Schema markup (table stakes), title tags + meta descriptions (table stakes), robots.txt + sitemap.xml, Open Graph meta (differentiator), canonical tags.

**Avoids:** Pitfall 4 (schema errors), Pitfall 7 (missing canonicals), Pitfall 9 (OG image dimensions), Pitfall 10 (incomplete internal linking), Pitfall 13 (missing sitemap).

### Phase 3: Homepage

**Rationale:** Homepage is the most visited page and the showcase of all section components. Building it third — after foundation and SEO infrastructure exist — means components have correct image patterns, brand tokens, and schema helpers available from the start. Hero component conversion pattern (single CTA, trust microbar, LCP image with priority) is validated here before being reused in other pages.

**Delivers:** Full homepage (hero, services grid, trust bar, testimonials, before/after section, contact CTA, footer), LocalBusiness + AggregateRating + BreadcrumbList schema, Lighthouse audit baseline.

**Addresses:** Before/after gallery (differentiator), testimonials with neighborhood names (differentiator), sticky mobile call bar (differentiator), trust signals adjacent to CTAs (table stakes).

**Avoids:** Pitfall 3 (LCP image priority prop), Pitfall 5 (Tailwind dynamic classes in reusable components).

### Phase 4: Service Pages

**Rationale:** Four service pages share a common template (`services/[slug]/page.tsx`) generated from `lib/data/services.ts`. Building them as a group after the homepage validates the template pattern. FAQ accordion (the one Client Component in this group) is built and tested here.

**Delivers:** 4 service pages (Drain Cleaning, Water Heaters, Sewer Line Repair, Emergency Plumbing), FAQ sections with FAQPage schema, Service schema per page, BreadcrumbList schema, cross-links to service area pages, `FaqAccordion.tsx` Client Component.

**Addresses:** Dedicated service pages (table stakes), FAQ sections (table stakes + differentiator), Emergency plumbing page with 24/7 messaging (table stakes).

**Avoids:** Pitfall 4 (FAQPage schema — `Question`/`Answer` types, correct property names).

### Phase 5: Service Area Pages

**Rationale:** Eight area pages have the highest SEO risk (duplicate content) and require the most content effort. Grouping them as a phase ensures the unique content requirement is treated as a deliverable milestone, not an afterthought. Each page's unique paragraph must be drafted before the page is built, not added later.

**Delivers:** 8 service area pages (Omaha, Bellevue, Papillion, La Vista, Ralston, Elkhorn, Gretna, Bennington), LocalBusiness schema per area page, BreadcrumbList schema, cross-links to service pages, unique content briefs per city.

**Addresses:** Service area pages (table stakes), localized area page content (differentiator), internal linking matrix completion.

**Avoids:** Pitfall 2 (thin/duplicate content — write unique content briefs before building), Pitfall 10 (internal link gaps).

### Phase 6: About and Contact Pages + Form Delivery

**Rationale:** About and Contact pages have no dependencies on service or area content. Contact page includes the form, which requires Resend API key configuration in Vercel — this must be tested live immediately on first deploy, not deferred.

**Delivers:** About page (owner story, credentials, team trust signals), Contact page with ContactForm component, `/api/contact` Route Handler, Resend email notification, form validation (React Hook Form + Zod client + server), success/error states.

**Addresses:** About/team page (table stakes), contact form (table stakes), trust signals adjacent to form (table stakes).

**Avoids:** Pitfall 6 (Vercel form failure — test on live deploy immediately, not just locally).

### Phase 7: Manual QA and Verification

**Rationale:** Per NSI global CLAUDE.md requirements, all manual checks are grouped into a final phase. This phase is not complete until signed off by Andrew. Lighthouse must be run against the deployed Vercel URL (not localhost) to catch production-specific issues. Google Rich Results Test validates every schema type.

**Delivers:** Lighthouse 95+ scores confirmed across all four categories on deployed URL, Google Rich Results Test passing for all schema types, all 15 pages verified in browser, form submission tested live end-to-end, sitemap submitted to Google Search Console.

**Addresses:** LCP under 2.5s, CLS under 0.1, Accessibility 95+ (aria-labels on icon buttons), console error check (Best Practices).

**Avoids:** Pitfall 14 (console errors during Lighthouse), Pitfall 8 (icon button accessibility), Pitfall 3 (CLS in production).

### Phase Ordering Rationale

- Data files must precede all pages: `generateStaticParams()` and `generateMetadata()` import from `lib/data/` — no dynamic pages can be built or tested without this source of truth.
- SEO infrastructure before content pages: retrofitting schema helpers, canonical patterns, and OG images after pages are written causes duplicate rework.
- Homepage before service/area pages: validates the component patterns (image sizing, trust bar, section layout) before they are replicated 12 times.
- Service pages before area pages: service pages are simpler (no unique content requirement); area pages have the highest risk and need the content brief process established first.
- Contact form in its own phase: forces live deployment test of Resend before any success state UI is finalized.
- Manual QA last and blocking: project is not done until Lighthouse scores are confirmed on the deployed URL.

### Research Flags

Phases with standard, well-documented patterns — skip `/gsd:research-phase` during planning:
- **Phase 1 (Foundation):** Next.js project scaffold + next/font patterns are thoroughly documented.
- **Phase 3 (Homepage):** Standard Next.js component composition; patterns confirmed in ARCHITECTURE.md.
- **Phase 4 (Service Pages):** Dynamic route + generateStaticParams pattern is well-established.

Phases that may benefit from targeted planning discussion (not full research, but worth a planning note):
- **Phase 2 (SEO Infrastructure):** Schema type requirements are precise and error-prone; review PITFALLS.md Pitfall 4 before implementation.
- **Phase 5 (Area Pages):** Unique content briefs per city should be drafted and reviewed before any code is written — content planning is the work, not development.
- **Phase 6 (Contact Form):** Resend API key setup and Vercel environment variable configuration require manual steps in the Vercel dashboard before the form can be tested.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Constrained by project's existing Next.js + Vercel mandate; choices are standard ecosystem patterns as of August 2025. Tailwind v4 carries MEDIUM risk on typography plugin compatibility — verify before install. |
| Features | HIGH | Table stakes and anti-features are well-established in contractor web design and Core Web Vitals documentation. Differentiators are MEDIUM — competitive landscape of Omaha plumber sites was not directly researched (WebSearch unavailable). |
| Architecture | HIGH | Next.js App Router SSG patterns confirmed directly from nextjs.org documentation index. `generateStaticParams`, `generateMetadata`, `next/font`, Route Handlers all verified. |
| Pitfalls | HIGH for technical, MEDIUM for SEO/market | Next.js/Lighthouse/Tailwind pitfalls are from direct documentation knowledge. Local SEO duplicate content risk is community consensus, not live Google algorithm verification. |

**Overall confidence:** HIGH

### Gaps to Address

- **Tailwind v4 + `@tailwindcss/typography` compatibility:** Training data confirms Tailwind v4 released early 2025 but typography plugin v4 compatibility was not explicitly verified. Run `npm show @tailwindcss/typography version` before starting and fall back to Tailwind v3.4.x if needed.

- **Resend free tier limits:** Training data shows 3,000 emails/month as of 2025 but this may have changed. Verify at resend.com before relying on it for a real client deployment.

- **Omaha competitive content baseline:** Service area page unique content was written for a demo without live research into what Omaha plumber competitors are publishing. For a real client engagement, run a competitive audit of top-ranking Omaha plumber sites to raise differentiator confidence from MEDIUM to HIGH.

- **Version pinning:** All package versions in STACK.md are flagged as training-data estimates. Run the version verification checklist (`npm show [package] version` for each dependency) before scaffolding the project.

---

## Sources

### Primary (HIGH confidence)
- Next.js App Router documentation index (nextjs.org/docs/llms.txt) — `generateStaticParams`, `generateMetadata`, `next/font/google`, Route Handlers, JSON-LD injection pattern, Image component priority/sizes behavior
- `.planning/PROJECT.md` — project constraints (Next.js, SSG, Tailwind, Vercel, Bitter + Nunito Sans, 15-page scope)
- Google Web Vitals specification (web.dev/vitals) — LCP < 2.5s, CLS < 0.1, INP < 200ms thresholds
- schema.org specification — LocalBusiness, Service, FAQPage, AggregateRating, BreadcrumbList required properties and correct field names
- Lighthouse scoring methodology — Performance, Accessibility, Best Practices, SEO audit criteria

### Secondary (MEDIUM confidence)
- Training data (August 2025 cutoff) — Tailwind v4 config-in-CSS change, Resend as Next.js email standard, next-sitemap App Router v4 compatibility, React Hook Form v7 + Zod v3 community adoption
- Google intrusive interstitials policy — popup modal penalties on mobile
- Trade contractor website conversion patterns — phone-first emergency behavior, trust signal placement, form field count recommendations

### Tertiary (LOW confidence)
- Omaha market competitive landscape — not directly researched; fictional demo content; upgrade to MEDIUM via live competitive audit for real client engagement
- Vercel SMTP restrictions — community-documented patterns; specific port restrictions may vary by plan tier

---
*Research completed: 2026-04-05*
*Ready for roadmap: yes*
