'use client'

import { Testimonial } from '@/payload-types'
import { PaginatedDocs } from 'payload'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'

export default function Testimonials({
  testimonials,
}: {
  testimonials: PaginatedDocs<Testimonial>
}) {
  const testimonialData = testimonials.docs?.[0]?.testimonials

  const [ref, inView] = useInView({
    triggerOnce: true,
  })

  if (!testimonialData || testimonialData.length === 0) {
    return null
  }

  const getCountUpProps = (countStr: string | null | undefined) => {
    if (!countStr) return { start: 0, end: 0, suffix: '' }

    const numberPart = parseInt(countStr, 10)
    if (isNaN(numberPart)) return { start: 0, end: 0, suffix: countStr }

    const suffix = countStr.replace(String(numberPart), '')

    let start = 1
    if (countStr.includes('100')) {
      start = 50
    }

    return { start, end: numberPart, suffix }
  }

  return (
    <div className="py-10 sm:py-20" ref={ref}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 sm:gap-y-16 justify-items-center">
        {testimonialData.map((item, index) => {
          const { start, end, suffix } = getCountUpProps(item.count)
          return (
            <div key={item.id || index} className="text-center">
              <p className="text-4xl font-extrabold text-cyan-900 font-['Manrope'] leading-tight sm:text-6xl sm:leading-[76px]">
                {inView ? (
                  <CountUp start={start} end={end} duration={2.5} suffix={suffix} />
                ) : (
                  `${start}${suffix}`
                )}
              </p>
              <p className="mt-2 text-base font-semibold text-stone-900 opacity-70 font-['Manrope'] sm:mt-4 sm:text-2xl">
                {item.title}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
