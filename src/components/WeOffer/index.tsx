'use client'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import './weoffer.css'

// Define the actual type based on your data structure
type WeOfferItem = {
  id: string
  title: string
  description: string
  icon: string
}

type WeOfferData = {
  item: WeOfferItem[]
}

interface WeOfferProps {
  weOffer: WeOfferData
}

// Enhanced Card with hover effect component
const CardWithEffect = ({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // 3D tilt effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ['15deg', '-15deg'])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-15deg', '15deg'])

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 }
  const springRotateX = useSpring(rotateX, springConfig)
  const springRotateY = useSpring(rotateY, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const mouseXFromCenter = e.clientX - centerX
    const mouseYFromCenter = e.clientY - centerY

    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })

    mouseX.set(mouseXFromCenter / (rect.width / 2))
    mouseY.set(mouseYFromCenter / (rect.height / 2))
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6 overflow-hidden transition-all duration-300 hover:border-white/40 card-hover ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        rotateX: isHovered ? springRotateX : 0,
        rotateY: isHovered ? springRotateY : 0,
        willChange: 'transform',
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Enhanced cursor background effect */}
      {isHovered && (
        <motion.div
          className="pointer-events-none absolute rounded-full"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.4, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          style={{
            width: '400px',
            height: '400px',
            top: mousePosition.y - 200,
            left: mousePosition.x - 200,
            background:
              'radial-gradient(circle, rgba(93, 44, 168, 0.8) 0%, rgba(139, 92, 246, 0.4) 50%, transparent 70%)',
            filter: 'blur(60px)',
            zIndex: 10,
            willChange: 'transform, top, left',
          }}
        />
      )}

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          duration: 1.5,
          ease: 'linear',
          repeat: Infinity,
          repeatDelay: 2,
        }}
        style={{ willChange: 'transform' }}
      />

      <div style={{ transform: 'translateZ(50px)' }}>{children}</div>
    </motion.div>
  )
}

