import { Category } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { PaginatedDocs } from 'payload'

export default function Categories({ categories }: { categories: PaginatedDocs<Category> }) {
  return (
    <div className="grid grid-cols-1 items-center sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-10 gap-y-24 md:gap-y-24 lg:gap-y-36 pb-8 pt-20 px-4 sm:px-6 md:px-8 lg:px-32 xl:px-32 w-ful">
      {categories.docs.map((category) => {
        let imageUrl = category.category_image
        if (imageUrl) {
          imageUrl = process.env.NEXT_PUBLIC_BUNNY_CDN + imageUrl
        }
        return (
          <Link
            href={`/categories/${category.slug || ''}`}
            key={category.id}
            className="relative group"
          >
            <div
              key={category.id}
              className="relative w-72 h-44 cursor-pointer p-4 hover:shadow-xl transition-all duration-300 ease-in-out"
              style={{
                backgroundImage: `url(/productcard-bg.webp)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="relative z-10 flex h-full items-center">
                <h3 className="justify-center text-sky-950 text-5xl pl-6 font-bold font-['Philosopher'] leading-[59.52px]">
                  {category.title}
                </h3>
              </div>
            </div>
            <div className="absolute left-[126px] bottom-[12px] w-64 h-60 z-30 transition-transform duration-300 ease-in-out group-hover:-translate-y-4">
              <Image src={imageUrl || ''} alt={category.title} fill className="object-contain" />
            </div>
          </Link>
        )
      })}
    </div>
  )
}
