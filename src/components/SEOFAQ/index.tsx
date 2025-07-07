'use client'
import React, { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
  id: string
}

interface SEOFAQProps {
  items: FAQItem[]
  title?: string
  className?: string
}

export const SEOFAQ: React.FC<SEOFAQProps> = ({
  items,
  title = 'Frequently Asked Questions',
  className = '',
}) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  // Generate structured data for FAQ
  const generateStructuredData = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    }
  }

  if (!items || items.length === 0) {
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

      {/* Visual FAQ */}
      <section className={`max-w-4xl mx-auto ${className}`} aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-3xl font-bold text-gray-900 mb-8 text-center">
          {title}
        </h2>

        <div className="space-y-4">
          {items.map((item) => {
            const isOpen = openItems.has(item.id)

            return (
              <article
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-colors duration-200"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">{item.question}</h3>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div
                  id={`faq-answer-${item.id}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                  aria-hidden={!isOpen}
                >
                  <div className="px-6 pb-4">
                    <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </>
  )
}

// Predefined FAQ items for White Trading Company
export const whiteTradingCompanyFAQItems: FAQItem[] = [
  {
    id: 'services',
    question: 'What products does White Trading Company supply?',
    answer:
      'White Trading Company supplies a comprehensive range of products including safety products (helmets, jackets, shoes, harness, goggles, gloves), fruits & vegetables, grains & rice (Basmati rice, Black Pepper, Green Gram, Moong Dhall, Sona Masoori, Urud Dall), food products (Toppy Instant Noodles, Ghee, American Sweetcorn), and textile products (cotton materials, fashion wear, bedcovers).',
  },
  {
    id: 'experience',
    question: 'How long has White Trading Company been in business?',
    answer:
      'White Trading Company was incorporated in 2011 and has been serving customers in Coimbatore and beyond for over a decade. We have established ourselves as a trusted supplier with a focus on quality and international standards.',
  },
  {
    id: 'quality',
    question: 'How do you ensure product quality?',
    answer:
      'We adhere to international standards in all our products. Our quality control processes include regular inspections, supplier audits, and compliance with industry standards. We work with certified suppliers and maintain strict quality protocols for safety products, food items, and textile materials.',
  },
  {
    id: 'location',
    question: 'Where is White Trading Company located?',
    answer:
      'White Trading Company is located at #45/2a-1, Sungam Bye Pass Road, Coimbatore - 641045, Tamil Nadu, India. We serve the Coimbatore region and surrounding areas with our comprehensive product range.',
  },
  {
    id: 'safety-products',
    question: 'What safety products do you offer?',
    answer:
      'We offer a complete range of safety products including safety jackets, harness, radium jackets, helmets, goggles, safety shoes, safety gloves, coverall, gumboot, and hardware tools. All our safety products meet international safety standards.',
  },
  {
    id: 'contact',
    question: 'How can I contact White Trading Company?',
    answer:
      'You can contact us at +91-422-2321811 or +91-98430-44443, or email us at info@whitetradingcompany.com. Our team is available to discuss your product requirements and provide personalized solutions.',
  },
]

export default SEOFAQ
