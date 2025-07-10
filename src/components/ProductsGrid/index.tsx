'use client'

import { Product } from '@/payload-types'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { useCallback, useRef, useState } from 'react'
import { ProductCard } from '../ProductCard'

interface ProductsGridProps {
  initialProducts: Product[]
  hasMore: boolean
  totalProducts: number
}

export const ProductsGrid = ({ initialProducts, hasMore, totalProducts }: ProductsGridProps) => {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [page, setPage] = useState(1)
  const [hasMoreProducts, setHasMoreProducts] = useState(hasMore)
  const [error, setError] = useState<string | null>(null)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  // Ref to track the button position for maintaining viewport
  const loadMoreButtonRef = useRef<HTMLButtonElement>(null)
  const scrollPositionRef = useRef(0)

  const loadMoreProducts = useCallback(async () => {
    if (!hasMoreProducts || isLoadingMore) return

    setIsLoadingMore(true)
    setError(null)

    // Store scroll position and button position before loading
    scrollPositionRef.current = window.scrollY
    const buttonRect = loadMoreButtonRef.current?.getBoundingClientRect()

    try {
      const nextPage = page + 1
      const response = await fetch(`/api/all-products?page=${nextPage}&limit=20`)

      if (!response.ok) {
        throw new Error('Failed to load products')
      }

      const data = await response.json()

      if (data.products && data.products.length > 0) {
        // Add a small delay for smoother UX
        await new Promise((resolve) => setTimeout(resolve, 300))

        setProducts((prev) => [...prev, ...data.products])
        setPage(nextPage)
        setHasMoreProducts(data.hasMore)

        // Restore scroll position to maintain viewport
        setTimeout(() => {
          window.scrollTo(0, scrollPositionRef.current)
        }, 100)
      } else {
        setHasMoreProducts(false)
      }
    } catch (error) {
      console.error('Error loading more products:', error)
      setError('Failed to load more products. Please try again.')
    } finally {
      setIsLoadingMore(false)
    }
  }, [hasMoreProducts, page, isLoadingMore])

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      className="pb-2 px-4 sm:px-6 lg:px-12 my-7 md:my-14 md:mb-20 relative"
    >
      {/* Enhanced background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-br from-purple-200/10 to-blue-200/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Products count indicator */}
        <div className="text-right mr-2 mb-8">
          <p className="text-sm text-gray-600 font-medium">
            Showing {products.length} of {totalProducts} products
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-6 justify-items-center">
          {products.map((product, index) => (
            <div key={product.id} className="w-full max-w-[300px]">
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMoreProducts && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={buttonVariants}
            className="flex justify-center mt-12 mb-8"
          >
            <button
              ref={loadMoreButtonRef}
              onClick={loadMoreProducts}
              disabled={isLoadingMore}
              className={`
                relative px-8 py-3 rounded-lg font-medium text-sm transition-all duration-200
                ${
                  isLoadingMore
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-[#1C3A6A] text-white hover:shadow-lg transform hover:scale-105'
                }
              `}
            >
              {isLoadingMore ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                  <span>Loading...</span>
                </div>
              ) : (
                'Load More Products'
              )}
            </button>
          </motion.div>
        )}

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center mt-8 mb-8"
            >
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md">
                <p className="text-red-600 text-sm text-center">{error}</p>
                <button
                  onClick={loadMoreProducts}
                  className="mt-3 w-full bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* End of products message */}
        {!hasMoreProducts && products.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center mt-12 mb-8"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎉</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                You&apos;ve seen all products!
              </h3>
              <p className="text-gray-600 text-sm">Thanks for browsing our collection</p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}
