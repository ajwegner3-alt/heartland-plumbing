export interface ServiceData {
  title: string
  slug: string
  shortDescription: string
  description: string[]
  commonProblems: string[]
  pricingRange: string
  faqs: Array<{ q: string; a: string }>
  relatedServices: string[]
  metaTitle: string
  metaDescription: string
}

export const services: ServiceData[] = [
  {
    title: 'Drain Cleaning',
    slug: 'drain-cleaning',
    shortDescription:
      'Professional drain clearing for kitchen, bathroom, and main sewer lines using hydro-jetting, snaking, and camera inspection. Fast service across Omaha and surrounding communities.',
    description: [
      'Clogged drains are one of the most common plumbing issues Omaha homeowners face — and one of the easiest to ignore until they become a serious problem. Grease, hair, soap scum, and mineral buildup from our hard Nebraska water gradually narrow your pipes until water backs up entirely. Our certified plumbers clear all types of clogs quickly and completely, from slow bathroom sinks to fully blocked main sewer lines.',
      'For stubborn or recurring clogs, we use high-pressure hydro-jetting to scour pipe walls clean rather than simply punching a hole through the blockage. Unlike chemical drain cleaners that corrode older pipes and rarely solve the root cause, hydro-jetting removes the buildup that causes clogs in the first place. This is especially important in older Omaha neighborhoods like Dundee and Benson, where cast iron and galvanized steel pipes have decades of accumulation.',
      'When we suspect a deeper issue — root intrusion, pipe collapse, or a belly in the line — we deploy a sewer camera to inspect the full length of your drain system. You get video footage of exactly what we found and a clear recommendation, not a guess. No unnecessary excavation, no upselling work that doesn\'t need to be done.',
      'Whether you\'re dealing with a kitchen drain clogged with cooking grease or a main line backing up into multiple fixtures simultaneously, we have the equipment to diagnose and fix it same day in most cases. We serve all of Omaha, Bellevue, Papillion, La Vista, Elkhorn, Ralston, Gretna, and Bennington.',
    ],
    commonProblems: [
      'Slow-draining kitchen or bathroom sink',
      'Gurgling sounds from drains when flushing or running water elsewhere',
      'Recurring clogs that return within weeks of being cleared',
      'Foul sewage odors coming from drains',
      'Multiple fixtures backing up at the same time',
      'Water pooling in the shower or bathtub',
    ],
    pricingRange: '$125 – $350 depending on location and severity',
    faqs: [
      {
        q: 'How often should drains be professionally cleaned?',
        a: 'For most Omaha homes, a professional cleaning every 1–2 years is sufficient to prevent buildup from becoming a blockage. Kitchen drains benefit from annual cleaning due to grease accumulation. If you have older galvanized or cast iron pipes — common in Dundee, Benson, and midtown neighborhoods — we recommend yearly service, as rougher interior surfaces trap buildup faster than modern PVC.',
      },
      {
        q: 'What causes recurring clogs that keep coming back?',
        a: 'Recurring clogs usually mean the underlying cause was never removed — just pushed further down the pipe. Mechanical snaking punches a hole through a clog, but if grease, mineral scale, or root intrusion remains on the pipe walls, the blockage reforms within weeks or months. Hydro-jetting resolves this by removing all buildup from the pipe walls, not just clearing a passage. A camera inspection can also reveal if a pipe belly (sag) or root intrusion is the true culprit.',
      },
      {
        q: 'Do you use chemical drain cleaners?',
        a: 'No. We never use store-bought or commercial drain chemicals. Caustic lye-based products generate heat that can warp PVC joints, accelerate corrosion in older metal pipes, and are genuinely hazardous to handle. More importantly, chemicals dissolve organic matter but leave behind grease, mineral deposits, and roots — the primary causes of recurring clogs. Mechanical snaking and hydro-jetting are safer, more effective, and better for your pipes long-term.',
      },
      {
        q: 'Can tree roots really cause drain problems?',
        a: 'Absolutely — and it\'s more common than most homeowners expect, especially in established Omaha neighborhoods with mature trees. Roots seek moisture and naturally find small cracks or joints in aging clay, cast iron, or concrete sewer pipes. Once a root enters, it expands and creates a web that traps toilet paper, grease, and debris. We can confirm root intrusion with a sewer camera and clear it with a root-cutting head attachment, then discuss whether the pipe section needs repair or replacement.',
      },
    ],
    relatedServices: ['sewer-line-repair', 'emergency-plumbing'],
    metaTitle: 'Drain Cleaning in Omaha, NE | Heartland Plumbing',
    metaDescription:
      'Professional drain cleaning in Omaha, NE. Hydro-jetting, snaking & camera inspection. Same-day service available. Call for a free estimate: (402) 555-0147.',
  },
  {
    title: 'Water Heaters',
    slug: 'water-heaters',
    shortDescription:
      'Tank and tankless water heater installation, repair, and replacement for Omaha homes. We size the right unit for your household and back our work with a warranty.',
    description: [
      'A failing water heater disrupts your entire household — cold showers, no dishwasher performance, and the stress of wondering when it will finally give out. Heartland Plumbing Co. handles everything from straightforward repairs (faulty heating elements, broken thermostats, pilot light failures) to full replacements of traditional tank units and modern tankless systems.',
      'Nebraska\'s hard water is especially tough on water heaters. The high mineral content in our municipal supply — drawn from the Missouri River aquifer — accelerates sediment buildup inside the tank. This sediment forces the heating element to work harder, increases your energy bill, and dramatically shortens the unit\'s lifespan. We always flush existing tanks during service calls and test anode rods to catch early signs of corrosion before they become leaks.',
      'Tankless water heaters are an excellent option for Omaha homeowners looking to reduce energy costs and eliminate the risk of a tank leak causing water damage. We\'re certified installers for Rheem, Bradford White, and A.O. Smith units and will help you select the right model based on your household size, incoming cold water temperature, and simultaneous hot water demands. For natural gas conversions, we handle all gas line work in-house.',
      'If your water heater is over 10 years old, showing rust, making rumbling or popping noises, or producing water that smells off, it\'s time for a professional evaluation. We provide honest assessments — if a repair makes sense, we say so. If replacement is the better financial decision, we explain exactly why.',
    ],
    commonProblems: [
      'No hot water or inconsistent hot water temperature',
      'Rusty or discolored water from the hot tap',
      'Leaking tank or pooling water around the unit',
      'Rumbling, popping, or banging sounds during heating',
      'Pilot light keeps going out on a gas unit',
      'Water heater over 10–12 years old with declining performance',
    ],
    pricingRange: '$175 – $2,500+ depending on repair vs. full replacement',
    faqs: [
      {
        q: 'Should I choose a tank or tankless water heater?',
        a: 'It depends on your household size, hot water usage patterns, and budget. Tank heaters cost less upfront ($800–$1,200 installed for a 50-gallon unit) and are simpler to maintain. Tankless heaters cost more initially ($1,800–$2,500+ installed) but can reduce water heating costs by 20–30% and last 20+ years versus 10–12 for a tank. For households of 3 or more people who run dishwashers and showers simultaneously, tankless is often worth the investment. We\'ll run the numbers with you.',
      },
      {
        q: 'How long does a water heater last?',
        a: 'Traditional tank water heaters typically last 8–12 years in Omaha, with the lower end more likely if your home has hard water and the tank hasn\'t been maintained. Annual anode rod inspection and periodic flushing to remove sediment can extend lifespan by 2–4 years. Tankless units routinely last 18–22 years with proper maintenance. We include a first-year anode rod check with every new tank installation.',
      },
      {
        q: 'What are the signs my water heater is failing?',
        a: 'The most reliable warning signs are: water that takes much longer than usual to heat up; rusty or brownish water from the hot tap only (indicating tank corrosion); a rumbling or popping sound caused by sediment hardening on the heating element; visible corrosion, mineral deposits, or a rust stain around the base; and water pooling anywhere near the unit. Any one of these warrants a service call — two or more usually means replacement is coming.',
      },
      {
        q: 'Will a new water heater lower my energy bill?',
        a: 'Yes, significantly if your current unit is more than 10 years old. Modern high-efficiency tank heaters have Energy Factor ratings around 0.67, compared to 0.55–0.60 for older units. Heat pump water heaters are even more efficient, using 60–70% less electricity than a standard electric tank. Tankless gas units typically cost less to operate than a comparable tank heater. Exact savings depend on your usage patterns, but most Omaha households see $10–$35 per month in reduced utility costs after upgrading.',
      },
    ],
    relatedServices: ['drain-cleaning', 'emergency-plumbing'],
    metaTitle: 'Water Heaters in Omaha, NE | Heartland Plumbing',
    metaDescription:
      'Tank & tankless water heater install & repair in Omaha, NE. Same-day service. Licensed & insured. Call Heartland Plumbing — free estimate: (402) 555-0147.',
  },
  {
    title: 'Sewer Line Repair',
    slug: 'sewer-line-repair',
    shortDescription:
      'Trenchless and traditional sewer line repair and replacement for Omaha homes. Camera inspection, root clearing, pipe bursting, and full excavation when needed.',
    description: [
      'A damaged sewer line is one of the most serious plumbing problems a homeowner can face — and one of the most expensive to ignore. Raw sewage backup into your home creates health hazards, structural damage, and the kind of cleanup bill that dwarfs any repair cost. Heartland Plumbing Co. provides full sewer line services, from camera inspection to complete line replacement, using both trenchless and traditional methods.',
      'Before recommending any repair, we run a sewer camera through the full length of your line to identify exactly what\'s wrong and where. We share the footage with you and explain what we\'re seeing — whether it\'s root intrusion, a cracked or collapsed section, a belly (low spot where waste pools), or severe corrosion. This prevents unnecessary excavation and allows us to recommend the right repair method for your specific situation.',
      'Trenchless pipe bursting is our preferred method when the existing line can be replaced without major excavation. We pull a new HDPE pipe through the old one while simultaneously fracturing the deteriorated pipe outward. Most jobs are completed in a single day with minimal disruption to your yard, driveway, or landscaping. For lines under concrete slabs, driveways, or established landscaping, trenchless saves significant money compared to traditional open-cut repair.',
      'Traditional excavation is still the right choice for collapsed sections, severe belly repairs, or situations where the line must be repositioned. Our crews are experienced at precise, clean excavations that minimize damage to adjacent utilities, landscaping, and structures. We always coordinate with Nebraska One Call (811) before any digging.',
    ],
    commonProblems: [
      'Sewage backing up into floor drains, tubs, or toilets',
      'Wet or unusually green/lush patches in your yard over the sewer line',
      'Foundation cracks appearing near the sewer line path',
      'Persistent sewage odor inside or outside the home',
      'Multiple drain clogs that recur despite clearing',
      'Gurgling from multiple fixtures when any toilet is flushed',
    ],
    pricingRange: '$350 – $5,000+ depending on method and line length',
    faqs: [
      {
        q: 'What is trenchless sewer repair and is my property a candidate?',
        a: 'Trenchless repair replaces your sewer line without digging a long trench across your yard. We use pipe bursting (pulling a new pipe through the old one) or CIPP (cured-in-place pipe lining, which creates a new pipe wall inside the existing one). Most Omaha properties are candidates if the existing pipe still has structural integrity and the line hasn\'t collapsed. Our camera inspection will tell us definitively whether trenchless is viable. When it is, it\'s almost always faster and more cost-effective than traditional excavation.',
      },
      {
        q: 'How do I know if my sewer line is damaged?',
        a: 'Warning signs include sewage backing up into low fixtures like floor drains or ground-level tubs, persistent sewer gas odors inside your home, a section of your yard that stays unusually wet or green even during dry spells, and recurring clogs in multiple drains that don\'t respond to cleaning. If you\'re in an older Omaha neighborhood with clay or cast iron sewer lines installed before 1980, periodic camera inspections are worth scheduling proactively even without symptoms.',
      },
      {
        q: 'Does homeowners insurance cover sewer line repairs?',
        a: 'Standard homeowners insurance policies do not cover sewer line repair — the line from your home to the city main is your responsibility, not the city\'s and not covered under typical policies. Some insurers offer sewer line endorsements as add-ons. If a covered event (like a tree fall or vehicle collision) directly caused the damage, there may be coverage under that peril. We provide detailed written estimates and can work with adjusters when a claim is being filed, but most sewer line repairs are paid out of pocket or financed.',
      },
      {
        q: 'How can I prevent sewer line problems?',
        a: 'The most effective prevention steps are: avoid flushing anything other than toilet paper (wipes, even "flushable" ones, accumulate and snag debris); install a kitchen drain strainer and dispose of cooking grease in the trash rather than down the drain; have mature trees near your sewer line inspected for root proximity; schedule a camera inspection every 3–5 years if your home is more than 30 years old. In Omaha\'s older neighborhoods, clay tile sewer lines from the 1940s–1970s are nearing the end of their service life regardless of maintenance.',
      },
    ],
    relatedServices: ['drain-cleaning', 'emergency-plumbing'],
    metaTitle: 'Sewer Line Repair Omaha, NE | Heartland Plumbing',
    metaDescription:
      'Sewer line repair in Omaha, NE. Trenchless pipe bursting, camera inspection & root clearing. Licensed & insured. Call for a free estimate: (402) 555-0147.',
  },
  {
    title: 'Emergency Plumbing',
    slug: 'emergency-plumbing',
    shortDescription:
      '24/7 emergency plumbing in Omaha and the surrounding metro. Burst pipes, major leaks, sewer backup, and flooding handled immediately — day or night, weekends included.',
    description: [
      'Plumbing emergencies don\'t wait for business hours. A burst pipe in January, a sewer backup on Sunday morning, a water heater that floods your basement on a holiday — these situations require immediate response, not a voicemail and a callback the next day. Heartland Plumbing Co. maintains 24/7 emergency dispatch for Omaha and the surrounding metro, with technicians on call around the clock.',
      'Omaha winters create specific emergency risks that our team knows well. Temperatures routinely drop below 0°F, and pipes in unheated crawl spaces, exterior walls, garages, and vacant properties are at high risk of freezing and bursting. A single burst pipe can discharge hundreds of gallons before you can shut off the main — and water damage compounds quickly. We respond to frozen and burst pipe calls year-round with the goal of arriving within 90 minutes for addresses in our service area.',
      'Sewer backups are the other major category of plumbing emergency. When sewage backs up into a home, every minute of delay means additional contaminated water in contact with floors, walls, and structural components. We arrive with snaking and hydro-jetting equipment ready to clear the line immediately, and we can coordinate with water restoration services when remediation is needed.',
      'Our emergency rates are transparent — we tell you the emergency fee before we dispatch and provide a written estimate before starting any work. We never hold a homeowner hostage at 2 a.m. with surprise pricing. The goal is to stop the damage fast, explain exactly what happened, and give you a clear path to a permanent fix.',
    ],
    commonProblems: [
      'Burst pipe causing active water flooding',
      'Major water leak from supply line, appliance, or water heater',
      'Sewer backup into basement floor drains, toilets, or tubs',
      'Complete loss of water pressure throughout the home',
      'Frozen pipes that have not yet burst but are at risk',
      'Gas line concern associated with plumbing work',
    ],
    pricingRange: 'Emergency rates apply — call (402) 555-0147 for immediate pricing',
    faqs: [
      {
        q: 'How fast can you respond to a plumbing emergency in Omaha?',
        a: 'Our target response time is 90 minutes or less for addresses within our primary service area, which covers Omaha, Bellevue, Papillion, La Vista, Ralston, Elkhorn, Gretna, and Bennington. Actual arrival time depends on call volume, weather conditions, and your specific location. We give you an honest ETA when you call — not a window designed to manage expectations. For immediately life-safety situations, call 911 first, then call us.',
      },
      {
        q: 'What should I do while waiting for the plumber to arrive?',
        a: 'For burst or leaking pipes: locate your home\'s main water shutoff valve and turn it off immediately to stop water flow. The shutoff is typically near the water meter — in Omaha homes, usually in the basement near the front wall or in a utility closet. For sewer backup: stop using all water-consuming fixtures (toilets, sinks, showers, dishwasher, washing machine) to prevent additional backup. For a gas concern: leave the home, do not operate any switches, and call your gas company before calling us.',
      },
      {
        q: 'Is there an extra charge for after-hours emergency service?',
        a: 'Yes — emergency and after-hours calls carry a dispatch fee that covers our technician\'s on-call availability. We tell you this fee upfront when you call, before we dispatch anyone. Once the technician arrives and assesses the situation, you receive a written estimate for all repair work before anything begins. There are no hidden charges, no upselling under pressure, and no invoices that don\'t match what was quoted.',
      },
      {
        q: 'How do I know if my situation is a true plumbing emergency?',
        a: 'Call us immediately if: water is actively flooding your home and you cannot stop it at the source; sewage is backing up into living areas; you have no water to the entire home; a pipe has burst or you can hear water running inside a wall. Call us the same day (non-emergency) if: a single fixture is slow or blocked; a toilet runs constantly; a faucet drips; you have low pressure in one fixture. When in doubt, call — we\'d rather help you determine it\'s not an emergency than have you wait on a situation that is one.',
      },
    ],
    relatedServices: ['drain-cleaning', 'water-heaters', 'sewer-line-repair'],
    metaTitle: 'Emergency Plumber Omaha, NE | Heartland Plumbing',
    metaDescription:
      '24/7 emergency plumber in Omaha, NE. Burst pipes, sewer backup & flooding handled fast. 90-min response. Licensed. Call now: (402) 555-0147 — answered 24/7.',
  },
]
