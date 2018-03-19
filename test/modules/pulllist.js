import { it } from 'mocha'

import { testDeepEqual } from './common'

import { pulllistOwner, pulllistsResult,
  pulllistResult, createPulllistResult, pullSeriesResult } from '../mocks/pulllist'
import { imageConfig } from '../mocks/publisher'

export function pulllists() {
  it('should return all pulllists', testDeepEqual(queryAllPullLists, pulllistsResult))
}

export function pulllist() {
  it('should return pulllist of given owner', testDeepEqual(queryPullListByOwner, pulllistResult(pulllistOwner)))
  it('should return owner of created pulllist', testDeepEqual(queryCreatePullList, createPulllistResult("Leonardo")))
  it('should contain pulled series', testDeepEqual(queryPullSeries, pullSeriesResult("Nailbiter")))
  it('should add series only once to pulllist', testDeepEqual(queryPullSeries, pullSeriesResult("Nailbiter")))
}

const queryAllPullLists = '{ pulllists { owner } }'
const queryPullListByOwner = `{ pulllist(owner: "${pulllistOwner}") { owner }}`
const queryCreatePullList = `mutation { createPullList(owner: "Leonardo") { owner }}`
const queryPullSeries = `mutation {
  pullSeries(owner: "${pulllistOwner}", publisher: "${imageConfig._id}", seriesUrl: "/series.html") {
    list {
      title,
      collectionsUrl,
      issuesUrl
    }
  }
}`
