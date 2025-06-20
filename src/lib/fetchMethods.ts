import { HomePage } from '@/payload-types'
import { unstable_cache } from 'next/cache'
import { PaginatedDocs } from 'payload'
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

export const getCachedCertificates = () =>
  unstable_cache(async () => getCertificates(), ['certificates'], {
    revalidate: 60 * 60 * 24,
    tags: ['certificates'],
  })

export const getCertificates = async () => {
  const payload = await getPayloadClient()
  const certificates = await payload.find({ collection: 'certificate' })
  return certificates
}

export const getCachedWeOffer = () =>
  unstable_cache(async () => getWeOffer(), ['weOffer'], {
    revalidate: 60 * 60 * 24,
    tags: ['weOffer'],
  })

export const getWeOffer = async () => {
  const payload = await getPayloadClient()
  const weOffer = await payload.find({ collection: 'weOffer' })
  return weOffer
}

export const getCachedHomePage = () =>
  unstable_cache(async () => getHomePage(), ['home-page'], {
    revalidate: 60 * 60 * 24,
    tags: ['home-page'],
  })

export const getHomePage = async () => {
  const payload = await getPayloadClient()
  const homePage = await payload.find({ collection: 'home-page' })
  return homePage as PaginatedDocs<HomePage>
}
