import type { FieldHook } from 'payload'

export const formatSlug = (val: string): string =>
  val
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[''""\[\]]/g, '')
    .replace(/[!?.,;:]/g, '')
    .replace(/\+/g, '-plus-')
    .replace(/[@#$%^*()=_+[\]{}<>\\|]/g, '')
    .replace(/[–—]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/&/g, 'and')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/[^a-z0-9-]/g, '')

export const formatSlugHook =
  (fallback: string): FieldHook =>
  ({ data, operation, value }) => {
    if (typeof value === 'string') {
      return formatSlug(value)
    }

    if (operation === 'create' || !data?.slug) {
      const fallbackData = data?.[fallback] || data?.[fallback]

      if (fallbackData && typeof fallbackData === 'string') {
        return formatSlug(fallbackData)
      }
    }

    return value
  }
