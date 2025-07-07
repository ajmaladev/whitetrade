'use client'
import { HomePage } from '@/payload-types'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import React, { useRef, useState } from 'react'

interface Review {
  user_name?: string | null
  user_role?: string | null
  review?: string | null
  user_image?: string | null
  id?: string | null
}

const ReviewCard: React.FC<Review> = ({ user_name, user_role, review, user_image }) => {
  return (
    <article
      className="w-[280px] sm:w-[400px] md:w-[500px] lg:w-[600px] flex-shrink-0 p-4 sm:p-6 md:p-8 lg:p-10 bg-white rounded-[10px] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.05)] flex flex-col justify-start items-start gap-4 sm:gap-6"
      itemScope
      itemType="https://schema.org/Review"
    >
      <div className="self-stretch flex justify-start items-center gap-3 sm:gap-3.5">
        <img
          className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full ring-4 ring-blue-600/30 flex-shrink-0"
          src={
            user_image
              ? process.env.NEXT_PUBLIC_BUNNY_CDN + user_image
              : 'https://placehold.co/80x80'
          }
          alt={`${user_name || 'User'} profile picture`}
          itemProp="author"
        />
        <div className="flex flex-col justify-center items-start gap-1 min-w-0 flex-1">
          <div
            className="text-blue-600 text-lg sm:text-xl font-extrabold truncate w-full"
            itemProp="author"
          >
            {user_name || 'Anonymous'}
          </div>
          <div
            className="text-zinc-500 text-sm sm:text-base font-medium truncate w-full"
            itemProp="reviewBody"
          >
            {user_role || 'Customer'}
          </div>
        </div>
      </div>
      <div
        className="self-stretch text-neutral-800 text-sm sm:text-base font-normal leading-relaxed"
        itemProp="reviewBody"
      >
        {review || 'No review available'}
      </div>
    </article>
  )
}

export const Reviews = ({ reviews }: { reviews: HomePage['reviews'] }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Use dynamic reviews data or fallback to empty array
  const reviewsData = reviews || []
  const reviewsLength = reviewsData.length

  // Generate structured data for reviews
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'White Trading Company Customer Reviews',
    description: 'Customer testimonials and reviews for White Trading Company services',
    numberOfItems: reviewsLength,
    itemListElement: reviewsData.map((review, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: review.user_name || 'Anonymous',
        },
        reviewBody: review.review || 'No review available',
        itemReviewed: {
          '@type': 'Service',
          name: 'White Trading Company Services',
          provider: {
            '@type': 'Organization',
            name: 'White Trading Company',
          },
        },
      },
    })),
  }

  const scrollToNext = () => {
    if (scrollContainerRef.current && reviewsLength > 0) {
      const container = scrollContainerRef.current
      const cardWidth =
        container.clientWidth < 640
          ? 280 + 16
          : container.clientWidth < 768
            ? 400 + 16
            : container.clientWidth < 1024
              ? 500 + 16
              : 600 + 32
      const maxScroll = container.scrollWidth - container.clientWidth
      const newScrollLeft = Math.min(container.scrollLeft + cardWidth, maxScroll)

      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      })

      setCurrentIndex((prev) => Math.min(prev + 1, reviewsLength - 1))
    }
  }

  const scrollToPrevious = () => {
    if (scrollContainerRef.current && reviewsLength > 0) {
      const container = scrollContainerRef.current
      const cardWidth =
        container.clientWidth < 640
          ? 280 + 16
          : container.clientWidth < 768
            ? 400 + 16
            : container.clientWidth < 1024
              ? 500 + 16
              : 600 + 32
      const newScrollLeft = Math.max(container.scrollLeft - cardWidth, 0)

      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      })

      setCurrentIndex((prev) => Math.max(prev - 1, 0))
    }
  }

  const isAtStart = currentIndex === 0
  const isAtEnd = currentIndex === reviewsLength - 1

  // Don't render if no reviews
  if (reviewsLength === 0) {
    return null
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section
        className="relative overflow-hidden w-full min-h-[80vh] sm:min-h-[120vh]"
        aria-labelledby="reviews-heading"
      >
        <img
          src="/testimonial-background.webp"
          alt="Testimonial background"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: -1 }}
        />

        <div className="container px-2 sm:px-6 lg:px-8 relative z-10">
          <h3
            id="reviews-heading"
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 mt-24 sm:mt-20 md:mt-24 lg:mt-[100px] ml-0 sm:ml-8 md:ml-12 lg:ml-[57px]"
          >
            Loved Across Continents
          </h3>

          <div className="flex flex-col lg:flex-row mt-8 sm:mt-12 md:mt-16 lg:mt-20 pb-4 px-2 sm:px-4 lg:gap-9 lg:items-center">
            {/* Navigation Section */}
            <div className="flex md:flex-col gap-1 md:gap-0 items-center lg:items-start mb-6 lg:mb-0 lg:mt-12 lg:ml-[12%] xl:ml-[17%]">
              <p className="text-md sm:text-xl font-semibold text-gray-700">Clients</p>
              <h3 className="text-md sm:text-xl font-semibold text-gray-700 md:text-gray-800">
                Testimonials
              </h3>
              <div className="hidden lg:flex items-center gap-2 mt-4 sm:mt-7">
                <button
                  onClick={scrollToPrevious}
                  disabled={isAtStart}
                  className={`p-2 rounded-full transition-all duration-200 ${
                    isAtStart
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
                  }`}
                  aria-label="Previous testimonial"
                  type="button"
                >
                  <ChevronLeftIcon
                    size={24}
                    className="sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-[30px] lg:h-[30px]"
                    aria-hidden="true"
                  />
                </button>
                <button
                  onClick={scrollToNext}
                  disabled={isAtEnd}
                  className={`p-2 rounded-full transition-all duration-200 ${
                    isAtEnd
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
                  }`}
                  aria-label="Next testimonial"
                  type="button"
                >
                  <ChevronRightIcon
                    size={24}
                    className="sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-[30px] lg:h-[30px]"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>

            {/* Cards Container */}
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto space-x-4 sm:space-x-6 md:space-x-8 scrollbar-hide scroll-smooth w-full"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              role="list"
              aria-label="Customer testimonials"
            >
              {reviewsData.map((item, index) => (
                <ReviewCard
                  key={item.id || index}
                  user_name={item.user_name}
                  user_role={item.user_role}
                  review={item.review}
                  user_image={item.user_image}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
