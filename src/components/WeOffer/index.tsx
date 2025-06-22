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
  const animationRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add animation class when element comes into view
            entry.target.classList.add('animate')
          } else {
            // Remove animation class when element goes out of view
            // This allows the animation to trigger again on next scroll
            entry.target.classList.remove('animate')
          }
        })
      },
      {
        threshold: 0.3,
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

  return (
    <section className="relative overflow-clip mt-10 md:mt-14">
      <div className="absolute top-0 left-0 w-[60%] h-full bg-gradient-to-b from-indigo-300 to-[#1C3A6A] -z-10"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative">
        <h2 className="text-white text-4xl sm:text-6xl lg:text-8xl xl:text-9xl font-bold font-['Poppins'] mb-8 sm:mb-12 lg:mb-16 text-left">
          We Offer
        </h2>

        <div className="relative flex flex-col sm:gap-12 lg:gap-16">
          {weOffer.item.map((item: WeOfferItem, index: number) => {
            const isLeft = index % 2 === 0
            return (
              <div
                key={item.id}
                ref={(el) => {
                  animationRefs.current[index] = el
                }}
                className={`animation-block relative mb-8 sm:mb-12 lg:mb-16 ${isLeft ? 'left' : 'right'}`}
                style={{ '--animation-order': index } as React.CSSProperties}
              >
                <div className={`${isLeft ? 'mr-auto lg:pl-8' : 'ml-auto lg:pr-8'}`}>
                  <div
                    className={`flex flex-col lg:flex-row ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-start gap-4 sm:gap-6 lg:gap-8 relative`}
                  >
                    <div
                      className={`flex flex-col ${isLeft ? 'items-start' : 'items-end lg:items-end'} gap-4 relative w-full lg:w-auto`}
                    >
                      {item.icon && (
                        <div
                          className={`flex-shrink-0 relative lg:absolute top-0 w-32 h-32 sm:w-40 sm:h-40 lg:w-56 lg:h-56 rounded-full flex items-center justify-center p-2 mx-auto lg:mx-0 mb-4 lg:mb-0 ${
                            isLeft
                              ? 'lg:order-2 lg:-right-[150px] lg:-top-[120px]'
                              : 'lg:order-1 lg:-left-[150px] lg:-top-[120px]'
                          }`}
                        >
                          <Image
                            src={
                              process.env.NEXT_PUBLIC_BUNNY_CDN
                                ? process.env.NEXT_PUBLIC_BUNNY_CDN + item.icon
                                : ''
                            }
                            alt={item.title || ''}
                            width={224}
                            height={224}
                            className="w-24 h-24 sm:w-40 sm:h-40 lg:w-56 lg:h-56 object-contain"
                          />
                        </div>
                      )}
                      <div
                        className={`w-48 p-2.5 sm:w-[400px] md:w-[550px] sm:p-6 lg:p-7 bg-blue-600 ${isLeft ? '' : 'lg:text-right'}`}
                      >
                        <h3 className="text-white text-xs sm:text-2xl lg:text-3xl xl:text-4xl font-bold font-['Manrope']">
                          {item.title}
                        </h3>
                      </div>
                      <div
                        className={`w-52 p-2.5 sm:w-[400px] md:w-[600px] ${
                          isLeft ? 'ml-16 md:ml-32' : 'mr-16 md:mr-32'
                        } p-4 sm:p-6 lg:p-7 bg-zinc-950 ${isLeft ? '' : 'lg:text-right'}`}
                      >
                        <p className="text-white text-[7.43px] sm:text-base lg:text-lg xl:text-xl font-normal font-['Manrope'] leading-relaxed lg:leading-loose">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {weOffer.item && index <= weOffer.item.length - 1 && (
                  <div
                    className={`w-full max-w-[710px] my-8 sm:my-12 lg:my-20 relative flex items-center mx-auto lg:mx-0 ${
                      isLeft ? 'lg:ml-[220px]' : 'lg:ml-[420px]'
                    }`}
                  >
                    <div className="h-px bg-blue-600 w-full absolute top-1/2 left-0 -translate-y-1/2"></div>
                    <div className="w-full flex items-center justify-between relative">
                      {Array.from({ length: weOffer.item.length }).map((_, dotIndex) => {
                        const isActive = dotIndex === index + 1

                        if (isActive) {
                          return (
                            <div
                              key={dotIndex}
                              className="w-3 sm:w-3.5 h-3 sm:h-3.5 bg-blue-600 rounded-full"
                            />
                          )
                        }

                        return (
                          <div
                            key={dotIndex}
                            className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-indigo-500 rounded-full"
                          />
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
