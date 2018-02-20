import { image } from './publisher/image'

export const getScrapConfig = (id, type) => {
  const config = {
    image,
  }
  return config[id][type]
}