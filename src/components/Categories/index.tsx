'use client'

import { Category } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { motion, useScroll, useTransform, Variants } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { PaginatedDocs } from 'payload'
import { useRef } from 'react'

// Separate component for individual category cards
export function CategoryCard({
  category,
  index,
  className,
  categoryPage,
}: {
  category: Category
  index: number
  className?: string
  categoryPage?: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  })

  // Helper function to determine text size based on word count
  const getTextSizeClass = (title: string) => {
    const wordCount = title.trim().split(/\s+/).length
    return wordCount === 1 ? 'text-2xl md:text-4xl' : 'text-xl md:text-3xl'
  }

  // Subtle floating animation based on scroll
  const floatingY = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, -8, 0, -4, 0])

  // Subtle scale animation
  const floatingScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.02, 1])

  // Image floating animation
  const imageFloatingY = useTransform(scrollYProgress, [0, 0.3, 0.6, 0.9, 1], [0, -12, 0, -8, 0])

  let imageUrl = category?.category_image
  if (imageUrl) {
    imageUrl = process.env.NEXT_PUBLIC_BUNNY_CDN + imageUrl
  }

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const imageVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <motion.article
      ref={cardRef}
      variants={cardVariants}
      className={cn('relative group flex-shrink-0', className)}
      id="products"
      custom={index}
      style={{
        y: floatingY,
        scale: floatingScale,
      }}
      whileHover={{
        y: -8,
        scale: 1.03,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      itemScope
      itemType="https://schema.org/Service"
    >
      <Link href={`/${category.slug || ''}`} className="block">
        <motion.div
          className="relative w-48 sm:w-72 h-[140px] sm:h-44 cursor-pointer rounded-lg overflow-hidden"
          whileHover={{
            transition: { duration: 0.4, ease: 'easeOut' },
          }}
        >
          {/* Background image as absolute positioned element */}
          <div className="absolute inset-0 z-0 block sm:hidden">
            <Image
              src="/product-bg.webp"
              alt=""
              className="object-cover w-48 sm:w-72 h-[140px] sm:h-44"
              width={1000}
              height={1000}
            />
          </div>

          {/* Responsive background for larger screens */}
          <div className="absolute inset-0 z-0 hidden sm:block">
            <Image
              src="/productcard-bg.webp"
              alt=""
              className="object-cover w-48 sm:w-72 h-[140px] sm:h-44"
              width={1000}
              height={1000}
            />
          </div>

          <motion.div className="relative z-10 flex h-full items-center w-[70%]">
            {categoryPage ? (
              <h1
                className={`justify-center text-sky-950 ${getTextSizeClass(category.title)} pl-6 font-bold font-['Philosopher'] md:leading-[40.52px]`}
                itemProp="name"
              >
                {category.title}
              </h1>
            ) : (
              <h2
                className={`justify-center text-sky-950 ${getTextSizeClass(category.title)} pl-6 font-bold font-['Philosopher'] md:leading-[40.52px]`}
                itemProp="name"
              >
                {category.title}
              </h2>
            )}
          </motion.div>

          {/* Enhanced background overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-sky-50/30 to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>

        <motion.div
          className="absolute left-[100px] bottom-[69px] sm:left-[160px] sm:bottom-[69px] md:left-[170px] md:bottom-[57px] w-36 h-28 sm:w-48 sm:h-32 z-30"
          variants={imageVariants}
          style={{
            y: imageFloatingY,
          }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.3, ease: 'easeOut' },
          }}
        >
          <motion.div className="w-full h-full">
            <Image
              src={imageUrl || ''}
              alt={`${category.title} trading services and products`}
              fill
              className="object-contain drop-shadow-lg"
              itemProp="image"
            />
          </motion.div>
        </motion.div>
      </Link>
    </motion.article>
  )
}

export default function Categories({ categories }: { categories: PaginatedDocs<Category> }) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Animation variants for scroll-triggered animations
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  // Split categories into two rows
  const midPoint = Math.ceil(categories.docs.length / 2)
  const firstRow = categories.docs.slice(0, midPoint)
  const secondRow = categories.docs.slice(midPoint)

  // Generate structured data for categories
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'White Trading Company Trading Categories',
    description: 'Comprehensive trading categories and services offered by White Trading Company',
    numberOfItems: categories.docs.length,
    itemListElement: categories.docs.map((category, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: category.title,
        description: `Trading services and products in ${category.title}`,
        url: `https://whitetradingcompany.com/${category.slug}`,
        provider: {
          '@type': 'Organization',
          name: 'White Trading Company',
        },
        category: 'Trading Services',
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section aria-labelledby="categories-heading" className="relative small-screen-categories">
        <h2 id="categories-heading" className="sr-only">
          White Trading Company Trading Categories
        </h2>
        <motion.div
          ref={containerRef}
          className="flex flex-col gap-8 pb-8 sm:pl-6 md:pl-8 lg:pl-32 xl:pl-32 w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          role="list"
          aria-label="Trading categories"
        >
          {/* First Row */}
          <div className="flex overflow-x-auto pl-3 sm:pl-0 pt-16 md:pt-10 gap-20 md:gap-24 lg:gap-28 pb-4 scrollbar-hide">
            {firstRow.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>

          {/* Second Row */}
          <div className="flex overflow-x-auto pl-3 sm:pl-0 pt-16 md:pt-10 gap-20 md:gap-24 lg:gap-28 pb-4 scrollbar-hide">
            {secondRow.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index + midPoint} />
            ))}
          </div>

          <div className="hidden lg:block w-[275px] h-[550px] bg-gradient-to-bl from-[#eaf5ff] to-white/0 rounded-l-full absolute bottom-[-200px] right-0 z-[-1]" />
        </motion.div>
      </section>
    </>
  )
}
