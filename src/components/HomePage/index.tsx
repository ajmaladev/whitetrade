import { Carousal, Category } from '@/payload-types'
import { PaginatedDocs } from 'payload'
import Categories from '../Categories'
import HeroSection from '../HeroSection'
import MegaMenu from '../MegaMenu'
import ReadyToShip from '../ReadyToShip'

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
    </div>
  )
}
