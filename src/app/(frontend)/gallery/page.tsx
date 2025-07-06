import { getCachedGallery } from '@/lib/fetchMethods'
import { Gallery } from '@/payload-types'
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Gallery</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our collection of high-quality images showcasing our products, facilities, and
              commitment to excellence.
            </p>
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
