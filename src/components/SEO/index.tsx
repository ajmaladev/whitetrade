import {
  Category,
  HomePage,
  HomePage as HomePageType,
  Media,
  Page,
  Post,
  Product,
} from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import type { Metadata } from 'next'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: Media | string | null
  url?: string
  type?: 'website' | 'article' | 'product' | 'category' | 'home' | 'page' | 'post'
  publishedAt?: string
  updatedAt?: string
  author?: string
  category?: string
  tags?: string[]
  structuredData?: Record<string, any>
  canonical?: string
  noindex?: boolean
  nofollow?: boolean
  locale?: string
  alternateLanguages?: Record<string, string>
}

interface DynamicSEOProps extends SEOProps {
  data:
    | Partial<Page>
    | Partial<Post>
    | Partial<Product>
    | Partial<Category>
    | Partial<HomePageType>
    | Partial<HomePage>
    | null
  type?: 'website' | 'article' | 'product' | 'category' | 'home' | 'page' | 'post'
}

export const generateDynamicSEO = (props: DynamicSEOProps): Metadata => {
  const { data, type, ...customProps } = props
  const serverUrl = getServerSideURL()

  // Extract data based on type
  let title = customProps.title
  let description = customProps.description
  let keywords: string[] = customProps.keywords || []
  let image = customProps.image
  let url = customProps.url
  let publishedAt = customProps.publishedAt
  let updatedAt = customProps.updatedAt
  const author = customProps.author
  const category = customProps.category
  const tags: string[] = customProps.tags || []

  // Generate SEO data based on content type
  switch (type) {
    case 'home':
      title = 'White Trading Company - Safety Products & Food Supplies'
      // Optimized description: 155 characters
      description =
        'Leading supplier of safety products, fruits & vegetables, grains & rice, food products, and textile materials in Coimbatore since 2011.'
      keywords = [
        'White Trading Company',
        'safety products Coimbatore',
        'safety jackets',
        'safety helmets',
        'safety shoes',
        'fruits and vegetables supplier',
        'grains and rice supplier',
        'food products supplier',
        'textile products Coimbatore',
        'safety gear supplier',
        'basmati rice supplier',
        'cotton materials',
        'fashion wear',
        'bedcovers',
        'safety harness',
        'safety gloves',
        'safety goggles',
        'hardware tools',
        'toppy noodles',
        'ghee supplier',
        'sweetcorn supplier',
        'trading company Coimbatore',
        'wholesale supplier',
        'bulk purchase',
        'corporate supplies',
      ]
      break

    case 'page':
      const pageData = data as Partial<Page>
      title = pageData?.meta?.title || pageData?.title || 'White Trading Company'
      description =
        pageData?.meta?.description ||
        `Explore ${pageData?.title} on White Trading Company - Your trusted partner for safety products, food supplies, and textile materials in Coimbatore since 2011.`
      image = '/white-trading-company-brochure.webp'
      url = pageData?.slug ? `${serverUrl}/${pageData.slug}` : serverUrl
      publishedAt = pageData?.publishedAt || undefined
      updatedAt = pageData?.updatedAt
      keywords = [
        'White Trading Company',
        pageData?.title?.toLowerCase() || '',
        'safety products',
        'food supplies',
        'textile materials',
        'Coimbatore supplier',
        'wholesale trading',
        'corporate supplies',
      ].filter(Boolean)
      break

    case 'category':
      const categoryData = data as Partial<Category>
      // Optimized category title: ~55 characters
      title = `${categoryData?.title} - White Trading Company`
      // Optimized category description: ~155 characters
      description = `Explore ${categoryData?.title} from White Trading Company. Leading supplier in Coimbatore since 2011. Quality products, competitive prices.`
      image = categoryData?.category_image
      url = categoryData?.slug ? `${serverUrl}/${categoryData.slug}` : serverUrl
      keywords = [
        categoryData?.title?.toLowerCase() || '',
        'White Trading Company',
        'Coimbatore supplier',
        'safety products',
        'food supplies',
        'textile materials',
        'wholesale supplier',
        'bulk purchase',
        'corporate supplies',
        'trading company',
      ].filter(Boolean)
      break

    case 'product':
      const productData = data as Partial<Product>
      // Optimized product title: ~55 characters
      title = `${productData?.title} - White Trading Company`
      // Optimized product description: ~155 characters
      description = `${productData?.title} from White Trading Company. Leading supplier in Coimbatore since 2011. Quality products, competitive prices.`
      image = productData?.product_image
      url = productData?.slug ? `${serverUrl}/products/${productData.slug}` : serverUrl
      keywords = [
        productData?.title?.toLowerCase() || '',
        'White Trading Company',
        'Coimbatore supplier',
        'safety products',
        'food supplies',
        'textile materials',
        'wholesale supplier',
        'bulk purchase',
        'corporate supplies',
        'trading company',
      ].filter(Boolean)
      break
  }
  // Generate Open Graph data
  const openGraph = generateOpenGraph({
    title,
    description,
    image,
    url,
    type: type || 'website',
    publishedAt,
    updatedAt,
    author,
    category,
  })

  // Generate Twitter Card data
  const twitter = generateTwitterCard({
    title,
    description,
    image,
    type,
  })

  return {
    title: title ? `${title}` : 'White Trading Company - Safety Products & Food Supplies',
    description,
    keywords: keywords.join(', '),
    authors: author ? [{ name: author }] : undefined,
    creator: 'White Trading Company',
    publisher: 'White Trading Company',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(serverUrl),
    alternates: {
      canonical: customProps.canonical || url,
    },
    robots: {
      index: !customProps.noindex,
      follow: !customProps.nofollow,
      googleBot: {
        index: !customProps.noindex,
        follow: !customProps.nofollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph,
    twitter,
    other: {
      'article:published_time': publishedAt || '0',
      'article:modified_time': updatedAt || '',
      'article:author': author || '',
      'article:section': category || '',
      'article:tag': tags.join(', '),
    },
  }
}

const getAbsoluteImageUrl = (img: Media | string | null | undefined) => {
  if (!img) return process.env.NEXT_PUBLIC_BUNNY_CDN + '/white-trading-company-brochure.webp'
  if (typeof img === 'object' && img.url) {
    if (img.url.startsWith('http')) return img.url
    return process.env.NEXT_PUBLIC_BUNNY_CDN + img.url
  }
  if (typeof img === 'string') {
    if (img.startsWith('http')) return img
    return process.env.NEXT_PUBLIC_BUNNY_CDN + img
  }
  return process.env.NEXT_PUBLIC_BUNNY_CDN + '/white-trading-company-brochure.webp'
}

const generateOpenGraph = (props: {
  title?: string
  description?: string
  image?: Media | string | null
  url?: string
  type?: string
  publishedAt?: string
  updatedAt?: string
  author?: string
  category?: string
}) => {
  const { title, description, image, url, type, publishedAt, updatedAt, author, category } = props
  const serverUrl = getServerSideURL()

  // Map custom types to valid OpenGraph types
  const getOpenGraphType = (customType?: string) => {
    switch (customType) {
      case 'home':
      case 'page':
        return 'website'
      case 'post':
      case 'article':
        return 'article'
      case 'product':
        return 'website' // OpenGraph doesn't have a product type, use website
      case 'category':
        return 'website'
      default:
        return 'website'
    }
  }

  return {
    title: title || 'White Trading Company - Safety Products & Food Supplies',
    description:
      description ||
      'Leading supplier of safety products, fruits & vegetables, grains & rice, food products, and textile materials in Coimbatore since 2011.',
    url: url || serverUrl,
    siteName: 'White Trading Company',
    images: [
      {
        url: type === 'home' ? '/white-trading-company-brochure.webp' : getAbsoluteImageUrl(image),
        width: 1200,
        height: 630,
        alt: title || 'White Trading Company',
      },
    ],
    locale: 'en_US',
    type: getOpenGraphType(type),
    ...(publishedAt && { publishedTime: publishedAt }),
    ...(updatedAt && { modifiedTime: updatedAt }),
    ...(author && { authors: [author] }),
    ...(category && { section: category }),
  }
}

const generateTwitterCard = (props: {
  title?: string
  description?: string
  image?: Media | string | null
  type?: string
}) => {
  const { title, description, image, type } = props

  const imageUrl =
    type === 'home' ? '/white-trading-company-brochure.webp' : getAbsoluteImageUrl(image)

  return {
    card: 'summary_large_image',
    title: title || 'White Trading Company - Safety Products & Food Supplies',
    description:
      description ||
      'Leading supplier of safety products, fruits & vegetables, grains & rice, food products, and textile materials in Coimbatore since 2011.',
    images: imageUrl,
    creator: '@whitetradingcompany',
    site: '@whitetradingcompany',
  }
}

export default generateDynamicSEO
