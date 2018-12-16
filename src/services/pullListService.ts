import { PullListModel, PullList } from "../types/mongo";
import { DataListService } from "../types/services";

export interface PullListService extends DataListService<PullList> { }

export function createPullListService(Model: PullListModel): PullListService {
  return {
    create: async pullList => new Model(pullList).save(),
    getById: async id => Model.findById(id).exec(),
    getByQuery: async query => Model.findOne(query).exec(),
    insert: async (owner, series) => Model.findOneAndUpdate({ owner: owner, list: { $ne: series } }, { $push: { list: series } }, { new: true }),
    remove: async (owner, series) => Model.findOneAndUpdate({ owner }, { $pull: { list: series } }, { new: true }).exec(),
  }
}