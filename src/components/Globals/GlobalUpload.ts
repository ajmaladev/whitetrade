import { Field } from 'payload'
import { updateIdtoUrl } from './updateIdtoUrl'

export default function globalUpload(props: {
  field_name: string
  label: string
  description?: string
}): Field {
  const { field_name, label, description } = props
  return {
    name: field_name,
    type: 'text',
    admin: {
      components: {
        Field: {
          path: 'src/components/Globals/CustomUpload',
          serverProps: {
            label,
            description,
          },
        },
      },
    },
    hooks: {
      beforeValidate: [
        async ({ value, siblingData }) => {
          if (!siblingData?.[field_name]) {
            return value
          }

          try {
            const url = await updateIdtoUrl(siblingData[field_name])
            return url === null ? value : url
          } catch (error) {
            console.error(`Global upload error for ${field_name}:`, error)
            return value
          }
        },
      ],
    },
  }
}
