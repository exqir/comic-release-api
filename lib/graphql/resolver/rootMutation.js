'use strict'

import { PullListMutation } from './pulllist'
import { UserMutation } from './user'

const RootMutation = {
  ...PullListMutation,
  ...UserMutation,
}

module.exports = {
  RootMutation
}