'use client'
import React from 'react'

interface ContactInfo {
  name: string
  address?: {
    street: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  phone?: string
  email?: string
  website?: string
  businessHours?: {
    day: string
    hours: string
  }[]
  socialMedia?: {
    platform: string
    url: string
  }[]
}

interface SEOContactInfoProps {
  contactInfo: ContactInfo
  showMap?: boolean
  className?: string
}

export const SEOContactInfo: React.FC<SEOContactInfoProps> = ({
  contactInfo,
  showMap = false,
  className = '',
}) => {
  // Generate structured data for contact information
  const generateStructuredData = () => {
    const structuredData: any = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: contactInfo.name,
    }

    if (contactInfo.address) {
      structuredData.address = {
        '@type': 'PostalAddress',
        streetAddress: contactInfo.address.street,
        addressLocality: contactInfo.address.city,
        addressRegion: contactInfo.address.state,
        postalCode: contactInfo.address.postalCode,
        addressCountry: contactInfo.address.country,
      }
    }

    if (contactInfo.phone) {
      structuredData.telephone = contactInfo.phone
    }

    if (contactInfo.email) {
      structuredData.email = contactInfo.email
    }

    if (contactInfo.website) {
      structuredData.url = contactInfo.website
    }

    if (contactInfo.businessHours && contactInfo.businessHours.length > 0) {
      structuredData.openingHours = contactInfo.businessHours.map(
        (hours) => `${hours.day} ${hours.hours}`,
      )
    }

    if (contactInfo.socialMedia && contactInfo.socialMedia.length > 0) {
      structuredData.sameAs = contactInfo.socialMedia.map((social) => social.url)
    }

    return structuredData
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

      {/* Visual Contact Information */}
      <section className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>

        <div className="space-y-6">
          {/* Company Name */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{contactInfo.name}</h3>
          </div>

          {/* Address */}
          {contactInfo.address && (
            <div className="flex items-start space-x-3">
              <svg
                className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <address className="text-gray-700 not-italic">
                <div>{contactInfo.address.street}</div>
                <div>
                  {contactInfo.address.city}, {contactInfo.address.state}{' '}
                  {contactInfo.address.postalCode}
                </div>
                <div>{contactInfo.address.country}</div>
              </address>
            </div>
          )}

          {/* Phone */}
          {contactInfo.phone && (
            <div className="flex items-center space-x-3">
              <svg
                className="w-5 h-5 text-gray-500 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <a
                href={`tel:${contactInfo.phone}`}
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                {contactInfo.phone}
              </a>
            </div>
          )}

          {/* Email */}
          {contactInfo.email && (
            <div className="flex items-center space-x-3">
              <svg
                className="w-5 h-5 text-gray-500 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                {contactInfo.email}
              </a>
            </div>
          )}

          {/* Website */}
          {contactInfo.website && (
            <div className="flex items-center space-x-3">
              <svg
                className="w-5 h-5 text-gray-500 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0-9c-5 0-9 4-9 9"
                />
              </svg>
              <a
                href={contactInfo.website}
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Website
              </a>
            </div>
          )}

          {/* Business Hours */}
          {contactInfo.businessHours && contactInfo.businessHours.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Business Hours</h4>
              <div className="space-y-2">
                {contactInfo.businessHours.map((hours, index) => (
                  <div key={index} className="flex justify-between text-gray-700">
                    <span className="font-medium">{hours.day}</span>
                    <span>{hours.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social Media */}
          {contactInfo.socialMedia && contactInfo.socialMedia.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Follow Us</h4>
              <div className="flex space-x-4">
                {contactInfo.socialMedia.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${social.platform}`}
                  >
                    <span className="capitalize">{social.platform}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

// Default contact information for White Trading Company
export const whiteTradingCompanyContactInfo: ContactInfo = {
  name: 'White Trading Company',
  address: {
    street: '#45/2a-1, Sungam Bye Pass Road',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    postalCode: '641045',
    country: 'India',
  },
  phone: '+91-422-2321811',
  email: 'info@whitetradingcompany.com',
  website: 'https://whitetradingcompany.com',
  businessHours: [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '9:00 AM - 2:00 PM' },
    { day: 'Sunday', hours: 'Closed' },
  ],
  socialMedia: [
    { platform: 'LinkedIn', url: 'https://linkedin.com/company/whitetradingcompany' },
    { platform: 'Twitter', url: 'https://twitter.com/whitetradingcompany' },
    { platform: 'Facebook', url: 'https://facebook.com/whitetradingcompany' },
  ],
}

export default SEOContactInfo
