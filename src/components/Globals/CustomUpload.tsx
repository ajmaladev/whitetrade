'use client'
import { useField } from '@payloadcms/ui'
import { useEffect, useState } from 'react'
import Upload from './Upload'
import { updateUrltoId } from './updateUrltoId'

export default function CustomUpload(props: {
  field: { name: string }
  path: string
  data: any
  label: string
  description: string
}) {
  const { field, path, data, label, description } = props
  const { value, setValue } = useField<string>({ path })
  const [convertedId, setConvertedId] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    const processUrl = async () => {
      if (!value || typeof value !== 'string' || value.trim() === '') {
        setConvertedId('')
        return
      }

      setIsProcessing(true)
      try {
        const id = await updateUrltoId(value)
        setConvertedId(id || '')
      } catch (conversionError) {
        console.error('Error converting URL to ID:', conversionError)
        setConvertedId('')
      } finally {
        setIsProcessing(false)
      }
    }

    processUrl()
  }, [value])

  if (isProcessing) {
    return <div className="p-2">Processing media URL...</div>
  }

  return (
    <Upload
      field_name={field.name}
      path={path}
      initialUrl={value || ''}
      convertedId={convertedId}
      label={label}
      description={description}
      setValue={setValue}
    />
  )
}
