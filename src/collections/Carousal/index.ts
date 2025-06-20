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
      field_name: 'big_image',
      label: 'Big Image',
      description: 'Upload an image for the carousal',
    }),
    globalUpload({
      field_name: 'small_image',
      label: 'Small Image',
      description: 'Upload an image for the carousal',
    }),
  ],
}
