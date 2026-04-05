# Roadmap: Heartland Plumbing Co.

## Overview

Build a high-performance Next.js portfolio demo for Heartland Plumbing Co. — a fictional Omaha plumber — that demonstrates NSI's capability to deliver sites that load fast, rank well, and convert visitors into calls. Seven phases take the project from scaffolded Next.js skeleton to a verified 15-page live site with Lighthouse 95+ scores confirmed on the deployed Vercel URL.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation** - Next.js scaffold, brand tokens, layout shell, data files, font/image patterns
- [ ] **Phase 2: SEO Infrastructure** - Schema generators, metadata API, sitemap, robots.txt, OG images, internal link matrix
- [ ] **Phase 3: Homepage** - Full homepage with hero, services grid, trust bar, testimonials, area overview, and footer
- [ ] **Phase 4: Service Pages** - Four dedicated service pages generated from data, with FAQ, schema, and cross-links
- [ ] **Phase 5: Service Area Pages** - Eight area pages with unique local content, schema, and cross-links
- [ ] **Phase 6: About and Contact** - About page, contact form with Resend email, form validation, live test
- [ ] **Phase 7: Manual QA and Verification** - Lighthouse 95+ confirmed on deployed URL, schema validated, all pages verified

## Phase Details

### Phase 1: Foundation
**Goal**: The project skeleton is live on Vercel, renders correctly at every viewport, and all patterns that prevent Lighthouse failure are locked in before any content page is built.
**Depends on**: Nothing (first phase)
**Requirements**: PERF-01, PERF-02, PERF-03, PERF-04, PERF-05, NAV-01, NAV-02, NAV-03, NAV-05, NAV-06, CONV-01, CONV-02, SEO-18
**Success Criteria** (what must be TRUE):
  1. Visiting the Vercel deploy URL returns a working Next.js page — no 404, no build errors
  2. Header is sticky, shows the phone number as a tappable tel: link, and collapses to a hamburger menu on mobile
  3. A sticky "Call Now" bar is visible at the bottom of the screen on mobile and hidden on desktop
  4. Bitter and Nunito Sans render correctly via next/font with no render-blocking requests visible in DevTools
  5. All URLs follow the lowercase hyphen-separated pattern (no trailing slashes, no uppercase)
**Plans**: TBD

Plans:
- [ ] 01-01: Initialize Next.js 15 project with TypeScript, Tailwind CSS, Sharp, and all required dependencies; configure next.config.ts; push to GitHub and connect to Vercel
- [ ] 01-02: Build layout shell — root layout.tsx with next/font, Header (Server) + MobileNav (Client), Footer, and mobile sticky CTA bar; brand token configuration in Tailwind
- [ ] 01-03: Create TypeScript data files (lib/data/services.ts and lib/data/service-areas.ts) with all content, FAQ, metadata, and internal link arrays for all 4 services and 8 areas

### Phase 2: SEO Infrastructure
**Goal**: Every page on the site can generate correct, unique SEO metadata, valid JSON-LD schema, and proper canonical/OG tags using centralized TypeScript generators — before any content page is written.
**Depends on**: Phase 1
**Requirements**: SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, SEO-06, SEO-07, SEO-08, SEO-09, SEO-10, SEO-11, SEO-12, SEO-13, SEO-14, SEO-15, SEO-16, SEO-17
**Success Criteria** (what must be TRUE):
  1. Running `npm run build` generates sitemap.xml with all 15 page URLs and a valid robots.txt
  2. The homepage JSON-LD contains a valid LocalBusiness schema with correct address, phone, rating, and hours
  3. Each schema generator function (Service, FAQPage, BreadcrumbList, AggregateRating) returns typed output with no missing required fields
  4. Calling generateMetadata() for any service or area page returns a unique title tag, meta description, canonical URL, and Open Graph image
**Plans**: TBD

