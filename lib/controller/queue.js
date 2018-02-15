'use strict'

import { Queue } from '../models/Queue'

export async function addToQueue(job) {
  return await new Queue(job).save()
}

export async function removeFromQueue(id) {
  return await Queue.findByIdAndRemove(id)
}
