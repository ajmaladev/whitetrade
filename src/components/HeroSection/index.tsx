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
          <div className="relative w-full h-[300px] sm:h-[300px] md:h-[370px] lg:h-[493px] overflow-hidden">
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

            {/* Overlay image covering 3/4 width, centered */}
            <div className="absolute -top-[7px] left-0 z-[2] h-full w-[3/4] md:w-full  pointer-events-none">
              <Image
                src="/hero-large-bg-Sz.webp"
                alt=""
                width={1000}
                height={1000}
                className="object-contain rounded-3xl"
                style={{ objectPosition: 'center' }}
              />
            </div>

            {/* Card on top, left-aligned */}
            <div className="absolute inset-0 flex items-start justify-start z-[3] lg:pt-32 pt-24 pointer-events-none">
              <div
                className="rounded-r-[27px] lg:pl-36 lg:pr-20  pl-10 pr-10 py-6 pointer-events-auto "
                style={{
                  background:
                    'linear-gradient(90deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.74) 100%), rgba(255, 255, 255, 0.38)',
                }}
              >
                <div className="text-[#1C3A6A] text-3xl md:text-4xl lg:text-5xl font-semibold font-['Montserrat'] mb-2">
                  WHITE TRADING COMPANY
                </div>
                <div className="text-[#1C3A6A] text-xl md:text-2xl lg:text-4xl font-normal font-['Montserrat'] mb-1">
                  Worldwide Exporters & Supplier
                </div>
                <div className="text-[#1C3A6A] text-base md:text-2xl lg:text-3xl font-normal font-['Montserrat']">
                  over a decade now
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white mx-auto mt-6 pl-20 pr-10 py-3 w-fit rounded-[50px] shadow-[0px_4px_4px_0px_rgba(240,246,255,1.00)] outline outline-1 outline-offset-[-1px] outline-[#1C3A6A] flex gap-3 items-center justify-center">
            <div className=" justify-start text-[#1C3A6A] text-2xl font-normal font-['Montserrat']">
              Schedule a Call with Our Team
            </div>
            <Image
              src="/right-arrow.svg"
              alt="arrow-right"
              width={20}
              height={20}
              className="w-6 h-6"
            />
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
                <div key={src + idx} className={`absolute top-0 left-0 z-[2]`}>
                  <Image
                    src={src}
                    alt={img.alt || `Mobile hero image ${idx + 1}`}
                    width={450}
                    height={200}
                    className={`w-auto h-auto object-cover transition-opacity duration-1000 ${idx === current ? 'opacity-100' : 'opacity-0'}`}
                    priority={idx === 0}
                  />
                </div>
              )
            })}
          </div>
          <div className="flex flex-col absolute top-0 left-0 items-start justify-start z-[3] xs:mt-[162px] mt-[120px] pointer-events-none">
            <div
              className="rounded-r-[9.56px] px-7 py-3 pointer-events-auto "
              style={{
                background:
                  'linear-gradient(90deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.74) 100%), rgba(255, 255, 255, 0.38)',
              }}
            >
              <div className="text-[#1C3A6A] text-base xs:text-lg font-semibold font-['Montserrat']">
                WHITE TRADING COMPANY
              </div>
              <div className="text-[#1C3A6A] text-sm xs:text-base font-normal font-['Montserrat']">
                Worldwide Exporters & Supplier
              </div>
              <div className="text-[#1C3A6A] text-xs xs:text-sm font-normal font-['Montserrat']">
                over a decade now
              </div>
            </div>
            <div className="bg-white mx-auto mt-6 pl-[32px] pr-[16px] py-[5px] w-fit rounded-[50px] shadow-[0px_4px_4px_0px_rgba(240,246,255,1.00)] outline outline-1 outline-offset-[-1px] outline-[#1C3A6A] flex gap-3 items-center justify-center">
              <div className=" justify-start text-[#1C3A6A] text-[10.23px] font-normal font-['Montserrat']">
                Schedule a Call with Our Team
              </div>
              <Image
                src="/right-arrow.svg"
                alt="arrow-right"
                width={20}
                height={20}
                className="w-6 h-6"
              />
            </div>
          </div>
        </div>
        <div className="hero-section-small-container sm:hidden absolute top-[43px] left-0 w-full h-[284px] flex flex-col items-center justify-center pointer-events-auto overflow-hidden rounded-b-2xl z-[1]">
          {/* Background image as absolute positioned element */}
          <div className="absolute inset-0 z-0">
            <Image src="/mob-map-bg.webp" alt="" fill className="object-cover" sizes="100vw" />
          </div>
        </div>
      </section>
    </>
  )
}
