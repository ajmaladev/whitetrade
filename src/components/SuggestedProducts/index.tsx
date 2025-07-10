'use client'

import { Product } from '@/payload-types'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ProductCard } from '../ProductCard'

interface SuggestedProductsProps {
  products: Product[]
  currentProductId: string
}

export const SuggestedProducts = ({ products, currentProductId }: SuggestedProductsProps) => {
  // Filter out the current product and get only products from the same category
  const suggestedProducts = products.filter((product) => product.id !== currentProductId)

  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.3 })
  const [gridRef, gridInView] = useInView({ triggerOnce: true, threshold: 0.3 })
  if (suggestedProducts.length === 0) {
    return null
  }

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
              <h2 className="text-xl xs:text-2xl sm:text-4xl lg:text-6xl font-bold text-[#1C3A6A] mb-4 font-['Montserrat'] relative z-10">
                You Might Also Like
              </h2>
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
