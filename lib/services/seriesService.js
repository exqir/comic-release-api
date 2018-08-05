import { Series } from '../models/Series'

function createSeriesService(SeriesModel) {
  async function updateSeries(series, update) {
    return await SeriesModel.findByIdAndUpdate(series, update, { new: true } )
  }
  
  return {
    createSeries: async series => await new SeriesModel(series).save(),
    getSeriesById: async id => await SeriesModel.findById(id).exec(),
    getSeriesByQuery: async queryObj => await SeriesModel.findOne(queryObj).exec(),
    getSeriesInList: async listOfIds => await SeriesModel.find().where('_id').in(listOfIds).exec(),
    getSeriesByIdWithIssueUrls: async id => await SeriesModel.findById(id).populate('issues', 'url').exec(),
    addIssueToSeries: async (issue) => await updateSeries(issue.series, { $push: {issues: issue._id} }),
  }
}

export const SeriesServices = createSeriesService(Series)