'use strict'

import { User } from '../models/User'

export async function getUserById(id) {
  return await User.findById(id).exec()
}

export async function verifyUser(username, password) {
  const user = await getUserByName(username)
  if (!await user.validPassword(password)) throw new Error('invalid password or username')
  return user
}

export async function createNewUser(username, password) {
  // @TODO: don't return hashed password
  return await new User({ username, password }).save()
}

async function getUserByName(username) {
  return await User.findOne({ username }).exec()
}
