import Link from 'next/link'
import { Logo } from '../Logo/Logo'

export const Footer = () => {
  return (
    <div
      id="contact"
      className="mt-[12rem] md:mt-[14rem] lg:mt-[11rem] mx-4 sm:mx-6 md:mx-8 lg:mx-16 xl:mx-24 2xl:mx-32 mb-8 md:mb-12 lg:mb-16 xl:mb-24"
    >
      {/* Navigation Links */}
      <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16 justify-center md:justify-start">
        <Link
          href="/"
          className="text-slate-900 text-sm sm:text-base font-normal font-['Manrope'] hover:opacity-75 transition-opacity"
        >
          About us
        </Link>
        <Link
          href="/"
          className="text-slate-900 text-sm sm:text-base font-normal font-['Manrope'] hover:opacity-75 transition-opacity"
        >
          Discover
        </Link>
        <Link
          href="/"
          className="text-slate-900 text-sm sm:text-base font-normal font-['Manrope'] hover:opacity-75 transition-opacity"
        >
          Explore
        </Link>
        <Link
          href="/"
          className="text-slate-900 text-sm sm:text-base font-normal font-['Manrope'] hover:opacity-75 transition-opacity"
        >
          Books
        </Link>
      </div>

      {/* Divider */}
      <div className="w-full my-6 sm:my-8 md:my-10 lg:my-12 h-px opacity-20 bg-slate-900 outline outline-1 outline-offset-[-0.50px] outline-slate-700" />

      {/* Bottom Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-6 items-center sm:items-start">
        {/* Copyright */}
        <h3 className="opacity-75 text-slate-900 text-xs sm:text-sm font-normal font-['Manrope'] text-center sm:text-left order-2 sm:order-1">
          © 2019 White Trading Company. All rights reserved.
        </h3>

        {/* Logo */}
        <div className="order-1 sm:order-2">
          <Logo />
        </div>

        {/* Terms and Privacy */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-center sm:text-left order-3">
          <p className="text-slate-900 text-xs sm:text-sm font-normal font-['Manrope'] hover:opacity-75 transition-opacity cursor-pointer">
            Terms of Service
          </p>
          <p className="text-slate-900 text-xs sm:text-sm font-normal font-['Manrope'] hover:opacity-75 transition-opacity cursor-pointer">
            Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}
