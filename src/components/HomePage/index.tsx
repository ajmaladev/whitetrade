import { Category, Gallery, HomePage as HomePageType, Product } from '@/payload-types'
import { PaginatedDocs } from 'payload'
import { AboutUs } from '../AboutUs'
import Categories from '../Categories'
import { Certificates } from '../Certificates'
import HeroSection from '../HeroSection'
import HomePageGallery from '../HomePageGallery'
import { OurBrandsQuery } from '../OurBrandsQuery'
import ReadyToShip from '../ReadyToShip'
import { Reviews } from '../Reviews'
import Testimonials from '../Testimonials'
import { Button } from '../ui/button'
import { WeOffer as WeOfferComponent } from '../WeOffer'

type TestimonialItem = {
  id: string
  title: string
  count: string
}

type WeOfferItem = {
  id: string
  title: string
  description: string
  icon: string
}

type WeOfferData = {
  item: WeOfferItem[]
}

type OurBrands =
  | { image?: string | null | undefined; id?: string | null | undefined }[]
  | null
  | undefined
interface HomePageProps {
  carousal: HomePageType['carousal']
  categories: PaginatedDocs<Category>
  testimonials: TestimonialItem[]
  certificates: HomePageType['certificates']
  weOffer: WeOfferData
  products: PaginatedDocs<Product>
  ourBrands: OurBrands
  reviews: HomePageType['reviews']
  gallery: PaginatedDocs<Gallery>
}

export default function HomePage({
  carousal,
  categories,
  testimonials,
  certificates,
  weOffer,
  products,
  ourBrands,
  reviews,
  gallery,
}: HomePageProps) {
  // Generate structured data for the homepage
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'White Trading Company',
    description: 'Premium trading solutions and financial services',
    url: typeof window !== 'undefined' ? window.location.origin : 'https://whitetradingcompany.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://whitetradingcompany.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'White Trading Company',
      logo: {
        '@type': 'ImageObject',
        url: 'https://whitetradingcompany.com/logo.svg',
      },
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: categories.docs.map((category, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Service',
          name: category.title,
          description: `Trading services in ${category.title}`,
          url: `https://whitetradingcompany.com/${category.slug}`,
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
      <main className="w-full" role="main" aria-label="White Trading Company Homepage">
        <HeroSection carousal={carousal} />
        <ReadyToShip />
        <Categories categories={categories} />
        <section className="flex justify-center w-full" aria-label="Call to action">
          <Button
            className="relative bg-gradient-to-r from-cyan-900 hover:shadow-[0px_8px_16px_0px_rgba(0,0,0,0.35)] transition-all duration-300 ease-in-out to-[#36559b] px-10 rounded-[50px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] justify-start text-white text-2xl font-semibold"
            aria-label="Start trading with White Trading Company"
          >
            BUY NOW
          </Button>
        </section>
        <Testimonials testimonials={testimonials} />
        <Certificates certificates={certificates} />
        <HomePageGallery gallery={gallery} />
        <WeOfferComponent weOffer={weOffer} />
        <OurBrandsQuery brands={ourBrands} products={products.docs} />
        <Reviews reviews={reviews} />
        <AboutUs />
      </main>
    </>
  )
}
