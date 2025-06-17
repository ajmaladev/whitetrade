'use server'
import { getPayloadClient } from '@/lib/payload'
import mongoose from 'mongoose'

export const updateIdtoUrl = async (id: string) => {
  if (!id) return null

  try {
    // Validate if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error('Invalid media ID format:', id)
      return null
    }

    const payload = await getPayloadClient()
    const result = await payload.db.collections.media?.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $project: {
          url: 1,
          _id: 0,
        },
      },
      {
        $limit: 1,
      },
    ])

    const url = result?.[0]?.url
    if (!url) {
      console.error(`No media found with ID: ${id}`)
      return null
    }

    return url
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    console.error('Media ID to URL conversion error:', errorMessage)
    return null
  }
}
