export default function Home() {
  return (
    <main className="min-h-screen bg-warm-white p-12 flex flex-col gap-8">
      <h1 className="font-display text-4xl font-bold text-text-primary">
        Heartland Plumbing Co.
      </h1>
      <h2 className="font-body text-2xl text-text-secondary">
        Omaha&apos;s Trusted Plumber
      </h2>

      <div className="flex flex-wrap gap-4">
        <div className="bg-primary text-white px-6 py-3 rounded-md font-body font-semibold">
          Primary Teal (#1a7a6e)
        </div>
        <div className="bg-copper text-white px-6 py-3 rounded-md font-body font-semibold">
          Copper Accent (#b8733a)
        </div>
        <div className="bg-dark text-white px-6 py-3 rounded-md font-body font-semibold">
          Dark (#1a1f1e)
        </div>
        <div className="bg-gold text-white px-6 py-3 rounded-md font-body font-semibold">
          Gold (#e8a32e)
        </div>
        <div className="bg-green text-white px-6 py-3 rounded-md font-body font-semibold">
          Green (#2d8659)
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-body text-text-muted text-sm">Brand token test page — will be replaced in Phase 3</p>
        <a
          href="tel:4025550147"
          className="inline-flex items-center gap-2 bg-copper hover:bg-copper-dark text-white font-body font-bold px-8 py-4 rounded-md transition-colors w-fit"
        >
          Call Now — (402) 555-0147
        </a>
      </div>
    </main>
  )
}
