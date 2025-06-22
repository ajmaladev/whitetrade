import type { CollectionConfig } from 'payload'

export const CustomerQuery: CollectionConfig = {
  slug: 'customer-query',
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
    },
    {
      name: 'phone',
      type: 'text',
    },
  ],
}
