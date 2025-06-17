'use client'
import { Carousal } from '@/payload-types'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface HeroSectionProps {
  carousal: Carousal[]
}

export default function HeroSection({ carousal = [] }: HeroSectionProps) {
  console.log(carousal)
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

          console.log(src, 'src')
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
          className="relative w-[963px] h-[452px] flex flex-col items-center justify-center pointer-events-auto overflow-hidden gap-10"
          style={{
            backgroundImage: 'url(/hero-section-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '24px',
          }}
        >
          <div className="relative z-10 flex flex-col items-start pl-28 justify-center w-full h-full gap-7">
            <h1 className="pl-7 justify-start text-cyan-900 text-6xl font-medium">
              White Trading Company
            </h1>
            <div className="pl-7 justify-start text-neutral-500 text-4xl font-normal">
              Worldwide Exporters & Supplier
            </div>
            <div className="pl-7 justify-start text-neutral-500 text-3xl font-normal">
              over a decade now
            </div>
            <div className="w-[488px] h-14 relative bg-gradient-to-r from-cyan-900 to-blue-600 rounded-[50px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
              <div className="left-[31px] top-[11px] absolute justify-start text-white text-2xl font-semibold">
                Schedule a Call with Our Team
              </div>
            </div>
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[1] pointer-events-none"
              style={{
                width: '90%',
                height: '3px',
                filter: 'blur(4px)',
              }}
            >
              <div className="w-full h-full rounded-full bg-black/30"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
