'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface BreadcrumbItem {
  label: string
  href: string
  isCurrent?: boolean
}

interface SEOBreadcrumbsProps {
  items?: BreadcrumbItem[]
  showHome?: boolean
  className?: string
}

export const SEOBreadcrumbs: React.FC<SEOBreadcrumbsProps> = ({
  items,
  showHome = true,
  className = '',
}) => {
  const pathname = usePathname()

  // Generate breadcrumbs from pathname if not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = pathname.split('/').filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = []

    if (showHome) {
      breadcrumbs.push({
        label: 'Home',
        href: '/',
      })
    }

    let currentPath = ''
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const isLast = index === pathSegments.length - 1

      // Convert segment to readable label
      const label = segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

      breadcrumbs.push({
        label,
        href: currentPath,
        isCurrent: isLast,
      })
    })

    return breadcrumbs
  }

  const breadcrumbItems = items || generateBreadcrumbs()

  // Generate structured data for breadcrumbs
  const generateStructuredData = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://whitetradingcompany.com'}${item.href}`,
      })),
    }
  }

  if (breadcrumbItems.length <= 1) {
    return null
  }

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData()),
        }}
      />

      {/* Visual Breadcrumbs */}
      <nav
        className={`flex items-center space-x-2 text-sm text-gray-600 ${className}`}
        aria-label="Breadcrumb navigation"
      >
        <ol className="flex items-center space-x-2" role="list">
          {breadcrumbItems.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                <svg
                  className="w-4 h-4 mx-2 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}

              {item.isCurrent ? (
                <span className="text-gray-900 font-medium" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}

export default SEOBreadcrumbs
