'use server'

import { revalidateTag } from 'next/cache'

export async function revalidate(tag: string) {
  try {
    revalidateTag(tag)
    console.log('Revalidation successful:', tag) // Dont remove this console.log
  } catch (error) {
    console.error('Revalidation error:', error)
  }
}
