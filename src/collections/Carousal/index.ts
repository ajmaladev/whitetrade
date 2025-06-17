import globalUpload from '@/components/Globals/GlobalUpload'
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
    globalUpload({
      field_name: 'image',
      label: 'Image',
      description: 'Upload an image for the carousal',
    }),
  ],
}
