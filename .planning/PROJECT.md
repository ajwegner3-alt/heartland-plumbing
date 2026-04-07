# Heartland Plumbing Co. Website

## What This Is

A 16-page high-performance Next.js portfolio site for Heartland Plumbing Co., a fictional plumbing contractor in Omaha, NE. Built with SSG, full SEO infrastructure (5 schema types, unique metadata per page), WCAG AA compliance, security headers, and conversion-optimized design. Demonstrates NSI's capability to build trade contractor websites that load fast, rank well, and convert.

## Core Value

Every page must load fast, rank well, and convert visitors into phone calls or form submissions. Performance and conversion are non-negotiable — design serves these goals.

## Requirements

### Validated

- Homepage with hero, services grid, trust signals, testimonials, area overview — v1.0
- Sticky header with click-to-call, mobile hamburger, services dropdown — v1.0
- 4 service pages with unique content, CSS-only FAQ, schema, cross-links — v1.0
- 8 service area pages with genuinely unique local content per city — v1.0
- About page with company story, owner spotlight, credentials — v1.0
- Contact form with Resend email, honeypot, inline validation — v1.0
- 5 JSON-LD schema types (LocalBusiness, Service, FAQPage, BreadcrumbList, AggregateRating) — v1.0
- Full SEO metadata: unique titles, descriptions, canonicals, OG, Twitter cards — v1.0
- Sitemap (17 URLs), robots.txt, branded OG image — v1.0
- WCAG AA color contrast compliance — v1.0
- Security headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options) — v1.0
- GTM placeholder (env var gated) — v1.0
- Mobile-first responsive design, sticky mobile CTA — v1.0
- Trust signals adjacent to every CTA — v1.0

### Active

(No active milestone — v1.0 shipped)

### Out of Scope

- Blog / content marketing pages — not needed for portfolio demo
- Online booking / scheduling integration — demo only
- Payment processing — not applicable
- Google Business Profile integration — demo data only
- Call tracking integration — demo site
- Analytics dashboard — defer to when site goes live for a real client
- n8n automation workflows — demo site doesn't need real automations
- Live chat widget — hurts Lighthouse performance
- Hero video background — LCP killer
- Google Maps iframe — performance cost, use static map placeholder
- Parallax scrolling effects — performance anti-feature
- Popup overlays / modals — conversion anti-pattern
- Third-party review widgets — performance cost, display reviews statically

## Context

Shipped v1.0 with 4,360 LOC TypeScript/CSS across 108 files.
Tech stack: Next.js 16, Tailwind v4, schema-dts, Resend, Vercel.
Deployed at heartland.nsintegrations.com.
86 commits over 2 days (2026-04-05 to 2026-04-06).
Andrew verified all pages on live deployment and approved.

## Constraints

- **Hosting**: Vercel — deployed via GitHub integration
- **Framework**: Next.js with SSG (24 pre-rendered pages)
- **Styling**: Tailwind CSS v4 with @theme brand tokens
- **Typography**: Bitter (display) + Nunito Sans (body) via next/font
- **Images**: Local hero image, Next.js Image component, AVIF/WebP
- **Forms**: Resend for email notification (env var gated)
- **SEO**: Every page has unique metadata, schema, and proper heading hierarchy
- **Accessibility**: WCAG AA color contrast compliance
- **Security**: CSP, HSTS, X-Frame-Options, X-Content-Type-Options headers

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js over static HTML | Easier to maintain, Image component, SSG performance | Good |
| Tailwind CSS v4 | Fast dev, consistent spacing, purged CSS | Good |
| Resend for email | Gmail SMTP blocked on Vercel serverless | Good |
| Adapt existing hero HTML | Already designed and polished — port to Next.js | Good |
| Portfolio demo (not real client) | Creative freedom without client approval loops | Good |
| JSON-LD via dangerouslySetInnerHTML | next/Script causes RSC payload duplication | Good |
| Plumber @type for schema | More specific than generic LocalBusiness | Good |
| CSS-only FAQ accordion | Zero JS, no hydration cost via details/summary | Good |
| No component libraries | Client JS budget under 30KB — no shadcn/ui, no framer-motion | Good |
| Local hero image | Unsplash CDN added 2+ network hops to LCP | Good |
| Copper scale shifted darker | WCAG AA compliance (3.78:1 -> 5.73:1 on white) | Good |
| GTM gated behind env var | Placeholder ID caused failing 404 requests | Good |
| Security headers in next.config.ts | CSP, HSTS, X-Frame-Options for audit compliance | Good |

---
*Last updated: 2026-04-06 after v1.0 milestone*
