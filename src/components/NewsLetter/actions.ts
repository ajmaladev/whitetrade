'use server'

import { getPayloadClient } from '@/lib/payload'
import { revalidatePath } from 'next/cache'

export async function subscribeNewsletter(formData: FormData) {
  try {
    const payload = await getPayloadClient()
    const email = formData.get('email') as string

    if (!email || !email.trim()) {
      return { message: 'Email is required', error: true }
    }

    // Check if email already exists
    const existingSubscription = await payload.find({
      collection: 'newstletter',
      where: {
        email: {
          equals: email,
        },
      },
    })

    if (existingSubscription.docs.length > 0) {
      return { message: 'Email already subscribed', error: true }
    }

    // Create new subscription
    await payload.create({
      collection: 'newstletter',
      data: {
        email: email.trim(),
      },
    })

    revalidatePath('/')
    return { message: 'Successfully subscribed to newsletter!', error: false }
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return { message: 'Failed to subscribe. Please try again.', error: true }
  }
}
