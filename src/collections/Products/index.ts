import { revalidate } from '@/app/(frontend)/actions'
import globalUpload from '@/components/Globals/GlobalUpload'
import { slugField } from '@/fields/slug'
import { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
  },
  hooks: {
    beforeValidate: [
      async ({ data, req }) => {
        const categoryfetch = await req.payload.find({
          collection: 'categories',
          where: {
            id: { equals: data?.[0]?.value },
          },
          select: {
            slug: true,
          },
        })
        await revalidate(categoryfetch?.docs[0]?.slug || '')
        await revalidate('products')
        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      label: 'Product Title',
      type: 'text',
    },
    ...slugField(),
    globalUpload({
      field_name: 'product_image',
      label: 'Product Image',
      description: 'Upload an image for the product',
    }),
    {
      name: 'description',
      label: 'Product Description',
      type: 'textarea',
    },
    {
      name: 'is_best_seller',
      label: 'Is Best Seller?',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
      },
    },
    {
      label: 'Category',
      name: 'category',
      type: 'relationship',
      relationTo: ['categories'],
      required: true,
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
