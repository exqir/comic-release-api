import { image } from './publisher/image'

export const getScrapConfig = (name, type) => {
  const config = {
    image
  }
  return config[name][type]
}