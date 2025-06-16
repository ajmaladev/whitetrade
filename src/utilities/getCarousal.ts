import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

export async function getCarousal(depth = 2) {
  const payload = await getPayload({ config: configPromise })

  const { docs: carousal } = await payload.find({
    collection: 'carousal',
    depth,
    limit: 0,
    pagination: false,
  })

  return carousal
}

/**
 * Returns a unstable_cache function mapped with the cache tag for 'carousal'.
 * Cache all carousal items together to avoid multiple fetches.
 */
export const getCachedCarousal = () =>
  unstable_cache(async () => getCarousal(), ['carousal'], {
    tags: ['carousal'],
  })
