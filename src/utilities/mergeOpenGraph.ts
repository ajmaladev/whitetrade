import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  title: 'White Trading Company - Always On, Always Ahead',
  description:
    'White Trading Company - Leading supplier of safety products, fruits & vegetables, grains & rice, food products, and textile materials. Established in 2011, serving Coimbatore and beyond.',
  images: [
    {
      url: getServerSideURL() + '/white-trading-company-brochure.webp',
      width: 1200,
      height: 630,
      alt: 'White Trading Company - Always On, Always Ahead',
    },
  ],
  siteName: 'White Trading Company',
  type: 'website',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
