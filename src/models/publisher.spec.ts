import * as mongo from 'mongodb-memory-server'
import { Db, connect, MongoClient } from 'mongodb'
import { getOnePublisher, getManyPublishers, collection } from './publisher'
import { createLogger } from '../lib/logger'

let memoryServer: mongo.MongoMemoryServer = null
let client: MongoClient = null
let db: Db = null
const logger = createLogger('PUBLISHER MODULE TEST', 'de-DE')

async function connectToDatabase() {
  client = await connect(
    await memoryServer.getConnectionString(),
    { useNewUrlParser: true },
  )

  db = client.db(await memoryServer.getDbName())
}

beforeAll(async () => {
  memoryServer = new mongo.MongoMemoryServer()
})

afterAll(async () => {
  await memoryServer.stop()
})

beforeEach(async () => {
  await connectToDatabase()
})

afterEach(async () => {
  await db.dropDatabase()
  await client.close()
})

describe('getOnePublisher', () => {
  test('should return Publisher', async () => {
    const toBeFound = [
      {
        _id: 'publisher',
        name: 'publisher name',
        iconUrl: 'mock',
        url: 'mock',
        basePath: 'mock',
        seriesPath: 'mock',
        searchPath: 'mock',
        searchPathSeries: 'mock',
        series: ['series1', 'series2'],
      },
    ]
    await db.collection(collection).insertMany(toBeFound)

    const result = await getOnePublisher(logger, 'publisher')(db)

    expect(result).toEqual(toBeFound[0])
  })

  test('should return null if publisher was not found', async () => {
    const toBeFound = [
      {
        _id: 'you can\'t find me',
        name: 'publisher name',
        iconUrl: 'mock',
        url: 'mock',
        basePath: 'mock',
        seriesPath: 'mock',
        searchPath: 'mock',
        searchPathSeries: 'mock',
        series: ['series1', 'series2'],
      },
    ]
    await db.collection(collection).insertMany(toBeFound)

    const result = await getOnePublisher(logger, 'publisher')(db)

    expect(result).toBeNull()
  })

  test('should log error and return null if error was encountered', async () => {
    // close connection to provoke error from mongo
    await client.close()

    const result = await getOnePublisher(logger, 'publisher')(db)

    expect(result).toBeNull()
    // reconnect to database to not break afterEach reset function
    await connectToDatabase()
  })
})

describe('getManyPublishers', () => {
  test('should return Publisher', async () => {
    const toBeFound = [
      {
        _id: 'publisher1',
        name: 'publisher name',
        iconUrl: 'mock',
        url: 'mock',
        basePath: 'mock',
        seriesPath: 'mock',
        searchPath: 'mock',
        searchPathSeries: 'mock',
        series: ['series1', 'series2'],
      },
      {
        _id: 'publisher2',
        name: 'publisher name',
        iconUrl: 'mock',
        url: 'mock',
        basePath: 'mock',
        seriesPath: 'mock',
        searchPath: 'mock',
        searchPathSeries: 'mock',
        series: ['series1', 'series2'],
      },
    ]
    await db.collection(collection).insertMany(toBeFound)

    const result = await getManyPublishers(logger, ['publisher1', 'publisher2'])(db)

    expect(result).toEqual(toBeFound)
  })

  test('should return null if publisher was not found', async () => {
    const toBeFound = [
      {
        _id: 'you can\'t find me',
        name: 'publisher name',
        iconUrl: 'mock',
        url: 'mock',
        basePath: 'mock',
        seriesPath: 'mock',
        searchPath: 'mock',
        searchPathSeries: 'mock',
        series: ['series1', 'series2'],
      },
    ]
    await db.collection(collection).insertMany(toBeFound)

    const result = await getManyPublishers(logger, ['publisher'])(db)

    expect(result).toEqual([])
  })

  test('should log error and return null if error was encountered', async () => {
    // close connection to provoke error from mongo
    await client.close()

    const result = await getManyPublishers(logger, ['publisher'])(db)

    expect(result).toBeNull()
    // reconnect to database to not break afterEach reset function
    await connectToDatabase()
  })
})