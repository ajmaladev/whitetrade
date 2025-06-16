import { revalidateTag } from 'next/cache'
import { CollectionConfig } from 'payload'

export const Carousal: CollectionConfig = {
  slug: 'carousal',
  hooks: {
    beforeValidate: [
      async () => {
        revalidateTag('carousal')
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      label: 'Alt Text',
      type: 'text',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
