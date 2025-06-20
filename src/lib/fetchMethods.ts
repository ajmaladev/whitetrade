import { unstable_cache } from 'next/cache'
import { getPayloadClient } from './payload'

export const getCachedCategories = () =>
  unstable_cache(async () => getCategories(), ['categories'], {
    revalidate: 60 * 60 * 24,
    tags: ['categories'],
  })

export const getCategories = async () => {
  const payload = await getPayloadClient()
  const categories = await payload.find({ collection: 'categories' })
  return categories
}

export const getCachedTestimonials = () =>
  unstable_cache(async () => getTestimonials(), ['testimonials'], {
    revalidate: 60 * 60 * 24,
    tags: ['testimonials'],
  })

export const getTestimonials = async () => {
  const payload = await getPayloadClient()
  const testimonials = await payload.find({ collection: 'testimonial' })
  return testimonials
}
