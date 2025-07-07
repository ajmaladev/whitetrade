import { generateDynamicSEO } from '@/components/SEO'
import { getCachedGallery } from '@/lib/fetchMethods'
import { Gallery } from '@/payload-types'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import GalleryGrid from './GalleryGrid'

export default async function GalleryPage() {
  const gallery = await getCachedGallery(100)()

  if (!gallery?.docs?.length) {
    notFound()
  }

  const galleryData = gallery.docs[0] as Gallery
  const images = galleryData?.images || []

  if (!images.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Gallery</h1>
          <p className="text-gray-600">No images available in the gallery.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1C3A6A] mb-4">Our Gallery</h1>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="container mx-auto px-4 ">
        <GalleryGrid images={images} />
      </div>
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const gallery = await getCachedGallery(100)()

  if (!gallery?.docs?.length) {
    return generateDynamicSEO({
      data: null,
      type: 'page',
      title: 'Gallery Not Found',
      description: 'The gallery could not be found on White Trading Company.',
    })
  }

  return generateDynamicSEO({
    data: gallery.docs[0] || null,
    type: 'page',
    title: 'White Trading Company Gallery - Product Showcase & Facilities',
    description:
      'Explore our comprehensive gallery showcasing White Trading Company products, trading facilities, and our commitment to excellence in financial services.',
    keywords: [
      'White Trading Company gallery',
      'trading platform images',
      'financial services photos',
      'trading facilities',
      'investment platform showcase',
      'trading tools gallery',
      'White Trading Company products',
      'trading software images',
      'financial technology gallery',
    ],
  })
}
