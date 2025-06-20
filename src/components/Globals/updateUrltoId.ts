'use server'
import { getPayloadClient } from '@/lib/payload'

export const updateUrltoId = async (url: string) => {
  if (!url) return null

  try {
    const payload = await getPayloadClient()
    const media = await payload.find({
      collection: 'media',
      where: {
        url: { equals: url },
      },
    })

    if (!media.docs?.[0]?.id) {
      // console.error(`No media found with URL: ${url}`);
    }

    return media.docs?.[0]?.id
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    console.error('Media URL to ID conversion error:', errorMessage)
  }
}
