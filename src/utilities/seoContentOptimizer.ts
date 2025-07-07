/**
 * SEO Content Optimization Utilities
 * Provides tools for optimizing content for better search engine rankings
 */

export interface ContentAnalysis {
  wordCount: number
  keywordDensity: Record<string, number>
  readabilityScore: number
  keywordSuggestions: string[]
  contentGaps: string[]
  optimizationScore: number
  recommendations: string[]
}

export interface KeywordData {
  keyword: string
  density: number
  position: number[]
  context: string[]
}

export interface SEOContentOptimizerOptions {
  targetKeywords: string[]
  minWordCount?: number
  maxKeywordDensity?: number
  readabilityTarget?: number
}

/**
 * Analyze content for SEO optimization
 */
export const analyzeContent = (
  content: string,
  options: SEOContentOptimizerOptions,
): ContentAnalysis => {
  const words = content
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 0)
  const wordCount = words.length

  // Analyze keyword density
  const keywordDensity = analyzeKeywordDensity(content, options.targetKeywords)

  // Calculate readability score (Flesch Reading Ease)
  const readabilityScore = calculateReadability(content)

  // Generate keyword suggestions
  const keywordSuggestions = generateKeywordSuggestions(content, options.targetKeywords)

  // Identify content gaps
  const contentGaps = identifyContentGaps(content, options.targetKeywords)

  // Calculate optimization score
  const optimizationScore = calculateOptimizationScore({
    wordCount,
    keywordDensity,
    readabilityScore,
    contentGaps,
    options,
  })

  // Generate recommendations
  const recommendations = generateRecommendations({
    wordCount,
    keywordDensity,
    readabilityScore,
    contentGaps,
    optimizationScore,
    options,
  })

  return {
    wordCount,
    keywordDensity,
    readabilityScore,
    keywordSuggestions,
    contentGaps,
    optimizationScore,
    recommendations,
  }
}

/**
 * Analyze keyword density in content
 */
const analyzeKeywordDensity = (
  content: string,
  targetKeywords: string[],
): Record<string, number> => {
  const words = content
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 0)
  const totalWords = words.length
  const density: Record<string, number> = {}

  targetKeywords.forEach((keyword) => {
    const keywordWords = keyword.toLowerCase().split(/\s+/)
    const regex = new RegExp(keywordWords.join('\\s+'), 'g')
    const matches = content.toLowerCase().match(regex)
    const count = matches ? matches.length : 0
    density[keyword] = totalWords > 0 ? (count / totalWords) * 100 : 0
  })

  return density
}

/**
 * Calculate Flesch Reading Ease score
 */
const calculateReadability = (content: string): number => {
  const sentences = content.split(/[.!?]+/).filter((s) => s.trim().length > 0)
  const words = content.split(/\s+/).filter((w) => w.length > 0)
  const syllables = countSyllables(content)

  if (sentences.length === 0 || words.length === 0) return 0

  const avgSentenceLength = words.length / sentences.length
  const avgSyllablesPerWord = syllables / words.length

  // Flesch Reading Ease formula
  const score = 206.835 - 1.015 * avgSentenceLength - 84.6 * avgSyllablesPerWord

  return Math.max(0, Math.min(100, score))
}

/**
 * Count syllables in text (simplified version)
 */
const countSyllables = (text: string): number => {
  const words = text.toLowerCase().split(/\s+/)
  let syllableCount = 0

  words.forEach((word) => {
    // Remove common suffixes
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
    word = word.replace(/^y/, '')

    // Count vowel groups
    const matches = word.match(/[aeiouy]{1,2}/g)
    syllableCount += matches ? matches.length : 1
  })

  return syllableCount
}

/**
 * Generate keyword suggestions based on content
 */
const generateKeywordSuggestions = (content: string, targetKeywords: string[]): string[] => {
  const suggestions: string[] = []
  const words = content.toLowerCase().split(/\s+/)

  // Find related terms
  const relatedTerms = [
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
    'quality',
    'certified',
    'professional',
    'reliable',
    'trusted',
    'delivery',
    'packaging',
    'customs',
    'documentation',
    'inspection',
  ]

  // Check which related terms are missing
  relatedTerms.forEach((term) => {
    if (!targetKeywords.includes(term) && !content.toLowerCase().includes(term)) {
      suggestions.push(term)
    }
  })

  return suggestions.slice(0, 5) // Return top 5 suggestions
}

/**
 * Identify content gaps
 */
const identifyContentGaps = (content: string, targetKeywords: string[]): string[] => {
  const gaps: string[] = []

  // Check for missing target keywords
  targetKeywords.forEach((keyword) => {
    if (!content.toLowerCase().includes(keyword.toLowerCase())) {
      gaps.push(`Missing target keyword: "${keyword}"`)
    }
  })

  // Check for common content gaps
  const commonGaps = [
    { check: !content.includes('?'), message: 'No questions addressed' },
    { check: !content.includes('benefit'), message: 'No benefits mentioned' },
    { check: !content.includes('quality'), message: 'No quality claims' },
    { check: !content.includes('certified'), message: 'No certifications mentioned' },
    { check: !content.includes('contact'), message: 'No contact information' },
  ]

  commonGaps.forEach((gap) => {
    if (gap.check) {
      gaps.push(gap.message)
    }
  })

  return gaps
}

