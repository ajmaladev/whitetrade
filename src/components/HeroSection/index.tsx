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
      <div className="relative w-full h-[500px] overflow-hidden">
        {/* Carousel background */}
        {carousal.map((img, idx) => {
          let src = ''

          // Handle the new structure where image is a URL string
          if (img.image && typeof img.image === 'string') {
            src = img.image
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
              className={`absolute top-0 left-0 w-full !h-[500px] object-cover transition-opacity duration-1000 z-[1] ${idx === current ? 'opacity-100' : 'opacity-0'}`}
            />
          )
        })}
        {/* Overlay card */}
      </div>
      <div className="absolute inset-0 top-[23%] flex items-center justify-center z-[2] pointer-events-none">
        <div
          className="relative w-[963px] h-[452px] border-b-2 shadow-xl  flex flex-col items-center justify-between pointer-events-auto overflow-hidden gap-10"
          style={{
            backgroundImage: 'url(/hero-section-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '24px',
          }}
        >
          <div className="relative z-10 flex flex-col items-start pl-24 justify-center w-full h-full pt-10 gap-4">
            <h1 className="pl-6 justify-start text-[#1C3A6A] text-6xl font-medium font-['Poppins']">
              White Trading Company
            </h1>
            <div className="pl-6 justify-start text-neutral-500 text-4xl font-normal">
              Worldwide Exporters & Supplier
            </div>
            <div className="pl-6 justify-start text-neutral-500 text-3xl font-normal">
              over a decade now
            </div>
            <div className="w-[426px] top-[45px] h-14 relative bg-gradient-to-r from-[#1C3A6A] to-[#3661c1] rounded-[50px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
              <div className="left-[31px] top-[11px] absolute justify-start text-white text-2xl font-semibold tracking-wide">
                Schedule a Call with Our Team
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
