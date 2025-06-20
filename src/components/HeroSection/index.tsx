'use client'
import { Carousal } from '@/payload-types'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface HeroSectionProps {
  carousal: Carousal[]
}

export default function HeroSection({ carousal = [] }: HeroSectionProps) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!carousal.length) return
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carousal.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [carousal.length])

  return (
    <>
      {/* Large screen design */}
      <div className="hidden md:block">
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
                alt={img.alt || ''}
                fill
                unoptimized
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 z-[1] ${idx === current ? 'opacity-100' : 'opacity-0'}`}
              />
            )
          })}
        </div>
        <div className="absolute inset-0 top-[100px] sm:top-[120px] md:top-[150px] lg:top-[177px] flex items-center justify-center z-[2] pointer-events-none px-4 sm:px-6 md:px-8">
          <div
            className="relative w-full max-w-[320px] sm:max-w-[500px] md:max-w-[700px] lg:max-w-[963px] h-[280px] sm:h-[320px] md:h-[380px] lg:h-[452px] flex flex-col items-center justify-between pointer-events-auto overflow-hidden gap-4 sm:gap-6 md:gap-8 lg:gap-10 "
            style={{
              backgroundImage: 'url(/hero-section-bg.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="relative z-10 flex flex-col items-start pl-4 sm:pl-8 md:pl-16 lg:pl-24 justify-center w-full h-full pt-6 sm:pt-8 md:pt-10 gap-2 sm:gap-3 md:gap-4">
              <h1 className="pl-2 sm:pl-4 md:pl-6 justify-start text-[#1C3A6A] text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-medium font-['Poppins'] leading-tight">
                White Trading Company
              </h1>
              <div className="pl-2 sm:pl-4 md:pl-6 justify-start text-neutral-500 text-lg sm:text-xl md:text-2xl lg:text-4xl font-normal">
                Worldwide Exporters & Supplier
              </div>
              <div className="pl-2 sm:pl-4 md:pl-6 justify-start text-neutral-500 text-base sm:text-lg md:text-xl lg:text-3xl font-normal">
                over a decade now
              </div>
              <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[426px] h-10 sm:h-12 md:h-13 lg:h-14 relative bg-gradient-to-r from-[#1C3A6A] to-[#3661c1] rounded-[25px] sm:rounded-[30px] md:rounded-[40px] lg:rounded-[50px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                <div className="absolute inset-0 flex items-center justify-center text-white text-sm sm:text-base md:text-lg lg:text-2xl font-semibold tracking-wide px-4 text-center">
                  Schedule a Call with Our Team
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Small screen design */}
      <div className="block md:hidden">
        <div className="relative w-full px-5 rounded-2xl h-[180px] overflow-hidden">
          {/* Carousel with small_image */}
          {carousal?.map((img, idx) => {
            let src = ''
            if (img.small_image && typeof img.small_image === 'string') {
              src = img.small_image
            }

            if (src && !src.startsWith('http')) {
              src = `${process.env.NEXT_PUBLIC_BUNNY_CDN}${src}`
            }

            if (!src) return null
            return (
              <Image
                key={src + idx}
                src={src}
                alt={img.alt || ''}
                fill
                unoptimized
                className={`absolute top-0 left-0 px-5 w-full h-full object-contain transition-opacity duration-1000 z-[1] ${idx === current ? 'opacity-100' : 'opacity-0'}`}
              />
            )
          })}
        </div>
        <div
          className="relative w-full h-auto flex flex-col items-center justify-center pointer-events-auto overflow-hidden p-6"
          style={{
            backgroundImage: 'url(/hero-section-bg.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="relative z-10 flex flex-col items-start justify-center w-full h-full gap-4 pl-7">
            <h1 className="justify-start text-sky-950 text-2xl font-medium font-['Poppins'] leading-tight">
              White Trading Company
            </h1>
            <div className="justify-start text-sky-950 text-xl font-normal">
              Worldwide Exporters & Supplier
            </div>
            <div className="justify-start text-sky-950 text-lg font-normal">over a decade now</div>
          </div>
        </div>
      </div>
    </>
  )
}
