import { Gallery } from '@/payload-types'
import Image from 'next/image'
import { PaginatedDocs } from 'payload'

export default function HomePageGallery({ gallery }: { gallery: PaginatedDocs<Gallery> }) {
  const images = gallery.docs[0]?.images as any

  // Use provided images with appropriate alt text
  const galleryImages = [
    {
      image: images[0]?.image
        ? process.env.NEXT_PUBLIC_BUNNY_CDN + images[0]?.image
        : 'https://white-trade.b-cdn.net/whitetrade/media/container-1751174575942.jpg',
      alt: 'Shipping container and logistics operations',
    },
    {
      image: images[1]?.image
        ? process.env.NEXT_PUBLIC_BUNNY_CDN + images[1]?.image
        : 'https://white-trade.b-cdn.net/whitetrade/media/boxes-1751174552418.jpg',
      alt: 'Product packaging and boxes ready for shipment',
    },
    {
      image: images[2]?.image
        ? process.env.NEXT_PUBLIC_BUNNY_CDN + images[2]?.image
        : 'https://white-trade.b-cdn.net/whitetrade/media/egg-store-1751174525649.jpg',
      alt: 'Egg store and fresh produce display',
    },
  ]

  return (
    <div className="my-20 w-full">
      <Image
        src="/export-stories.png"
        alt="Gallery"
        width={100}
        height={100}
        className="w-auto ml-52"
      />
      <div className="text-center text-black text-base font-normal font-['Manrope'] leading-normal -mt-3 mb-8">
        See how we prepare and deliver excellence from our warehouse to your doorstep.
      </div>
      <div className="relative h-[400px] w-full max-w-6xl mx-auto flex justify-center items-center px-4">
        {/* Left Image */}
        <div className="absolute left-28 top-8 z-10 transform transition-transform duration-500">
          <Image
            src={galleryImages[0]?.image}
            alt={galleryImages[0]?.alt || 'Gallery Image'}
            width={288}
            height={320}
            className="object-cover shadow-[0_20px_50px_rgba(0,0,0,0.3)] w-72 h-80 hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
          />
        </div>

        {/* Center Image - Main focal point */}
        <div className="relative z-20 mt-36 transform transition-transform duration-500">
          <Image
            src={galleryImages[1]?.image}
            alt={galleryImages[1]?.alt || 'Gallery Image'}
            width={320}
            height={384}
            className="object-cover shadow-[0_25px_60px_rgba(0,0,0,0.35)] w-[554px] h-96 hover:shadow-[0_35px_70px_rgba(0,0,0,0.45)]"
          />
        </div>

        {/* Right Image */}
        <div className="absolute right-28 top-8 z-10 transform transition-transform duration-500">
          <Image
            src={galleryImages[2]?.image}
            alt={galleryImages[2]?.alt || 'Gallery Image'}
            width={288}
            height={320}
            className="object-cover shadow-[0_20px_50px_rgba(0,0,0,0.3)] w-72 h-80 hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
          />
        </div>

        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-xl animate-pulse"
            style={{ animationDelay: '1s' }}
          ></div>
        </div>
      </div>
    </div>
  )
}
