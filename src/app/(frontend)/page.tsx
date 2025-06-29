import HomePage from '@/components/HomePage'
import {
  getCachedCategories,
  getCachedGallery,
  getCachedHomePage,
  getCachedProducts,
} from '@/lib/fetchMethods'

export default async function Home() {
  const categories = await getCachedCategories()()
  const homePage = await getCachedHomePage()()
  const products = await getCachedProducts()()
  const gallery = await getCachedGallery()()
  const { carousal, testimonials, certificates, weOffer, reviews } = homePage.docs[0] as any
  const ourBrands = homePage.docs[0]?.['our-brands']
  return (
    <HomePage
      carousal={carousal}
      categories={categories}
      testimonials={testimonials}
      certificates={certificates}
      weOffer={weOffer}
      products={products}
      ourBrands={ourBrands}
      reviews={reviews}
      gallery={gallery}
    />
  )
}