export const WeOffer = ({ weOffer }: WeOfferProps) => {
  const animationRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate')
          } else {
            entry.target.classList.remove('animate')
          }
        })
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        rootMargin: '0px 0px -100px 0px',
      },
    )

    animationRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref)
      }
    })

    return () => observer.disconnect()
  }, [weOffer])

  if (!weOffer || !weOffer.item || weOffer.item.length === 0) {
    return null
  }

  // Generate structured data for services
  const generateStructuredData = () => {
    const services = weOffer.item.map((item) => ({
      '@type': 'Service',
      name: item.title,
      description: item.description,
      image: process.env.NEXT_PUBLIC_BUNNY_CDN ? process.env.NEXT_PUBLIC_BUNNY_CDN + item.icon : '',
    }))

    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Our Services',
      description: 'Comprehensive range of services offered by White Trading Company',
      numberOfItems: services.length,
      itemListElement: services.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: service,
      })),
    }
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

      <section
        className="relative overflow-clip mt-4 sm:mt-10 md:mt-14 w-full"
        aria-labelledby="we-offer-heading"
      >
        <div className="relative w-full">
          <Image
            src="/we-offer-title.webp"
            alt="We Offer section heading"
            width={1000}
            height={1000}
            className="w-full md:w-[36%] lg:ml-40 px-6 sm:mx-auto sticky top-0"
          />

          <div
            className="flex flex-col mt-10 md:mt-10 lg:mt-20 w-full"
            role="list"
            aria-label="Services and offerings"
          >
            {weOffer.item.map((item: WeOfferItem, index: number) => {
              const isLeft = index % 2 === 0
              return (
                <motion.article
                  key={item.id}
                  ref={(el) => {
                    animationRefs.current[index] = el
                  }}
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.2,
                    ease: 'easeOut',
                  }}
                  viewport={{ once: true, margin: '-100px' }}
                  className={`sticky ${index === weOffer.item.length - 1 ? 'pt-[90px]' : 'pt-[100px]'} pb-6 px-4 sm:px-6 top-[100px] ${isLeft ? 'left' : 'right'} bg-white/5 backdrop-blur-sm pt-[60px] sm:pt-[80px] lg:pt-[156px] glass-container w-full`}
                  role="listitem"
                >
                  <div className={`${isLeft ? 'mr-auto lg:pl-8' : 'ml-auto lg:pr-8'}`}>
                    <div
                      className={`flex flex-col lg:flex-row ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-start gap-4 sm:gap-6 lg:gap-8 relative`}
                    >
                      <div
                        className={`flex flex-col ${isLeft ? 'items-start' : 'items-end lg:items-end'} gap-1 sm:gap-4 relative w-full lg:w-auto`}
                      >
                        {item.icon && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            transition={{
                              duration: 0.8,
                              delay: index * 0.2 + 0.3,
                              type: 'spring',
                              stiffness: 100,
                            }}
                            viewport={{ once: true }}
                            whileHover={{
                              scale: 1.1,
                              rotate: [0, -10, 10, 0],
                              transition: { duration: 0.6 },
                            }}
                            className={`flex-shrink-0 absolute w-32 h-32 sm:w-40 sm:h-40 lg:w-56 lg:h-56 rounded-full flex items-center justify-center p-2 mx-auto lg:mx-0 mb-4 lg:mb-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-white/20 backdrop-blur-sm ${
                              isLeft
                                ? 'lg:order-2 -top-[65px] sm:-top-[82px] right-0 xs:right-[18%] sm:right-[36px] lg:-right-[150px] lg:-top-[120px]'
                                : 'lg:order-1  -top-[65px] sm:-top-[82px] left-0 xs:left-[18%] sm:left-[36px] lg:-left-[150px] lg:-top-[120px]'
                            }`}
                            aria-hidden="true"
                          >
                            <Image
                              src={
                                process.env.NEXT_PUBLIC_BUNNY_CDN
                                  ? process.env.NEXT_PUBLIC_BUNNY_CDN + item.icon
                                  : ''
                              }
                              alt={`${item.title} service icon`}
                              width={224}
                              height={224}
                              className="w-16 h-16 sm:w-40 sm:h-40 lg:w-56 lg:h-56 object-contain filter drop-shadow-lg"
                            />
                            {/* Enhanced animated shine effect */}
                            <motion.div
                              className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                              initial={{ x: '-100%' }}
                              animate={{ x: '100%' }}
                              transition={{
                                duration: 2,
                                ease: 'linear',
                                repeat: Infinity,
                                repeatDelay: 3,
                              }}
                            />
                            {/* Additional glow effect */}
                            <motion.div
                              className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20"
                              animate={{
                                opacity: [0.3, 0.6, 0.3],
                                scale: [1, 1.1, 1],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: 'easeInOut',
                              }}
                            />
                          </motion.div>
                        )}

                        <CardWithEffect
                          className={`w-60 p-2.5 sm:w-[400px] md:w-[550px] sm:p-6 lg:p-7 bg-gradient-to-r from-blue-600 to-purple-600 ${isLeft ? '' : 'lg:text-right'}`}
                        >
                          <motion.h3
                            initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                            viewport={{ once: true }}
                            className="text-white text-[15px] sm:text-2xl lg:text-3xl xl:text-[28px] font-bold font-['Manrope']"
                          >
                            {item.title}
                          </motion.h3>
                        </CardWithEffect>

                        <CardWithEffect
                          className={`w-64 p-3 sm:w-[400px] md:w-[600px] ${
                            isLeft ? 'ml-16 md:ml-32' : 'mr-16 md:mr-32'
                          } p-4 sm:p-6 lg:p-7 bg-gradient-to-r from-zinc-950 to-zinc-900 ${isLeft ? '' : 'lg:text-right'}`}
                        >
                          <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 + 0.7 }}
                            viewport={{ once: true }}
                            className="text-white text-[12.21px] sm:text-base lg:text-lg xl:text-xl font-normal font-['Manrope'] leading-relaxed lg:leading-loose"
                          >
                            {item.description}
                          </motion.p>
                        </CardWithEffect>
                      </div>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
