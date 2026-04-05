export interface Testimonial {
  name: string
  city: string
  rating: number
  text: string
  serviceType: string[]
}

export const testimonials: Testimonial[] = [
  {
    name: 'Mike R.',
    city: 'Omaha',
    rating: 5,
    text: 'Called Heartland at 11 p.m. on a Tuesday after a pipe burst in my basement. Technician arrived within an hour, shut things down, and had a temporary fix in place before midnight. Full repair was done the next morning. These guys genuinely respond 24/7 — not just on their website.',
    serviceType: ['emergency-plumbing'],
  },
  {
    name: 'Sarah T.',
    city: 'Papillion',
    rating: 5,
    text: 'Our main drain was backing up into the basement floor drain every time we ran the dishwasher. Heartland ran a camera and found tree roots about 40 feet out. Hydro-jetted the roots and cleared the line completely. No recurrence six months later. Straightforward, no upsell.',
    serviceType: ['drain-cleaning', 'sewer-line-repair'],
  },
  {
    name: 'James K.',
    city: 'Bellevue',
    rating: 5,
    text: 'We have a 1962 home near Olde Towne Bellevue with original cast iron drains. Had persistent slow drains in all three bathrooms. Heartland identified heavy mineral scaling from our hard water and hydro-jetted the whole stack. Made a world of difference. They also told us honestly which pipes to watch over the next few years.',
    serviceType: ['drain-cleaning'],
  },
  {
    name: 'Linda P.',
    city: 'La Vista',
    rating: 5,
    text: 'Water heater was 14 years old and starting to rust at the base. Got quotes from three plumbers — Heartland was not the cheapest, but they were the only ones who explained exactly why a 50-gallon Bradford White made more sense for our family than the tankless unit another company was pushing. Install was clean, done in half a day, and they hauled away the old unit.',
    serviceType: ['water-heaters'],
  },
  {
    name: 'Tom W.',
    city: 'Omaha',
    rating: 5,
    text: 'Sewer was backing up into our Dundee bungalow — 1920s house with the original clay tile line. Heartland did a camera inspection the same day I called and showed me on video exactly where the line had cracked. Trenchless pipe bursting fixed it without destroying my front landscaping. Could not be happier.',
    serviceType: ['sewer-line-repair'],
  },
  {
    name: 'Rachel M.',
    city: 'Elkhorn',
    rating: 4,
    text: 'Had a slow kitchen drain that drain cleaner wouldn\'t fix. Heartland cleared a grease clog about 20 feet down the drain line. Quick appointment, fair price, and the tech explained what we were doing wrong with disposal cleanup that caused the buildup. Good practical advice.',
    serviceType: ['drain-cleaning'],
  },
  {
    name: 'David N.',
    city: 'Omaha',
    rating: 5,
    text: 'Went with a tankless water heater after Heartland walked us through the math. Our gas bill dropped noticeably the first full month. The install required upgrading the gas line, which they handled the same day. Everything was permitted and inspected — no shortcuts.',
    serviceType: ['water-heaters'],
  },
  {
    name: 'Carol S.',
    city: 'Gretna',
    rating: 5,
    text: 'Water main broke in February during the cold snap — flooded my garage before I could get the shutoff. Heartland was there within two hours, contained the situation, and got me back on water by end of day. They also found a second vulnerable section I didn\'t know about and fixed it while they were there. Solid work.',
    serviceType: ['emergency-plumbing'],
  },
  {
    name: 'Brian A.',
    city: 'Ralston',
    rating: 5,
    text: 'Had a sewer smell that would come and go for months — other plumbers couldn\'t find the source. Heartland did a smoke test and found a cracked wax ring and a small section of collapsed PVC under the basement slab. Fixed both in one visit. No more smell. Worth every dollar.',
    serviceType: ['sewer-line-repair', 'drain-cleaning'],
  },
  {
    name: 'Jennifer H.',
    city: 'Omaha',
    rating: 5,
    text: 'Called on a Saturday morning when the water heater finally gave out — no hot water with a family of five. Heartland had a new 50-gallon unit installed by early afternoon. The dispatcher was upfront about the weekend rate before sending anyone out, which I appreciated. No surprises on the invoice.',
    serviceType: ['water-heaters', 'emergency-plumbing'],
  },
]
