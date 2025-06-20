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
}: {
  field_name: string
  path: string
  initialUrl: string
  convertedId: string
  label: string
  description: string
}) {
  const { setValue } = useField<string>({
    path,
  })

  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const processUrl = async () => {
      try {
        if (convertedId) {
          setValue(convertedId)
          // Small delay to ensure the value is set
          setTimeout(() => {
            setIsReady(true)
          }, 50)
          return
        }

        // Use initialUrl as fallback
        if (initialUrl) {
          setValue(initialUrl)
        }

        // Always set ready to allow upload functionality
        setIsReady(true)
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
        console.error('Error in processing:', errorMessage)
        setIsReady(true)
      }
    }

    processUrl()
  }, [convertedId, initialUrl, setValue])

  return isReady ? (
    <UploadField
      field={{
        type: 'upload',
        relationTo: 'media',
        name: field_name,
        label,
        admin: {
          description,
          sortOptions: 'filename',
        },
      }}
      path={path}
    />
  ) : (
    <div className="p-2">Loading media field...</div>
  )
}
