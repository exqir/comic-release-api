import { image } from './publisher/image'

export const getScrapConfig = (id, type) => {
  const config = {
    image
  }
  console.log(`${id}.${type}`)
  return config[id][type]
}