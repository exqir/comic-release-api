import { Schema, model } from 'mongoose'
import * as bcrypt from 'bcrypt'

import { User as UserType, UserModel } from '../../types/mongo'

const schema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    pullList: [Schema.Types.ObjectId],
    pulled: [Schema.Types.ObjectId],
    read: [Schema.Types.ObjectId],
  },
  { collection: 'users' },
)

schema.pre('save', async function hashPassword(next) {
  try {
    const user = this as UserType
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next()
    user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(8))
    return next()
  } catch (e) {
    return next(e)
  }
})

// checking if password is valid
schema.methods.isValidPassword = async function(
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.password)
}

export const User: UserModel = model('User', schema)
