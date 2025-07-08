'use server'

import { getPayloadClient } from '@/lib/payload'
import { revalidateTag } from 'next/cache'

export async function revalidate(tag: string) {
  try {
    revalidateTag(tag)
    console.log('Revalidation successful:', tag) // Dont remove this console.log
  } catch (error) {
    console.error('Revalidation error:', error)
  }
}

export async function updateCategoryOrder(orders: { id: string; order: number }[]) {
  const payload = await getPayloadClient()
  await Promise.all(
    orders.map(({ id, order }) =>
      payload.update({
        collection: 'categories',
        id,
        data: { order },
      }),
    ),
  )
}
