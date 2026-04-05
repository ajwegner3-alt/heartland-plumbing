import { notFound } from 'next/navigation'
import Link from 'next/link'
import { JsonLd } from '@/components/JsonLd'
import { ScrollReveal } from '@/components/ScrollReveal'
import { generatePageMetadata } from '@/lib/metadata'
import { generateServiceSchema } from '@/lib/schema/service'
import { generateFAQPageSchema } from '@/lib/schema/faq-page'
import { generateBreadcrumbSchema } from '@/lib/schema/breadcrumb'
import { services, type ServiceData } from '@/lib/data/services'
import { areas } from '@/lib/data/service-areas'
import { BUSINESS } from '@/lib/data/business'

// ── Static generation: pre-render all 4 service slugs at build time ──────────
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

// ── Per-page metadata from services.ts data ──────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) return {}
  return generatePageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  })
}

// ── Service icon map (matches homepage) ──────────────────────────────────────
const SERVICE_ICONS: Record<string, React.ReactNode> = {
  'drain-cleaning': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  ),
  'water-heaters': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
    </svg>
  ),
  'sewer-line-repair': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  'emergency-plumbing': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
}

// ── Phone icon reused in multiple CTAs ───────────────────────────────────────
function PhoneIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6.29 6.29l1.65-1.84a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

