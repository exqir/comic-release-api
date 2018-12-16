import { PublisherModel, Publisher } from "../types/mongo";
import { DataListService } from "../types/services";

export interface PublisherService extends DataListService<Publisher> { }

export function createPublisherService(Model: PublisherModel): PublisherService {
  return {
    create: async publisher => new Model(publisher).save(),
    getAll: async () => Model.find().exec(),
    getById: async name => Model.findById(name).exec(),
    getByList: async list => Model.where('_id').in(list).exec(),
    insert: async (name, series) => Model.findOneAndUpdate({ _id: name, series: { $ne: series } }, { $push: { series: series } }, { new: true }),
  }
}
