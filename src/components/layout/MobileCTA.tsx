export default function MobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-primary md:hidden shadow-mobile-cta">
      <div className="px-4 py-3">
        <a
          href="tel:4025550147"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-md text-white font-bold text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
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
          Call Now &mdash; (402) 555-0147
          <span className="text-red-300 text-xs font-bold ml-1">24/7</span>
        </a>
      </div>
    </div>
  )
}
