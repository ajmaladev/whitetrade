import HomePage from '@/components/HomePage'
import { getCachedCarousal } from '@/utilities/getCarousal'

export default async function Home() {
  const carousal = await getCachedCarousal()()
  return <HomePage carousal={carousal} />
}
