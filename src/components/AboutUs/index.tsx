import { MailIcon, MapPinIcon, PhoneIcon, StarIcon } from 'lucide-react'

export const AboutUs = () => {
  // Generate structured data for the About Us section
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'White Trading Company',
    description:
      'Trusted partner in growth, delivering exceptional value through high-quality products and reliable solutions.',
    url: 'https://whitetradingcompany.com',
    logo: 'https://whitetradingcompany.com/logo.svg',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '45/2A - 1, Sungam Byepass Road 641045, Ramanathapuram',
      addressLocality: 'Coimbatore',
      addressRegion: 'Tamil Nadu',
      postalCode: '641045',
      addressCountry: 'IN',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91-422-2321811',
        contactType: 'customer service',
        availableLanguage: 'English',
      },
      {
        '@type': 'ContactPoint',
        telephone: '+91-98430-44443',
        contactType: 'customer service',
        availableLanguage: 'English',
      },
      {
        '@type': 'ContactPoint',
        email: 'info@whitetradingcompany.com',
        contactType: 'customer service',
        availableLanguage: 'English',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      ratingCount: '1000',
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: [
      'https://twitter.com/whitetradingcompany',
      'https://linkedin.com/company/whitetradingcompany',
      'https://facebook.com/whitetradingcompany',
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section
        id="about"
        className="w-full min-h-screen relative bg-gradient-to-br from-slate-900 to-blue-900 overflow-hidden px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16"
        aria-labelledby="about-heading"
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:gap-16 gap-8 justify-center items-center">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h4
              id="about-heading"
              className="text-4xl sm:text-6xl lg:text-8xl xl:text-9xl font-bold font-['Poppins'] text-white"
            >
              About Us
            </h4>
          </div>

          {/* Rating Card */}
          <div className="flex justify-center mb-8 sm:mb-12 lg:mb-16">
            <div
              className="w-64 h-20 bg-white rounded-[47.88px] shadow-[0px_22.722957611083984px_95.76103210449219px_0px_rgba(109,108,115,0.12)] outline outline-[9.74px] outline-neutral-200/40 flex items-center justify-center gap-2"
              itemScope
              itemType="https://schema.org/AggregateRating"
            >
              <div>
                <div
                  className="text-black text-xl font-semibold font-['Manrope'] leading-7"
                  itemProp="ratingValue"
                >
                  4.5/5
                </div>
                <div className="opacity-70 text-black text-xs font-medium font-['Manrope'] leading-tight">
                  Rating
                </div>
              </div>
              <div className="flex gap-1 mb-1" aria-label="4.5 out of 5 stars">
                <StarIcon className="w-5 h-5 fill-amber-300 text-amber-300" />
                <StarIcon className="w-5 h-5 fill-amber-300 text-amber-300" />
                <StarIcon className="w-5 h-5 fill-amber-300 text-amber-300" />
                <StarIcon className="w-5 h-5 fill-amber-300 text-amber-300" />
                <div className="relative w-5 h-5">
                  <StarIcon className="w-5 h-5 fill-gray-300 text-gray-300 absolute inset-0" />
                  <div className="absolute inset-0 w-1/2 overflow-hidden">
                    <StarIcon className="w-5 h-5 fill-amber-300 text-amber-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          <div className="text-white text-base sm:text-lg lg:text-xl font-normal font-['Poppins'] leading-relaxed">
            At White Trading Company, we&apos;re more than a supplier—we&apos;re your trusted
            partner in growth. Built on a foundation of integrity, innovation, and customer-first
            service, we strive to deliver exceptional value through high-quality products and
            reliable solutions.
            <br />
            <br />
            Our mission is to empower businesses and individuals by making premium products and
            outstanding support easily accessible. Whether you&apos;re sourcing for retail,
            wholesale, or personal use, we&apos;re here to help you succeed.
            <br />
            <br />
            Driven by our core values—trust, quality, and innovation—we are committed to building
            lasting relationships and exceeding expectations at every step.
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mb-12 sm:mb-16 lg:mb-20">
          <button
            className="px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-orange-500 rounded-xl inline-flex justify-start items-start gap-2.5 hover:bg-orange-600 hover:shadow-[0px_8px_16px_0px_rgba(0,0,0,0.35)] transition-all duration-300 ease-in-out"
            aria-label="Book a service with White Trading Company"
          >
            <div className="justify-start text-white text-base sm:text-lg font-semibold font-['Manrope'] leading-loose">
              Book a service
            </div>
          </button>
        </div>

        {/* Contacts Section */}
        <div className="max-w-3xl mx-auto">
          <h4 className="text-center mb-8 sm:mb-12 text-2xl sm:text-3xl lg:text-4xl font-bold font-['Poppins'] text-white">
            Contacts
          </h4>

          <address className="flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-12 not-italic">
            <div className="flex flex-col gap-4 w-1/2 items-center md:items-start">
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                  <span className="text-white text-lg sm:text-xl font-medium font-['Poppins']">
                    Phone
                  </span>
                  <PhoneIcon className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <div className="text-white text-base sm:text-lg lg:text-xl font-normal font-['Poppins']">
                  <a href="tel:+914222321811" className="hover:underline">
                    0422 2321811
                  </a>{' '}
                  |{' '}
                  <a href="tel:+919843044443" className="hover:underline">
                    98430 44443
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="text-center md:text-left items-center md:items-start">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                  <span className="text-white text-lg sm:text-xl font-medium font-['Poppins']">
                    Email
                  </span>
                  <MailIcon className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <div className="text-white text-base sm:text-lg lg:text-xl font-normal font-['Poppins']">
                  <a href="mailto:info@whitetradingcompany.com" className="hover:underline">
                    info@whitetradingcompany.com
                  </a>
                </div>
              </div>
            </div>

            <div className="text-center md:text-left w-1/2">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <span className="text-white text-lg sm:text-xl font-medium font-['Poppins']">
                  Location
                </span>
                <MapPinIcon className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <div className="text-white text-base sm:text-lg lg:text-xl font-normal font-['Poppins']">
                45/2A - 1, Sungam Byepass Road 641045, Ramanathapuram, Coimbatore, Tamil Nadu, India
                - 641045
              </div>
            </div>
          </address>
        </div>
      </section>
    </>
  )
}
