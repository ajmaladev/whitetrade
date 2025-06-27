import { getPayloadClient } from '@/lib/payload'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')

    if (!query || query.trim().length === 0) {
      return NextResponse.json({
        categories: [],
        products: [],
        totalCategories: 0,
        totalProducts: 0,
      })
    }

    const payload = await getPayloadClient()
    const searchTerm = query.trim()

    // Search categories
    const categoriesResult = await payload.find({
      collection: 'categories',
      where: {
        or: [
          {
            title: {
              like: searchTerm,
            },
          },
          {
            slug: {
              like: searchTerm,
            },
          },
        ],
      },
      depth: 1,
      limit: 10,
      pagination: false,
    })

    // Search products
    const productsResult = await payload.find({
      collection: 'products',
      where: {
        or: [
          {
            title: {
              like: searchTerm,
            },
          },
          {
            description: {
              like: searchTerm,
            },
          },
        ],
      },
      depth: 1,
      limit: 20,
      pagination: false,
    })

    return NextResponse.json({
      categories: categoriesResult.docs || [],
      products: productsResult.docs || [],
      totalCategories: categoriesResult.totalDocs || 0,
      totalProducts: productsResult.totalDocs || 0,
    })
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
