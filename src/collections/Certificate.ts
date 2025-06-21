import globalUpload from '@/components/Globals/GlobalUpload'
import { CollectionConfig } from 'payload'

export const Certificate: CollectionConfig = {
  slug: 'certificate',
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
}
