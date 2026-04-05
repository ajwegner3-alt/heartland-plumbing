# Heartland Plumbing Co. Website

## What This Is

A portfolio demo website for Heartland Plumbing Co., a fictional plumbing contractor in Omaha, NE. Built as a high-performance Next.js site optimized for Google Lighthouse 95+ scores, SEO dominance, and lead conversion. Showcases NSI's capability to build trade contractor websites.

## Core Value

Every page must load fast, rank well, and convert visitors into phone calls or form submissions. Performance and conversion are non-negotiable — design serves these goals.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Homepage with hero section (adapted from existing HTML prototype)
- [ ] Sticky header with click-to-call phone number on mobile
- [ ] 4 dedicated service pages: Drain Cleaning, Water Heaters, Sewer Line Repair, Emergency Plumbing
- [ ] 8 service area pages: Omaha, Bellevue, Papillion, La Vista, Ralston, Elkhorn, Gretna, Bennington
- [ ] About / Team page with company story and credentials
- [ ] Contact page with form (name, phone, service needed, zip code)
- [ ] Email notification on form submission
- [ ] Schema markup on every page (LocalBusiness, Service, FAQPage, BreadcrumbList, AggregateRating)
- [ ] Full SEO metadata: unique title tags, meta descriptions, canonical tags, Open Graph, Twitter cards
- [ ] Google Lighthouse scores 95+ across all categories (Performance, Accessibility, Best Practices, SEO)
- [ ] Mobile-first responsive design
- [ ] Internal linking strategy: service pages ↔ service area pages ↔ related services
- [ ] Trust signals adjacent to every CTA (license, insurance, rating, years in business)
- [ ] FAQ sections with FAQPage schema on service pages
- [ ] Image optimization (WebP, lazy loading, Next.js Image component)

### Out of Scope

- Blog / content marketing pages — not needed for portfolio demo
- Online booking / scheduling integration — demo only
- Payment processing — not applicable
- Google Business Profile integration — demo data only
- Call tracking integration — demo site
- Analytics dashboard — defer to when site goes live for a real client
- n8n automation workflows — demo site doesn't need real automations

## Context

- Hero section already designed as standalone HTML at `google-business-profile-htmls/heartland-plumbing-omaha.html`
- Brand established: Teal (#1a7a6e) primary, Copper (#b8733a) accent, Bitter (display) + Nunito Sans (body)
- Business details: 4521 S 84th St, Omaha NE 68127 | (402) 555-0147 | 4.9★ / 312 reviews | License #PL-28541 | 25+ years
- Emergency line: (402) 555-0148 (24/7)
- Hours: Mon-Fri 7am-6pm, Sat 8am-2pm
- Service areas: Omaha, Bellevue, Papillion, La Vista, Ralston, Elkhorn, Gretna, Bennington
- This is a portfolio piece for NSI — demonstrates web design capability for trade contractors
- All content is realistic but fictional (placeholder data based on hero HTML)

## Constraints

- **Hosting**: Vercel — deploy via GitHub integration
- **Framework**: Next.js with static site generation (SSG) for maximum performance
- **Styling**: Tailwind CSS
- **Performance**: Lighthouse 95+ on all categories — no heavy JS, no unnecessary client-side rendering
- **Typography**: Google Fonts (Bitter + Nunito Sans) — preload for performance
- **Images**: WebP format, Next.js Image component, lazy loading below fold
- **Forms**: Server-side email notification (no third-party form services)
- **SEO**: Every page must have unique metadata, schema markup, and proper heading hierarchy

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js over static HTML | Easier to maintain, expand, Image component for auto-optimization, SSG gives near-static performance | — Pending |
| Tailwind CSS | Fast development, consistent spacing/sizing, purges unused CSS for small bundles | — Pending |
| Email-only form handling | Simple, no external dependencies, sufficient for portfolio demo | — Pending |
| Adapt existing hero HTML | Hero section already designed and polished — port to Next.js components rather than redesign | — Pending |
| Portfolio demo (not real client) | All business data is fictional — allows creative freedom without client approval loops | — Pending |

---
*Last updated: 2025-04-05 after initialization*
