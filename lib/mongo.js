import mongoose from 'mongoose'

import Logger from './Logger'

let db = null

async function connect (url, user, pass) {
  if (db) return db
  try {
    db = await mongoose.connect('mongodb://' + url)
    Logger.logMsg(`connection to database ${url} established`)
  } catch (e) {
    Logger.logError(`connection to database failed: ${e}`)
  }
}

async function close () {
  if (db) await db.close()
}

module.exports = {
  connect,
  close
}