import { Category, HomePage, Product } from '@/payload-types'
import { unstable_cache } from 'next/cache'
import { PaginatedDocs } from 'payload'
import { CACHE_REVALIDATE_TIME } from './constants'
import { getPayloadClient } from './payload'

export const getCachedCategories = () =>
  unstable_cache(async () => getCategories(), ['categories'], {
    revalidate: CACHE_REVALIDATE_TIME,
    tags: ['categories'],
  })

export const getCategories = async () => {
  const payload = await getPayloadClient()
  const categories = await payload.find({ collection: 'categories' })
  return categories
}

export const getCachedHomePage = () =>
  unstable_cache(async () => getHomePage(), ['home-page'], {
    revalidate: CACHE_REVALIDATE_TIME,
    tags: ['home-page'],
  })

export const getHomePage = async () => {
  const payload = await getPayloadClient()
  const homePage = await payload.find({ collection: 'home-page' })
  return homePage as PaginatedDocs<HomePage>
}

export const getCachedProducts = () =>
  unstable_cache(async () => getProducts(), ['products'], {
    revalidate: CACHE_REVALIDATE_TIME,
    tags: ['products'],
  })

export const getProducts = async () => {
  const payload = await getPayloadClient()
  const products = await payload.find({
    collection: 'products',
    pagination: false,
    limit: 1000,
  })
  return products as PaginatedDocs<Product>
}

export const getCachedCategory = (slug: string) =>
  unstable_cache(async () => getCategory(slug), ['category', slug], {
    revalidate: CACHE_REVALIDATE_TIME,
    tags: ['category', slug],
  })

export const getCategory = async (slug: string) => {
  const payload = await getPayloadClient()
  const category = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } },
  })
  return category as PaginatedDocs<Category>
}
