import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'White Trading Company - Leading supplier of safety products, fruits & vegetables, grains & rice, food products, and textile materials. Established in 2011, serving Coimbatore and beyond.',
  images: [
    {
      url: `${getServerSideURL()}/website-template-OG.webp`,
    },
  ],
  siteName: 'White Trading Company',
  title:
    'White Trading Company - Safety Products, Fruits & Vegetables, Grains & Rice, Food Products, Textile',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
