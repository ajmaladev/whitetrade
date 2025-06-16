import { Carousal } from '@/payload-types'
import HeroSection from '../HeroSection'
import MegaMenu from '../MegaMenu'

interface HomePageProps {
  carousal: Carousal[]
}

export default function HomePage({ carousal }: HomePageProps) {
  return (
    <div>
      <MegaMenu />
      <HeroSection carousal={carousal} />
    </div>
  )
}
