'use client'

import { Category } from '@/payload-types'
import { motion } from 'framer-motion'
import { ArrowRightIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { PaginatedDocs } from 'payload'

const CARD_COLORS = [
  'bg-zinc-100', // Card 1
  'bg-yellow-100', // Card 2
  'bg-[#d4edf8]', // Card 3
  'bg-red-100', // Card 4
  'bg-[#f2e7e3]', // Card 5
  'bg-green-100', // Card 6
  'bg-[#faf0e8]', // Card 7
  'bg-[#d9fec4]', // Card 8
  'bg-[#e6e7d6]', // Card 9
]

const BUTTON_COLORS = [
  'bg-[#444444]', // Card 1
  'bg-neutral-700', // Card 2
  'bg-neutral-700', // Card 3
  'bg-orange-400', // Card 4
  'bg-neutral-700', // Card 5
  'bg-neutral-700', // Card 6
  'bg-[#c67f3d]', // Card 7
  'bg-neutral-700', // Card 8
  'bg-neutral-700', // Card 9
]

// Define the specific grid layout for 9 cards in 6 columns, 2 rows
const gridLayout = [
  { colSpan: 2, rowSpan: 1 }, // Card 1: 2 columns
  { colSpan: 1, rowSpan: 1 }, // Card 2: 1 column
  { colSpan: 1, rowSpan: 1 }, // Card 3: 1 column
  { colSpan: 2, rowSpan: 1 }, // Card 4: 2 columns
  { colSpan: 1, rowSpan: 1 }, // Card 5: 1 column
  { colSpan: 1, rowSpan: 1 }, // Card 6: 1 column
  { colSpan: 2, rowSpan: 1 }, // Card 7: 2 columns
  { colSpan: 1, rowSpan: 1 }, // Card 8: 1 column
  { colSpan: 1, rowSpan: 1 }, // Card 9: 1 column
]

function getCardColor(index: number) {
  return CARD_COLORS[index % CARD_COLORS.length]
}

function getButtonColor(index: number) {
  return BUTTON_COLORS[index % BUTTON_COLORS.length]
}

function getGridClass(layout: { colSpan: number; rowSpan: number }) {
  const { colSpan, rowSpan } = layout

  return `col-span-${colSpan} row-span-${rowSpan} h-[250px]`
}

function ShopNowButton({ href, buttonColor }: { href: string; buttonColor: string }) {
  return (
    <Link href={href}>
      <span
        className={`inline-flex items-center gap-2 px-4 py-2 mt-4 rounded-xl ${buttonColor} text-white group-hover:scale-105 text-sm font-semibold shadow transition`}
      >
        Shop Now
        <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
      </span>
    </Link>
  )
}

export function CategoryCard({
  category,
  index,
  layout,
  showButton = false,
}: {
  category: Category
  index: number
  layout: { colSpan: number; rowSpan: number }
  showButton?: boolean
}) {
  let imageUrl = category?.category_image
  if (imageUrl) {
    imageUrl = process.env.NEXT_PUBLIC_BUNNY_CDN + imageUrl
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      className={`
        relative flex flex-col justify-between overflow-hidden rounded-3xl shadow-lg
        ${getCardColor(index)}
        ${getGridClass(layout)}
        p-5
        transition-all duration-300 ease-in-out
        hover:shadow-2xl hover:shadow-black/20
        hover:bg-opacity-90
        group
      `}
    >
      <Link href={`/${category.slug}`}>
        <div>
          <h2
            className={`font-extrabold text-neutral-600/60 text-xl font-['Montserrat'] sm:text-2xl mb-2 !leading-none
            transition-colors duration-300 group-hover:text-neutral-800/80`}
          >
            {category.title}
          </h2>
        </div>
        <div
          className={`flex-1 flex items-end justify-end ${showButton ? 'justify-between items-center' : 'justify-end'}`}
        >
          {showButton && (
            <ShopNowButton
              href={`/${category.slug || ''}`}
              buttonColor={getButtonColor(index) || 'bg-neutral-700'}
            />
          )}
          <div className="relative w-40 h-32 sm:w-48 sm:h-40 transition-transform duration-300 group-hover:translate-y-[-8px]">
            <Image
              src={imageUrl || '/logo.svg'}
              alt={category.title}
              fill
              className="object-contain drop-shadow-xl transition-all duration-300 group-hover:drop-shadow-2xl"
              sizes="(max-width: 640px) 100vw, 33vw"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function Categories({ categories }: { categories: PaginatedDocs<Category> }) {
  // Get the first 9 categories
  const cards = categories.docs.slice(0, 9)

  // Repeat categories if we don't have enough
  while (cards.length < 9) {
    cards.push(...categories.docs.slice(0, 9 - cards.length))
  }

  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'White Trading Company Categories',
    description: 'Explore our comprehensive trading categories and services',
    numberOfItems: categories.docs.length,
    itemListElement: categories.docs.map((category, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: category.title,
        description: `Trading services and products in ${category.title}`,
        url: `https://whitetradingcompany.com/${category.slug}`,
        provider: {
          '@type': 'Organization',
          name: 'White Trading Company',
        },
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className="py-16 pt-8 px-2 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Grid with 6 columns for desktop */}
          <div
            className="
              grid 
              grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6
              gap-x-4 gap-y-4 md:gap-y-8
              auto-rows-fr
            "
            style={{ minHeight: 500 }}
          >
            {gridLayout.map((layout, index) => (
              <CategoryCard
                key={`${cards[index]?.id || index}-${index}`}
                category={cards[index] as Category}
                index={index}
                layout={layout}
                showButton={layout.colSpan === 2}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
