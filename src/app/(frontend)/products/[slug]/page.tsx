import { ProductPage } from '@/components/ProductPage'
import generateDynamicSEO from '@/components/SEO'
import { SuggestedProducts } from '@/components/SuggestedProducts'
import { getCachedAllProducts, getCachedProduct } from '@/lib/fetchMethods'
import { Product } from '@/payload-types'

export default async function ProductPageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getCachedProduct(slug)()
  const productData = product.docs[0]
  if (!productData) {
    return (
      <main role="main" aria-label="Product not found">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-600">
            The requested product could not be found. Please check the URL or browse our other
            products.
          </p>
        </div>
      </main>
    )
  }
  const products = (productData.category[0]?.value as any).products.docs as Product[]

  return (
    <main role="main" aria-label={`${productData.title} - White Trading Company Product Page`}>
      <ProductPage product={productData} />
      <SuggestedProducts products={products} currentProductId={productData.id} />
    </main>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getCachedProduct(slug)()
  return generateDynamicSEO({
    data: product.docs[0] || null,
    type: 'product',
  })
}

export async function generateStaticParams() {
  const products = await getCachedAllProducts()()
  return products.docs
    .filter((product) => product.slug || product.id) // Only include products with slugs
    .map((product) => ({
      slug: product.slug || product.id,
    }))
}
