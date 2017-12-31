'use strict'

import { series as scrapSeries } from 'comic-scraper'

import Series from '../../models/Series'
import Comic from '../../models/Comic'
import Queue from '../../models/Queue'
import { Promise } from 'bluebird';

const SeriesRoot = {
  series: async (root, { id }) => await Series.findById(id).exec()
}

const SeriesResolver = {
  Series: {
    issues: async ({ issues }) => await Comic.find().where('_id').in(issues).exec(),
  }
}

async function createNewSeries(publisher, seriesUrl) {
  const scrapedSeries = await new Promise((resolve, reject) => scrapSeries(publisher, seriesUrl, (err, seriesObject) => resolve(seriesObject)))
  const series = await new Series({...scrapedSeries, publisher: publisher._id}).save()
  const q = await new Queue({job: 'scrapIssues', data: { publisher, series }}).save() // returns undefined, but why?
  return q && series._id
}

module.exports = {
  SeriesRoot,
  SeriesResolver,
  createNewSeries,
}