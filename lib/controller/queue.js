'use strict'

import { Queue } from '../models/Queue'

export async function addToQueue(job) {
  return await new Queue(job).save()
}
