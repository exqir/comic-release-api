import { ComicBook, ComicBookModel } from "../types/mongo";

export function createComicBookService(Model: ComicBookModel) {
  return {
    create: async (issue: ComicBook): Promise<ComicBook> => new Model(issue).save(),
    getById: async (id: string): Promise<ComicBook> => Model.findById(id).exec(),
    getByList: async (listOfIds: Array<string>): Promise<Array<ComicBook>> => Model.find().where('_id').in(listOfIds).exec(),
    updateRealeaseDate: async (id: string, newDate: Date): Promise<ComicBook> => Model.findByIdAndUpdate(id, { releaseDate: newDate }, { new: true }).exec()
  }
}
