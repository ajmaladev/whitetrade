import { CategoryCard } from '@/components/Categories'
import { getCachedCategory } from '@/lib/fetchMethods'
import { Category } from '@/payload-types'

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const category = await getCachedCategory(params.category)()
  if (!category) {
    return <div>Category not found</div>
  }
  return (
    <div className="flex items-center justify-center min-[50vh]">
      <CategoryCard category={category.docs[0] as Category} className="!my-[130px]" index={0} />
    </div>
  )
}
