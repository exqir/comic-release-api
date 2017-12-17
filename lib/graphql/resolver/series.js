'use strict'

import Comic from '../../models/Comic'

const SeriesResolver = {
  Series: {
    issues: async ({ issues }) => await Comic.find().where('_id').in(issues).exec(),
  }
}

async function createNewSeries(publisher, seriesUrl) {
  const scrapedSeries = await new Promise((resolve, reject) => scrapSeries(publisher, seriesUrl, (err, seriesObject) => resolve(seriesObject)))  
  const series = await new Series({...scrapedSeries, publisher: publisher._id}).save()
  const q = await new Queue({job: 'scrapIssues', data: { publisher: publisher, series: series }}).save() 
  return q && series._id  
}

module.exports = {
  SeriesResolver,
  createNewSeries,
}