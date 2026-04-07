import type { Metadata } from 'next'
import { Bitter, Nunito_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileCTA from '@/components/layout/MobileCTA'

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
      <head>
        {/* GTM — add NEXT_PUBLIC_GTM_ID to Vercel env vars to activate */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');`,
            }}
          />
        )}
      </head>
      <body className="font-body text-text-primary antialiased pb-20 md:pb-0">
        {/* GTM noscript fallback — only renders when NEXT_PUBLIC_GTM_ID is set */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          />
        )}
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileCTA />
      </body>
    </html>
  )
}
