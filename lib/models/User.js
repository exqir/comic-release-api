import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  pullList: [mongoose.Schema.Types.ObjectId],
  pulled: [mongoose.Schema.Types.ObjectId],
  read: [mongoose.Schema.Types.ObjectId],
}, {collection: 'users'})

userSchema.pre('save', async function hashPassword(next) {  
  try {
    const user = this
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next()
    // generate a salt
    const salt = await bcrypt.genSalt(8)
    // hash the password along with our new salt
    const hash = await bcrypt.hash(user.password, salt)
    // override the cleartext password with the hashed one
    user.password = hash
    return next()
  } catch (e) {
    return next(e)
  }
})

// hash the password
userSchema.methods.generateHash = function(password) {
  return bcrypt.hash(password, 8)
}

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compare(password, this.password)
}

export const User = mongoose.model('User', userSchema)
