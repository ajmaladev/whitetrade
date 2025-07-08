'use client'
import { Product } from '@/payload-types'
import Image from 'next/image'
import { useActionState, useState } from 'react'
import { Input } from '../ui/input'
import { Marquee } from '../ui/marquee'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { submitQuery } from './actions'

type OurBrands =
  | { image?: string | null | undefined; id?: string | null | undefined }[]
  | null
  | undefined

interface OurBrandsQueryProps {
  brands: OurBrands
  products: Product[]
}

export const OurBrandsQuery = ({ brands, products }: OurBrandsQueryProps) => {
  const [state, formAction] = useActionState(submitQuery, { message: '', error: false })
  const [selectedProduct, setSelectedProduct] = useState<string>('')

  const handleSubmit = async (formData: FormData) => {
    const name = formData.get('name') as string
    const product = formData.get('product') as string
    const phone = formData.get('phone') as string

    if (!name || !product || !phone) {
      return
    }

    return formAction(formData)
  }

  return (
    <div className="w-full relative bg-gradient-to-b from-[#1C3A6A] via-[#3a5888] to-[#fafbfd]">
      <div className="mx-auto px-4 py-16">
        <h3 className="text-4xl font-semibold text-center text-white mb-12 font-['Poppins']">
          Our Brands
        </h3>
        <div className="my-10 md:my-32">
          <Marquee speed={30} pauseOnHover={true}>
            {brands?.map((brand) => (
              <div key={brand.id} className="h-28 flex items-center mx-8">
                {brand.image && (
                  <Image
                    className="w-32 h-28 object-contain"
                    src={process.env.NEXT_PUBLIC_BUNNY_CDN + brand.image}
                    alt={brand.image || 'brand logo'}
                    width={100}
                    height={100}
                  />
                )}
              </div>
            ))}
          </Marquee>
        </div>

        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-4xl font-semibold text-[#fff] text-center mb-8 md:mb-16 font-['Poppins']">
            Get a quote
          </h3>
          <form action={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                type="text"
                name="name"
                placeholder="Name"
                required
                className="w-full h-12 px-4 bg-white rounded-xl"
              />
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger className="w-full h-12 px-4 bg-white rounded-xl">
                  <SelectValue placeholder="Product" />
                </SelectTrigger>
                <SelectContent className="max-h-[60vh] overflow-y-auto">
                  {products && products.length > 0 ? (
                    products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.title}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="" disabled>
                      No products found
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              <input type="hidden" name="product" value={selectedProduct} />
              <Input
                type="tel"
                name="phone"
                placeholder="Your phone number"
                required
                className="w-full h-12 px-4 bg-white rounded-xl"
              />
            </div>
            <div className="flex flex-col items-center mt-8 md:mt-16 gap-4">
              <button
                type="submit"
                className="px-8 py-4 bg-orange-500 rounded-xl inline-flex justify-start items-start gap-2 hover:shadow-[0px_8px_16px_0px_rgba(0,0,0,0.35)] transition-all duration-300 ease-in-out"
              >
                <div className="justify-start text-white text-sm font-semibold font-['Manrope'] leading-normal">
                  Get your quote
                </div>
              </button>

              {state?.message && (
                <div
                  className={`text-center px-4 py-2 rounded-md ${
                    state.error
                      ? 'bg-red-100 text-red-700 border border-red-300'
                      : 'bg-green-100 text-green-700 border border-green-300'
                  }`}
                >
                  {state.message}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
