'use strict'

import PullList from '../../lib/models/PullList'

export async function createMockPullList() {
  return await new PullList({'owner': pulllistOwner, 'list': []}).save()
}

export const pulllistOwner = "Wynnona"

export function pulllistResult(owner) {
  return {
    "pulllist": {
      "owner": owner
    }
  }
}

export const pulllistsResult = {
  "pulllists": [
    {
      "owner": "Wynnona"
    }
  ]
}

export function createPulllistResult(owner) {
  return {
    "createPullList": {
      "owner": owner
    }
  }
}

export function pullSeriesResult(series) {
  return {
    "pullSeries": {
      "list": [
        {
          "title": series,
          "collectionsUrl": "/collections.html",
          "issuesUrl": "/issues.html"
        }
      ]
    }
  }
}