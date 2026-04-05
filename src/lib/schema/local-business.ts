import type { WithContext, LocalBusiness } from 'schema-dts'
import { BUSINESS } from '@/lib/data/business'

export function generateLocalBusinessSchema(): WithContext<LocalBusiness> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Plumber',
    name: BUSINESS.name,
    url: BUSINESS.url,
    telephone: BUSINESS.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.state,
      postalCode: BUSINESS.address.zip,
      addressCountry: BUSINESS.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: BUSINESS.hours.weekday.days as unknown as string,
        opens: BUSINESS.hours.weekday.opens,
        closes: BUSINESS.hours.weekday.closes,
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: BUSINESS.hours.saturday.opens,
        closes: BUSINESS.hours.saturday.closes,
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(BUSINESS.rating.value),
      reviewCount: String(BUSINESS.rating.count),
      bestRating: String(BUSINESS.rating.best),
    },
    areaServed: BUSINESS.areaServed as unknown as string,
    priceRange: BUSINESS.priceRange,
    sameAs: [BUSINESS.socialLinks.facebook, BUSINESS.socialLinks.google],
  } as unknown as WithContext<LocalBusiness>
}
