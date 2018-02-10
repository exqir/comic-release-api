'use strict'

import Comic from '../../models/Comic'

import { getPublisher } from './publisher'

export const ComicRoot = {
  comic: async (root, { id }) => await Comic.findById(id).exec()
}

export const ComicResolver = {
  Comic: {
    publisher: async ({ publisher }) => await getPublisher(publisher),
  }
}

export async function getComics(issues) {
  return await Comic.find().where('_id').in(issues).exec()
}
