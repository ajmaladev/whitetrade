import config from '@payload-config'
import { getServerSideSitemap } from 'next-sitemap'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

const getCategoriesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://whitetradingcompany.com'

    const results = await payload.find({
      collection: 'categories',
      overrideAccess: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      select: {
        slug: true,
        updatedAt: true,
        title: true,
      },
    })

    const dateFallback = new Date().toISOString()

    const sitemap = results.docs
      ? results.docs
          .filter((category) => Boolean(category?.slug))
          .map((category) => ({
            loc: `${SITE_URL}/${category?.slug}`,
            lastmod: category.updatedAt || dateFallback,
            changefreq: 'weekly' as const,
            priority: 0.7,
          }))
      : []

    return sitemap
  },
  ['categories-sitemap'],
  {
    tags: ['categories-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getCategoriesSitemap()

  return getServerSideSitemap(sitemap)
}
