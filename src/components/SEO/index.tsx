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
      const homeData = data as Partial<HomePageType>
      title = 'White Trading Company - Safety Products & Food Supplies'
      description =
        'Leading supplier of safety products, fruits & vegetables, grains & rice, food products, and textile materials in Coimbatore since 2011.'
      keywords = [
        'White Trading Company',
        'safety products',
        'safety jackets',
        'safety helmets',
        'safety shoes',
        'fruits and vegetables',
        'grains and rice',
        'food products',
        'textile products',
        'Coimbatore',
        'safety gear',
        'basmati rice',
        'cotton materials',
        'fashion wear',
        'bedcovers',
        'safety harness',
        'safety gloves',
        'safety goggles',
        'hardware tools',
        'toppy noodles',
        'ghee',
        'sweetcorn',
      ]
      break

    case 'page':
      const pageData = data as Partial<Page>
      title = pageData?.meta?.title || pageData?.title || 'White Trading Company'
      description =
        pageData?.meta?.description ||
        `Explore ${pageData?.title} on White Trading Company - Your trusted partner for trading and investment solutions.`
      image = pageData?.meta?.image || pageData?.hero?.media
      url = pageData?.slug ? `${serverUrl}/${pageData.slug}` : serverUrl
      publishedAt = pageData?.publishedAt || undefined
      updatedAt = pageData?.updatedAt
      keywords = [
        'White Trading Company',
        pageData?.title?.toLowerCase() || '',
        'trading platform',
        'financial services',
        'investment',
        'trading solutions',
      ].filter(Boolean)
      break

    case 'category':
      const categoryData = data as Partial<Category>
      title = categoryData?.title || 'White Trading Company Categories'
      description = `Explore ${categoryData?.title} - Comprehensive trading and investment solutions from White Trading Company.`
      image = categoryData?.category_image
      url = categoryData?.slug ? `${serverUrl}/${categoryData.slug}` : serverUrl
      keywords = [
        'trading categories',
        'investment categories',
        'financial services',
        'White Trading Company',
        categoryData?.title?.toLowerCase() || '',
        'trading solutions',
        'investment opportunities',
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
  })

  return {
    title: title
      ? `${title}`
      : 'White Trading Company - Safety Products, Fruits & Vegetables, Grains & Rice, Food Products, Textile',
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
    verification: {
      google: process.env.GOOGLE_VERIFICATION,
      yandex: process.env.YANDEX_VERIFICATION,
      yahoo: process.env.YAHOO_VERIFICATION,
    },
  }
}

const generateStructuredData = (props: {
  type: string
  data: any
  title?: string
  description?: string
  image?: Media | string | null
  url?: string
  publishedAt?: string
  updatedAt?: string
  author?: string
  category?: string
}) => {
  const { type, data, title, description, image, url, publishedAt, updatedAt, author, category } =
    props
  const serverUrl = getServerSideURL()

  const baseStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'White Trading Company',
    url: serverUrl,
    logo: `${serverUrl}/logo.svg`,
    description:
      'Leading supplier of safety products, fruits & vegetables, grains & rice, food products, and textile materials',
    foundingDate: '2011',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '#45/2a-1, Sungam Bye Pass Road',
      addressLocality: 'Coimbatore',
      postalCode: '641045',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-422-2321811',
      contactType: 'customer service',
      availableLanguage: 'English',
    },
    email: 'info@whitetradingcompany.com',
  }

  switch (type) {
    case 'home':
      return {
        ...baseStructuredData,
        '@type': 'WebSite',
        name: 'White Trading Company',
        description:
          'Leading supplier of safety products, fruits & vegetables, grains & rice, food products, and textile materials',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${serverUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      }

    case 'post':
      return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        image: typeof image === 'object' ? image?.url : image,
        author: {
          '@type': 'Person',
          name: author || 'White Trading Company Team',
        },
        publisher: {
          '@type': 'Organization',
          name: 'White Trading Company',
          logo: {
            '@type': 'ImageObject',
            url: `${serverUrl}/logo.svg`,
          },
        },
        datePublished: publishedAt,
        dateModified: updatedAt,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url,
        },
        articleSection: category,
        keywords: ['trading', 'investment', 'financial services', 'White Trading Company'],
      }

    case 'product':
      return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: title,
        description,
        image: typeof image === 'object' ? image?.url : image,
        brand: {
          '@type': 'Brand',
          name: 'White Trading Company',
        },
        category: category || 'Trading Services',
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
          priceCurrency: 'USD',
          price: '0',
          seller: {
            '@type': 'Organization',
            name: 'White Trading Company',
          },
        },
      }

    case 'category':
      return {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: title,
        description,
        image: typeof image === 'object' ? image?.url : image,
        url,
        mainEntity: {
          '@type': 'ItemList',
          itemListElement:
            data?.products?.docs?.map((product: any, index: number) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'Product',
                name: product.title,
                url: `${serverUrl}/products/${product.id}`,
              },
            })) || [],
        },
      }

    default:
      return baseStructuredData
  }
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
    title:
      title ||
      'White Trading Company - Safety Products, Fruits & Vegetables, Grains & Rice, Food Products, Textile',
    description:
      description ||
      'White Trading Company - Leading supplier of safety products, fruits & vegetables, grains & rice, food products, and textile materials.',
    url: url || serverUrl,
    siteName: 'White Trading Company',
    images: [
      {
        url:
          typeof image === 'object'
            ? `${serverUrl}${image?.url}`
            : image || `${serverUrl}/website-template-OG.webp`,
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
}) => {
  const { title, description, image } = props
  const serverUrl = getServerSideURL()

  return {
    card: 'summary_large_image',
    title:
      title ||
      'White Trading Company - Safety Products, Fruits & Vegetables, Grains & Rice, Food Products, Textile',
    description:
      description ||
      'White Trading Company - Leading supplier of safety products, fruits & vegetables, grains & rice, food products, and textile materials.',
    images: [
      typeof image === 'object'
        ? `${serverUrl}${image?.url}`
        : image || `${serverUrl}/website-template-OG.webp`,
    ],
    creator: '@whitetradingcompany',
    site: '@whitetradingcompany',
  }
}

export default generateDynamicSEO
