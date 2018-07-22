export function createQueueService(QueueModel) {
  return {
    push: async job => await new QueueModel(job).save(),
    removeById: async id => await QueueModel.findByIdAndRemove(id),
  }
}