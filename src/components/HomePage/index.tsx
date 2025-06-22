import { Carousal, Category, Certificate, Product } from '@/payload-types'
import { PaginatedDocs } from 'payload'
import Categories from '../Categories'
import { Certificates } from '../Certificates'
import HeroSection from '../HeroSection'
import MegaMenu from '../MegaMenu'
import { OurBrandsQuery } from '../OurBrandsQuery'
import ReadyToShip from '../ReadyToShip'
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
  carousal: Carousal[]
  categories: PaginatedDocs<Category>
  testimonials: TestimonialItem[]
  certificates: Certificate[]
  weOffer: WeOfferData
  products: PaginatedDocs<Product>
  ourBrands: OurBrands
}

export default function HomePage({
  carousal,
  categories,
  testimonials,
  certificates,
  weOffer,
  products,
  ourBrands,
}: HomePageProps) {
  return (
    <div className="w-full">
      <MegaMenu />
      <HeroSection carousal={carousal} />
      <ReadyToShip />
      <Categories categories={categories} />
      <div className="flex justify-center w-full">
        <Button className="relative bg-gradient-to-r from-cyan-900 to-[#36559b] px-10 rounded-[50px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] justify-start text-white text-2xl font-semibold">
          BUY NOW
        </Button>
      </div>
      <Testimonials testimonials={testimonials} />
      <Certificates certificates={certificates} />
      <WeOfferComponent weOffer={weOffer} />
      <OurBrandsQuery brands={ourBrands} products={products.docs} />
    </div>
  )
}
