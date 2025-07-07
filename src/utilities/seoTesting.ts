/**
 * SEO Testing Utilities
 * Provides comprehensive testing and validation for SEO implementations
 */

export interface SEOTestResult {
  test: string
  passed: boolean
  score: number
  details: string
  recommendations: string[]
}

export interface SEOTestSuite {
  title: string
  tests: SEOTestResult[]
  overallScore: number
  passed: number
  failed: number
  total: number
}

/**
 * Run comprehensive SEO tests
 */
export const runSEOTests = async (): Promise<SEOTestSuite> => {
  const tests: SEOTestResult[] = []

  // Meta tags tests
  tests.push(...(await testMetaTags()))

  // Structured data tests
  tests.push(...(await testStructuredData()))

  // Performance tests
  tests.push(...(await testPerformance()))

  // Accessibility tests
  tests.push(...(await testAccessibility()))

  // Content tests
  tests.push(...(await testContent()))

  // Technical SEO tests
  tests.push(...(await testTechnicalSEO()))

  // Calculate overall results
  const passed = tests.filter((test) => test.passed).length
  const failed = tests.filter((test) => !test.passed).length
  const overallScore = tests.reduce((sum, test) => sum + test.score, 0) / tests.length

  return {
    title: 'WhiteTrade SEO Test Suite',
    tests,
    overallScore: Math.round(overallScore),
    passed,
    failed,
    total: tests.length,
  }
}

/**
 * Test meta tags implementation
 */
const testMetaTags = async (): Promise<SEOTestResult[]> => {
  const tests: SEOTestResult[] = []

  // Test title tag
  const title = document.title
  tests.push({
    test: 'Page Title',
    passed: title.length >= 30 && title.length <= 60,
    score: title.length >= 30 && title.length <= 60 ? 100 : 50,
    details: `Title length: ${title.length} characters`,
    recommendations:
      title.length < 30
        ? ['Make title more descriptive and longer']
        : title.length > 60
          ? ['Shorten title to under 60 characters']
          : ['Title is well optimized'],
  })

  // Test meta description
  const metaDescription =
    document.querySelector('meta[name="description"]')?.getAttribute('content') || ''
  tests.push({
    test: 'Meta Description',
    passed: metaDescription.length >= 120 && metaDescription.length <= 160,
    score: metaDescription.length >= 120 && metaDescription.length <= 160 ? 100 : 50,
    details: `Description length: ${metaDescription.length} characters`,
    recommendations:
      metaDescription.length < 120
        ? ['Add more descriptive meta description']
        : metaDescription.length > 160
          ? ['Shorten meta description to under 160 characters']
          : ['Meta description is well optimized'],
  })

  // Test canonical URL
  const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href')
  tests.push({
    test: 'Canonical URL',
    passed: !!canonical,
    score: canonical ? 100 : 0,
    details: canonical ? `Canonical URL: ${canonical}` : 'No canonical URL found',
    recommendations: canonical
      ? ['Canonical URL is properly set']
      : ['Add canonical URL to prevent duplicate content'],
  })

  // Test Open Graph tags
  const ogTitle = document.querySelector('meta[property="og:title"]')
  const ogDescription = document.querySelector('meta[property="og:description"]')
  const ogImage = document.querySelector('meta[property="og:image"]')

  tests.push({
    test: 'Open Graph Tags',
    passed: !!(ogTitle && ogDescription && ogImage),
    score: [ogTitle, ogDescription, ogImage].filter(Boolean).length * 33,
    details: `OG Title: ${!!ogTitle}, OG Description: ${!!ogDescription}, OG Image: ${!!ogImage}`,
    recommendations: !ogTitle ? ['Add Open Graph title'] : [],
  })

  return tests
}

/**
 * Test structured data implementation
 */
const testStructuredData = async (): Promise<SEOTestResult[]> => {
  const tests: SEOTestResult[] = []

  // Test JSON-LD structured data
  const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]')
  tests.push({
    test: 'Structured Data (JSON-LD)',
    passed: jsonLdScripts.length > 0,
    score: Math.min(jsonLdScripts.length * 20, 100),
    details: `${jsonLdScripts.length} JSON-LD scripts found`,
    recommendations:
      jsonLdScripts.length === 0
        ? ['Add JSON-LD structured data for better search results']
        : ['Good structured data implementation'],
  })

  // Test specific schema types
  const schemaTypes = new Set<string>()
  jsonLdScripts.forEach((script) => {
    try {
      const data = JSON.parse(script.textContent || '{}')
      if (data['@type']) {
        schemaTypes.add(data['@type'])
      }
    } catch (error) {
      // Invalid JSON
      console.error('Invalid JSON in structured data:', error)
    }
  })

  tests.push({
    test: 'Schema Types',
    passed: schemaTypes.size >= 2,
    score: Math.min(schemaTypes.size * 25, 100),
    details: `Schema types found: ${Array.from(schemaTypes).join(', ')}`,
    recommendations:
      schemaTypes.size < 2
        ? ['Add more schema types (Organization, Product, etc.)']
        : ['Good variety of schema types'],
  })

  return tests
}

