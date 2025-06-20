import { Carousal, Category } from '@/payload-types'
import { PaginatedDocs } from 'payload'
import Categories from '../Categories'
import HeroSection from '../HeroSection'
import MegaMenu from '../MegaMenu'
import ReadyToShip from '../ReadyToShip'
import { Button } from '../ui/button'

interface HomePageProps {
  carousal: Carousal[]
  categories: PaginatedDocs<Category>
}

export default function HomePage({ carousal, categories }: HomePageProps) {
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
    </div>
  )
}
