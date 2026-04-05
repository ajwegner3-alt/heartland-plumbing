import type { WithContext, BreadcrumbList } from 'schema-dts'

export interface BreadcrumbItem {
  name: string
  url: string
}

export function generateBreadcrumbSchema(
  items: BreadcrumbItem[],
): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  } as unknown as WithContext<BreadcrumbList>
}