Plans:
- [ ] 02-01: Build lib/schema/*.ts typed schema generators for LocalBusiness, Service, FAQPage, BreadcrumbList, and AggregateRating; wire JSON-LD injection pattern into page template
- [ ] 02-02: Configure next-sitemap, write public/robots.txt, create OG image assets (1200x630px), implement generateMetadata() canonical URL pattern and Open Graph tags in the root layout and page templates

### Phase 3: Homepage
**Goal**: A visitor landing on the homepage sees a fast-loading, professional page that communicates trust, lists services, shows reviews, and offers multiple paths to contact — all above and below the fold.
**Depends on**: Phase 2
**Requirements**: HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, HOME-06, CONV-03, CONV-06, CONV-07, NAV-04
**Success Criteria** (what must be TRUE):
  1. The hero section loads with the teal + copper brand, a primary CTA above the fold, and the LCP image marked priority (no layout shift on load)
  2. A services grid section lists all four services with links to their dedicated pages
  3. A trust signals section shows "25+ Years", "312 Reviews", "4.9 Stars", "Licensed & Insured" adjacent to a CTA
  4. A testimonials section displays at least three customer quotes with first name and city
  5. The footer is present with service area links, hours, address, phone, and social links
**Plans**: TBD

Plans:
- [ ] 03-01: Build homepage hero section adapted from existing HTML prototype — port teal/copper design to Next.js components with correct next/image priority prop, trust microbar, and primary CTA
- [ ] 03-02: Build services grid, trust signals section, testimonials block, service area overview section, and wire all internal links; inject LocalBusiness + AggregateRating schema

### Phase 4: Service Pages
**Goal**: All four service pages exist as pre-rendered routes, each with unique content, an FAQ accordion, schema markup, and cross-links — so a visitor searching for any specific service finds a complete, relevant page.
**Depends on**: Phase 3
**Requirements**: SERV-01, SERV-02, SERV-03, SERV-04, SERV-05, SERV-06, CONV-08, CONV-09
**Success Criteria** (what must be TRUE):
  1. Navigating to /services/drain-cleaning, /services/water-heaters, /services/sewer-line-repair, and /services/emergency-plumbing each returns a unique, pre-rendered page
  2. Each service page has an FAQ accordion with at least three questions, and clicking a question expands the answer with zero JavaScript loaded for the toggle
  3. The Emergency Plumbing page shows "Call Now" as the primary CTA with the 24/7 emergency phone number prominently displayed
  4. Each service page contains links to related services and to the service area pages
**Plans**: TBD

Plans:
- [ ] 04-01: Build services/[slug]/page.tsx dynamic route with generateStaticParams and generateMetadata; create ServicePage layout component with content, trust bar, and CTA sections
- [ ] 04-02: Build FaqAccordion.tsx as a CSS-only Client Component using details/summary; wire FAQPage schema and Service schema per page; verify all four pages cross-link correctly

### Phase 5: Service Area Pages
**Goal**: All eight service area pages exist with genuinely unique local content for each city — not city-name swaps — so each page provides distinct value and avoids thin content penalties.
**Depends on**: Phase 4
**Requirements**: AREA-01, AREA-02, AREA-03, AREA-04, AREA-05, AREA-06, AREA-07, AREA-08, AREA-09, AREA-10
**Success Criteria** (what must be TRUE):
  1. Navigating to /service-areas/omaha, /service-areas/bellevue, /service-areas/papillion, /service-areas/la-vista, /service-areas/ralston, /service-areas/elkhorn, /service-areas/gretna, and /service-areas/bennington each returns a distinct pre-rendered page
  2. Each area page contains at least one paragraph with city-specific context — local neighborhoods, area characteristics, or area-specific plumbing facts — not shared with any other area page
  3. Each area page links to all four service pages available in that area
  4. No area page shares a title tag, meta description, or H1 with any other page on the site
**Plans**: TBD

Plans:
- [ ] 05-01: Write unique content briefs for all 8 service area cities (local context paragraphs, area-specific H1 and FAQ); review for duplicate content before any code is written
- [ ] 05-02: Build service-areas/[slug]/page.tsx dynamic route with generateStaticParams and generateMetadata; wire LocalBusiness schema, BreadcrumbList, and all cross-links to service pages

### Phase 6: About and Contact
**Goal**: A visitor can learn who Heartland Plumbing is and submit a contact form that delivers an email notification — tested live on the deployed Vercel URL, not just locally.
**Depends on**: Phase 5
**Requirements**: ABOUT-01, ABOUT-02, CONTACT-01, CONTACT-02, CONV-04, CONV-05
**Success Criteria** (what must be TRUE):
  1. The About page displays the company story, founding context, license number PL-28541, insurance status, and team credentials
  2. The Contact page shows the form with name, phone, service needed, and zip code fields — phone is the first prominent field
  3. Submitting the form with valid data sends an email notification via Resend and shows a success state to the user
  4. Submitting the form with missing required fields or a malformed phone number shows inline validation errors without a page reload
**Plans**: TBD

Plans:
- [ ] 06-01: Build About page with company story, credentials section, license/insurance trust signals, and team narrative
- [ ] 06-02: Build ContactForm.tsx (Client Component) with React Hook Form + Zod validation; build /api/contact Route Handler with Resend; add Resend API key to Vercel dashboard; test live form submission end-to-end

### Phase 7: Manual QA and Verification
**Goal**: Every page on the live Vercel deployment is verified by a human, Lighthouse scores are confirmed at 95+ across all four categories, and all schema types pass Google's Rich Results Test — before the project is marked complete.
**Depends on**: Phase 6
**Requirements**: PERF-06, PERF-07, PERF-08, PERF-09, PERF-10
**Success Criteria** (what must be TRUE):
  1. Lighthouse run against the deployed Vercel URL (not localhost) returns 95+ on Performance, Accessibility, Best Practices, and SEO for the homepage
  2. Google Rich Results Test returns passing results for LocalBusiness, Service, FAQPage, BreadcrumbList, and AggregateRating schema types
  3. All 15 pages are manually visited in a browser and render correctly with no console errors
  4. The live contact form is submitted with real data and the email notification arrives in the inbox
  5. The sitemap.xml is submitted to Google Search Console and shows all 15 URLs indexed
**Plans**: TBD

Plans:
- [ ] 07-01: Run Lighthouse on deployed URL for all key pages; document scores; fix any failing audits (aria-labels, console errors, CLS); re-run until 95+ confirmed
- [ ] 07-02: Run Google Rich Results Test on all schema types; manually browse all 15 pages; test live form submission; submit sitemap.xml to Google Search Console

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6 → 7

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 0/3 | Not started | - |
| 2. SEO Infrastructure | 0/2 | Not started | - |
| 3. Homepage | 0/2 | Not started | - |
| 4. Service Pages | 0/2 | Not started | - |
| 5. Service Area Pages | 0/2 | Not started | - |
| 6. About and Contact | 0/2 | Not started | - |
| 7. Manual QA and Verification | 0/2 | Not started | - |
