/**
 * SEO Analytics and Monitoring Utilities
 * Provides comprehensive SEO tracking and analytics for WhiteTrade
 */

export interface SEOAnalyticsData {
  pageUrl: string
  pageTitle: string
  metaDescription: string
  h1Count: number
  h2Count: number
  h3Count: number
  imageCount: number
  imageAltCount: number
  linkCount: number
  internalLinkCount: number
  externalLinkCount: number
  structuredDataCount: number
  loadTime?: number
  wordCount: number
  keywordDensity: Record<string, number>
  accessibilityScore: number
  mobileFriendly: boolean
  timestamp: Date
}

export interface SEOReport {
  score: number
  issues: string[]
  recommendations: string[]
  data: SEOAnalyticsData
}

/**
 * Analyze page content for SEO metrics
 */
export const analyzePageSEO = (): SEOAnalyticsData => {
  const startTime = performance.now()

  // Get page elements
  const h1Elements = document.querySelectorAll('h1')
  const h2Elements = document.querySelectorAll('h2')
  const h3Elements = document.querySelectorAll('h3')
  const images = document.querySelectorAll('img')
  const links = document.querySelectorAll('a')
  const structuredData = document.querySelectorAll('script[type="application/ld+json"]')

  // Count elements
  const h1Count = h1Elements.length
  const h2Count = h2Elements.length
  const h3Count = h3Elements.length
  const imageCount = images.length
  const linkCount = links.length
  const structuredDataCount = structuredData.length

  // Analyze images
  const imageAltCount = Array.from(images).filter((img) => img.alt && img.alt.trim() !== '').length

  // Analyze links
  const currentDomain = window.location.hostname
  const internalLinkCount = Array.from(links).filter((link) => {
    const href = link.getAttribute('href')
    return href && (href.startsWith('/') || href.includes(currentDomain))
  }).length
  const externalLinkCount = linkCount - internalLinkCount

  // Count words
  const textContent = document.body.textContent || ''
  const wordCount = textContent.trim().split(/\s+/).length

  // Analyze keyword density
  const keywordDensity = analyzeKeywordDensity(textContent)

  // Calculate accessibility score
  const accessibilityScore = calculateAccessibilityScore({
    h1Count,
    h2Count,
    h3Count,
    imageCount,
    imageAltCount,
    linkCount,
  })

  // Check mobile friendliness
  const mobileFriendly = window.innerWidth <= 768

  const loadTime = performance.now() - startTime

  return {
    pageUrl: window.location.href,
    pageTitle: document.title,
    metaDescription:
      document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
    h1Count,
    h2Count,
    h3Count,
    imageCount,
    imageAltCount,
    linkCount,
    internalLinkCount,
    externalLinkCount,
    structuredDataCount,
    loadTime,
    wordCount,
    keywordDensity,
    accessibilityScore,
    mobileFriendly,
    timestamp: new Date(),
  }
}

/**
 * Analyze keyword density in text content
 */
const analyzeKeywordDensity = (text: string): Record<string, number> => {
  const keywords = [
    'white trading company',
    'whitetradingcompany',
    'safety products',
    'fruits vegetables',
    'grains rice',
    'food products',
    'textile products',
    'coimbatore',
    'safety gear',
    'basmati rice',
    'cotton materials',
    'fashion wear',
    'bedcovers',
    'safety harness',
    'safety gloves',
    'safety goggles',
    'hardware tools',
    'toppy noodles',
    'ghee',
    'sweetcorn',
    'safety jackets',
    'safety helmets',
    'safety shoes',
  ]

  const wordCount = text.toLowerCase().split(/\s+/).length
  const density: Record<string, number> = {}

  keywords.forEach((keyword) => {
    const regex = new RegExp(keyword.toLowerCase(), 'g')
    const matches = text.toLowerCase().match(regex)
    const count = matches ? matches.length : 0
    density[keyword] = wordCount > 0 ? (count / wordCount) * 100 : 0
  })

  return density
}

/**
 * Calculate accessibility score based on SEO best practices
 */
const calculateAccessibilityScore = (data: {
  h1Count: number
  h2Count: number
  h3Count: number
  imageCount: number
  imageAltCount: number
  linkCount: number
}): number => {
  let score = 100

  if (data.h1Count > 1) {
    score -= (data.h1Count - 1) * 10
  }

  // Penalize missing H1
  if (data.h1Count === 0) {
    score -= 20
  }

  // Penalize missing alt text
  if (data.imageCount > 0) {
    const altTextPercentage = (data.imageAltCount / data.imageCount) * 100
    score -= (100 - altTextPercentage) * 0.5
  }

  // Bonus for good heading structure
  if (data.h2Count > 0 && data.h3Count > 0) {
    score += 5
  }

  return Math.max(0, Math.min(100, score))
}

/**
 * Generate SEO report with recommendations
 */
