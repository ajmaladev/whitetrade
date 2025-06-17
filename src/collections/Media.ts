import type { CollectionConfig } from 'payload'
import { collectionAccess } from '../lib/accessControls'
import { LOCK_DOCUMENT_DURATION } from '../lib/constants'
import { generateImageName } from '../lib/globalMethods'

export const Media: CollectionConfig = {
  slug: 'media',
  lockDocuments: {
    duration: LOCK_DOCUMENT_DURATION,
  },
  disableDuplicate: true,
  admin: {
    useAsTitle: 'alt_text',
    defaultColumns: ['alt_text', 'url', 'updatedAt'],
    group: 'Collections',
    listSearchableFields: ['alt_text'],
  },
  access: {
    read: collectionAccess.Media.read,
    create: collectionAccess.Media.create,
    update: collectionAccess.Media.update,
    delete: collectionAccess.Media.delete,
  },
  defaultSort: '-updatedAt',
  fields: [
    {
      name: 'url',
      label: 'Media URL',
      type: 'text',
      unique: true,
      required: true,
      hooks: {
        afterRead: [
          ({ originalDoc }) => {
            const url = `${originalDoc?.backupUrl || originalDoc?.url}`
            return url
          },
        ],
      },
    },
    {
      name: 'backupUrl',
      label: 'Media URL',
      type: 'text',
      virtual: true,
      admin: {
        hidden: true,
      },
      hooks: {
        afterRead: [
          ({ originalDoc }) => {
            const url = `${process.env.NEXT_PUBLIC_BUNNY_CDN}${originalDoc?.url}`
            return url
          },
        ],
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'alt_text',
      label: 'Alt Text',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'uploader',
      type: 'text',
      label: 'Uploader',
      admin: {
        readOnly: true,
        position: 'sidebar',
        hidden: true,
      },
      hooks: {
        afterRead: [
          ({ req, data }) => {
            if (data && !data?.uploader) {
              data.uploader = req.user?.email
            }
          },
        ],
      },
    },
  ],

  upload: {
    adminThumbnail: ({ doc }) => {
      if (!doc?.url) return ''
      // Use the CDN URL for previews, not the storage URL
      const url = `${process.env.NEXT_PUBLIC_BUNNY_CDN}${doc.url}`
      return url
    },
    displayPreview: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 100,
        height: 100,
        crop: 'center',
      },
      {
        name: 'medium',
        width: 400,
        height: 400,
        crop: 'center',
      },
    ],
    pasteURL: {
      allowList: [
        {
          hostname: '*.bunny.net',
          pathname: process.env.NEXT_PUBLIC_BUNNY_CDN,
        },
      ],
    },
    mimeTypes: ['image/*'],
    disableLocalStorage: true,
    crop: true,
    focalPoint: true,
  },
  hooks: {
    beforeValidate: [
      async ({ req, data = {} }) => {
        if (!req.file) return data
        const file = req.file
        const fileName = generateImageName(file.name)

        // Use constant folder structure: /whitetrade/media/{file}
        const uploadPath = `whitetrade/media/${fileName}`

        try {
          // Upload to BunnyCDN
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BUNNY_CDN_STORAGE_URL}/${uploadPath}`,
            {
              method: 'PUT',
              body: file.data,
              headers: {
                AccessKey: process.env.BUNNY_CDN_ACCESS_KEY || '',
                'Content-Type': file.mimetype,
              },
            },
          )
          if (!response.ok) {
            throw new Error(`Upload failed: ${response.statusText}`)
          }
          // Assign the generated URL to the `url` field
          data.url = uploadPath
          data.backupUrl = uploadPath
        } catch (error) {
          console.error('Upload error:', error)
          throw error
        }
        return data
      },
    ],
  },
}
