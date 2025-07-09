import { ProductPage } from '@/components/ProductPage'
import generateDynamicSEO from '@/components/SEO'
import { SuggestedProducts } from '@/components/SuggestedProducts'
import { getCachedAllProducts, getCachedProduct } from '@/lib/fetchMethods'
import { Product } from '@/payload-types'

export default async function ProductPageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getCachedProduct(slug)()
  const productData = product.docs[0]
  console.log(productData)
  if (!productData) {
    return <div>Product not found</div>
  }
  const products = (productData.category[0]?.value as any).products.docs as Product[]
  return (
    <>
      <ProductPage product={productData} />
      <SuggestedProducts products={products} currentProductId={productData.id} />
    </>
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
