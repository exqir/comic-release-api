export function createPullListService(PullListModel) {
  return {
    getPullLists: async () => await PullListModel.find().exec(),
    getPullListByOwner: async owner => await PullListModel.findOne({ owner }).exec(),
    createPullList: async owner => await new PullListModel({ owner, list: [] }).save(),
    addSeriesToPullList: async (owner, series) => await PullListModel.findOneAndUpdate({ owner: owner, list: {$ne: series} }, { $push: {list: series} }, { new: true }),
    removeSeriesFromPullList: async (owner, series) => await PullListModel.findOneAndUpdate({ owner }, { $pull: {list: series} }, { new: true }).exec(),
  }
}