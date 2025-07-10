'use client'

import { Product } from '@/payload-types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { ProductCard } from '../ProductCard'

export const BestSellerProducts = ({ products }: { products: Product[] }) => {
  // Split products into two arrays for two rows
  const firstRowProducts = products.slice(0, Math.ceil(products.length / 2))
  const secondRowProducts = products.slice(Math.ceil(products.length / 2))

  // Intersection Observer hooks for different sections
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.3 })
  const [firstRowRef, firstRowInView] = useInView({ triggerOnce: true, threshold: 0.3 })
  const [secondRowRef, secondRowInView] = useInView({ triggerOnce: true, threshold: 0.3 })

  // Animation variants for right-to-left movement
  const slideInFromRight = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut' as const,
      },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const staggerItem = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  }

  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'White Trading Company Best Sellers',
    description: 'Our most popular and best-selling products',
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.title,
        description: product.description || `Best selling product: ${product.title}`,
        url: `https://whitetradingcompany.com/products/${product.slug || product.id}`,
        provider: {
          '@type': 'Organization',
          name: 'White Trading Company',
        },
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className="pb-2 px-4 sm:px-6 lg:px-10 md:my-14 md:mb-20 relative" id="best-sellers">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-pink-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-br from-yellow-200/10 to-orange-200/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            ref={titleRef}
            initial="hidden"
            animate={titleInView ? 'visible' : 'hidden'}
            variants={slideInFromRight}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="relative inline-block">
              <h3 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-[#1C3A6A] mb-4 font-['Montserrat'] relative z-10">
                Recent Shipments
              </h3>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-100/60 via-purple-100/60 to-blue-100/60 rounded-3xl blur-xl -z-10"></div>
            </div>
            <p className="text-[#1C3A6A] font-['Montserrat'] text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-medium">
              Discover our most loved and trending products that customers can&apos;t stop raving
              about!
            </p>
          </motion.div>

          {/* Two Rows with Horizontal Scrolling - Works on all screen sizes */}
          <div className="space-y-2">
            {/* First Row */}
            <motion.div
              ref={firstRowRef}
              initial="hidden"
              animate={firstRowInView ? 'visible' : 'hidden'}
              variants={staggerContainer}
            >
              <div className="flex gap-4 sm:gap-6 overflow-x-auto py-8 scrollbar-hide sm:px-4 px-2">
                {firstRowProducts.map((product, index) => (
                  <motion.div key={product.id} variants={staggerItem}>
                    <ProductCard
                      product={product}
                      index={index}
                      className="h-[180px] sm:h-[250px] w-[200px] sm:w-[300px]"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Second Row */}
            <motion.div
              ref={secondRowRef}
              initial="hidden"
              animate={secondRowInView ? 'visible' : 'hidden'}
              variants={staggerContainer}
            >
              <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide sm:px-4 px-2">
                {secondRowProducts.map((product, index) => (
                  <motion.div key={product.id} variants={staggerItem}>
                    <ProductCard
                      product={product}
                      index={index + firstRowProducts.length}
                      className="h-[200px] sm:h-[250px] w-[200px] md:w-[300px]"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Browse All Products Button - Top Right Corner */}
            <div className="flex justify-center z-20">
              <Link
                href="/products"
                className="
              inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3
              bg-gray-100 hover:bg-gray-200
              text-gray-500 font-semibold text-sm sm:text-base
              rounded-xl shadow- hover:shadow-xl
              transition-all duration-300 ease-out
              transform hover:scale-105 hover:-translate-y-1
              border border-white/20 backdrop-blur-sm
              group
            "
              >
                <span>Browse all products</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
