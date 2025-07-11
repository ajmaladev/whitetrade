import { Category, Gallery, HomePage as HomePageType, Product } from '@/payload-types'
import { PaginatedDocs } from 'payload'
import { AboutUs } from '../AboutUs'
import { BestSellerProducts } from '../BestSellerProducts'
import Categories from '../Categories'
import { Certificates } from '../Certificates'
import HeroSection from '../HeroSection'
import HomePageGallery from '../HomePageGallery'
import { OurBrandsQuery } from '../OurBrandsQuery'
import { Reviews } from '../Reviews'
import Testimonials from '../Testimonials'
import { WeOffer as WeOfferComponent } from '../WeOffer'
import BuyNow from './BuyNow'

type TestimonialItem = {
  id: string
  title: string
  count: string
}

type WeOfferItem = {
  id: string
  title: string
  description: string
  icon: string
}

type WeOfferData = {
  item: WeOfferItem[]
}

type OurBrands =
  | { image?: string | null | undefined; id?: string | null | undefined }[]
  | null
  | undefined
interface HomePageProps {
  carousal: HomePageType['carousal']
  categories: PaginatedDocs<Category>
  testimonials: TestimonialItem[]
  certificates: HomePageType['certificates']
  weOffer: WeOfferData
  products: PaginatedDocs<Product>
  ourBrands: OurBrands
  reviews: HomePageType['reviews']
  gallery: PaginatedDocs<Gallery>
}

export default function HomePage({
  carousal,
  categories,
  testimonials,
  certificates,
  weOffer,
  products,
  ourBrands,
  reviews,
  gallery,
}: HomePageProps) {
  // Enhanced structured data for the homepage
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'White Trading Company',
    description:
      'Leading supplier of safety products, fruits & vegetables, grains & rice, food products, and textile materials in Coimbatore since 2011',
    url: typeof window !== 'undefined' ? window.location.origin : 'https://whitetradingcompany.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://whitetradingcompany.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'White Trading Company',
      logo: {
        '@type': 'ImageObject',
        url: 'https://whitetradingcompany.com/logo.svg',
      },
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: categories.docs.map((category, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Service',
          name: category.title,
          description: `Trading services in ${category.title}`,
          url: `https://whitetradingcompany.com/${category.slug}`,
        },
      })),
    },
  }

  // Organization structured data
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'White Trading Company',
    url: 'https://whitetradingcompany.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://whitetradingcompany.com/logo.svg',
    },
    description:
      'Leading supplier of safety products, fruits & vegetables, grains & rice, food products, and textile materials in Coimbatore since 2011',
    foundingDate: '2011',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '#45/2a-1, Sungam Bye Pass Road',
      addressLocality: 'Coimbatore',
      addressRegion: 'Tamil Nadu',
      postalCode: '641045',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-422-2321811',
      contactType: 'customer service',
      availableLanguage: 'English',
      areaServed: 'IN',
    },
    email: 'info@whitetrading.in',
    sameAs: [
      'https://www.facebook.com/whitetradingcompany',
      'https://www.linkedin.com/company/white-trading-company',
      'https://www.instagram.com/whitetradingcompany',
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <main
        className="w-full"
        role="main"
        aria-label="White Trading Company Homepage - Always On, Always Ahead"
      >
        <HeroSection carousal={carousal} />
        <div className="!mt-[-18px] sm:mt-14">
          <Categories categories={categories} />
        </div>
        <BuyNow />
        <Testimonials testimonials={testimonials} />
        <BestSellerProducts products={products.docs} />
        <Certificates certificates={certificates} />
        <HomePageGallery gallery={gallery} />
        <WeOfferComponent weOffer={weOffer} />
        <OurBrandsQuery brands={ourBrands} />
        <Reviews reviews={reviews} />
        <AboutUs />
      </main>
    </>
  )
}
