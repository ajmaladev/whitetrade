import HomePage from '@/components/HomePage'
import { getCachedCategories } from '@/lib/fetchMethods'
import { getCachedCarousal } from '@/utilities/getCarousal'

export default async function Home() {
  const carousal = await getCachedCarousal()()
  const categories = await getCachedCategories()()
  return <HomePage carousal={carousal} categories={categories} />
}
