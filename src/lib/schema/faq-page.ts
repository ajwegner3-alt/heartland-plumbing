import type { WithContext, FAQPage } from 'schema-dts'

interface FAQ {
  q: string
  a: string
}

export function generateFAQPageSchema(faqs: FAQ[]): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  } as unknown as WithContext<FAQPage>
}
