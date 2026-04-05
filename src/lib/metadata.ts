import type { Metadata } from 'next'

interface PageMetaInput {
  title: string
  description: string
  path: string // relative path like '/services/drain-cleaning'
  noindex?: boolean
}

export function generatePageMetadata({
  title,
  description,
  path,
  noindex,
}: PageMetaInput): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path, // metadataBase in layout.tsx resolves to full URL
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: 'Heartland Plumbing Co.',
      images: [
        {
          url: '/opengraph-image.png',
          width: 1200,
          height: 630,
          alt: 'Heartland Plumbing Co. - Licensed Omaha Plumber',
        },
      ],
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/opengraph-image.png'],
    },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  }
}
