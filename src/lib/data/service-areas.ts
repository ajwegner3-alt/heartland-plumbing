export interface AreaData {
  city: string
  slug: string
  neighborhoods: string[]
  localContext: string[]
  areaFacts: string[]
  metaTitle: string
  metaDescription: string
}

export const areas: AreaData[] = [
  {
    city: 'Omaha',
    slug: 'omaha',
    neighborhoods: [
      'Dundee',
      'Benson',
      'Aksarben',
      'Midtown',
      'Old Market',
      'Florence',
      'North Omaha',
      'South Omaha',
      'West Omaha',
      'Regency',
    ],
    localContext: [
      'Omaha presents one of the most varied plumbing landscapes in the metro. The city\'s historic neighborhoods — Dundee, Benson, Florence, and parts of North and South Omaha — contain homes built between the early 1900s and the 1940s. Many still have original galvanized steel or cast iron supply and drain lines. These pipes have a useful life of 40–70 years under ideal conditions, which means a significant portion of Omaha\'s older housing stock is past or approaching that threshold. We see corroded galvanized pipes delivering brownish water, cast iron drains with decades of mineral buildup, and clay tile sewer lines that have cracked or been invaded by roots from the established trees that define these neighborhoods.',
      'West Omaha and the Regency and Aksarben areas tell a different story. The homes here are predominantly built from the 1970s through the 2000s and typically use copper supply lines and PVC drains — materials that are still performing well but beginning to show age on the older end. The primary concern in these areas is hard water: Omaha\'s municipal supply draws from the Missouri River aquifer and carries significant dissolved calcium and magnesium. Over time this mineral content deposits inside water heaters, on fixture aerators, and inside washing machine valves, accelerating wear throughout the plumbing system.',
      'Our response time across Omaha proper is among the best in the metro — we maintain crews based in central Omaha for quick access to all quadrants of the city. Whether you\'re in a century-old craftsman bungalow in Dundee dealing with failing galvanized pipes or a new construction home in southwest Omaha with a warranty plumbing question, Heartland Plumbing Co. serves the entire city.',
    ],
    areaFacts: [
      'Hard water from the Missouri River aquifer deposits calcium and magnesium in water heaters, fixtures, and pipe interiors',
      'Dundee and Benson homes commonly have original galvanized steel supply lines nearing or past their service life',
      'Clay tile sewer lines from the 1940s–1960s are still common in older neighborhoods and are vulnerable to root intrusion',
      'Temperatures regularly fall below 0°F in January and February, creating freeze risk in unheated crawl spaces and exterior walls',
      'Florence and North Omaha have significant concentrations of pre-WWII housing stock with aging infrastructure throughout',
    ],
    metaTitle: 'Plumber in Omaha, NE | Heartland Plumbing Co.',
    metaDescription:
      'Licensed plumber serving all of Omaha, NE — Dundee, Benson, Midtown, West Omaha & more. Drain cleaning, sewer repair, water heaters. Call (402) 555-0147.',
  },
  {
    city: 'Bellevue',
    slug: 'bellevue',
    neighborhoods: [
      'Olde Towne',
      'Bellevue West',
      'Twin Ridge',
      'Lakeview',
      'Shadow Lake Estates',
    ],
    localContext: [
      'Bellevue is a community of contrasts: the historic Olde Towne district near the Missouri River contains homes built in the early 20th century alongside the military-adjacent housing that expanded rapidly during Offutt Air Force Base\'s growth in the 1950s and 1960s. These older homes share common traits with Omaha\'s aging stock — galvanized supply lines, cast iron drains, and clay tile sewer runs that have accumulated decades of wear. Residents in Olde Towne frequently call us about low water pressure caused by corroded pipe interiors and recurring drain clogs in the original cast iron stack.',
      'West of Highway 75, Bellevue West and Twin Ridge represent the newer face of the city — subdivisions developed from the 1980s through the 2010s with copper supply lines and PVC drain systems. Many of these homes sit on flat lots with long sewer runs to the municipal main, making annual drain maintenance a worthwhile investment. Proximity to the Missouri River also means that the water table in lower-lying Bellevue neighborhoods can rise during wet spring seasons, occasionally creating basement drainage challenges.',
      'Military families at Offutt often live in base housing with centralized maintenance, but many personnel and veterans choose off-base homes in the surrounding Bellevue neighborhoods. We understand the rhythm of military life and offer scheduling flexibility for families dealing with deployments and reassignments. We\'re familiar with both the newer construction common in the western subdivisions and the aging infrastructure closer to the base and river.',
    ],
    areaFacts: [
      'Olde Towne Bellevue homes from the early 1900s often retain original galvanized and cast iron plumbing',
      'Offutt AFB vicinity has unique base-adjacent housing stock with varied maintenance histories',
      'Proximity to the Missouri River elevates the water table in lower-lying neighborhoods during spring flooding seasons',
      'Highway 75 corridor divides older eastern housing from newer western subdivisions with distinctly different plumbing ages',
      'Flat lots in Bellevue West can create sewer grade challenges — long runs to the main require periodic maintenance',
    ],
    metaTitle: 'Plumber in Bellevue, NE | Heartland Plumbing Co.',
    metaDescription:
      'Licensed plumber in Bellevue, NE serving Olde Towne, Bellevue West & all neighborhoods. Drain cleaning, water heaters & sewer repair. Call (402) 555-0147.',
  },
  {
    city: 'Papillion',
    slug: 'papillion',
    neighborhoods: [
      'Shadow Lake',
      'Tara Hills',
      'Midlands',
      'Papillion Landing',
      'Summerfield',
    ],
    localContext: [
      'Papillion has been one of the fastest-growing cities in Nebraska for the past two decades, and that growth shows in its plumbing profile. The majority of homes in Shadow Lake, Tara Hills, and newer subdivisions south of the Shadow Lake Towne Center were built between 2000 and the present day. These homes use modern PEX or copper supply lines and PVC drain systems — materials that generally perform well for 30–50 years. However, "new construction" plumbing still requires attention, and we see several categories of issues specific to Sarpy County\'s newer housing.',
      'One common issue in the Shadow Lake and Papillion Landing areas is water pressure imbalance. Papillion\'s rapid growth has placed significant demand on municipal water infrastructure, and some newer subdivisions experience pressure fluctuations that stress washing machine valves, ice maker supply lines, and pressure-reducing valves inside the home. We also see sump pump issues — Papillion\'s relatively flat terrain and clay soil retain water effectively, making a properly functioning sump system non-negotiable for finished basement protection.',
      'Sarpy County\'s building codes have been updated regularly alongside Papillion\'s growth, meaning newer homes here are generally built to current standards. When we encounter a plumbing issue in Papillion, it\'s rarely aging infrastructure — more often it\'s a manufacturer defect, an installation shortcut from a volume builder, or a maintenance gap. We work with both homeowners and property management companies serving Papillion\'s growing rental market.',
    ],
    areaFacts: [
      'Most homes built post-2000 with PEX or copper supply and PVC drain systems',
      'Flat terrain and clay soil create basement drainage and sump pump demands',
      'Rapid growth has strained municipal water pressure in some newer subdivisions',
      'Sarpy County building codes current — new construction plumbing generally meets modern standards',
      'Shadow Lake Towne Center area has high density of newer townhomes with shared utility infrastructure',
    ],
    metaTitle: 'Plumber in Papillion, NE | Heartland Plumbing Co.',
    metaDescription:
      'Licensed plumber in Papillion, NE. Shadow Lake, Tara Hills, Papillion Landing & more. Drain cleaning, sump pumps & water heaters. Call (402) 555-0147.',
  },
  {
    city: 'La Vista',
    slug: 'la-vista',
    neighborhoods: [
      'Harrison Hills',
      'Central Park Plaza',
      'La Vista Falls',
      'Parkview Heights',
    ],
    localContext: [
      'La Vista is a compact, densely built suburb sandwiched between Papillion and the Omaha city limits along the 84th Street corridor. The city\'s housing stock is predominantly ranch-style homes built in the 1970s and 1980s, with a secondary wave of townhome and condominium development from the 2000s onward. The older ranch homes are hitting the age range where plumbing systems begin requiring serious attention — copper supply lines that may have pinhole corrosion, original steel drain pipes that are scaling shut, and water heaters that are well past their expected service life.',
      'The 84th Street commercial corridor runs through the heart of La Vista, and the residential neighborhoods on either side reflect different eras. Harrison Hills and older sections near 72nd Street carry the 1970s-era ranch home profile — we commonly address galvanized-to-copper supply line transitions, main shutoff valves that haven\'t been operated in decades and are now stuck, and shower valve cartridges in original fixtures. The newer townhome communities near La Vista Falls have more modern plumbing but often share water lines between units, which can complicate diagnosis and repair.',
      'La Vista\'s relatively small geographic footprint means our response times here are excellent — we can reach any address in the city quickly from our central Omaha base. The city\'s aging housing inventory, particularly the 1970s stock, represents our most consistent work in this area: gradual system upgrades, water heater replacements, and drain line maintenance on properties that haven\'t had professional plumbing service in years.',
    ],
    areaFacts: [
      'Dominant housing stock is 1970s–1980s ranch homes with aging galvanized and early copper plumbing',
      '84th Street corridor divides older western neighborhoods from newer eastern townhome development',
      'Shared water lines in townhome communities require careful diagnosis before repair',
      'Many homes have original main shutoff valves and supply line sections that predate modern PVC',
      'La Vista\'s compact size means most addresses are within 15 minutes of our central Omaha crews',
    ],
    metaTitle: 'Plumber in La Vista, NE | Heartland Plumbing Co.',
    metaDescription:
      'Licensed plumber in La Vista, NE. Harrison Hills, Central Park Plaza & all neighborhoods. Drain cleaning, water heaters & pipe repair. Call (402) 555-0147.',
  },
  {
    city: 'Ralston',
    slug: 'ralston',
    neighborhoods: [
      'Downtown Ralston',
      'Ralston Arena area',
      'Maple Village',
      'Harrison Park',
    ],
    localContext: [
      'Ralston is one of Omaha\'s smaller independent cities — a compact, tight-knit community surrounded entirely by Omaha proper. The housing stock here is predominantly mid-century: homes built in the 1950s, 1960s, and 1970s that reflect Ralston\'s original development as a working-class suburb serving the area\'s postwar growth. This era of construction means cast iron and galvanized steel are common throughout Ralston\'s plumbing infrastructure, and many homes have never had a comprehensive plumbing update since original installation.',
      'Because Ralston\'s geographic footprint is small and well-defined, our response times here are among the fastest in our service area. When a Ralston homeowner calls with an emergency, we can typically be on-site faster than in larger cities where addresses span a much wider geographic range. This is especially meaningful for burst pipe and sewer backup calls in winter, where every minute of response time matters.',
      'The Downtown Ralston area near the Arena district has seen some revitalization investment, including building renovations that have modernized plumbing in commercial and mixed-use properties. Residential streets nearby tend to retain their original infrastructure. We\'ve done extensive work in Ralston updating cast iron stack drain lines to PVC, replacing galvanized supply lines with copper or PEX, and installing modern water heaters to replace original 1960s units that somehow lasted decades.',
    ],
    areaFacts: [
      'Predominantly 1950s–1970s housing with cast iron and galvanized pipe common throughout',
      'Small geographic footprint enables faster emergency response than larger surrounding cities',
      'Many properties have not had comprehensive plumbing updates since original construction',
      'Downtown Ralston commercial renovation work has driven some residential plumbing modernization nearby',
      'Water heater replacement is common in Ralston\'s older ranch homes — many original units are significantly past useful life',
    ],
    metaTitle: 'Plumber in Ralston, NE | Heartland Plumbing Co.',
    metaDescription:
      'Licensed plumber in Ralston, NE. Fast response to all neighborhoods. Drain cleaning, pipe replacement & water heaters. Free estimate: (402) 555-0147.',
  },
  {
    city: 'Elkhorn',
    slug: 'elkhorn',
    neighborhoods: [
      'Westbury',
      'Waterford',
      'Pacific Springs',
      'Elkhorn Ridge',
    ],
    localContext: [
      'Elkhorn was an independent city before being annexed by Omaha in 2007, and that history is visible in its plumbing profile. The original Elkhorn core — neighborhoods near the Old Town Elkhorn area along the Maple Street corridor — contains older homes from the 1950s through 1980s with the aging infrastructure typical of that era. Surrounding these older streets is wave after wave of newer subdivision development: Westbury, Waterford, Pacific Springs, and Elkhorn Ridge represent significant residential expansion from the 1990s through the present day.',
      'The newer Elkhorn subdivisions are predominantly modern construction with PEX supply lines, PVC drain systems, and tankless or high-efficiency water heaters. However, even these relatively new homes encounter the area-specific challenges of western Douglas County — including hard water from the municipal system (which extends Omaha\'s Missouri River supply westward) and the significant clay content in Nebraska\'s loess soil, which expands and contracts with moisture and can place lateral stress on underground sewer lines over time.',
      'Pacific Springs and Elkhorn Ridge, the westernmost developments, sit in areas that were agricultural land a decade or two ago. These neighborhoods are building out their municipal water and sewer infrastructure as development proceeds, and we occasionally serve properties at the edge of the build-out where pressure and flow questions arise. We also do significant work for Elkhorn\'s growing population of homeowners upgrading from builder-grade fixtures and appliances in homes that are now 15–25 years old.',
    ],
    areaFacts: [
      'Old Town Elkhorn core has 1950s–1980s housing with aging galvanized and cast iron infrastructure',
      'Newer subdivisions (Westbury, Waterford, Pacific Springs) use modern PEX and PVC systems',
      'Hard water from Omaha\'s Missouri River municipal supply extends throughout Elkhorn',
      'Nebraska loess clay soil expansion and contraction can stress buried sewer lines over time',
      'Rapid Elkhorn population growth has driven high demand for plumbing upgrades in homes now 15–25 years old',
    ],
    metaTitle: 'Plumber in Elkhorn, NE | Heartland Plumbing Co.',
    metaDescription:
      'Licensed plumber in Elkhorn, NE. Westbury, Waterford, Pacific Springs & more. Drain cleaning, water heaters & sewer repair. Call (402) 555-0147.',
  },
  {
    city: 'Gretna',
    slug: 'gretna',
    neighborhoods: [
      'Aspen Creek',
      'Prairie View',
      'Whitetail Ridge',
      'Shadow Creek',
      'Gretna East',
    ],
    localContext: [
      'Gretna has transformed from a small Sarpy County town into one of Nebraska\'s fastest-growing communities, driven by new subdivision development along Highway 370 and south of Gretna\'s original downtown. Aspen Creek, Prairie View, Whitetail Ridge, and a string of other new developments have added thousands of homes over the past decade. These neighborhoods are predominantly 2010s and 2020s construction — modern PEX plumbing, high-efficiency water heaters, and sewer systems that connect to Sarpy County Metropolitan Utilities District infrastructure.',
      'Gretna\'s rapid growth has created some unique challenges that we navigate regularly. Municipal water and sewer main extensions sometimes lag behind residential development timelines, meaning homeowners at the newest edges of Gretna\'s growth boundary may still be on private wells or septic systems while their neighbors connect to municipal service. We handle well-to-municipal transitions, septic-to-sewer conversions, and all the associated inspection and permitting requirements for Sarpy County.',
      'Because the housing stock is so new, Gretna homeowners rarely call us for aging infrastructure — they call for warranty-period concerns, builder punch list items that slipped through, and the kinds of issues that appear in modern construction around years 5–15: pressure-reducing valve adjustments, water softener integration, tankless water heater scaling issues, and sump system upgrades as finished basements are completed. We know the newest neighborhoods here and are familiar with the builder-grade specifications typical of Gretna\'s volume construction.',
    ],
    areaFacts: [
      'Predominantly 2010s–2020s construction with modern PEX supply and PVC drain systems',
      'Rapid growth means some properties are still on private wells or septic while municipal service extends',
      'Sarpy County MUD water supply — hard water affecting newer water heaters and softener demand',
      'Builder-grade fixtures in 5–15 year old homes beginning to require upgrades and replacement',
      'Highway 370 corridor development continues to expand the municipal service boundary annually',
    ],
    metaTitle: 'Plumber in Gretna, NE | Heartland Plumbing Co.',
    metaDescription:
      'Licensed plumber in Gretna, NE. Aspen Creek, Prairie View & Whitetail Ridge. New construction plumbing & water heaters. Free estimate — call (402) 555-0147.',
  },
  {
    city: 'Bennington',
    slug: 'bennington',
    neighborhoods: [
      'Bennington Lake',
      'Stone Creek',
      'Bennington Heights',
      'Rolling Ridge',
    ],
    localContext: [
      'Bennington sits at the northwestern edge of the Omaha metro, where suburban development is actively meeting rural Douglas County. The community has a split character that directly affects plumbing service: the original Bennington village — centered around the historic downtown on Highway 36 — is a small agricultural community with older housing, some of which predates municipal water service entirely. These homes may have private wells and septic systems that have served the properties for decades. As Bennington Lake, Stone Creek, and Bennington Heights have developed around the village, newer homes have connected to expanding municipal infrastructure.',
      'The coexistence of well water and municipal supply is one of Bennington\'s defining plumbing characteristics. We handle both confidently — from testing and servicing submersible well pumps to installing pressure tanks and water treatment systems for well-supplied homes, to all the standard municipal plumbing needs of the newer subdivisions. We also perform septic-to-sewer conversions as Bennington\'s municipal sewer system extends to reach properties that have relied on private septic systems, a process that requires careful permitting coordination with Douglas County.',
      'Bennington Lake and Bennington Heights, the newest residential areas, attract buyers looking for larger lots and a quieter northwest location while remaining within Omaha\'s commutable range. These homes are generally 2010s and newer construction on the subdivision side, though the surrounding rural acreages often have older homes with entirely different plumbing profiles. We serve both populations and adjust our diagnostic approach based on whether a property is on well/septic or municipal systems.',
    ],
    areaFacts: [
      'Rural-to-suburban transition area with mix of private wells, septic systems, and expanding municipal service',
      'Septic-to-sewer conversions in progress as municipal infrastructure extends through the community',
      'Original Bennington village housing may predate municipal water — well pumps and pressure tanks common',
      'Newer subdivisions (Bennington Lake, Stone Creek) are 2010s construction on expanding municipal service',
      'Douglas County permitting required for septic decommissioning and well abandonment during municipal transitions',
    ],
    metaTitle: 'Plumber in Bennington, NE | Heartland Plumbing Co.',
    metaDescription:
      'Licensed plumber in Bennington, NE. Well pumps, septic-to-sewer conversions & municipal plumbing. Bennington Lake & Stone Creek. Call (402) 555-0147.',
  },
]
