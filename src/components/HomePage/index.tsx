import { Category, HomePage as HomePageType, Product } from '@/payload-types'
import { PaginatedDocs } from 'payload'
import { AboutUs } from '../AboutUs'
import Categories from '../Categories'
import { Certificates } from '../Certificates'
import HeroSection from '../HeroSection'
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
}: HomePageProps) {
  return (
    <div className="w-full">
      <HeroSection carousal={carousal} />
      <ReadyToShip />
      <Categories categories={categories} />
      <div className="flex justify-center w-full">
        <Button className="relative bg-gradient-to-r from-cyan-900 hover:shadow-[0px_8px_16px_0px_rgba(0,0,0,0.35)] transition-all duration-300 ease-in-out to-[#36559b] px-10 rounded-[50px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] justify-start text-white text-2xl font-semibold">
          BUY NOW
        </Button>
      </div>
      <Testimonials testimonials={testimonials} />
      <Certificates certificates={certificates} />
      <WeOfferComponent weOffer={weOffer} />
      <OurBrandsQuery brands={ourBrands} products={products.docs} />
      <Reviews reviews={reviews} />
      <AboutUs />
    </div>
  )
}
