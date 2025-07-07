'use client'
import { HomePage } from '@/payload-types'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface CertificatesProps {
  certificates: HomePage['certificates']
}

export const Certificates = ({ certificates }: CertificatesProps) => {
  // Generate structured data for certificates
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'White Trading Company',
    description: 'Premium trading solutions and financial services',
    url: 'https://whitetradingcompany.com',
    hasCredential:
      certificates?.map((certificate) => ({
        '@type': 'EducationalOccupationalCredential',
        name: certificate.title,
        credentialCategory: 'Professional Certification',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Trading Industry Authority',
        },
      })) || [],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className="px-4 py-8 md:px-6 relative" aria-labelledby="certificates-heading">
        <h3 id="certificates-heading" className="sr-only">
          White Trading Company Certifications and Accreditations
        </h3>
        <div className="hidden lg:block w-28 h-52 bg-indigo-400 rounded-l-full absolute top-0 right-0" />
        <div className="hidden lg:block w-36 h-36 bg-gradient-to-l from-indigo-500/40 to-blue-900/0 rounded-full absolute top-[100px] right-0" />
        <div
          className="grid grid-cols-4 mt-8 md:flex md:flex-wrap items-center justify-center md:gap-20"
          role="list"
          aria-label="Company certifications"
        >
          {certificates?.map((certificate) => (
            <motion.div
              key={certificate.id}
              className="relative flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              role="listitem"
            >
              <Image
                src={
                  process.env.NEXT_PUBLIC_BUNNY_CDN
                    ? `${process.env.NEXT_PUBLIC_BUNNY_CDN}${certificate.image}`
                    : ''
                }
                alt={`${certificate.title} certification`}
                width={150}
                height={150}
                className="h-14 w-14 sm:h-20 sm:w-28 md:h-36 md:w-40 object-contain"
                title={certificate.title}
              />
            </motion.div>
          ))}
        </div>
      </section>
    </>
  )
}