/**
 * Test performance metrics
 */
const testPerformance = async (): Promise<SEOTestResult[]> => {
  const tests: SEOTestResult[] = []

  // Test page load time
  const loadTime = performance.now()
  tests.push({
    test: 'Page Load Time',
    passed: loadTime < 3000,
    score: Math.max(100 - loadTime / 100, 0),
    details: `Load time: ${loadTime.toFixed(0)}ms`,
    recommendations:
      loadTime > 3000
        ? ['Optimize images, reduce JavaScript bundle size']
        : ['Good page load performance'],
  })

  // Test image optimization
  const images = document.querySelectorAll('img')
  const optimizedImages = Array.from(images).filter((img) => {
    const src = img.getAttribute('src') || ''
    return src.includes('next/image') || src.includes('optimized')
  })

  tests.push({
    test: 'Image Optimization',
    passed: optimizedImages.length === images.length,
    score: images.length > 0 ? (optimizedImages.length / images.length) * 100 : 100,
    details: `${optimizedImages.length}/${images.length} images optimized`,
    recommendations:
      optimizedImages.length < images.length
        ? ['Use Next.js Image component for all images']
        : ['All images are properly optimized'],
  })

  return tests
}

/**
 * Test accessibility features
 */
const testAccessibility = async (): Promise<SEOTestResult[]> => {
  const tests: SEOTestResult[] = []

  // Test heading structure
  const h1Elements = document.querySelectorAll('h1')
  const h2Elements = document.querySelectorAll('h2')
  const h3Elements = document.querySelectorAll('h3')

  tests.push({
    test: 'Heading Structure',
    passed: h1Elements.length === 1 && h2Elements.length > 0,
    score: h1Elements.length === 1 ? 50 + (h2Elements.length > 0 ? 50 : 0) : 0,
    details: `H1: ${h1Elements.length}, H2: ${h2Elements.length}, H3: ${h3Elements.length}`,
    recommendations:
      h1Elements.length === 0
        ? ['Add a single H1 heading']
        : h1Elements.length > 1
          ? ['Use only one H1 heading per page']
          : ['Good heading structure'],
  })

  // Test image alt text
  const images = document.querySelectorAll('img')
  const imagesWithAlt = Array.from(images).filter((img) => img.alt && img.alt.trim() !== '')

  tests.push({
    test: 'Image Alt Text',
    passed: imagesWithAlt.length === images.length,
    score: images.length > 0 ? (imagesWithAlt.length / images.length) * 100 : 100,
    details: `${imagesWithAlt.length}/${images.length} images have alt text`,
    recommendations:
      imagesWithAlt.length < images.length
        ? ['Add descriptive alt text to all images']
        : ['All images have proper alt text'],
  })

  // Test ARIA labels
  const elementsWithAria = document.querySelectorAll(
    '[aria-label], [aria-labelledby], [aria-describedby]',
  )
  tests.push({
    test: 'ARIA Labels',
    passed: elementsWithAria.length > 0,
    score: Math.min(elementsWithAria.length * 10, 100),
    details: `${elementsWithAria.length} elements with ARIA labels`,
    recommendations:
      elementsWithAria.length === 0
        ? ['Add ARIA labels for better accessibility']
        : ['Good use of ARIA labels'],
  })

  return tests
}

/**
 * Test content quality
 */
const testContent = async (): Promise<SEOTestResult[]> => {
  const tests: SEOTestResult[] = []

  // Test word count
  const textContent = document.body.textContent || ''
  const wordCount = textContent.trim().split(/\s+/).length

  tests.push({
    test: 'Content Length',
    passed: wordCount >= 300,
    score: Math.min(wordCount / 3, 100),
    details: `${wordCount} words`,
    recommendations:
      wordCount < 300 ? ['Add more relevant content to improve SEO'] : ['Good content length'],
  })

  // Test internal links
  const links = document.querySelectorAll('a')
  const internalLinks = Array.from(links).filter((link) => {
    const href = link.getAttribute('href') || ''
    return href.startsWith('/') || href.includes(window.location.hostname)
  })

  tests.push({
    test: 'Internal Links',
    passed: internalLinks.length >= 5,
    score: Math.min(internalLinks.length * 10, 100),
    details: `${internalLinks.length} internal links`,
    recommendations:
      internalLinks.length < 5
        ? ['Add more internal links for better site structure']
        : ['Good internal linking'],
  })

  return tests
}

