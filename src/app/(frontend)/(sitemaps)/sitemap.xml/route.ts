import { getCachedAllProducts, getCachedCategories } from '@/lib/fetchMethods'
import { getServerSideSitemap } from 'next-sitemap'
import { unstable_cache } from 'next/cache'

const getSitemapIndex = unstable_cache(
  async () => {
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://whitetradingcompany.com'

    const dateFallback = new Date().toISOString()

    // Get categories and products for sitemap
    const categories = await getCachedCategories()()
    const products = await getCachedAllProducts()()

    const sitemapEntries = [
      {
        loc: SITE_URL,
        lastmod: dateFallback,
        changefreq: 'daily' as const,
        priority: 1.0,
      },
      {
        loc: `${SITE_URL}/gallery`,
        lastmod: dateFallback,
        changefreq: 'weekly' as const,
        priority: 0.8,
      },
      {
        loc: `${SITE_URL}/search`,
        lastmod: dateFallback,
        changefreq: 'weekly' as const,
        priority: 0.7,
      },
      {
        loc: `${SITE_URL}/posts`,
        lastmod: dateFallback,
        changefreq: 'weekly' as const,
        priority: 0.6,
      },
    ]

    // Add category pages
    categories.docs.forEach((category) => {
      sitemapEntries.push({
        loc: `${SITE_URL}/${category.slug}`,
        lastmod: dateFallback,
        changefreq: 'weekly' as const,
        priority: 0.8,
      })
    })

    // Add product pages
    products.docs.forEach((product) => {
      if (product.slug || product.id) {
        sitemapEntries.push({
          loc: `${SITE_URL}/products/${product.slug || product.id}`,
          lastmod: dateFallback,
          changefreq: 'weekly' as const,
          priority: 0.7,
        })
      }
    })

    return sitemapEntries
  },
  ['sitemap-index'],
  {
    tags: ['sitemap-index'],
  },
)

export async function GET() {
  const sitemap = await getSitemapIndex()

  return getServerSideSitemap(sitemap)
}
