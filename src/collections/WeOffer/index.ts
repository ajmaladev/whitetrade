import globalUpload from '@/components/Globals/GlobalUpload'
import type { CollectionConfig } from 'payload'

export const WeOffer: CollectionConfig = {
  slug: 'weOffer',
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
}
