import { ComicSeriesModel, ComicSeries, ComicBook } from "../types/mongo";

export function createSeriesService(Model: ComicSeriesModel) {
  async function updateSeries(series: string, update: object): Promise<ComicSeries> {
    return Model.findByIdAndUpdate(series, update, { new: true })
  }

  return {
    create: async (series: ComicSeries): Promise<ComicSeries> => new Model(series).save(),
    getById: async (id: string): Promise<ComicSeries> => Model.findById(id).exec(),
    getByQuery: async (queryObj: object): Promise<ComicSeries> => Model.findOne(queryObj).exec(),
    getByList: async (listOfIds: Array<string>): Promise<Array<ComicSeries>> => Model.find().where('_id').in(listOfIds).exec(),
    getByIdWithComicBookUrls: async (id: string): Promise<ComicSeries> => Model.findById(id).populate('comicBooks', 'url').exec(),
    addComicBook: async (issue: ComicBook): Promise<ComicSeries> => updateSeries(issue.series, { $push: { issues: issue._id } }),
  }
}