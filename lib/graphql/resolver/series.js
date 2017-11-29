'use strict'

import Comic from '../../models/Comic'

const SeriesResolver = {
  Series: {
    issues: async ({ issues }) => await Comic.find().where('_id').in(issues).exec(),
  }
}

module.exports = {
  SeriesResolver,
}