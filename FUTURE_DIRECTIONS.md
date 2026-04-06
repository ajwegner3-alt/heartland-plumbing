# Future Directions & Limitations Report

**Project:** Heartland Plumbing Co. — Portfolio Demo Website
**Built by:** North Star Integrations (NSI)
**Stack:** Next.js 15 (App Router, SSG), Tailwind CSS v4, TypeScript, Vercel
**Completed:** 2026-04-06

---

## 1. Known Limitations

These are things the current build cannot do or does not do well.

- **Contact form email delivery is not configured.** The form UI works — validation, success state, honeypot — but no emails are sent because the `RESEND_API_KEY` and `RESEND_FROM_EMAIL` environment variables have not been added to Vercel. This is intentional for the portfolio demo. A real deployment requires these to be set and the sender domain verified in Resend.

- **No real Google Business Profile connected.** The homepage schema includes an `AggregateRating` node, but review counts and star ratings are hardcoded static values, not pulled from a live GBP or Google Places API.

- **No analytics or tracking installed.** GA4, Google Search Console, and any conversion tracking (form events, call clicks) are not wired up. The site cannot report on traffic, rankings, or conversion rates in its current state.

- **No call tracking integration.** Phone calls from the site cannot be attributed to specific pages, campaigns, or keywords. Tools like CallRail or a Google forwarding number would be needed for attribution.

- **Review data is static and hardcoded.** The three testimonials on the homepage and service pages are authored in `src/lib/data/testimonials.ts`. They will not update when new Google reviews come in.

- **No blog or content marketing section.** There is no `/blog` route, no MDX pipeline, and no CMS. The site cannot currently support content marketing, which limits long-tail SEO potential.

- **Contact page map is a placeholder.** The map block on the contact page is a styled placeholder, not a live Google Maps embed. A real deployment should replace this with an embedded map pointing to the business address.

- **Images are placeholder/generated, not real job site photos.** All imagery uses CSS gradients and inline SVGs. A live client deployment should replace these with actual before/after photos, team photos, and project documentation.

---

## 2. Assumptions and Constraints

Decisions made due to time, scope, or the portfolio-demo nature of this build that may need revisiting for a real client.

- **Built as a portfolio demo for NSI, not a live client site.** All business data (phone number, license number, address, reviews, team info) is fictional and representative. No real client has been onboarded.

- **Static data with no CMS or database for content editing.** Services, service areas, testimonials, and business info all live in TypeScript files under `src/lib/data/`. A real client who wants to self-manage content would need either a headless CMS (Sanity, Contentful) or a simple admin panel.

- **Resend chosen for email over SMTP.** Gmail SMTP is blocked on Vercel serverless functions. Resend was chosen for its generous free tier (3,000 emails/month) and simple API. Domain verification is required before sending from a custom address.

- **8 service areas chosen as representative Omaha metro communities.** Omaha, Bellevue, Papillion, La Vista, Ralston, Elkhorn, Gretna, and Bennington were chosen to cover the metro footprint. A real client would define their own service boundaries.

- **4 core plumbing services.** Drain cleaning, water heaters, sewer line repair, and emergency plumbing were chosen as high-intent, high-value service categories. A real plumbing business would likely serve 8-15 distinct services with dedicated pages.

- **SEO titles and descriptions optimized for the Omaha, NE market specifically.** City references, local keywords, and schema markup all assume an Omaha-based business. Reuse for another market requires a full content pass.

- **No component library or runtime JS framework.** The client JS budget was kept under 30KB by using no shadcn/ui, framer-motion, or any other component library. All animations are CSS-only. This is the right tradeoff for a contractor site but limits interactivity.

---

## 3. Future Improvements

Concrete suggestions for how this project could be enhanced for a real client engagement.

- **Add GA4 and Search Console integration.** Wire up Google Analytics 4 with conversion events for phone click, form submission, and call-now button taps. Connect Google Search Console for keyword and crawl data. This is prerequisite for any meaningful reporting.

- **Connect Google Business Profile API for live review data.** Replace the static testimonials with a data fetch from the Google Places API or a review aggregator (Birdeye, Podium). Reviews should update automatically.

- **Build a before/after project gallery.** A gallery with real job site photos is one of the highest-converting elements for trade contractor sites. Implement using CSS slider or a lightweight vanilla JS approach.

- **Implement online scheduling or booking.** Integrate Calendly, Housecall Pro, or a custom booking form so visitors can request an appointment without making a phone call. This opens a second conversion path.

- **Add a blog section for content marketing and SEO authority.** Set up an MDX-based blog under `/blog` or integrate a headless CMS. Publish 2-4 articles per month on topics like "How to clear a slow drain" or "Signs your water heater needs replacing" to build topical authority and capture informational search traffic.

- **Create a Google Sheets CRM integration via n8n.** Route form submissions through an n8n webhook to append rows to a Google Sheet with lead name, phone, service type, zip code, and submission timestamp. This gives the client a zero-cost lead log without a paid CRM.

- **Add seasonal promotion banner capability.** A dismissible top banner (e.g., "Spring Drain Inspection Special — $99") that can be toggled on/off via an environment variable or a simple CMS flag would give the client a marketing lever.

- **Expand to 10-15 service pages for broader keyword coverage.** Add pages for water softeners, garbage disposal repair, pipe leak repair, bathroom remodel plumbing, gas line services, and backflow prevention. Each page captures additional long-tail search volume.

- **Add more service area pages as territory grows.** The 8 current areas cover the core Omaha metro. Expand to Millard, Sarpy County broadly, Fremont, or Council Bluffs if the client serves those areas.

- **Implement call tracking for conversion attribution.** Use CallRail or a Google call forwarding number to tie phone calls back to specific pages and campaigns. Without this, call conversions are invisible.

- **Build a client-facing analytics dashboard.** As outlined in the analytics architecture, a weekly/monthly reporting view combining Search Console, GA4, and GBP data would give the client self-serve visibility into site performance without needing to ask for a report.

---

## 4. Technical Debt

Shortcuts taken during development that should be cleaned up before scaling this codebase.

- **`SERVICE_ICONS` map is duplicated.** The same `Record<string, ReactNode>` icon map appears in both service page components and area page components. It should be extracted to `src/lib/data/service-icons.tsx` and imported in both places. This was accepted as a known shortcut during Phase 5 execution (STATE.md decision log).

- **Tailwind v4 + `@tailwindcss/typography` compatibility unconfirmed.** The project uses Tailwind v4, which was still maturing during development. The `@tailwindcss/typography` plugin (needed for blog/MDX prose rendering) was not tested against v4. Before adding a blog, verify compatibility or pin to Tailwind v3.4.x.

- **Owner avatar is a CSS circle with an initial letter.** The About page owner spotlight uses a teal circle with the letter "M" as a placeholder. This should be replaced with an actual photo. There is no fallback logic if a real photo is later added and breaks the layout.

- **No automated testing.** There are no unit tests, component tests, or E2E tests (Playwright, Cypress). For a portfolio demo this is acceptable, but a production deployment serving real leads should have at minimum smoke tests for the contact form API route and critical page rendering.

- **Honeypot field name is generic.** The contact form honeypot field uses a straightforward field name. A more deceptive name (matching a common form field that bots fill) would improve spam catch rate, though the current implementation is functional.

- **Schema types use `as unknown as WithContext<T>` casts.** The `schema-dts` library's strict union types for nested schema objects required double-cast workarounds in the JSON-LD generator functions. This should be revisited if `schema-dts` releases a version with cleaner nested type support.

---

*Report generated by Claude Code / North Star Integrations*
*Project: Heartland Plumbing Co. portfolio demo*