/**
 * Test technical SEO elements
 */
const testTechnicalSEO = async (): Promise<SEOTestResult[]> => {
  const tests: SEOTestResult[] = []

  // Test robots.txt
  try {
    const robotsResponse = await fetch('/robots.txt')
    tests.push({
      test: 'Robots.txt',
      passed: robotsResponse.ok,
      score: robotsResponse.ok ? 100 : 0,
      details: robotsResponse.ok ? 'Robots.txt is accessible' : 'Robots.txt not found',
      recommendations: robotsResponse.ok
        ? ['Robots.txt is properly configured']
        : ['Create robots.txt file'],
    })
  } catch (error) {
    console.error('Error fetching robots.txt:', error)
    tests.push({
      test: 'Robots.txt',
      passed: false,
      score: 0,
      details: 'Robots.txt not accessible',
      recommendations: ['Create robots.txt file'],
    })
  }

  // Test sitemap
  try {
    const sitemapResponse = await fetch('/sitemap.xml')
    tests.push({
      test: 'XML Sitemap',
      passed: sitemapResponse.ok,
      score: sitemapResponse.ok ? 100 : 0,
      details: sitemapResponse.ok ? 'Sitemap is accessible' : 'Sitemap not found',
      recommendations: sitemapResponse.ok
        ? ['Sitemap is properly configured']
        : ['Create XML sitemap'],
    })
  } catch (error) {
    console.error('Error fetching sitemap:', error)
    tests.push({
      test: 'XML Sitemap',
      passed: false,
      score: 0,
      details: 'Sitemap not accessible',
      recommendations: ['Create XML sitemap'],
    })
  }

  // Test HTTPS
  tests.push({
    test: 'HTTPS',
    passed: window.location.protocol === 'https:',
    score: window.location.protocol === 'https:' ? 100 : 0,
    details: `Protocol: ${window.location.protocol}`,
    recommendations:
      window.location.protocol === 'https:'
        ? ['HTTPS is properly configured']
        : ['Enable HTTPS for better security and SEO'],
  })

  return tests
}

/**
 * Generate detailed SEO report
 */
export const generateDetailedSEOReport = async (): Promise<string> => {
  const testSuite = await runSEOTests()

  let report = `# SEO Test Report\n\n`
  report += `**Overall Score: ${testSuite.overallScore}/100**\n`
  report += `**Tests Passed: ${testSuite.passed}/${testSuite.total}**\n\n`

  // Group tests by category
  const categories = {
    'Meta Tags': testSuite.tests.filter(
      (t) =>
        t.test.includes('Title') ||
        t.test.includes('Description') ||
        t.test.includes('Canonical') ||
        t.test.includes('Open Graph'),
    ),
    'Structured Data': testSuite.tests.filter(
      (t) => t.test.includes('Structured') || t.test.includes('Schema'),
    ),
    Performance: testSuite.tests.filter((t) => t.test.includes('Load') || t.test.includes('Image')),
    Accessibility: testSuite.tests.filter(
      (t) => t.test.includes('Heading') || t.test.includes('Alt') || t.test.includes('ARIA'),
    ),
    Content: testSuite.tests.filter((t) => t.test.includes('Content') || t.test.includes('Links')),
    Technical: testSuite.tests.filter(
      (t) => t.test.includes('Robots') || t.test.includes('Sitemap') || t.test.includes('HTTPS'),
    ),
  }

  Object.entries(categories).forEach(([category, tests]) => {
    if (tests.length > 0) {
      report += `## ${category}\n\n`
      tests.forEach((test) => {
        const status = test.passed ? '✅' : '❌'
        report += `### ${status} ${test.test}\n`
        report += `- **Score:** ${test.score}/100\n`
        report += `- **Details:** ${test.details}\n`
        if (test.recommendations.length > 0) {
          report += `- **Recommendations:**\n`
          test.recommendations.forEach((rec) => {
            report += `  - ${rec}\n`
          })
        }
        report += `\n`
      })
    }
  })

  return report
}

export default {
  runSEOTests,
  generateDetailedSEOReport,
}
