'use client'
import { HomePage } from '@/payload-types'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

interface HeroSectionProps {
  carousal: HomePage['carousal']
}

export default function HeroSection({ carousal = [] }: HeroSectionProps) {
  const [current, setCurrent] = useState(0)
  const isMobile = useMediaQuery({ maxWidth: 635 })

  useEffect(() => {
    if (!carousal?.length) return
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carousal?.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [carousal?.length])

  // Generate structured data for the organization
  const generateStructuredData = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'White Trading Company',
      description:
        'Leading supplier of safety products, fruits & vegetables, grains & rice, food products, and textile materials',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://whitetradingcompany.com',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://whitetradingcompany.com'}/logo.svg`,
      },
      foundingDate: '2011',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '#45/2a-1, Sungam Bye Pass Road',
        addressLocality: 'Coimbatore',
        postalCode: '641045',
        addressCountry: 'IN',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-422-2321811',
        contactType: 'customer service',
        availableLanguage: 'English',
      },
      email: 'info@whitetradingcompany.com',
      areaServed: 'Coimbatore and beyond',
      serviceType: 'Safety Products, Fruits & Vegetables, Grains & Rice, Food Products, Textile',
    }
  }

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData()),
        }}
      />

      <section className="relative" aria-label="Hero section - White Trading Company introduction">
        {/* Large screen design */}
        <div className="hidden sm:block">
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden">
            {/* Carousel background */}
            {carousal?.map((img, idx) => {
              let src = ''

              // Handle the new structure where image is a URL string
              if (img.big_image && typeof img.big_image === 'string') {
                src = img.big_image
              }

              // If the URL doesn't start with http, prefix it with Bunny CDN
              if (src && !src.startsWith('http')) {
                src = `${process.env.NEXT_PUBLIC_BUNNY_CDN}${src}`
              }

              if (!src) return null
              return (
                <Image
                  key={src + idx}
                  src={src}
                  alt={img.alt || `Hero image ${idx + 1}`}
                  fill
                  unoptimized
                  className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 z-[1] ${idx === current ? 'opacity-100' : 'opacity-0'}`}
                  priority={idx === 0}
                />
              )
            })}
          </div>
          <div className="absolute inset-0 sm:top-[216px] md:top-[225px] lg:top-[177px] flex items-center justify-center z-[2] pointer-events-none px-4 sm:px-6 md:px-8">
            <div className="-z-10 md:z-10 -m-32 relative w-full max-w-[320px] sm:max-w-[500px] md:max-w-[700px] lg:max-w-[963px] h-[280px] sm:h-[234.5px] md:h-[329px] lg:h-[452px] flex flex-col items-center justify-between pointer-events-auto overflow-hidden gap-4 sm:gap-6 md:gap-8 lg:gap-10">
              {/* Background image as absolute positioned element */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/hero-section-bg.webp"
                  alt=""
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 320px, (max-width: 768px) 500px, (max-width: 1024px) 700px, 963px"
                />
              </div>

              {/* Centered bottom shadow */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-12px',
                  left: '12.5%',
                  right: '12.5%',
                  height: '5px',
                  background: 'gray',
                  zIndex: -1,
                  boxShadow:
                    '0 4px 16px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2), 0 8px 32px rgba(0,0,0,0.4), 0 12px 48px rgba(0,0,0,0.2), 0 16px 64px rgba(0,0,0,0.5), 0 24px 96px rgba(0,0,0,0.3), 0 32px 128px rgba(0,0,0,0.2)',
                }}
                aria-hidden="true"
              />
              <div className="relative z-10 flex flex-col items-start pl-4 sm:pl-8 md:pl-16 lg:pl-24 justify-center w-full h-full pt-6 sm:pt-8 md:pt-10 gap-2 sm:gap-3 md:gap-4">
                {!isMobile ? (
                  <h1 className="pl-2 sm:pl-4 md:pl-6 justify-start text-[#1C3A6A] text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-medium font-['Poppins'] leading-tight">
                    White Trading Company
                  </h1>
                ) : (
                  <p className="pl-2 sm:pl-4 md:pl-6 justify-start text-[#1C3A6A] text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-medium font-['Poppins'] leading-tight">
                    White Trading Company
                  </p>
                )}
                <div className="pl-2 sm:pl-4 md:pl-6 justify-start text-neutral-500 text-lg sm:text-xl md:text-2xl lg:text-4xl font-normal">
                  Worldwide Exporters & Supplier
                </div>
                <div className="pl-2 sm:pl-4 md:pl-6 justify-start text-neutral-500 text-base sm:text-lg md:text-xl lg:text-3xl font-normal">
                  over a decade now
                </div>
                <button
                  onClick={() => {
                    const phoneNumber = '+919544889253' // Replace with actual number
                    const message =
                      'Hello! I would like to schedule a call with your team to discuss your products and services.'
                    const encodedMessage = encodeURIComponent(message)
                    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
                    window.open(whatsappUrl, '_blank')
                  }}
                  className="w-full md:mt-10 max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[454px] h-10 sm:h-12 md:h-13 lg:h-14 relative bg-gradient-to-r from-[#1C3A6A] to-[#3661c1] rounded-[25px] sm:rounded-[30px] md:rounded-[40px] lg:rounded-[50px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-[0px_8px_16px_0px_rgba(0,0,0,0.35)] transition-all duration-300 ease-in-out cursor-pointer group"
                  aria-label="Schedule a call with our team"
                >
                  <div className="absolute inset-0 flex items-center justify-center text-white text-sm sm:text-base md:text-lg lg:text-2xl font-semibold tracking-wide px-4 text-center font-['Montserrat'] group-hover:text-blue-100 transition-colors duration-300">
                    Schedule a Call with Our Team
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Small screen design */}
        <div className="sm:hidden m-4 relative">
          <div className="relative w-full h-[44vh] md:h-[50vh] overflow-hidden rounded-2xl">
            {/* Carousel with small_image */}
            {carousal?.map((img, idx) => {
              let src = ''
              if (img.big_image && typeof img.big_image === 'string') {
                src = img.big_image
              }

              if (src && !src.startsWith('http')) {
                src = `${process.env.NEXT_PUBLIC_BUNNY_CDN}${src}`
              }

              if (!src) return null
              return (
                <Image
                  key={src + idx}
                  src={src}
                  alt={img.alt || `Mobile hero image ${idx + 1}`}
                  width={450}
                  height={200}
                  className={`absolute top-0 left-0 w-auto h-auto object-cover transition-opacity duration-1000 z-[2] ${idx === current ? 'opacity-100' : 'opacity-0'}`}
                  priority={idx === 0}
                />
              )
            })}
          </div>
        </div>
        <div className="hero-section-small-container sm:hidden absolute top-[43px] left-0 w-full h-[270px] flex flex-col items-center justify-center pointer-events-auto overflow-hidden rounded-b-2xl z-[1]">
          {/* Background image as absolute positioned element */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero-section-small-bg.webp"
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>

          <div className="hero-section-small relative mb-4 sm:mb-6 md:mb-8 z-10 flex flex-col items-start mt-24 w-auto md:w-full h-full gap-2 p-6">
            {isMobile ? (
              <h1 className="text-[#1C3A6A] text-[26px] font-medium font-['Poppins'] leading-tight">
                White Trading Company
              </h1>
            ) : (
              <p className="text-[#1C3A6A] text-[26px] font-medium font-['Poppins'] leading-tight">
                White Trading Company
              </p>
            )}
            <div className="text-[#1C3A6A] text-[18px] font-medium font-['Poppins']">
              Worldwide Exporters & Supplier
            </div>
            <div className="text-[#1C3A6A] text-sm font-normal font-['Poppins']">
              over a decade now
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
