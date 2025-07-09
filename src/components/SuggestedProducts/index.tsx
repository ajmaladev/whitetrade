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
        bg-gradient-to-br from-[#faf0e8] via-[#f8e8d8] to-[#f5e0c8]
        h-[200px] sm:h-[300px]
        w-full
        p-4 sm:p-5
        transition-all duration-500 ease-out
        hover:scale-110
        hover:rotate-2
        group
        border-2 border-white/60
        backdrop-blur-sm
        cursor-pointer
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

      <Link href={`/products/${product.slug}`} className="h-full flex flex-col">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-bold text-white/95 bg-gradient-to-r from-blue-500/30 to-purple-500/30 px-3 py-1.5 rounded-full border border-white/40 backdrop-blur-sm">
              Related
            </div>
          </div>

          <h2
            className={`font-bold text-center text-gray-800 text-sm sm:text-lg font-['Montserrat'] mb-3 !leading-tight
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
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110">
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

interface SuggestedProductsProps {
  products: Product[]
  currentProductId: string
}

export const SuggestedProducts = ({ products, currentProductId }: SuggestedProductsProps) => {
  // Filter out the current product and get only products from the same category
  const suggestedProducts = products.filter((product) => product.id !== currentProductId)

  if (suggestedProducts.length === 0) {
    return null
  }

  // Intersection Observer hooks for different sections
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.3 })
  const [gridRef, gridInView] = useInView({ triggerOnce: true, threshold: 0.3 })

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
    name: 'Suggested Products',
    description: 'Related products you might also like',
    numberOfItems: suggestedProducts.length,
    itemListElement: suggestedProducts.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.title,
        description: product.description || `Related product: ${product.title}`,
        url: `https://whitetradingcompany.com/products/${product.slug}`,
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
      <section
        className="pb-2 px-4 sm:px-6 lg:px-12 my-7 md:my-14 md:mb-20 relative"
        id="suggested-products"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-br from-purple-200/10 to-blue-200/10 rounded-full blur-3xl animate-pulse delay-500"></div>
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
              <h3 className="text-xl xs:text-2xl sm:text-4xl lg:text-6xl font-bold text-neutral-800 mb-4 font-['Poppins'] relative z-10">
                💡 You Might Also Like
              </h3>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100/60 via-purple-100/60 to-cyan-100/60 rounded-3xl blur-xl -z-10"></div>
            </div>
          </motion.div>

          {/* Responsive Grid Layout */}
          <motion.div
            ref={gridRef}
            initial="hidden"
            animate={gridInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 justify-items-center"
            style={{
              gridTemplateColumns: `repeat(auto-fit, minmax(280px, 1fr))`,
              justifyItems: 'center',
              maxWidth: suggestedProducts.length <= 3 ? 'max-content' : 'none',
              margin: suggestedProducts.length <= 3 ? '0 auto' : '0',
            }}
          >
            {suggestedProducts.map((product, index) => (
              <motion.div key={product.id} variants={staggerItem} className="w-full max-w-[300px]">
                <ProductCard product={product} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}
