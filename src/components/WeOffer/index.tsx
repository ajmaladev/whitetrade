'use client'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import './weoffer.css'

// Define the actual type based on your data structure
type WeOfferItem = {
  id: string
  title: string
  description: string
  icon: string
}

type WeOfferData = {
  item: WeOfferItem[]
}

interface WeOfferProps {
  weOffer: WeOfferData
}

export const WeOffer = ({ weOffer }: WeOfferProps) => {
  const animationRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate')
          } else {
            entry.target.classList.remove('animate')
          }
        })
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        rootMargin: '0px 0px -100px 0px',
      },
    )

    animationRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref)
      }
    })

    return () => observer.disconnect()
  }, [weOffer])

  if (!weOffer || !weOffer.item || weOffer.item.length === 0) {
    return null
  }

  // Generate structured data for services
  const generateStructuredData = () => {
    const services = weOffer.item.map((item) => ({
      '@type': 'Service',
      name: item.title,
      description: item.description,
      image: process.env.NEXT_PUBLIC_BUNNY_CDN ? process.env.NEXT_PUBLIC_BUNNY_CDN + item.icon : '',
    }))

    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Our Services',
      description: 'Comprehensive range of services offered by White Trading Company',
      numberOfItems: services.length,
      itemListElement: services.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: service,
      })),
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

      <section
        className="relative overflow-clip mt-4 sm:mt-10 md:mt-14 w-full"
        aria-labelledby="we-offer-heading"
      >
        <div className="relative w-full">
          <h3
            id="we-offer-heading"
            className="text-center sm:ml-20 sticky top-0 py-4 text-[#3661c1] text-6xl sm:text-6xl lg:text-8xl xl:text-9xl font-bold font-['Poppins'] mb-8 sm:text-left"
          >
            We Offer
          </h3>

          <div
            className="relative flex flex-col mt-3 md:mt-10 lg:mt-20 w-full gap-4 sm:gap-12 lg:gap-16"
            role="list"
            aria-label="Services and offerings"
          >
            {weOffer.item.map((item: WeOfferItem, index: number) => {
              const isLeft = index % 2 === 0
              return (
                <article
                  key={item.id}
                  ref={(el) => {
                    animationRefs.current[index] = el
                  }}
                  className={`sticky pb-6 px-4 sm:px-6 top-0 ${isLeft ? 'left' : 'right'} bg-white pt-[60px] sm:pt-[80px] lg:pt-[156px] glass-container w-full`}
                  role="listitem"
                >
                  <div className={`${isLeft ? 'mr-auto lg:pl-8' : 'ml-auto lg:pr-8'}`}>
                    <div
                      className={`flex flex-col lg:flex-row ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-start gap-4 sm:gap-6 lg:gap-8 relative`}
                    >
                      <div
                        className={`flex flex-col ${isLeft ? 'items-start' : 'items-end lg:items-end'} gap-1 sm:gap-4 relative w-full lg:w-auto`}
                      >
                        {item.icon && (
                          <div
                            className={`flex-shrink-0 absolute w-32 h-32 sm:w-40 sm:h-40 lg:w-56 lg:h-56 rounded-full flex items-center justify-center p-2 mx-auto lg:mx-0 mb-4 lg:mb-0 ${
                              isLeft
                                ? 'lg:order-2 -top-[65px] sm:-top-[82px] right-0 sm:right-[36px] lg:-right-[150px] lg:-top-[120px]'
                                : 'lg:order-1  -top-[65px] sm:-top-[82px] left-0 sm:left-[36px] lg:-left-[150px] lg:-top-[120px]'
                            }`}
                            aria-hidden="true"
                          >
                            <Image
                              src={
                                process.env.NEXT_PUBLIC_BUNNY_CDN
                                  ? process.env.NEXT_PUBLIC_BUNNY_CDN + item.icon
                                  : ''
                              }
                              alt={`${item.title} service icon`}
                              width={224}
                              height={224}
                              className="w-16 h-16 sm:w-40 sm:h-40 lg:w-56 lg:h-56 object-contain"
                            />
                          </div>
                        )}
                        <div
                          className={`w-48 p-2.5 sm:w-[400px] md:w-[550px] sm:p-6 lg:p-7 bg-blue-600 ${isLeft ? '' : 'lg:text-right'}`}
                        >
                          <h3 className="text-white text-xs sm:text-2xl lg:text-3xl xl:text-[28px] font-bold font-['Manrope']">
                            {item.title}
                          </h3>
                        </div>
                        <div
                          className={`w-52 p-3 sm:w-[400px] md:w-[600px] ${
                            isLeft ? 'ml-16 md:ml-32' : 'mr-16 md:mr-32'
                          } p-4 sm:p-6 lg:p-7 bg-zinc-950 ${isLeft ? '' : 'lg:text-right'}`}
                        >
                          <p className="text-white text-[9.21px] sm:text-base lg:text-lg xl:text-xl font-normal font-['Manrope'] leading-relaxed lg:leading-loose">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
