import { ProductPage } from '@/components/ProductPage'
import generateDynamicSEO from '@/components/SEO'
import { getCachedAllProducts, getCachedProduct } from '@/lib/fetchMethods'

export default async function ProductPageRoute({ params }: { params: { slug: string } }) {
  const product = await getCachedProduct(params.slug)()
  const productData = product.docs[0]

  if (!productData) {
    return <div>Product not found</div>
  }

  return <ProductPage product={productData} />
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getCachedProduct(params.slug)()
  return generateDynamicSEO({
    data: product.docs[0] || null,
    type: 'product',
  })
}

export async function generateStaticParams() {
  const products = await getCachedAllProducts()()
  return products.docs.map((product) => ({
    slug: product.slug,
  }))
}