export const generateSEOReport = (data: SEOAnalyticsData): SEOReport => {
  const issues: string[] = []
  const recommendations: string[] = []
  const score = data.accessibilityScore

  // Check for issues
  if (data.h1Count === 0) {
    issues.push('Missing H1 heading')
    recommendations.push('Add a single H1 heading to the page')
  } else if (data.h1Count > 1) {
    issues.push(`Multiple H1 headings found (${data.h1Count})`)
    recommendations.push('Use only one H1 heading per page')
  }

  if (data.imageCount > 0 && data.imageAltCount < data.imageCount) {
    const missingAlt = data.imageCount - data.imageAltCount
    issues.push(`${missingAlt} images missing alt text`)
    recommendations.push('Add descriptive alt text to all images')
  }

  if (data.metaDescription.length < 120) {
    issues.push('Meta description too short')
    recommendations.push('Write a meta description between 120-160 characters')
  } else if (data.metaDescription.length > 160) {
    issues.push('Meta description too long')
    recommendations.push('Keep meta description under 160 characters')
  }

  if (data.pageTitle.length < 30) {
    issues.push('Page title too short')
    recommendations.push('Write a page title between 30-60 characters')
  } else if (data.pageTitle.length > 60) {
    issues.push('Page title too long')
    recommendations.push('Keep page title under 60 characters')
  }

  if (data.wordCount < 300) {
    issues.push('Page content too short')
    recommendations.push('Add more relevant content to improve SEO')
  }

  if (data.structuredDataCount === 0) {
    issues.push('No structured data found')
    recommendations.push('Add JSON-LD structured data to improve search results')
  }

  // Performance recommendations
  if (data.loadTime && data.loadTime > 3000) {
    issues.push('Page load time is slow')
    recommendations.push('Optimize images and reduce JavaScript bundle size')
  }

  // Positive recommendations
  if (data.internalLinkCount > 5) {
    recommendations.push('Good internal linking structure')
  }

  if (data.h2Count > 2 && data.h3Count > 2) {
    recommendations.push('Good heading hierarchy')
  }

  return {
    score,
    issues,
    recommendations,
    data,
  }
}

/**
 * Track SEO metrics and send to analytics
 */
export const trackSEOMetrics = async (data: SEOAnalyticsData): Promise<void> => {
  try {
    // Send to Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'seo_analysis', {
        page_title: data.pageTitle,
        h1_count: data.h1Count,
        h2_count: data.h2Count,
        h3_count: data.h3Count,
        image_count: data.imageCount,
        image_alt_count: data.imageAltCount,
        link_count: data.linkCount,
        internal_link_count: data.internalLinkCount,
        external_link_count: data.externalLinkCount,
        structured_data_count: data.structuredDataCount,
        word_count: data.wordCount,
        accessibility_score: data.accessibilityScore,
        mobile_friendly: data.mobileFriendly,
        load_time: data.loadTime,
      })
    }

    // Send to custom analytics endpoint
    await fetch('/api/seo-analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  } catch (error) {
    console.warn('Failed to track SEO metrics:', error)
  }
}

/**
 * Monitor Core Web Vitals (simplified version)
 */
export const monitorCoreWebVitals = (): void => {
  if (typeof window !== 'undefined') {
    // Basic performance monitoring without web-vitals dependency
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log(`${entry.name}: ${entry.startTime}ms`)
      }
    })

    try {
      observer.observe({ entryTypes: ['navigation', 'resource'] })
    } catch (error) {
      console.warn('Performance monitoring not supported')
    }
  }
}

/**
 * Check for SEO issues in real-time
 */
export const checkSEOIssues = (): string[] => {
  const issues: string[] = []

  // Check meta tags
  const metaDescription = document.querySelector('meta[name="description"]')
  if (!metaDescription) {
    issues.push('Missing meta description')
  }

  const metaKeywords = document.querySelector('meta[name="keywords"]')
  if (metaKeywords) {
    issues.push('Meta keywords tag is deprecated and should be removed')
  }

  // Check canonical URL
  const canonical = document.querySelector('link[rel="canonical"]')
  if (!canonical) {
    issues.push('Missing canonical URL')
  }

  // Check Open Graph tags
  const ogTitle = document.querySelector('meta[property="og:title"]')
  if (!ogTitle) {
    issues.push('Missing Open Graph title')
  }

  const ogDescription = document.querySelector('meta[property="og:description"]')
  if (!ogDescription) {
    issues.push('Missing Open Graph description')
  }

  const ogImage = document.querySelector('meta[property="og:image"]')
  if (!ogImage) {
    issues.push('Missing Open Graph image')
  }

  // Check Twitter Card tags
  const twitterCard = document.querySelector('meta[name="twitter:card"]')
  if (!twitterCard) {
    issues.push('Missing Twitter Card type')
  }

  return issues
}

/**
 * Initialize SEO monitoring
 */
export const initializeSEOMonitoring = (): void => {
  // Monitor Core Web Vitals
  monitorCoreWebVitals()

  // Analyze page on load
  window.addEventListener('load', () => {
    setTimeout(() => {
      const data = analyzePageSEO()
      const report = generateSEOReport(data)

      // Log report in development
      if (process.env.NODE_ENV === 'development') {
        console.log('SEO Report:', report)
      }

      // Track metrics
      trackSEOMetrics(data)

      // Check for issues
      const issues = checkSEOIssues()
      if (issues.length > 0) {
        console.warn('SEO Issues found:', issues)
      }
    }, 1000)
  })
}

export default {
  analyzePageSEO,
  generateSEOReport,
  trackSEOMetrics,
  monitorCoreWebVitals,
  checkSEOIssues,
  initializeSEOMonitoring,
}