/**
 * Calculate overall optimization score
 */
const calculateOptimizationScore = (data: {
  wordCount: number
  keywordDensity: Record<string, number>
  readabilityScore: number
  contentGaps: string[]
  options: SEOContentOptimizerOptions
}): number => {
  let score = 100

  // Word count scoring
  const minWordCount = data.options.minWordCount || 300
  if (data.wordCount < minWordCount) {
    score -= ((minWordCount - data.wordCount) / minWordCount) * 20
  }

  // Keyword density scoring
  const maxDensity = data.options.maxKeywordDensity || 3
  Object.values(data.keywordDensity).forEach((density) => {
    if (density > maxDensity) {
      score -= (density - maxDensity) * 5
    } else if (density === 0) {
      score -= 10
    }
  })

  // Readability scoring
  const targetReadability = data.options.readabilityTarget || 60
  if (data.readabilityScore < targetReadability) {
    score -= ((targetReadability - data.readabilityScore) / targetReadability) * 15
  }

  // Content gaps scoring
  score -= data.contentGaps.length * 5

  return Math.max(0, Math.min(100, score))
}

/**
 * Generate optimization recommendations
 */
const generateRecommendations = (data: {
  wordCount: number
  keywordDensity: Record<string, number>
  readabilityScore: number
  contentGaps: string[]
  optimizationScore: number
  options: SEOContentOptimizerOptions
}): string[] => {
  const recommendations: string[] = []

  // Word count recommendations
  const minWordCount = data.options.minWordCount || 300
  if (data.wordCount < minWordCount) {
    recommendations.push(`Increase content length to at least ${minWordCount} words`)
  }

  // Keyword recommendations
  Object.entries(data.keywordDensity).forEach(([keyword, density]) => {
    if (density === 0) {
      recommendations.push(`Include the target keyword "${keyword}" in your content`)
    } else if (density > 3) {
      recommendations.push(
        `Reduce overuse of "${keyword}" (current density: ${density.toFixed(2)}%)`,
      )
    }
  })

  // Readability recommendations
  const targetReadability = data.options.readabilityTarget || 60
  if (data.readabilityScore < targetReadability) {
    recommendations.push('Simplify sentence structure to improve readability')
  }

  // Content gap recommendations
  data.contentGaps.forEach((gap) => {
    recommendations.push(`Address: ${gap}`)
  })

  // General recommendations
  if (data.optimizationScore < 70) {
    recommendations.push('Consider adding more specific details about your services')
    recommendations.push('Include customer testimonials or case studies')
  }

  return recommendations.slice(0, 8) // Limit to 8 recommendations
}

/**
 * Optimize content structure for SEO
 */
export const optimizeContentStructure = (content: string): string => {
  let optimized = content

  // Ensure proper heading structure
  if (!optimized.includes('<h1>') && !optimized.includes('# ')) {
    // Add a main heading if none exists
    const firstParagraph = optimized.split('\n\n')[0]
    if (firstParagraph) {
      optimized = `# ${firstParagraph}\n\n${optimized}`
    }
  }

  // Add subheadings for better structure
  const paragraphs = optimized.split('\n\n')
  if (paragraphs.length > 3) {
    const structuredParagraphs = paragraphs.map((para, index) => {
      if (index > 0 && index % 3 === 0 && para.length > 50) {
        const words = para.split(' ')
        const heading = words.slice(0, 5).join(' ')
        const rest = words.slice(5).join(' ')
        return `## ${heading}\n\n${rest}`
      }
      return para
    })
    optimized = structuredParagraphs.join('\n\n')
  }

  return optimized
}

/**
 * Generate meta description from content
 */
export const generateMetaDescription = (content: string, maxLength: number = 160): string => {
  // Remove HTML tags and extra whitespace
  const cleanContent = content
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  // Take the first sentence or truncate to max length
  const sentences = cleanContent.split(/[.!?]/)
  let description = sentences[0] || cleanContent

  // Truncate if too long
  if (description.length > maxLength) {
    description = description.substring(0, maxLength - 3) + '...'
  }

  return description
}

/**
 * Extract key phrases from content
 */
export const extractKeyPhrases = (content: string, maxPhrases: number = 5): string[] => {
  const words = content.toLowerCase().split(/\s+/)
  const phrases: Record<string, number> = {}

  // Generate 2-3 word phrases
  for (let i = 0; i < words.length - 1; i++) {
    const phrase2 = `${words[i]} ${words[i + 1]}`
    phrases[phrase2] = (phrases[phrase2] || 0) + 1

    if (i < words.length - 2) {
      const phrase3 = `${words[i]} ${words[i + 1]} ${words[i + 2]}`
      phrases[phrase3] = (phrases[phrase3] || 0) + 1
    }
  }

  // Sort by frequency and return top phrases
  return Object.entries(phrases)
    .sort(([, a], [, b]) => b - a)
    .slice(0, maxPhrases)
    .map(([phrase]) => phrase)
}

export default {
  analyzeContent,
  optimizeContentStructure,
  generateMetaDescription,
  extractKeyPhrases,
}
