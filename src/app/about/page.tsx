import Link from 'next/link'
import { JsonLd } from '@/components/JsonLd'
import { generateLocalBusinessSchema } from '@/lib/schema/local-business'
import { generateBreadcrumbSchema } from '@/lib/schema/breadcrumb'
import { generatePageMetadata } from '@/lib/metadata'
import { BUSINESS } from '@/lib/data/business'
import { ScrollReveal } from '@/components/ScrollReveal'

export const metadata = generatePageMetadata({
  title: 'About Heartland Plumbing Co. | Omaha, NE',
  description:
    'Family-owned Omaha plumber since 1998. Meet our team, learn our story, and see why 312 homeowners trust Heartland Plumbing Co. Licensed #PL-28541, BBB A+.',
  path: '/about',
})

const yearsInBusiness = new Date().getFullYear() - BUSINESS.yearsFounded

export default function AboutPage() {
  const lbSchema = generateLocalBusinessSchema()
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: BUSINESS.url },
    { name: 'About Us', url: `${BUSINESS.url}/about` },
  ])

  return (
    <>
      <JsonLd data={lbSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* ─── HERO BANNER ────────────────────────────────────────────────── */}
      <section
        className="bg-dark pt-[90px] pb-16"
        aria-label="About page banner"
      >
        <div className="max-w-[1320px] mx-auto px-9">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-white/50">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" aria-hidden="true">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </li>
              <li className="text-white/80 font-semibold" aria-current="page">About Us</li>
            </ol>
          </nav>

          <h1 className="font-display font-black text-white text-4xl lg:text-5xl leading-tight mb-4">
            About Heartland Plumbing Co.
          </h1>
          <p className="font-body text-white/70 text-lg max-w-2xl leading-relaxed">
            Family-owned and Omaha-rooted since {BUSINESS.yearsFounded}. {yearsInBusiness} years of honest work, fair pricing, and plumbing done right the first time.
          </p>
        </div>
      </section>

      {/* ─── COMPANY STORY ──────────────────────────────────────────────── */}
      <section className="py-20 bg-white" aria-label="Our story">
        <div className="max-w-[1320px] mx-auto px-9">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-14 items-start">

              {/* Story copy */}
              <div>
                <h2 className="font-display font-black text-text-primary text-3xl mb-6">
                  Our Story
                </h2>

                <div className="font-body text-text-secondary text-[16px] leading-[1.75] space-y-5">
                  <p>
                    Heartland Plumbing Co. was founded in {BUSINESS.yearsFounded} with a straightforward idea: Omaha homeowners deserve a plumber they can actually trust. No bait-and-switch pricing, no unnecessary upsells, and no disappearing acts when the job gets complicated. Owner Mike Richardson started the company out of a single truck and a reputation built entirely on referrals — the kind you only earn by showing up on time, doing clean work, and charging a fair price.
                  </p>

                  <p>
                    Over the past {yearsInBusiness} years, we&apos;ve grown into a full-service plumbing company serving all of Douglas, Sarpy, and Washington counties. We handle everything from routine drain cleaning and water heater replacements to sewer line repairs and 24/7 emergency calls. But our approach hasn&apos;t changed: we diagnose the real problem, explain your options clearly, and let you decide what makes sense for your home and your budget.
                  </p>

                  <p>
                    We&apos;re proud to be locally owned and locally accountable. When you call Heartland, you&apos;re talking to someone who lives and works in this community — not a national call center routing your job to whoever is available. That matters to us, and we think it matters to you too.
                  </p>
                </div>
              </div>

              {/* Quick-facts sidebar */}
              <div className="bg-off-white border border-border rounded-lg p-7">
                <h3 className="font-display font-bold text-text-primary text-lg mb-5">
                  At a Glance
                </h3>
                <ul className="space-y-4">
                  {[
                    {
                      label: 'Founded',
                      value: String(BUSINESS.yearsFounded),
                      icon: (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                      ),
                    },
                    {
                      label: 'Location',
                      value: `${BUSINESS.address.city}, ${BUSINESS.address.state}`,
                      icon: (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      ),
                    },
                    {
                      label: 'Areas Served',
                      value: `${BUSINESS.areaServed.length} Omaha-area cities`,
                      icon: (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                          <polygon points="3 11 22 2 13 21 11 13 3 11" />
                        </svg>
                      ),
                    },
                    {
                      label: 'Google Rating',
                      value: `${BUSINESS.rating.value} / 5 (${BUSINESS.rating.count} reviews)`,
                      icon: (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gold" aria-hidden="true">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ),
                    },
                    {
                      label: 'Phone',
                      value: BUSINESS.phone,
                      icon: (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6.29 6.29l1.65-1.84a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      ),
                    },
                  ].map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      <span className="mt-0.5 text-primary shrink-0">{item.icon}</span>
                      <span className="text-sm text-text-secondary">
                        <span className="font-semibold text-text-primary">{item.label}:</span>{' '}
                        {item.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── OWNER SPOTLIGHT ────────────────────────────────────────────── */}
      <section className="py-20 bg-off-white" aria-label="Meet our owner">
        <div className="max-w-[1320px] mx-auto px-9">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="font-display font-black text-text-primary text-3xl">
                Meet the Owner
              </h2>
            </div>

            <div className="max-w-2xl mx-auto bg-white border border-border rounded-lg p-8 shadow-card">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

                {/* Avatar — initial placeholder, no external image */}
                <div
                  className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shrink-0"
                  aria-hidden="true"
                >
                  <span className="font-display font-black text-white text-3xl leading-none select-none">
                    M
                  </span>
                </div>

                {/* Bio */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-display font-bold text-text-primary text-xl mb-0.5">
                    Mike Richardson
                  </h3>
                  <p className="text-primary font-semibold text-sm mb-4">
                    Owner &amp; Master Plumber
                  </p>
                  <div className="font-body text-text-secondary text-[15px] leading-relaxed space-y-3">
                    <p>
                      Mike grew up in Omaha and learned the trade working alongside his uncle during high school. He earned his Master Plumber license in 1997 and founded Heartland Plumbing Co. the following year with the goal of building a company he&apos;d be proud to put his name on.
                    </p>
                    <p>
                      He still runs service calls himself on most days — not because he has to, but because staying hands-on keeps his team sharp and his customers confident. &ldquo;If I wouldn&apos;t do it in my own house,&rdquo; he says, &ldquo;we don&apos;t do it in yours.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── CREDENTIALS BADGE GRID ─────────────────────────────────────── */}
      <section className="py-20 bg-white" aria-label="Credentials and certifications">
        <div className="max-w-[1320px] mx-auto px-9">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-display font-black text-text-primary text-3xl mb-3">
                Licensed, Insured &amp; Accredited
              </h2>
              <p className="font-body text-text-secondary text-base max-w-xl mx-auto">
                We back every job with the credentials and coverage your home deserves.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

              {/* Badge 1: Licensed */}
              <div className="bg-off-white border border-border rounded-lg p-6 text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-text-primary text-base mb-1">
                  Licensed Plumber
                </h3>
                <p className="text-primary font-semibold text-sm mb-1">
                  #{BUSINESS.license}
                </p>
                <p className="text-text-muted text-xs leading-snug">
                  Nebraska Master Plumber license — verified and current
                </p>
              </div>

              {/* Badge 2: Insured */}
              <div className="bg-off-white border border-border rounded-lg p-6 text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-text-primary text-base mb-1">
                  Fully Insured
                </h3>
                <p className="text-primary font-semibold text-sm mb-1">
                  $2M Liability
                </p>
                <p className="text-text-muted text-xs leading-snug">
                  General liability and workers&apos; comp — your home is protected
                </p>
              </div>

              {/* Badge 3: BBB */}
              <div className="bg-off-white border border-border rounded-lg p-6 text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
                    <circle cx="12" cy="8" r="6" />
                    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-text-primary text-base mb-1">
                  BBB Accredited
                </h3>
                <p className="text-primary font-semibold text-sm mb-1">
                  A+ Rating
                </p>
                <p className="text-text-muted text-xs leading-snug">
                  Better Business Bureau accredited with top-tier rating
                </p>
              </div>

              {/* Badge 4: Experience */}
              <div className="bg-off-white border border-border rounded-lg p-6 text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-text-primary text-base mb-1">
                  {yearsInBusiness}+ Years Experience
                </h3>
                <p className="text-primary font-semibold text-sm mb-1">
                  Since {BUSINESS.yearsFounded}
                </p>
                <p className="text-text-muted text-xs leading-snug">
                  Over two decades serving the greater Omaha metro area
                </p>
              </div>

            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── BOTTOM CTA ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-dark" aria-label="Get in touch">
        <div className="max-w-[1320px] mx-auto px-9 text-center">
          <ScrollReveal>
            <h2 className="font-display font-black text-white text-3xl lg:text-4xl mb-4">
              Ready to Work With Us?
            </h2>
            <p className="font-body text-white/70 text-lg max-w-xl mx-auto mb-10">
              Call us directly for the fastest response, or fill out our contact form and we&apos;ll get back to you within the hour.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={BUSINESS.phoneHref}
                className="inline-flex items-center justify-center gap-2.5 bg-primary hover:bg-primary-dark text-white font-bold text-base px-8 py-4 rounded-sm transition-colors min-h-[52px]"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 shrink-0" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6.29 6.29l1.65-1.84a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Call {BUSINESS.phone} <span className="text-red-300 text-sm font-bold">(24/7)</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/60 hover:border-white text-white font-bold text-base px-8 py-4 rounded-sm transition-colors min-h-[52px] hover:bg-white/10"
              >
                Send Us a Message
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            </div>

            {/* Trust micro-copy */}
            <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
              <span className="text-white/50 text-sm font-semibold">License #{BUSINESS.license}</span>
              <span className="text-white/20 text-sm" aria-hidden="true">·</span>
              <span className="text-white/50 text-sm font-semibold">$2M Insured</span>
              <span className="text-white/20 text-sm" aria-hidden="true">·</span>
              <span className="text-white/50 text-sm font-semibold">BBB A+</span>
              <span className="text-white/20 text-sm" aria-hidden="true">·</span>
              <span className="text-white/50 text-sm font-semibold">{yearsInBusiness}+ Years Serving Omaha</span>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
