import type { CollectionConfig } from 'payload'

import { revalidate } from '@/app/(frontend)/actions'
import globalUpload from '@/components/Globals/GlobalUpload'
import { slugField } from '@/fields/slug'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Categories: CollectionConfig = {
  slug: 'categories',
  hooks: {
    beforeValidate: [
      async ({ data }) => {
        await revalidate('categories')
        await revalidate(data?.slug)
        return data
      },
    ],
    beforeDelete: [
      async () => {
        await revalidate('categories')
        await revalidate('category')
      },
    ],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    ...slugField(),
    globalUpload({
      field_name: 'category_image',
      label: 'Category Image',
      description: 'Upload an image for the category',
    }),
    {
      label: 'Products',
      name: 'products',
      type: 'join',
      collection: 'products',
      on: 'category',
      maxDepth: 2,
    },
    {
      name: 'category_images',
      label: 'Category Images',
      type: 'array',
      fields: [
        globalUpload({
          field_name: 'image',
          label: 'Image',
          description: 'Upload an image for the category',
        }),
      ],
    },
    {
      name: 'order',
      label: 'Order',
      type: 'number',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'order_management',
      label: 'Order Management',
      type: 'text',
      virtual: true,
      admin: {
        components: {
          Field: '@/components/Categories/OrderedCategory',
        },
      },
    },
  ],
}
