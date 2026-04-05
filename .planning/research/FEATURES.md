# Feature Landscape

**Domain:** Plumbing contractor website (local service business)
**Project:** Heartland Plumbing Co. — Omaha, NE portfolio demo
**Researched:** 2026-04-05
**Confidence:** HIGH for table stakes and anti-features (well-established domain); MEDIUM for differentiators (competitive landscape varies by market)

---

## Table Stakes

Features users expect from a plumbing contractor website. Missing any of these = users bounce immediately or call a competitor.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Prominent phone number (header, hero, sticky mobile) | Emergency plumbing = phone-first. Users expect to call, not fill forms. | Low | Use `tel:` link. Minimum 48×48px tap target. Sticky on mobile. |
| Click-to-call on mobile | 60%+ of local service searches happen on mobile, often in an emergency | Low | `<a href="tel:...">` — no special library needed |
| Hero with clear headline + CTA | Sets context immediately: "Am I in the right place? Can they help me?" | Low | Above the fold, no JS required, single CTA |
| Services listed clearly | Users need to confirm the contractor does the specific work they need | Low | Cards or list, not a wall of text |
| Dedicated service pages (one per service) | SEO + user intent matching. "Drain cleaning Omaha" needs a drain cleaning page. | Medium | 4 pages: Drain Cleaning, Water Heaters, Sewer Line Repair, Emergency Plumbing |
| Service area declaration | "Do you serve my neighborhood?" is the first question locals ask | Low | List of cities/neighborhoods on homepage and contact page |
| Dedicated service area pages | Local SEO ranking requires geo-targeted pages, not just mentions | Medium | 8 pages: Omaha, Bellevue, Papillion, La Vista, Ralston, Elkhorn, Gretna, Bennington |
| Contact form | Not every user is ready to call — capture leads who prefer async | Low | Name, phone, service needed, zip — 4 fields max |
| Business hours | "Are they open right now?" — critical for emergency decisions | Low | Footer + contact page. Show emergency line separately. |
| Physical address / service area map reference | Establishes legitimacy and local presence | Low | Footer and contact page minimum |
| Trust signals (license, insurance, years in business) | Trade contractors must prove legitimacy — fear of unlicensed work is real | Low | License #PL-28541, 25+ years, fully insured |
| Google reviews / star rating | Social proof is mandatory. No reviews = suspect. | Low | Display 4.9★ / 312 reviews. Aggregate rating schema. |
| Mobile-first responsive design | Majority of searches happen on mobile, especially emergencies | Medium | Must work perfectly on 375px screens |
| Fast load time (LCP < 2.5s) | Google ranks it; users abandon slow sites within 3 seconds | Medium | SSG, WebP images, preload fonts, minimal JS |
| HTTPS / SSL | Browsers flag HTTP sites. Users trust green padlock. | None | Vercel handles this automatically |
| Unique title tags + meta descriptions per page | Required for Google to understand and rank each page | Low | Format: `[Service] in [City] \| Heartland Plumbing` |
| Schema markup (LocalBusiness, Service, FAQ, Breadcrumb, AggregateRating) | Rich results, local pack eligibility, review stars in SERPs | Medium | JSON-LD, one `<script>` block per page |
| Internal linking (service pages ↔ area pages) | Passes PageRank, helps Google understand site structure, keeps users exploring | Low | Each service page links to relevant area pages and vice versa |
| About / Team page | Homeowners want to know who will enter their home | Low | Owner photo, story, credentials, certifications |
| Footer with key info | Navigation anchor, trust signal, SEO text opportunity | Low | Address, phone, hours, license, service areas, nav links |
| Emergency plumbing page with 24/7 messaging | Emergency searches have extreme urgency — users need immediate confidence | Low | Prominent 24/7 number, "We answer 24/7" messaging |
| FAQ sections on service pages | Addresses objections, supports voice search, earns FAQPage rich results | Low | 4-6 questions per service page |

---

## Differentiators

