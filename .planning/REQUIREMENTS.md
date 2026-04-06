# Requirements: Heartland Plumbing Co.

**Defined:** 2025-04-05
**Core Value:** Every page must load fast, rank well, and convert visitors into phone calls or form submissions.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Performance

- [ ] **PERF-01**: All pages pre-rendered at build time via SSG (zero runtime compute except contact API)
- [ ] **PERF-02**: Fonts (Bitter + Nunito Sans) self-hosted via next/font — no CDN link tags
- [ ] **PERF-03**: All images served as WebP via Next.js Image component with explicit dimensions
- [ ] **PERF-04**: Below-fold images lazy loaded; hero image priority loaded
- [ ] **PERF-05**: Sharp installed for server-side image optimization
- [ ] **PERF-06**: Lighthouse Performance score 95+ on deployed Vercel URL
- [ ] **PERF-07**: Lighthouse Accessibility score 95+ on deployed Vercel URL
- [ ] **PERF-08**: Lighthouse Best Practices score 95+ on deployed Vercel URL
- [ ] **PERF-09**: Lighthouse SEO score 95+ on deployed Vercel URL
- [ ] **PERF-10**: LCP under 2.5s, CLS under 0.1, INP under 200ms

### SEO

- [ ] **SEO-01**: Unique title tag per page (format: [Service/Area] in [City] | Heartland Plumbing Co.)
- [ ] **SEO-02**: Unique meta description per page (150-155 chars, includes keyword + CTA)
- [ ] **SEO-03**: One H1 per page matching primary keyword intent
- [ ] **SEO-04**: Proper heading hierarchy (H1 → H2 → H3, no skipped levels)
- [ ] **SEO-05**: Canonical tag on every page
- [ ] **SEO-06**: Open Graph tags (title, description, image) on every page
- [ ] **SEO-07**: Twitter card meta tags on every page
- [ ] **SEO-08**: LocalBusiness/Plumber schema on homepage
- [ ] **SEO-09**: Service schema on each service page
- [ ] **SEO-10**: FAQPage schema on pages with FAQ sections
- [ ] **SEO-11**: BreadcrumbList schema on all interior pages
- [ ] **SEO-12**: AggregateRating schema where reviews are displayed
- [ ] **SEO-13**: Auto-generated sitemap.xml with all pages
- [ ] **SEO-14**: Proper robots.txt (index important pages, noindex utility pages)
- [ ] **SEO-15**: Internal links: every service page links to related services and area pages
- [ ] **SEO-16**: Internal links: every area page links to all services available in that area
- [ ] **SEO-17**: No orphan pages — every page reachable from navigation or internal links
- [ ] **SEO-18**: URL structure: lowercase, hyphen-separated, descriptive (/services/drain-cleaning, /service-areas/bellevue)

### Conversion

- [ ] **CONV-01**: Click-to-call phone number in header (tel: link, 48x48px tap target)
- [ ] **CONV-02**: Sticky mobile CTA bar with phone number always visible during scroll
- [ ] **CONV-03**: CTA above the fold on every page
- [ ] **CONV-04**: Contact form: name, phone, service needed, zip code (phone is primary field)
- [ ] **CONV-05**: Form submission sends email notification via Resend
- [ ] **CONV-06**: Trust signals (license, insurance, rating, years) adjacent to every CTA and form
- [ ] **CONV-07**: Google review count (312) and star rating (4.9) displayed prominently
- [ ] **CONV-08**: FAQ accordion on service pages using CSS-only details/summary (zero JS)
- [ ] **CONV-09**: Emergency service pages have "Call Now" as primary CTA with prominent phone number

### Content — Homepage

- [ ] **HOME-01**: Hero section adapted from existing HTML prototype (teal + copper brand)
- [ ] **HOME-02**: Services overview section linking to individual service pages
- [ ] **HOME-03**: Trust signals section (25+ years, 312 reviews, licensed, insured)
- [ ] **HOME-04**: Testimonial section with customer quotes (first name + city)
- [ ] **HOME-05**: Service area overview with links to area pages
- [ ] **HOME-06**: Footer with service area list, hours, contact info, social links

### Content — Service Pages

- [ ] **SERV-01**: Drain Cleaning page with unique content, FAQ, CTA
- [ ] **SERV-02**: Water Heater page with unique content, FAQ, CTA
- [ ] **SERV-03**: Sewer Line Repair page with unique content, FAQ, CTA
- [ ] **SERV-04**: Emergency Plumbing page with unique content, urgent CTA
- [ ] **SERV-05**: Each service page describes the service, common problems, local context, and pricing guidance
- [ ] **SERV-06**: Each service page links to related services and relevant area pages

### Content — Service Area Pages

- [ ] **AREA-01**: Omaha page with genuinely unique local content
- [ ] **AREA-02**: Bellevue page with genuinely unique local content
- [ ] **AREA-03**: Papillion page with genuinely unique local content
- [ ] **AREA-04**: La Vista page with genuinely unique local content
- [ ] **AREA-05**: Ralston page with genuinely unique local content
- [ ] **AREA-06**: Elkhorn page with genuinely unique local content
- [ ] **AREA-07**: Gretna page with genuinely unique local content
- [ ] **AREA-08**: Bennington page with genuinely unique local content
- [ ] **AREA-09**: Each area page includes local landmarks, neighborhoods, and specific plumbing context
- [ ] **AREA-10**: Each area page links to all services available in that area

### Content — About & Contact

