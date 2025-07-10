'use client'

import { Product } from '@/payload-types'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'

interface ProductPageProps {
  product: Product
}

export const ProductPage = ({ product }: ProductPageProps) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })

  // Process image URL
  let imageUrl = product?.product_image
  if (imageUrl) {
    imageUrl = process.env.NEXT_PUBLIC_BUNNY_CDN + imageUrl
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        ease: 'easeOut' as const,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut' as const,
      },
    },
  }

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'backOut' as const,
      },
    },
  }

  // WhatsApp functionality
  const handleBuyNow = () => {
    const phoneNumber = '+919544889253' // Default number
    const message = `Hello! I would like to buy ${product.title}. Can you provide more details?`
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  // Enhanced structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: imageUrl,
    url: `https://whitetradingcompany.com/products/${product.slug || product.id}`,
    brand: {
      '@type': 'Brand',
      name: 'White Trading Company',
    },
    category: (product.category?.[0]?.value as any)?.title || 'Trading Services',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'INR',
      price: '0',
      seller: {
        '@type': 'Organization',
        name: 'White Trading Company',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '#45/2a-1, Sungam Bye Pass Road',
          addressLocality: 'Coimbatore',
          addressRegion: 'Tamil Nadu',
          postalCode: '641045',
          addressCountry: 'IN',
        },
      },
    },
    ...(product.is_best_seller && {
      additionalProperty: {
        '@type': 'PropertyValue',
        name: 'Best Seller',
        value: 'true',
      },
    }),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={containerVariants}
        className="bg-gradient-to-br from-[#faf0e8] via-[#f8e8d8] to-[#f5e0c8] py-8 px-4 sm:px-6 lg:px-12"
        role="main"
        aria-label={`${product.title} - Product Details`}
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-pink-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-yellow-200/10 to-orange-200/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Enhanced Breadcrumb with better accessibility */}
          <motion.nav variants={itemVariants} className="mb-6" aria-label="Breadcrumb navigation">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link
                  href="/"
                  className="hover:text-gray-800 transition-colors"
                  aria-label="Navigate to homepage"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <span>/</span>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-gray-800 transition-colors"
                  aria-label="Navigate to products page"
                >
                  Products
                </Link>
              </li>
              <li aria-hidden="true">
                <span>/</span>
              </li>
              <li>
                <span className="text-gray-800 font-medium" aria-current="page">
                  {product.title}
                </span>
              </li>
            </ol>
          </motion.nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Product Image Section with enhanced accessibility */}
            <motion.div variants={imageVariants} className="relative lg:col-span-1">
              <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-gradient-to-br from-white/60 to-white/40 backdrop-blur-sm border-2 border-white/60 shadow-2xl max-w-md mx-auto">
                {/* Enhanced glow effect */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-[2rem] blur-lg"
                  aria-hidden="true"
                ></div>
                <div
                  className="absolute inset-0 bg-white/30 rounded-[2rem] blur-md"
                  aria-hidden="true"
                ></div>

                <Image
                  src={imageUrl || '/logo.svg'}
                  alt={`${product.title} - Product image`}
                  fill
                  className="object-contain drop-shadow-2xl transition-all duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  priority
                />
                <div
                  className="absolute bottom-4 left-4 w-4 h-4 bg-white/80 rounded-full opacity-70 animate-bounce"
                  aria-hidden="true"
                ></div>
                <div
                  className="absolute top-1/2 left-4 w-3 h-3 bg-white/60 rounded-full opacity-50"
                  aria-hidden="true"
                ></div>
              </div>
            </motion.div>

            {/* Product Details Section with enhanced accessibility */}
            <motion.div variants={itemVariants} className="space-y-6 lg:col-span-2">
              {/* Title and Badges */}
              <div className="space-y-4">
                <motion.h1
                  variants={itemVariants}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C3A6A] font-['Montserrat'] leading-tight"
                >
                  {product.title}
                </motion.h1>

                {/* Badges */}
                <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
                  {product.is_best_seller && (
                    <motion.div
                      variants={badgeVariants}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-500/30 to-purple-500/30 text-white font-bold rounded-full border border-white/40 backdrop-blur-sm"
                      role="status"
                      aria-label="Best seller product"
                    >
                      <span className="mr-2" aria-hidden="true">
                        ★
                      </span>
                      Best Seller
                    </motion.div>
                  )}
                </motion.div>
              </div>

              {/* Enhanced Buy Now Button with better accessibility */}
              <motion.div variants={itemVariants}>
                <motion.button
                  onClick={handleBuyNow}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-br from-[#faf0e8] via-[#f8e8d8] to-[#f5e0c8] text-[#1C3A6A] font-bold py-2 md:py-4 px-4 md:px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-white/60 backdrop-blur-sm hover:bg-gradient-to-br hover:from-[#f5e0c8] hover:via-[#f8e8d8] hover:to-[#faf0e8]"
                  aria-label={`Purchase ${product.title} via WhatsApp`}
                >
                  <span className="mr-2" aria-hidden="true">
                    🛒
                  </span>
                  Buy Now
                </motion.button>
              </motion.div>

              {/* Description with enhanced accessibility */}
              <motion.section variants={itemVariants} className="space-y-4">
                <h2 className="text-lg md:text-xl font-semibold text-[#1C3A6A] font-['Montserrat']">
                  Product Description
                </h2>
                <p className="text-[#1C3A6A] font-['Montserrat'] leading-relaxed text-sm md:text-lg">
                  {product.description ||
                    'Discover this amazing product that combines quality, style, and functionality. Perfect for your needs and designed to exceed expectations.'}
                </p>
              </motion.section>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
