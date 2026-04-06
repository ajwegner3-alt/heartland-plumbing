export interface BusinessHours {
  days: string[]
  opens: string
  closes: string
}

export interface BusinessData {
  name: string
  phone: string
  phoneHref: string
  email: string
  address: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  geo: {
    latitude: number
    longitude: number
  }
  hours: {
    weekday: BusinessHours
    saturday: BusinessHours
  }
  rating: {
    value: number
    count: number
    best: number
  }
  license: string
  yearsFounded: number
  priceRange: string
  url: string
  socialLinks: {
    facebook: string
    google: string
  }
  areaServed: string[]
}

export const BUSINESS: BusinessData = {
  name: 'Heartland Plumbing Co.',
  phone: '(402) 555-0147',
  phoneHref: 'tel:+14025550147',
  email: 'info@heartlandplumbingomaha.com',
  address: {
    street: '4521 S 84th St',
    city: 'Omaha',
    state: 'NE',
    zip: '68127',
    country: 'US',
  },
  geo: {
    latitude: 41.2124,
    longitude: -95.9786,
  },
  hours: {
    weekday: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '18:00',
    },
    saturday: {
      days: ['Saturday'],
      opens: '08:00',
      closes: '14:00',
    },
  },
  rating: {
    value: 4.9,
    count: 312,
    best: 5,
  },
  license: 'PL-28541',
  yearsFounded: 1998,
  priceRange: '$$',
  url: 'https://www.heartlandplumbingomaha.com',
  socialLinks: {
    facebook: 'https://facebook.com/heartlandplumbingco',
    google: 'https://g.page/heartlandplumbingco',
  },
  areaServed: [
    'Omaha',
    'Bellevue',
    'Papillion',
    'La Vista',
    'Ralston',
    'Elkhorn',
    'Gretna',
    'Bennington',
  ],
}
