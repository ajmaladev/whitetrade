export const generateImageName = (originalName: string): string => {
  const timestamp = Date.now()
  const extension = originalName.split('.').pop()
  const nameWithoutExtension = originalName.replace(/\.[^/.]+$/, '')
  const sanitizedName = nameWithoutExtension.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()
  return `${sanitizedName}-${timestamp}.${extension}`
}

export const generateSlug = (title: string): string => {
  if (!title) return ''
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}
