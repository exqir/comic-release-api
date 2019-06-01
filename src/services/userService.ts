import { UserModel, User } from '../types/mongo'
import { DataService } from '../types/services'

export interface UserService extends DataService<User> {
  verifyUser: (username: string, password: string) => Promise<User | Error>
}

export function createUserService(Model: UserModel): UserService {
  async function getUserByName(username: string): Promise<User> {
    return Model.findOne({ username }).exec()
  }

  async function verifyUser(
    username: string,
    password: string,
  ): Promise<User | Error> {
    const user = await getUserByName(username)
    if (!(await user.isValidPassword(password)))
      throw new Error('invalid password or username')
    return user
  }

  return {
    // @TODO: don't return hashed password
    create: async user => new Model(user).save(),
    getById: async id => Model.findById(id).exec(),
    verifyUser,
  }
}
