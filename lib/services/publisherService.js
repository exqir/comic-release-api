export function createPublisherService(PublisherModel) {
  return {
    getPublishers: async () => await PublisherModel.find().exec(),
    getPublisherByName: async name => await PublisherModel.findOne({ _id: name }).exec(),
    getPublishersInList: async listOfIds => await PublisherModel.where('_id').in(listOfIds).exec(),
    addSeriesToPublisher: async (name, series) => await PublisherModel.findOneAndUpdate({ _id: name, series: {$ne: series} }, { $push: {series: series} }, { new: true }),
  }
}