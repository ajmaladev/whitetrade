import { getCachedCategories } from '@/lib/fetchMethods'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    const sort = searchParams.get('sort')

    // Use the cached method to get categories
    const categories = await getCachedCategories()()

    // Apply limit if specified
    let docs = categories.docs
    if (limit) {
      const limitNum = parseInt(limit, 10)
      docs = docs.slice(0, limitNum)
    }

    // Apply sorting if specified
    if (sort === 'order') {
      docs = docs.sort((a, b) => (a.order || 0) - (b.order || 0))
    }

    return NextResponse.json({
      docs,
      totalDocs: docs.length,
      totalPages: 1,
      page: 1,
      hasNextPage: false,
      hasPrevPage: false,
    })
  } catch (error) {
    console.error('Categories API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
