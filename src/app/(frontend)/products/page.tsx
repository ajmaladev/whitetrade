import { ProductsGrid } from '@/components/ProductsGrid'
import generateDynamicSEO from '@/components/SEO'
import { getPaginatedProducts } from '@/lib/fetchMethods'

export default async function ProductsPageRoute() {
  // Get initial products (first 20)
  const initialProducts = await getPaginatedProducts(1, 20)

  // Get total count for SEO
  const totalProducts = initialProducts.totalDocs
  const hasMore = initialProducts.hasNextPage

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'All Products',
            description: 'Complete product catalog',
            numberOfItems: totalProducts,
            url: 'https://whitetradingcompany.com/products',
          }),
        }}
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 sm:py-24">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-purple-200/15 to-blue-200/15 rounded-full blur-3xl animate-pulse delay-500"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1C3A6A] mb-6 font-['Montserrat']">
                Our Product Collection
              </h1>
              <p className="text-lg sm:text-xl text-[#1C3A6A] max-w-3xl mx-auto mb-8 leading-relaxed">
                Discover our carefully curated selection of high-quality products. From best sellers
                to unique finds, we have everything you need.
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid with Infinite Scroll */}
        <ProductsGrid
          initialProducts={initialProducts.docs}
          hasMore={hasMore}
          totalProducts={totalProducts}
        />
      </div>
    </>
  )
}

export async function generateMetadata() {
  return generateDynamicSEO({
    data: {
      title: 'Product Collection - White Trading Company',
      description:
        'Explore our complete collection of high-quality products. Find the perfect items for your needs with our extensive product catalog featuring best sellers and premium selections.',
    },
    type: 'page',
  })
}
