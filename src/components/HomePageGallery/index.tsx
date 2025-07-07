'use client'
import { Gallery } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { PaginatedDocs } from 'payload'
import { useInView } from 'react-intersection-observer'

export default function HomePageGallery({ gallery }: { gallery: PaginatedDocs<Gallery> }) {
  const images = gallery.docs[0]?.images as any

  const { ref, inView } = useInView({
    threshold: 1.0,
    triggerOnce: true,
    rootMargin: '0px',
  })

  const galleryImages = [
    {
      image: images[0]?.image
        ? process.env.NEXT_PUBLIC_BUNNY_CDN + images[0]?.image
        : 'https://white-trade.b-cdn.net/whitetrade/media/container-1751174575942.jpg',
      alt: 'White Trading Company shipping container and logistics operations',
    },
    {
      image: images[1]?.image
        ? process.env.NEXT_PUBLIC_BUNNY_CDN + images[1]?.image
        : 'https://white-trade.b-cdn.net/whitetrade/media/boxes-1751174552418.jpg',
      alt: 'White Trading Company product packaging and boxes ready for shipment',
    },
    {
      image: images[2]?.image
        ? process.env.NEXT_PUBLIC_BUNNY_CDN + images[2]?.image
        : 'https://white-trade.b-cdn.net/whitetrade/media/egg-store-1751174525649.jpg',
      alt: 'White Trading Company egg store and fresh produce display',
    },
  ]

  // Generate structured data for the gallery
  const generateStructuredData = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'ImageGallery',
      name: 'White Trading Company Gallery',
      description: 'See how we prepare and deliver excellence from our warehouse to your doorstep',
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://whitetradingcompany.com'}/gallery`,
      image: galleryImages.map((img) => ({
        '@type': 'ImageObject',
        url: img.image,
        caption: img.alt,
      })),
      publisher: {
        '@type': 'Organization',
        name: 'White Trading Company',
      },
    }
  }

  if (!inView) {
    return <div className="h-96 w-full" ref={ref}></div>
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
        className="lg:mt-20 lg:mb-40 mb-10 md:mb-32 mt-0 w-full"
        aria-labelledby="gallery-heading"
      >
        <Image
          src="/export-stories.webp"
          alt="Export Stories Gallery"
          width={1000}
          height={1000}
          priority
          className="w-full md:w-[36%] lg:ml-52 px-6 sm:mx-auto"
        />
        <h2
          id="gallery-heading"
          className="text-center text-black text-base font-normal font-['Manrope'] leading-normal mt-3 lg:-mt-3 mb-8"
        >
          See how we prepare and deliver excellence from our warehouse to your doorstep.
        </h2>
        <Link
          href="/gallery"
          className="relative h-[400px] w-full md:max-w-6xl mx-auto flex justify-center items-center px-4"
          aria-label="View full gallery of our operations and facilities"
        >
          {/* Left Image - Animates from left */}
          <figure className="absolute left-6 md:left-28 top-8 z-10 animate-slide-in-left hover:scale-105 transition-transform duration-300 cursor-pointer">
            <Image
              src={galleryImages[0]?.image}
              alt={galleryImages[0]?.alt || 'Gallery Image'}
              width={288}
              height={320}
              className="object-cover shadow-[0_20px_50px_rgba(0,0,0,0.3)] w-40 h-48 sm:w-64 sm:h-72 md:w-72 md:h-80 hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
            />
            <figcaption className="sr-only">{galleryImages[0]?.alt}</figcaption>
          </figure>

          {/* Center Image - Animates from bottom */}
          <figure className="relative z-20 mt-36 animate-slide-in-bottom hover:scale-105 transition-transform duration-300 cursor-pointer">
            <Image
              src={galleryImages[1]?.image}
              alt={galleryImages[1]?.alt || 'Gallery Image'}
              width={320}
              height={384}
              className="object-cover shadow-[0_25px_60px_rgba(0,0,0,0.35)] w-72 h-56 sm:w-64 sm:h-72 md:w-[554px] md:h-96 hover:shadow-[0_35px_70px_rgba(0,0,0,0.45)]"
            />
            <figcaption className="sr-only">{galleryImages[1]?.alt}</figcaption>
          </figure>

          {/* Right Image - Animates from right */}
          <figure className="absolute right-6 md:right-28 top-8 z-10 animate-slide-in-right hover:scale-105 transition-transform duration-300 cursor-pointer">
            <Image
              src={galleryImages[2]?.image}
              alt={galleryImages[2]?.alt || 'Gallery Image'}
              width={288}
              height={320}
              className="object-cover shadow-[0_20px_50px_rgba(0,0,0,0.3)] w-40 h-48 sm:w-64 sm:h-72 md:w-72 md:h-80 hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
            />
            <figcaption className="sr-only">{galleryImages[2]?.alt}</figcaption>
          </figure>

          {/* Background decorative elements */}
          <div className="absolute inset-0 -z-10" aria-hidden="true">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
            <div
              className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-xl animate-pulse"
              style={{ animationDelay: '1s' }}
            ></div>
          </div>
        </Link>
      </section>
    </>
  )
}
