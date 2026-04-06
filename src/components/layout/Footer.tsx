import Link from 'next/link'
import { BUSINESS } from '@/lib/data/business'

const serviceLinks = [
  { name: 'Drain Cleaning', href: '/services/drain-cleaning' },
  { name: 'Water Heaters', href: '/services/water-heaters' },
  { name: 'Sewer Line Repair', href: '/services/sewer-line-repair' },
  { name: 'Emergency Plumbing', href: '/services/emergency-plumbing' },
]

const areaLinks = [
  { name: 'Omaha', href: '/service-areas/omaha' },
  { name: 'Bellevue', href: '/service-areas/bellevue' },
  { name: 'Papillion', href: '/service-areas/papillion' },
  { name: 'La Vista', href: '/service-areas/la-vista' },
  { name: 'Ralston', href: '/service-areas/ralston' },
  { name: 'Gretna', href: '/service-areas/gretna' },
  { name: 'Elkhorn', href: '/service-areas/elkhorn' },
  { name: 'Bennington', href: '/service-areas/bennington' },
]

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="max-w-[1320px] mx-auto px-[36px] pt-[60px] pb-20 md:pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Company info */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-primary rounded-md flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h3v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2h1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-1V4a1 1 0 0 0-1-1H3z" />
                  <circle cx="10" cy="12" r="1" fill="white" stroke="none" />
                </svg>
              </div>
              <span className="font-display font-bold text-[16px] text-white">
                Heartland Plumbing Co.
              </span>
            </div>

            <p className="text-text-muted text-sm leading-relaxed mb-4">
              Omaha&apos;s trusted plumber for 25+ years. Licensed, insured, and
              available 24/7 for plumbing emergencies.
            </p>

            <a
              href="tel:4025550147"
              className="inline-flex items-center gap-2 text-primary-light font-bold text-[15px] hover:text-primary transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6.29 6.29l1.65-1.84a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              (402) 555-0147
            </a>
            <span className="block text-red-500 text-xs font-bold mt-0.5">Available 24/7</span>

            <p className="text-text-muted text-sm mt-2">
              {BUSINESS.address.street}<br />
              {BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.zip}
            </p>

            <div className="flex items-center gap-4 mt-4">
              <a
                href={BUSINESS.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-primary-light transition-colors"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href={BUSINESS.socialLinks.google}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-primary-light transition-colors"
                aria-label="Google Business Profile"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="font-display font-bold text-[13px] uppercase tracking-wider text-text-muted mb-4">
              Services
            </h3>
            <ul className="flex flex-col gap-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-white/75 hover:text-primary-light transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Service Areas */}
          <div>
            <h3 className="font-display font-bold text-[13px] uppercase tracking-wider text-text-muted mb-4">
              Service Areas
            </h3>
            <ul className="flex flex-col gap-2.5">
              {areaLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-white/75 hover:text-primary-light transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Hours */}
          <div>
            <h3 className="font-display font-bold text-[13px] uppercase tracking-wider text-text-muted mb-4">
              Hours
            </h3>
            <ul className="flex flex-col gap-2">
              <li className="flex justify-between text-[14px]">
                <span className="text-white/75">Mon–Fri</span>
                <span className="text-white font-semibold">7AM–6PM</span>
              </li>
              <li className="flex justify-between text-[14px]">
                <span className="text-white/75">Saturday</span>
                <span className="text-white font-semibold">8AM–2PM</span>
              </li>
              <li className="flex justify-between text-[14px]">
                <span className="text-white/75">Sunday</span>
                <span className="text-white font-semibold">Closed</span>
              </li>
            </ul>

            <div className="mt-5 bg-red-900/30 border border-red-700/40 rounded-md px-4 py-3">
              <p className="text-red-400 font-bold text-[13px] uppercase tracking-wide mb-0.5">
                24/7 Emergency Service
              </p>
              <p className="text-white/70 text-[13px]">
                Available for urgent plumbing repairs any time.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-text-muted text-[13px]">
            &copy; 2026 Heartland Plumbing Co. All rights reserved.
          </p>
          <p className="text-text-muted text-[13px]">
            Licensed &amp; Insured &mdash; PL-28541
          </p>
        </div>
      </div>
    </footer>
  )
}
