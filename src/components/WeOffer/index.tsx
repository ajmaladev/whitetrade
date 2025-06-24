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

  return (
    <section className="relative overflow-clip mt-10 md:mt-14 w-full">
      {/* <div className="absolute top-0 left-0 w-[60%] h-full bg-gradient-to-b from-indigo-300 to-[#1C3A6A] -z-10"></div> */}
      <div className="relative w-full">
        <h2 className="text-center sm:ml-20 sticky top-0 py-4 text-[#3661c1] text-6xl sm:text-6xl lg:text-8xl xl:text-9xl font-bold font-['Poppins'] mb-8 sm:text-left">
          We Offer
        </h2>

        <div className="relative flex flex-col mt-10 md:mt-20 w-full gap-8 sm:gap-12 lg:gap-16 ">
          {weOffer.item.map((item: WeOfferItem, index: number) => {
            const isLeft = index % 2 === 0
            return (
              <div
                key={item.id}
                ref={(el) => {
                  animationRefs.current[index] = el
                }}
                className={`sticky pb-6 px-4 sm:px-6 top-0 ${isLeft ? 'left' : 'right'} bg-white lg:pt-[156px] glass-container w-full`}
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
                        <h3 className="text-white text-xs sm:text-2xl lg:text-3xl xl:text-[28px] font-bold font-['Manrope']">
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
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
