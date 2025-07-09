'use client'

import { Product } from '@/payload-types'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const CARD_COLORS = [
  'bg-gradient-to-br from-pink-100 to-rose-100', // Card 1 - Soft pink
  'bg-gradient-to-br from-yellow-100 to-orange-100', // Card 2 - Warm yellow
  'bg-gradient-to-br from-blue-100 to-cyan-100', // Card 3 - Soft blue
  'bg-gradient-to-br from-purple-100 to-pink-100', // Card 4 - Lavender
  'bg-gradient-to-br from-green-100 to-emerald-100', // Card 5 - Mint
  'bg-gradient-to-br from-orange-100 to-red-100', // Card 6 - Peach
  'bg-gradient-to-br from-indigo-100 to-purple-100', // Card 7 - Soft purple
  'bg-gradient-to-br from-teal-100 to-cyan-100', // Card 8 - Ocean
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
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1, type: 'spring', stiffness: 100 }}
      viewport={{ once: true }}
      className={`
        relative flex flex-col justify-between overflow-hidden 
        rounded-[2rem] shadow-xl
        ${getCardColor(index)}
        h-[280px]
        p-6
        transition-all duration-500 ease-out
        hover:shadow-2xl hover:shadow-black/25
        hover:scale-105
        hover:rotate-1
        group
        border-2 border-white/50
        backdrop-blur-sm
      `}
    >
      {/* Cute decorative elements */}
      <div className="absolute top-2 right-2 w-3 h-3 bg-white/60 rounded-full opacity-60"></div>
      <div className="absolute top-6 right-6 w-2 h-2 bg-white/40 rounded-full opacity-40"></div>
      <div className="absolute bottom-4 left-4 w-4 h-4 bg-white/30 rounded-full opacity-30"></div>

      <Link href={`/products/${product.id}`} className="h-full flex flex-col">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <div className="w-8 h-8 bg-white/70 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-gray-600">★</span>
            </div>
            <h3 className="text-xs font-medium text-white/80 bg-black/10 px-2 py-1 rounded-full">
              Best Seller
            </h3>
          </div>

          <h2
            className={`font-bold text-gray-700 text-lg font-['Montserrat'] sm:text-xl mb-3 !leading-tight
            transition-colors duration-300 group-hover:text-gray-900
            line-clamp-2`}
          >
            {product.title}
          </h2>
        </div>

        <div className="flex-1 flex items-end justify-center">
          <div className="relative w-32 h-28 sm:w-36 sm:h-32 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
            <div className="absolute inset-0 bg-white/20 rounded-2xl blur-sm"></div>
            <Image
              src={imageUrl || '/logo.svg'}
              alt={product.title || product.description || 'Product Image'}
              fill
              className="object-contain drop-shadow-2xl transition-all duration-500 group-hover:drop-shadow-3xl"
              sizes="(max-width: 640px) 100vw, 33vw"
            />
          </div>
        </div>

        {/* Cute bottom decoration */}
        <div className="flex justify-center mt-3">
          <div className="w-12 h-1 bg-white/50 rounded-full"></div>
        </div>
      </Link>
    </motion.div>
  )
}

export const BestSellerProducts = ({ products }: { products: Product[] }) => {
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
      <section className="pb-8 px-2 sm:px-6 lg:px-12 md:my-14 md:mb-20" id="best-sellers">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-6xl font-bold text-neutral-800 mb-4 font-['Poppins']">
              ✨ Best Sellers ✨
            </h3>
            <p className="text-gray-600 text-lg">Discover our most loved products</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
