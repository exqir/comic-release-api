export function createUserService(UserModel) {
  async function getUserByName(username) {
    return await User.findOne({ username }).exec()
  }
  
  async function verifyUser(username, password) {
    const user = await getUserByName(username)
    if (!await user.validPassword(password)) throw new Error('invalid password or username')
    return user
  } 
  
  return {
    // @TODO: don't return hashed password
    createUser: async (username, password) => await new UserModel({ username, password }).save(),
    getUserById: async id => await UserModel.findById(id).exec(),
    verifyUser: async (username, password) => await verifyUser(username, password),
  }
}