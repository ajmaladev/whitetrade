'use server'
import { get } from '@/lib/get'
import { UIFieldServerProps } from 'payload'
import Upload from './Upload'
import { updateUrltoId } from './updateUrltoId'

export default async function CustomUpload(
  props: UIFieldServerProps & { label: string; description: string },
) {
  try {
    const { field, path, data, label, description } = props
    const value = get(data, path) as string | undefined

    let id: string | null = null
    // Only attempt to convert if we have a valid value
    if (value && typeof value === 'string' && value.trim() !== '') {
      try {
        const convertedId = await updateUrltoId(value)
        id = convertedId || null
      } catch (conversionError) {
        console.error('Error converting URL to ID:', conversionError)
      }
    }

    return (
      <Upload
        field_name={field.name}
        path={path}
        initialUrl={value || ''}
        convertedId={id || ''}
        label={label}
        description={description}
      />
    )
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    console.error('Custom upload component error:', errorMessage)

    // Return the Upload component with default values in case of error
    return (
      <Upload
        field_name={props.field.name}
        path={props.path}
        initialUrl=""
        convertedId=""
        label={props.label}
        description={props.description}
      />
    )
  }
}
