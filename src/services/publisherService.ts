import { PublisherModel, Publisher } from "../types/mongo";

export function createPublisherService(Model: PublisherModel) {
  return {
    getAll: async (): Promise<Array<Publisher>> => Model.find().exec(),
    getByName: async (name: string): Promise<Publisher> => Model.findOne({ _id: name }).exec(),
    getByList: async (listOfIds: Array<string>): Promise<Publisher> => Model.where('_id').in(listOfIds).exec(),
    addComicSeries: async (name: string, series: string): Promise<Publisher> => Model.findOneAndUpdate({ _id: name, series: { $ne: series } }, { $push: { series: series } }, { new: true }),
  }
}
