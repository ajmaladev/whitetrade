import { generateDynamicSEO } from '@/components/SEO'
import type { Metadata } from 'next'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">Page Not Found</h2>
        <p className="text-gray-500 mb-8">
          The page you are looking for might have been removed, had its name changed, or is
          temporarily unavailable.
        </p>
        <a
          href="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  )
}

export const metadata: Metadata = generateDynamicSEO({
  data: null,
  type: 'page',
  title: '404 - Page Not Found',
  description:
    'The page you are looking for could not be found on White Trading Company. Please check the URL or return to our homepage.',
  noindex: true,
  keywords: [
    '404 error',
    'page not found',
    'White Trading Company',
    'trading platform',
    'financial services',
  ],
})
