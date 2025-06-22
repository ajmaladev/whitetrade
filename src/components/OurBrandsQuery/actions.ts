'use server'

import { getPayloadClient } from '@/lib/payload'
import { revalidatePath } from 'next/cache'

export async function submitQuery(prevState: any, formData: FormData) {
  const payload = await getPayloadClient()
  const name = formData.get('name') as string
  const product = formData.get('product') as string
  const phone = formData.get('phone') as string
  try {
    await payload.create({
      collection: 'customer-query',
      data: {
        name,
        product: product as string,
        phone,
      },
    })
    revalidatePath('/')
    return {
      message: 'Your query has been submitted successfully!',
      error: false,
    }
  } catch (error) {
    console.error('Error creating customer query:', error)
    return {
      message: 'Something went wrong. Please try again.',
      error: true,
    }
  }
}
