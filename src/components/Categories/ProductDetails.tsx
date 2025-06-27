'use client'
import { Product } from '@/payload-types'
import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'

export default function ProductDetails({ products }: { products: Product[] }) {
  console.log(products)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const selectedProduct = products[selectedIndex]

  return (
    <div className="w-[90%] lg:w-[36%]">
      {/* Dropdown Trigger */}
      <div
        className={`h-14 relative flex justify-between items-center pl-4 md:pl-10 pr-10 md:pr-16 bg-gradient-to-r from-cyan-900 to-blue-600  ${!dropdownOpen ? 'rounded-[49.41px]' : 'rounded-t-[29.41px]'} shadow-[0px_3.95px_3.95px_0px_rgba(0,0,0,0.25)]  cursor-pointer`}
        onClick={() => setDropdownOpen((open) => !open)}
        tabIndex={0}
        onBlur={() => setDropdownOpen(false)}
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
            className="absolute left-0 top-full w-full rounded-b-[49.41px] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.10)] border-t border-blue-100 z-20 animate-fadeIn bg-white"
            style={{
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              marginTop: '-4px', // slight overlap for seamless look
            }}
          >
            {products.map((product, idx) => (
              <div
                key={product.id}
                className={`px-6 py-3 cursor-pointer hover:bg-blue-50 text-cyan-900 font-medium font-['Poppins'] transition-colors ${
                  idx === selectedIndex ? 'bg-blue-100' : ''
                }`}
                onClick={() => {
                  setSelectedIndex(idx)
                  setDropdownOpen(false)
                }}
              >
                {product.title}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Description */}
      <div className="mt-6 mb-4 ml-3 md:ml-6 justify-start text-cyan-900 text-sm font-medium font-['Poppins']">
        {selectedProduct?.description}
      </div>

      {/* Buy Now Button */}
      <div className="w-full flex items-center lg:items-start">
        <button className="px-7 py-3 mx-auto md:ml-4 bg-orange-500 rounded-xl inline-flex justify-start items-start gap-2 text-white text-sm font-semibold font-['Manrope'] leading-normal">
          Buy Now
        </button>
      </div>
    </div>
  )
}
