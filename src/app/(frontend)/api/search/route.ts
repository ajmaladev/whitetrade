import { getPayloadClient } from '@/lib/payload'
import type { PipelineStage } from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'

async function getSearchWithAggregation(searchTerm: string) {
  const payload = await getPayloadClient()

  try {
    // Single aggregation pipeline that handles everything
    const searchPipeline: PipelineStage[] = [
      {
        $facet: {
          // Search categories
          categories: [
            {
              $match: {
                $or: [
                  { title: { $regex: searchTerm, $options: 'i' } },
                  { slug: { $regex: searchTerm, $options: 'i' } },
                ],
              },
            },
            {
              $lookup: {
                from: 'products',
                localField: '_id',
                foreignField: 'category.value',
                as: 'products',
                pipeline: [
                  {
                    $project: {
                      _id: 1,
                      id: '$_id',
                      title: 1,
                      description: 1,
                      product_image: 1,
                      category: 1,
                      updatedAt: 1,
                      createdAt: 1,
                    },
                  },
                  { $limit: 5 },
                ],
              },
            },
            {
              $project: {
                _id: 1,
                id: '$_id',
                title: 1,
                slug: 1,
                category_image: 1,
                category_image_mobile: 1,
                parent: 1,
                breadcrumbs: 1,
                updatedAt: 1,
                createdAt: 1,
                productCount: { $size: '$products' },
                products: 1,
              },
            },
            { $limit: 5 },
          ],
          // Counts
          categoryCount: [
            {
              $match: {
                $or: [
                  { title: { $regex: searchTerm, $options: 'i' } },
                  { slug: { $regex: searchTerm, $options: 'i' } },
                ],
              },
            },
            { $count: 'total' },
          ],
        },
      },
      {
        $addFields: {
          totalCategories: { $ifNull: [{ $arrayElemAt: ['$categoryCount.total', 0] }, 0] },
        },
      },
    ]

    // Execute single aggregation
    const result = await payload.db?.collections.categories?.aggregate(searchPipeline)
    const response = result?.[0]

    if (!response) {
      return {
        categories: [],
        products: [],
        totalCategories: 0,
        totalProducts: 0,
      }
    }

    const hasCategories = response.categories && response.categories.length > 0

    if (hasCategories) {
      // If categories found, return categories with their products
      return {
        categories: response.categories,
        products: [],
        totalCategories: response.totalCategories,
        totalProducts: 0,
      }
    } else {
      // If no categories found, search products in a separate call
      const productsPipeline: PipelineStage[] = [
        {
          $match: {
            $or: [
              { title: { $regex: searchTerm, $options: 'i' } },
              { description: { $regex: searchTerm, $options: 'i' } },
            ],
          },
        },
        {
          $lookup: {
            from: 'categories',
            let: { categoryIds: '$category.value' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ['$_id', '$$categoryIds'],
                  },
                },
              },
              {
                $addFields: {
                  index: {
                    $indexOfArray: ['$$categoryIds', '$_id'],
                  },
                },
              },
              { $sort: { index: 1 } },
              { $project: { _id: 1, title: 1, slug: 1 } },
            ],
            as: 'categoryDetails',
          },
        },
        {
          $addFields: {
            categorySlug: { $arrayElemAt: ['$categoryDetails.slug', 0] },
            categoryTitle: { $arrayElemAt: ['$categoryDetails.title', 0] },
          },
        },
        {
          $project: {
            _id: 1,
            id: '$_id',
            title: 1,
            description: 1,
            product_image: 1,
            category: 1,
            categorySlug: 1,
            categoryTitle: 1,
            updatedAt: 1,
            createdAt: 1,
          },
        },
        { $limit: 10 },
      ]

      const productsResult = await payload.db?.collections.products?.aggregate(productsPipeline)
      const productsCount = await payload.db?.collections.products?.countDocuments({
        $or: [
          { title: { $regex: searchTerm, $options: 'i' } },
          { description: { $regex: searchTerm, $options: 'i' } },
        ],
      })

      return {
        categories: [],
        products: productsResult || [],
        totalCategories: 0,
        totalProducts: productsCount || 0,
      }
    }
  } catch (error) {
    console.error('Search aggregation error:', error)
    throw new Error('An error occurred during the search aggregation process.')
  }
}

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

    const searchTerm = query.trim()

    // Use the optimized approach
    const response = await getSearchWithAggregation(searchTerm)

    return NextResponse.json(response)
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
