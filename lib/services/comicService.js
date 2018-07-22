export function createComicService(ComicModel) {
  return {
    createComic: async issue => await new ComicModel(issue.save),
    getComicById: async id => await ComicModel.findById(id).exec(),
    getComicsByIds: async listOfIds => await ComicModel.find().where('_id').in(listOfIds).exec(),
    updateRealeaseDateOfComic: async (id, newDate) => await ComicModel.findByIdAndUpdate(id, { releaseDate: newDate }, { new: true }).exec()
  }
}
