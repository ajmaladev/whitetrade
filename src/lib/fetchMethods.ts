import { Category, Gallery, HomePage, Product } from '@/payload-types'
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
  const categories = await payload.find({ collection: 'categories', limit: 9, sort: 'order' })
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

export const getCachedBestSellerProducts = () =>
  unstable_cache(async () => getBestSellerProducts(), ['products'], {
    revalidate: CACHE_REVALIDATE_TIME,
    tags: ['products'],
  })

export const getBestSellerProducts = async () => {
  const payload = await getPayloadClient()
  const products = await payload.find({
    collection: 'products',
    pagination: false,
    limit: 1000,
    select: {
      title: true,
      product_image: true,
      slug: true,
    },
    where: {
      is_best_seller: { equals: true },
    },
  })
  return products as PaginatedDocs<Product>
}

export const getCachedAllProducts = () =>
  unstable_cache(async () => getAllProducts(), ['all-products'], {
    revalidate: CACHE_REVALIDATE_TIME,
    tags: ['products'],
  })

export const getAllProducts = async () => {
  const payload = await getPayloadClient()
  const products = await payload.find({
    collection: 'products',
    pagination: false,
    limit: 1000,
    select: {
      slug: true,
    },
  })
  return products as PaginatedDocs<Product>
}

export const getPaginatedProducts = async (page: number = 1, limit: number = 20) => {
  const payload = await getPayloadClient()
  const products = await payload.find({
    collection: 'products',
    page,
    limit,
    sort: '-createdAt',
    select: {
      title: true,
      product_image: true,
      slug: true,
      description: true,
      is_best_seller: true,
    },
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

export const getCachedGallery = (limit: number) =>
  unstable_cache(async () => getGallery(limit), ['gallery'], {
    revalidate: CACHE_REVALIDATE_TIME,
    tags: ['gallery'],
  })

export const getGallery = async (limit: number) => {
  const payload = await getPayloadClient()
  const gallery = await payload.find({ collection: 'gallery', limit })
  return gallery as PaginatedDocs<Gallery>
}

export const getCachedProduct = (slug: string) =>
  unstable_cache(async () => getProduct(slug), ['product', slug], {
    revalidate: CACHE_REVALIDATE_TIME,
    tags: ['product', slug],
  })

export const getProduct = async (slug: string) => {
  const payload = await getPayloadClient()
  const product = await payload.find({
    collection: 'products',
    where: {
      or: [{ slug: { equals: slug } }, { id: { equals: slug } }],
    },
  })
  return product as PaginatedDocs<Product>
}
