'use client'

import { Product } from '@/payload-types'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'

function ProductCard({ product, index }: { product: Product; index: number }) {
  let imageUrl = product?.product_image
  if (imageUrl) {
    imageUrl = process.env.NEXT_PUBLIC_BUNNY_CDN + imageUrl
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: 'easeOut',
      }}
      viewport={{ once: true, margin: '-20px' }}
      className={`
        relative flex flex-col justify-between overflow-hidden 
        rounded-[2.5rem]
        bg-white
        h-[200px] sm:h-[250px]
        w-[200px] sm:w-[250px] lg:w-[300px]
        p-4 sm:p-5
        transition-all duration-500 ease-out
        hover:scale-110
        group
        border-2 border-white/60
        backdrop-blur-sm
        cursor-pointer
        flex-shrink-0
        shadow-lg
      `}
    >
      {/* Enhanced decorative elements */}
      <div className="absolute top-3 right-3 w-4 h-4 bg-white/80 rounded-full opacity-90 animate-pulse"></div>
      <div className="absolute bottom-4 left-4 w-3 h-3 bg-white/60 rounded-full opacity-70"></div>
      <div className="absolute top-1/2 left-2 w-2 h-2 bg-white/40 rounded-full opacity-50"></div>

      <Link href={`/products/${product.slug || product.id}`} className="h-full flex flex-col">
        <div className="flex-1">
          <h2
            className={`font-bold text-center text-[#1C3A6A] text-sm sm:text-lg font-['Montserrat'] mb-3 !leading-tight
            transition-colors duration-300 group-hover:text-gray-900
            line-clamp-2 group-hover:line-clamp-none`}
          >
            {product.title}
          </h2>
        </div>

        <div className="flex-1 flex items-end justify-center relative">
          <div className="relative w-24 h-20 sm:w-32 sm:h-28 transition-all duration-700 group-hover:scale-125">
            {/* Enhanced glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-3xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
            <div className="absolute inset-0 bg-white/30 rounded-3xl blur-md"></div>

            <Image
              src={imageUrl || '/logo.svg'}
              alt={product.title || product.description || 'Product Image'}
              fill
              className="object-contain drop-shadow-2xl transition-all duration-700 group-hover:drop-shadow-3xl group-hover:brightness-110"
              sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 220px"
            />
          </div>
        </div>

        {/* Enhanced bottom decoration */}
        <div className="flex justify-center mt-3">
          <div className="w-16 h-1.5 bg-gradient-to-r from-white/60 via-white/90 to-white/60 rounded-full"></div>
        </div>
      </Link>
    </motion.div>
  )
}

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
      <section className="pb-2 px-4 sm:px-6 lg:px-12 md:my-14 md:mb-20 relative" id="best-sellers">
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
          <div className="space-y-4">
            {/* First Row */}
            <motion.div
              ref={firstRowRef}
              initial="hidden"
              animate={firstRowInView ? 'visible' : 'hidden'}
              variants={staggerContainer}
            >
              <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 scrollbar-hide pl-1">
                {firstRowProducts.map((product, index) => (
                  <motion.div key={product.id} variants={staggerItem}>
                    <ProductCard product={product} index={index} />
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
              <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide pl-1">
                {secondRowProducts.map((product, index) => (
                  <motion.div key={product.id} variants={staggerItem}>
                    <ProductCard product={product} index={index + firstRowProducts.length} />
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
