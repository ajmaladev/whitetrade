import { CategoryCard } from '@/components/Categories'
import ProductDetails from '@/components/Categories/ProductDetails'
import { getCachedCategories, getCachedCategory } from '@/lib/fetchMethods'
import { Category, Product } from '@/payload-types'

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const category = await getCachedCategory((await params).category)()
  if (!category) {
    return <div>Category not found</div>
  }
  console.log(category.docs)
  return (
    <div className="flex flex-col mb-10 lg:mb-0 lg:flex-row items-center justify-center min-[50vh] lg:gap-40">
      <CategoryCard
        category={category.docs[0] as Category}
        className="!mt-[130px] !mb-14"
        index={0}
      />
      <ProductDetails products={category.docs[0]?.products?.docs as Product[]} />
    </div>
  )
}

export async function generateStaticParams() {
  const categories = await getCachedCategories()()
  return categories.docs.map((category) => ({
    category: category.slug as string,
  }))
}
