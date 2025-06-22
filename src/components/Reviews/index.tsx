'use client'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import React, { useRef, useState } from 'react'

interface Testimonial {
  name: string
  title: string
  testimonial: string
  image: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Esther Hills',
    title: 'Lead Intranet Technician',
    testimonial:
      'Omnis totam molestiae delectus nemo alias nesciunt harum et. Nobis dolorum excepturi quod vel. Sunt est qui ab non dolores repellat rem impedit dolores. Ut ea rerum cum eum. Alias dolores tempore illo accusantium est et voluptatem voluptas.',
    image: 'https://placehold.co/80x80',
  },
  {
    name: 'Ethel Johnson',
    title: 'Human Directives',
    testimonial:
      'Fuga et debitis numquam ut enim qui. Nobis dolorum excepturi quod vel. Sunt est qui ab non dolores repellat rem impedit dolores. Ut ea rerum cum eum. Alias dolores tempore illo accusantium est et voluptatem voluptas.',
    image: 'https://placehold.co/80x80',
  },
  {
    name: 'John Doe',
    title: 'Software Engineer',
    testimonial:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: 'https://placehold.co/80x80',
  },
]

const ReviewCard: React.FC<Testimonial> = ({ name, title, testimonial, image }) => {
  return (
    <div className="w-full min-w-[280px] sm:min-w-[400px] md:min-w-[500px] lg:min-w-[600px] flex-shrink-0 p-4 sm:p-6 md:p-8 lg:p-10 bg-white rounded-[10px] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.05)] flex flex-col justify-start items-start gap-4 sm:gap-6">
      <div className="self-stretch flex justify-start items-center gap-3 sm:gap-3.5">
        <img
          className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full ring-4 ring-blue-600/30 flex-shrink-0"
          src={image}
          alt={name}
        />
        <div className="flex flex-col justify-center items-start gap-1 min-w-0 flex-1">
          <div className="text-blue-600 text-lg sm:text-xl font-extrabold truncate w-full">
            {name}
          </div>
          <div className="text-zinc-500 text-sm sm:text-base font-medium truncate w-full">
            {title}
          </div>
        </div>
      </div>
      <div className="self-stretch text-neutral-800 text-sm sm:text-base font-normal leading-relaxed">
        {testimonial}
      </div>
    </div>
  )
}

export const Reviews = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const scrollToNext = () => {
    if (scrollContainerRef.current) {
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

      setCurrentIndex((prev) => Math.min(prev + 1, testimonials.length - 1))
    }
  }

  const scrollToPrevious = () => {
    if (scrollContainerRef.current) {
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
  const isAtEnd = currentIndex === testimonials.length - 1

  return (
    <section className="relative overflow-hidden w-full min-h-[80vh] sm:min-h-[120vh]">
      <img
        src="/testimonial-background.webp"
        alt="Testimonial background"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: -1 }}
      />

      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 mt-20 sm:mt-20 md:mt-24 lg:mt-[100px] ml-0 sm:ml-8 md:ml-12 lg:ml-[57px]">
          Loved Across Continents
        </h2>

        <div className="flex flex-col lg:flex-row mt-8 sm:mt-12 md:mt-16 lg:mt-20 pb-4 px-2 sm:px-4 lg:gap-9 lg:items-center">
          {/* Navigation Section */}
          <div className="flex flex-col items-center lg:items-start mb-6 lg:mb-0 lg:mt-12 lg:ml-[12%] xl:ml-[17%]">
            <p className="text-lg sm:text-xl font-semibold text-gray-700">Clients</p>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Testimonials</h3>
            <div className="flex items-center gap-2 mt-4 sm:mt-7">
              <button
                onClick={scrollToPrevious}
                disabled={isAtStart}
                className={`p-2 rounded-full transition-all duration-200 ${
                  isAtStart
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
                }`}
                aria-label="Previous testimonial"
              >
                <ChevronLeftIcon
                  size={24}
                  className="sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-[30px] lg:h-[30px]"
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
              >
                <ChevronRightIcon
                  size={24}
                  className="sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-[30px] lg:h-[30px]"
                />
              </button>
            </div>
          </div>

          {/* Cards Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto space-x-4 sm:space-x-6 md:space-x-8 scrollbar-hide scroll-smooth w-full"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((item, index) => (
              <ReviewCard
                key={index}
                name={item.name}
                title={item.title}
                testimonial={item.testimonial}
                image={item.image}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
