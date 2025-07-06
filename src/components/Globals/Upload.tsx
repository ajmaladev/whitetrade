'use client'
import { UploadField, useField } from '@payloadcms/ui'
import { useEffect, useState } from 'react'

export default function Upload({
  field_name,
  path,
  initialUrl,
  convertedId,
  label,
  description,
  setValue,
}: {
  field_name: string
  path: string
  initialUrl: string
  convertedId: string
  label: string
  description: string
  setValue: (value: string) => void
}) {
  const [isReady, setIsReady] = useState(false)
  const [mediaId, setMediaId] = useState<string>('')

  // Use a separate field for the upload component
  const { setValue: setUploadValue } = useField<string>({
    path: `${path}_upload`,
  })

  useEffect(() => {
    const processUrl = async () => {
      try {
        if (convertedId) {
          setMediaId(convertedId)
          setUploadValue(convertedId)
          setTimeout(() => {
            setIsReady(true)
          }, 50)
          return
        }

        if (initialUrl) {
          setMediaId('')
          setUploadValue('')
        }

        setIsReady(true)
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
        console.error('Error in processing:', errorMessage)
        setIsReady(true)
      }
    }

    processUrl()
  }, [convertedId, initialUrl, setUploadValue])

  // Watch for changes in the upload field and update the main field
  useEffect(() => {
    if (mediaId) {
      setValue(mediaId)
    }
  }, [mediaId, setValue])

  return isReady ? (
    <div>
      <UploadField
        field={{
          type: 'upload',
          relationTo: 'media',
          name: `${field_name}_upload`,
          label,
          admin: {
            description,
            sortOptions: 'filename',
          },
        }}
        path={`${path}_upload`}
      />
    </div>
  ) : (
    <div className="p-2">Loading media field...</div>
  )
}
