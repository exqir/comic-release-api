import mongoose from 'mongoose'
import Logger from './Logger'

let db = null

function get () {
  return db
}

async function connect (url, user, pass) {
  if (db) return db
  try {
    mongoose.Promise = Promise
    db = await mongoose.connect('mongodb://' + url, { useMongoClient: true })
    Logger.logMsg(`connection to database ${url} established`)
  } catch (e) {
    Logger.logError(`connection to database failed: ${e}`)
  }
}

async function close () {
  if (db) await db.close()
}

module.exports = {
  get,
  connect,
  close
}