import globalUpload from '@/components/Globals/GlobalUpload'
import { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  fields: [
    {
      name: 'title',
      label: 'Product Title',
      type: 'text',
    },
    {
      name: 'description',
      label: 'Product Description',
      type: 'text',
    },
    globalUpload({
      field_name: 'product_image',
      label: 'Product Image',
      description: 'Upload an image for the product',
    }),
    {
      label: 'Category',
      name: 'category',
      type: 'relationship',
      relationTo: ['categories'],
      required: true,
      hasMany: true,
    },
  ],
}
