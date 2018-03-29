'use strict'
const dateformat = require('dateformat')

export function getISODate (date) {
  return dateformat(date, 'isoDate')
}
