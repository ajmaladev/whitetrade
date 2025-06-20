import HomePage from '@/components/HomePage'
import { getCachedCategories, getCachedTestimonials } from '@/lib/fetchMethods'
import { getCachedCarousal } from '@/utilities/getCarousal'

export default async function Home() {
  const carousal = await getCachedCarousal()()
  const categories = await getCachedCategories()()
  const testimonials = await getCachedTestimonials()()
  return <HomePage carousal={carousal} categories={categories} testimonials={testimonials} />
}
