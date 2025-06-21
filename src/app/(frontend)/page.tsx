import HomePage from '@/components/HomePage'
import { getCachedCategories, getCachedHomePage } from '@/lib/fetchMethods'

export default async function Home() {
  const categories = await getCachedCategories()()
  const homePage = await getCachedHomePage()()
  const { carousal, testimonials, certificates, weOffer } = homePage.docs[0] as any
  console.log(weOffer)
  console.log(homePage)
  return (
    <HomePage
      carousal={carousal}
      categories={categories}
      testimonials={testimonials}
      certificates={certificates}
      weOffer={weOffer}
    />
  )
}
