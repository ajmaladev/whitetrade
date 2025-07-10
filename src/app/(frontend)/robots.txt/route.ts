import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const SITE_URL =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    'https://whitetradingcompany.com'

  const robotsTxt = `# White Trading Company Robots.txt
# Allow all crawlers
User-agent: *
Allow: /

# Sitemap location
Sitemap: ${SITE_URL}/sitemap.xml

# Crawl delay (optimized for search engines)
Crawl-delay: 1

# Disallow admin and technical areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /static/
Disallow: /payload/
Disallow: /graphql/
Disallow: /graphql-playground/

# Allow important pages and content
Allow: /posts/
Allow: /gallery/
Allow: /search/
Allow: /categories/
Allow: /products/
Allow: /about/
Allow: /contact/

# Specific rules for major search engines
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /

User-agent: YandexBot
Allow: /

# Block aggressive crawlers and scrapers
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: BLEXBot
Disallow: /

User-agent: Screaming
Disallow: /

# Host directive for canonical domain
Host: ${SITE_URL}
`

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
