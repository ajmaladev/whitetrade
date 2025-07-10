'use client'
import { Category, Product } from '@/payload-types'
import { ChevronDownIcon, Search } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useRef, useState } from 'react'

export default function ProductDetails({ products }: { products: Product[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedProduct = products[selectedIndex]

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products
    return products.filter((product) =>
      product.title?.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [products, searchQuery])

  // Show search input only if there are more than 5 products
  const showSearch = products.length > 5

  const handleBuyNow = () => {
    // Get category title from the product
    const categoryTitle = (selectedProduct?.category?.[0]?.value as Category)?.title || 'Product'

    // Create a professional and detailed WhatsApp message
    const message = `
Hello!

I'm interested in purchasing the following product and would love to get more detailed information:

✨ **Product Name:** ${selectedProduct?.title}
🏷️ **Category:** ${categoryTitle}

Could you please provide more details about this product, including its features, pricing, and any additional information?

Looking forward to hearing from you!
`

    // Encode the message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message)

    // WhatsApp business number (you can replace this with your actual WhatsApp number)
    const whatsappNumber = '+919544889253' // Replace with your actual WhatsApp number

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank')
  }

  // Handle clicks outside the dropdown to close it
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false)
    }
  }

  // Add event listener for clicks outside
  useState(() => {
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })

  return (
    <div className="w-[90%] lg:w-[36%]">
      {/* SEO Hidden H2 Elements */}
      <div className="sr-only">
        {products.map((product) => (
          <h2 key={product.id}>{product.title}</h2>
        ))}
      </div>

      {/* Dropdown Trigger */}
      <div className="w-full flex items-center gap-3 mb-4 md:mb-6">
        <button
          onClick={handleBuyNow}
          className="w-1/2 py-3 bg-[#669075] bg-gradient-to-r from-[#669075] to-[#5a8268] rounded-xl inline-flex justify-center items-center gap-2 text-white text-sm font-semibold font-['Manrope'] leading-normal hover:from-[#5a8268] hover:to-[#4d735b] transition-all duration-200"
          aria-label={`Purchase ${selectedProduct?.title} via WhatsApp`}
        >
          Buy Now
        </button>
        <Link
          href={`/products/${selectedProduct?.slug || selectedProduct?.id}`}
          className="w-1/2 py-3 bg-[#597cc9] bg-gradient-to-r from-[#597cc9] to-[#4a6bb8] rounded-xl inline-flex justify-center items-center gap-2 text-white text-sm font-semibold font-['Manrope'] leading-normal hover:from-[#4a6bb8] hover:to-[#3d5aa7] transition-all duration-200"
          aria-label={`View ${selectedProduct?.title}`}
        >
          More Details...
        </Link>
      </div>
      <div
        ref={dropdownRef}
        className={`h-14 relative flex justify-between items-center pl-4 md:pl-10 pr-10 md:pr-16 bg-gradient-to-r from-cyan-900 to-blue-600  ${!dropdownOpen ? 'rounded-[49.41px]' : 'rounded-t-[29.41px]'} shadow-[0px_3.95px_3.95px_0px_rgba(0,0,0,0.25)]  cursor-pointer`}
        onClick={() => setDropdownOpen((open) => !open)}
        tabIndex={0}
      >
        <div className="justify-start text-white text-md md:text-2xl font-semibold font-['Montserrat']">
          {selectedProduct?.title}
        </div>
        <div className="justify-start text-white/30 text-sm md:text-base font-normal font-['Poppins']">
          Select your choice
        </div>
        <div
          className={`right-4 md:right-6 top-1/2 -translate-y-1/2 absolute pointer-events-none transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`}
        >
          <ChevronDownIcon className="w-5 h-5 md:w-7 md:h-7 text-white" />
        </div>
        {/* Dropdown List */}
        {dropdownOpen && (
          <div
            className="absolute left-0 top-full w-full rounded-b-md shadow-[0px_8px_24px_0px_rgba(0,0,0,0.10)] border-t border-blue-100 z-20 animate-fadeIn bg-white"
            style={{
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              marginTop: '-4px', // slight overlap for seamless look
            }}
          >
            {/* Search Input - Only show if more than 5 products */}
            {showSearch && (
              <div className="sticky top-0 bg-white p-2 border-b border-blue-100">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-['Poppins'] placeholder-blue-400"
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
            )}

            {/* Filtered Products List */}
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, idx) => {
                const originalIndex = products.findIndex((p) => p.id === product.id)
                return (
                  <div
                    key={product.id}
                    className={`px-6 py-3 cursor-pointer hover:bg-blue-50 text-cyan-900 font-medium font-['Poppins'] transition-colors ${
                      originalIndex === selectedIndex ? 'bg-blue-100' : ''
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedIndex(originalIndex)
                      setDropdownOpen(false)
                      setSearchQuery('') // Clear search when item is selected
                    }}
                  >
                    {product.title}
                  </div>
                )
              })
            ) : (
              <div className="px-6 py-4 text-center text-gray-500 font-['Poppins']">
                No products found
              </div>
            )}
          </div>
        )}
      </div>

      <p className="mt-6 mb-4 justify-start text-cyan-900 text-sm font-medium font-['Poppins']">
        {selectedProduct?.description}
      </p>

      {/* Buy Now Button */}
    </div>
  )
}
