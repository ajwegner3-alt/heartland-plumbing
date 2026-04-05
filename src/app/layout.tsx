import type { Metadata } from 'next'
import { Bitter, Nunito_Sans } from 'next/font/google'
import './globals.css'

const bitter = Bitter({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-bitter',
  display: 'swap',
})

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-nunito',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.heartlandplumbingomaha.com'),
  title: {
    template: '%s | Heartland Plumbing Co.',
    default: 'Plumber in Omaha, NE | Heartland Plumbing Co.',
  },
  description:
    'Licensed Omaha plumber. 4.9★ rated, 25+ years. Same-day service. Free estimates — call (402) 555-0147.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${bitter.variable} ${nunitoSans.variable}`}>
      <body className="font-body text-text-primary antialiased pb-20 md:pb-0">
        {children}
      </body>
    </html>
  )
}