Features that separate high-performing sites from average ones. Not expected by users, but build confidence and conversions when present.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Before/after project photo gallery | Visual proof of workmanship. Homeowners respond strongly to real work photos. | Low–Medium | JavaScript slider or CSS-only comparison. Use realistic placeholder images (WebP). |
| Sticky "Call Now" bar on mobile (bottom) | Keeps the primary CTA always visible while scrolling — proven conversion lift | Low | Fixed bottom bar on mobile only. Include phone + "Get Estimate" link. |
| Estimate request form distinct from contact form | Signals the user is a higher-intent lead — gets them into a different follow-up flow | Low | Same 4-field structure, different copy and confirmation message |
| Trust badges row (BBB, licensed, insured, local) | Reduces anxiety at the exact moment users are deciding to call | Low | Icon row near hero CTA and contact form |
| Testimonial quotes with name and neighborhood | Localized social proof ("— Mike T., Papillion") feels more credible than anonymous | Low | 3–5 quotes, displayed in a visually distinct block |
| Service-specific FAQ with FAQ schema | Captures long-tail voice search queries ("how much does drain cleaning cost in Omaha") | Low–Medium | Unique FAQ per service page, not copy-pasted |
| Localized content on service area pages | Genuine neighborhood context (landmarks, common plumbing issues in that area) beats thin pages | Medium | Avoid template cloning — each page needs at least one unique paragraph |
| "Why choose us" section with specifics | Replaces generic marketing language with verifiable claims | Low | E.g., "Same-day appointments," "Upfront pricing before we start," "25+ years serving Omaha" |
| Urgency indicators on emergency page | "Technicians available now in [service area]" reinforces 24/7 availability | Low | Static text + prominent phone. Do not fake real-time status. |
| Clear pricing transparency signals | "We provide written estimates before any work begins" reduces fear of surprise bills | Low | Text + icon, not actual price lists |
| Next.js Image component with proper sizing | Automatic WebP + AVIF serving, responsive srcset, lazy loading — invisible to user but critical for Core Web Vitals | Low–Medium | Already in the plan; implement correctly (fill vs fixed sizing) |
| Open Graph / Twitter card meta per page | Professional appearance when links are shared in Facebook groups, NextDoor, etc. — common referral channel for local trades | Low | `og:title`, `og:description`, `og:image` per page |
| Breadcrumb navigation with schema | Improves UX on deep pages; adds sitelinks breadcrumbs in SERPs | Low | `BreadcrumbList` JSON-LD, visual breadcrumb component |
| Single-page smooth anchor navigation on homepage | Feels polished and intentional without heavy JavaScript | Low | Native CSS `scroll-behavior: smooth` |
| Keyboard navigation and skip-to-content | Accessibility = Lighthouse Accessibility score 95+. Also serves screen reader users. | Low | `<a class="skip-link" href="#main">Skip to content</a>` |
| ARIA labels on interactive elements | Required for Lighthouse accessibility score target | Low | Buttons, forms, nav items |
| Print stylesheet for quote/estimate pages | Small touch, but appreciated by users who print estimates to discuss with spouse | Low | `@media print` CSS block |
| Canonical tags on all pages | Prevents duplicate content penalties, especially on service area pages with similar structure | Low | `<link rel="canonical" href="..." />` in Next.js head |
| robots.txt + sitemap.xml | Tells Google what to crawl; sitemap speeds up indexing of all 15+ pages | Low | Next.js `next-sitemap` package or custom route |

---

## Anti-Features

Features to deliberately NOT build for this project. Common mistakes in contractor websites that hurt performance, conversion, or maintainability.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Heavy hero video / background video | Destroys LCP score. Single biggest cause of slow contractor sites. | Use WebP hero image with CSS overlay. Teal/copper brand gradient if no photo. |
| Chatbot / live chat widget (third-party, e.g. Drift, Intercom) | Adds 50–200KB+ JavaScript, CLS impact, and zero value for emergency callers | Sticky call bar is the equivalent with zero JS overhead |
| Parallax scrolling effects | Causes CLS and janky performance on mobile. Feels gimmicky for a trade business. | Simple fade-in animations with `IntersectionObserver` if any animation at all |
| Social media feed embeds | Third-party scripts tank performance. Instagram embed = ~150KB extra JS. | Link to profiles in footer only. No embedded feeds. |
| Cookie consent banner (GDPR-style) | Not legally required for US-only local business demo with no tracking pixels | Skip entirely for this demo. Note in FUTURE_DIRECTIONS.md if real analytics added later. |
| Pricing tables with real numbers | Plumbing pricing varies widely by job. Publishing rates either scares customers or creates price anchoring problems. | "Call for a free estimate" + "upfront written estimate before any work begins" |
| Blog / content pages | Out of scope for this demo. Adds build complexity for zero demo value. | Stub a "Resources" link in nav pointing to `/blog` with a 404 or coming-soon if needed |
| Online booking / scheduling integration | External dependency, often breaks, requires real availability data. Demo site can't deliver this authentically. | Contact form as the lead capture mechanism |
| Map embed (Google Maps iframe) | Google Maps iframe adds significant page weight and CLS. Not worth it for a demo. | Text list of service areas. Link to Google Maps profile in footer if desired. |
| Animated logo / splash screen | Delays first interaction. Users who arrived in an emergency will abandon immediately. | Static logo, instant above-fold content |
| Sticky header that hides on scroll-down | Hides the phone number. For contractor sites, header should always be reachable. | Static sticky header that stays visible at all times |
| Modal popups / exit-intent overlays | Annoying on mobile, penalized by Google for intrusive interstitials | Inline CTAs and sticky call bar handle conversions without popups |
| Multiple competing CTAs in the hero | "Call Now" + "Get Estimate" + "See Our Work" + "Read Reviews" = decision paralysis | One primary CTA in the hero (Call Now), secondary CTA as text link |
| Auto-play audio | Never acceptable. Ruins mobile experience. | — |
| Fake "online now" or "X visitors viewing this" social proof | Destroys trust when spotted. Trade customers are skeptical. | Real review count and star rating from verified platform |
| Generic stock photo people (blue stock-photo plumbers) | Immediately signals "not a real local business" to skeptical homeowners | Use illustrated/icon elements or realistic job-site photography (even AI-generated realistic photos are better than obvious stock) |
| Unminified, unoptimized JavaScript | Kills performance score. Common in WordPress themes. | Next.js handles bundle optimization; keep client-side JS minimal |
| Separate mobile site (m.dot) | Outdated pattern. Causes duplicate content issues. | Single responsive Next.js app |

