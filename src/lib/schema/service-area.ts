import type { WithContext, LocalBusiness } from 'schema-dts'
import type { AreaData } from '@/lib/data/service-areas'
import { BUSINESS } from '@/lib/data/business'

export function generateServiceAreaSchema(area: AreaData): WithContext<LocalBusiness> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Plumber',
    name: BUSINESS.name,
    url: `${BUSINESS.url}/service-areas/${area.slug}`,
    telephone: BUSINESS.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.state,
      postalCode: BUSINESS.address.zip,
      addressCountry: BUSINESS.address.country,
    },
    areaServed: {
      '@type': 'City',
      name: area.city,
      containedInPlace: {
        '@type': 'State',
        name: 'Nebraska',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(BUSINESS.rating.value),
      reviewCount: String(BUSINESS.rating.count),
      bestRating: String(BUSINESS.rating.best),
    },
  } as unknown as WithContext<LocalBusiness>
}
