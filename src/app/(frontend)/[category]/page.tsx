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

  const categoryData = category.docs[0] as Category
  const products = allProducts.docs as Product[]

  // Generate structured data for category page
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: categoryData.title,
    description: `Explore ${categoryData.title} from White Trading Company. Leading supplier in Coimbatore since 2011.`,
    url: `https://whitetradingcompany.com/${categoryData.slug}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: product.title,
          description: product.description,
          url: `https://whitetradingcompany.com/products/${product.slug || product.id}`,
        },
      })),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main
        className="flex flex-col mb-10 lg:mb-5 mt-5 md:mt-10"
        role="main"
        aria-label={`${categoryData.title} - White Trading Company Category Page`}
      >
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 min-[50vh] lg:gap-40">
          <CategoryCard
            category={categoryData}
            index={0}
            layout={{ colSpan: 2, rowSpan: 1 }}
            showButton={false}
            isCategoryPage={true}
          />
          <ProductDetails products={products} />
        </div>
        <GalleryGrid images={categoryData?.category_images as Gallery['images']} />
      </main>
    </>
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
      title: 'Category Not Found - White Trading Company',
      description: 'The requested category could not be found on White Trading Company.',
    })
  }

  return generateDynamicSEO({
    data: category.docs[0],
    type: 'category',
  })
}
