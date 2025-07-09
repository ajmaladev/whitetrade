'use client'

import { Product } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
  product: Product
  index: number
}

export const ProductCard = ({ product, index }: ProductCardProps) => {
  let imageUrl = product?.product_image
  if (imageUrl) {
    imageUrl = process.env.NEXT_PUBLIC_BUNNY_CDN + imageUrl
  }

  return (
    <div
      className={`
        relative flex flex-col justify-between overflow-hidden 
        rounded-[2.5rem]
        bg-gradient-to-br from-[#faf0e8] via-[#f8e8d8] to-[#f5e0c8]
        h-[200px] sm:h-[300px]
        w-full
        p-4 sm:p-5
        transition-all duration-500 ease-out
        hover:scale-110
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

      <Link href={`/products/${product.slug || product.id}`} className="h-full flex flex-col">
        <div className="flex-1">
          {product.is_best_seller ? (
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-bold text-white/95 bg-gradient-to-r from-blue-500/30 to-purple-500/30 px-3 py-1.5 rounded-full border border-white/40 backdrop-blur-sm">
                Best Seller
              </div>
            </div>
          ) : (
            <div className="h-5"></div>
          )}

          <h2
            className={`font-bold text-center text-gray-800 text-sm sm:text-lg font-['Montserrat'] mb-3 !leading-tight
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
    </div>
  )
}