// ── Main page component ───────────────────────────────────────────────────────
export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) notFound()

  const isEmergency = service.slug === 'emergency-plumbing'

  // Resolve related service slugs to full ServiceData objects
  const relatedServiceData = service.relatedServices
    .map((s) => services.find((svc) => svc.slug === s))
    .filter(Boolean) as ServiceData[]

  // Conditional styling tokens
  const bannerBg = isEmergency ? 'bg-red-900' : 'bg-dark'
  const ctaBg = isEmergency
    ? 'bg-red-600 hover:bg-red-700'
    : 'bg-primary hover:bg-primary-dark'
  const accentText = isEmergency ? 'text-red-300' : 'text-primary-light'
  const checkColor = isEmergency ? 'text-red-400' : 'text-green'
  const bottomStripBg = isEmergency ? 'bg-red-900' : 'bg-dark'

  return (
    <>
      {/* ── JSON-LD Schema ──────────────────────────────────────────────── */}
      <JsonLd data={generateServiceSchema(service)} />
      <JsonLd data={generateFAQPageSchema(service.faqs)} />
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: 'Home', url: BUSINESS.url },
          { name: 'Services', url: `${BUSINESS.url}/services` },
          { name: service.title, url: `${BUSINESS.url}/services/${service.slug}` },
        ])}
      />

      {/* ── EMERGENCY: 24/7 Alert Strip ─────────────────────────────────── */}
      {isEmergency && (
        <div className="bg-red-600 text-white text-center py-3 px-4" role="alert">
          <div className="max-w-[1320px] mx-auto flex items-center justify-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 font-bold text-sm tracking-wide uppercase">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0" aria-hidden="true">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" stroke="white" strokeWidth="2" />
                <line x1="12" y1="17" x2="12.01" y2="17" stroke="white" strokeWidth="2" />
              </svg>
              24/7 Emergency Dispatch — We Answer Every Call
            </span>
            <span className="text-red-200 hidden sm:block" aria-hidden="true">·</span>
            <a
              href={BUSINESS.phoneHref}
              className="font-black text-sm underline underline-offset-2 hover:text-red-100 transition-colors"
            >
              Call Now: {BUSINESS.phone}
            </a>
          </div>
        </div>
      )}

      {/* ── PAGE BANNER ─────────────────────────────────────────────────── */}
      <section className={`${bannerBg} py-16 lg:py-20`} aria-label={`${service.title} Service`}>
        <div className="max-w-[1320px] mx-auto px-[36px]">

          {/* Breadcrumb nav */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link href="/" className="text-white/50 hover:text-white/80 transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-white/30" aria-hidden="true">/</li>
              <li>
                <Link href="/services" className="text-white/50 hover:text-white/80 transition-colors">
                  Services
                </Link>
              </li>
              <li className="text-white/30" aria-hidden="true">/</li>
              <li className="text-white/80" aria-current="page">
                {service.title}
              </li>
            </ol>
          </nav>

          {/* Emergency: giant phone number above everything else */}
          {isEmergency && (
            <div className="mb-8 p-6 bg-red-800/60 border border-red-700 rounded-lg text-center lg:text-left">
              <p className="text-red-300 font-semibold text-sm uppercase tracking-widest mb-2">
                Burst Pipe? Sewage Backup? Don&apos;t Wait.
              </p>
              <a
                href={BUSINESS.phoneHref}
                className="font-display font-black text-5xl lg:text-6xl text-white hover:text-red-200 transition-colors block"
                aria-label={`Call us now at ${BUSINESS.phone}`}
              >
                {BUSINESS.phone}
              </a>
              <p className="text-red-300 text-sm mt-2 font-semibold">
                Answered 24 hours a day · 7 days a week · Holidays included
              </p>
            </div>
          )}

          {/* H1 + short description */}
          <h1 className={`font-display font-black text-white text-4xl lg:text-5xl leading-tight mb-4 ${isEmergency ? 'mt-2' : ''}`}>
            {service.title}
            {isEmergency && (
              <span className="block text-red-300 text-2xl lg:text-3xl font-bold mt-1">
                Omaha, NE — 90 Min Response
              </span>
            )}
          </h1>

          <p className="font-body text-white/70 text-lg leading-relaxed max-w-2xl mb-8">
            {service.shortDescription}
          </p>

          {/* Dual CTA */}
          <div className="flex flex-wrap gap-4 mb-8">
            <a
              href={BUSINESS.phoneHref}
              className={`inline-flex items-center gap-2.5 ${ctaBg} text-white font-bold text-base px-7 py-4 rounded-sm transition-colors min-h-[52px]`}
            >
              <PhoneIcon />
              {isEmergency ? 'Call Now — We Answer 24/7' : `Call ${BUSINESS.phone}`}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border-2 border-white/60 hover:border-white text-white font-bold text-base px-7 py-4 rounded-sm transition-colors min-h-[52px] hover:bg-white/10"
            >
              {isEmergency ? 'Send a Message' : 'Get Free Estimate'}
            </Link>
          </div>

          {/* Trust micro-bar */}
          <div className={`flex items-center gap-4 flex-wrap text-sm font-semibold ${accentText}`}>
            <span>Licensed &amp; Insured · #{BUSINESS.license}</span>
            <span className="text-white/20" aria-hidden="true">·</span>
            <span>{BUSINESS.rating.value}★ ({BUSINESS.rating.count} Reviews)</span>
            <span className="text-white/20" aria-hidden="true">·</span>
            {isEmergency ? (
              <span>24/7 Emergency Dispatch</span>
            ) : (
              <span>Same-Day Service Available</span>
            )}
          </div>
        </div>
      </section>

      {/* ── COMMON PROBLEMS ─────────────────────────────────────────────── */}
      <section className="py-16 bg-white" aria-label="Common Signs You Need This Service">
        <div className="max-w-[1320px] mx-auto px-[36px]">
          <ScrollReveal>
            <h2 className="font-display font-black text-text-primary text-3xl lg:text-4xl mb-3">
              {isEmergency
                ? 'Call Us Immediately If You Have Any of These'
                : `Signs You Need ${service.title}`}
            </h2>
            <p className="font-body text-text-secondary text-base mb-8 max-w-2xl">
              {isEmergency
                ? 'These are true plumbing emergencies. Every minute without intervention increases damage and cleanup costs.'
                : 'Catching the problem early prevents small issues from becoming costly repairs. If any of these sound familiar, schedule a service call today.'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.commonProblems.map((problem, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 p-4 rounded-lg border ${
                    isEmergency
                      ? 'border-red-200 bg-red-50'
                      : 'border-border bg-off-white'
                  }`}
                >
                  <span className={`shrink-0 mt-0.5 ${checkColor}`} aria-hidden="true">
                    {isEmergency ? (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </span>
                  <span className="font-body text-text-primary text-[15px] leading-snug">
                    {problem}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── SERVICE DESCRIPTION + PRICING ───────────────────────────────── */}
      <section className="py-16 bg-off-white" aria-label={`About Our ${service.title} Services`}>
        <div className="max-w-[1320px] mx-auto px-[36px]">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start">

              {/* Main content column */}
              <div>
                <h2 className="font-display font-black text-text-primary text-3xl lg:text-4xl mb-8">
                  {isEmergency
                    ? 'How We Handle Plumbing Emergencies'
                    : `Our ${service.title} Services`}
                </h2>
                <div className="space-y-6">
                  {service.description.map((para, i) => (
                    <p key={i} className="font-body text-text-secondary text-[16px] leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              {/* Sidebar: pricing callout + secondary CTA */}
              <div className="lg:sticky lg:top-6">
                {/* Pricing callout */}
                <div className={`rounded-lg p-6 mb-5 border ${
                  isEmergency
                    ? 'bg-red-50 border-red-200'
                    : 'bg-white border-border shadow-card'
                }`}>
                  <h3 className="font-display font-bold text-text-primary text-lg mb-2">
                    Pricing Guide
                  </h3>
                  <p className={`font-body text-base font-semibold mb-3 ${
                    isEmergency ? 'text-red-700' : 'text-primary'
                  }`}>
                    {service.pricingRange}
                  </p>
                  <p className="font-body text-text-muted text-sm leading-relaxed">
                    {isEmergency
                      ? 'We disclose emergency dispatch fees before sending anyone. Written estimate before all repair work begins — no surprises.'
                      : 'Exact pricing depends on your specific situation. We provide a written estimate before starting any work — no surprise invoices.'}
                  </p>
                </div>

                {/* CTA card */}
                <div className={`rounded-lg p-6 text-center ${
                  isEmergency ? 'bg-red-900' : 'bg-dark'
                }`}>
                  <p className={`font-semibold text-sm uppercase tracking-widest mb-3 ${
                    isEmergency ? 'text-red-300' : 'text-primary-light'
                  }`}>
                    {isEmergency ? 'Emergency? Call Now' : 'Ready to Schedule?'}
                  </p>
                  <a
                    href={BUSINESS.phoneHref}
                    className={`inline-flex items-center justify-center gap-2 w-full ${ctaBg} text-white font-bold text-base py-3.5 rounded-sm transition-colors mb-3 min-h-[48px]`}
                  >
                    <PhoneIcon className="w-4 h-4" />
                    {BUSINESS.phone}
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 w-full border border-white/30 hover:border-white text-white/80 hover:text-white font-semibold text-sm py-3 rounded-sm transition-colors"
                  >
                    {isEmergency ? 'Send a Message' : 'Request Free Estimate'}
                  </Link>
                  <p className="text-white/40 text-xs mt-3">
                    {isEmergency
                      ? 'Answered 24/7 · 365 days/year'
                      : 'Mon–Fri 7am–6pm · Sat 8am–2pm'}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FAQ ACCORDION ───────────────────────────────────────────────── */}
      <section className="py-16 bg-white" aria-label="Frequently Asked Questions">
        <div className="max-w-[1320px] mx-auto px-[36px]">
          <ScrollReveal>
            <h2 className="font-display font-black text-text-primary text-3xl lg:text-4xl mb-8">
              Frequently Asked Questions
            </h2>
            <div className="flex flex-col border border-border rounded-lg overflow-hidden">
              {service.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group border-b border-border last:border-b-0"
                >
                  <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none select-none hover:bg-off-white transition-colors">
                    <span className="font-display font-bold text-text-primary text-[16px] leading-snug">
                      {faq.q}
                    </span>
                    <span
                      className={`shrink-0 w-7 h-7 rounded-full border border-border flex items-center justify-center font-bold text-lg group-open:rotate-45 transition-transform ${
                        isEmergency ? 'text-red-600' : 'text-primary-light'
                      }`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-5 pt-1">
                    <p className="font-body text-text-secondary text-[15px] leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── RELATED SERVICES ────────────────────────────────────────────── */}
      {relatedServiceData.length > 0 && (
        <section className="py-16 bg-off-white" aria-label="Related Services">
          <div className="max-w-[1320px] mx-auto px-[36px]">
            <ScrollReveal>
              <h2 className="font-display font-black text-text-primary text-3xl lg:text-4xl mb-8">
                Related Services
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedServiceData.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/services/${related.slug}`}
                    className="group flex flex-col gap-4 bg-white border border-border rounded-lg p-8 hover:border-primary hover:shadow-card transition-all"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      {SERVICE_ICONS[related.slug]}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-text-primary text-lg mb-2 group-hover:text-primary transition-colors">
                        {related.title}
                      </h3>
                      <p className="font-body text-text-secondary text-sm leading-relaxed line-clamp-3">
                        {related.shortDescription}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-primary font-bold text-sm mt-auto">
                      Learn More
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ── SERVICE AREAS PILLS ─────────────────────────────────────────── */}
      <section className="py-16 bg-white" aria-label="Service Areas">
        <div className="max-w-[1320px] mx-auto px-[36px]">
          <ScrollReveal>
            <h2 className="font-display font-black text-text-primary text-3xl lg:text-4xl mb-3">
              We Serve These Areas
            </h2>
            <p className="font-body text-text-secondary text-base mb-8 max-w-2xl">
              {isEmergency
                ? 'Our emergency team responds across the Omaha metro — 90-minute target arrival to all locations below.'
                : `${service.title} available across Omaha and the surrounding metro. Same-day appointments in most areas.`}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {areas.map((area) => (
                <Link
                  key={area.slug}
                  href={`/service-areas/${area.slug}`}
                  className="inline-flex items-center gap-1.5 border border-border rounded-full px-4 py-2 text-sm font-semibold text-text-secondary hover:border-primary hover:text-primary transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {area.city}
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── BOTTOM CTA STRIP ────────────────────────────────────────────── */}
      <section className={`${bottomStripBg} py-14`} aria-label="Contact Heartland Plumbing">
        <div className="max-w-[1320px] mx-auto px-[36px] text-center">
          <ScrollReveal>
            {isEmergency ? (
              <>
                <div className="inline-flex items-center gap-2 bg-red-800 border border-red-700 text-red-300 font-bold text-sm px-4 py-1.5 rounded-full mb-6">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                  Available Right Now — 24/7/365
                </div>
                <h2 className="font-display font-black text-white text-4xl lg:text-5xl mb-4">
                  Stop the Damage. Call Now.
                </h2>
                <a
                  href={BUSINESS.phoneHref}
                  className="inline-flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white font-black text-2xl lg:text-3xl px-10 py-6 rounded-sm transition-colors mb-4 min-h-[72px]"
                  aria-label={`Call emergency plumber now at ${BUSINESS.phone}`}
                >
                  <PhoneIcon className="w-7 h-7" />
                  {BUSINESS.phone}
                </a>
                <p className="text-red-300 font-semibold text-sm">
                  Licensed · Insured · #{BUSINESS.license} · 90-Min Response Target
                </p>
              </>
            ) : (
              <>
                <h2 className="font-display font-black text-white text-3xl lg:text-4xl mb-3">
                  Ready to Schedule {service.title}?
                </h2>
                <p className="font-body text-white/70 text-base mb-8 max-w-xl mx-auto">
                  Call for a free estimate or send us a message — we respond within the hour during business hours.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <a
                    href={BUSINESS.phoneHref}
                    className={`inline-flex items-center gap-2.5 ${ctaBg} text-white font-bold text-base px-8 py-4 rounded-sm transition-colors min-h-[52px]`}
                  >
                    <PhoneIcon />
                    Call {BUSINESS.phone}
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 border-2 border-white/60 hover:border-white text-white font-bold text-base px-8 py-4 rounded-sm transition-colors min-h-[52px] hover:bg-white/10"
                  >
                    Get Free Estimate
                  </Link>
                </div>
                <p className="text-white/40 text-sm mt-6">
                  Licensed &amp; Insured · #{BUSINESS.license} · {BUSINESS.rating.value}★ {BUSINESS.rating.count} Reviews
                </p>
              </>
            )}
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
