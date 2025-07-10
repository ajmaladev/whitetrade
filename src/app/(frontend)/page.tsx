import HomePage from '@/components/HomePage'
import { generateDynamicSEO } from '@/components/SEO'
import {
  getCachedBestSellerProducts,
  getCachedCategories,
  getCachedGallery,
  getCachedHomePage,
} from '@/lib/fetchMethods'
import type { Metadata } from 'next'

export default async function Home() {
  const categories = await getCachedCategories()()
  const homePage = await getCachedHomePage()()
  const products = await getCachedBestSellerProducts()()
  const gallery = await getCachedGallery(3)()
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

export async function generateMetadata(): Promise<Metadata> {
  const homePage = await getCachedHomePage()()
  return generateDynamicSEO({
    data: homePage.docs[0] || null,
    type: 'home',
    image: '/logo.svg',
  })
}
