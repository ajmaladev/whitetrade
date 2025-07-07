import { getServerSideSitemap } from 'next-sitemap'
import { unstable_cache } from 'next/cache'

const getSitemapIndex = unstable_cache(
  async () => {
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://whitetradingcompany.com'

    const dateFallback = new Date().toISOString()

    return [
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
        loc: `${SITE_URL}/categories-sitemap.xml`,
        lastmod: dateFallback,
        changefreq: 'weekly' as const,
        priority: 0.8,
      },
    ]
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
