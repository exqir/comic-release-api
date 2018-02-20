'use strict'

import PullList from '../../lib/models/PullList'

export async function createMockPullList() {
  return await new PullList({'owner': pulllistOwner, 'list': []}).save()
}

export const pulllistOwner = "Wynnona"

export const pulllistResult = {
  "pulllist": {
      "owner": "Wynnona"
    }
}

export const pulllistsResult = {
  "pulllists": [
    {
      "owner": "Wynnona"
    }
  ]
}