'use client'
import { Certificate } from '@/payload-types'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { PaginatedDocs } from 'payload'

interface CertificatesProps {
  certificates: PaginatedDocs<Certificate>
}

export const Certificates = ({ certificates }: CertificatesProps) => {
  return (
    <div className="px-4 py-8 md:px-6">
      <div className="grid grid-cols-4 mt-8 md:flex md:flex-wrap items-center justify-center md:gap-20">
        {certificates.docs.map((certificate) => (
          <motion.div
            key={certificate.id}
            className="relative flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Image
              src={
                process.env.NEXT_PUBLIC_BUNNY_CDN
                  ? `${process.env.NEXT_PUBLIC_BUNNY_CDN}${certificate.image}`
                  : ''
              }
              alt={certificate.title}
              width={150}
              height={150}
              className="h-14 w-14 sm:h-20 sm:w-28 md:h-36 md:w-40 object-contain"
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
