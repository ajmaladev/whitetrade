import { Carousal } from '@/payload-types'
import HeroSection from '../HeroSection'
import MegaMenu from '../MegaMenu'
import ReadyToShip from '../ReadyToShip'

interface HomePageProps {
  carousal: Carousal[]
}

export default function HomePage({ carousal }: HomePageProps) {
  return (
    <div className="w-full">
      <MegaMenu />
      <HeroSection carousal={carousal} />
      <ReadyToShip />
    </div>
  )
}
