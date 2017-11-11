const mongoose = require('mongoose')

let db = null

function get () {
  return db
}

async function connect (url, user, pass) {
  try {
    mongoose.Promise = Promise    
    db = await mongoose.connect('mongodb://' + url, { useMongoClient: true })
  } catch (e) {
    Logger.logError('connection to database failed: ' + e)
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