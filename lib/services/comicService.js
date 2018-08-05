import logger from '../Logger'
import { Comic } from '../models/Comic'

function createComicService(ComicModel) {
  return {
    createComic: async issue => {
      logger.logMsg(`comic: creating comic ${JSON.stringify(issue)}`)
      return await new ComicModel(issue).save()
    },
    getComicById: async id => await ComicModel.findById(id).exec(),
    getComicsByIds: async listOfIds => await ComicModel.find().where('_id').in(listOfIds).exec(),
    updateRealeaseDateOfComic: async (id, newDate) => await ComicModel.findByIdAndUpdate(id, { releaseDate: newDate }, { new: true }).exec()
  }
}

export const ComicService = createComicService(Comic)
