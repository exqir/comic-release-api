import { UserModel, User } from "../types/mongo";

export function createUserService(Model: UserModel) {
  async function getUserByName(username: string): Promise<User> {
    return Model.findOne({ username }).exec()
  }

  async function verifyUser(username: string, password: string): Promise<User | Error> {
    const user = await getUserByName(username)
    if (!await user.isValidPassword(password)) throw new Error('invalid password or username')
    return user
  }

  return {
    // @TODO: don't return hashed password
    create: async (username: string, password: string): Promise<User> => new Model({ username, password }).save(),
    getById: async (id: string): Promise<User> => Model.findById(id).exec(),
    verifyUser: async (username: string, password: string): Promise<User | Error> => verifyUser(username, password),
  }
}