---

## Feature Dependencies

```
Homepage hero CTA
  → Sticky header with phone (required for mobile conversion)
  → Trust signals row (license, rating, years — must be adjacent)

Service pages
  → FAQ sections (each page needs unique questions)
  → Internal links to service area pages
  → Schema: Service + FAQPage + BreadcrumbList

Service area pages
  → Internal links back to service pages
  → Localized content (at least 1 unique paragraph each)
  → Schema: LocalBusiness + BreadcrumbList

Contact page
  → Form with email notification (server action or API route)
  → Trust signals adjacent to form

Emergency Plumbing page
  → Prominent 24/7 phone number (different from main line: 402-555-0148)
  → Minimal friction — no form above the fold, phone is the CTA

Schema coverage (required for Lighthouse SEO 95+)
  → Homepage: LocalBusiness + AggregateRating + BreadcrumbList
  → Service pages: Service + FAQPage + BreadcrumbList + AggregateRating
  → Area pages: LocalBusiness (address variant) + BreadcrumbList
  → Contact: LocalBusiness + BreadcrumbList

Performance (Lighthouse 95+)
  → No heavy third-party scripts
  → Next.js Image for every img tag
  → Google Fonts preloaded (Bitter + Nunito Sans)
  → SSG for all pages (no client-side data fetching)
  → Tailwind CSS purged (automatic with Next.js build)
```

---

## MVP Recommendation

For this portfolio demo, the MVP is actually the full feature set — it's a showcase piece, not a staged product. Every feature in the table stakes list must ship. From the differentiators, prioritize:

**Build for demo (high signal, low complexity):**
1. Before/after photo section (homepage + service pages) — visual proof of capability
2. Sticky mobile call bar — conversion differentiator that's also technically impressive
3. Localized content on each area page — demonstrates SEO sophistication
4. Open Graph tags per page — shows attention to detail
5. Testimonial block with neighborhood names — humanizes the brand

**Defer or omit from demo:**
- Print stylesheet — minor, adds clutter to codebase for minimal demo value
- Urgency indicators ("technicians available now") — feels false for a portfolio piece with static content
- Estimate request form as separate flow — one contact form is sufficient for demo

---

## Confidence Notes

| Area | Confidence | Basis |
|------|------------|-------|
| Table stakes | HIGH | Well-established contractor website patterns, corroborated by project CLAUDE.md requirements which already capture most of these |
| Differentiators | MEDIUM-HIGH | Common patterns in trade contractor web design; specific competitive advantage depends on Omaha market (unverified — WebSearch unavailable in this session) |
| Anti-features | HIGH | Performance anti-patterns are documented in Core Web Vitals spec; conversion anti-patterns are well-established in CRO literature |
| Dependencies | HIGH | Technical dependencies are based on Next.js SSG behavior and schema spec requirements |

**Note:** WebSearch was unavailable during this research session. Differentiator claims are based on established domain knowledge (training data through August 2025) rather than live competitive analysis. For a real client engagement, a competitive audit of top-ranking Omaha plumber sites would upgrade differentiator confidence to HIGH.

---

## Sources

- Project requirements: `.planning/PROJECT.md` (validated against this feature list)
- Core Web Vitals thresholds: web.dev/vitals (LCP < 2.5s, CLS < 0.1, INP < 200ms) — HIGH confidence
- Schema.org LocalBusiness, Service, FAQPage, AggregateRating, BreadcrumbList specifications — HIGH confidence
- Lighthouse scoring methodology (Performance, Accessibility, Best Practices, SEO) — HIGH confidence
- Google intrusive interstitials policy (penalizes popup overlays on mobile) — HIGH confidence
- Trade contractor website conversion patterns — MEDIUM confidence (domain knowledge, not live research)
