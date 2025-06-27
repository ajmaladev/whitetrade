import { CategoryCard } from '@/components/Categories'
import CategoryImages from '@/components/Categories/CategoryImages'
import ProductDetails from '@/components/Categories/ProductDetails'
import { getCachedCategories, getCachedCategory } from '@/lib/fetchMethods'
import { Category, Product } from '@/payload-types'
import NotFound from '../not-found'

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const category = await getCachedCategory((await params).category)()
  if (!category) {
    NotFound()
  }
  console.log(category.docs)
  return (
    <div className="flex flex-col mb-10 lg:mb-0">
      <div className="flex flex-col lg:flex-row items-center justify-center min-[50vh] lg:gap-40">
        <CategoryCard
          category={category.docs[0] as Category}
          className="!mt-[70px] md:!mt-[130px] !mb-12"
          index={0}
        />
        <ProductDetails products={category.docs[0]?.products?.docs as Product[]} />
      </div>
      <CategoryImages category={category.docs[0] as Category} />
    </div>
  )
}

export async function generateStaticParams() {
  const categories = await getCachedCategories()()
  return categories.docs.map((category) => ({
    category: category.slug as string,
  }))
}
