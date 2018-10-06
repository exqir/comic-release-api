'use strict'

import { logUserIn, logout } from '../../controller/user'

export const UserMutation = {
  login: async (root, { username, password }, { req }) => {
    const user = await logUserIn(username, password, req).catch(err => console.log(err))
    return user.username
  },
  logout: async (root, _, { req }) => logout(req),
}
