import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { areas } from '@/lib/data/service-areas'
import { BUSINESS } from '@/lib/data/business'
import { JsonLd } from '@/components/JsonLd'
import { generateBreadcrumbSchema } from '@/lib/schema/breadcrumb'
import { ScrollReveal } from '@/components/ScrollReveal'

export const metadata = generatePageMetadata({
  title: 'Service Areas in Omaha Metro | Heartland Plumbing Co.',
  description:
    'Licensed plumber serving Omaha, Bellevue, Papillion, La Vista, Ralston, Elkhorn, Gretna & Bennington, NE. Local plumbing experts. Call (402) 555-0147.',
  path: '/service-areas',
})

export default function ServiceAreasPage() {
  return (
    <>
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: 'Home', url: BUSINESS.url },
          { name: 'Service Areas', url: `${BUSINESS.url}/service-areas` },
        ])}
      />

      {/* ── PAGE BANNER ──────────────────────────────────────────────────── */}
      <section className="bg-dark py-16 lg:py-20" aria-label="Plumbing Service Areas">
        <div className="max-w-[1320px] mx-auto px-[36px]">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link href="/" className="text-white/50 hover:text-white/80 transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-white/30" aria-hidden="true">/</li>
              <li className="text-white/80" aria-current="page">Service Areas</li>
            </ol>
          </nav>
          <h1 className="font-display font-black text-white text-4xl lg:text-5xl leading-tight mb-4">
            Plumbing Service Areas — Omaha Metro
          </h1>
          <p className="font-body text-white/70 text-lg leading-relaxed max-w-2xl mb-8">
            Heartland Plumbing Co. serves 8 communities across the greater Omaha metro — from historic Ralston to fast-growing Gretna and Bennington. Same-day service and free estimates throughout.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={BUSINESS.phoneHref}
              className="inline-flex items-center gap-2.5 bg-primary hover:bg-primary-dark text-white font-bold text-base px-7 py-4 rounded-sm transition-colors min-h-[52px]"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 shrink-0" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6.29 6.29l1.65-1.84a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Call {BUSINESS.phone}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border-2 border-white/60 hover:border-white text-white font-bold text-base px-7 py-4 rounded-sm transition-colors min-h-[52px] hover:bg-white/10"
            >
              Get Free Estimate
            </Link>
          </div>
        </div>
      </section>

      {/* ── AREA CARDS GRID ───────────────────────────────────────────────── */}
      <section className="py-20 bg-white" aria-label="All Service Areas">
        <div className="max-w-[1320px] mx-auto px-[36px]">
          <ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {areas.map((area) => (
                <Link
                  key={area.slug}
                  href={`/service-areas/${area.slug}`}
                  className="group flex flex-col gap-4 bg-white border border-border rounded-lg p-8 hover:border-primary hover:shadow-card transition-all"
                >
                  <div className="flex items-center gap-2 text-primary">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 shrink-0" aria-hidden="true">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span className="font-body text-sm font-semibold text-text-muted">Nebraska</span>
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-text-primary text-xl mb-2 group-hover:text-primary transition-colors">
                      Plumber in {area.city}, NE
                    </h2>
                    <p className="font-body text-text-secondary text-sm leading-relaxed">
                      {area.localContext[0].slice(0, 120)}...
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
    </>
  )
}