- [ ] **ABOUT-01**: About page with company story, founding, mission
- [ ] **ABOUT-02**: Team/credentials section (license number, insurance, certifications)
- [ ] **CONTACT-01**: Standalone contact page with form, map placeholder, hours, address
- [ ] **CONTACT-02**: Form validation (required fields, phone format)

### Layout & Navigation

- [ ] **NAV-01**: Sticky header with logo, navigation links, phone number
- [ ] **NAV-02**: Mobile hamburger menu with smooth open/close
- [ ] **NAV-03**: Services dropdown in navigation
- [ ] **NAV-04**: Breadcrumb navigation on all interior pages
- [ ] **NAV-05**: Consistent footer across all pages
- [ ] **NAV-06**: Mobile-first responsive design (all breakpoints)

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Analytics & Tracking

- **ANLYT-01**: Google Analytics 4 integration
- **ANLYT-02**: Google Search Console verification
- **ANLYT-03**: Call tracking integration
- **ANLYT-04**: Form conversion tracking

### Content Expansion

- **BLOG-01**: Blog/article section for content marketing
- **BLOG-02**: Before/after project gallery with images
- **PROMO-01**: Seasonal promotions banner

### Integrations

- **INTG-01**: Google Business Profile link/widget
- **INTG-02**: Online scheduling/booking integration
- **INTG-03**: Google Sheets CRM logging for form submissions

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Blog / content marketing | Not needed for portfolio demo |
| Online booking / scheduling | Demo only — no real appointments |
| Payment processing | Not applicable for a plumber site |
| Live chat widget | Hurts Lighthouse performance, anti-feature per research |
| Hero video background | LCP killer per research — use static images |
| Google Maps iframe | Performance cost, use static map placeholder |
| Parallax scrolling effects | Performance anti-feature per research |
| Popup overlays / modals | Conversion anti-pattern per research |
| Third-party review widgets | Performance cost — display reviews statically |
| n8n automation workflows | Demo site doesn't need real automations |
| Analytics dashboard | Defer to real client deployment |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| PERF-01 | Phase 1 | Complete |
| PERF-02 | Phase 1 | Complete |
| PERF-03 | Phase 1 | Complete |
| PERF-04 | Phase 1 | Complete |
| PERF-05 | Phase 1 | Complete |
| PERF-06 | Phase 7 | Pending |
| PERF-07 | Phase 7 | Pending |
| PERF-08 | Phase 7 | Pending |
| PERF-09 | Phase 7 | Pending |
| PERF-10 | Phase 7 | Pending |
| SEO-01 | Phase 2 | Complete |
| SEO-02 | Phase 2 | Complete |
| SEO-03 | Phase 2 | Complete |
| SEO-04 | Phase 2 | Complete |
| SEO-05 | Phase 2 | Complete |
| SEO-06 | Phase 2 | Complete |
| SEO-07 | Phase 2 | Complete |
| SEO-08 | Phase 2 | Complete |
| SEO-09 | Phase 2 | Complete |
| SEO-10 | Phase 2 | Complete |
| SEO-11 | Phase 2 | Complete |
| SEO-12 | Phase 2 | Complete |
| SEO-13 | Phase 2 | Complete |
| SEO-14 | Phase 2 | Complete |
| SEO-15 | Phase 2 | Complete |
| SEO-16 | Phase 2 | Complete |
| SEO-17 | Phase 2 | Complete |
| SEO-18 | Phase 1 | Complete |
| CONV-01 | Phase 1 | Complete |
| CONV-02 | Phase 1 | Complete |
| CONV-03 | Phase 3 | Complete |
| CONV-04 | Phase 6 | Pending |
| CONV-05 | Phase 6 | Pending |
| CONV-06 | Phase 3 | Complete |
| CONV-07 | Phase 3 | Complete |
| CONV-08 | Phase 4 | Complete |
| CONV-09 | Phase 4 | Complete |
| HOME-01 | Phase 3 | Complete |
| HOME-02 | Phase 3 | Complete |
| HOME-03 | Phase 3 | Complete |
| HOME-04 | Phase 3 | Complete |
| HOME-05 | Phase 3 | Complete |
| HOME-06 | Phase 3 | Complete |
| SERV-01 | Phase 4 | Complete |
| SERV-02 | Phase 4 | Complete |
| SERV-03 | Phase 4 | Complete |
| SERV-04 | Phase 4 | Complete |
| SERV-05 | Phase 4 | Complete |
| SERV-06 | Phase 4 | Complete |
| AREA-01 | Phase 5 | Pending |
| AREA-02 | Phase 5 | Pending |
| AREA-03 | Phase 5 | Pending |
| AREA-04 | Phase 5 | Pending |
| AREA-05 | Phase 5 | Pending |
| AREA-06 | Phase 5 | Pending |
| AREA-07 | Phase 5 | Pending |
| AREA-08 | Phase 5 | Pending |
| AREA-09 | Phase 5 | Pending |
| AREA-10 | Phase 5 | Pending |
| ABOUT-01 | Phase 6 | Pending |
| ABOUT-02 | Phase 6 | Pending |
| CONTACT-01 | Phase 6 | Pending |
| CONTACT-02 | Phase 6 | Pending |
| NAV-01 | Phase 1 | Complete |
| NAV-02 | Phase 1 | Complete |
| NAV-03 | Phase 1 | Complete |
| NAV-04 | Phase 3 | Complete |
| NAV-05 | Phase 1 | Complete |
| NAV-06 | Phase 1 | Complete |

**Coverage:**
- v1 requirements: 55 total
- Mapped to phases: 55
- Unmapped: 0

---
*Requirements defined: 2025-04-05*
*Last updated: 2026-04-05 — Traceability populated by roadmapper*
