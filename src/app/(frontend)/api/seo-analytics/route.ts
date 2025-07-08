import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate the data structure
    if (!data.pageUrl || !data.pageTitle) {
      return NextResponse.json({ error: 'Invalid SEO analytics data' }, { status: 400 })
    }

    // For now, we'll just return success
    return NextResponse.json(
      {
        success: true,
        message: 'SEO analytics data received',
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error processing SEO analytics:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  // Return basic analytics summary (for demonstration)
  return NextResponse.json({
    message: 'SEO Analytics API is running',
    endpoints: {
      POST: '/api/seo-analytics - Submit SEO analytics data',
      GET: '/api/seo-analytics - Get API status',
    },
    timestamp: new Date().toISOString(),
  })
}
