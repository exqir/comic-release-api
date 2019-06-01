import { ComicSeriesModel, ComicSeries } from '../types/mongo'
import { DataListService } from '../types/services'

export interface ComicSeriesService extends DataListService<ComicSeries> {
  getByQuery: (query: any) => Promise<ComicSeries>
  getByIdWithComicBooksUrl: (id: string) => Promise<ComicSeries>
}

export function createComicSeriesService(
  Model: ComicSeriesModel,
): ComicSeriesService {
  async function updateSeries(
    series: string,
    update: any,
  ): Promise<ComicSeries> {
    return Model.findByIdAndUpdate(series, update, { new: true })
  }

  return {
    create: async series => new Model(series).save(),
    getAll: async () => Model.find().exec(),
    getById: async id => Model.findById(id).exec(),
    getByList: async list =>
      Model.find()
        .where('_id')
        .in(list)
        .exec(),
    getByQuery: async query => Model.findOne(query).exec(),
    getByIdWithComicBooksUrl: async id =>
      Model.findById(id)
        .populate('comicBooks', 'url')
        .exec(),
    insert: async (comicSeries, comicBook) =>
      updateSeries(comicSeries, { $push: { comicBooks: comicBook } }),
  }
}
