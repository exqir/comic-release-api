'use strict'

import { describe, it, before, beforeEach, afterEach } from 'mocha'
import { assert } from 'chai'
import td from 'testdouble'

let scrapIssues
let scrapIssue
let updateIssues
let handleJob

describe('controller - handleJob', () => {
  beforeEach(() => {
    scrapIssues = td.replace('../jobs/scrapIssues').scrapIssues
    scrapIssue = td.replace('../jobs/scrapIssue').scrapIssue
    updateIssues = td.replace('../jobs/updateIssues').updateIssues
    // needs to be required after the replacements
    handleJob = require('./jobs').handleJob
  })

  it('should trigger scap issues job in case of "scrapIssues" event', () => {
    const handleScrapIssues = handleJob({ dependency: 'test' })
    handleScrapIssues({ _id: 123, job: 'scrapIssues', data: {} })
    td.verify(scrapIssues(123, {}, { dependency: 'test' }))
  })

  it('should trigger scap issue job in case of "scrapIssue" event', () => {
    const handleScrapIssue = handleJob({ dependency: 'test' })
    handleScrapIssue({ _id: 123, job: 'scrapIssue', data: {} })
    td.verify(scrapIssue(123, {}, { dependency: 'test' }))
  })

  it('should trigger update issues job in case of "updateIssues" event', () => {
    const handleUpdateIssues = handleJob({ dependency: 'test' })
    handleUpdateIssues({ _id: 123, job: 'updateIssues', data: {} })
    td.verify(updateIssues(123, {}, { dependency: 'test' }))
  })

  afterEach(() => {
    td.reset()
  })
})
