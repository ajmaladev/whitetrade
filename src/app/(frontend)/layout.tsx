import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Manrope, Montserrat, Poppins } from 'next/font/google'
import React from 'react'

import { Footer } from '@/components/Footer'
import MegaMenu from '@/components/MegaMenu'
import { NewsLetter } from '@/components/NewsLetter'
import WhatsAppButton from '@/components/WhatsAppButton'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
})

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
  preload: true,
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
  preload: true,
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      className={cn(
        GeistSans.variable,
        GeistMono.variable,
        poppins.variable,
        manrope.variable,
        montserrat.variable,
      )}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/logo.svg" rel="icon" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#1C3A6A" />
        <meta name="color-scheme" content="light" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body>
        <header role="banner" aria-label="White Trading Company Header">
          <MegaMenu />
        </header>
        {children}
        <footer role="contentinfo" aria-label="White Trading Company Footer">
          <NewsLetter />
          <Footer />
        </footer>
        <WhatsAppButton />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: 'White Trading Company - Safety Products & Food Supplies',
    template: '%s | White Trading Company',
  },
  description:
    'Leading supplier of safety products, fruits & vegetables, grains & rice, food products, and textile materials in Coimbatore since 2011.',
  keywords: [
    'White Trading Company',
    'safety products Coimbatore',
    'safety jackets',
    'safety helmets',
    'safety shoes',
    'fruits and vegetables supplier',
    'grains and rice supplier',
    'food products supplier',
    'textile products Coimbatore',
    'safety gear supplier',
    'basmati rice supplier',
    'cotton materials',
    'fashion wear',
    'bedcovers',
    'safety harness',
    'safety gloves',
    'safety goggles',
    'hardware tools',
    'toppy noodles',
    'ghee supplier',
    'sweetcorn supplier',
    'trading company Coimbatore',
    'wholesale supplier',
    'bulk purchase',
    'corporate supplies',
  ].join(', '),
  authors: [{ name: 'White Trading Company' }],
  creator: 'White Trading Company',
  publisher: 'White Trading Company',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    ...mergeOpenGraph(),
    title: 'White Trading Company - Safety Products & Food Supplies',
    description:
      'Leading supplier of safety products, fruits & vegetables, grains & rice, food products, and textile materials in Coimbatore since 2011.',
    siteName: 'White Trading Company',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'White Trading Company - Safety Products & Food Supplies',
    description:
      'Leading supplier of safety products, fruits & vegetables, grains & rice, food products, and textile materials in Coimbatore since 2011.',
    creator: '@whitetradingcompany',
    site: '@whitetradingcompany',
  },
  alternates: {
    canonical: getServerSideURL(),
  },
}
