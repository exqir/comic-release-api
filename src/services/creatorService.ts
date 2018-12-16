import { CreatorModel, Creator, ComicBook } from "../types/mongo";

export function createCreatorService(Model: CreatorModel) {
  return {
    create: async (creator: Creator): Promise<Creator> => new Model(creator).save(),
    getById: async (id: string): Promise<Creator> => Model.findById(id).exec(),
  }
}