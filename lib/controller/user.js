'use strict'
import passport from 'passport'

export async function logUserIn(username, password, req) {
  if (req.user === undefined) {
    req.body.username = username
    req.body.password = password
    return authenticateUserWithPassport(req)
  }
  return req.user
}

export function logout(req) {
  if (req.user === undefined) return new Error('no user to logout')
  req.logout()
  req.session.destroy()
  return true
}

function authenticateUserWithPassport(req) {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) reject(err)
      if (!user) reject(new Error('no user returned'))
      req.logIn(user, (err) => {
        if (err) reject(err)
        resolve(user)
      })
    })(req)
  })
}
