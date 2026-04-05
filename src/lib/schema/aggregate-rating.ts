import type { WithContext, AggregateRating } from 'schema-dts'
import { BUSINESS } from '@/lib/data/business'

export function generateAggregateRatingSchema(): WithContext<AggregateRating> {
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: String(BUSINESS.rating.value),
    reviewCount: String(BUSINESS.rating.count),
    bestRating: String(BUSINESS.rating.best),
    itemReviewed: {
      '@type': 'LocalBusiness',
      name: BUSINESS.name,
    },
  } as unknown as WithContext<AggregateRating>
}
