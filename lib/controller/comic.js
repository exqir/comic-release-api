'use strict'

import Comic from '../models/Comic'

export async function getComic(id) {
  return await Comic.findById(id).exec()
}

export async function getComics(issues) {
  return await Comic.find().where('_id').in(issues).exec()
}
