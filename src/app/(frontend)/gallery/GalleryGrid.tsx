'use client'

import { Gallery } from '@/payload-types'
import { ChevronLeft, ChevronRight, RotateCcw, X, ZoomIn, ZoomOut } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

interface GalleryGridProps {
  images: Gallery['images']
}
export default function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set())

  // Create dynamic layout patterns for visual interest
  const getImageClass = (index: number) => {
    const patterns = [
      'col-span-1 row-span-1', // Standard
      'col-span-2 row-span-1', // Wide
      'col-span-1 row-span-2', // Tall
      'col-span-2 row-span-2', // Large
    ]

    // Create a more interesting pattern distribution
    if (index % 7 === 0) return patterns[3] // Large every 7th
    if (index % 5 === 0) return patterns[2] // Tall every 5th
    if (index % 3 === 0) return patterns[1] // Wide every 3rd
    return patterns[0] // Standard for others
  }

  // Staggered animation for images appearing one by one
  useEffect(() => {
    if (!images) return

    const staggerDelay = 150 // 150ms delay between each image
    const timers: NodeJS.Timeout[] = []

    images.forEach((_, index) => {
      const timer = setTimeout(() => {
        setVisibleImages((prev) => new Set([...prev, index]))
      }, index * staggerDelay)
      timers.push(timer)
    })

    return () => {
      timers.forEach((timer) => clearTimeout(timer))
    }
  }, [images])

  const openModal = (index: number) => {
    setSelectedImage(index)
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedImage(null)
    document.body.style.overflow = 'unset'
  }

  const nextImage = () => {
    if (selectedImage !== null && images) {
      setSelectedImage((selectedImage + 1) % images.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null && images) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1)
    }
  }

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set([...prev, index]))
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isModalOpen) return

      switch (event.key) {
        case 'Escape':
          closeModal()
          break
        case 'ArrowLeft':
          prevImage()
          break
        case 'ArrowRight':
          nextImage()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen, selectedImage, images])

  if (!images || images.length === 0) {
    return null
  }

  return (
    <>
      {/* Main Gallery Grid */}
      <div className="md:p-6 p-2 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          {/* Dynamic Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[200px]">
            {images.map((imageItem, index) => {
              const imageUrl = imageItem?.image
                ? `${process.env.NEXT_PUBLIC_BUNNY_CDN}${imageItem.image}`
                : `https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80`

              const isVisible = visibleImages.has(index)
              const isLoaded = loadedImages.has(index)

              return (
                <div
                  key={imageItem.id || index}
                  className={`group relative overflow-hidden rounded-2xl cursor-pointer transform transition-all duration-700 hover:scale-[1.02] hover:z-10 ${getImageClass(index)} ${
                    isVisible
                      ? 'opacity-100 translate-y-0 scale-100'
                      : 'opacity-0 translate-y-8 scale-95'
                  }`}
                  onClick={() => openModal(index)}
                  style={{
                    background: `linear-gradient(45deg, 
                      hsl(${(index * 137.5) % 360}, 70%, 85%), 
                      hsl(${(index * 137.5 + 60) % 360}, 70%, 90%))`,
                    transitionDelay: `${index * 50}ms`,
                  }}
                >
                  {/* Image Container */}
                  <div className="relative w-full h-full">
                    <Image
                      src={imageUrl}
                      width={100}
                      height={100}
                      alt={`Gallery image ${index + 1}`}
                      className={`w-full h-full object-cover transition-all duration-700 
                        ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}
                        group-hover:scale-110 group-hover:rotate-1`}
                      onLoad={() => handleImageLoad(index)}
                      loading={index < 6 ? 'eager' : 'lazy'}
                    />

                    {/* Loading Skeleton */}
                    {!isLoaded && (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Hover Effects */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 border border-white/30">
                        <ZoomIn className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Image Number Badge */}
                    <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-2 py-1 rounded-full border border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      #{index + 1}
                    </div>

                    {/* Creative Corner Element */}
                    <div
                      className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        borderTopColor: `hsl(${(index * 137.5) % 360}, 80%, 60%)`,
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Enhanced Modal */}
      {isModalOpen && selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={closeModal}
        >
          <div
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center p-6">
              <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <span className="text-white font-medium">
                  {selectedImage + 1} of {images.length}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={closeModal}
                  className="bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full p-3 transition-all duration-200 border border-white/20 group"
                >
                  <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full p-3 transition-all duration-200 border border-white/20 group"
            >
              <ChevronLeft className="w-6 h-6 text-white group-hover:-translate-x-1 transition-transform duration-300" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full p-3 transition-all duration-200 border border-white/20 group"
            >
              <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            {/* Main Image Container with Zoom */}
            <div className="relative w-full h-full flex items-center justify-center">
              <TransformWrapper
                initialScale={1}
                minScale={0.5}
                maxScale={3}
                centerOnInit
                wheel={{ step: 0.1 }}
                pinch={{ step: 5 }}
                doubleClick={{ step: 2 }}
              >
                {({ zoomIn, zoomOut, resetTransform, instance }) => (
                  <>
                    <TransformComponent
                      wrapperClass="w-full h-full flex items-center justify-center"
                      contentClass="w-full h-full flex items-center justify-center"
                    >
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BUNNY_CDN}${images[selectedImage]?.image || ''}`}
                        alt={`Gallery image ${selectedImage + 1}`}
                        className="max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl animate-scale-in"
                        width={1200}
                        height={800}
                        priority
                        draggable={false}
                      />
                    </TransformComponent>

                    {/* Zoom Controls */}
                    <div className="absolute top-20 right-6 z-30 flex flex-col space-y-2">
                      <button
                        onClick={() => zoomIn()}
                        className="bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full p-3 transition-all duration-200 border border-white/20 group"
                        disabled={instance.transformState.scale >= 3}
                      >
                        <ZoomIn className="w-4 h-4 text-white" />
                      </button>

                      <button
                        onClick={() => zoomOut()}
                        className="bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full p-3 transition-all duration-200 border border-white/20 group"
                        disabled={instance.transformState.scale <= 0.5}
                      >
                        <ZoomOut className="w-4 h-4 text-white" />
                      </button>

                      <button
                        onClick={() => resetTransform()}
                        className="bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full p-3 transition-all duration-200 border border-white/20 group"
                      >
                        <RotateCcw className="w-4 h-4 text-white" />
                      </button>
                    </div>

                    {/* Zoom Level Indicator */}
                    {instance.transformState.scale !== 1 && (
                      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
                        <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                          <span className="text-white font-medium">
                            {Math.round(instance.transformState.scale * 100)}%
                          </span>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </TransformWrapper>
            </div>

            {/* Image Thumbnails Strip */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
              <div className="flex space-x-2 bg-white/10 backdrop-blur-md rounded-lg p-2 border border-white/20">
                {(() => {
                  // Calculate the range to show exactly 5 thumbnails
                  const totalImages = images.length
                  let startIndex = Math.max(0, selectedImage - 2)
                  let endIndex = Math.min(totalImages, selectedImage + 3)

                  // Adjust if we're near the beginning
                  if (selectedImage < 2) {
                    endIndex = Math.min(totalImages, 5)
                  }

                  // Adjust if we're near the end
                  if (selectedImage >= totalImages - 3) {
                    startIndex = Math.max(0, totalImages - 5)
                    endIndex = totalImages
                  }

                  return images.slice(startIndex, endIndex).map((img, idx) => {
                    const actualIndex = startIndex + idx
                    return (
                      <button
                        key={actualIndex}
                        onClick={() => setSelectedImage(actualIndex)}
                        className={`w-12 h-12 rounded-lg overflow-hidden transition-all duration-200 border-2 ${
                          actualIndex === selectedImage
                            ? 'border-white scale-110'
                            : 'border-white/30 hover:border-white/60'
                        }`}
                      >
                        <Image
                          src={`${process.env.NEXT_PUBLIC_BUNNY_CDN}${img?.image || ''}`}
                          alt=""
                          width={100}
                          height={100}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </button>
                    )
                  })
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.4s ease-out;
        }
      `}</style>
    </>
  )
}
