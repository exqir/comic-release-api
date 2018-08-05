import logger from '../Logger'
import { Queue } from '../models/Queue'

function createQueueService(QueueModel) {
  return {
    push: async job => {
      logger.logMsg(`queue: adding to queue - ${JSON.stringify(job)}`)
      return await new QueueModel(job).save()
    },
    removeById: async id => {
      logger.logMsg(`queue: removing from queue - ${id}`)
      return await QueueModel.findByIdAndRemove(id)
    },
  }
}

export const QueueService = createQueueService(Queue)