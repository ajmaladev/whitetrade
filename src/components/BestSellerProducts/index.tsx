'use client'

import { Product } from '@/payload-types'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'

const CARD_COLORS = [
  'bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200', // Card 1 - Soft pink
  'bg-gradient-to-br from-yellow-100 via-orange-50 to-yellow-200', // Card 2 - Warm yellow
  'bg-gradient-to-br from-blue-100 via-cyan-50 to-blue-200', // Card 3 - Soft blue
  'bg-gradient-to-br from-purple-100 via-pink-50 to-purple-200', // Card 4 - Lavender
  'bg-gradient-to-br from-green-100 via-emerald-50 to-green-200', // Card 5 - Mint
  'bg-gradient-to-br from-orange-100 via-red-50 to-orange-200', // Card 6 - Peach
  'bg-gradient-to-br from-indigo-100 via-purple-50 to-indigo-200', // Card 7 - Soft purple
  'bg-gradient-to-br from-teal-100 via-cyan-50 to-teal-200', // Card 8 - Ocean
]

function getCardColor(index: number) {
  return CARD_COLORS[index % CARD_COLORS.length]
}

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
        ${getCardColor(index)}
        h-[200px] sm:h-[300px]
        w-[160px] sm:w-[200px] lg:w-[220px]
        p-4 sm:p-5
        transition-all duration-500 ease-out
        hover:scale-110
        hover:rotate-2
        group
        border-2 border-white/60
        backdrop-blur-sm
        cursor-pointer
        flex-shrink-0
        shadow-lg hover:shadow-2xl
      `}
    >
      {/* Enhanced decorative elements */}
      <div className="absolute top-3 right-3 w-4 h-4 bg-white/80 rounded-full opacity-90 animate-pulse"></div>
      <div className="absolute bottom-4 left-4 w-3 h-3 bg-white/60 rounded-full opacity-70"></div>
      <div className="absolute top-1/2 left-2 w-2 h-2 bg-white/40 rounded-full opacity-50"></div>

      {/* Floating sparkles */}
      <div className="absolute top-2 left-2 text-yellow-400 opacity-70 animate-bounce text-sm">
        ✨
      </div>
      <div className="absolute bottom-2 right-2 text-pink-400 opacity-60 animate-pulse text-xs">
        💫
      </div>

      <Link href={`/products/${product.id}`} className="h-full flex flex-col">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-sm font-bold text-white">★</span>
            </div>
            <div className="text-xs font-bold text-white/95 bg-gradient-to-r from-pink-500/30 to-purple-500/30 px-3 py-1.5 rounded-full border border-white/40 backdrop-blur-sm">
              Best
            </div>
          </div>

          <h2
            className={`font-bold text-gray-800 text-sm sm:text-lg font-['Montserrat'] mb-3 !leading-tight
            transition-colors duration-300 group-hover:text-gray-900
            line-clamp-2 group-hover:line-clamp-none`}
          >
            {product.title}
          </h2>
        </div>

        <div className="flex-1 flex items-end justify-center relative">
          <div className="relative w-24 h-20 sm:w-32 sm:h-28 transition-all duration-700 group-hover:scale-125 group-hover:rotate-6">
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

          {/* Floating price tag effect */}
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110">
            <span className="text-xs font-bold text-white">$</span>
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
        url: `https://whitetradingcompany.com/products/${product.id}`,
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
              <h3 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-neutral-800 mb-4 font-['Poppins'] relative z-10">
                ✨ Best Sellers ✨
              </h3>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-100/60 via-purple-100/60 to-blue-100/60 rounded-3xl blur-xl -z-10"></div>
            </div>
            <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-medium">
              Discover our most loved and trending products that customers can&apos;t stop raving
              about! 🎉
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
              <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
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
              <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
                {secondRowProducts.map((product, index) => (
                  <motion.div key={product.id} variants={staggerItem}>
                    <ProductCard product={product} index={index + firstRowProducts.length} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
