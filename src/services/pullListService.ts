import { PullListModel, PullList } from "../types/mongo";

export function createPullListService(Model: PullListModel) {
  return {
    getAll: async (): Promise<Array<PullList>> => Model.find().exec(),
    getByOwner: async (owner: string): Promise<PullList> => Model.findOne({ owner }).exec(),
    create: async (owner: string): Promise<PullList> => new Model({ owner, list: [] }).save(),
    addSeries: async (owner: string, series: string): Promise<PullList> => Model.findOneAndUpdate({ owner: owner, list: { $ne: series } }, { $push: { list: series } }, { new: true }),
    removeSeries: async (owner: string, series: string): Promise<PullList> => Model.findOneAndUpdate({ owner }, { $pull: { list: series } }, { new: true }).exec(),
  }
}