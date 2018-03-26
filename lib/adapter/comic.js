'use strict'

import Comic from '../models/Comic'

export async function newComic(issue) {
  return await new Comic(issue).save()
}

export async function getComic(id) {
  return await Comic.findById(id).exec()
}

export async function getComics(issues) {
  return await Comic.find().where('_id').in(issues).exec()
}

export async function updateRealeaseDate(id, newDate) {
  return await Comic.findByIdAndUpdate(id, { releaseDate: newDate }, { new: true }).exec()
}