import { Category } from '@/payload-types'
import Image from 'next/image'

export default function CategoryImages({ category }: { category: Category }) {
  return (
    <div className="mx-auto my-10">
      <div className="flex flex-col gap-4">
        {category?.category_images?.map((image) => (
          <Image
            src={image.image ? process.env.NEXT_PUBLIC_BUNNY_CDN + image.image : ''}
            key={image.image}
            className="w-full h-full object-cover"
            alt={image.image || ''}
            width={100}
            height={100}
          />
        ))}
      </div>
    </div>
  )
}
