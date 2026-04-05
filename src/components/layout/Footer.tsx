import Link from 'next/link'

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

            <p className="text-text-muted text-sm mt-2">Omaha, NE 68102</p>
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

            <div className="mt-5 bg-primary/20 border border-primary/30 rounded-md px-4 py-3">
              <p className="text-primary-light font-bold text-[13px] uppercase tracking-wide mb-0.5">
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
