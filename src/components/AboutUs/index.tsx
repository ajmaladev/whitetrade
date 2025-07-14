'use client'

import { motion } from 'framer-motion'
import { MailIcon, MapPinIcon, PhoneIcon, StarIcon } from 'lucide-react'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'

export const AboutUs = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = '+919843044489' // Replace with actual number
    const message =
      'Hello! I would like to book a service with your company. Can you please provide me with more information about your services and availability?'
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  // Intersection Observer hooks for different sections
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.3 })
  const [ratingRef, ratingInView] = useInView({ triggerOnce: true, threshold: 0.3 })
  const [contentRef, contentInView] = useInView({ triggerOnce: true, threshold: 0.3 })
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.3 })
  const [contactsRef, contactsInView] = useInView({ triggerOnce: true, threshold: 0.3 })

  // Animation variants for right-to-left movement
  const slideInFromRight = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut' as const,
      },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const staggerItem = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  }

  // Generate structured data for the About Us section
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'White Trading Company',
    description:
      'Trusted partner in growth, delivering exceptional value through high-quality products and reliable solutions.',
    url: 'https://whitetradingcompany.com',
    logo: 'https://whitetradingcompany.com/logo.svg',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Sungam Byepass Road 641045, Ramanathapuram',
      addressLocality: 'Coimbatore',
      addressRegion: 'Tamil Nadu',
      postalCode: '641045',
      addressCountry: 'IN',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91-422-2321811',
        contactType: 'customer service',
        availableLanguage: 'English',
      },
      {
        '@type': 'ContactPoint',
        telephone: '+91-98430-44443',
        contactType: 'customer service',
        availableLanguage: 'English',
      },
      {
        '@type': 'ContactPoint',
        email: 'info@whitetrading.in',
        contactType: 'customer service',
        availableLanguage: 'English',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      ratingCount: '1000',
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: [
      'https://twitter.com/whitetradingcompany',
      'https://linkedin.com/company/whitetradingcompany',
      'https://facebook.com/whitetradingcompany',
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section
        id="about"
        className="w-full min-h-screen relative bg-gradient-to-br from-slate-900 to-blue-900 overflow-hidden px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16"
        aria-labelledby="about-heading"
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:gap-16 gap-8 justify-center items-center">
          <motion.div
            ref={titleRef}
            initial="hidden"
            animate={titleInView ? 'visible' : 'hidden'}
            variants={slideInFromRight}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <h4
              id="about-heading"
              className="text-4xl sm:text-6xl lg:text-8xl font-bold font-['Poppins'] text-white"
            >
              About Us
            </h4>
          </motion.div>

          {/* Rating Card */}
          <motion.div
            ref={ratingRef}
            initial="hidden"
            animate={ratingInView ? 'visible' : 'hidden'}
            variants={slideInFromRight}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="https://www.google.com/maps?q=10.99188232421875,76.97906494140625&z=17&hl=en"
              className="flex justify-center mb-8 sm:mb-12 lg:mb-16"
              target="_blank"
            >
              <div
                className="w-64 h-20 bg-white rounded-[47.88px] shadow-[0px_22.722957611083984px_95.76103210449219px_0px_rgba(109,108,115,0.12)] outline outline-[9.74px] outline-neutral-200/40 flex items-center justify-center gap-2 hover:scale-105 hover:shadow-[0px_30px_120px_0px_rgba(109,108,115,0.25)] hover:outline-orange-400/60 transition-all duration-300 ease-in-out cursor-pointer"
                style={{
                  animation: 'buttonPulse 3s ease-in-out infinite',
                }}
                itemScope
                itemType="https://schema.org/AggregateRating"
              >
                <div>
                  <div
                    className="text-black text-xl font-semibold font-['Manrope'] leading-7"
                    itemProp="ratingValue"
                  >
                    4.5/5
                  </div>
                  <div className="opacity-70 text-black text-xs font-medium font-['Manrope'] leading-tight">
                    Rating
                  </div>
                </div>
                <div className="flex gap-1 mb-1" aria-label="4.5 out of 5 stars">
                  <StarIcon className="w-5 h-5 fill-amber-300 text-amber-300" />
                  <StarIcon className="w-5 h-5 fill-amber-300 text-amber-300" />
                  <StarIcon className="w-5 h-5 fill-amber-300 text-amber-300" />
                  <StarIcon className="w-5 h-5 fill-amber-300 text-amber-300" />
                  <div className="relative w-5 h-5">
                    <StarIcon className="w-5 h-5 fill-gray-300 text-gray-300 absolute inset-0" />
                    <div className="absolute inset-0 w-1/2 overflow-hidden">
                      <StarIcon className="w-5 h-5 fill-amber-300 text-amber-300" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Main Content */}
        <motion.div
          ref={contentRef}
          initial="hidden"
          animate={contentInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="text-white text-base sm:text-lg lg:text-xl font-normal font-['Poppins'] leading-relaxed">
            {/* First paragraph */}
            <motion.div variants={staggerItem} transition={{ delay: 0.2 }} className="mb-4">
              At White Trading Company, we&apos;re more than a supplier—we&apos;re your trusted
              partner in growth. Built on a foundation of integrity, innovation, and customer-first
              service, we strive to deliver exceptional value through high-quality products and
              reliable solutions.
            </motion.div>

            {/* Second paragraph */}
            <motion.div variants={staggerItem} transition={{ delay: 0.6 }} className="mb-4">
              Our mission is to empower businesses and individuals by making premium products and
              outstanding support easily accessible. Whether you&apos;re sourcing for retail,
              wholesale, or personal use, we&apos;re here to help you succeed.
            </motion.div>

            {/* Third paragraph */}
            <motion.div variants={staggerItem} transition={{ delay: 0.8 }}>
              Driven by our core values—trust, quality, and innovation—we are committed to building
              lasting relationships and exceeding expectations at every step.
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          ref={ctaRef}
          initial="hidden"
          animate={ctaInView ? 'visible' : 'hidden'}
          variants={slideInFromRight}
          transition={{ delay: 0.5 }}
          className="flex justify-center mb-12 sm:mb-16 lg:mb-20"
        >
          <button
            onClick={handleWhatsAppClick}
            className="px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-orange-500 rounded-xl inline-flex justify-start items-start gap-2.5 hover:bg-orange-600 hover:shadow-[0px_8px_16px_0px_rgba(0,0,0,0.35)] transition-all duration-300 ease-in-out hover:scale-105"
            aria-label="Book a service with White Trading Company"
          >
            <div className="justify-start text-white text-base sm:text-lg font-semibold font-['Manrope'] leading-loose">
              Book a service
            </div>
          </button>
        </motion.div>

        {/* Contacts Section */}
        <motion.div
          ref={contactsRef}
          initial="hidden"
          animate={contactsInView ? 'visible' : 'hidden'}
          variants={slideInFromRight}
          className="max-w-6xl mx-auto"
        >
          <motion.h4
            variants={slideInFromRight}
            className="text-center mb-12 sm:mb-16 text-2xl sm:text-3xl lg:text-4xl font-bold font-['Poppins'] text-white"
          >
            Contacts
          </motion.h4>

          <motion.div
            variants={slideInFromRight}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
          >
            {/* Phone Card */}
            <motion.div
              variants={slideInFromRight}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
            >
              <Link
                href="tel:+919843044489"
                className="flex flex-col items-center text-center cursor-pointer"
              >
                <div className="w-16 h-16 bg-[#5a6694] rounded-full flex items-center justify-center mb-4 lg:mb-6">
                  <PhoneIcon className="w-8 h-8 text-white" aria-hidden="true" />
                </div>
                <h5 className="text-white text-xl lg:text-2xl font-semibold font-['Poppins'] mb-3">
                  Phone
                </h5>
                <div className="space-y-2">
                  <div className="block text-white/90 text-base lg:text-lg font-medium font-['Poppins'] hover:text-orange-400 transition-colors duration-200">
                    98430 44489
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Email Card */}
            <motion.div
              variants={slideInFromRight}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
            >
              <Link
                href="mailto:info@whitetrading.in"
                className="flex flex-col items-center text-center cursor-pointer"
              >
                <div className="w-16 h-16 bg-[#5a6694] rounded-full flex items-center justify-center mb-4 lg:mb-6">
                  <MailIcon className="w-8 h-8 text-white" aria-hidden="true" />
                </div>
                <h5 className="text-white text-xl lg:text-2xl font-semibold font-['Poppins'] mb-3">
                  Email
                </h5>
                <div className="text-white/90 text-base lg:text-lg font-medium font-['Poppins'] hover:text-orange-400 transition-colors duration-200 break-all">
                  info@whitetrading.in
                </div>
              </Link>
            </motion.div>

            {/* Location Card */}
            <motion.div
              variants={slideInFromRight}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
            >
              <Link
                href="https://www.google.com/maps?q=10.99188232421875,76.97906494140625&z=17&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-center cursor-pointer"
              >
                <div className="w-16 h-16 bg-[#5a6694] rounded-full flex items-center justify-center mb-4 lg:mb-6">
                  <MapPinIcon className="w-8 h-8 text-white" aria-hidden="true" />
                </div>
                <h5 className="text-white text-xl lg:text-2xl font-semibold font-['Poppins'] mb-3">
                  Location
                </h5>
                <address className="text-white/90 text-base lg:text-lg font-medium font-['Poppins'] leading-relaxed not-italic">
                  Sungam Byepass Road
                  <br />
                  Ramanathapuram, Coimbatore
                  <br />
                  Tamil Nadu, India - 641045
                </address>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}
