export const updateUrltoId = async (url: string) => {
  if (!url) return null

  try {
    // Make a client-side API call to fetch media by URL
    const response = await fetch('/api/media/by-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    })

    if (!response.ok) {
      console.error(`No media found with URL: ${url}`)
      return null
    }

    const data = await response.json()
    const objectIdString = data._id
    return objectIdString
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    console.error('Media URL to ID conversion error:', errorMessage)
    return null
  }
}
