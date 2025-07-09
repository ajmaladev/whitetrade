import { CategoryCard } from '@/components/Categories'
import ProductDetails from '@/components/Categories/ProductDetails'
import { generateDynamicSEO } from '@/components/SEO'
import {
  getCachedCategories,
  getCachedCategory,
  getCachedCategoryProducts,
} from '@/lib/fetchMethods'
import { Category, Gallery, Product } from '@/payload-types'
import type { Metadata } from 'next'
import GalleryGrid from '../gallery/GalleryGrid'
import NotFound from '../not-found'

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const category = await getCachedCategory((await params).category)()
  const allProducts = await getCachedCategoryProducts((await params).category)()
  if (!category) {
    NotFound()
  }
  return (
    <div className="flex flex-col mb-10 lg:mb-5 mt-5 md:mt-10">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 min-[50vh] lg:gap-40">
        <CategoryCard
          category={category.docs[0] as Category}
          index={0}
          layout={{ colSpan: 2, rowSpan: 1 }}
          showButton={false}
        />
        <ProductDetails products={allProducts.docs as Product[]} />
      </div>
      <GalleryGrid images={category.docs[0]?.category_images as Gallery['images']} />
    </div>
  )
}

export async function generateStaticParams() {
  const categories = await getCachedCategories()()
  return categories.docs.map((category) => ({
    category: category.slug as string,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category: categorySlug } = await params
  const category = await getCachedCategory(categorySlug)()

  if (!category || !category.docs[0]) {
    return generateDynamicSEO({
      data: null,
      type: 'category',
      title: 'Category Not Found',
      description: 'The requested category could not be found on White Trading Company.',
    })
  }

  return generateDynamicSEO({
    data: category.docs[0],
    type: 'category',
  })
}
