import { CreatorModel, Creator } from "../types/mongo";
import { DataService } from "../types/services";

export interface CreatorService extends DataService<Creator> { }

export function createCreatorService(Model: CreatorModel): CreatorService {
  return {
    create: async creator => new Model(creator).save(),
    getById: async id => Model.findById(id).exec(),
  }
}