import type { WithContext, Service } from 'schema-dts'
import type { ServiceData } from '@/lib/data/services'
import { BUSINESS } from '@/lib/data/business'

const BASE = BUSINESS.url

export function generateServiceSchema(service: ServiceData): WithContext<Service> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.shortDescription,
    url: `${BASE}/services/${service.slug}`,
    provider: {
      '@type': 'LocalBusiness',
      name: BUSINESS.name,
      telephone: BUSINESS.phone,
      url: BASE,
    },
    areaServed: {
      '@type': 'City',
      name: 'Omaha',
      containedInPlace: {
        '@type': 'State',
        name: 'Nebraska',
      },
    },
    offers: {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: service.pricingRange,
        priceCurrency: 'USD',
      },
    },
  } as unknown as WithContext<Service>
}
