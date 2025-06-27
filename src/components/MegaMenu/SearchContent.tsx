'use client'
import { DrawerClose, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { Category, Product } from '@/payload-types'
import { Search, ShoppingBag, Sparkles, Tag, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

interface SearchContentProps {
  onClose?: () => void
}

interface SearchResponse {
  categories: Category[]
  products: Product[]
  totalCategories: number
  totalProducts: number
}

export default function SearchContent({ onClose }: SearchContentProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [searchResults, setSearchResults] = useState<{
    categories: Category[]
    products: Product[]
  }>({ categories: [], products: [] })
  const [hasSearched, setHasSearched] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setSearchResults({ categories: [], products: [] })
      setHasSearched(false)
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm.trim())}`)

      if (!response.ok) {
        throw new Error('Search request failed')
      }

      const data: SearchResponse = await response.json()

      setSearchResults({
        categories: data.categories || [],
        products: data.products || [],
      })
      setHasSearched(true)
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults({ categories: [], products: [] })
    } finally {
      setIsLoading(false)
    }
  }

  const clearSearch = () => {
    setSearchTerm('')
    setSearchResults({ categories: [], products: [] })
    setHasSearched(false)
    inputRef.current?.focus()
  }

  const CategoryLink = ({
    category,
    children,
  }: {
    category: Category
    children: React.ReactNode
  }) => (
    <DrawerClose asChild>
      <Link href={`/${category.slug}`} className="block">
        {children}
      </Link>
    </DrawerClose>
  )

  // Helper function to get category slug from product
  const getProductCategorySlug = (product: Product): string => {
    if (product.category && product.category.length > 0) {
      const categoryRelation = product.category[0]
      if (
        categoryRelation &&
        typeof categoryRelation.value === 'object' &&
        categoryRelation.value?.slug
      ) {
        return categoryRelation.value.slug
      }
    }
    return 'products'
  }

  return (
    <DrawerContent className="right-0 left-auto w-4/5 max-w-2xl fixed top-0 h-full rounded-none p-0 flex flex-col !mt-0">
      <DrawerHeader className="border-b bg-gradient-to-r from-blue-50/80 to-indigo-50/80 rounded-t-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-xl">
              <Search className="w-6 h-6 text-blue-600" />
            </div>
            <DrawerTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Search & Discover
            </DrawerTitle>
          </div>
          <DrawerClose asChild>
            <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200">
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </DrawerClose>
        </div>
      </DrawerHeader>

      <div className="h-full flex flex-col">
        {/* Search Input Section */}
        <div className="p-6 bg-gradient-to-b from-gray-50/80 to-transparent">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search products, categories..."
              className="w-full p-4 pl-12 pr-12 text-lg border-2 border-gray-200/50 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-300 bg-white/80 backdrop-blur-sm transition-all duration-300 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch()
                }
              }}
              aria-label="Search products and categories"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />

            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
                aria-label="Clear search"
              >
                <X size={20} />
              </button>
            )}
          </div>

          <button
            onClick={handleSearch}
            disabled={isLoading || !searchTerm.trim()}
            className="mt-4 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Searching...
              </span>
            ) : (
              'Search'
            )}
          </button>
        </div>

        {/* Results Section */}
        <div className="flex-1 overflow-y-auto p-6 pt-0">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4" />
              <p className="text-gray-500 text-lg">Searching for amazing results...</p>
            </div>
          )}

          {!isLoading && hasSearched && (
            <div className="space-y-8">
              {/* Categories Section */}
              {searchResults.categories.length > 0 && (
                <div className="animate-fade-in">
                  <div className="flex items-center gap-2 mb-6">
                    <Tag className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-xl font-bold text-gray-800">Categories</h3>
                    <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-sm font-medium">
                      {searchResults.categories.length}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {searchResults.categories.map((category, index) => (
                      <div
                        key={category.id}
                        className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <CategoryLink category={category}>
                          <div className="flex items-center p-4 bg-gradient-to-r from-white to-gray-50 rounded-2xl border border-gray-200/50 hover:shadow-xl hover:border-indigo-200 transition-all duration-300">
                            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                              {category.category_image && (
                                <Image
                                  src={process.env.NEXT_PUBLIC_BUNNY_CDN + category.category_image}
                                  alt={category.title || 'Category'}
                                  width={64}
                                  height={64}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                              )}
                            </div>
                            <div className="ml-4 flex-1">
                              <h4 className="font-bold text-lg text-gray-800 group-hover:text-indigo-600 transition-colors duration-200">
                                {category.title}
                              </h4>
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                                <span className="text-indigo-600 text-sm">→</span>
                              </div>
                            </div>
                          </div>
                        </CategoryLink>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Products Section */}
              {searchResults.products.length > 0 && (
                <div className="animate-fade-in">
                  <div className="flex items-center gap-2 mb-6">
                    <ShoppingBag className="w-5 h-5 text-blue-600" />
                    <h3 className="text-xl font-bold text-gray-800">Products</h3>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm font-medium">
                      {searchResults.products.length}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {searchResults.products.map((product, index) => (
                      <div
                        key={product.id}
                        className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <DrawerClose asChild>
                          <Link href={`/${getProductCategorySlug(product)}`} className="block">
                            <div className="p-4 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200/50 hover:shadow-xl hover:border-blue-200 transition-all duration-300 h-full">
                              <div className="space-y-2">
                                <h4 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                                  {product.title}
                                </h4>
                                {product.description && (
                                  <p className="text-gray-600 text-sm">{product.description}</p>
                                )}
                                <div className="flex items-center justify-between">
                                  {product.category && product.category.length > 0 && (
                                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs">
                                      {typeof product.category[0]?.value === 'object' &&
                                      product.category[0]?.value?.title
                                        ? product.category[0].value.title
                                        : 'Product'}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Link>
                        </DrawerClose>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No Results */}
              {searchTerm &&
                searchResults.categories.length === 0 &&
                searchResults.products.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No results found</h3>
                    <p className="text-gray-600">
                      Try searching for something else or check your spelling
                    </p>
                  </div>
                )}
            </div>
          )}

          {!hasSearched && !isLoading && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Start your search</h3>
              <p className="text-gray-600">
                Enter a search term to discover amazing products and categories
              </p>
            </div>
          )}
        </div>
      </div>
    </DrawerContent>
  )
}
