'use client'
import { HomePage } from '@/payload-types'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useRef, useState } from 'react'

interface Review {
  user_name?: string | null
  user_role?: string | null
  review?: string | null
  user_image?: string | null
  id?: string | null
}

// Enhanced ReviewCard with cursor effects
const ReviewCard: React.FC<Review> = ({ user_name, user_role, review, user_image }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // 3D tilt effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ['15deg', '-15deg'])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-15deg', '15deg'])

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 }
  const springRotateX = useSpring(rotateX, springConfig)
  const springRotateY = useSpring(rotateY, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const mouseXFromCenter = e.clientX - centerX
    const mouseYFromCenter = e.clientY - centerY

    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })

    mouseX.set(mouseXFromCenter / (rect.width / 2))
    mouseY.set(mouseYFromCenter / (rect.height / 2))
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.article
      ref={cardRef}
      className="w-[280px] sm:w-[400px] md:w-[500px] lg:w-[600px] flex-shrink-0 p-4 sm:p-6 md:p-8 lg:p-10 bg-white rounded-[10px] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.05)] flex flex-col justify-start items-start gap-4 sm:gap-6 card-hover relative overflow-hidden"
      itemScope
      itemType="https://schema.org/Review"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        rotateX: isHovered ? springRotateX : 0,
        rotateY: isHovered ? springRotateY : 0,
        willChange: 'transform',
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
    >
      {/* Enhanced cursor background effect */}
      {isHovered && (
        <motion.div
          className="pointer-events-none absolute rounded-full"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.3, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          style={{
            width: '400px',
            height: '400px',
            top: mousePosition.y - 200,
            left: mousePosition.x - 200,
            background:
              'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(147, 197, 253, 0.3) 50%, transparent 70%)',
            filter: 'blur(60px)',
            zIndex: 10,
            willChange: 'transform, top, left',
          }}
        />
      )}

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          duration: 1.5,
          ease: 'linear',
          repeat: Infinity,
          repeatDelay: 3,
        }}
        style={{ willChange: 'transform' }}
      />

      <div style={{ transform: 'translateZ(50px)' }} className="relative z-10">
        <div className="self-stretch flex justify-start items-center gap-3 sm:gap-3.5">
          <motion.img
            className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full ring-4 ring-blue-600/30 flex-shrink-0"
            src={
              user_image
                ? process.env.NEXT_PUBLIC_BUNNY_CDN + user_image
                : 'https://placehold.co/80x80'
            }
            alt={`${user_name || 'User'} profile picture`}
            itemProp="author"
            whileHover={{
              scale: 1.1,
              rotate: [0, -5, 5, 0],
              transition: { duration: 0.6 },
            }}
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
            viewport={{ once: true }}
          />
          <div className="flex flex-col justify-center items-start gap-1 min-w-0 flex-1">
            <motion.div
              className="text-blue-600 text-lg sm:text-xl font-extrabold truncate w-full"
              itemProp="author"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {user_name || 'Anonymous'}
            </motion.div>
            <motion.div
              className="text-zinc-500 text-sm sm:text-base font-medium truncate w-full"
              itemProp="reviewBody"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {user_role || 'Customer'}
            </motion.div>
          </div>
        </div>
        <motion.div
          className="self-stretch text-neutral-800 text-sm sm:text-base mt-4 font-normal leading-relaxed"
          itemProp="reviewBody"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {review || 'No review available'}
        </motion.div>
      </div>
    </motion.article>
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
        <Image
          src="/testimonial-background.webp"
          alt="Testimonial background"
          width={1000}
          height={1000}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: -1 }}
        />

        <div className="px-2 sm:px-6 lg:px-8 relative z-10">
          <motion.h3
            id="reviews-heading"
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 mt-24 sm:mt-20 md:mt-24 lg:mt-[100px] ml-0 sm:ml-8 md:ml-12 lg:ml-[57px]"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Loved Across Continents
          </motion.h3>

          <div className="flex flex-col lg:flex-row mt-8 sm:mt-12 md:mt-16 lg:mt-20 pb-4 px-2 sm:px-4 lg:gap-9 lg:items-center">
            {/* Navigation Section */}
            <motion.div
              className="flex md:flex-col gap-1 md:gap-0 items-center lg:items-start mb-6 lg:mb-0 lg:mt-12 lg:ml-[12%] xl:ml-[17%]"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.p
                className="text-md sm:text-xl font-semibold text-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Clients
              </motion.p>
              <motion.h3
                className="text-md sm:text-xl font-semibold text-gray-700 md:text-gray-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Testimonials
              </motion.h3>
              <div className="hidden lg:flex items-center gap-2 mt-4 sm:mt-7">
                <motion.button
                  onClick={scrollToPrevious}
                  disabled={isAtStart}
                  className={`p-2 rounded-full transition-all duration-200 ${
                    isAtStart
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
                  }`}
                  aria-label="Previous testimonial"
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <ChevronLeftIcon
                    size={24}
                    className="sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-[30px] lg:h-[30px]"
                    aria-hidden="true"
                  />
                </motion.button>
                <motion.button
                  onClick={scrollToNext}
                  disabled={isAtEnd}
                  className={`p-2 rounded-full transition-all duration-200 ${
                    isAtEnd
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
                  }`}
                  aria-label="Next testimonial"
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <ChevronRightIcon
                    size={24}
                    className="sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-[30px] lg:h-[30px]"
                    aria-hidden="true"
                  />
                </motion.button>
              </div>
            </motion.div>

            {/* Cards Container */}
            <motion.div
              ref={scrollContainerRef}
              className="flex overflow-x-auto space-x-4 sm:space-x-6 md:space-x-8 scrollbar-hide scroll-smooth w-full"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              role="list"
              aria-label="Customer testimonials"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
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
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
