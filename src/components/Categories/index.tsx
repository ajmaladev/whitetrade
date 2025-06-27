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
}: {
  category: Category
  index: number
  className?: string
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  })

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
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      className={cn('relative group mr-[70px] md:mr-0', className)}
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
    >
      <Link href={`/${category.slug || ''}`} className="block">
        <motion.div
          className="relative w-48 sm:w-72 h-[140px] sm:h-44 cursor-pointer p-4 rounded-lg overflow-hidden category-small-bg"
          whileHover={{
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.12)',
            transition: { duration: 0.4, ease: 'easeOut' },
          }}
        >
          <motion.div className="relative z-10 flex h-full items-center">
            <h3 className="justify-center text-sky-950 text-3xl md:text-5xl pl-6 font-bold font-['Philosopher'] leading-[59.52px]">
              {category.title}
            </h3>
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
          className="absolute md:left-[126px] left-[95px] md:bottom-[12px] bottom-[0px] w-48 sm:w-64 h-48 sm:h-60 z-30"
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
              alt={category.title}
              fill
              className="object-contain drop-shadow-lg"
            />
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
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

  return (
    <motion.div
      ref={containerRef}
      className="relative small-screen-categories grid grid-cols-1 items-center justify-items-center md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-10 gap-y-24 md:gap-y-24 lg:gap-y-36 pb-8 sm:pt-28 sm:px-6 md:px-8 lg:px-32 xl:px-32 w-full"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {categories.docs.map((category, index) => (
        <CategoryCard key={category.id} category={category} index={index} />
      ))}
      <div className="hidden lg:block w-[275px] h-[550px] bg-gradient-to-bl from-[#eaf5ff] to-white/0 rounded-l-full absolute -top-[100px] right-0" />
    </motion.div>
  )
}
