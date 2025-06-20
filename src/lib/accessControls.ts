import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const collectionAccess = {
  Media: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
}
