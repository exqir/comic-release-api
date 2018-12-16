import { ComicBook, ComicBookModel } from "../types/mongo";
import { DataService } from "../types/services";

export interface ComicBookService extends DataService<ComicBook> {
  updateRealeaseDate: (id: string, newDate: Date) => Promise<ComicBook>
}

export function createComicBookService(Model: ComicBookModel): ComicBookService {
  return {
    create: async issue => new Model(issue).save(),
    getById: async id => Model.findById(id).exec(),
    getByList: async list => Model.find().where('_id').in(list).exec(),
    updateRealeaseDate: async (id, newDate) => Model.findByIdAndUpdate(id, { releaseDate: newDate }, { new: true }).exec()
  }
}
