import Link from 'next/link'
import { Logo } from '../Logo/Logo'

export const Footer = () => {
  // Generate structured data for the footer
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'White Trading Company',
    url: 'https://whitetradingcompany.com',
    logo: 'https://whitetradingcompany.com/logo.svg',
    description: 'Premium trading solutions and financial services',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: 'English',
    },
    sameAs: [
      'https://twitter.com/whitetradingcompany',
      'https://linkedin.com/company/whitetradingcompany',
      'https://facebook.com/whitetradingcompany',
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <footer
        id="contact"
        className="mt-[12rem] md:mt-[14rem] lg:mt-[11rem] mx-4 sm:mx-6 md:mx-8 lg:mx-16 xl:mx-24 2xl:mx-32 mb-8 md:mb-12 lg:mb-16 xl:mb-24"
        role="contentinfo"
        aria-label="White Trading Company Footer"
      >
        {/* Navigation Links */}
        <nav
          className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16 justify-center md:justify-start"
          aria-label="Footer navigation"
        >
          <Link
            href="/"
            className="text-slate-900 text-sm sm:text-base font-normal font-['Manrope'] hover:opacity-75 transition-opacity"
            aria-label="About White Trading Company"
          >
            About us
          </Link>
          <Link
            href="/posts"
            className="text-slate-900 text-sm sm:text-base font-normal font-['Manrope'] hover:opacity-75 transition-opacity"
            aria-label="Discover trading insights and blog posts"
          >
            Discover
          </Link>
          <Link
            href="/gallery"
            className="text-slate-900 text-sm sm:text-base font-normal font-['Manrope'] hover:opacity-75 transition-opacity"
            aria-label="Explore our gallery and products"
          >
            Explore
          </Link>
          <Link
            href="/search"
            className="text-slate-900 text-sm sm:text-base font-normal font-['Manrope'] hover:opacity-75 transition-opacity"
            aria-label="Search trading resources"
          >
            Search
          </Link>
        </nav>

        {/* Divider */}
        <hr className="w-full my-6 sm:my-8 md:my-10 lg:my-12 h-px opacity-20 bg-slate-900 outline outline-1 outline-offset-[-0.50px] outline-slate-700" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-6 items-center sm:items-start">
          {/* Copyright */}
          <p className="opacity-75 text-slate-900 text-xs sm:text-sm font-normal font-['Manrope'] text-center sm:text-left order-2 sm:order-1">
            © {new Date().getFullYear()} White Trading Company. All rights reserved.
          </p>

          {/* Logo */}
          <div className="order-1 sm:order-2">
            <Logo />
          </div>

          {/* Terms and Privacy */}
          <nav
            className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-center sm:text-left order-3"
            aria-label="Legal links"
          >
            <Link
              href="/terms"
              className="text-slate-900 text-xs sm:text-sm font-normal font-['Manrope'] hover:opacity-75 transition-opacity"
              aria-label="Terms of Service"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="text-slate-900 text-xs sm:text-sm font-normal font-['Manrope'] hover:opacity-75 transition-opacity"
              aria-label="Privacy Policy"
            >
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
    </>
  )
}
