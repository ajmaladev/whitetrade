import globalUpload from '@/components/Globals/GlobalUpload'
import type { CollectionConfig } from 'payload'

export const HomePage: CollectionConfig = {
  slug: 'home-page',
  fields: [
    {
      name: 'carousal',
      type: 'array',
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
    },
    {
      type: 'array',
      name: 'testimonials',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'count',
          type: 'text',
        },
      ],
    },
    {
      type: 'array',
      name: 'certificates',
      fields: [
        globalUpload({
          field_name: 'image',
          label: 'Image',
          description: 'Image of the certificate',
        }),
        {
          name: 'title',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      type: 'group',
      label: 'We Offer',
      name: 'weOffer',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'item',
          type: 'array',
          admin: {
            description: 'Enter the items you want to offer',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
            },
            {
              name: 'description',
              type: 'text',
            },
            globalUpload({
              field_name: 'icon',
              label: 'Icon',
              description: 'Upload the icon for the item',
            }),
          ],
        },
      ],
    },
  ],
}
