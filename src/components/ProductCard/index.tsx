'use client'

import { Product } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
  product: Product
  index: number
  className?: string
}

export const ProductCard = ({ product, index, className }: ProductCardProps) => {
  let imageUrl = product?.product_image
  if (imageUrl) {
    imageUrl = process.env.NEXT_PUBLIC_BUNNY_CDN + imageUrl
  }

  return (
    <div
      className={`
        relative flex flex-col justify-between overflow-hidden 
        rounded-[2.5rem]
        bg-white
        h-[200px] sm:h-[300px]
        p-4 sm:p-5
        transition-all duration-500 ease-out
        group
        cursor-pointer
        shadow-xl
        ${className}
      `}
    >
      <Link href={`/products/${product.slug || product.id}`} className="h-full flex flex-col">
        <div className="flex-1">
          <h2
            className={`font-bold text-center text-[#1C3A6A] text-sm sm:text-lg font-['Montserrat'] mb-3 !leading-tight
            transition-colors duration-300 group-hover:text-gray-900
            line-clamp-2 group-hover:line-clamp-none`}
          >
            {product.title}
          </h2>
        </div>

        <div className="flex-1 flex items-end justify-center relative">
          <div className="relative w-24 h-20 sm:w-32 sm:h-28 transition-all duration-700 group-hover:scale-125">
            {/* Enhanced glow effect */}

            <Image
              src={imageUrl || '/logo.svg'}
              alt={product.title || product.description || 'Product Image'}
              fill
              className="object-contain transition-all duration-700 drop-shadow-3xl brightness-110"
              sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 220px"
            />
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
