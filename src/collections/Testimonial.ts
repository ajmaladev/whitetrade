import { CollectionConfig } from 'payload'

export const Testimonial: CollectionConfig = {
  slug: 'testimonial',
  fields: [
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
  ],
}
