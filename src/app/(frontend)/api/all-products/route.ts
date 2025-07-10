import { getPaginatedProducts } from '@/lib/fetchMethods'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const products = await getPaginatedProducts(page, limit)

    return NextResponse.json({
      products: products.docs,
      hasMore: products.hasNextPage,
      totalPages: products.totalPages,
      totalDocs: products.totalDocs,
      currentPage: products.page,
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}
