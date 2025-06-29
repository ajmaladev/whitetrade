import { revalidate } from '@/app/(frontend)/actions'
import globalUpload from '@/components/Globals/GlobalUpload'
import { CollectionConfig } from 'payload'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  hooks: {
    beforeValidate: [
      async ({ data, req }) => {
        await revalidate('gallery')
        return data
      },
    ],
  },
  fields: [
    {
      name: 'images',
      type: 'array',
      admin: {
        description: 'The images to display in the gallery. Please upload the images below 1MB',
      },
      fields: [
        globalUpload({
          field_name: 'image',
          label: 'Image',
        }),
      ],
    },
  ],
}
